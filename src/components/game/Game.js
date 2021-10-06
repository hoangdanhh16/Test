import React, {useState} from 'react';
import Board from "../board/Board";
import './Game.css'

function Game() {
    const [history, setHistory] = useState ([
        {
            squares: Array(9).fill(null),
        }
    ]);

    const [stepNumber, setStepNumber] = useState (0);
    const [xIsNext, setXINext] = useState (true);
    const [isAscending, setIsAscending] = useState (true);

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {winner: squares[a], line: lines[i]}
            }
        }
        return null;
    }
    
    function handleClick(i) {
        const currentHistory = history.slice(0, stepNumber + 1);
        const current = currentHistory[currentHistory.length - 1];
        const squares = current.squares.slice();
        const positions = [
            [1, 1],
            [2, 1],
            [3, 1],
            [1, 2],
            [2, 2],
            [3, 2],
            [1, 3],
            [2, 3],
            [3, 3]
        ];

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';

        setHistory(currentHistory.concat([
            {
                squares: squares,
                position: positions[i]
            },
        ]));
        setStepNumber(currentHistory.length);
        setXINext(!xIsNext);
    }    
    
    function jumpTo(step) {
        setStepNumber(step);
        setXINext(step % 2 === 0);
    }
    
    function arrange(){
        setIsAscending(!isAscending);
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ?
        `Go to step #${move} (${history[move].position[0]}, ${history[move].position[1]})` :
        'Go to game start';

        const classname = move === stepNumber ? 'btn-selected' : 'btn';

        return (
            <li key={move}>
            <button className = {classname} onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = 'Winner: ' + winner.winner;
    } else if (stepNumber === 9){
        status = 'Draw'
    } else{
        status = 'Next player: ' + (xIsNext ? 'X' : 'O')
    }
    
    const currentAscending = isAscending;
    if (!currentAscending) {
        moves.reverse();
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}
                    isWinSquare = {winner ? winner.line : []}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <button onClick={() => arrange()}>
                    {isAscending ? "Descending" : "Ascending"}
                </button>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default Game;
