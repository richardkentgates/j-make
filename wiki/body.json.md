# body.json

`body.json` is a nested JSON array that defines the HTML structure j-make will build inside `<body>`.

---

## Format rules

| Value type | What j-make does |
|---|---|
| `string` | Creates an HTML element with that tag name and appends it to the current parent |
| `array` | Nests its contents inside the element created by the immediately preceding string |

Arrays must always be preceded by a string in the same parent array — the nested array's elements become children of that string's element.

---

## Examples

### Flat structure

```json
["header", "main", "footer"]
```

Produces:

```html
<body>
    <header class="j-make" data-key="header_0" data-path="body/header_0"></header>
    <main   class="j-make" data-key="main_1"   data-path="body/main_1"></main>
    <footer class="j-make" data-key="footer_2" data-path="body/footer_2"></footer>
</body>
```

---

### Nested structure

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

- `article` and `aside` are children of `main` (the string directly before the nested array).
- The two `section` elements are children of `aside` (the string directly before their nested array).

Produces:

```html
<body>
    <header class="j-make" ...></header>
    <main class="j-make" ...>
        <article class="j-make" ...></article>
        <aside class="j-make" ...>
            <section class="j-make" ...></section>
            <section class="j-make" ...></section>
        </aside>
    </main>
    <footer class="j-make" ...></footer>
</body>
```

---

## Element indexing

Elements are indexed by their position among siblings **at the same level and under the same parent**. Indexing starts at `0`.

```json
["header", "main", "footer"]
// header_0, main_1, footer_2
```

```json
["article", "aside"]
// article_0, aside_1  (when nested under main)
```

The index is used to build the directory path. See [Directory Structure](Directory-Structure) for details.

---

## Any valid HTML tag name can be used

```json
["nav", "section", "div", "article"]
```

j-make calls `document.createElement()` with the value as-is, so any tag that the browser supports will work.
