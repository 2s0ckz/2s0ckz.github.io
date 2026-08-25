# Jordan Houri — GitHub Pages personal site

Version 92 keeps the rigid fixed-anchor cylinder from v91 and adds a real
geometric gap between neighboring panel faces.

Radius:
- R = (panelWidth + gap) / (2 * tan(pi / count))
- desktop/tablet gap: 32 px
- mobile gap: 18 px

This means the panels are still anchored at equal angular positions on one
shared cylinder, but the polygon side length is slightly larger than the card
width so adjacent faces no longer touch exactly.

Responsive panel sizing remains:
- 80vw at <=760px
- linearly interpolated to 75vw at 1920px
- max-width 1440px
