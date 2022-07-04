import React from "react";
import NavbarBottom from "../components/NavbarBottom";

import "./styles/CreateEventPage.css";

const CreateEventPage = () => {

  // const [formData, setFormData] = useState({
  //   title: "",
  //   location: "",
  //   date: "",
  //   startAt: "",
  //   endAt: "",
  //   min: 0,
  //   max: 0,
  //   price: "",
  //   category: "",
  //   description: "",
  //   requireApproval: false
  // });

  // const navigate = useNavigate();

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // Create the event
  //   try {
  //     axios({
  //       method: "POST",
  //       url: "https://the-evently-api.herokuapp.com/events",
  //       data: { ...formData },
  //     }).then((response) => {
  //       console.log("response.data", response.data);
  //       navigate("/");
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
  return (
    <div>
      <h1>CreateEventPage</h1>
      <form className="create-event-form">
        <div>
          <label htmlFor="">Title: </label>
          <input type="text" name="" id="" />
        </div>
        <div>
          <label htmlFor="">Location: </label>
          <input type="text" name="" id="" />
        </div>
        <div>
          <label htmlFor="">Date & time: </label>
          <input type="datetime-local" name="startAt" id="" />
          <input type="datetime-local" name="endAt" id="" />
        </div>
        <div>
          <label htmlFor="">Attendees: </label>
          <input type="number" name="min" id="" placeholder="Min" />
          <input type="number" name="max" id="" placeholder="Max" />
        </div>
        <div>
          <label htmlFor="">Price: </label>
          <input type="number" name="price" id="" />
        </div>
        <div>
          <label htmlFor="">Category: </label>
          <select name="category" id="category">
            <option value="">--Please choose an option--</option>
            <option value="dog">Dog</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Description: </label>
          <textarea name="" id="" />
        </div>
        <div>
          <input type="checkbox" name="requireApproval" id="" />
          <label htmlFor="">Require approval: </label>
        </div>
        <input type="submit" name="" id="" />
      </form>
      <NavbarBottom />
    </div>
  );
};

export default CreateEventPage;
