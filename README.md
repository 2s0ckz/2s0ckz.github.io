# Jordan Houri — GitHub Pages personal site

Version 78 fixes the actual mobile camera geometry.

Root cause:
- CSS `perspective` is the distance from the camera to the z=0 plane
- on desktop, perspective ~= 1400 px and cylinder radius ~= 1400 px, so the
  camera naturally sits near the cylinder center
- on mobile, v77 forced perspective to 2200 px while the cylinder radius is only
  a few hundred pixels
- that literally placed the virtual camera well OUTSIDE the mobile cylinder

v78:
- mobile CSS perspective is set dynamically to the computed cylinder radius R
- panel positions use the full exact cylinder equations again:
  x = R sin(theta)
  z = R (1 - cos(theta))
  rotateY = -theta
- mobile panels beyond the +/-90 degree camera horizon are hidden instead of
  passing behind the camera plane and flipping
- particle projection uses the same shared cylinder radius as its mobile focal
  distance so the background camera matches the panel camera
- desktop geometry remains at its established 1400 px perspective
