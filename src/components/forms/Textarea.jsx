import * as React from "react";
import TextField from "@mui/material/TextField";
import "./formStyle.css";

export const Textarea = ({
  name,
  id,
  label,
  formData,
  setFormData,
  children,
  ...inputConfig
}) => {
  return (
    <div className="group-input">
      <TextField
        id={id}
        label={label}
        {...inputConfig}
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
        multiline
        maxRows={4}
      ></TextField>
      {children}
    </div>
  );
};

{
  /* <div className="group-input">
      <label htmlFor={id}>{label}: </label>
      <textarea
        name={name}
        id={id}
        cols="30"
        rows="5"
        {...inputConfig}
        value={formData.description}
        onChange={(event) => {
          setFormData({
            ...formData,
            description: event.target.value,
          });
        }}
      ></textarea>
    </div> */
}
