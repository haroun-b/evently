import React from "react";

import "./styles/Message.css";

const Message = () => {
  return (
    <div className="message">
      <div className="author">
        <h4>Author</h4>
      </div>
      <div className="core-message">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className="time">Time</div>
    </div>
  );
};

export default Message;
