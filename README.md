# Jordan Houri — GitHub Pages personal site

Version 63 corrects the cylinder's center of rotation.

The prior geometry still behaved like an outside-facing rolodex:
- side panels moved backward in z
- their rotateY sign pointed toward a center behind the page

v63 uses a viewer-centered inside cylinder:
- x = R sin(theta)
- z = R (1 - cos(theta)), so side panels move toward the viewer
- rotateY = -theta, so each panel's front face points inward toward the viewer
- artificial scale falloff is removed
- CSS perspective alone provides the size/depth cue
- perspective is relaxed to 1400px to avoid an exaggerated fisheye effect

The closed six-panel / 60-degree ring and seam-free phase model remain unchanged.
