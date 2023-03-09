import React from "react";
import { NavLink } from "react-router-dom";

const DashboardNav = () => {
  return (
    <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-700 bg-white">
      <ul>
        <NavLink to="dashboard">Dashboard</NavLink>
        <NavLink to="dashboard">My Posts</NavLink>
      </ul>
    </nav>
  );
};

export default DashboardNav;
