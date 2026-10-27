# Operation: Level 28

A private, interactive invitation for a 28th birthday: a classified dossier opener, a road-trip briefing, breakfast and lunch preferences, an RSVP, and a WhatsApp send-off.

Plain HTML, CSS and JavaScript. No build step and nothing to install, so it runs directly on GitHub Pages.

## Project structure

```
operation-level-28/
├── index.html          ← page structure and most of the wording
├── css/styles.css      ← all styling (colors are at the top in :root)
├── js/config.js        ← PERSONALIZE HERE: names, WhatsApp number, date, food options, terms
├── js/app.js           ← page logic (countdown, forms, RSVP, WhatsApp); usually no need to edit
├── assets/favicon.svg  ← the browser tab icon
└── .vscode/extensions.json  ← suggests the Live Server extension
```

## 1. Open it in VS Code

1. Unzip the folder.
2. In VS Code: **File → Open Folder…** and choose `operation-level-28`.
3. When VS Code suggests installing **Live Server**, accept. (Or install it from the Extensions tab: search "Live Server" by Ritwick Dey.)
4. Right-click `index.html` → **Open with Live Server**. The site opens in your browser and reloads every time you save.

To preview on your phone: run Live Server, then on the same Wi-Fi open `http://<your-computer-IP>:5500` on the phone.

## 2. Personalize

Edit `js/config.js`:

```js
herName: "Kareen",    // her name: dossier, boarding pass
nickname: "Kooks",    // used on the envelope, the note and the RSVP question
myName: "",           // your name: signs the note and the boarding pass
whatsappNumber: "",   // digits only, e.g. "96170123456" (961 + number without the leading 0)
eventStart: "2026-11-08T00:00:00+02:00",   // countdown target (Beirut is UTC+2 in November)
eventDateLabel: "Sunday, November 8, 2026",
```

Also in `config.js`: `breakfast`, `drinks`, `lunch` (options shown as cards; `icon` is any name from https://lucide.dev/icons), `terms`, and `peeks` (the replies on the mystery cards).

| To change | Edit |
|---|---|
| Colors | `css/styles.css`, the `--paper`, `--ink`, `--olive`, `--rust` tokens at the top |
| Fonts | `--f-display`, `--f-body`, etc. in `styles.css` and the Google Fonts link in `index.html` |
| Section wording, pickup time/place ("To be announced") | `index.html` |
| WhatsApp link preview | `og:title` / `og:description` in `index.html` |

## 3. How her answers reach you

Nothing is sent automatically and there is no database.
- **Send on WhatsApp** opens WhatsApp with her answers already typed; it's delivered only when she taps send.
- **Copy my answers** copies the same text.
- With no `whatsappNumber` set, WhatsApp asks her which chat to use.
- Her selections are saved as a draft in her own browser only (localStorage).

## 4. Put it on GitHub and get a link (GitHub Pages)

**From VS Code (easiest):**
1. Click the **Source Control** icon on the left → **Publish to GitHub**.
2. Sign in to GitHub when asked, choose **public repository**, name it e.g. `operation-level-28`.
3. On github.com open the repository → **Settings → Pages**.
4. Under *Build and deployment*: Source **Deploy from a branch**, Branch **main**, folder **/ (root)** → **Save**.
5. After a minute your site is live at `https://<your-username>.github.io/operation-level-28/`.

**Without VS Code's button:** create an empty public repo on github.com, then in the VS Code terminal:

```bash
git init
git add .
git commit -m "Operation: Level 28"
git branch -M main
git remote add origin https://github.com/<your-username>/operation-level-28.git
git push -u origin main
```

Then do steps 3 to 5 above.

**To update later:** edit, then in Source Control write a message, **Commit**, and **Sync Changes**. The site updates in about a minute.

Note: on the free plan the repository is public, so anyone who finds it can read the code, including your WhatsApp number in `config.js`. The site itself has `noindex`, so search engines won't list it.

## 5. Send it

Open the GitHub Pages link on your own phone and do a full test run (unlock, fill in, tap Send, check the message). Then paste the link into her WhatsApp chat.
