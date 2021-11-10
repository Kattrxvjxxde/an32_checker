import React from 'react';
import {
  makeStyles,
  Box,
} from "@material-ui/core";

const FIGURE_CONTAINTER_HEIGHT = 360;
const FIGURE_HEIGHT = 320;
const NOTE_WIDTH = 200;

const useStyles = makeStyles(() => ({
  containerBox: {
    marginTop: 40,
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  figureContainer: {
    height: FIGURE_CONTAINTER_HEIGHT,
    position: 'relative',
  },
  noteContainer: {
    height: FIGURE_CONTAINTER_HEIGHT,
    display: 'flex',
  },
  realNoteFigure1: {
    margin: 'auto',
    marginRight: 20,
    width: NOTE_WIDTH,
    borderBottom: '1rem solid #696969',
  },
  realNoteFigure2: {
    margin: 'auto',
    marginLeft: 20,
    width: NOTE_WIDTH,
    borderTop: '1rem solid #696969',
  },
  criticalFigure: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    WebkitTransform: 'translate(-50%, -50%)',
    MsTransform: 'translate(-50%, -50%)',
    width: '100%',
    background: '#f90',
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
    <>
      <Box className={classes.containerBox}>
        <Box className={classes.figureContainer}>
          {criticalSec > 0 && (
            <Box
              className={classes.criticalFigure}
              sx={{ height: criticalFigureHeight }}
            />
          )}
          <Box className={classes.noteContainer}>
            <Box
              className={classes.realNoteFigure1}
              sx={{ height: noteFigureHeight }}
            />
            <Box
              className={classes.realNoteFigure2}
              sx={{ height: noteFigureHeight }}
            />
          </Box>
        </Box>
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
    </>
  );
};

export default ResultBox;
