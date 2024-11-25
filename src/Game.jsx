import { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Line} from "@react-three/drei";
import Skybox from "./components/Skybox";
import Carril from "./components/Carril";
import Pins from "./components/Pins";
import Bola from "./components/Bola";
import Flecha from "./components/Flecha";
import "./App.css";

function Camera({ zoom }) {
  const { camera } = useThree();

  useEffect(function () {
    camera.position.set(0, 6, 21);
  }, [camera]);

  useEffect(function () {
    const targetFov = zoom ? 50 : 85;
    let frame;

    function animate() {
      camera.fov += (targetFov - camera.fov) * 0.1;
      camera.updateProjectionMatrix();
      if (Math.abs(camera.fov - targetFov) > 0.1) {
        frame = requestAnimationFrame(animate);
      }
    }

    animate();
    return function () {
      cancelAnimationFrame(frame);
    };
  }, [zoom, camera]);

  return null;
}

function Game({ username, setGameState, score, setScore }) {
  const [resetGame, setResetGame] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [showArrow, setShowArrow] = useState(true);
  const [positionX, setPositionX] = useState(0);
  const [launched, setLaunched] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const [backgroundSound, setBackgroundSound] = useState(null);
  const [impactSound, setImpactSound] = useState(null);

  function loadAudio(src) {
    const audio = new Audio(src);
    return new Promise(function (resolve, reject) {
      audio.oncanplaythrough = function () {
        resolve(audio);
      };
      audio.onerror = function (error) {
        reject(error);
      };
    });
  }

  useEffect(function () {
    async function loadSounds() {
      try {
        const loadedBackgroundSound = await loadAudio("/sounds/background.mp3");
        const loadedImpactSound = await loadAudio("/sounds/impact.mp3");
        setBackgroundSound(loadedBackgroundSound);
        setImpactSound(loadedImpactSound);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    loadSounds();
  }, []);

  useEffect(function () {
    if (backgroundSound) {
      backgroundSound.loop = true;
      backgroundSound.play();

      return function () {
        backgroundSound.pause();
      };
    }
  }, [backgroundSound]);

  function handlePinFall() {
    if (impactSound) {
      impactSound.play();
    }
    setScore(function (prevScore) {
      return prevScore + 1;
    });
  }

  function handleResetGame() {
    setResetGame(!resetGame);
    setZoom(false);
    setShowArrow(true);
    setAttempts(function (prev) {
      return prev + 1;
    });
  }

  function handleLaunch() {
    setLaunched(true);
    setZoom(true);
  }

  function handlePositionSelected(e) {
    e.preventDefault();
    setShowArrow(false);
    handleLaunch();
  }

  function handleGameOver() {
    const playerData = {
      name: username,
      score: score,
    };
    console.log(playerData);
    let scoreboard = JSON.parse(localStorage.getItem("scores")) || [];
    scoreboard.push(playerData);
    localStorage.setItem("scores", JSON.stringify(scoreboard));
    setGameState("score");
  }

  useEffect(function () {
    if (attempts >= 5) {
      handleGameOver();
    }
  }, [attempts, score, username]);

  return (
    <>
      <div className="game-score">{score}</div>
      <Canvas shadows onClick={handlePositionSelected}>
        <Skybox scale={50} />
        <ambientLight intensity={0.2} color="#ffffff" />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.5}
          color="#d4badd"
          castShadow
        />
        <Physics gravity={[0, -9.8, 0]} iterations={40} step={1 / 120}>
          <Carril position={[0, -0.5, 0]} />
          <Line
            points={[
              [-5, 0.01, -25],
              [-5, 0.01, 30],
            ]}
            color="magenta"
            lineWidth={2}
          />
          <Line
            points={[
              [5, 0.01, -25],
              [5, 0.01, 30],
            ]}
            color="magenta"
            lineWidth={2}
          />
          <Pins resetGame={resetGame} onPinFall={handlePinFall} />
          {showArrow ? (
            <Flecha positionX={positionX} setPositionX={setPositionX} />
          ) : (
            <Bola
              positionX={positionX}
              onResetGame={handleResetGame}
              launched={launched}
              setAttempts={setAttempts}
            />
          )}
          <Camera zoom={zoom} />
        </Physics>
      </Canvas>
    </>
  );
}

export default Game;
