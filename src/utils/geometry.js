import * as THREE from 'three';

/**
 * Creates a rectangular or square tube geometry
 */
export function createTubeGeometry(type, width, height, thickness, length) {
  const shape = new THREE.Shape();
  
  if (type === 'square') {
    // Square tube: outer square minus inner square
    const outerSize = width;
    const innerSize = width - 2 * thickness;
    
    // Outer rectangle
    shape.moveTo(-outerSize / 2, -outerSize / 2);
    shape.lineTo(outerSize / 2, -outerSize / 2);
    shape.lineTo(outerSize / 2, outerSize / 2);
    shape.lineTo(-outerSize / 2, outerSize / 2);
    shape.lineTo(-outerSize / 2, -outerSize / 2);
    
    // Inner rectangle (hole)
    const hole = new THREE.Path();
    hole.moveTo(-innerSize / 2, -innerSize / 2);
    hole.lineTo(innerSize / 2, -innerSize / 2);
    hole.lineTo(innerSize / 2, innerSize / 2);
    hole.lineTo(-innerSize / 2, innerSize / 2);
    hole.lineTo(-innerSize / 2, -innerSize / 2);
    shape.holes.push(hole);
  } else {
    // Rectangular tube: outer rectangle minus inner rectangle
    const outerWidth = width;
    const outerHeight = height;
    const innerWidth = width - 2 * thickness;
    const innerHeight = height - 2 * thickness;
    
    // Outer rectangle
    shape.moveTo(-outerWidth / 2, -outerHeight / 2);
    shape.lineTo(outerWidth / 2, -outerHeight / 2);
    shape.lineTo(outerWidth / 2, outerHeight / 2);
    shape.lineTo(-outerWidth / 2, outerHeight / 2);
    shape.lineTo(-outerWidth / 2, -outerHeight / 2);
    
    // Inner rectangle (hole)
    const hole = new THREE.Path();
    hole.moveTo(-innerWidth / 2, -innerHeight / 2);
    hole.lineTo(innerWidth / 2, -innerHeight / 2);
    hole.lineTo(innerWidth / 2, innerHeight / 2);
    hole.lineTo(-innerWidth / 2, innerHeight / 2);
    hole.lineTo(-innerWidth / 2, -innerHeight / 2);
    shape.holes.push(hole);
  }
  
  const extrudeSettings = {
    depth: length,
    bevelEnabled: false,
  };
  
  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

/**
 * Snaps an angle to the nearest standard angle
 */
export function snapAngle(angle, snapAngles = [0, 45, 90, 135, 180]) {
  const normalizedAngle = ((angle % 360) + 360) % 360;
  let minDiff = Infinity;
  let snappedAngle = angle;
  
  for (const snap of snapAngles) {
    const diff = Math.abs(normalizedAngle - snap);
    if (diff < minDiff) {
      minDiff = diff;
      snappedAngle = snap;
    }
  }
  
  // Also check for angles close to snap points (within 5 degrees)
  if (minDiff > 5) {
    return angle;
  }
  
  return snappedAngle;
}

/**
 * Calculates the distance between two 3D points
 */
export function distance3D(p1, p2) {
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const dz = p2[2] - p1[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Checks if two tubes are close enough to form a joint
 */
export function checkJointProximity(tube1, tube2, threshold = 1.0) {
  const pos1 = new THREE.Vector3(...tube1.position);
  const pos2 = new THREE.Vector3(...tube2.position);
  const dist = pos1.distanceTo(pos2);
  
  // Consider tube dimensions for more accurate detection
  const maxDimension1 = Math.max(tube1.width, tube1.height, tube1.length);
  const maxDimension2 = Math.max(tube2.width, tube2.height, tube2.length);
  const effectiveThreshold = threshold + (maxDimension1 + maxDimension2) / 2;
  
  return dist < effectiveThreshold;
}

/**
 * Calculates the angle between two tubes
 */
export function calculateJointAngle(tube1, tube2) {
  const dir1 = new THREE.Vector3(0, 0, 1);
  const dir2 = new THREE.Vector3(0, 0, 1);
  
  // Apply rotations
  const euler1 = new THREE.Euler(...tube1.rotation);
  const euler2 = new THREE.Euler(...tube2.rotation);
  
  dir1.applyEuler(euler1);
  dir2.applyEuler(euler2);
  
  const angle = dir1.angleTo(dir2);
  return (angle * 180) / Math.PI;
}

