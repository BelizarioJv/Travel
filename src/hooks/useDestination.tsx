import { useState, useEffect } from "react";
import { tripsService } from "../services/api";
import type { Destination } from "../entities/Destination";

export function useDestination() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      tripsService.searchDestination(query).then(setResults);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  const selectDestination = (city: Destination) => {
    setQuery(city.name);
    setSelectedDestination(city);
    setResults([]);
  };

  return {
    query,
    setQuery,
    results,
    selectedDestination,
    selectDestination,
  };
}
