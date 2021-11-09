import React from 'react';
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  formControl: {
    width: '30%',
  },
}));

type SelectFormProps = {
  label: string;
  name: string;
  value: number;
  handleChange: (event: React.ChangeEvent<{ value: unknown, name?: string }>) => void;
  options: JSX.Element[];
};

const SelectForm: React.FC<SelectFormProps> = (props: SelectFormProps) => {
  const classes = useStyles();
  const { label, name, value, handleChange, options } = props;

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>{label}</InputLabel>
        <Select
          name={name}
          value={value}
          onChange={handleChange}
        >
          {options}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectForm;
