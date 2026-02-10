import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export const Footer: React.FC = () => {
  return (
    <Box sx={{ py: 4, bgcolor: '#000', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
          © 2025 Rafael Caballero. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};
