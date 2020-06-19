import { ships } from './ships.js';
import { gameboards } from './gameboard.js';


const ship3 = ships(3);
const ship1 = ships(1);
const board1 = gameboards();
const emptyBoard = gameboards().gameboard;
board1.placeCustomShip({ 
    ship: ship3, 
    dir: 'col', 
    axis: 2, 
    coords: [2, 3, 4] 
})


test('ship placed on board', () => {
    expect(board1.gameboard[3][2]).toEqual({
        fill: true,
        hit: false,
        spot: 1,
        ship: ship3
    })
})

test('gameboard saves state after placeCustomship', () => {
    expect(board1.gameboard).not.toEqual(emptyBoard)
})

test('gameboard wont allow ship overlap', () => {
    expect(board1.checkEmpty({
        dir: 'col',
        axis: 2,
        coords: [3]
    }))
    .toBe(false)
})

test('gameboard saves state after adding two ships', () => {
    board1.placeCustomShip({
        ship: ship1,
        dir: 'col',
        axis: 3,
        coords: [3]
    })
    expect([board1.gameboard[3][3].fill, board1.gameboard[2][2].fill, board1.gameboard[3][2].fill, board1.gameboard[5][5].fill])
    .toEqual([true, true, true, null])
})

test('gameboard receiveAttacks on all ship3 positions sink ship', () => {
    board1.receiveAttack({ col: 2, row: 2 });
    board1.receiveAttack({ col: 2, row: 3 });
    board1.receiveAttack({ col: 2, row: 4 });
    expect(ship3.hasSunk()).toBe(true);
})

test('error if attack same position twice', () => {
    board1.receiveAttack({ col: 4, row: 4 });
    expect(() => board1.receiveAttack({ col: 4, row: 4 })).toThrow()
})


test('all are not sunk', () => {
    expect(board1.areAllSunk()).toBe(false)
})

test('receive attack with spot object argument', () => {
    const spotObj = board1.gameboard[3][3];
    board1.receiveAttack({ spotObj, })
})

test('all are sunk', () => {
    expect(board1.areAllSunk()).toBe(true)
})

const b1 = gameboards();
b1.randomFillShips();

test('generate random coords is random', () => {
    const b2 = gameboards();
    b2.randomFillShips();
    expect(b1.gameboard).not.toEqual(b2.gameboard);
})

test('generate random coords should fill 35 spots', () => {
    let spotsFilled = 0;
    for (let row of b1.gameboard) {
        for (let spot of row) {
            if (spot.fill) {
                spotsFilled++
            }
        }
    }
    expect(spotsFilled).toBe(35);
})

