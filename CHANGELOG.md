# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - Initial Release

### Added
- Interactive 3D visualization of rectangular and square tubes
- Tube parameter controls (type, width, height, thickness, length)
- Joint angle configuration with snapping to standard angles (45°, 90°, 135°)
- Interactive tube positioning (drag, rotate, position)
- Automatic joint detection and preview when tubes are positioned close together
- Multiple tube support for creating assemblies
- View controls: zoom, pan, rotate workspace
- Wireframe and solid view toggle
- Joint region highlighting
- Undo/redo functionality for tube operations
- Electron packaging for standalone desktop application
- Cross-platform support (macOS, Windows, Linux)

### Technical Implementation
- React-based UI with Three.js for 3D rendering
- React Three Fiber for declarative 3D scene management
- Zustand for state management
- Electron for desktop application framework
- Electron Builder for application packaging

