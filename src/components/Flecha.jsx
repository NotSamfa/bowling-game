import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";


const Flecha = ({ positionX, setPositionX }) => {
  const [direction, setDirection] = useState(1);
  // https://unsplash.com/es/fotos/gotas-de-agua-en-la-hoja-verde-TAejSuKyz7U
  const texture = useLoader(TextureLoader, "arrow-texture.jpg");

  useEffect(() => {
    const interval = setInterval(() => {
      setPositionX((prev) => {
        if (prev >= 4) setDirection(-1);
        if (prev <= -4) setDirection(1);
        return prev + direction * 0.2;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [direction, setPositionX]);

  return (
    <mesh position={[positionX, 1.5, 15]}>
      <coneGeometry args={[0.2, 0.5, 32]} />
      <meshStandardMaterial color="white" map={texture}/>
    </mesh>


  );
};

export default Flecha;