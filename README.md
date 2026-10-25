# MINX — Minecraft Server Website

Offizielle Website für den MINX Minecraft Min-Server.

**URL:** https://bobbobinson007.github.io/minx/

## Seiten

- **Home** – Server Status, Quick-Infos
- **Stats** – Verluststatistiken, Leaderboard, Live-Server-Status
- **Skins** – Server-Skin-Galerie
- **Datenschutz** – Privacy & Security

## Technik

- Reines HTML/CSS/JS – keine Server-seitige Logik
- Gehostet auf GitHub Pages
- Live-Status via [mcsrvstat.us](https://api.mcsrvstat.us)
- Schwarz-Weiß Design
- Kein Tracking, keine Cookies, keine Drittanbieter-Skripte

## Lokal testen

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Deployment

Push to `main` → GitHub Pages deployed automatisch nach `/minx/`.</think>

<｜DSML｜tool_calls>
<｜DSML｜invoke name="exec">
<｜DSML｜parameter name="command" string="true">cd /tmp/minx-site && git add -A && git status