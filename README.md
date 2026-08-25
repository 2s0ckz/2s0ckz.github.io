# Jordan Houri — GitHub Pages starter

Version 42 restructures proton scatter-secondary emission.

The emission probability is no longer hidden inside a function that is invoked
at every scatter vertex.

At each proton scatter vertex:
- `emitsSecondary` is decided exactly once with `Math.random() < 0.095`
- only if that boolean is true is `spawnAtProtonScatter()` called
- among productive vertices, the daughter mix preserves the previous
  8% electron / 1.5% photon overall proportions
- scatter daughters remain terminal (`maxGeneration: 0`)
- proton always continues

This makes the control flow explicit: non-productive vertices never invoke the
secondary spawning function at all.
