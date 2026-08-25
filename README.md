# Jordan Houri — GitHub Pages personal site

Version 104 addresses three interaction/layout details.

1. Orbit drag text-selection lock
- text remains normally selectable when a pointer starts directly over rendered text
- once a genuine orbit drag begins from a drag-enabled area, a temporary body class
  disables selection everywhere until pointer release/cancel
- the lock is defensively removed on vertical-touch cancellation and window blur

2. Desktop top spacing
- the empty legacy heading/control row is collapsed to zero height on desktop
- the existing mobile top spacing is explicitly preserved at 12px top / 8px bottom

3. Active-panel navigation
- viewport-level arrows are removed
- each orbit card owns its own previous/next navigation controls
- only the currently central/nearest card exposes them
- controls sit in the panel's left and right margins
- the visible shapes contain no literal `<` or `>` characters
- each chevron is drawn from two long 1px diagonal strokes, spanning 90% of panel height
- no border, box, or background is shown

Orbit geometry, responsive scaling, particle background, card blur, and sharp corners remain unchanged.
