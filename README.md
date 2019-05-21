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

See the [Open Knowledge Foundation coding standards](https://github.com/okfn/coding-standards), which apply for contributions to this website.

### Contributing Translations

We are keen on having Frictionless Data content translated and made available in different languages. Here is how to submit your content translations for review:

#### Open an issue

- [Open a new issue](https://github.com/frictionlessdata/website/github/issues/new?title=New%20Content%20Translations%20For%20Review&body=bar)
- Specify pages that have been translated, and provide a link to the translated content

#### As a Pull Request

- Clone this repository.
- Find the folder that has content you want to translate
- Create a `contents+LANG.lr` file in the folder above, where LANG is the two-letter ISO-code of the language you want to translate content to i.e. `fr` for French, `sw` for Swahili, `zh` for Chinese, etc
- Add your translated text in the file above, in Markdown format.
- Submit a pull request.

Your submission will then undergo a review process, and once edits and suggestions have been incorporated, your translation will be added to the Frictionless Data website.

All content on the Frictionless Data website is made available under the CC-BY license.

### CSS

Style changes should be made to the SCSS files. Use `grunt` to watch for changes, and compile to CSS.

### Notes

If you get errors like below, ensure that there are not codeblocks in content with mentioned syntax (`yaml=` in this case). Make sure that you `npm run build` before checking to pull the latest specs documents. Lektor errors could be confusing because we use the TOC plugin - so it could show the same error for all documents while the real error is only inside one of them.

```
E index.html (ClassNotFound: no lexer for alias u'yaml=' found)
```
