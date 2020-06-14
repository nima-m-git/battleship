import { ships } from './ships.js';

test('check length', () => {
    const testShip = ships(2);
    expect(testShip.length).toBe(2);
});

test('check ship made', () => {
    const testShip = ships(2);
    expect(testShip.ship).toEqual([null, null]);
})

test('check ship hit', () => {
    const testShip = ships(2);
    testShip.hitSpot(1);
    expect(testShip.ship).toEqual([null, true]);
})

test('check ship sunk', () => {
    const testShip = ships(2);
    [0, 1].forEach(spot => testShip.hitSpot(spot));
    expect(testShip.checkSunk()).toBe(true);
})

test('check ship didnt sink', () => {
    const testShip = ships(2);
    testShip.hitSpot(1);
    expect(testShip.checkSunk()).toBe(false);
})