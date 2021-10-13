import React, {useState} from 'react';
import Board from "../board/Board";
import './Game.css'

function Game() {
    const [history, setHistory] = useState ([
        {
            squares: Array(25).fill(null),
            posX: null,
            posY: null
        }
    ]);

    const [stepNumber, setStepNumber] = useState (0);
    const [xIsNext, setXIsNext] = useState (true);
    const [isAscending, setIsAscending] = useState (true);
    const [length, setLength] = useState (5);

    function calculateWinner(squares, value) {
        if(value == null) {
            return null
        }
        for(let i = 0; i<length; i++){
            for(let j = 0; j<length; j++){
                let curVal = squares[i * length + j]
                if((i+4)<length){
                    if(curVal === squares[(i + 1)*length + j] 
                        && curVal === squares[(i + 2)*length + j] 
                        && curVal === squares[(i + 3)*length + j] 
                        && curVal === squares[(i + 4)*length + j] 
                        && curVal === value) {
                            const res = {
                                winner: value,
                                winStreak: [(i)*length + j,
                                            (i + 1)*length + j,
                                            (i + 2)*length + j,
                                            (i + 3)*length + j,
                                            (i + 4)*length + j
                                ]       
                            }
                            return res
                    }
                }

                if((i + 4<length) && (j + 4 <length)){
                    if(curVal === squares[(i + 1)*length + j + 1] 
                        && curVal === squares[(i + 2)*length + j + 2] 
                        && curVal === squares[(i + 3)*length + j + 3] 
                        && curVal === squares[(i + 4)*length + j + 4] 
                        && curVal === value) {
                            const res = {
                                winner: value,
                                winStreak: [(i)*length + j,
                                            (i + 1)*length + j + 1,
                                            (i + 2)*length + j + 2,
                                            (i + 3)*length + j + 3,
                                            (i + 4)*length + j + 4
                                ]       
                            }
                            return res
                    }
                }

                if((i - 4 >= length) && (j + 4 <length)){
                    if(curVal === squares[(i - 1)*length + j + 1] 
                        && curVal === squares[(i - 2)*length + j + 2] 
                        && curVal === squares[(i - 3)*length + j + 3] 
                        && curVal === squares[(i - 4)*length + j + 4] 
                        && curVal === value) {
                            const res = {
                                winner: value,
                                winStreak: [(i)*length + j,
                                            (i - 1)*length + j + 1,
                                            (i - 2)*length + j + 2,
                                            (i - 3)*length + j + 3,
                                            (i - 4)*length + j + 4
                                ]       
                            }
                            return res
                    }
                }

                if(j + 4 <length){
                    if(curVal === squares[(i)*length + j + 1] 
                        && curVal === squares[(i)*length + j + 2] 
                        && curVal === squares[(i)*length + j + 3] 
                        && curVal === squares[(i)*length + j + 4] 
                        && curVal === value) {
                            const res = {
                                winner: value,
                                winStreak: [(i)*length + j,
                                            (i)*length + j + 1,
                                            (i)*length + j + 2,
                                            (i)*length + j + 3,
                                            (i)*length + j + 4
                                ]       
                            }
                            return res
                    }
                }
            }
        }
        return null
    }
    
    function handleClick(i) {
        const currentHistory = history.slice(0, stepNumber + 1);
        const current = currentHistory[currentHistory.length - 1];
        const squares = current.squares.slice();
       

        if (calculateWinner(squares, squares[i]) || squares[i]) {
            return
        }
        squares[i] = xIsNext ? 'X' : 'O';

        setHistory(currentHistory.concat([
            {
                squares: squares,
                posX: Math.floor(i / 3),
                posY: i % 3
            }]));
        setStepNumber(currentHistory.length);
        setXIsNext(!xIsNext);
    }    
    
    function jumpTo(step) {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    }
    
    function arrange(){
        setIsAscending(!isAscending);
    }

    function handleChangeWidth(e) {
        const val = Number(e.target.value);

        setLength(val);
        setHistory([{
            squares: Array(length * length).fill(null),
            posX: null,
            posY: null
        }]);
        setStepNumber(0);
        setXIsNext(true);
    }

    const currentHistory = history;
    const current = currentHistory[stepNumber];
    const resCalculated = calculateWinner(current.squares, !xIsNext ? 'X' : 'O')
    let winner = null;
    let winStreak = [];
    if (resCalculated) {
        winner = resCalculated.winner
        winStreak = resCalculated.winStreak
    }

    const curAscending = isAscending

    const moves = history.map((step, move) => {
        const posX = history[move].posX;
        const posY = history[move].posY;
        const key = `${posX}, ${posY}`
        const desc = move ?
            `Go to step #${move} (${posX}, ${posY})` :
            'Go to game start';

        const classname = move === stepNumber ? 'btn-selected' : 'btn';

        return (
            <li key={key}>
                <button className = {classname} onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (stepNumber === length * length && !resCalculated) {
        status = 'Draw match'
    }
    else if (resCalculated) {
        status = 'The winner is: ' + winner;
    }
    else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O')
    }

    return (
        <div className="game">
            <div className="game-config">
                <span className="fixed-size">Chiều rộng:</span>
                <input type="number" placeholder="Chiều rộng" value={length} onChange={handleChangeWidth} />
            </div>
            <br/>
            <div className="game-board">
                <Board 
                    squares={current.squares} 
                    onClick={(i) => handleClick(i)} 
                    winStreak={winStreak} 
                    length={length} 
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <button onClick={() => arrange()}>Sort</button>
                <ol>{!curAscending ? moves : moves.reverse()}</ol>
            </div>
        </div>
    );
}

export default Game;
