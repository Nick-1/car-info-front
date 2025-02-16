import {Card, CardContent, CardMedia} from '@mui/material';
import Typography from '@mui/material/Typography';

import {formatDateFromIsoToString, formatMonthYear} from '../../../helpers';
import {Image} from '../../../interfaces/vehicleImage.ts';

interface HostStatisticCardProps {
    image: Image[];
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    memberSince: number;
    vehiclesCount: number;
    year: number;
    month: number;
    totalEarned: number;
}

const getImgUrl = (images: Image[]): any => {
    const lastIndex = images ? images.length - 1 : 0;

    return images ? images[lastIndex].originalImageUrl : '';
}

const HostStatisticCard: React.FC<HostStatisticCardProps> = (props) => {
    const {
        image,
        firstName,
        lastName,
        memberSince,
        vehiclesCount,
        year,
        month,
        totalEarned,

    } = props;

    return (
        <Card sx={{maxWidth: 450}}>
      <CardMedia
          sx={{height: 200}}
          image={getImgUrl(image)}
          title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            <strong>Host:</strong> {firstName} {lastName}
        </Typography>
        <Typography variant="subtitle1">
          Member since: <strong>{formatDateFromIsoToString(memberSince)}</strong>
      </Typography>
        <Typography variant="subtitle1">
          Vehicles count:  <strong>{vehiclesCount}</strong>
        </Typography>
        <Typography variant="subtitle1">
            Approximate profit in {formatMonthYear(month, year)}: <strong>${totalEarned}</strong>
        </Typography>
      </CardContent>
    </Card>
    )
}

export default HostStatisticCard;
