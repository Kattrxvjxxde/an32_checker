import React from 'react';
import {
  makeStyles,
  Box,
} from "@material-ui/core";
import NumberField from './NumberField';
import ResultBox from './ResultBox';
import ArrowDown from '../images/arrow_down.svg'

const useStyles = makeStyles(() => ({
  flexBox: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  arrowDown: {
    margin: '4% 40% 1% 40%',
    width: '20%',
  },
}));

// 「数字だけ」の正規表現
const onlyNumRegexp = /^\d*$/;

// デフォルト値（Divine's:Bugscriptの速いトリル）
let defaultBpm = 230;
let defaultNoteType = 24;
// クエリストリングで指定されていたらその値にする
const params = new URLSearchParams(window.location.search);
const paramsBpm = params.get('bpm');
const paramsNoteType = params.get('noteType');
if (paramsBpm && onlyNumRegexp.test(paramsBpm) && Number(paramsBpm) <= 999)
  defaultBpm = Number(paramsBpm);
if (paramsNoteType && onlyNumRegexp.test(paramsNoteType) && Number(paramsNoteType) <= 99)
  defaultNoteType = Number(paramsNoteType);

const Calculator: React.FC = () => {
  const classes = useStyles();

  const [bpm, setBpm] = React.useState<number>(defaultBpm);
  const [noteType, setNoteType] = React.useState<number>(defaultNoteType);


  // onChange時に発火させる関数
  const handleChange = (event: React.ChangeEvent<{ value: unknown, name?: string }>) => {
    // 入力文字列が「数字だけ」でない場合、stateを更新しない
    if (!onlyNumRegexp.test(event.target.value as string)) return;

    // 入力文字列（0埋めなし）
    const strValue = (event.target.value as string).replace(/^0+/, '');

    // state更新
    switch(event.target.name) {
      case 'bpm':
        // BPMは3桁まで
        return setBpm(Number(strValue.slice(0, 3)));
      case 'noteType':
        // NOTE TYPEは2桁まで
        return setNoteType(Number(strValue.slice(0, 2)));
      default:
        return;
    }
  };

  // ノーツ間隔計算
  const calcInterval = React.useMemo(() => {
    return (bpm * noteType === 0) ? 0 : Math.round(240000000 / (bpm * noteType)) / 1000;
  }, [bpm, noteType]
  );

  // CRITICAL範囲計算
  const calcCriticalSec = React.useMemo(() =>
    Math.round((1000000 / 12) - (240000000 / (bpm * noteType))) / 1000,
    [bpm, noteType]
  );

  return (
    <>
      <Box className={classes.flexBox}>
        <NumberField
          label="BPM"
          name="bpm"
          value={bpm}
          handleChange={handleChange}
        />
        <NumberField
          label="NOTE TYPE"
          name="noteType"
          value={noteType}
          handleChange={handleChange}
        />
      </Box>

      <img className={classes.arrowDown} src={ArrowDown} alt="Arrowdown" />

      <ResultBox
        bpm={bpm}
        noteType={noteType}
        interval={calcInterval}
        criticalSec={calcCriticalSec}
      />
    </>
  );
};

export default Calculator;
