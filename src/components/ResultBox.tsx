import React from 'react';
import {
  makeStyles,
  Box,
} from "@material-ui/core";

const FIGURE_CONTAINTER_WIDTH = 200;
const FIGURE_CONTAINTER_HEIGHT = 360;
const FIGURE_HEIGHT = 320;

const useStyles = makeStyles(() => ({
  containerBox: {
    marginTop: 40,
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  figureContainer: {
    width: FIGURE_CONTAINTER_WIDTH,
    height: FIGURE_CONTAINTER_HEIGHT,
    position: 'relative',
  },
  noteFigure: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 'auto',
    width: '80%',
    borderTop: '1rem solid #696969',
    borderBottom: '1rem solid #696969',
    position: 'absolute',
  },
  criticalFigure: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 'auto',
    width: '80%',
    background: '#ffd800',
    opacity: 0.7,
    position: 'absolute',
    textAlign: 'center',
  },
  criticalStr: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 'auto',
    position: 'absolute',
    color: '#f90',
    fontSize: '1.2rem',
    fontFamily: 'Impact',
  },
  resultContainer: {
    textAlign: 'center',
  },
}));

type ResultBoxProps = {
  interval: number;
  criticalSec: number;
};

const ResultBox: React.FC<ResultBoxProps> = (props: ResultBoxProps) => {
  const classes = useStyles();
  const { interval, criticalSec } = props;

  const noteFigureHeight =
    interval > criticalSec
      ? FIGURE_HEIGHT
      : FIGURE_HEIGHT * interval / criticalSec;

  const criticalFigureHeight =
   criticalSec > interval
      ? FIGURE_HEIGHT
      : FIGURE_HEIGHT * criticalSec / interval;

  const intervalStr = interval === 0 ? 'ERROR' : `${interval} ms`

  let criticalSecStr = 'ERROR';
  if (interval !== 0) {
    criticalSecStr = criticalSec > 0 ? `${criticalSec} ms` : 'なし';
  }

  return (
    <Box className={classes.containerBox}>
      <Box className={classes.figureContainer}>
        {criticalSec > 0 && (
          <Box
            className={classes.criticalFigure}
            sx={{ height: criticalFigureHeight }}
          />
        )}
        <Box
          className={classes.noteFigure}
          sx={{ height: noteFigureHeight }}
        />
      </Box>

      <Box>
        <Box sx={{ textAlign: 'center' }}>
          <div>
            【ノーツ間】
            <br />
            {intervalStr}
          </div>

          <br />

          <div>
            【CRITICAL範囲】
            <br />
            {criticalSecStr}
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default ResultBox;
