import React, { useEffect } from "react";
import Input from "./Input";

const AttendeesNum = ({
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
        label="Max"
        max={formData.maximum}
        {...{ setFormData, formData, ...inputConfig }}
      />
      <Input
        name="maximum"
        label="Min"
        max={formData.minimum}
        {...{ setFormData, formData, ...inputConfig }}
      />
    </div>
  );
};

export default AttendeesNum;
