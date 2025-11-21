import React, { useMemo } from 'react';
import useStore from '../store/useStore';
import { checkJointProximity, calculateJointAngle } from '../utils/geometry';
import * as THREE from 'three';

export default function JointPreview({ tube1, tube2 }) {
  const showJointPreview = useStore((state) => state.showJointPreview);
  
  const shouldShow = useMemo(() => {
    if (!showJointPreview || !tube1 || !tube2) return false;
    return checkJointProximity(tube1, tube2);
  }, [tube1, tube2, showJointPreview]);

  const jointAngle = useMemo(() => {
    if (!shouldShow) return null;
    return calculateJointAngle(tube1, tube2);
  }, [shouldShow, tube1, tube2]);

  if (!shouldShow) return null;

  const midPoint = [
    (tube1.position[0] + tube2.position[0]) / 2,
    (tube1.position[1] + tube2.position[1]) / 2,
    (tube1.position[2] + tube2.position[2]) / 2,
  ];

  return (
    <group position={midPoint}>
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color={0xff6b6b}
          emissive={0xff6b6b}
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

