import React, { useEffect, useState } from "react";

const Messages = () => {
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const clientId = React.useRef(Date.now());

  useEffect(() => {
    messageArray.length !== 0
      ? localStorage.setItem("messages", JSON.stringify(messageArray))
      : [];
  }, [messageArray]);

  const handleMessages = (e) => {
    e.preventDefault();

    if (message.trim() === "") return;

    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      const messageObject = { clientId: clientId.current, text: message };
      socket.send(JSON.stringify(messageObject));
    };

    socket.onmessage = (e) => {
      try {
        const parsedMessage = JSON.parse(e.data);

        if (parsedMessage.clientId && parsedMessage.text) {
          console.localStorage(
            "Received message from client: ",
            parsedMessage.text
          );
        }

        WebAssembly.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            try {
              client.send(JSO.stringify(parsedMessage));
            } catch (err) {
              console.error("Error sending message to client:", err.message);
            }
          } else {
            console.error("Can't send message to Disconnected Client", err);
          }
        });
      } catch (err) {
        console.error("Error parsing message:", err.message);
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from the server");
    };

    setMessageArray((prev) => [...prev, message]);
    setMessage("");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between bg-gray-100">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white text-center py-4 text-xl font-semibold">
        Chat Application
      </div>

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messageArray.length !== 0 ? (
          messageArray.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`p-3 rounded-lg shadow-md ${
                  index % 2 === 0
                    ? "bg-blue-500 text-white"
                    : "bg-green-500 text-white"
                } max-w-xs`}
              >
                {message}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No messages yet</div>
        )}
      </div>

      {/* Input Section */}
      <div className="bg-gray-200 p-4">
        <form className="flex items-center space-x-4" onSubmit={handleMessages}>
          <input
            type="text"
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
