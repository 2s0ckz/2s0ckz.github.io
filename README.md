# Jordan Houri — GitHub Pages starter

Version 13 fixes the actual arc/particle compositing bug.

## Key fix
The particle canvas used to repaint itself black on every animation frame.
That meant anything placed behind the canvas — including CT arcs — could never be visible.

Now:
- the page body supplies the black background
- the particle canvas is transparent
- the canvas is cleared with `clearRect()` each frame
- CT arcs sit behind particle tracks
- particle tracks visibly pass in front of the arcs
- the content panel/text remains above both
- the arcs retain the ~3–5% opacity and 50% parallax behavior

## Build marker
`v13-transparent-canvas`
