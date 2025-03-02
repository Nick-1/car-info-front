import React from 'react';
import {Button} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import InsightsIcon from '@mui/icons-material/Insights';
import {TOP_LIMIT_VALUE} from '../../pages/TopVehiclesListPage';
import {logOut} from './helpers.ts';

const AdminHeader: React.FC = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h5" noWrap sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
                        <InsightsIcon /> Global Statistic
                    </Link>
                </Typography>
                <Button color="inherit" component={Link} to="/" sx={{ marginLeft: 'auto' }}>
                    Host
                </Button>
                <Button color="inherit" component={Link} to="/top-vehicles-by-unavailable-days" sx={{ marginLeft: 'auto' }}>
                    Top {TOP_LIMIT_VALUE}
                </Button>
                <Button color="inherit" component={Link} to="/daily-pricing-research-1">
                    Research
                </Button>
                <Button color="inherit" onClick={logOut}>Log out</Button>
            </Toolbar>
        </AppBar>
    );
};

export default AdminHeader;
