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
      <AppBar position="static">
        <Toolbar>
          <Typography>あんみつチェッカー</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm">
        <Box sx={{ m: '30px 0' }}>
          <Calculator />
        </Box>
      </Container>
    </>
  );
};

export default App;
