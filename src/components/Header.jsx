import React from "react";
import { NavLink, Link } from "react-router-dom";
import WaitingLogo from "../assets/logo.svg";
import { useAuthContext } from "../hooks/useAuthContext";

const Header = () => {
  const { user } = useAuthContext();

  const styles = `text-purple-500`;

  const setActive = ({ isActive }) => {
    return isActive ? styles : null;
  };

  return (
    <header>
      <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-700 bg-white">
        <div>
          <Link to="/">
            <img src={WaitingLogo} />
          </Link>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="menu-button"
          className="h-6 w-6 cursor-pointer md:hidden block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>

        <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
          <ul className="pt-4 text-base text-gray-700 md:flex md:justify-between md:pt-0">
            <li>
              <NavLink className={`${setActive} md:p-4 py-2 block hover:text-purple-400`} to="login">
                Login
              </NavLink>
            </li>
            {user.user && (
              <li>
                <NavLink className="md:p-4 py-2 block hover:text-purple-400" to="dashboard">
                  Dashboard
                </NavLink>
              </li>
            )}
            <li>
              <NavLink className={`md:p-4 py-2 block hover:text-purple-400 ${setActive}`} to="all-articles">
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink className={`md:p-4 py-2 block hover:text-purple-400 ${setActive}`} to="#">
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
