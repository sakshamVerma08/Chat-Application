import React, { useState } from "react";

const Messages = () => {
  const [message, setMessage] = useState("");

  const handleMessages = (e) => {
    e.preventDefault();

    const message = e.target.firstElementChild.value;
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = ()=>{
      console.log("Connected to the server");
    }
    socket.
    setMessage("");
  };

  return (
    <>
      <div className="w-screen h-screen  flex flex-col justify-between">
        <div id="mainInterface" className="h-12/4 w-full bg-slate-600 "></div>

        <div
          id="inputMessage"
          className="bg-amber-400 h-1/4 w-full flex justify-around items-center"
        >
          <form
            action="submit"
            className="bg-red-400 h-3/4 w-2/3 rounded-xl"
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
