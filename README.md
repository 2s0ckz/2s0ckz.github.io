# Jordan Houri — GitHub Pages starter

Version 43 makes proton scatter-secondary probability directly auditable.

The scatter emission gate no longer uses a floating-point `Math.random() < 0.095`
comparison.

At each proton scatter vertex:
- increment `window.__particleDebug.protonScatterVertices`
- generate an integer from 0 through 999 using `crypto.getRandomValues()`
  (falling back to `Math.random()` only if Web Crypto is unavailable)
- emit only if the integer is below 95
- increment `window.__particleDebug.protonScatterEmissions` only when emission occurs

This is exactly 95 / 1000 = 9.5%.

You can inspect the live values in the browser console:
`window.__particleDebug`

It exposes:
- `protonScatterVertices`
- `protonScatterEmissions`
- `protonScatterEmissionRate`

Scatter daughters remain terminal and the proton continues after emission.
