import React from 'react';
import {
  makeStyles,
  Box,
} from "@material-ui/core";
import SupplementButton from './SupplementButton';
import TweetButton from './TweetButton';
import ImageFigure from './ImageFigure';

const CRITICAL_TH0 = 1.0 * 1000 / 120;
const CRITICAL_TH1 = 3.0 * 1000 / 120;
const CRITICAL_TH2 = 4.2 * 1000 / 120;
const CRITICAL_TH3 = 6.0 * 1000 / 120;

const useStyles = makeStyles(() => ({
  flexBox: {
    marginBottom: '0.9rem',
    padding: '0.7rem',
    display: 'flex',
    justifyContent: 'space-evenly',
    border: '0.2rem solid #dcdcdc',
  },
  imageFigureBox: {
    marginBottom: '0.9rem',
    padding: '0.7rem',
    display: 'flex',
    justifyContent: 'space-evenly',
    border: '0.2rem solid #dcdcdc',
    backgroundColor: 'rgba(0, 0, 10, 0.8)',
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
    fontSize: '0.6rem',
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
  bpm: number;
  noteType: number;
  interval: number;
  criticalSec: number;
};

const ResultBox: React.FC<ResultBoxProps> = (props: ResultBoxProps) => {
  const classes = useStyles();
  const { bpm, noteType, interval, criticalSec } = props;

  const intervalStr = interval === 0 ? 'ERROR' : `${interval} ms`

  let criticalSecStr = 'ERROR';
  if (interval !== 0) {
    criticalSecStr = criticalSec > 0 ? `${criticalSec} ms` : 'なし';
  }

  let criticalTextColor = '#666';
  let resultText = '正常となるような値を指定してください。';

  if (interval !== 0) {
    if (criticalSec <= 0) {
      resultText = '餡蜜は不可能です。';
    } else if (0 <= criticalSec && criticalSec < CRITICAL_TH0) {
      criticalTextColor = '#666';
      resultText = '餡蜜の有用性はほぼありません。\n頑張って譜面通りに叩きましょう。';
    } else if (CRITICAL_TH0 <= criticalSec && criticalSec < CRITICAL_TH1) {
      criticalTextColor = '#05f';
      resultText = noteType === 24
        ? '餡蜜の有用性は低いです。\n24分を16分に変換できる譜面（※）であっても、\n相当精度に自信がない限りは、頑張って譜面通りに叩きましょう。'
        : '餡蜜の有用性は低いです。\n頑張って譜面通りに叩きましょう。';
    } else if (CRITICAL_TH1 <= criticalSec && criticalSec < CRITICAL_TH2) {
      criticalTextColor = '#0c0';
      resultText = noteType === 24
        ? '餡蜜の有用性はそこそこあります。\n24分を16分に変換できる譜面(※)であれば、\n餡蜜してみるのもよいでしょう。'
        : '餡蜜の有用性はそこそこあります。\nしかしながら、できる限りは頑張って譜面通りに叩くのが良さそうです。';
    } else if (CRITICAL_TH2 <= criticalSec && criticalSec < CRITICAL_TH3) {
      criticalTextColor = '#f70';
      resultText = noteType === 24
        ? '餡蜜の有用性は高いです！\n24分を16分に変換できる譜面(※)であれば、\n安定してCRITICAL判定が出るでしょう。'
        : '餡蜜の有用性は高いです！\n1個目のノートからほんの少し遅入りして餡蜜する感覚に慣れたら、\nCRITICAL判定を安定させることができるでしょう。';
    } else {
      criticalTextColor = '#f22';
      resultText = '餡蜜の有用性は非常に高いです!!\n特に意識せずとも餡蜜で安定してCRITICAL判定が出るでしょう。\nノーツの中央でなく、どちらかのノーツに合わせた餡蜜でもおおよそ大丈夫です。';
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
        <SupplementButton
          display={/24分を16分に変換できる譜面/.test(resultText)}
        />
        <Box className={classes.description}>
          {resultText.split('\n').map((str, index) => (
            <React.Fragment key={index}>{str}<br /></React.Fragment>
          ))}
        </Box>

        {interval !== 0 && (
          <TweetButton
            bpm={bpm}
            noteType={noteType}
            criticalSec={criticalSec}
          />
        )}
      </Box>

      {interval !== 0 && (
        <>
          <Box className={classes.label}>
            イメージ図
          </Box>

          <Box className={classes.imageFigureBox}>
            <ImageFigure
              interval={interval}
              criticalSec={criticalSec}
            />
          </Box>

          <Box className={classes.description}>
            <p>
              左下と右上にある白い棒は、ノーツを表しています。<br />
              この2本の白い棒の間隔が<b>ノーツ間隔</b>に相当します。
            </p>
            <p>
              ノーツの周囲にある黄色く塗られた部分が、それぞれのノートのCRITICAL判定の範囲（前後それぞれ41.667 [ms]）です。<br />
              2つのノーツのCRITICAL判定の重複部分が、赤い斜線で塗られています。<br />
              この赤い斜線で塗られた長方形が、餡蜜した場合にCRITICAL判定で光る範囲であり、<br />
              この長方形の高さが<b>CRITICAL範囲</b>に相当します。
              {criticalSec <= 0 && (
                <>
                  <br />
                  （赤い斜線で塗られた長方形がない場合、餡蜜した場合にCRITICAL判定で光る範囲はありません。）
                </>
              )}
            </p>
          </Box>
        </>
      )}
    </>
  );
};

export default ResultBox;
