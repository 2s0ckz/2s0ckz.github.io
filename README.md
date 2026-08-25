# Jordan Houri — GitHub Pages personal site

Version 95 fixes the remaining viewport-size coupling in the cylinder geometry.

What was already correct
- CSS perspective distance equals the cylinder radius R
- therefore the camera/radius ratio was already constant as the page resized
- card geometry uses untransformed offsetWidth

What was not scale-invariant
- the gap was fixed at 32px/18px while cards changed size
- effectiveSideLength had a hard 320px minimum, so the cylinder could stop
  shrinking even while the cards continued shrinking

v95
- gap is proportional to actual card width:
  gapRatio = 32 / 1440
  desiredGap = panelWidth * gapRatio
- the 320px radius/side-length floor is removed
- radius is now always:
  R = (panelWidth + desiredGap) / (2 tan(pi/N))
- perspective remains exactly R
- perspective-origin is explicitly fixed at 50% 50%
- a stray mobile orbit-controls width override was removed

This makes card width, geometric gap, cylinder radius, and camera distance scale
together at every viewport size.
