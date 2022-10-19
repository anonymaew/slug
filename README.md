## Slug

[Web application](https://slug.napatsc.com) for live metro map and UCSC dining menu.

### What

1. [Live Metro Map](https://slug.napatsc.com/metro): Real-time Santa Cruz metro map, including all bus lines going through UCSC, and other lines too!
   - Toggle bus lines comparing each route and fastest arrival.
2. [UCSC Dining Menu](https://slug.napatsc.com/dining): Quick menu lookup for all UCSC dining halls.
   - Quick lookup between all dining halls.
   - Allergen filter for those with allergies.
   - (implementing) Look up for menu ahead of time, or in the past!

### Why

- I am tired of the slow and clunky [UCSC dining menu website](https://nutrition.sa.ucsc.edu/location.aspx), so I create a faster and more user-friendly [one](https://slug.napatsc.com/dining).
- The [live metro map](https://cruzmetro.com/map/) does already exist, but it can be improved for faster lookup (The mobile UI kinda gives Pre-iOS7 vibes, check it out!), so I clone the app and improve the UI.

### How

1. Static Next.js pages are generated every midnight
   - scraping every dining hall's menus today from [the website](https://nutrition.sa.ucsc.edu/location.aspx) generating a page based on the menu
   - getting all bus waypoints and stops data from [the website's API](https://cruzmetro.com/map/) (there is no official one, but look at the network tab!)
2. Static pages are served along with Next.js API calls
   - (implementing) calling API more for looking up the menu other than today
   - getting every bus's live location from [the website's API](https://cruzmetro.com/map/) and updating every 5 seconds
