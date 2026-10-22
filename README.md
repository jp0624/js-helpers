# Dev Helpers

A searchable JavaScript and Python reference, evolved from JavaScript Field Guide.

- 100 new JavaScript examples and 150 Python examples across 25 language-specific categories.
- 24 original snippets preserved in the Original archive category and at their original repository paths.
- Search, categories, saved examples, copy, downloads and captured outputs.
- Responsive layout; dark default, persistent light preference.

## Development

Use Node 24: `npm ci`, `npm run dev`, `npm run build`.

`npm run validate:examples` uses Node and Python 3.11+ to execute all 250 new examples, captures their actual output, and rebuilds `src/examples.json`. Original snippets may be incomplete React fragments and are preserved rather than executed. Python uses only its standard library; SQLite examples use memory and file examples use temporary directories.

The UI never executes arbitrary code. Downloaded snippets run locally in Node (as ES modules) or Python. Bookmarks and theme settings stay in localStorage.

Original guide source and data remain in `src/_db` and are published under `/data` for reference. The repo name remains `js-helpers` to preserve existing links; the product is named Dev Helpers.
