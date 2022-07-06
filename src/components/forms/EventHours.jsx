import React, { useEffect } from "react";
import Input from "./Input";

const EventHours = ({ formData, setFormData, children, ...inputConfig }) => {
  return (
    <div className="group-input">
      <Input
        name="startAt"
        label="Start at"
        min={new Date().toISOString().slice(0, -8)}
        {...{ setFormData, formData, ...inputConfig }}
      />
      <Input
        name="endAt"
        label="End at"
        min={formData["startAt"]}
        {...{ setFormData, formData, ...inputConfig }}
      />
    </div>
  );
};
export default EventHours;
