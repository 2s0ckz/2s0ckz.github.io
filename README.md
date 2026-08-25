# Jordan Houri — GitHub Pages personal site

Version 80 switches every device to a true regular-polygon cylinder model.

For N panels:
- exterior turn between neighboring face normals = 360° / N
- interior angle between neighboring faces = 180° - 360° / N

For the current 6 panels:
- normal-to-normal turn = 60°
- interior panel-to-panel angle = 120°

Geometry:
- each content panel is treated as one face of a regular N-sided prism
- prism apothem is derived from the actual panel width:
  apothem = panelWidth / (2 tan(π/N))
- CSS perspective is set to that same apothem, placing the virtual camera at
  the prism center on desktop and mobile
- the previous mobile 45° visual compression is removed
- panels beyond the camera horizon are hidden consistently on all devices

The particle background now uses the same uncompressed angular phase and the
same shared apothem/focal distance.

Navigation thresholds, settle time, transition easing, particle generation,
and panel opacity are unchanged.
