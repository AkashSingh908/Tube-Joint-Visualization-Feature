import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Canvas3D from './components/Canvas3D';
import Controls from './components/Controls';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="canvas-container">
        <Canvas
          shadows
          gl={{ antialias: true }}
        >
          <PerspectiveCamera makeDefault position={[10, 10, 10]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
          />
          <gridHelper args={[20, 20]} />
          <axesHelper args={[5]} />
          <Canvas3D />
        </Canvas>
      </div>
      <Controls />
    </div>
  );
}

export default App;

