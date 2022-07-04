import React from "react";
import Message from "./Message";

import "./styles/MessagesBox.css";

const MessagesBox = () => {
  return (
    <div className="messages">
      <div className="left">
        <Message />
      </div>
      <div className="right">
        <Message />
      </div>
    </div>
  );
};

export default MessagesBox;
