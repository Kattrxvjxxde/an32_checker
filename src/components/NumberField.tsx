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

  return (
    <TextField
      label={label}
      name={name}
      type="number"
      value={value}
      onChange={handleChange}
    />
  );
};

export default NumberField;
