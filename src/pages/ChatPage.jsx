import React from "react";
import NavbarBottom from "../components/NavbarBottom";
import MessagesBox from "../components/MessagesBox";
import ChatBar from "../components/ChatBar";
import ChatInput from "../components/ChatInput";

const ChatPage = () => {
  return (
    <div>
      <ChatBar />

      <h1>ChatPage</h1>
      <MessagesBox />
      <ChatInput />
      <NavbarBottom />
    </div>
  );
};

export default ChatPage;
