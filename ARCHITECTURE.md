# Architecture

j-make is a small client-side library (~80 lines) that does two things:

1. **Builds the DOM** from a JSON array (`body.json`).
2. **Populates each element** by fetching an `index.html` file from a predictable directory path.

---

## What j-make does NOT do

j-make **does not generate navigation, menus, or any page content automatically**. It only:

1. Creates DOM elements defined in `body.json`.
2. Fetches the `index.html` from each element's directory and injects it verbatim.

Every link, heading, paragraph, and navigation item you see on a j-make site is static HTML written by the developer inside the content files. j-make has no awareness of what is inside those files.

---

## Data flow

```
DOMContentLoaded
      │
      ▼
$.getJSON("body.json")
      │
      ▼
buildFromArray(data, document.body)
      │
      ├─ string value ──► buildElement(tagName, parentEl)
      │                        ├─ createElement + appendChild
      │                        ├─ getNodeIndex  ──► zero-based sibling position
      │                        ├─ getNodeTreePath ──► ancestor key chain
      │                        ├─ assign data-key, data-path, class="j-make"
      │                        └─ fetchAndInject(data-path)
      │                                └─► $.get ──► $.parseHTML ──► prepend
      │
      └─ array value ───► buildFromArray(nested, lastElement)  [recursive]
```

---

## body.json parsing

`buildFromArray(arr, parentEl)` iterates the array with a single local variable `lastElement` (initially `parentEl`):

- A **string** value calls `buildElement(tagName, parentEl)`. The returned element becomes the new `lastElement`.
- An **array** value calls `buildFromArray(nested, lastElement)` recursively, making the most recently created element the parent of the nested subtree.

This encoding means nesting is implied by position — no explicit parent/child wrappers needed:

```json
["main", ["article", "aside"]]
```

`main` is created first → becomes `lastElement` → the nested array `["article", "aside"]` is built inside it.

---

## Path resolution

`buildElement` assigns two `data-*` attributes to every element it creates:

| Attribute    | Value                           | Example              |
|--------------|---------------------------------|----------------------|
| `data-key`   | `{tagname}_{siblingIndex}`      | `aside_1`            |
| `data-path`  | `body/{ancestor keys}/{key}`    | `body/main_1/aside_1`|

The path is assembled in this order:

1. **Append the element** to `parentEl` — it must be in the live DOM before path calculation.
2. **`getNodeIndex(el)`** — walks backwards through `previousElementSibling`, counting steps to get the zero-based sibling index among all sibling elements (not just the same tag).
3. **`getNodeTreePath(el)`** — walks the `parentNode` chain collecting each ancestor's `dataset.key` value until reaching an element with no `data-key` (i.e. `<body>`). The collected keys are reversed to produce ancestor-first order.
4. The final path is assembled as: `body/` + `treePath.join('/') + '/' + key`.

Because the element is appended _before_ the path is calculated, `getNodeIndex` always sees the correct sibling count in the live DOM.

---

## AJAX fetch and content injection

`fetchAndInject(path)` fires one `$.get` request per element:

```js
$.get(path)
    .done(function(data) {
        const clean = $.parseHTML(data, document, false);
        $('*[data-path="' + path + '"]').prepend(clean);
    })
    .fail(function() {
        console.error('j-make: failed to load content for path "' + path + '"');
    });
```

Key design decisions:

- **`$.parseHTML(..., false)`** — the third argument disables script execution, preventing XSS from injected content files.
- **`prepend` not `append`** — fetched content is inserted _before_ any child elements j-make has already created. This keeps authored content visually above nested children in the rendered page.
- **Attribute selector at response time** — `$('*[data-path="..."]')` resolves the target element when the response arrives, not when the request is sent. This is safe even if DOM order or timing varies.

---

## Concurrency

All AJAX requests fire in parallel — there is no queue or waterfall. Each call to `fetchAndInject` closes over its own `path` string, so responses arriving out of order cannot cross-contaminate elements. The DOM structure is fully built synchronously by `buildFromArray` before any responses arrive; fetches only inject content into already-existing elements.

---

## Directory naming convention

Folder names follow the pattern `{tagname}_{index}`:

- `tagname` — the lowercase HTML tag name exactly as it appears in `body.json`.
- `index` — the **zero-based position** among all sibling elements under the same parent (not filtered by tag name).

The `body/` root folder is the implicit parent of all top-level elements.

**Example mapping:**

| `body.json` entry | Sibling index | Directory path            |
|-------------------|---------------|---------------------------|
| `"header"`        | 0             | `body/header_0/`          |
| `"main"`          | 1             | `body/main_1/`            |
| `"article"` (inside main) | 0   | `body/main_1/article_0/`  |
| `"aside"` (inside main)   | 1   | `body/main_1/aside_1/`    |
| `"footer"`        | 2             | `body/footer_2/`          |

---

## Error handling

All AJAX failures are caught with `.fail()` and logged to `console.error`. A missing content file does not halt the page — each request is fully independent. The `$.getJSON` call for `body.json` itself also has a `.fail()` handler so a missing or malformed config is caught cleanly.

---

## Security

- **Script injection** — `$.parseHTML(data, document, false)` strips executable scripts from all fetched HTML before it enters the DOM.
- **Path origin** — all paths are derived deterministically from the DOM structure, not from user input or URL parameters.
- **Same-origin fetches** — j-make makes no external requests; every `$.get` targets a relative path on the same origin.
