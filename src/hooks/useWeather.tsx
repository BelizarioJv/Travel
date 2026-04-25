import { useState } from "react";
import type { Weather } from "../entities/Weather";
import { tripsService } from "../services/api";
import type { WeatherParams } from "../services/api";

export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);

  const getWeatherData = async ({
    latitude,
    longitude,
    startDate,
    endDate,
  }: WeatherParams) => {
    const data = await tripsService.getWeather({
      latitude,
      longitude,
      startDate,
      endDate,
    });

    setWeather(data);
  };

  return { weather, getWeatherData };
}
