import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { gameboards} from './gameboard';
import { GAMESHIPS } from './ships'


const DisplayBoard = (props) => {
  const activeBoard = (whose) => whose !== props.currentPlayer && !props.winner

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
        <h3>Player</h3>
        <table className={((props.currentPlayer === 'enemy')? 'active' : 'inactive') + ' player board '}>
          <tbody>
            {generateDisplay(props.playerBoard, 'player')}
          </tbody>
        </table>
      </div>
      <div id='enemyBoard'>
        <h3>Enemy</h3>
        <table className={((props.currentPlayer === 'player')? 'active' : 'inactive') + ' player board '}>
          <tbody>
            {generateDisplay(props.enemyBoard, 'enemy')}
          </tbody>
        </table>
      </div>
    </div>
  )
}
 

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.initialstate = {
      playerBoard: this.randomSetup(),
      enemyBoard: this.randomSetup()
    }
    this.state = {
      ...this.initialstate
    }
    this.receiveAttack = this.receiveAttack.bind(this);
    this.randomSetup = this.randomSetup.bind(this);
  }

  receiveAttack(spot, board) {
    if (!spot.hit) {
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

  render() {
    return(
      <DisplayBoard 
        currentPlayer={this.props.currentPlayer}
        playerBoard={this.state.playerBoard} 
        enemyBoard={this.state.enemyBoard} 
        receiveAttack={this.receiveAttack}
        winner={this.props.winner}
        />
    )
  }
}


class Gameplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 'player', //TODO: Change to 50/50 chance of 'player' or 'enemy'
      winner: null,
      playerScore: 0,
      enemyScore: 0
    };
    this.nextPlayerTurn = this.nextPlayerTurn.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  nextPlayerTurn() {
    this.setState({
      currentPlayer: (this.state.currentPlayer === 'player')? 'enemy' : 'player',
    })
  }

  checkWin(board) {
    const allSunk = board.areAllSunk();
    if (allSunk) {
      const winner = this.state.currentPlayer;
      this.setState({
        winner,
        currentPlayer: null,
        playerScore: (winner === 'player')? this.state.playerScore + 1 : this.state.playerScore,
        enemyScore: (winner === 'enemy')? this.state.enemyScore + 1 : this.state.enemyScore,
      })
    }
    return allSunk
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
          && <div>
              <h2>Winner: {this.state.winner}!</h2>
              <button onClick={this.resetGame}>Reset Game</button>
            </div>
        }
        <div class='scoreBoard'>
          <h2>Scores:</h2>
          <h3>Player: {this.state.playerScore}  Enemy: {this.state.enemyScore}</h3>
        </div>
        <h2>Turn: {this.state.currentPlayer}</h2>
        <Gameboard 
          currentPlayer={this.state.currentPlayer} 
          nextPlayerTurn={this.nextPlayerTurn}
          checkWin={this.checkWin}
          winner={this.state.winner}
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

