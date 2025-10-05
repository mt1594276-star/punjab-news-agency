'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

export function FloatingMagazine() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Magazine Cover */}
      <RoundedBox args={[2, 2.8, 0.1]} radius={0.05} smoothness={4}>
        <meshStandardMaterial 
          color="#8B4513" 
          metalness={0.3}
          roughness={0.4}
        />
      </RoundedBox>
      
      {/* Title */}
      <Text
        position={[0, 0.8, 0.06]}
        fontSize={0.25}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        fontWeight={700}
      >
        PUNJAB
      </Text>
      
      <Text
        position={[0, 0.4, 0.06]}
        fontSize={0.35}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        fontWeight={700}
      >
        NEWS AGENCY
      </Text>
      
      {/* Decorative elements */}
      <mesh position={[0, -0.3, 0.06]}>
        <planeGeometry args={[1.5, 0.8]} />
        <meshStandardMaterial 
          color="#D4AF37"
          opacity={0.3}
          transparent
        />
      </mesh>
      
      {/* Pages effect */}
      <RoundedBox args={[1.98, 2.78, 0.08]} radius={0.05} smoothness={4} position={[0.02, -0.02, -0.05]}>
        <meshStandardMaterial color="#F5F5DC" />
      </RoundedBox>
      
      <RoundedBox args={[1.96, 2.76, 0.06]} radius={0.05} smoothness={4} position={[0.04, -0.04, -0.1]}>
        <meshStandardMaterial color="#FAFAF0" />
      </RoundedBox>
    </group>
  );
}
