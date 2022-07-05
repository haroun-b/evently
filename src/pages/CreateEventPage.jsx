import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarBottom from "../components/NavbarBottom";
import FormField from "../components/FormField";
import axiosInstance from "../../utils/axiosInstance";

import "./styles/CreateEventPage.css";

const formFields = [
  {
    field: "input",
    label: "Title: ",
    type: "text",
    name: "title",
    id: "title",
  },
  {
    field: "input",
    label: "Address: ",
    type: "text",
    name: "address",
    id: "address",
  },
  {
    field: "input",
    label: "Starts at: ",
    type: "datetime-local",
    name: "startAt",
    id: "startAt",
  },
  {
    field: "input",
    label: "Ends at: ",
    type: "datetime-local",
    name: "endAt",
    id: "endAt",
  },
  {
    field: "input",
    label: "Minimum attendees: ",
    type: "number",
    name: "minAttendees",
    id: "minAttendees",
  },
  {
    field: "input",
    label: "Maximum attendees: ",
    type: "number",
    name: "maxAttendees",
    id: "maxAttendees",
  },
  {
    field: "input",
    label: "Price: ",
    type: "number",
    name: "price",
    id: "price",
  },
  {
    field: "select",
    label: "Category: ",
    type: "text",
    name: "category",
    id: "category",
    options: [
      "art & culture",
      "writing",
      "music",
      "dancing",
      "games",
      "pets & animals",
      "language",
      "education",
      "science",
      "technology",
      "career & business",
      "politics",
      "community & envrionment",
      "parents & family",
      "hobbies & passions",
      "health & wellbeing",
      "religion & spirituality",
      "sports",
      "outdoor",
    ],
  },
  {
    field: "textarea",
    label: "Description: ",
    name: "description",
    id: "description",
  },
  { field: "input", label: "Image", type: "file", name: "image", id: "image" },
  {
    field: "input",
    label: "Approval required: ",
    type: "checkbox",
    name: "requiredApproval",
    id: "requiredApproval",
  },
];

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    startAt: "",
    endAt: "",
    minAttendees: "",
    maxAttendees: "",
    price: 0,
    category: "",
    description: "",
    image: "",
    requireApproval: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSumbit");

    const url = `/events`;
    const data = { ...formData };

    // Create the event
    try {
      axiosInstance.post(url, data).then((response) => {
        console.log("response.data", response.data);
        navigate(`/event/${response.data._id}`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>CreateEventPage</h1>
      <form onSubmit={handleSubmit}>
        {formFields.map((formField) => (
          <FormField
            key={formField.label}
            {...formField}
            formData={formData}
            setFormData={setFormData}
          />
        ))}
        <input type="submit" value="Send" name="" id="" />
      </form>

      <NavbarBottom />
    </div>
  );
};

export default CreateEventPage;
