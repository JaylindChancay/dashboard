import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface IndicatorUIProps {
  title: string;
  description: string;
}

export default function IndicatorUI({ title, description }: IndicatorUIProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">{title}</Typography>
        <Typography variant="h6" component="div">{description}</Typography>
      </CardContent>
    </Card>
  );
}
