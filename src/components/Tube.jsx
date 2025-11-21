import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import useStore from '../store/useStore';
import { createTubeGeometry } from '../utils/geometry';
import * as THREE from 'three';

export default function Tube({ tube, isSelected, onSelect, onDrag }) {
  const meshRef = useRef();
  const wireframe = useStore((state) => state.wireframe);
  
  const geometry = useMemo(() => {
    return createTubeGeometry(
      tube.type,
      tube.width,
      tube.height,
      tube.thickness,
      tube.length
    );
  }, [tube.type, tube.width, tube.height, tube.thickness, tube.length]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(...tube.position);
      meshRef.current.rotation.set(...tube.rotation);
    }
  });

  const material = useMemo(() => {
    const color = isSelected ? 0x00ff00 : 0x4169e1;
    return wireframe
      ? new THREE.MeshBasicMaterial({
          color,
          wireframe: true,
          transparent: true,
          opacity: 0.8,
        })
      : new THREE.MeshStandardMaterial({
          color,
          metalness: 0.3,
          roughness: 0.7,
        });
  }, [isSelected, wireframe]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(tube.id);
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        onSelect(tube.id);
      }}
      castShadow
      receiveShadow
    />
  );
}

