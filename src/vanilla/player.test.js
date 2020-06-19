import { Player } from './player.js';
import { ships } from './ships.js';
import { gameboards } from './gameboard.js';


const board1 = gameboards();
const board2 = gameboards();
const getEmptyBoard = () => gameboards();


test('two clone testboards are equal', () => {
    expect(board1.gameboard).toEqual(board2.gameboard)
})

test('computer makes move', () => {
    Player(board1).computerMove()
    expect(board1.gameboard).not.toEqual(getEmptyBoard().gameboard)
})

test('computer makes random moves', () => {
    const board1 = gameboards();
    const board2 = gameboards();
    for (let i=0; i<50; i++) {
        Player(board1).computerMove()
        Player(board2).computerMove()
    }
    expect(board1.gameboard).not.toEqual(board2.gameboard)
})

test('computer picks only empty spots, full gameboard after 100 moves', () => {
    const board1 = gameboards();
    const board2 = gameboards();
    for (let i=0; i<100; i++) {
        Player(board1).computerMove()
        Player(board2).computerMove()
    }
    expect(board1.gameboard).toEqual(board2.gameboard)
})