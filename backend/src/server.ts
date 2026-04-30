import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import OpenAI from "openai";
import nodemailer from "nodemailer";

const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// Interface de Criaçao de viagem para enviar por email e futuramente salvar no banco de dados
export interface Trip {
  tripId: string;
  destination: string;
  dates: string[];
  itinerary: string;
  link: string;
}

// Interface para tipar o corpo da requisição
export interface WeatherParams {
  latitude: number;
  longitude: number;
  startDate: string;
  endDate: string;
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
// rota para enviar o link da viagem para amigos
app.post("/ai/send-email", async (req, res) => {
  const { emails, link } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USEREMAIL,
        pass: process.env.USERPASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.USEREMAIL,
      to: emails.join(","),
      subject: "🌍 Sua viagem foi planejada!",
      html: `
        <h2>Seu roteiro está pronto!</h2>-
        <p>Clique no link abaixo para ver:</p>
        <a href="${link}">${link}</a>
      `,
    });

    res.status(200).send("Email enviado com sucesso!");
  } catch (error: any) {
    res.status(500).send("Erro ao enviar email: " + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor TS rodando em http://localhost:${PORT}`);
});
