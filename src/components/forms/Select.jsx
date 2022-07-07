import * as React from "react";
import TextField from "@mui/material/TextField";
import categories from "../../utils/categories.data";
import MenuItem from "@mui/material/MenuItem";
import "./formStyle.css";

const Select = ({
  type = "text",
  name,
  id,
  options,
  label,
  formData,
  setFormData,
  children,
  capitalizeFirstLetter,
  ...inputConfig
}) => {
  if (!name || !label || !setFormData || !formData) {
    throw new Error("Missing dependencies for field.");
  }

  if (!id) {
    id = name;
  }
  return (
    <div className="group-input">
      <TextField
        id={id}
        select
        label="Select"
        value={formData[name]}
        onChange={(event) => {
          setFormData({
            ...formData,
            [name]: event.target.value,
          });
        }}
        helperText="Please select the category"
      >
        {categories.map((option) => (
          <MenuItem key={option} value={option}>
            {capitalizeFirstLetter(option)}
          </MenuItem>
        ))}
      </TextField>
      {children}
    </div>
  );
};

export default Select;
