import React from "react";
import NavbarBottom from "../components/NavbarBottom";
import Messages from "../components/Messages";
import ChatNavbar from "../components/ChatNavbar";
import ChatInput from "../components/ChatInput";

const ChatPage = () => {
  return (
    <div>
      <ChatNavbar />

      <h1>ChatPage</h1>
      <Messages />
      <ChatInput />
      <NavbarBottom />
    </div>
  );
};

export default ChatPage;
