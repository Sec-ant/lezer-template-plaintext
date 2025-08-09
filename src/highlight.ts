import { styleTags, tags as t } from "@lezer/highlight";

export const templatePlaintextHighlighting = styleTags({
  Plaintext: t.content,
  Variable: t.variableName,
});
