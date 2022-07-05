import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarBottom from "../components/NavbarBottom";
import FormField from "../components/FormField";
import axiosInstance from "../utils/axiosInstance";
import axios from "axios";
import categories from "../utils/categories.data.js";

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
    category: "address",
    label: "Street: ",
    type: "text",
    name: "street",
    id: "street",
  },
  {
    field: "input",
    category: "address",
    label: "Postcode: ",
    type: "text",
    name: "postcode",
    id: "postcode",
  },
  {
    field: "input",
    category: "address",
    label: "City: ",
    type: "text",
    name: "city",
    id: "city",
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
    fullAddress: "",
    address: {
      street: "",
      postcode: "",
      city: "",
    },
    startAt: "",
    endAt: "",
    attendees: {
      minimum: "",
      maximum: "",
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
    console.log("formData", formData);
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

  // const handleChange = (event) => {
  //   // TODO
  //   setFormData({
  //     ...formData,
  //     yolo: event.target.value,
  //   });
  // };

  const [suggestions, setSuggestions] = useState([]);

  // Search for addresses proposal
  const searchAddress = (fullAddress) => {
    const requestURL = "https://api-adresse.data.gouv.fr/search/?q=";
    const requestAPI = requestURL + fullAddress + "?type=lable&autocomplete=1";
    console.log(requestAPI);
    axios.get(requestAPI).then((response) => {
      console.log("response.data", response.data.features);
      setSuggestions(response.data.features);
    });
  };

  const handleSelect = () => {
    setFormData({
      ...formData,
      address: { street: "", postcode: "", city: "" },
      fullAddress: "",
      //TODO Location
    });
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div>
      <h1>CreateEventPage</h1>
      <form onSubmit={handleSubmit}>
        {/* {formFields.map((formField) => (
          <FormField
            key={formField.label}
            {...formField}
            formData={formData}
            setFormData={setFormData}
          />
        ))} */}

        <div className="group-input">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={(event) => {
              setFormData({
                ...formData,
                title: event.target.value,
              });
            }}
            required
          />
        </div>

        <div className="group-input">
          <label htmlFor="address">Address: </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.fullAddress}
            onChange={(event) => {
              setFormData({
                ...formData,
                fullAddress: event.target.value,
              });
              searchAddress(formData.fullAddress);
            }}
            required
          />
          <ul>
            {suggestions.map((address) => {
              return (
                <li key={address.properties.id}>
                  {/* onClick={handleSelect(address)} */}
                  <strong>{address.properties.label}</strong>
                </li>
              );
            })}
            ;
          </ul>
        </div>

        <div className="group-input">
          <label htmlFor="startAt">Start at: </label>
          <input
            type="datetile-local"
            name="startAt"
            id="startAt"
            value={formData.startAt}
            onChange={(event) => {
              setFormData({
                ...formData,
                startAt: event.target.value,
              });
            }}
            required
          />
        </div>

        <div className="group-input">
          <label htmlFor="endAt">End at: </label>
          <input
            type="datetime-local"
            name="endAt"
            id="endAt"
            value={formData.endAt}
            onChange={(event) => {
              setFormData({
                ...formData,
                endAt: event.target.value,
              });
            }}
            required
          />
        </div>

        <div className="group-input">
          <label htmlFor="minAttendees">Minimum attendees: </label>
          <input
            type="number"
            name="minAttendees"
            id="minAttendees"
            value={formData.attendees.minimum}
            onChange={(event) => {
              setFormData({
                ...formData,
                attendees: { minimum: event.target.value },
              });
            }}
          />
        </div>

        <div className="group-input">
          <label htmlFor="maxAttendees">Maximum attendees: </label>
          <input
            type="number"
            name="maxAttendees"
            id="maxAttendees"
            value={formData.attendees.maximum}
            onChange={(event) => {
              setFormData({
                ...formData,
                attendees: { minimum: event.target.value },
              });
            }}
          />
        </div>

        <div className="group-input">
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={(event) => {
              setFormData({
                ...formData,
                price: event.target.value,
              });
            }}
            min="0"
            step="0.05"
          />
        </div>

        <div className="group-input">
          <label htmlFor="category">Category: </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={(event) => {
              setFormData({
                ...formData,
                category: event.target.value,
              });
            }}
            required
          >
            <option value="">--Please choose an option--</option>
            {categories.map((option) => {
              return (
                <option key={option} value={option}>
                  {capitalizeFirstLetter(option)}
                </option>
              );
            })}
          </select>
        </div>

        <div className="group-input">
          <label htmlFor="description">Description: </label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={formData.description}
            onChange={(event) => {
              setFormData({
                ...formData,
                description: event.target.value,
              });
            }}
          ></textarea>
        </div>

        <div className="group-input">
          <label htmlFor="requiredApproval">Approval required:</label>
          <input
            type="checkbox"
            name="requiredApproval"
            id="requiredApproval"
            value={formData.requireApproval}
            onChange={(event) => {
              setFormData({
                ...formData,
                requireApproval: event.target.value,
              });
            }}
          />
        </div>

        <input type="submit" value="Send" name="" id="" />
      </form>

      <NavbarBottom />
    </div>
  );
};

export default CreateEventPage;
