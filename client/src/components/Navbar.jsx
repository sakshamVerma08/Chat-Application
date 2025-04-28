import React from "react";
import { Link } from "react-router";
const Navbar = () => {
  return (
    <>
      <div
        id="navigation"
        className="h-20 w-full bg-red-400 flex justify-between items-center px-10 py-2"
      >
        <div id="logoContainer" className="h-full">
          {" "}
          <Link to="/">
            <img
              className="object-cover h-full w-full"
              src="https://plus.unsplash.com/premium_photo-1721922862292-d65035278faa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="logo"
            />
          </Link>
        </div>

        <div
          id="rightDiv"
          className="flex justify-between items-center h-full w-1/4 bg-blue-200"
        >
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/help">Help</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
