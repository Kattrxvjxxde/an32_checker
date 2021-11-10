import React from 'react';
import {
  makeStyles,
  Box,
} from "@material-ui/core";

const FIGURE_CONTAINTER_HEIGHT = 320;
const FIGURE_HEIGHT = 240;
const NOTE_WIDTH = 120;

const useStyles = makeStyles(() => ({
  flexBox: {
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
    marginRight: 16,
    width: NOTE_WIDTH,
    borderBottom: '1rem solid #696969',
    zIndex: 100,
  },
  realNoteFigure2: {
    margin: 'auto',
    marginLeft: 16,
    width: NOTE_WIDTH,
    borderTop: '1rem solid #696969',
    zIndex: 100,
  },
  criticalFigure: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    WebkitTransform: 'translate(-50%, -50%)',
    MsTransform: 'translate(-50%, -50%)',
    width: '100%',
    background: '#ffa050',
    position: 'absolute',
    textAlign: 'center',
    animation: '$flash linear infinite 1s',
  },
  '@keyframes flash': {
    '0%, 100%': { opacity: 0.7 },
    '50%': { opacity: 0.4 },
  },
  virtualNote: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    WebkitTransform: 'translate(-50%, -50%)',
    MsTransform: 'translate(-50%, -50%)',
    width: '100%',

  },
  hr: {
    margin: '32px 0',
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
      <hr className={classes.hr} />

      <Box className={classes.flexBox}>
        <Box className={classes.figureContainer}>
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
          {criticalSec > 0 && (
            <Box
              className={classes.criticalFigure}
              sx={{ height: criticalFigureHeight }}
            />
          )}
        </Box>
      </Box>

      <hr className={classes.hr} />

      <Box className={classes.resultContainer}>
        <Box className={classes.flexBox}>
          <div>
            【ノーツ間】
            <br />
            {intervalStr}
          </div>
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
