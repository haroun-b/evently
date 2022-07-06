import React, { useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Input from "./Input";
import "./formStyle.css";

const EventHours = ({
  formData,
  setFormData,
  children,
  name,
  ...inputConfig
}) => {
  return (
    <div className="group-input">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Start At"
          value={formData["startAt"]}
          minDate={new Date().toISOString().slice(0, -8)}
          onChange={(newValue) => {
            setFormData({
              ...formData,
              ["startAt"]: newValue,
            });
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          label="End At"
          value={formData["endAt"]}
          minDate={formData["startAt"]}
          onChange={(newValue) => {
            setFormData({
              ...formData,
              ["endAt"]: newValue,
            });
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
};
export default EventHours;
