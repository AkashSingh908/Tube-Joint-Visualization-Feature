# Tube Joint Visualizer

An interactive desktop application for creating, visualizing, and manipulating joints between rectangular or square tubes at various angles.

## Features

- **Interactive 3D Visualization**: Create and manipulate rectangular/square tube joints in real-time
- **Tube Configuration**: 
  - Choose between rectangular or square tube types
  - Adjust width, height, thickness, and length
- **Joint Management**:
  - Set joint angles (with snapping to standard angles)
  - Automatic joint detection and preview
  - Position and rotate tubes interactively
- **View Controls**:
  - Zoom, pan, and rotate the workspace
  - Toggle between wireframe and solid views
  - Highlight joint regions
- **Assembly Management**:
  - Add multiple tubes to form assemblies
  - Undo/redo functionality

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tube-joint-visualizer
```

2. Install dependencies:
```bash
npm install
```

## Development

### Running in Development Mode

To run the application in development mode (with hot reload):

```bash
npm start
```

This will start the React development server. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Running with Electron (Development)

To run the Electron app in development mode:

```bash
npm run electron-dev
```

## Building the Application

### Build React App

First, build the React application:

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Package as Standalone Executable

To package the application into a standalone executable:

```bash
npm run build:electron
```

This will:
1. Build the React application
2. Package it with Electron
3. Create platform-specific installers:
   - **macOS**: `.dmg` file
   - **Windows**: `.exe` installer (NSIS)
   - **Linux**: `.AppImage` file

### Locating the Executable

After running `npm run build:electron`, the packaged application will be located in:

- **macOS**: `dist/Tube Joint Visualizer-<version>.dmg`
- **Windows**: `dist/Tube Joint Visualizer Setup <version>.exe`
- **Linux**: `dist/Tube Joint Visualizer-<version>.AppImage`

## Project Structure

```
tube-joint-visualizer/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Canvas3D.jsx   # 3D visualization component
│   │   ├── Controls.jsx   # UI controls panel
│   │   └── Tube.jsx       # Tube component
│   ├── store/             # State management (Zustand)
│   ├── utils/             # Utility functions
│   ├── App.js             # Main app component
│   └── index.js           # Entry point
├── electron/              # Electron main process
│   └── main.js           # Electron entry point
├── build/                 # Production build output
├── dist/                  # Packaged executables
├── package.json
└── README.md
```

## Usage

1. **Select Tube Type**: Choose between "Rectangular" or "Square" from the dropdown
2. **Configure Tube**: Set width, height, thickness, and length using the input fields
3. **Add Tube**: Click "Add Tube" to place a new tube in the workspace
4. **Position Tubes**: 
   - Click and drag tubes to move them
   - Use rotation controls to orient tubes
   - Tubes will snap to standard angles (45°, 90°, 135°) when close
5. **View Controls**:
   - **Zoom**: Scroll wheel or pinch gesture
   - **Pan**: Right-click and drag
   - **Rotate**: Left-click and drag
   - **Toggle View**: Use the "Wireframe" toggle button
6. **Joint Preview**: When tubes are positioned close to each other, a joint preview will appear
7. **Undo/Redo**: Use the undo/redo buttons to revert or reapply actions

## Packaging Steps

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Build the Application

```bash
npm run build:electron
```

This command:
- Compiles the React application
- Bundles all dependencies
- Creates platform-specific installers

### Step 3: Extract/Locate the Executable

The final executable will be in the `dist/` directory:

- **macOS**: Double-click the `.dmg` file to mount it, then drag the app to Applications
- **Windows**: Run the `.exe` installer
- **Linux**: Make the `.AppImage` executable (`chmod +x`) and run it

## Technologies Used

- **React**: UI framework
- **Three.js**: 3D graphics library
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Useful helpers for R3F
- **Zustand**: State management
- **Electron**: Desktop application framework
- **Electron Builder**: Application packaging

## License

MIT

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed version history and changes.

