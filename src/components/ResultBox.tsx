import React from 'react';
import {
  makeStyles,
  Box,
} from "@material-ui/core";
import SupplementButton from './SupplementButton';

const FIGURE_CONTAINTER_HEIGHT = 320;
const FIGURE_HEIGHT = 240;
const NOTE_WIDTH = 120;

const CRITICAL_TH1 = 2.5 * 1000 / 120;
const CRITICAL_TH2 = 4.5 * 1000 / 120;
const CRITICAL_TH3 = 6.0 * 1000 / 120;

const useStyles = makeStyles(() => ({
  flexBox: {
    marginBottom: '1.4rem',
    padding: '0.7rem',
    display: 'flex',
    justifyContent: 'space-evenly',
    border: '0.2rem solid #dcdcdc',
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
    borderBottom: '0.8rem solid #696969',
    zIndex: 100,
  },
  realNoteFigure2: {
    margin: 'auto',
    marginLeft: 16,
    width: NOTE_WIDTH,
    borderTop: '0.8rem solid #696969',
    zIndex: 100,
  },
  criticalFigure: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    WebkitTransform: 'translate(-50%, -50%)',
    MsTransform: 'translate(-50%, -50%)',
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
    animation: '$flashFigure linear infinite 1s',
  },
  '@keyframes flashFigure': {
    '0%, 100%': { opacity: 0.5 },
    '50%': { opacity: 0.3 },
  },
  virtualNote: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    WebkitTransform: 'translate(-50%, -50%)',
    MsTransform: 'translate(-50%, -50%)',
    width: '100%',

  },
  resultContainer: {
    marginBottom: '3.2rem',
    textAlign: 'center',
  },
  label: {
    marginBottom: '1.4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    '&::before': {
      marginRight: '1.4rem',
      borderTop: '0.1rem solid',
      content: '""',
      width: '4rem',
    },
    '&::after': {
      marginLeft: '1.4rem',
      borderTop: '0.1rem solid',
      content: '""',
      width: '4rem',
    },
  },
  description: {
    fontSize: '0.8rem',
    textAlign: 'center',
  },
  resultText: {
    color: '#666',
    fontWeight: 'bold',
  },
  criticalText: {
    fontWeight: 'bold',
    animation: '$flashText linear infinite 1s',
  },
  '@keyframes flashText': {
    '0%, 100%': { opacity: 1.0 },
    '50%': { opacity: 0.7 },
  },
}));

type ResultBoxProps = {
  interval: number;
  criticalSec: number;
  noteType: number;
};

const ResultBox: React.FC<ResultBoxProps> = (props: ResultBoxProps) => {
  const classes = useStyles();
  const { interval, criticalSec, noteType } = props;

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

  let criticalTextColor = '#666';
  let criticalFigureColor = 'repeating-linear-gradient(-45deg, #666, #666 5px, #ccc 5px, #ccc 10px)';
  let resultText = '正常となるような値を指定してください。';

  if (interval !== 0) {
    if (criticalSec <= 0) {
      resultText = '餡蜜は不可能です。';
    } else if (0 <= criticalSec && criticalSec < CRITICAL_TH1) {
      criticalTextColor = '#05f';
      criticalFigureColor = 'repeating-linear-gradient(-45deg, #05f, #05f 5px, #7bf 5px, #7bf 10px)';
      resultText = noteType === 24
        ? '餡蜜の有用性は低いです。\n24分を16分に変換できる譜面（※）であっても、\n相当精度に自信がない限りは、頑張って譜面通りに叩きましょう。'
        : '餡蜜の有用性は低いです。\n頑張って譜面通りに叩きましょう。';
    } else if (CRITICAL_TH1 <= criticalSec && criticalSec < CRITICAL_TH2) {
      criticalTextColor = '#0c0';
      criticalFigureColor = 'repeating-linear-gradient(-45deg, #0c0, #0c0 5px, #8e8 5px, #8e8 10px)';
      resultText = noteType === 24
        ? '餡蜜の有用性はそこそこあります。\n24分を16分に変換できる譜面(※)であれば、\n餡蜜してみるのもよいでしょう。'
        : '餡蜜の有用性はそこそこあります。\nしかしながら、できる限りは頑張って譜面通りに叩くのが良さそうです。';
    } else if (CRITICAL_TH2 <= criticalSec && criticalSec < CRITICAL_TH3) {
      criticalTextColor = '#f70';
      criticalFigureColor = 'repeating-linear-gradient(-45deg, #f70, #f70 5px, #fc5 5px, #fc5 10px)';
      resultText = noteType === 24
        ? '餡蜜の有用性は高いです！\n24分を16分に変換できる譜面(※)であれば、\n安定してCRITICAL判定が出るでしょう。'
        : '餡蜜の有用性は高いです！\n1個目のノートからほんの少し遅入りして同時押しする感覚に慣れたら、\nCRITICAL判定を安定させることができるでしょう。';
    } else {
      criticalTextColor = '#f22';
      criticalFigureColor = 'repeating-linear-gradient(-45deg, #f22, #f22 5px, #f99 5px, #f99 10px)';
      resultText = '餡蜜の有用性は非常に高いです！！\n特に意識せずとも餡蜜で安定してCRITICAL判定が出るでしょう。\nノーツの中央でなく、どちらかのノーツに合わせた餡蜜でもおおよそ大丈夫です。';
    }
  }

  const criticalTextClass = criticalSec > 0 ? classes.criticalText : classes.resultText;

  return (
    <>
      <Box className={classes.label}>
        計算結果
      </Box>

      <Box className={classes.resultContainer}>
        <Box className={classes.flexBox}>
          <Box className={classes.resultText}>
            ノーツ間隔
            <br />
            {intervalStr}
          </Box>
          <Box
            className={criticalTextClass}
            style={{ color: criticalTextColor }}
          >
            CRITICAL範囲
            <br />
            {criticalSecStr}
          </Box>
        </Box>
        {/24分を16分に変換できる譜面/.test(resultText) && (
          <SupplementButton />
        )}
        <Box className={classes.description}>
          {resultText.split('\n').map((str, index) => (
            <React.Fragment key={index}>{str}<br /></React.Fragment>
          ))}
        </Box>
      </Box>

      <Box className={classes.label}>
        イメージ図
      </Box>

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
              style={{ background: criticalFigureColor }}
            />
          )}
        </Box>
      </Box>

      <Box className={classes.description}>
        <p>
          2本ある黒い棒がノーツを表しています。<br />
          左側が餡蜜したいノーツの1個目、右側が2個目です。<br />
          この2本の黒い棒の間隔が<b>ノーツ間隔</b>に相当します。
        </p>
        <p>
          斜め線でで塗り潰された長方形が、<br />
          同時押しした場合にCRITICAL判定で光る範囲を表しています。<br />
          この長方形の高さが<b>CRITICAL範囲</b>に相当します。
        </p>
      </Box>
    </>
  );
};

export default ResultBox;
