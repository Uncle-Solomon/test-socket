import { useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

let test_chat_id = "65330ca62ad922f00d60230e";

let test_user = {
  _id: "653158de9477b63ff8d8a640",
  email: "adminTest@gmail.com",
  phoneNumber: "+2348012345677",
};

let test_recipient = "6532d7bce24a3c382552d86d";

let test_text = "Hello from frontend";

function App() {
  const [message, setMessage] = useState("");
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

  const handleGetChatbyId = (e: any) => {
    e.preventDefault();
    socket.emit("getChatById", test_chat_id);
    socket.on("getChatByIdSuccess", (chatMessages) => {
      console.log("Received chat messages:", chatMessages);
    });

    socket.on("getChatByIdError", (error) => {
      console.error("Error while getting chat:", error);
    });
  };
  const handleGetAllChats = (e: any) => {
    e.preventDefault();
    socket.emit("getAllChats", test_user);
    socket.on("getAllChatsSuccess", (chats) => {
      console.log("Received chat messages:", chats);
    });

    socket.on("getAllChatsError", (error) => {
      console.error("Error while getting chat:", error);
    });
  };

  const handleDeleteChat = (e: any) => {
    e.preventDefault();
    socket.emit("deleteChatById", test_chat_id);
    socket.on("deleteChatByIdSuccess", () => {
      console.log("Chat deleted successfully");
    });

    socket.on("deleteChatByIdError", (error) => {
      console.error("Error while sending message:", error);
    });
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    socket.emit("sendMessage", test_user, test_recipient, message);
    socket.on("sendMessageSuccess", (chats) => {
      console.log("Sent chat messages:", chats);
    });

    socket.on("sendMessageError", (error) => {
      console.error("Error while sending message:", error);
    });
  };
  return (
    <>
      <div>
        <form>
          <button
            onClick={handleGetChatbyId}
            className="p-2 bg-green-700/60 text-white block my-8 text-lg "
          >
            Get Chat By ID
          </button>

          <button
            onClick={handleGetAllChats}
            className="p-2 bg-green-700/60 text-white block my-8 text-lg "
          >
            Get All User Chats
          </button>
          <button
            onClick={handleDeleteChat}
            className="p-2 bg-green-700/60 text-white block my-8 text-lg "
          >
            Delete Chat By ID
          </button>

          <input
            type="text"
            placeholder="message"
            className="p-4 block my-8 text-lg border border-1 border-red-200"
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handleSendMessage}
            className="p-2 bg-green-700/60 text-white block my-8 text-lg "
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
