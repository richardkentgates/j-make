# Getting Started

## Requirements

- A web server (see [Serving and Hosting](Serving-and-Hosting) — `file://` URLs will not work)
- [jQuery 3.7.1+](https://jquery.com/download/)
- j-make (via CDN — no download needed)

---

## Step 1 — Set up your index.html

Create a standard HTML file. Leave `<body>` completely empty — j-make will populate it.
Include jQuery before j-make.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Site</title>
    <link rel="stylesheet" href="style.css">

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
            integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
            crossorigin="anonymous"></script>

    <!-- j-make via jsDelivr CDN -->
    <script src="https://cdn.jsdelivr.net/gh/richardkentgates/j-make@master/j-make.js"></script>
</head>
<body></body>
</html>
```

> **Self-hosting:** If you prefer to serve j-make yourself, download [`j-make.js`](https://github.com/richardkentgates/j-make/blob/master/j-make.js) and change the `src` to `j-make.js`.

---

## Step 2 — Create body.json

This file defines the structure of your page. See [body.json](body.json) for full details.

```json
[
    "header",
    "main",
    [
        "article",
        "aside"
    ],
    "footer"
]
```

---

## Step 3 — Create the directory structure

Create a `body/` folder at the same level as `index.html`. Inside it, add a folder for each element named `{tagname}_{index}`, and place an `index.html` (or `index.php`, etc.) inside each one.

```
index.html
body.json
j-make.js
body/
    header_0/
        index.html
    main_1/
        index.html
        article_0/
            index.html
        aside_1/
            index.html
    footer_2/
        index.html
```

The naming rules are explained in detail in [Directory Structure](Directory-Structure).

---

## Step 4 — Serve and view

Start a local web server in your project root. For example:

```bash
npx serve .
```

Then open `http://localhost:3000` in your browser.

> **Note:** j-make uses AJAX (`$.get`) to load element content. This requires HTTP — opening `index.html` directly via `file://` will fail due to browser security restrictions.
