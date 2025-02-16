import {Card, CardContent, CardMedia} from '@mui/material';
import Typography from '@mui/material/Typography';

import {formatDateFromIsoToString} from '../../../helpers';
import {calculateTotalUnavailableDays} from '../../../pages/VehicleDetailStatisticPage/helpers';
import React from 'react';
import {DailyPricing} from '../../DailyPricing/types';
import {Image} from '../../../interfaces/vehicleImage.ts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface VehicleStatisticCardProps {
    image: Image[],
    make: string | null | undefined;
    model: string | null | undefined;
    vehicleYear: number;
    listingEnabled: boolean;
    listingCreatedTime: number,
    dailyPricing: DailyPricing[],
    year: number;
    month: number;
    totalEarned: number;
    tripCount: number;
}

const getImgUrl = (images: Image[]): any => {
    const lastIndex = images ? images.length - 1 : 0;

    return images ? images[lastIndex].originalImageUrl : '';
}

const VehicleStatisticCard: React.FC<VehicleStatisticCardProps> = (props) => {
    const {
        image,
        make,
        vehicleYear,
        model,
        listingEnabled,
        listingCreatedTime,
        dailyPricing,
        year,
        tripCount,
    } = props;

    return (
        <Card sx={{ maxWidth: 450 }}>
            <CardMedia
                sx={{ height: 200 }}
                image={getImgUrl(image)}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {make} {model} {vehicleYear}
                </Typography>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                    <strong>Active: </strong>
                    {listingEnabled ? <CheckCircleIcon color="success" /> : <RemoveCircleIcon color="error" />}
                </Typography>
                <Typography variant="subtitle1">
                    <strong>Created: </strong> {formatDateFromIsoToString(listingCreatedTime)}
                </Typography>
                <Typography variant="subtitle1">
                    <strong>Approximate profit in {year}: </strong>
                    ${calculateTotalUnavailableDays(dailyPricing, year)}
                </Typography>
                <Typography variant="subtitle1">
                    <strong>Trips: </strong> {tripCount}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default VehicleStatisticCard;
