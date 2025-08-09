# lezer-template-plaintext

[![npm](https://img.shields.io/npm/v/lezer-template-plaintext)](https://www.npmjs.com/package/lezer-template-plaintext/v/latest) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/lezer-template-plaintext)](https://www.npmjs.com/package/lezer-template-plaintext/v/latest) [![jsDelivr hits](https://img.shields.io/jsdelivr/npm/hm/lezer-template-plaintext?color=%23ff5627)](https://cdn.jsdelivr.net/npm/lezer-template-plaintext@latest/)

A [Lezer](https://lezer.codemirror.net/) grammar for parsing template plaintext (plaintext with `{{variable}}` holes) with incremental parsing support and TypeScript definitions.

## Install

```bash
npm i lezer-template-plaintext
```

## Features

- Parse free-form plaintext with `{{variable}}` holes
- Backslash escapes for `{`, `}`, and `\\` both in text and inside variables
- Incremental parsing ready for editors

## Usage

### Basic

```ts
import { parser } from "lezer-template-plaintext";

const tree = parser.parse(
  "Hello \\{world\\} and {{name}}! \{\{ not a variable"
);
console.log(tree.toString());
```

### With CodeMirror

```ts
import {
  parser,
  templatePlaintextHighlighting,
} from "lezer-template-plaintext";
import { LRLanguage } from "@codemirror/language";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";

const templatePlaintextLanguage = LRLanguage.define({
  parser,
  languageData: { name: "template-plaintext" },
});

const highlightStyle = HighlightStyle.define([templatePlaintextHighlighting]);
const extensions = [
  templatePlaintextLanguage,
  syntaxHighlighting(highlightStyle),
];
```

### Tree Navigation

```ts
import { parser } from "lezer-template-plaintext";
import * as terms from "lezer-template-plaintext";

const tree = parser.parse("Hi {{first}} {{last}}! \{escaped\}");
const cursor = tree.cursor();
do {
  if (cursor.type.id === terms.Variable) {
    console.log("Found variable at:", cursor.from, cursor.to);
  }
} while (cursor.next());
```

### Error Handling

```ts
import { parser } from "lezer-template-plaintext";

function parseWithErrors(pattern: string) {
  const tree = parser.parse(pattern);
  const errors: { from: number; to: number; message: string }[] = [];

  tree.iterate({
    enter: (node) => {
      if (node.type.isError) {
        errors.push({
          from: node.from,
          to: node.to,
          message: `Syntax error at ${node.from}-${node.to}`,
        });
      }
    },
  });

  return { tree, errors };
}
```

## API

### Exports

- `parser` - Lezer parser instance
- `templatePlaintextHighlighting` - CodeMirror syntax highlighting
- Grammar terms - Node type constants for tree navigation (e.g. `Variable`)

### Types

```ts
parser.parse(input: string, fragments?: TreeFragment[], ranges?: {from: number, to: number}[]): Tree
```

## Development

```bash
git clone https://github.com/Sec-ant/lezer-template-plaintext
cd lezer-template-plaintext
pnpm install
pnpm build
pnpm test
```

Commands:

- `pnpm test:run` - Run all tests
- `pnpm test:ui` - Interactive test UI

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests in `tests/fixtures/`
4. Ensure tests pass
5. Submit a pull request

## License

MIT
