import React from 'react';
import './Square.css'

function Square({isWinning, onClick, value}) {
    return (
        <button
            className={isWinning ? "square won" : "square"} 
            onClick={onClick}
        >      
            {value}
        </button>
    );
    
}

export default Square;