import type { Trip } from "../entities/Trip";

export interface Destination {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  contry: string;
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
};
