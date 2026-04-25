import type { Weather } from "../entities/Weather";
import type { Destination } from "../entities/Destination";

export interface WeatherParams {
  latitude: number;
  longitude: number;
  startDate: string;
  endDate: string;
}

export const tripsService = {
  async searchDestination(query: string): Promise<Destination[]> {
    if (query.length < 3) {
      return [];
    }

    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}`,
    );

    const data = await res.json();
    return data.results.map((result: any) => ({
      id: result.id,
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      contry: result.country,
    }));
  },

  async getWeather({
    latitude,
    longitude,
    startDate,
    endDate,
  }: WeatherParams): Promise<Weather> {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`,
    );

    const data = await res.json();
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      startDate: data.daily.time[0],
      endDate: data.daily.time[data.daily.time.length - 1],
      dates: data.daily.time,
      temperature_2m_max: data.daily.temperature_2m_max,
      temperature_2m_min: data.daily.temperature_2m_min,
    };
  },
};
