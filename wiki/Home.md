# j-make Wiki

j-make is a lightweight client-side JavaScript library that builds your page's DOM from a JSON array and populates each element by fetching content from a corresponding directory on your server.

**[Live Demo](https://j-make.richardkentgates.com)**

---

## How it works

1. You define your page structure in `body.json` as a nested array of HTML tag names.
2. j-make reads that array on `DOMContentLoaded`, creates each element, and appends it to `<body>`.
3. Each created element receives a `data-path` attribute derived from its tag name and position in the tree.
4. j-make fetches the `index.*` file from that path on your server and prepends the response into the element.
5. Any server-side language your web server supports can be used — `index.html`, `index.php`, etc.

---

## Pages

| Page | Description |
|---|---|
| [Getting Started](Getting-Started) | Installation and project setup |
| [body.json](body.json) | How to define your page structure |
| [Directory Structure](Directory-Structure) | How j-make maps elements to file paths |
| [Generated DOM Attributes](Generated-DOM-Attributes) | `data-key`, `data-path`, and the `j-make` class |
| [Serving and Hosting](Serving-and-Hosting) | Local development and deployment notes |
| [Troubleshooting](Troubleshooting) | Common problems and solutions |

---

## Quick start

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
            integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
            crossorigin="anonymous"></script>
    <!-- j-make via jsDelivr — no download needed -->
    <script src="https://cdn.jsdelivr.net/gh/richardkentgates/j-make@master/j-make.js"></script>
</head>
<body></body>
</html>
```

```json
// body.json
["header", "main", "footer"]
```

```
index.html
body.json
j-make.js
body/
    header_0/
        index.html
    main_1/
        index.html
    footer_2/
        index.html
```

Serve from any web server. On page load, j-make builds `<header>`, `<main>`, and `<footer>` inside `<body>`, then fetches and injects each element's corresponding `index.html`.
