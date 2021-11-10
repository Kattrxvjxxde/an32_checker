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

const Calculator: React.FC = () => {
  const classes = useStyles();

  const [bpm, setBpm] = React.useState<number>(230);
  const [noteType, setNoteType] = React.useState<number>(24);

  const onlyNumRegexp = /^\d*$/;

  const handleChange = (event: React.ChangeEvent<{ value: unknown, name?: string }>) => {
    if (!onlyNumRegexp.test(event.target.value as string)) return;

    const numValue = Number((event.target.value as string).replace(/^0+/, ''));

    switch(event.target.name) {
      case 'bpm':
        return setBpm(numValue);
      case 'noteType':
        return setNoteType(numValue);
      default:
        return;
    }
  };

  const calcInterval = React.useMemo(() =>
    Math.round(240000000 / (bpm * noteType)) / 1000,
    [bpm, noteType]
  );

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
