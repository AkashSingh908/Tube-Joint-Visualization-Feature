import React, { useState } from 'react';
import useStore from '../store/useStore';
import { snapAngle } from '../utils/geometry';
import './Controls.css';

export default function Controls() {
  const {
    currentTubeConfig,
    setCurrentTubeConfig,
    addTube,
    tubes,
    selectedTubeId,
    updateTube,
    deleteTube,
    toggleWireframe,
    wireframe,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useStore();

  const [rotationAngle, setRotationAngle] = useState(0);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [positionZ, setPositionZ] = useState(0);

  const handleAddTube = () => {
    const snappedAngle = snapAngle(rotationAngle);
    const angleRad = (snappedAngle * Math.PI) / 180;
    addTube([positionX, positionY, positionZ], [0, angleRad, 0]);
    // Reset position inputs
    setPositionX(0);
    setPositionY(0);
    setPositionZ(0);
    setRotationAngle(0);
  };

  const handleUpdateSelectedTube = () => {
    if (!selectedTubeId) return;
    const snappedAngle = snapAngle(rotationAngle);
    const angleRad = (snappedAngle * Math.PI) / 180;
    updateTube(selectedTubeId, {
      position: [positionX, positionY, positionZ],
      rotation: [0, angleRad, 0],
    });
  };

  const handleDeleteTube = () => {
    if (selectedTubeId) {
      deleteTube(selectedTubeId);
    }
  };

  const selectedTube = tubes.find((t) => t.id === selectedTubeId);

  return (
    <div className="controls-panel">
      <div className="controls-section">
        <h2>Tube Configuration</h2>
        
        <div className="control-group">
          <label>Tube Type:</label>
          <select
            value={currentTubeConfig.type}
            onChange={(e) =>
              setCurrentTubeConfig({ type: e.target.value })
            }
          >
            <option value="rectangular">Rectangular</option>
            <option value="square">Square</option>
          </select>
        </div>

        {currentTubeConfig.type === 'rectangular' && (
          <>
            <div className="control-group">
              <label>Width:</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={currentTubeConfig.width}
                onChange={(e) =>
                  setCurrentTubeConfig({
                    width: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="control-group">
              <label>Height:</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={currentTubeConfig.height}
                onChange={(e) =>
                  setCurrentTubeConfig({
                    height: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
          </>
        )}

        {currentTubeConfig.type === 'square' && (
          <div className="control-group">
            <label>Size:</label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={currentTubeConfig.width}
              onChange={(e) =>
                setCurrentTubeConfig({
                  width: parseFloat(e.target.value) || 0,
                  height: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>
        )}

        <div className="control-group">
          <label>Thickness:</label>
          <input
            type="number"
            step="0.1"
            min="0.01"
            value={currentTubeConfig.thickness}
            onChange={(e) =>
              setCurrentTubeConfig({
                thickness: parseFloat(e.target.value) || 0,
              })
            }
          />
        </div>

        <div className="control-group">
          <label>Length:</label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            value={currentTubeConfig.length}
            onChange={(e) =>
              setCurrentTubeConfig({
                length: parseFloat(e.target.value) || 0,
              })
            }
          />
        </div>
      </div>

      <div className="controls-section">
        <h2>Position & Rotation</h2>
        
        <div className="control-group">
          <label>X Position:</label>
          <input
            type="number"
            step="0.1"
            value={positionX}
            onChange={(e) => setPositionX(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="control-group">
          <label>Y Position:</label>
          <input
            type="number"
            step="0.1"
            value={positionY}
            onChange={(e) => setPositionY(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="control-group">
          <label>Z Position:</label>
          <input
            type="number"
            step="0.1"
            value={positionZ}
            onChange={(e) => setPositionZ(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="control-group">
          <label>Rotation Angle (degrees):</label>
          <input
            type="number"
            step="1"
            value={rotationAngle}
            onChange={(e) => setRotationAngle(parseFloat(e.target.value) || 0)}
          />
          <small>Will snap to: 0°, 45°, 90°, 135°, 180°</small>
        </div>
      </div>

      <div className="controls-section">
        <h2>Actions</h2>
        
        <button className="btn btn-primary" onClick={handleAddTube}>
          Add Tube
        </button>

        {selectedTube && (
          <>
            <button
              className="btn btn-secondary"
              onClick={handleUpdateSelectedTube}
            >
              Update Selected Tube
            </button>
            <button className="btn btn-danger" onClick={handleDeleteTube}>
              Delete Selected Tube
            </button>
            <div className="info-box">
              <strong>Selected:</strong> Tube #{selectedTube.id}
            </div>
          </>
        )}

        <div className="button-group">
          <button
            className="btn btn-secondary"
            onClick={undo}
            disabled={!canUndo()}
          >
            Undo
          </button>
          <button
            className="btn btn-secondary"
            onClick={redo}
            disabled={!canRedo()}
          >
            Redo
          </button>
        </div>
      </div>

      <div className="controls-section">
        <h2>View Options</h2>
        
        <button
          className={`btn ${wireframe ? 'btn-active' : 'btn-secondary'}`}
          onClick={toggleWireframe}
        >
          {wireframe ? 'Solid View' : 'Wireframe View'}
        </button>

        <div className="info-box">
          <strong>Tubes in scene:</strong> {tubes.length}
        </div>
      </div>

      <div className="controls-section">
        <h2>Instructions</h2>
        <div className="instructions">
          <p>• Click "Add Tube" to place a new tube</p>
          <p>• Click on a tube to select it</p>
          <p>• Use mouse to rotate/zoom/pan the view</p>
          <p>• Joints are highlighted when tubes are close</p>
          <p>• Use Undo/Redo to revert changes</p>
        </div>
      </div>
    </div>
  );
}

