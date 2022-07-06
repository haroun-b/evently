import React, { useState } from "react";
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
const formFields = [
  {
    component: Input,
    key: 'title',
    label: "Title: ",
    name: "title",
    id: "title",
    required: "required",
  },
  {
    component: AddressLookupInput,
    key: 'address',
    label: "Address: ",
    name: "address",
    id: "address",
    required: "required",
  },
  {
    component: EventHours,
    key: 'hours',
    type: "datetime-local",
    required: "required",
  },
  {
    component: AttendeesNum,
    key: 'attendee',
    type: "number",
    min: 1,
  },
  {
    component: Input,
    key: 'price',
    label: "Price: ",
    type: "number",
    name: "price",
    id: "price",
    min: "0",
    step: "0.05",
  },
  {
    component: Select,
    key: 'cat',
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
    key: 'desc',
    label: "Description: ",
    name: "description",
    id: "description",
  },
  {
    component: Input,
    key: 'img',
    label: "Image",
    type: "file",
    name: "image",
    id: "image",
  },
  {
    component: Input,
    key: 'approval',
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
    minimum:'',
    maximum:'',
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
    <div className="create-event-page">
      <h1>CreateEventPage</h1>
      <form className="create-event-form" onSubmit={handleSubmit}>
        {formFields.map(({ component: Component, ...formField }) => (
          <Component
            key={formField.key}
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

{
  /* <div className="group-input">
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

        <AddressLookupInput formData={formData} setFormData={setFormData} />

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
                attendees: { ...attendees, minimum: event.target.value },
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
                attendees: { ...attendees, maximum: event.target.value },
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
        </div> */
}
