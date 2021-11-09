import React from 'react';
import {
  makeStyles,
  MenuItem,
  Box,
} from "@material-ui/core";
import SelectForm from './SelectForm';
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

  const handleChange = (event: React.ChangeEvent<{ value: unknown, name?: string }>) => {
    switch(event.target.name) {
      case 'bpm':
        return setBpm(Number(event.target.value));
      case 'noteType':
        return setNoteType(Number(event.target.value));
      default:
        return;
    }
  };

  const bpmOptions = [];
  for (let i = 1; i < 1000; i++) {
    bpmOptions.push(
      <MenuItem value={i} key={i}>{i}</MenuItem>
    )
  }

  const noteTypeOptions =
    [4, 5, 6, 7, 8, 12, 16, 24, 32].map((num) =>
      <MenuItem value={num} key={num}>{num}分</MenuItem>
  );

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
        <SelectForm
          label="BPM"
          name="bpm"
          value={bpm}
          handleChange={handleChange}
          options={bpmOptions}
        />
        <SelectForm
          label="NOTE TYPE"
          name="noteType"
          value={noteType}
          handleChange={handleChange}
          options={noteTypeOptions}
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
