# Archived: Perlin canvas wave background

This folder preserves the previous full-page wave background implementation before the marketing redesign.

## Contents

- `WaveBackground.jsx` — React component with `ClassicalNoise` Perlin noise and canvas line animation (fixed `z-index: -1`).
- `claude-wave1.html` / `claude-wave2.html` — Early standalone wave experiments from `src/neon-glass-design/`.
- `wave-button.css.txt` — Snapshot of `.wave-button-container` and `@keyframes wave` from global CSS (used on Frameworks / DemoLive).

## Restore

1. Copy `WaveBackground.jsx` back to `src/components/WaveBackground.jsx` (or re-export from here).
2. In any page: `import WaveBackground from '@/components/WaveBackground'` and render `<WaveBackground />` near the root of the page (typically first child inside a `relative` wrapper).
3. Previously used on: Home, Why, Pricing, FAQ, Contact, About, Terms, Frameworks, DemoLive.

Do not layer this under the WebGL Dark Veil background without tuning opacity—pick one primary motion layer.
