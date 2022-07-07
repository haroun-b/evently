import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./formStyle.css";

const CheckBox = ({ formData, setFormData, name, label }) => {
  return (
    <div className="group-input">
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
    </div>
  );
};

export default CheckBox;
