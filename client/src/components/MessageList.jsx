import React, { useEffect, useRef, useState } from "react";

const Messages = () => {
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const [storedMessages, setstoredMessages] = useState([]);
  // const clientId = React.useRef(Date.now());
  const socketRef = useRef(null);
  useEffect(() => {
    messageArray.length !== 0
      ? localStorage.setItem("messages", JSON.stringify(messageArray))
      : [];
  }, [messageArray]);

  useEffect(() => {
    setstoredMessages(localStorage.getItem("messages"));

    if (storedMessages) {
      setMessageArray(storedMessages);
    }
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log(" Client Connected to the server");
    };
    socket.onerror = (err) => {
      console.error("Socket error: ", err);
    };

    socket.onmessage = (event) => {
      try {
        const message = event.data;
        setMessageArray((prev) => [...prev, message]);
      } catch (err) {
        console.error(err);
        return;
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from the server");
    };

    // The following is the clean up function for websocket connection.
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
        console.log("WebSocket connection closed (cleanup function)");
      }
    };
  }, []);

  const handleMessages = (e) => {
    e.preventDefault();

    socketRef.current.send(message);
    setMessage("");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between bg-gray-100">
      {/* Chat Header */}
      <div className="bg-blue-600 h-12  text-white text-center py-4 text-xl font-semibold">
        Chat Application
      </div>

      {/* Messages Section */}
      <div className="flex-auto overflow-y-auto mb-3 space-y-12  p-8 ">
        {messageArray.length !== 0 ? (
          messageArray.map((message, index) => (
            <div
              key={index}
              className={`flex  bg-orange-500 h-auto ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* The following is the message box div*/}
              <div
                className={` rounded-lg shadow-md  ${
                  index % 2 === 0
                    ? "bg-blue-500 text-white"
                    : "bg-green-500 text-white"
                } max-w-screen max-h-12 h-auto px-3.5 `}
              >
                {message}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center 0 text-gray-500 ">No messages yet</div>
        )}
      </div>

      {/* Input Section */}
      <div className="bg-gray-200 p-4 ">
        <form className="flex items-center space-x-4" onSubmit={handleMessages}>
          <input
            type="text"
            className="flex-1 w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 w-16 text-white px-6 p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
