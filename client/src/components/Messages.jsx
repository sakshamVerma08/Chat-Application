import React, { useState } from "react";

const Messages = () => {
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="w-screen h-screen  flex flex-col justify-between">
        <div id="mainInterface" className="h-12/4 w-full bg-slate-600 "></div>

        <div
          id="inputMessage"
          className=" bg-green-500 h-1/4 w-full flex justify-around items-center border-2"
        >
          <input
            type="text"
            className="bg-red-400 rounded-md py-10 h-3/4 
             w-3/4 mx-5"
            placeholder="Message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Messages;
