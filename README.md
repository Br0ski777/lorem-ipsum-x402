# Lorem Ipsum Generator API

[![MCP Server](https://img.shields.io/badge/MCP-server-blue)](https://lorem-ipsum.api.klymax402.com/mcp)
[![x402](https://img.shields.io/badge/payments-x402-6E56CF)](https://x402.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Generate Lorem Ipsum placeholder text on demand. Choose paragraphs, sentences, or words with exact count control. Pay-per-call via [x402](https://x402.org) (USDC on Base L2) -- no API key, no signup, no rate-limit wall.

Part of the [klymax402](https://klymax402.com) marketplace -- 100 x402 micropayment APIs for AI agents, one wallet, USDC on Base.

## Quickstart -- MCP

Add to your MCP client config (Claude Desktop, Cursor, ElizaOS, etc.):

```json
{
  "mcpServers": {
    "lorem-ipsum": {
      "url": "https://lorem-ipsum.api.klymax402.com/mcp"
    }
  }
}
```

## Quickstart -- HTTP (x402)

```bash
curl -X POST "https://lorem-ipsum.api.klymax402.com/api/generate" \
  -H "Content-Type: application/json" \
  -d '{"count":"1","type":"..."}'
# -> 402 Payment Required, with an x402 payment challenge in the response body
```

Any x402-aware client ([`@x402/fetch`](https://www.npmjs.com/package/@x402/fetch), [`x402-agent-tools`](https://www.npmjs.com/package/x402-agent-tools), ATXP) handles the 402 -> sign -> retry cycle automatically.

## Tools

| Tool | Method | Path | Price | Description |
|---|---|---|---|---|
| `text_generate_lorem_ipsum` | POST | `/api/generate` | $0.003 | Generate Lorem Ipsum placeholder text |

### `text_generate_lorem_ipsum`

Use this when you need to generate placeholder text for mockups, wireframes, UI prototypes, or content templates. Returns Lorem Ipsum text with metadata.

**Parameters**

| Name | Type | Required | Description |
|---|---|---|---|
| `count` | number | yes | Number of paragraphs, sentences, or words to generate (default: 3) |
| `type` | string | yes | Type of text to generate: paragraphs, sentences, or words (default: paragraphs) |

Example response:

```json
{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit...","type":"paragraphs","count":3,"wordCount":150}
```

**When to use**: populating design mockups, testing text rendering in UI components, or creating content placeholders during development. Use this BEFORE finalizing layouts to test text overflow and wrapping behavior.

**Not for**: text classification (use `text_classify_content`), markdown conversion (use `text_convert_markdown_to_html`), word counting (use `text_count_words`).

## Example agent prompts

- "Generate placeholder text for mockups, wireframes, UI prototypes, or content templates"

## Payment

- Protocol: [x402](https://x402.org) -- HTTP-native pay-per-call, no signup, no API key
- Network: Base L2 (`eip155:8453`)
- Asset: USDC
- Facilitator: Coinbase CDP (primary), PayAI (fallback)
- Also reachable via [ATXP](https://atxp.ai) (OAuth-wrapped x402, RFC 9728 protected-resource metadata)

## Part of klymax402

100 x402 micropayment APIs for AI agents -- one wallet, USDC on Base, zero signup.

- Catalog: https://klymax402.com/llms.txt
- Full API reference: https://klymax402.com/llms-full.txt
- Live stats: https://klymax402.com/stats

## License

MIT
