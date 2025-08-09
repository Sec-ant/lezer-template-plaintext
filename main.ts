import { LRLanguage } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { parser } from "./src/index.ts";

const templatePlaintextLanguage = LRLanguage.define({
  parser,
  languageData: { name: "template-plaintext" },
});

new EditorView({
  doc: `Hello {{world}}`,
  parent: document.body,
  extensions: [basicSetup, templatePlaintextLanguage],
});
