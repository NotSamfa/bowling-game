/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/pin/pin.gltf 
Author: MSerdar Tekin (https://sketchfab.com/teriologia)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/bowling-pin-028ccb945012460aa9056ffda5b53e20
Title: Bowling Pin
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function BowlingPin(props) {
  const { nodes, materials } = useGLTF('/pin/pin.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials.material} />
      <mesh geometry={nodes.Object_5.geometry} material={materials.PinStripe} />
    </group>
  )
}

useGLTF.preload('/pin.gltf')
