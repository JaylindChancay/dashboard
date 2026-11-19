import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface SelectorProps {
  selectedOption: string;
  onOptionSelect: (option: string) => void;
}

export default function SelectorUI({ selectedOption, onOptionSelect }: SelectorProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onOptionSelect(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      <Select
        labelId="city-select-label"
        id="city-simple-select"
        label="Ciudad"
        value={selectedOption}
        onChange={handleChange}
      >
        <MenuItem value="guayaquil">Guayaquil</MenuItem>
        <MenuItem value="quito">Quito</MenuItem>
        <MenuItem value="manta">Manta</MenuItem>
        <MenuItem value="cuenca">Cuenca</MenuItem>
      </Select>
      <p style={{ marginTop: 8 }}>
        Información del clima en <strong style={{ textTransform: 'capitalize' }}>{selectedOption}</strong>
      </p>
    </FormControl>
  );
}
