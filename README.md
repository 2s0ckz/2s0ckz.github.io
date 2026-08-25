# Jordan Houri — GitHub Pages personal site

Version 70 adds a viewer-centered cylindrical particle background.

Particle surface:
- particle simulation x-coordinate now represents one full 360-degree cylindrical circumference
- rendering projects particle trails from the viewer at the cylinder center
- horizontal projection uses tan(theta), with vertical perspective scaling by 1/cos(theta)
- peripheral clipping prevents projection singularities near +/-90 degrees
- horizontal simulation boundaries are periodic rather than terminal
- the particle cylinder reads the same live orbit phase as the content cylinder and rotates with it
- primary protons now spawn only from the top of the cylindrical surface
- proton/electron/photon interaction and cascade logic is otherwise unchanged

Existing site behavior retained:
- max panel width 1440 px
- centered viewer-cylinder geometry
- thresholded wheel snapping
- drag-to-nearest-panel snapping
- slower arrow-button animation
- translucent panels
