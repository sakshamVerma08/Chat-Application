import React, { useEffect, useState } from "react";
import MessageCards from "./MessageCards.jsx";
const Messages = () => {
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);

  useEffect(() => {
    messageArray.length != 0
      ? localStorage.setItem("messages", JSON.stringify(messageArray))
      : [];
  }, [messageArray]);

  const handleMessages = (e) => {
    e.preventDefault();

    const message = e.target.firstElementChild.value;
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Connected to the server");
      socket.send(message);
      setMessageArray((prev) => [...prev, message]);
    };

    socket.onmessage = (e) => {
      const data = e.data;
      console.log("Message received from server");
      console.log(data);
      setMessageArray((prev) => [...prev, data]);
    };

    socket.onclose = () => {
      console.log("Disconnected from the server");
    };
    setMessage("");
  };

  return (
    <>
      <div className="w-screen h-screen  flex flex-col justify-between">
        <div id="mainInterface" className="h-12/4  bg-slate-400 w-full">
          {messageArray.length != 0 ? (
            messageArray.map((message, index) => {
              return <MessageCards key={index} message={message} />;
            })
          ) : localStorage.getItem("messages") ? (
            JSON.parse(localStorage.getItem("messages")).map(
              (message, index) => {
                return <MessageCards key={index} message={message} />;
              }
            )
          ) : (
            <div className="flex w-full h-1/4 border-2 bg-red-500 text-black font-semibold">
              No messages yet
            </div>
          )}
        </div>

        <div
          id="inputMessage"
          className="bg-slate-300 h-1/4 w-full flex justify-around items-center"
        >
          <form
            action="submit"
            className=" h-3/4 w-2/3 rounded-xl"
            onSubmit={handleMessages}
          >
            <input
              type="text"
              className="p-4 gap-2 h-12 w-full bg-gray-400 rounded-xl text-black"
              placeholder="Message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Messages;
