# Jordan Houri — GitHub Pages starter

Updated static personal/research website built with plain HTML, CSS, and JavaScript.

## Files

- `index.html` — page content
- `style.css` — bone-inspired visual system
- `particles.js` — Geant4-inspired animated particle background
- `assets/Jordan_Houri_CV.pdf` — downloadable CV

## Recent changes

- Page width increased to 1440px
- Particle frequency increased by 25%
- Particle speeds increased by 25%
- Wider top-entry angle range
- Primaries can now also enter from the left and right sides while still traveling downward
- Main content panel changed to an approximation of `bone(0.25)` at 50% opacity
- Text colors now range from about `bone(0.75)` to `bone(1.0)` depending on heading level
- Hyperlinks use approximately `bone(0.50)`

## Deploy on GitHub Pages

1. Create a repository named `YOUR_GITHUB_USERNAME.github.io`.
2. Upload the contents of this folder to the repository root.
3. Commit and push to the `main` branch.
4. In GitHub, open **Settings → Pages**.
5. Set the source to **Deploy from a branch**, select `main`, and use `/ (root)`.
6. Your site will appear at `https://YOUR_GITHUB_USERNAME.github.io/`.


## Build v3 verification
- Exact-ish Matplotlib bone(0.25): RGB(56,56,78)
- Exact-ish bone(0.50): RGB(112,123,144)
- bone(0.75): RGB(169,200,200)
- Cache-busting query strings added to CSS/JS
- 50% top primaries / 25% left / 25% right
- Top entry angles widened to about 36°–144° from +x (±54° about downward)
