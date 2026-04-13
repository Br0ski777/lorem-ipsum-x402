import type { Hono } from "hono";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "perspiciatis", "unde",
  "omnis", "iste", "natus", "error", "voluptatem", "accusantium", "doloremque",
  "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo",
  "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta",
  "explicabo", "nemo", "ipsam", "quia", "voluptas", "aspernatur", "aut", "odit",
  "fugit", "consequuntur", "magni", "dolores", "eos", "ratione", "sequi", "nesciunt",
  "neque", "porro", "quisquam", "nihil", "impedit", "quo", "minus", "quod", "maxime",
  "placeat", "facere", "possimus", "assumenda", "repellendus", "temporibus",
  "quibusdam", "illum", "soluta", "nobis", "eligendi", "optio", "cumque",
  "recusandae", "itaque", "earum", "rerum", "hic", "tenetur", "sapiente",
  "delectus", "reiciendis", "voluptatibus", "maiores", "alias", "perferendis",
  "doloribus", "asperiores", "repellat",
];

function randomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function generateSentence(): string {
  const len = 8 + Math.floor(Math.random() * 12);
  const words = Array.from({ length: len }, () => randomWord());
  words[0] = capitalize(words[0]);
  return words.join(" ") + ".";
}

function generateParagraph(): string {
  const sentenceCount = 3 + Math.floor(Math.random() * 5);
  return Array.from({ length: sentenceCount }, () => generateSentence()).join(" ");
}

export function registerRoutes(app: Hono) {
  app.post("/api/generate", async (c) => {
    const body = await c.req.json().catch(() => null);
    const count = Math.min(Math.max(body?.count || 3, 1), 100);
    const type = (body?.type || "paragraphs").toLowerCase();

    if (!["paragraphs", "sentences", "words"].includes(type)) {
      return c.json({ error: "Invalid type. Supported: paragraphs, sentences, words" }, 400);
    }

    let text: string;

    switch (type) {
      case "paragraphs":
        text = Array.from({ length: count }, () => generateParagraph()).join("\n\n");
        break;
      case "sentences":
        text = Array.from({ length: count }, () => generateSentence()).join(" ");
        break;
      case "words":
        text = Array.from({ length: count }, () => randomWord()).join(" ");
        break;
      default:
        text = "";
    }

    return c.json({
      text,
      count,
      type,
      length: text.length,
    });
  });
}
