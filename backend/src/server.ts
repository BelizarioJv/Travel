import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

console.log(
  "Minha chave OpenAI:",
  process.env.OPENAI_API_KEY ? "Encontrada" : "NÃO ENCONTRADA",
);

const app = express();
app.use(cors());
app.use(express.json());

// Interface para tipar o corpo da requisição
export interface WeatherParams {
  latitude: number;
  longitude: number;
  startDate: string;
  endDate: string;
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY não configurada no .env");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post(
  "/ai/itinerary",
  async (req: Request<{}, {}, WeatherParams>, res: Response) => {
    const { latitude, longitude, startDate, endDate } = req.body;

    console.log(req.body);

    if (!latitude || !longitude || !startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Destino e datas são obrigatórios." });
    }

    try {
      const prompt = `
      Identifique a cidade/região nas coordenadas:
      Latitude: ${latitude}
      Longitude: ${longitude}

      Crie um roteiro de viagem de ${startDate} até ${endDate}.
      Organize por dias e responda em português usando Markdown.
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Você é um assistente especialista em planejamento de viagens.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      });

      const text = completion.choices[0]?.message?.content;

      res.json({ itinerary: text });
    } catch (error: any) {
      console.error("Erro detalhado:", error);

      res.status(500).json({
        error: error.message,
        detalhes: error.status || "Erro interno",
      });
    }
  },
);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor TS rodando em http://localhost:${PORT}`);
});
