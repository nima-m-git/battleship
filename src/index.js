import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { gameboards} from './gameboard';
import { GAMESHIPS } from './ships'


const DisplayBoard = (props) => {
  const activeBoard = (whose) => whose !== props.currentPlayer.name && !props.winner

  const generateDisplay = (board, whose) => {
    const active = activeBoard(whose);
    return board.gameboard.map((row, i) => 
      <tr key={i}>
        {row.map((spot, j) => 
          <td 
            key={j} 
            hit={`${spot.hit}`} 
            fill={`${spot.fill}`} 
            onClick={(active)? () => props.receiveAttack(spot, board) : null}
            >
          </td>)}
      </tr> 
    )
  } 

  return (
    <div id='gameBoards'>
      <div id='playerBoard'>
        <h3>Player1</h3>
        <table className={((props.currentPlayer.name === 'player2')? 'active' : 'inactive') + ' player1 board '}>
          <tbody>
            {generateDisplay(props.player1Board, 'player1')}
          </tbody>
        </table>
      </div>
      <div id='player2Board'>
        <h3>Player2</h3>
        <table className={((props.currentPlayer.name === 'player1')? 'active' : 'inactive') + ' player2 board '}>
          <tbody>
            {generateDisplay(props.player2Board, 'player2')}
          </tbody>
        </table>
      </div>
    </div>
  )
}
 

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1Board: this.randomSetup(),
      player2Board: this.randomSetup()
    }
    this.receiveAttack = this.receiveAttack.bind(this);
    this.randomSetup = this.randomSetup.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  receiveAttack(spot, board) {
    if (!spot.hit) { // Change to add filter to spot onclick can be placed
      spot.hit = true;
      if (spot.ship) {
          spot.ship.hitSpot(spot.spot)
      }
      if (!this.props.checkWin(board)) {
        this.props.nextPlayerTurn() 
      }
    }
  }

  randomSetup() {
    const board = gameboards()
    board.randomFillShips()
    return board
  }

  // Tight coupling? single function resets two different component states
  resetGame() {
    this.props.resetGame()
    this.setState({
      player1Board: this.randomSetup(),
      player2Board: this.randomSetup()
    })
  }

  render() {
    return(
      <div>
        <DisplayBoard 
          currentPlayer={this.props.currentPlayer}
          player1Board={this.state.player1Board} 
          player2Board={this.state.player2Board} 
          receiveAttack={this.receiveAttack}
          winner={this.props.winner}
        />
        <div id='reset'>
          {this.props.winner 
            && <button onClick={this.resetGame}>Reset Game</button>
          }
        </div>
      </div>
    )
  }
}


class Gameplay extends React.Component {
  constructor(props) {
    super(props);
    this.players = {
      player1: {
        name: 'player1',
        type: 'human',
        score: 0,
      },
      player2: {
        name: 'player2',
        type: 'computer',
        score: 0,
      }
    }
    this.state = {
      currentPlayer: this.players.player1,
      winner: null,
    };
    this.nextPlayerTurn = this.nextPlayerTurn.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  nextPlayerTurn() {
    this.setState({
      currentPlayer: (this.state.currentPlayer === this.players.player1)? this.players.player2 : this.players.player1,
    })
    // if (this.state.currentPlayer.type === 'computer') {
    //  APPLY COMPUTER MOVE
    // }
  }

  checkWin(board) {
    const allSunk = board.areAllSunk();
    if (allSunk) {
      this.applyWin()
    }
    return allSunk
  }

  applyWin() {
    const winner = this.state.currentPlayer;
    this.setState({
      winner,
    })
    winner.score++  
  }

  resetGame() {
    this.setState({
      winner: null,
    })
    this.nextPlayerTurn()
  }

  render() {
    return (
      <div>
        {this.state.winner 
          && <h2>Winner: {this.state.winner.name}!</h2>
        }
        <div className='scoreBoard'>
          <h2>Scores:</h2>
          <h3>Player1: {this.players.player1.score}  Player2: {this.players.player2.score}</h3>
        </div>
        <h2>Turn: {this.state.currentPlayer.player}</h2>
        <Gameboard 
          currentPlayer={this.state.currentPlayer} 
          nextPlayerTurn={this.nextPlayerTurn}
          checkWin={this.checkWin}
          winner={this.state.winner}
          resetGame={this.resetGame}
        />
      </div>

    )
  }
}




ReactDOM.render(
  <React.StrictMode>
    <h1>Battleship</h1>
    <Gameplay />
  </React.StrictMode>,
  document.getElementById('root')
);

