import React, { useState } from 'react';
import useStore from '../store/useStore';
import Tube from './Tube';
import JointPreview from './JointPreview';

export default function Canvas3D() {
  const tubes = useStore((state) => state.tubes);
  const selectedTubeId = useStore((state) => state.selectedTubeId);
  const updateTube = useStore((state) => state.updateTube);
  const setSelectedTube = useStore((state) => state.setSelectedTube);
  
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);

  const handleTubeSelect = (id) => {
    setSelectedTube(id);
  };

  const handleTubeDrag = (id, newPosition) => {
    updateTube(id, { position: newPosition });
  };

  return (
    <>
      {tubes.map((tube) => (
        <Tube
          key={tube.id}
          tube={tube}
          isSelected={selectedTubeId === tube.id}
          onSelect={handleTubeSelect}
          onDrag={handleTubeDrag}
        />
      ))}
      {tubes.map((tube1, i) =>
        tubes.slice(i + 1).map((tube2) => (
          <JointPreview key={`${tube1.id}-${tube2.id}`} tube1={tube1} tube2={tube2} />
        ))
      )}
    </>
  );
}

