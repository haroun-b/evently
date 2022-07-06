import React, { useEffect } from "react";
import Input from "./Input";

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
        name="maximum"
        label="Max attendees"
        max={formData.maximum}
        {...{ setFormData, formData, ...inputConfig }}
      />
      <Input
        name="minimum"
        label="Min attendees"
        max={formData.minimum}
        {...{ setFormData, formData, ...inputConfig }}
      />
    </div>
  );
};

export default AttendeesNum;
