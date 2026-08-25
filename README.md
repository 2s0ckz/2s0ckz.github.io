# Jordan Houri — GitHub Pages starter

Version 54 fixes the effective CT-arc parallax behavior.

The nominal parallax remains 25%, but the previous version recalculated the
entire arc layout on every scroll event. On browsers where viewport height
changes while scrolling, that moved arc centers in addition to the 25%
translation and made the apparent parallax much faster.

v54:
- scroll only applies `translateY(-0.25 * scrollY)`
- arc layout and density are not recomputed while scrolling
- virtual height remains `viewport + 0.25 * real scroll distance`
- density remains ~3 arcs per 1080 px of that virtual field
- layout is recomputed only on initial load and resize
