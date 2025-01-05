import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Employee Management System</h1>
      <Link
        to="/"
        className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition"
      >
        Dashboard
      </Link>
    </header>
  );
};

export default Header;
