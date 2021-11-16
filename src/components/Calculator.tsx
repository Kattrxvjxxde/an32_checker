import React from 'react';
import {
  makeStyles,
  Box,
} from "@material-ui/core";
import NumberField from './NumberField';
import ResultBox from './ResultBox';

const useStyles = makeStyles(() => ({
  flexBox: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}));

// デフォルト値（Divine's:Bugscriptの速いトリル）
const DEFAULT_BPM = 230;
const DEFAULT_NOTE_TYPE = 24;

const Calculator: React.FC = () => {
  const classes = useStyles();

  const [bpm, setBpm] = React.useState<number>(DEFAULT_BPM);
  const [noteType, setNoteType] = React.useState<number>(DEFAULT_NOTE_TYPE);

  // 「数字だけ」の正規表現
  const onlyNumRegexp = /^\d*$/;

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

  // ノーツ間秒数計算
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

      <ResultBox
        interval={calcInterval}
        criticalSec={calcCriticalSec}
      />
    </>
  );
};

export default Calculator;
