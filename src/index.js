import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { gameboards, emptyBoard } from './gameboard';
import { Player } from './player';
import { ships } from './ships'


const DisplayBoard = (player) => {
  if (player === 'player') {
     
  } else if (player === 'enemy') {

  }
}  

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerBoard: gameboards().gameboard,
      enemyBoard: gameboards().gameboard,
    }
    this.currentBoard = this.currentBoard.bind(this);

  }
  render() {
    return(
      <DisplayBoard 
        board={(this.props.currentPlayer === 'player')? this.state.playerBoard : this.state.enemyBoard}
          />
    )
  }
}

class Gameplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 'player',
    };
  }

  render() {
    return (
      <Gameboard currentPlayer={this.state.currentPlayer} />
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

