# Jordan Houri — GitHub Pages starter

Version 53 changes the CT reconstruction arc parallax from 50% to 25%.

Arc parallax math:
- real scroll distance = document scroll height - viewport height
- arc virtual height = viewport height + 0.25 * real scroll distance
- arc translation = -0.25 * window scrollY
- density remains ~3 arcs per 1080 px of the updated virtual arc field

Example:
- viewport = 1080 px
- document = 2160 px
- real scroll distance = 1080 px
- 25% parallax travel = 270 px
- virtual arc field = 1350 px
- target arc count = ceil(1350 / 1080 * 3) = 4 arcs
