# Architecture

j-make is a small client-side library (~80 lines) that does two things:

1. **Builds the DOM** from a JSON array (`body.json`).
2. **Populates each element** by fetching an `index.html` file from a predictable directory path.

---

## What j-make does NOT do

j-make **does not generate navigation, menus, or any page content automatically**. It only:

1. Creates DOM elements defined in `body.json`.
2. Fetches the `index.html` from each element's directory and injects it verbatim.

Every link, heading, paragraph, and navigation item on a j-make site is static HTML written by the developer inside the content files. j-make has no awareness of what is inside those files.

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

Nesting is implied by position — no explicit parent/child wrappers are needed:

```json
["main", ["article", "aside"]]
```

`main` is created → becomes `lastElement` → the nested array `["article", "aside"]` is built inside it.

---

## Path resolution

Every element receives two `data-*` attributes:

| Attribute    | Value                           | Example               |
|--------------|---------------------------------|-----------------------|
| `data-key`   | `{tagname}_{siblingIndex}`      | `aside_1`             |
| `data-path`  | `body/{ancestor keys}/{key}`    | `body/main_1/aside_1` |

Path assembly:

1. Append the element to its parent (must be in the live DOM first).
2. `getNodeIndex` — walks `previousElementSibling` to get zero-based sibling position.
3. `getNodeTreePath` — walks `parentNode`, collects `dataset.key` from each ancestor up to `<body>`, reverses for ancestor-first order.
4. Final path: `body/` + `treePath.join('/') + '/' + key`

---

## AJAX fetch and injection

One `$.get` fires per element, all in parallel:

```js
$.get(path)
    .done(function(data) {
        const clean = $.parseHTML(data, document, false);
        $('*[data-path="' + path + '"]').prepend(clean);
    });
```

- `$.parseHTML(..., false)` — disables script execution (**XSS protection**).
- `prepend` — inserts fetched content _before_ nested child elements, keeping authored content visually first.
- The attribute selector resolves at response time, so out-of-order responses are safe.

---

## Concurrency

All requests fire in parallel. Each closure captures its own `path`, and the DOM is fully built synchronously before any responses arrive. There is no sequencing, queue, or waterfall.

---

## Directory naming

`{tagname}_{index}` where `index` is the **zero-based position among all siblings** (not filtered by tag name).

| `body.json`              | Index | Directory path           |
|--------------------------|-------|--------------------------|
| `"header"` (top-level)   | 0     | `body/header_0/`         |
| `"main"` (top-level)     | 1     | `body/main_1/`           |
| `"article"` (in main)    | 0     | `body/main_1/article_0/` |
| `"aside"` (in main)      | 1     | `body/main_1/aside_1/`   |
| `"footer"` (top-level)   | 2     | `body/footer_2/`         |

---

## Security

- `$.parseHTML(..., false)` strips scripts from all injected content.
- Paths are derived from DOM structure, never from user input.
- All fetches are same-origin relative paths.

---

## See also

- [body.json](body.json) — JSON array format reference
- [Directory Structure](Directory-Structure) — file system layout
- [Generated DOM Attributes](Generated-DOM-Attributes) — `data-key` and `data-path` details
