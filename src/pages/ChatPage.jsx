import React from "react";
import NavbarBottom from "../components/NavbarBottom";
import Messages from "../components/Messages";
import ChatBar from "../components/ChatBar";
import ChatInput from "../components/ChatInput";

const ChatPage = () => {
  return (
    <div>
      <ChatBar />

      <h1>ChatPage</h1>
      <Messages />
      <ChatInput />
      <NavbarBottom />
    </div>
  );
};

export default ChatPage;
