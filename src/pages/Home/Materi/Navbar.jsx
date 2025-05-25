import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import iconHamburger from "../../../assets/img/icon-hamburger.svg";
import iconClose from "../../../assets/img/icon-close.svg";
import { IoLogOut } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, reset } from "../../../features/authSlice";
import userAvatar from "../../../assets/img/user.png";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 z-10 w-full text-gray-700 bg-white border-b border-gray-200 body-font">
      <div className="container flex flex-col flex-wrap items-center justify-between p-2 mx-auto sm:p-4 md:flex-row">
        <a
          className="flex items-center font-medium text-gray-900 title-font md:mb-0"
          href="/"
        >
          <span className="ml-3 text-xl">
            <span className="font-bold" style={{ color: "#68217A" }}>
              SHARP
            </span>{" "}
            LEARN
          </span>
        </a>

        <div className="flex items-center md:ml-auto">
          <button
            className="inline-flex items-center p-1 text-base border-0 rounded md:hidden sm:p-2 focus:outline-none hover:bg-opacity-80"
            onClick={toggleMenu}
          >
            <img
              src={isMenuOpen ? iconClose : iconHamburger}
              className="hamburger"
              alt="Menu"
            />
          </button>
          <div
            className={`${isMenuOpen ? "flex" : "hidden"} absolute top-16 ${
              isMenuOpen ? "left-0 w-full" : ""
            } sm:w-auto sm:static bg-white shadow-lg rounded-lg md:flex md:bg-transparent md:shadow-none`}
          >
            <div className="hidden w-full md:block md:w-auto">
              <ul className="flex flex-col p-2 mt-2 font-medium border border-gray-100 rounded-lg sm:p-4 md:p-0 bg-gray-50 md:space-x-6 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center justify-between w-full px-2 py-1 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  >
                    <img
                      src={userAvatar}
                      alt="User "
                      className="w-6 h-6 mr-1 rounded-full sm:w-7 sm:h-7 sm:mr-2"
                    />
                    {user ? user.name : "User "}
                    <svg
                      className="w-3 h-3 ml-1"
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-36 sm:w-44 dark:bg-gray-700 dark:divide-gray-600">
                      <ul className="py-1 text-xs text-gray-700 sm:text-sm dark:text-gray-400">
                        <li>
                          <Link
                            to="/dashboard"
                            className="block px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Dashboard
                          </Link>
                        </li>
                      </ul>
                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center block px-3 py-1 text-xs text-gray-700 sm:text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          <IoLogOut className="mr-1 sm:mr-2" /> Log out
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
