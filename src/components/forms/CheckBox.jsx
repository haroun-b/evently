import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CheckBox = ({ formData, setFormData, name, label }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            value={formData[name]}
            onChange={(event) => {
              setFormData({
                ...formData,
                [name]: event.target.value,
              });
            }}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};

export default CheckBox;
