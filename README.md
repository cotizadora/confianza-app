# Confianza Inmobiliaria — App de ejecutivos

App web instalable (PWA) para los ejecutivos de arriendos de Confianza Inmobiliaria:
inventario con filtros, generador de posts para Facebook y WhatsApp, firma personal y centro de tutoriales.

**En vivo:** https://cotizadora.github.io/confianza-app/

## Estructura

| Ruta | Qué es |
|---|---|
| `index.html` | La app completa (HTML + CSS + JS en un solo archivo). |
| `sw.js`, `manifest.webmanifest`, `icon-*.png` | Instalación como app y funcionamiento sin conexión. |
| `og-image.png` | Miniatura al compartir el link. |
| `data/export.csv` | Inventario de respaldo (cada ejecutivo carga el suyo desde Assetplan en la tuerca). |
| `tutoriales/` | Centro de tutoriales integrado: `index.html`, `data/`, `videos/`, `thumbs/`, `docs/` (PDF). |

Creada por Eduardo Pérez.
