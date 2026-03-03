# Directory Structure

j-make maps every element it creates to a directory path on your server. It fetches the `index.*` file from that path and prepends the response into the element.

---

## Path formula

```
body/{parent_key}/{parent_key}/.../element_key/
```

- The root `body/` folder is always the starting point.
- Each segment is `{tagname}_{index}` where `index` is the element's zero-based position among its siblings.
- Paths are built by walking the element's ancestor chain up to `<body>`.

---

## Example — full structure

Given this `body.json`:

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

The expected directory layout is:

```
index.html
body.json
j-make.js
body/
    header_0/
        index.html        ← loaded into <header>
    main_1/
        index.html        ← loaded into <main>
        article_0/
            index.html    ← loaded into <article>
        aside_1/
            index.html    ← loaded into <aside>
            section_0/
                index.html  ← loaded into first <section>
            section_1/
                index.html  ← loaded into second <section>
    footer_2/
        index.html        ← loaded into <footer>
```

---

## Index file format

You can use any file format your web server will execute. The response is injected as HTML into the element.

| File | Works if... |
|---|---|
| `index.html` | Always |
| `index.php` | Server has PHP enabled |
| `index.py` | Server is configured to run Python CGI |
| Any other CGI | Server supports it |

Mix and match freely — one element can use `index.html` while a sibling uses `index.php`.

---

## Content rendering order

j-make uses `prepend`, so the content from the `index` file is inserted **before** any child elements that j-make appends afterward. This means your manually authored content (headings, paragraphs, etc.) will always appear above child elements.

---

## Missing directories

If a directory or its `index` file does not exist, the server will return an error response (typically 404) and j-make will log a `console.error`. The element will remain in the DOM but empty. No other elements are affected.
