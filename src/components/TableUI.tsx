import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface TableUIProps {
  labels: string[];
  values1: number[];
  values2: number[];
  header1: string;
  header2: string;
}

function combineArrays(labels: string[], values1: number[], values2: number[]) {
  return labels.map((label, index) => ({
    id: index,
    label,
    value1: values1[index],
    value2: values2[index],
  }));
}

export default function TableUI({ labels, values1, values2, header1, header2 }: TableUIProps) {
  const columns: GridColDef[] = [
    { field: 'label', headerName: 'Hora', flex: 1, minWidth: 90 },
    { field: 'value1', headerName: header1, flex: 1, minWidth: 120, type: 'number' },
    { field: 'value2', headerName: header2, flex: 1, minWidth: 120, type: 'number' },
  ];
  return (
    <Box sx={{ height: 380, width: '100%' }}>
      <DataGrid
        rows={combineArrays(labels, values1, values2)}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
