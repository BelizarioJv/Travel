type ItineraryParams = {
  destination: string;
  dates: string[];
  weather: string;
};

type OpenAIResponse = {
  output: {
    content: {
      text: string;
    }[];
  }[];
};
function extractText(data: any): string {
  if (data.output) {
    for (const item of data.output) {
      for (const content of item.content || []) {
        if (content.type === "output_text") {
          return content.text;
        }
      }
    }
  }

  return "Sem resposta da IA";
}

export async function generateItinerary({
  destination,
  dates,
  weather,
}: ItineraryParams): Promise<string> {
  try {
    console.log("API KEY:", process.env.OPENAI_API_KEY);

    const prompt = `
    Crie um roteiro de viagem para ${destination}.
    Datas: ${dates.join(" até ")}
    Clima: ${weather}
    `;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: prompt,
      }),
    });

    console.log("STATUS:", response.status);

    // 🔥 MOSTRAR ERRO REAL
    if (!response.ok) {
      const errorText = await response.text();
      console.error("🔥 ERRO OPENAI:", errorText);
      throw new Error("Erro na OpenAI");
    }

    const data: any = await response.json();

    console.log("OPENAI:", data);

    return (
      data.output?.[0]?.content?.[0]?.text ||
      data.output_text ||
      "Sem resposta da IA"
    );
  } catch (err) {
    console.error("🔥 ERRO GERAL:", err);
    throw err;
  }
}
