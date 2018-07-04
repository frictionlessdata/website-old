# Frictionless Data Website

[![Build Status](https://travis-ci.org/frictionlessdata/website.svg)](https://travis-ci.org/frictionlessdata/website)

This is the Frictionless Data website, hosted at https://frictionlessdata.io

## Contributing

- Install Lektor
- Install a recent Node
- `npm install`
- `npm run build`
- `lektor server`

### Updating the specs

- update `package.json:specsBranchOrTag`
- run `npm run build`

See the [Open Knowledge International coding standards](https://github.com/okfn/coding-standards), which apply for contributions to this website.

### Notes

If you get errors like below, ensure that there are not codeblocks in content with mentioned syntax (`yaml=` in this case). Make sure that you `npm run build` before checking to pull the latest specs documents. Lektor errors could be confusing because we use the TOC plugin - so it could show the same error for all documents while the real error is only inside one of them.

```
E index.html (ClassNotFound: no lexer for alias u'yaml=' found)
```
