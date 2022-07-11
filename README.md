# Third-party analyzer

This is a prototype project to analyze the third parties in use on a given website.

Usage (after you `npm install`):

```bash
$ node src/index.mjs https://web.dev/
www.google-analytics.com
www.google.com
www.gstatic.com
```

Right now it outputs the unique hosts of all third-party `<script>`s, but it gathers information on all third-party URLs and resource types, so we'll see what it outputs in the future...
