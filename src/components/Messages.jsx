import React from "react";
import Message from "../components/Message";

import "./styles/Messages.css";

const Messages = () => {
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

export default Messages;
