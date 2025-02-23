import React, { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InsightsIcon from '@mui/icons-material/Insights';
import {Button} from "@mui/material";
import { Link } from 'react-router-dom';
import {TOP_LIMIT_VALUE} from '../pages/TopVehiclesListPage';

interface LayoutProps {
  children: ReactNode;
}

const GlobalLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
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
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{ bgcolor: 'background.default', p: 3, mt: 7 }}
      >
        {children}
      </Box>
    </>
  );
};

export default GlobalLayout;
