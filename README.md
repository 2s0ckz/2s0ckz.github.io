# Jordan Houri — GitHub Pages personal site

Version 75 improves wheel gesture separation and title-bar translucency.

Wheel behavior
- vertical scrolling inside a scrollable panel owns the entire wheel/trackpad gesture
- after that panel reaches its top or bottom, remaining momentum from the same
  gesture is consumed rather than being passed to orbit navigation
- orbit navigation is re-enabled only after 330 ms with no wheel events
- orbit switching still requires the 260-unit threshold
- wheel-triggered orbit transitions still use arrowEase = 0.075

Visual changes
- removed the “Scroll, drag, or use the arrows…” instruction text
- title bar now uses the same rgba(12,15,26,0.5625) translucent background as
  the content panels, allowing particle tracks to remain visible behind it
