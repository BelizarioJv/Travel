import { createContext, useState } from "react";
import type { Weather } from "../entities/Weather";
import { tripsService } from "../services/api";

type WeatherContextType = {
  weather: Weather | null;
  getWeatherData: (params: any) => Promise<void>;
  getDayOfWeek: (params: string) => string;
};

export const WeatherContext = createContext({} as WeatherContextType);

export function WeatherProvider({ children }: any) {
  const [weather, setWeather] = useState<Weather | null>(null);

  const getWeatherData = async (params: any) => {
    const data = await tripsService.getWeather(params);
    setWeather(data);
  };

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);

    const day = date.toLocaleDateString("pt-BR", {
      weekday: "long",
    });

    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <WeatherContext.Provider value={{ weather, getWeatherData, getDayOfWeek }}>
      {children}
    </WeatherContext.Provider>
  );
}
