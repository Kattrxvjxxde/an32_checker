import React from 'react';
import {
  makeStyles,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  numberField: {
    margin: '0 1.4rem'
  },
}));

type NumberFieldProps = {
  label: string;
  name: string;
  value: number;
  handleChange: (event: React.ChangeEvent<{ value: unknown, name?: string }>) => void;
};

const NumberField: React.FC<NumberFieldProps> = (props: NumberFieldProps) => {
  const classes = useStyles();

  const { label, name, value, handleChange } = props;
  const valueStr = value === 0 ? '' : String(value);

  return (
    <TextField
      label={label}
      name={name}
      type="number"
      inputProps={{ pattern: '[0-9]*' }}
      value={valueStr}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
      className={classes.numberField}
    />
  );
};

export default NumberField;
