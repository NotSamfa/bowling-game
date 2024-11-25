import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useSphere } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";

const Bola = ({ positionX, onResetGame, launched }) => {
  const [ref, api] = useSphere(() => ({
    mass: 6.0,
    position: [positionX, 2, 17],
    args: [0.8],
    material: { friction: 0.3, restitution: 0.05 } 
  }));
  const [resetTimeout, setResetTimeout] = useState(null);
  // https://unsplash.com/es/fotos/un-fondo-azul-y-blanco-con-un-diseno-ondulado-inUID_-1lCU
  const texture = useLoader(TextureLoader, "marble.jpg");

  useEffect(() => {
    const unsubscribe = api.position.subscribe((position) => {
      if (position[1] < -0.5 && !resetTimeout) {
        setResetTimeout(
          setTimeout(() => {
            api.position.set(positionX, 2, -17);
            api.velocity.set(0, 0, 0);
            api.angularVelocity.set(0, 0, 0);
            onResetGame();
          }, 3000)
        );
      }
    });

    return () => unsubscribe();
  }, [api, resetTimeout, positionX, onResetGame]);

  useEffect(() => {
    if (launched) {
      api.velocity.set(0, 0, -25);
    }
  }, [launched, api]);

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.8]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};


export default Bola;