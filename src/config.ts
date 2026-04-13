import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "lorem-ipsum",
  slug: "lorem-ipsum",
  description: "Generate placeholder Lorem Ipsum text — paragraphs, sentences, or words.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/generate",
      price: "$0.001",
      description: "Generate Lorem Ipsum placeholder text",
      toolName: "text_generate_lorem_ipsum",
      toolDescription: "Use this when you need to generate placeholder text for mockups, wireframes, or content templates. Supports paragraphs, sentences, or words. Returns the generated Lorem Ipsum text with count and type metadata. Do NOT use for text classification — use text_classify_content. Do NOT use for markdown — use text_convert_markdown_to_html.",
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
