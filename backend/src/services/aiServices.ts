import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ItineraryParams = {
  destination: string;
  dates: string[];
};

export async function generateItinerary({
  destination,
  dates,
}: ItineraryParams): Promise<string> {
  const prompt = `
    Crie um roteiro de viagem para ${destination}.
    Datas: ${dates.join(" até ")}
    `;

  const response = await client.responses.create({
    model: "gpt-5.5",
    input: prompt,
  });

  return response.output_text;
}
