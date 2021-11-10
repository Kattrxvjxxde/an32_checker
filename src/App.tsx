import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
} from '@material-ui/core';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography>あんみつチェッカー</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm">
        <Box sx={{ m: '32px 0' }}>
          <Calculator />
        </Box>
      </Container>
    </>
  );
};

export default App;
