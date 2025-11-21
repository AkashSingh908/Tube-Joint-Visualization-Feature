# Quick Start Guide

## First Time Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Test the Application (Development)**
   ```bash
   npm start
   ```
   This opens the app in your browser at http://localhost:3000

3. **Test with Electron (Development)**
   ```bash
   npm run electron-dev
   ```
   This opens the app in an Electron window

## Building for Production

1. **Build React App**
   ```bash
   npm run build
   ```

2. **Package as Executable**
   ```bash
   npm run build:electron
   ```

3. **Find Your Executable**
   - Check the `dist/` folder
   - Look for platform-specific files:
     - macOS: `.dmg` file
     - Windows: `.exe` installer
     - Linux: `.AppImage` file

## Using the Application

1. **Add a Tube**
   - Configure tube parameters (type, dimensions, thickness, length)
   - Set position (X, Y, Z) and rotation angle
   - Click "Add Tube"

2. **Select and Edit Tubes**
   - Click on a tube in the 3D view to select it
   - Modify position/rotation in the controls panel
   - Click "Update Selected Tube"

3. **View Controls**
   - **Rotate**: Left-click and drag
   - **Pan**: Right-click and drag (or middle mouse button)
   - **Zoom**: Scroll wheel
   - **Toggle Wireframe**: Use the "Wireframe View" button

4. **Joint Detection**
   - Position tubes close to each other
   - A red sphere will appear at the joint location
   - Joints are automatically detected when tubes are within proximity

5. **Undo/Redo**
   - Use the Undo/Redo buttons to revert or reapply changes

## Troubleshooting

- **Build fails**: Make sure all dependencies are installed (`npm install`)
- **Electron won't start**: Ensure React dev server is running first (`npm start` in another terminal)
- **3D view is blank**: Check browser console for errors, ensure WebGL is enabled

