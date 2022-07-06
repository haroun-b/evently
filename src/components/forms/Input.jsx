import * as React from "react";
import TextField from "@mui/material/TextField";
import "./formStyle.css";

const Input = ({
  type = "text",
  name,
  id,
  options,
  label,
  formData,
  setFormData,
  children,
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
        label={label}
        {...inputConfig}
        type={type}
        name={name}
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
        value={formData[name]}
        onChange={(event) => {
          setFormData({
            ...formData,
            [name]: event.target.value,
          });
        }}
      ></TextField>

      {children}
    </div>

    // <div className="group-input">
    //   <label htmlFor={id}>{label}</label>
    //   <input
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
    //   ></input>
    //   {children}
    // </div>
  );
};

export default Input;
