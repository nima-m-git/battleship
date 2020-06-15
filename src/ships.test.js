import { ships } from './ships.js';


test('check length', () => {
    const testShip = ships(2);
    expect(testShip.length).toBe(2);
});

test('check ship made', () => {
    const testShip = ships(2);
    expect(testShip.ship).toEqual([
        {
            spot: 0,
            hit: false
        },
        {
            spot: 1,
            hit: false
        }
    ]);
})

test('check ship hit', () => {
    const testShip = ships(2);
    testShip.hitSpot(1);
    expect(testShip.ship).toEqual([
        {
            spot: 0,
            hit: false
        },
        {
            spot: 1,
            hit: true
        }
    ]);
})

test('check ship sunk', () => {
    const testShip = ships(2);
    [0, 1].forEach(spot => testShip.hitSpot(spot));
    expect(testShip.isSunk()).toBe(true);
})

test('check ship didnt sink', () => {
    const testShip = ships(2);
    testShip.hitSpot(1);
    expect(testShip.isSunk()).toBe(false);
})