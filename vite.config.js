import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['./assets/icons/icon-192x192-any.png', './assets/icons/icon-192x192-maskable.png', './assets/icons/icon-512x512-any.png', './assets/icons/icon-512x512-maskable.png', './assets/screenshots/narrow.png', './assets/screenshots/wide.png'],
      manifest: {
        "name": "Gemu, an ethical game studio checker",
        "short_name": "Gemu",
        "description": "Gemu is a PWA that allows the user to check if a game studio is ethical (no crunch, no drama, etc...)",

        "theme_color": "???",
        "background_color": "???",

        "display": "standalone",
        "orientation": "portrait",
        "scope": "/",
        "start_url": "/",

        "icons": [
          {
            "src": "assets/icons/icon-192x192-any.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "assets/icons/icon-192x192-maskable.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "assets/icons/icon-512x512-any.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "assets/icons/icon-512x512-maskable.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],

        "screenshots": [
          {
            "src": "assets/screenshots/narrow.png",
            "sizes": "390x720",
            "type": "image/png",
            "form_factor": "narrow",
            "label": "TODO"
          },
          {
            "src": "assets/screenshots/wide.png",
            "sizes": "1280x720",
            "type": "image/png",
            "form_factor": "wide",
            "label": "TODO"
          }
        ]
      }
    })
  ]
});