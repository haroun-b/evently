import * as React from "react";
import TextField from "@mui/material/TextField";
import "./formStyle.css";

const File = ({
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
        InputLabelProps={{
          shrink: true,
        }}
        value={formData[name]}
        onInput={(event) => {
          setFormData({
            ...formData,
            [name]: event.target.files[0],
          });
        }}
      ></TextField>

      {children}
    </div>
  );
};

export default File;
