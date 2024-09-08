import React, { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InsightsIcon from '@mui/icons-material/Insights';
import {Button} from "@mui/material";
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const GlobalLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h5" noWrap sx={{ flexGrow: 1 }}>
            <InsightsIcon /> Global Statistic
          </Typography>
          <Button color="inherit" component={Link} to="/" sx={{ marginLeft: 'auto' }}>
            Хост
          </Button>
          <Button color="inherit" component={Link} to="/group">
            Група №1
          </Button>
          {/*<Button color="inherit" component={Link} to="/group-2">*/}
          {/*  Група №2*/}
          {/*</Button>*/}
            <Button color="inherit" component={Link} to="/daily-pricing">
              Аналіз цін
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
