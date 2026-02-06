# Implementation Plan - Spray Patterns Training

The goal is to add a "Spray Patterns" section to the app, similar to Leetify's tool. This will serve as a mechanics training references, showing users the recoil pattern (bullet impacts) and the compensation pattern (mouse movement) for major CS2 weapons.

## Proposed Changes

### 1. Data Structure (`src/data/weapons.js`)
Create a new data file to hold weapon information:
- **Weapon Metadata**: Name, type (Rifle, SMG), magazine size, rate of fire.
- **Pattern Data**: An array of `{x, y}` coordinates representing the recoil offset for every bullet in the spray.

### 2. New Page: `SprayPatterns.jsx`
A dedicated page for this feature.
- **Layout**:
    - **Sidebar/Tabs**: List of weapons to select.
    - **Main Area**: 
        - **Visualizer**: A central target/canvas showing the spray.
        - **Controls**: "Play", "Reset", "Show Mouse Path" vs "Show Bullet Path" toggles.
        - **Stats Panel**: Displaying Fire Rate, Damage, etc.

### 3. Component: `SprayCanvas.jsx`
A reusable component to render the patterns.
- **Props**: `weapon` object, `isPlaying` boolean, `showCompensated` boolean.
- **Logic**: 
    - Use HTML5 Canvas or SVG to draw the lines.
    - Implement an animation loop to draw the bullets over time based on the weapon's RPM (Rounds Per Minute).
    - Draw "Ghost" lines for the full pattern.
    - Animate the active bullet.

### 4. Routing & Navigation
- Add route `/sprays` in `App.jsx`.
- Update `Layout.jsx` to include "Sprays" in the main navigation.
