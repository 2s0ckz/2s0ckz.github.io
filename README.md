# Jordan Houri — GitHub Pages personal site

Version 97 adds a minimum radius to the particle-background cylinder.

- particle radius = max(content cylinder radius, 1200px)
- particle surface still rotates with the same content orbit phase
- this reduces strong cylindrical distortion on small/mobile screens
- desktop is unchanged whenever the content cylinder radius already exceeds 1200px

All content-panel geometry, responsive sizing, scrolling, snapping, opacity,
2px blur, sharp corners, and arrow spacing from v96 are unchanged.
