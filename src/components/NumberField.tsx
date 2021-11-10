import React from 'react';
import { TextField } from "@material-ui/core";

type NumberFieldProps = {
  label: string;
  name: string;
  value: number;
  handleChange: (event: React.ChangeEvent<{ value: unknown, name?: string }>) => void;
};

const NumberField: React.FC<NumberFieldProps> = (props: NumberFieldProps) => {
  const { label, name, value, handleChange } = props;
  const valueStr = value === 0 ? '' : String(value);

  return (
    <TextField
      label={label}
      name={name}
      type="number"
      inputProps={{ maxLength: 3, pattern: '[0-9]*' }}
      value={valueStr}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default NumberField;
