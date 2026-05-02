# Yanjaa Ganzorig — Personal Blog

A minimal, elegant blog built with plain HTML, CSS, and JavaScript.
No build step. No frameworks. No dependencies.

---

## Running Locally in VS Code

### Option A — Live Preview (recommended, zero setup)

1. Open VS Code
2. Install the **Live Server** extension:
   - Click the Extensions icon in the sidebar (or press `Ctrl+Shift+X` / `Cmd+Shift+X`)
   - Search "Live Server" → install the one by Ritwick Dey
3. Open the `yanjaa-blog` folder in VS Code (`File → Open Folder`)
4. Right-click `index.html` in the file explorer → **"Open with Live Server"**
5. Your browser opens at `http://127.0.0.1:5500` — edits reload automatically

### Option B — No extension needed

Just double-click `index.html` — it opens directly in your browser.
*(Note: the dark/light theme won't persist between pages without a local server,
because `localStorage` is blocked on `file://` in some browsers.)*

---

## File Structure

```
yanjaa-blog/
├── index.html          ← Home page (post list)
├── about.html          ← About page
├── style.css           ← All styles (light + dark theme)
├── theme.js            ← Dark/light toggle logic
├── README.md           ← This file
└── posts/
    ├── on-attention.html
    ├── small-bets.html
    └── questions.html
```

---

## Writing a New Post

1. Copy any file in `posts/` — e.g. duplicate `on-attention.html`
2. Rename it (e.g. `posts/my-new-essay.html`)
3. Edit the `<title>`, the `<h1 class="post-heading">`, the `<p class="post-meta">` date, and the body paragraphs
4. Add a link to it on `index.html`:

```html
<article class="post-item">
  <span class="post-date">June 2025</span>
  <a href="posts/my-new-essay.html" class="post-title">My New Essay Title</a>
  <p class="post-summary">One sentence summary of what the essay is about.</p>
</article>
```

---

## Deploying to Vercel

### Method 1 — Drag & Drop (fastest, ~60 seconds)

1. Go to [vercel.com](https://vercel.com) and sign up / log in
2. Click **"Add New Project"**
3. Drag the entire `yanjaa-blog` folder onto the page
4. Vercel gives you a live URL instantly (e.g. `yanjaa-blog.vercel.app`)

### Method 2 — GitHub (recommended for ongoing updates)

1. Create a free account at [github.com](https://github.com)
2. Create a new repository (e.g. `blog`)
3. Upload your files, or push via terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial blog"
   git remote add origin https://github.com/YOUR_USERNAME/blog.git
   git push -u origin main
   ```
4. Go to [vercel.com](https://vercel.com) → **"Add New Project"** → **Import from GitHub**
5. Select your repo → Deploy

After this, every time you push a change to GitHub, Vercel redeploys automatically.

---

## Customizing

- **Your name / email**: Search for `Yanjaa Ganzorig` and `hello@yanjaa.com` across all files
- **Colors**: Edit the CSS variables at the top of `style.css` (`:root` = light theme, `[data-theme="dark"]` = dark theme)
- **Fonts**: Change the Google Fonts link in each HTML file's `<head>`
