import React, {useEffect, useState} from 'react';
import {Host} from '../../interfaces/host.ts';
import {ApiGetHostsListByUserId} from '../../api/endpoints/api-get-hosts-list-by-user-id.ts';
import GlobalLayout from '../../components/GlobalLayout.tsx';
import {Card, CardContent, CardMedia, Grid, Link} from '@mui/material';
import Typography from '@mui/material/Typography';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FullScreenLoader from '../../components/Loader/FullScreenLoader';

const HostsListPage: React.FC = () => {
    const [data, setData] = useState<(Host & {vehiclesCount: number, firstVehicleImage: string})[]>();

    const fetchData = async () => {
        const data = await ApiGetHostsListByUserId();

        setData(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

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
            <>
                {layout()}
            </>
        </GlobalLayout>
    );
};

export default HostsListPage;
