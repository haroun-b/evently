import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import NavbarBottom from "../components/NavbarBottom";
import axiosInstance from "../utils/axiosInstance";
import categories from "../utils/categories.data.js";

import "./styles/CreateEventPage.css";
import AddressLookupInput from "../components/forms/AddressLookupInput";
import Input from "../components/forms/Input";
import Select from "../components/forms/Select";
import { Textarea } from "../components/forms/Textarea";
import AttendeesNum from "../components/forms/AttendeesNum";
import EventHours from "../components/forms/EventHours";
import CheckBox from "../components/forms/CheckBox";
const formFields = [
  {
    component: Input,
    key: "title",
    label: "Title: ",
    name: "title",
    id: "title",
    required: true,
  },
  {
    component: AddressLookupInput,
    key: "address",
    label: "Address: ",
    name: "fullAddress",
    id: "address",
    required: true,
  },
  {
    component: EventHours,
    key: "hours",
    type: "datetime-local",
    required: true,
  },
  {
    component: AttendeesNum,
    key: "attendee",
    type: "number",
  },
  {
    component: Input,
    key: "price",
    label: "Price: ",
    type: "number",
    name: "price",
    id: "price",
    min: "0",
    step: "0.05",
  },
  {
    component: Select,
    key: "cat",
    label: "Category: ",
    name: "category",
    id: "category",
    options: categories,
    required: "required",
    capitalizeFirstLetter: (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  {
    component: Textarea,
    key: "desc",
    label: "Description: ",
    name: "description",
    id: "description",
  },
  {
    component: Input,
    key: "img",
    label: "Image",
    type: "file",
    name: "image",
    id: "image",
  },
  {
    component: CheckBox,
    key: "approval",
    label: "Approval required: ",
    type: "checkbox",
    name: "requiredApproval",
    id: "requiredApproval",
  },
];

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    fullAddress: "",
    address: {
      street: "",
      postcode: "",
      city: "",
    },
    startAt: null,
    endAt: null,
    minimum: "",
    maximum: "",
    attendees: {
      minimum: "",
      maximum: "",
    },
    location: {
      coordinates: "",
    },
    price: "",
    category: "",
    description: "",
    image: "",
    requireApproval: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = `/events`;
    const data = { ...formData };

    // Create the event
    try {
      axiosInstance.post(url, data).then((response) => {
        console.log("response.data", response.data);
        navigate(`/events/${response.data._id}`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-event-page">
      <form className="create-event-form">
        {formFields.map(({ component: Component, ...formField }) => (
          <Component
            key={formField.key}
            {...formField}
            formData={formData}
            setFormData={setFormData}
          />
        ))}

        <Button className="create-event-button" variant="contained" disableElevation onClick={handleSubmit}>
          Create event
        </Button>
      </form>

      <NavbarBottom />
    </div>
  );
};

export default CreateEventPage;
