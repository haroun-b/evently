import * as React from "react";
import TextField from "@mui/material/TextField";
import categories from "../../utils/categories.data";
import MenuItem from '@mui/material/MenuItem';
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
        id="outlined-select-currency"
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

    // <div className="group-input">

    //   <label htmlFor={id}>{label}</label>
    //   <select
    //     type={type}
    //     name={name}
    //     id={id}
    //     {...inputConfig}
    //     value={formData[name]}
    //     onChange={(event) => {
    //       setFormData({
    //         ...formData,
    //         [name]: event.target.value,
    //       });
    //     }}
    //     required
    //   >
    //     <option value="">--Please choose an option--</option>
    //     {options.map((option) => {
    //       return (
    //         <option key={option} value={option}>
    //           {capitalizeFirstLetter(option)}
    //         </option>
    //       );
    //     })}
    //   </select>
    //   {children}
    // </div>
  );
};

export default Select;
