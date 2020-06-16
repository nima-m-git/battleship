import React from 'react';

export default class Gameboard extends React.Component {
    constructor(props) {
        super(props)
        this.initialBoard = (function() {
            const board = [];
            for (let i=0; i<10; i++) {
                const row = [];
                for (let i=0; i<10; i++) {
                    row.push({
                        fill: null,
                        hit: false
                    });
                }
                board.push(row);
            }
            return board
        }());
        this.state = {...this.initialBoard};
        this.checkEmpty = this.checkEmpty.bind(this);
        this.placeShip = this.placeShip.bind(this);
        this.receiveAttack = this.receiveAttack.bind(this);
    }

    checkEmpty(dir, axis, coords) {
        const spots = [];
        for (let coord of coords) {
            if (dir === 'vert') {
                spots.push(this.state[coord][axis].fill)
            } else if (dir === 'horz') {
                spots.push(this.state[axis][coords].fill)
            }
        }
        if (spots.every(spot => !spot)) {
            return true
        } else {
            throw new Error('Overlap');
        } 
    }

    placeShip({ ship, dir, axis, coords }) {
        const oldboard = {...this.state};
        if (this.checkEmpty(dir, axis, coords)) {
            coords.forEach(function(coord, spot) {
                if (dir === 'vert') {
                    oldboard[coord][axis] = {
                        ...oldboard[coord][axis],
                        fill: true,
                        spot,
                        ship,
                    }
                } else if (dir === 'horz') {
                    oldboard[axis][coord] = {
                        ...oldboard[coord][axis],
                        fill: true,
                        spot,
                        ship,
                    }
                }
            })
        }
        this.setState({...oldboard})
    }

    receiveAttack(x, y) {
        const oldboard = {...this.state}
        if (!oldboard[y][x].fill) {
            oldboard[y][x].fill = true
            if (oldboard[y][x].ship) {
                oldboard[y][x].ship.hitSpot(oldboard[y][x].spot)
            }
        } else {
            throw new Error('already attacked')
        }
        this.setState({...oldboard})
    }

} 
