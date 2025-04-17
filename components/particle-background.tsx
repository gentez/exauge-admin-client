"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Points, PointMaterial } from "@react-three/drei"
import { useState, useRef } from "react"
import type * as THREE from "three"
import { random } from "maath"

interface ParticleFieldProps {
  color?: string
  count?: number
  size?: number
  radius?: number
  opacity?: number
  offsetX?: number
  offsetY?: number
}

function ParticleField({
  color = "#4a9eff",
  count = 5000,
  size = 0.006,
  radius = 1.2,
  opacity = 0.8,
  offsetX = -0.3,
  offsetY = 0.2,
}: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null!)

  // Create particles with the specified parameters
  const [sphere] = useState(() => {
    const positions = random.inSphere(new Float64Array(count * 3), { radius })
    // Apply offsets to position the particles
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (positions[i] ?? 0) + offsetX // Shift X coordinate
      positions[i + 1] = (positions[i + 1] ?? 0) + offsetY // Shift Y coordinate
      positions[i + 2] = (positions[i + 2] ?? 0) + 0 // Ensure Z coordinate is valid (optional)
    }
    return Float32Array.from(positions) // Convert to Float32Array for THREE.js compatibility
  })

  useFrame((state, delta) => {
    points.current.rotation.x -= delta / 10
    points.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={points} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={opacity}
        />
      </Points>
    </group>
  )
}

interface ParticleBackgroundProps {
  className?: string
  particleProps?: ParticleFieldProps
}

export default function ParticleBackground({
  className = "absolute inset-0 -z-10",
  particleProps,
}: ParticleBackgroundProps) {
  return (
    <div className={className}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={["#000814"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ParticleField {...particleProps} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}
