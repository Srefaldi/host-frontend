import React from "react";
import Navbar from "../../components/LoginPage/Login Guru/NavbarGuru";
import Sidebar from "../../components/LoginPage/Sidebar";
import Footer from "../../components/Landing/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 w-full p-2 mx-auto bg-white sm:p-4 md:p-6 max-w-7xl">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
