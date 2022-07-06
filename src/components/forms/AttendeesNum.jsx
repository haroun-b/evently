import React, { useEffect } from "react";
import Input from "./Input";
import './formStyle.css'

const AttendeesNum = ({ formData, setFormData, children, ...inputConfig }) => {
  useEffect(() => {
    setFormData({
      ...formData,
      attendees: {
        maximum: formData.maximum,
        minimum: formData.minimum,
      },
    });
  }, [formData.minimum, formData.maximum]);

  return (
    <div className="group-input">
      <Input
        name="minimum"
        label="Min attendees"
        min="1"
        {...{ setFormData, formData, ...inputConfig }}
      />
      <Input
        name={"maximum"}
        label={"Max attendees"}
        min={formData.minimum}
        {...{ setFormData, formData, ...inputConfig }}
      />
    </div>
  );
};

export default AttendeesNum;
