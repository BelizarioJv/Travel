import express from "express";
import { generateItinerary } from "../services/aiServices.js";

const router = express.Router();

router.post("/itinerary", async (req, res) => {
  try {
    const { destination, dates, weather } = req.body;

    const itinerary = await generateItinerary({
      destination,
      dates,
      weather,
    });

    res.json({ itinerary }); // 👈 TEM QUE SER ASSIM
  } catch (error) {
    console.error("ERRO REAL:", error); // 👈 ADICIONA ISSO

    res.status(500).json({
      error: "Erro ao gerar roteiro",
    });
  }
});

export default router;
