import { ships } from './ships.js';
import { gameboards } from './gameboard.js';


const ship1 = ships(3);
const ship2 = ships(1);
const board1 = gameboards();
const emptyBoard = gameboards().gameboard;
board1.placeShip({ 
    ship: ship1, 
    dir: 'vert', 
    axis: 2, 
    coords: [2, 3, 4] 
})


test('ship placed on board', () => {
    expect(board1.gameboard[3][2]).toEqual({
        fill: true,
        hit: false,
        spot: 1,
        ship: ship1
    })
})

test('gameboard saves state after placeship', () => {
    expect(board1.gameboard).not.toEqual(emptyBoard)
})

test('gameboard wont allow ship overlap', () => {
    expect(() => {
        board1.placeShip({
        ship2,
        dir: 'vert',
        axis: 2,
        coords: [3]
        })
    }).toThrow()
})

test('gameboard saves state after adding two ships', () => {
    board1.placeShip({
        ship: ship2,
        dir: 'vert',
        axis: 3,
        coords: [3]
    })
    expect([board1.gameboard[3][3].fill, board1.gameboard[2][2].fill, board1.gameboard[3][2].fill, board1.gameboard[5][5].fill])
    .toEqual([true, true, true, null])
})

test('gameboard receiveAttacks on all ship1 positions sink ship', () => {
    board1.receiveAttack({ x: 2, y: 2 });
    board1.receiveAttack({ x: 2, y: 3 });
    board1.receiveAttack({ x: 2, y: 4 });
    expect(ship1.hasSunk()).toBe(true);
})

test('error if attack same position twice', () => {
    board1.receiveAttack({ x: 4, y: 4 });
    expect(() => board1.receiveAttack({ x: 4, y: 4 })).toThrow()
})


test('all are sunk', () => {
    expect(board1.areAllSunk()).toBe(false)
})

test('all are not sunk', () => {
    board1.receiveAttack({ x: 3, y: 3 })
    expect(board1.areAllSunk()).toBe(true)
})

