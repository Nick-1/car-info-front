import React from 'react';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useParams } from 'react-router-dom';
import InsightsIcon from '@mui/icons-material/Insights';
import { TOP_LIMIT_VALUE } from '../../pages/TopVehiclesListPage';
import { logOut } from './helpers';

const AdminHeader: React.FC = () => {
    const { countryName } = useParams<{ countryName: string }>();
    const basePath = countryName ? `/${countryName}` : '';

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h5" noWrap sx={{ flexGrow: 1 }}>
                    <Link to={`${basePath}`} style={{ color: '#fff', textDecoration: 'none' }}>
                        <InsightsIcon /> Global Statistic
                    </Link>
                </Typography>

                <Button
                    color="inherit"
                    component={Link}
                    to={`${basePath}`}
                    sx={{ marginLeft: 'auto' }}
                >
                    Host
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to={`${basePath}/my-hosts`}
                    sx={{ marginLeft: 'auto' }}
                >
                    My hosts
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to={`${basePath}/top-vehicles-by-unavailable-days`}
                    sx={{ marginLeft: 'auto' }}
                >
                    Top {TOP_LIMIT_VALUE}
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to={`${basePath}/daily-pricing-research-1`}
                >
                    Research
                </Button>

                <Button color="inherit" onClick={logOut}>
                    Log out
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default AdminHeader;
