import React from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
} from '@material-ui/core';
import GuideButton from './components/GuideButton';
import Calculator from './components/Calculator';

const useStyles = makeStyles(() => ({
  appBar: {
    background: 'linear-gradient(to bottom right, #56ccf2, #2f80ed)',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  calculatorBox: {
    margin: '32px 0',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography>SDVXあんみつチェッカー</Typography>
          <GuideButton />
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm">
        <Box className={classes.calculatorBox}>
          <Calculator />
        </Box>
      </Container>
    </>
  );
};

export default App;
