import './App.css';
import { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import ChartUI from './components/ChartUI';
import TableUI from './components/TableUI';
import useFetchData from './hooks/useFetchData';

function App() {
  const [selectedOption, setSelectedOption] = useState<string>('guayaquil');
  const { data, loading, error } = useFetchData(selectedOption);
  const labels = data?.hourly.time.map((tiempo) => tiempo.slice(11)) ?? [];

  return (
    <Box sx={{ width: '100%', boxSizing: 'border-box', p: { xs: 2, md: 4 } }}>
      <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Grid size={{ xs: 12 }}><HeaderUI /></Grid>
        <Grid container size={{ xs: 12 }} sx={{ justifyContent: 'flex-end' }}>
          <AlertUI description="No se prevén lluvias" />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <SelectorUI selectedOption={selectedOption} onOptionSelect={setSelectedOption} />
        </Grid>
        <Grid container size={{ xs: 12, md: 9 }} spacing={2}>
          {loading && <CircularProgress aria-label="Cargando información del clima" />}
          {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}
          {data && (
            <>
              <Grid size={{ xs: 6, md: 3 }}>
                <IndicatorUI title="Temperatura (2m)" description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`} />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <IndicatorUI title="Temperatura aparente" description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`} />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <IndicatorUI title="Velocidad del viento" description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`} />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <IndicatorUI title="Humedad relativa" description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`} />
              </Grid>
            </>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {data && <ChartUI
            title="Temperatura y viento por hora"
            labels={labels}
            values1={data.hourly.temperature_2m}
            values2={data.hourly.wind_speed_10m}
            label1={`Temperatura (${data.hourly_units.temperature_2m})`}
            label2={`Viento (${data.hourly_units.wind_speed_10m})`}
          />}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {data && <TableUI
            labels={labels}
            values1={data.hourly.temperature_2m}
            values2={data.hourly.wind_speed_10m}
            header1={`Temperatura (${data.hourly_units.temperature_2m})`}
            header2={`Viento (${data.hourly_units.wind_speed_10m})`}
          />}
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant="body2" color="text.secondary">Datos meteorológicos: Open-Meteo · Horario de Ecuador (America/Guayaquil)</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
