import React from "react";

const MessageCards = (props) => {
  return (
    <div className="flex w-1/3 h-auto border-2 bg-red-500 text-black font-semibold">
      {props.message}
    </div>
  );
};

export default MessageCards;
