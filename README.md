# Jordan Houri — GitHub Pages personal site

Version 82 keeps the true regular-prism face angles but reduces perspective exaggeration.

Geometry:
- six panels still use a 60° normal-to-normal turn
- therefore the interior angle remains exactly 120°
- rotateY remains exact and unchanged

Visual perspective adjustment:
- only z-depth is compressed
- zDepthFactor = 0.58
- x placement and face orientation stay exact
- this should make adjacent panels look less sharply folded while preserving
  the polygon geometry

Particles:
- particle projection uses the same 0.58 perspective compression
- particle physics, generation rate, and cylindrical phase remain unchanged

Mobile vertical-scroll fix from v81 is retained.
