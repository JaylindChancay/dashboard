import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  guayaquil: { latitude: -2.1962, longitude: -79.8862 },
  quito: { latitude: -0.2299, longitude: -78.5249 },
  manta: { latitude: -0.9677, longitude: -80.7089 },
  cuenca: { latitude: -2.9005, longitude: -79.0045 },
};

interface FetchDataOutput {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

export default function useFetchData(selectedOption: string | null): FetchDataOutput {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const cityConfig = CITY_COORDS[selectedOption ?? 'guayaquil'] ?? CITY_COORDS.guayaquil;
    const params = new URLSearchParams({
      latitude: String(cityConfig.latitude),
      longitude: String(cityConfig.longitude),
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m',
      hourly: 'temperature_2m,wind_speed_10m',
      timezone: 'America/Guayaquil',
      forecast_days: '1',
    });

    const obtenerDatos = async () => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const respuesta = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
          signal: controller.signal,
        });
        if (!respuesta.ok) throw new Error(`Error ${respuesta.status} al consultar Open-Meteo`);
        const json: OpenMeteoResponse = await respuesta.json();
        if (!controller.signal.aborted) setData(json);
      } catch (e) {
        if (!controller.signal.aborted) setError(e instanceof Error ? e.message : 'Error desconocido');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    void obtenerDatos();
    return () => controller.abort();
  }, [selectedOption]);

  return { data, loading, error };
}
