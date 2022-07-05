import React from "react";

const FormInput = ({
  field,
  label,
  type,
  name,
  id,
  options,
  formData,
  setFormData,
}) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (name === "startAt") {
    return (
      <>
        <div className="group-input">
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            name={name}
            id={id}
            min={new Date().toISOString().slice(0, -8)}
            value={formData[name]}
            onChange={(event) => {
              setFormData({
                ...formData,
                [name]: event.target.value,
              });
            }}
          ></input>
        </div>
      </>
    );
  } else if (name === "endAt") {
    return (
      <>
        <div className="group-input">
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            name={name}
            id={id}
            min={formData["startAt"]}
            value={formData[name]}
            onChange={(event) => {
              setFormData({
                ...formData,
                [name]: event.target.value,
              });
            }}
          ></input>
        </div>
      </>
    );
  } else if (field === "input") {
    return (
      <>
        <div className="group-input">
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            name={name}
            id={id}
            value={formData[name]}
            onChange={(event) => {
              setFormData({
                ...formData,
                [name]: event.target.value,
              });
            }}
          ></input>
        </div>
      </>
    );
  } else if (field === "textarea") {
    return (
      <>
        <div className="group-input">
          <label htmlFor={name}>{label}</label>
          <textarea
            name={name}
            id={id}
            cols="30"
            rows="10"
            value={formData[name]}
            onChange={(event) => {
              setFormData({
                ...formData,
                [name]: event.target.value,
              });
            }}
          ></textarea>
        </div>
      </>
    );
  } else if (field === "select") {
    return (
      <>
        <div className="group-input">
          <label htmlFor={name}>{label}</label>
          <select
            name={name}
            id={id}
            value={formData[name]}
            onChange={(event) => {
              console.log("event.target.value", event.target.value);
              setFormData({
                ...formData,
                [name]: event.target.value,
              });
            }}
          >
            <option value="">--Please choose an option--</option>
            {options.map((option) => {
              return (
                <option key={option} value={option}>
                  {capitalizeFirstLetter(option)}
                </option>
              );
            })}
          </select>
        </div>
      </>
    );
  }
};

export default FormInput;
