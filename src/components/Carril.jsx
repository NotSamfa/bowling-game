import { TextureLoader } from "three";
import { useBox } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";

const Carril = ({ position }) => {
  const [ref] = useBox(() => ({
    args: [10, 1, 50],
    position: position,
    type: "Static",
    material: { friction: 0.7, restitution: 0.3 },
  }));
  // https://unsplash.com/es/fotos/un-fondo-abstracto-purpura-y-verde-con-muchas-lineas-pEgsWN0kwbQ
  const texture = useLoader(TextureLoader, "ground.jpg");

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[10, 1, 50]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Carril;
