import { useState } from 'react';
import GameMenu from './components/GameMenu';
import Game from './Game';

function App() {
    const [gameState, setGameState] = useState('start'); 
    const [username, setUsername] = useState('');
    const [score, setScore] = useState(0);

    return (
        <div>
            {gameState != 'game' ? (
                <GameMenu gameState={gameState} setGameState={setGameState} username={username} setUsername={setUsername} score={score} setScore={setScore}/>
            ) : (
                <Game username={username} setGameState={setGameState} score={score} setScore={setScore}/>
            )}
        </div>
    );
}

export default App;
