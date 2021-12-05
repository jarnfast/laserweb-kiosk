import React, { ReactElement, FC } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// define interface to represent component props
interface Props {
  title: String;
}

const SelectStep: FC<any> = (): ReactElement => {
  const [step, setStep] = React.useState("1");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setStep(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <Select
        id="simple-select"
        value={step}
        displayEmpty
        onChange={handleChange}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={30}>30 </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectStep;
