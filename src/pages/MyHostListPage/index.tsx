import React, {useEffect, useState} from 'react';
import {Host} from '../../interfaces/host.ts';
import GlobalLayout from '../../components/GlobalLayout.tsx';
import {Card, CardContent, CardMedia, Grid, Link, SelectChangeEvent} from '@mui/material';
import Typography from '@mui/material/Typography';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FullScreenLoader from '../../components/Loader/FullScreenLoader';
import StateFilter, {DEFAULT_STATE} from '../../components/Filters/StatesFilter.tsx';
import {ApiGetMyHostsList} from '../../api/endpoints/api-get-my-hosts-list.ts';
import {useParams} from 'react-router-dom';
import {getCountryCodeByName} from '../../helpers';
import {CountryName} from '../../enums/countries.ts';

const MyHostListPage: React.FC = () => {
    const { countryName } = useParams();
    const countryCode = getCountryCodeByName(countryName as CountryName);
    const [data, setData] = useState<(Host & {vehiclesCount: number, firstVehicleImage: string})[]>();
    const [selectedState, setSelectedState] = useState<string>(DEFAULT_STATE);

    const fetchData = async () => {
        const data = await ApiGetMyHostsList(selectedState);

        setData(data);
    }

    useEffect(() => {
        fetchData();
    }, [selectedState]);

    const handleStateChange = (event: SelectChangeEvent<string>) => {
        setSelectedState(event.target.value);
    };

    const layout = () => {
        if (!data) return <FullScreenLoader />

        return (
            <Grid container spacing={3}>
                {data.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <Link
                            href={`host/${item.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="none"
                            sx={{ display: "block", textDecoration: "none" }}
                        >
                            <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={item.firstVehicleImage}
                                    alt={`${item.firstName} ${item.lastName}`}
                                    sx={{ objectFit: "cover" }}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {`${item.firstName} ${item.lastName}`}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                    >
                                        <DirectionsCarIcon fontSize="small" />
                                        {item.vehiclesCount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        )
    }

    return (
        <GlobalLayout>
            <div className="filters">
                <StateFilter country={countryCode} state={selectedState} onChange={handleStateChange}/>
            </div>
            <>
                {layout()}
            </>
        </GlobalLayout>
    );
};

export default MyHostListPage;
