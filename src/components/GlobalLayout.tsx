import React, { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InsightsIcon from '@mui/icons-material/Insights';

interface LayoutProps {
  children: ReactNode;
}

const GlobalLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h5" noWrap>
            <InsightsIcon /> Global Statistic
          </Typography>
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
