# Security Policy

## Supported Versions

Only the latest code on the `master` branch is actively maintained and receives security updates.

| Version | Supported |
| ------- | --------- |
| master  | ✅        |

## Reporting a Vulnerability

If you discover a security vulnerability in j-make, please **do not** open a public GitHub issue.

Instead, report it privately by emailing the repository owner via GitHub's
[private vulnerability reporting](https://github.com/richardkentgates/j-make/security/advisories/new)
feature, or by contacting the maintainer directly through their
[GitHub profile](https://github.com/richardkentgates).

Please include:
- A description of the vulnerability and its potential impact
- Steps to reproduce or a proof-of-concept
- Any suggested mitigations, if known

You can expect an initial response within **7 days**. Once confirmed, a fix will be
prioritized and a disclosure timeline agreed upon with the reporter.

## Known Security Considerations

j-make is a **client-side only** library. There is no back-end, no authentication,
and no data storage. However, consumers of this library should be aware of the
following:

- **XSS risk**: j-make loads content from sibling directories via `$.get()` and
  injects the raw HTML response directly into the DOM. If any loaded content
  originates from user-supplied or untrusted sources, this creates a cross-site
  scripting (XSS) vector. Only serve content from trusted, controlled directories.

- **Outdated jQuery**: The example `index.html` references jQuery 3.5.1 (2020).
  Users should upgrade to the latest stable version of jQuery to benefit from
  upstream security patches.

- **Path traversal**: The directory paths used to load element content are derived
  entirely from the `body.json` structure. Ensure `body.json` is not writable by
  untrusted parties to prevent malicious path injection.

- **CORS**: When hosting j-make across origins, configure your server's CORS policy
  carefully to avoid unintended cross-origin data exposure.
