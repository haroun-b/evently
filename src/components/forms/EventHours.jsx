import React, { useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import "./formStyle.css";

const EventHours = ({
  formData,
  setFormData,
  children,
  name,
  ...inputConfig
}) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="group-input">
          <DateTimePicker
            label="Start At"
            value={formData["startAt"]}
            minDate={new Date()}
            onChange={(newValue) => {
              setFormData({
                ...formData,
                ["startAt"]: newValue,
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <div className="group-input">
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
        </div>
      </LocalizationProvider>
    </>
  );
};
export default EventHours;
