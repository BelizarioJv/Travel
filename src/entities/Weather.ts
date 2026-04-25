export interface Weather {
  latitude: number;
  longitude: number;
  startDate: string;
  endDate: string;
  dates: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}
