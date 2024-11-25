import { useEffect, useState } from "react";
import { useCylinder } from "@react-three/cannon";
import { BowlingPin } from "./BowlingPin";

const Pin = ({ initialPosition, onPinFall }) => {
  const [ref, api] = useCylinder(() => ({
    mass: 0.7,
    position: initialPosition,
    args: [0.1, 0.2, 1.0, 16], 
    material: { friction: 0.4, restitution: 0.4 }, 
    collisionMargin: 0.02, 
  }));

  const [hasFallen, setHasFallen] = useState(false);

  useEffect(() => {
    const unsubscribe = api.position.subscribe((position) => {
      if (position[1] < 0.2 && !hasFallen) {
        setHasFallen(true);
        onPinFall();
      }
    });

    return () => unsubscribe();
  }, [api, onPinFall, hasFallen]);

  return (
    <group ref={ref} castShadow>
      <BowlingPin scale={5} />
    </group>
  );
};

const Pins = ({ resetGame, onPinFall }) => {
  const positionY = 0.25;
  const positions = [
    [0, positionY, -15],      
    [-0.3, positionY, -15.5],
    [0.3, positionY, -15.5],  
    [-0.45, positionY, -16],  
    [0, positionY, -16],      
    [0.45, positionY, -16],   
    [-0.8, positionY, -16.5], 
    [-0.3, positionY, -16.5], 
    [0.3, positionY, -16.5],  
    [0.8, positionY, -16.5],  
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <Pin
          key={resetGame ? `reset-${i}` : `pin-${i}`}
          initialPosition={pos}
          onPinFall={onPinFall}
        />
      ))}
    </>
  );
};


export default Pins;