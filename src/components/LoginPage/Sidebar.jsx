import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoPerson,
  IoPricetag,
  IoHome,
  IoLogOut,
  IoSettings,
  IoSchool,
  IoPeople,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const setSidebarHeight = () => {
      const sidebar = document.querySelector(".sidebar");
      if (sidebar) {
        sidebar.style.height = `${document.documentElement.scrollHeight}px`;
      }
    };

    setSidebarHeight();
    window.addEventListener("resize", setSidebarHeight);
    return () => window.removeEventListener("resize", setSidebarHeight);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed z-50 w-10 p-2 text-white transition-shadow duration-200 rounded-lg shadow-md md:hidden top-4 left-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <IoClose className="text-xl sm:text-2xl" />
        ) : (
          <IoMenu className="text-xl sm:text-2xl" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar fixed md:static top-0 left-0 w-56 sm:w-64 bg-white pt-6 pb-10 px-3 sm:px-4 transform border-r border-gray-200 ${
          isOpen ? "translate-x-0 h-screen z-40" : "-translate-x-full z-10"
        } md:translate-x-0 md:z-10 transition-transform duration-300 flex flex-col`}
        style={{ marginTop: window.innerWidth >= 768 ? "90px" : "0" }}
      >
        <h2 className="mb-4 text-2xl font-bold text-center text-transparent sm:text-3xl bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
          DAFTAR MENU
        </h2>
        <nav className="flex flex-col flex-1 gap-3 mt-4 sm:gap-4 sm:mt-6">
          <NavLink
            to="/dashboard-guru"
            className={({ isActive }) =>
              `flex items-center px-3 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl font-medium text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
                isActive ? "bg-gradient-to-r from-purple-100 to-blue-100" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <IoHome className="mr-2 text-xl text-gray-600 sm:text-2xl" />
            Dashboard
          </NavLink>
          {user && user.role === "admin" && (
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `flex items-center px-3 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl font-medium text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
                  isActive ? "bg-gradient-to-r from-purple-100 to-blue-100" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <IoPeople className="mr-2 text-xl text-gray-600 sm:text-2xl" />
              Data Siswa
            </NavLink>
          )}
          {user && user.role === "admin" && (
            <NavLink
              to="/progres-belajar"
              className={({ isActive }) =>
                `flex items-center px-3 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl font-medium text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
                  isActive ? "bg-gradient-to-r from-purple-100 to-blue-100" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <IoSchool className="mr-2 text-xl text-gray-600 sm:text-2xl" />
              Progres Belajar
            </NavLink>
          )}
          {user && user.role === "admin" && (
            <NavLink
              to="/data-nilai"
              className={({ isActive }) =>
                `flex items-center px-3 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl font-medium text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
                  isActive ? "bg-gradient-to-r from-purple-100 to-blue-100" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <IoPerson className="mr-2 text-xl text-gray-600 sm:text-2xl" />
              Data Nilai
            </NavLink>
          )}
          {user && user.role === "admin" && (
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `flex items-center px-3 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl font-medium text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
                  isActive ? "bg-gradient-to-r from-purple-100 to-blue-100" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <IoPricetag className="mr-2 text-xl text-gray-600 sm:text-2xl" />
              Data Kuis
            </NavLink>
          )}
          {user && user.role === "admin" && (
            <NavLink
              to="/pengaturan"
              className={({ isActive }) =>
                `flex items-center px-3 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl font-medium text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
                  isActive ? "bg-gradient-to-r from-purple-100 to-blue-100" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <IoSettings className="mr-2 text-xl text-gray-600 sm:text-2xl" />
              Pengaturan KKM
            </NavLink>
          )}
          <button
            onClick={logout}
            className="flex items-center px-3 py-1 text-lg font-medium text-gray-800 transition-colors duration-200 rounded-lg sm:px-4 sm:py-2 sm:text-xl hover:bg-gray-100"
          >
            <IoLogOut className="mr-2 text-xl text-gray-600 sm:text-2xl" />
            Logout
          </button>
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
