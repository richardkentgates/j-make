# Serving and Hosting

j-make uses `$.get()` (AJAX) to load element content from your server. This means the project **must be served over HTTP or HTTPS** — opening `index.html` directly via `file://` will fail due to browser same-origin restrictions.

---

## Local development

Any simple HTTP server will work. A few easy options:

### With Node.js

```bash
npx serve .
```

Then open `http://localhost:3000`.

### With Python

```bash
# Python 3
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

### With VS Code

Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, right-click `index.html`, and choose **Open with Live Server**.

---

## CDN

You do not need to self-host j-make. Reference it from the jsDelivr CDN:

```html
<!-- Latest master (convenient for development) -->
<script src="https://cdn.jsdelivr.net/gh/richardkentgates/j-make@master/j-make.js"></script>

<!-- Pinned to a release tag (recommended for production) -->
<script src="https://cdn.jsdelivr.net/gh/richardkentgates/j-make@1.0.0/j-make.js"></script>
```

### With PHP

```bash
php -S localhost:8080
```

---

## Production hosting

j-make works on any standard web server that can serve static files — or a mix of static files and server-side scripts.

### Static sites (GitHub Pages, Netlify, Vercel, etc.)

If your element `index` files are all `.html`, j-make works on any static host with no additional configuration.

> **Tip:** The j-make docs site is live at [j-make.richardkentgates.com](https://j-make.richardkentgates.com).

#### GitHub Pages automated deployment

The j-make repo includes a GitHub Actions workflow at `.github/workflows/pages.yml` that deploys automatically on every push to `master`. To use it:

1. Go to your repo's **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `master` — the workflow handles the rest.

If you forked or templated the repo, the workflow is already included.

### Server-side scripting (Apache, Nginx + PHP-FPM, etc.)

If you want to use `index.php` or other server-executed files, you need a server that supports that language. Your `body.json` structure and directory layout are the same — only the index file extension changes.

---

## CORS

If element content is loaded from a **different origin** than `index.html`, the browser will block the AJAX request unless the remote server sends appropriate `Access-Control-Allow-Origin` headers.

For most setups everything lives on the same origin, so CORS is not a concern. If you split content across origins, configure your server's CORS policy accordingly.

---

## Base path

j-make always resolves content paths relative to the document root (e.g., `body/header_0/`). If you host j-make at a subdirectory (e.g., `https://example.com/myapp/`), ensure all paths resolve correctly from that base. Most static hosts and web servers handle this automatically when `index.html` is at the root of the deploy directory.
