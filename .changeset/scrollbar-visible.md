---
"@sdwa/tokens": minor
---

New Tailwind utility `scrollbar-visible` in `theme.css`. Add it to a scroll container (for example `overflow-y-auto scrollbar-visible`) to keep a themed scrollbar on screen instead of an overlay scrollbar that hides until you scroll. It works in Chrome, Edge and desktop Safari. Firefox gets the theme colours, but its overlay scrollbars follow the user's settings. iOS Safari ignores custom scrollbar styling, so keep a non-scrollbar cue such as a "Scroll to see all" line. See the README.
