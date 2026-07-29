# To the joy of sharing love through letters 💌

A tiny, free website that turns into a daily letter for a friend on Erasmus
in Greece — one tap of an NFC keychain, one quote and message per day, for
180 days.

No backend, no database, no accounts. Just HTML, CSS, and JavaScript,
hosted for free on GitHub Pages.

---

## What's inside

```
├── index.html      → the page structure
├── style.css        → the Aegean-inspired design
├── script.js        → the logic (day counting, Greek word, etc.)
├── quotes.json       → all 180 days of quotes + messages
├── images/           → put your photos in here (see below)
└── README.md         → you're reading it
```

---

## 1. Put the site on GitHub

1. Create a free GitHub account if you don't have one: https://github.com/join
2. Create a **new repository** (top right → "New repository").
   - Name it anything, e.g. `erasmus-letters`.
   - Set it to **Public** (GitHub Pages' free tier needs a public repo,
     unless you have GitHub Pro).
   - Don't add a README from GitHub's UI — you already have one.
3. Upload the files:
   - Easiest way: on the repository page, click **"Add file" → "Upload files"**,
     then drag in `index.html`, `style.css`, `script.js`, `quotes.json`,
     `README.md`, and the whole `images` folder.
   - Click **Commit changes**.

---

## 2. Turn on GitHub Pages

1. In your repository, go to **Settings → Pages** (left sidebar, under "Code and automation").
2. Under **Build and deployment → Source**, choose **"Deploy from a branch"**.
3. Under **Branch**, choose **`main`** (or `master`) and folder **`/ (root)`**, then **Save**.
4. Wait about 1–2 minutes. Refresh the page — you'll see a green box with your
   live URL, something like:

   ```
   https://your-username.github.io/erasmus-letters/
   ```

5. Open that link on your phone to confirm it works and looks right. 🎉

---

## 3. Program the NFC tag

You'll need an NFC-writing app (free, no account needed) and any blank
NFC tag/sticker (the kind sold for keychains).

**Recommended app:** *NFC Tools* (free — [iOS](https://apps.apple.com/app/nfc-tools/id1252962749)
/ [Android](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc))

1. Install NFC Tools and open it.
2. Tap **"Write"**.
3. Tap **"Add a record" → "URL / URI"**.
4. Paste in your GitHub Pages link from step 2, e.g.
   `https://your-username.github.io/erasmus-letters/`
5. Tap **"Write"**, then hold your phone against the NFC tag until it
   confirms success.
6. Test it: lock your phone, tap the tag against it, and the site should
   open automatically (Android opens it directly; iPhones show a
   notification banner you tap to open).

That's it — the keychain is now linked for good. You never need to touch
the tag again; all future updates just happen on GitHub.

---

## 4. Customizing things later

Everything is written to be easy to tweak, even without much coding
experience. Look for the ✏️ marks.

### Change the start date
Open `script.js` and find this near the top:

```js
const START_DATE = "2026-09-01";
```

Change the date to the real Erasmus start date, in `YYYY-MM-DD` format.
Day 1 will always be this date, and Day 180 is calculated automatically
from there.

### Edit or rewrite quotes
Open `quotes.json`. Each day looks like this:

```json
{
  "day": 47,
  "quote": "Follow your bliss and the universe will open doors where there were only walls.",
  "author": "Joseph Campbell",
  "message": "Little reminder from a friend who misses you: say yes to the thing that scares you a little."
}
```

- `day` — which day this entry belongs to (1–180). Don't change this unless
  you're intentionally moving content to a different day.
- `quote` — the quote text.
- `author` — who said it. Use `null` (no quotes around it) for your own
  original lines, like: `"author": null`
- `message` — your personal note for that day.

Any text editor works (even GitHub's own built-in editor: open the file
on GitHub.com and click the pencil ✏️ icon to edit directly in the browser).

### Add photos to the memory section
1. Add your photo files into the `images/` folder (keep them under ~500KB
   each so the page stays fast — most phones can resize automatically
   when you export/share a photo).
2. Open `index.html` and find the section marked:
   ```html
   <!-- ================= HOW TO ADD PHOTOS ================= -->
   ```
3. Just under it, there's a commented-out example block. Copy it, remove
   the `<!--` and `-->` around it, and update the `src` and caption:
   ```html
   <figure class="memory-slot">
     <img src="images/day12.jpg" alt="Sunset in Chania">
     <figcaption>Day 12 — Chania sunset</figcaption>
   </figure>
   ```
4. You can add as many of these as you like — the grid will keep flowing
   into new rows automatically. Feel free to delete the placeholder `+`
   boxes once you've added real photos.

### Add a real Spotify playlist
In `script.js`, find:

```js
const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/";
```

Replace it with a link to any playlist (open the playlist in Spotify →
Share → Copy Link).

### Edit the Greek word of the day
Also in `script.js`, find the `GREEK_WORDS` list — add, remove, or reorder
entries freely. The list simply loops for as long as the journey lasts.

---

## After committing changes

Every time you edit a file on GitHub (or push changes from a computer),
GitHub Pages automatically rebuilds the live site within a minute or two.
Nothing else to do — the same NFC tag keeps working forever, since it just
points at the URL, not the content itself.

---

Made with a lot of love, for someone about to have the adventure of her life. 🇬🇷
