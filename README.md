# Jordan Houri — GitHub Pages personal site

Version 60 changes the horizontal orbit to an inside-cylinder viewpoint.

- viewer is treated as standing at the center of the cylinder
- side panels rotate away toward the viewer's peripheral field
- depth sign is inverted from the outside-cylinder model
- panel gap reduced to 2 px on desktop and mobile
- viewport perspective strengthened to 700 px
- initial orbit state is fully measured before interaction is enabled
- first panel-switch glitch removed by eliminating transform transition during initialization
- active panel remains centered and up to 1440 px wide
