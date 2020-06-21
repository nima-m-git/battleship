import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { gameboards} from './gameboard';
import { ships } from './ships'


const DisplayBoard = (props) => {
  const generateDisplay = (board) => {
    return board.map((row, i) => 
      <tr key={i}>
        {row.map((spot, j) => 
          <td key={j} hit={`${spot.hit}`} fill={`${spot.fill}`} onClick={() => props.receiveAttack(spot)}></td>)}
      </tr> 
    )
  } 

  return (
    <div>
      <div id='playerBoard'>
        <h3>Player</h3>
        <table className={((props.currentPlayer === 'computer')? 'active' : 'inactive') + ' player board '}>
          <tbody>
            {generateDisplay(props.playerBoard)}
          </tbody>
        </table>
      </div>
      <div id='enemyBoard'>
        <h3>Enemy</h3>
        <table className={((props.currentPlayer === 'player')? 'active' : 'inactive') + ' player board '}>
          <tbody>
            {generateDisplay(props.enemyBoard)}
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

  receiveAttack(spot) {
    if (spot.hit) {
      console.log('Invalid Attack');
    } else {
      spot.hit = true;
      if (spot.ship) {
          spot.ship.hitSpot(spot.spot)
      }
      this.props.nextPlayerTurn() 
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
        playerBoard={this.state.playerBoard.gameboard} 
        enemyBoard={this.state.enemyBoard.gameboard} 
        receiveAttack={this.receiveAttack}
        />
    )
  }
}


class Gameplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 'player', //TODO: Change to 50/50 chance of 'player' or 'computer'
      winner: null,
    };
    this.nextPlayerTurn = this.nextPlayerTurn.bind(this);
  }

  nextPlayerTurn() {
    console.log('changing players')
    this.setState({
      currentPlayer: (this.state.currentPlayer === 'player')? 'computer' : 'player',
    })
  }

  render() {
    return (
      <Gameboard 
        currentPlayer={this.state.currentPlayer} 
        nextPlayerTurn={this.nextPlayerTurn}
        />
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

