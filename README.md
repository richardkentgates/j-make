# j-make

A lightweight client-side library that builds your page's DOM from a JSON array and populates each element by fetching content from a corresponding directory on your server.

**[Live Demo](https://j-make.richardkentgates.com)**

---

## How it works

j-make reads `body.json` on `DOMContentLoaded`, creates each HTML element described in the array, and appends it to `<body>`. It then fetches the `index.html` from the corresponding directory on your server and injects it into that element. Nested arrays produce nested elements.

### Path resolution

Every element j-make creates receives two data attributes:

- **`data-key`** — `{tagname}_{siblingIndex}` (zero-based among all siblings, e.g. `aside_1`)
- **`data-path`** — `body/{ancestor keys}/{key}` (e.g. `body/main_1/aside_1`)

The sibling index is counted by walking backwards through `previousElementSibling` in the live DOM. The ancestor chain is built by walking `parentNode` and collecting each ancestor's `data-key` until `<body>` is reached.

### Content injection

For each element, j-make fires a `$.get` request to `{data-path}/index.html`. Responses are sanitised with `$.parseHTML(..., false)` (scripts disabled) before being prepended into the element. All requests run in parallel — there is no waterfall.

See [ARCHITECTURE.md](ARCHITECTURE.md) for a full technical breakdown.

---

## GitHub Pages quickstart

j-make works on GitHub Pages out of the box — no server configuration required. Because all paths are relative, they resolve correctly whether your site is at `user.github.io` or `user.github.io/repo-name/`.

> **Note:** GitHub Pages serves static files only. All element `index` files must be `.html`. Server-side features (PHP, Python, etc.) are not available on GitHub Pages but work on any self-hosted server.

1. Fork or use this repo as a template (click **Use this template** on the [repo homepage](https://github.com/richardkentgates/j-make)).
2. Enable GitHub Pages in your repo settings (**Settings → Pages → Source → GitHub Actions**).
3. Push to `master` — the included Actions workflow deploys automatically.

---

## Installation

### CDN (recommended for GitHub Pages)

Reference j-make directly from jsDelivr — no file to copy or host:

```html
<script src="https://cdn.jsdelivr.net/gh/richardkentgates/j-make@master/j-make.js"></script>
```

For a pinned version (recommended for production), use a tagged release:

```html
<script src="https://cdn.jsdelivr.net/gh/richardkentgates/j-make@1.0.0/j-make.js"></script>
```

### Self-hosted

Download [`j-make.js`](https://github.com/richardkentgates/j-make/blob/master/j-make.js) and serve it alongside your project.

---

## Setup

### index.html

Leave `<body>` empty — j-make populates it. Include jQuery before j-make.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Site</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
            integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
            crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/gh/richardkentgates/j-make@master/j-make.js"></script>
</head>
<body></body>
</html>
```

### body.json

Define your page structure as a nested array of HTML tag names. Strings create elements; arrays nest their contents inside the element named by the preceding string.

```json
[
    "header",
    "main",
    [
        "article",
        "aside",
        [
            "section",
            "section"
        ]
    ],
    "footer"
]
```

### Directory structure

Create a `body/` folder at the root. For each element, add a folder named `{tagname}_{index}` (zero-based) and an `index.html` inside it. j-make fetches that file and injects it into the element.

```
index.html
body.json
body/
    header_0/
        index.html
    main_1/
        index.html
        article_0/
            index.html
        aside_1/
            index.html
            section_0/
                index.html
            section_1/
                index.html
    footer_2/
        index.html
```

---

## Dependencies

- [jQuery 3.7.1+](https://jquery.com/download/)

---

## Documentation

See the [wiki](https://github.com/richardkentgates/j-make/wiki) for full documentation including:

- [Getting Started](https://github.com/richardkentgates/j-make/wiki/Getting-Started)
- [Architecture](https://github.com/richardkentgates/j-make/wiki/Architecture)
- [body.json format](https://github.com/richardkentgates/j-make/wiki/body.json)
- [Directory Structure](https://github.com/richardkentgates/j-make/wiki/Directory-Structure)
- [Generated DOM Attributes](https://github.com/richardkentgates/j-make/wiki/Generated-DOM-Attributes)
- [Serving and Hosting](https://github.com/richardkentgates/j-make/wiki/Serving-and-Hosting)
- [Troubleshooting](https://github.com/richardkentgates/j-make/wiki/Troubleshooting)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

See [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE)
