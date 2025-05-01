import React from "react";

const Message = (props) => {
  return (
    <div className="flex w-1/3 h-auto border-2 bg-red-500 text-white font-semibold">
      {props.message}
    </div>
  );
};

export default Message;
