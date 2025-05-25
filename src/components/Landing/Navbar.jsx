import React, { useState } from "react";
import { Link } from "react-router-dom";
import iconHamburger from "../../assets/img/icon-hamburger.svg";
import iconClose from "../../assets/img/icon-close.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="text-gray-700 border-b border-gray-200 body-font">
      <div className="container flex flex-col flex-wrap items-center justify-between p-4 mx-auto md:flex-row">
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
            className="inline-flex items-center px-3 py-1 text-base border-0 rounded md:hidden focus:outline-none hover:bg-opacity-80"
            onClick={toggleMenu}
          >
            <img
              src={isMenuOpen ? iconClose : iconHamburger}
              className="hamburger"
              alt="Menu"
            />
          </button>
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } absolute top-16 right-0 bg-white shadow-lg rounded-lg md:flex md:static md:bg-transparent md:shadow-none`}
          >
            <button className="inline flex items-center border border-[#68217A] py-1 px-3 focus:outline-none rounded text-base text-black hover:bg-[#68217A] hover:text-white mx-2">
              <Link to="/daftar-siswa" className="text-black">
                DAFTAR
              </Link>
            </button>
            <button
              className="inline-flex items-center px-3 py-1 mx-2 text-base border-0 rounded focus:outline-none hover:bg-opacity-80"
              style={{ backgroundColor: "#68217A" }}
            >
              <Link to="/login" className="text-white hover:text-gray-200">
                MASUK
              </Link>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
