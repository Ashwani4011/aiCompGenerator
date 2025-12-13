import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/genai", async (req, res) => {
  console.log(req.body)
  const { prompt, framework } = req.body;
  console.log(req.body)
  if (!prompt || !framework) {
    return res.status(400).json({ error: "Missing prompt or framework" });
  }

  try {
    console.log("entered try")
    const ai = new GoogleGenAI({ apiKey: process.env.GENAI_KEY });
    console.log(ai)
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an experienced programmer with expertise in web development and UI/UX design.
Create a modern, animated, and fully responsive UI component.

UI description: ${prompt}
Framework: ${framework}

Rules:
- Return ONLY code
- Use Markdown fenced code blocks
- Single HTML file only
- No explanations or comments
      `,
    });

    res.json({ text: response.text });
  } catch (err) {
    console.log("GENAI ERROR:", err);
    res.status(500).json({ error: "Generation failed" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

