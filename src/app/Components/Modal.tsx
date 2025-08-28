'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
import { OrbitControls } from '@react-three/drei'

function AnimatedSphere() {
  const meshRef = useRef<Mesh>(null!)

  useFrame(() => {
    meshRef.current.rotation.x += 0.002
    meshRef.current.rotation.y += 0.003
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial color="#0ea5e9" wireframe />
    </mesh>
  )
}

export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <AnimatedSphere />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}
