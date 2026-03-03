# Generated DOM Attributes

When j-make creates an element it sets three attributes on it automatically. These can be used for styling, scripting, or debugging.

---

## `class="j-make"`

Every element created by j-make receives the class `j-make`. Use this as a CSS hook or to select all j-make elements from JavaScript.

```css
/* Target all j-make elements */
.j-make {
    box-sizing: border-box;
}
```

```js
// Select all j-make elements
document.querySelectorAll('.j-make');
```

---

## `data-key`

The element's unique key, composed of its tag name and its zero-based sibling index.

```
{tagname}_{index}
```

Examples: `header_0`, `main_1`, `aside_1`, `section_0`

The key is used internally to build the `data-path` and to walk the ancestor chain when nesting.

---

## `data-path`

The server path from which j-make fetches the element's content. This is derived from the element's position in the tree.

```
body/{ancestor_key}/{ancestor_key}/.../element_key
```

Examples:

| Element | `data-path` |
|---|---|
| `<header>` | `body/header_0` |
| `<main>` | `body/main_1` |
| `<article>` inside `<main>` | `body/main_1/article_0` |
| `<section>` inside `<aside>` inside `<main>` | `body/main_1/aside_1/section_0` |

You can inspect these in browser DevTools to debug path-related problems.

---

## Full example output

For the `body.json`:

```json
["header", "main", ["article"], "footer"]
```

The rendered elements (before content is fetched) look like:

```html
<body>
    <header class="j-make" data-key="header_0" data-path="body/header_0"></header>
    <main   class="j-make" data-key="main_1"   data-path="body/main_1">
        <article class="j-make" data-key="article_0" data-path="body/main_1/article_0"></article>
    </main>
    <footer class="j-make" data-key="footer_2" data-path="body/footer_2"></footer>
</body>
```
