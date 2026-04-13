import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "lorem-ipsum",
  slug: "lorem-ipsum",
  description: "Generate Lorem Ipsum placeholder text on demand. Choose paragraphs, sentences, or words with exact count control.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/generate",
      price: "$0.001",
      description: "Generate Lorem Ipsum placeholder text",
      toolName: "text_generate_lorem_ipsum",
      toolDescription: `Use this when you need to generate placeholder text for mockups, wireframes, UI prototypes, or content templates. Returns Lorem Ipsum text with metadata.

1. text -- the generated Lorem Ipsum text
2. type -- what was generated (paragraphs, sentences, or words)
3. count -- how many units were generated
4. wordCount -- total word count of the generated text

Example output: {"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit...","type":"paragraphs","count":3,"wordCount":150}

Use this FOR populating design mockups, testing text rendering in UI components, or creating content placeholders during development. Use this BEFORE finalizing layouts to test text overflow and wrapping behavior.

Do NOT use for text classification -- use text_classify_content instead. Do NOT use for markdown conversion -- use text_convert_markdown_to_html instead. Do NOT use for word counting -- use text_count_words instead.`,
      inputSchema: {
        type: "object",
        properties: {
          count: { type: "number", description: "Number of paragraphs, sentences, or words to generate (default: 3)" },
          type: { type: "string", description: "Type of text to generate: paragraphs, sentences, or words (default: paragraphs)" },
        },
        required: ["count", "type"],
      },
    },
  ],
};
