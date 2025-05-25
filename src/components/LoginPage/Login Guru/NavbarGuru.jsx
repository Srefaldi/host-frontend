import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import iconHamburger from "../../../assets/img/icon-hamburger.svg";
import iconClose from "../../../assets/img/icon-close.svg";
import { IoLogOut } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, reset } from "../../../features/authSlice";
import userAvatar from "../../../assets/img/user.png";
import Swal from "sweetalert2"; // Impor SweetAlert2

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      icon: "success", // Ubah ke "success" agar lebih sesuai dengan logout
      title: "Logout Berhasil",
      text: "Anda telah keluar dari sistem.",
      showConfirmButton: true,
    }).then(() => {
      dispatch(LogOut());
      dispatch(reset());
      navigate("/"); // Navigasi ke login setelah konfirmasi
    });
  };

  return (
    <header className="fixed top-0 left-0 z-10 w-full text-gray-700 bg-white border-b border-gray-200">
      <div className="container flex flex-col flex-wrap items-center justify-between p-4 mx-auto md:flex-row">
        <div className="flex items-center justify-between w-full md:w-auto">
          <a
            className="flex items-center font-medium text-gray-900 title-font"
            href="/"
          >
            <span className="ml-2 text-lg sm:text-xl">
              <span className="font-bold" style={{ color: "#68217A" }}>
                SHARP
              </span>{" "}
              LEARN
            </span>
          </a>
          <button
            className="inline-flex items-center p-2 text-base border-0 rounded md:hidden focus:outline-none hover:bg-gray-100"
            onClick={toggleMenu}
          >
            <img
              src={isMenuOpen ? iconClose : iconHamburger}
              className="w-6 h-6"
              alt="Menu"
            />
          </button>
        </div>

        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } w-full flex-col mt-4 md:flex md:flex-row md:w-auto md:mt-0 md:items-center md:ml-auto`}
        >
          <ul className="flex flex-col w-full font-medium md:flex-row md:space-x-6 md:w-auto">
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full px-2 py-1 text-sm text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto sm:text-base"
              >
                <img
                  src={userAvatar}
                  alt="User"
                  className="w-6 h-6 mr-2 rounded-full sm:w-7 sm:h-7"
                />
                {user ? user.name : "User"}
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
                <div className="absolute right-0 z-10 mt-2 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-36 sm:w-44">
                  <ul className="py-1 text-xs text-gray-700 sm:text-sm">
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-3 py-1 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 sm:text-sm"
                    >
                      <IoLogOut className="mr-1" /> Log out
                    </button>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
