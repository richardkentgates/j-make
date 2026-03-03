# Troubleshooting

---

## Elements are empty — content never loads

**Cause:** Most commonly a missing directory, missing `index` file, or a `file://` origin.

**Check:**
1. Open browser DevTools → **Network** tab. Look for failing requests (red/404).
2. Verify the failing URL matches the expected path from [Directory Structure](Directory-Structure).
3. Confirm you are serving over HTTP, not opening `index.html` directly via `file://`.
4. Check that the directory and `index` file exist and are spelled correctly (paths are case-sensitive on Linux/macOS).

---

## Content loads into the wrong element

**Cause:** A mismatch between the `body.json` structure and the directory naming.

Element paths are built from the element's `data-key`, which is `{tagname}_{index}` where `index` is the zero-based sibling position. If the JSON structure does not match the directories, content will either 404 or load into the wrong place.

**Check:**
1. Inspect elements in DevTools and read their `data-path` attributes.
2. Confirm the directories on disk match those paths exactly.

---

## Nested elements appear above their parent's content

This is expected behaviour. j-make uses `prepend` to inject content from `index` files, so the fetched content is always placed _before_ child elements. If your parent element's content needs to appear _after_ its children, restructure so it is in a sibling element instead.

---

## body.json fails to load

**Symptom:** Console shows `j-make: failed to load body.json`.

**Check:**
1. `body.json` exists at the root of your site (same level as `index.html`).
2. The file is valid JSON. Paste it into [jsonlint.com](https://jsonlint.com) to verify.
3. Your server is running and accessible.

---

## Invalid value error in the console

**Symptom:** Console shows `j-make: unexpected value of type "..." in body.json`.

**Cause:** `body.json` contains a value that is neither a string nor an array (e.g., a number or object).

**Fix:** Review your `body.json` and ensure every value is either a quoted tag-name string or an array. See [body.json](body.json) for valid format examples.

---

## Page appears blank with no console errors

**Check:**
1. Confirm `<body></body>` is empty in `index.html` — j-make requires an empty body.
2. Confirm jQuery is loaded **before** `j-make.js`.
3. Open the **Network** tab and confirm `body.json` is being requested and returns HTTP 200.

---

## Debugging tips

- Use browser DevTools **Elements** panel to inspect `data-key` and `data-path` on each element.
- Use the **Network** tab to verify every AJAX request returns 200 and the response body contains your HTML.
- Temporarily add `console.log` inside element `index.html` files (e.g., a visible heading) to confirm which file is being loaded.
