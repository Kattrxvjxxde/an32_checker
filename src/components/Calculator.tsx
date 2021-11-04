import React from 'react';
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  formControl: {
    width: '30%',
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
    Math.round(24000000 / (bpm * noteType)) / 100,
    [bpm, noteType]
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          p: 1,
          m: 1,
        }}
      >
        <FormControl className={classes.formControl}>
          <InputLabel>BPM</InputLabel>
          <Select
            name="bpm"
            value={bpm}
            onChange={handleChange}
          >
            {bpmOptions}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel>NOTE TYPE</InputLabel>
          <Select
            name="noteType"
            value={noteType}
            onChange={handleChange}
          >
            {noteTypeOptions}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ p: 1, m: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          {calcInterval} ms
        </Box>
      </Box>
    </>
  );
}

export default Calculator;
