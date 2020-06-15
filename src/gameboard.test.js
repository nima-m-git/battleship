import { ships } from './ships.js';
import { gameboards } from './gameboard.js';

test('ship placed on board', () => {
    const ship1 = ships(3);
    const board1 = gameboards();
    board1.placeShip({ 
        ship: ship1, 
        dir: 'vert', 
        axis: 2, 
        coords: [2, 3, 4] 
    })
    expect(board1.gameboard[3][2]).toEqual({
        fill: true,
        hit: false,
        spot: 1,
        ship: ship1
    })
})

test('gameboard saves state after placeship', () => {
    const ship1 = ships(3);
    const board1 = gameboards();
    const board2 = gameboards();
    board1.placeShip({ship1, dir: 'vert', axis: 0, coords: [0, 1, 2] })
    expect(board1.gameboard).not.toEqual(board2.gameboard)
})