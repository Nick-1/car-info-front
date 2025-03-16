import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const GlobalLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{ bgcolor: 'background.default', p: 1, mt: 10 }}
      >
        {children}
      </Box>
    </>
  );
};

export default GlobalLayout;
