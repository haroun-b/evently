import React from "react";

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
    </div>
  );
};
