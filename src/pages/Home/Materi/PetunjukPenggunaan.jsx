import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Landing/NavbarLogin/NavbarLogin";
import Footer from "../../../components/Landing/Footer";
import { getMe, reset } from "../../../features/authSlice";
import backIcon from "../../../assets/img/kembali.png";

const PetunjukPenggunaan = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [activeSection, setActiveSection] = useState("Petunjuk Halaman Awal");
  const [hoveredSection, setHoveredSection] = useState(null); // State untuk melacak tombol yang di-hover
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, user, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    console.log("Auth state:", { isLoading, isError, user, message });
    if (!isLoggedOut) {
      dispatch(getMe());
    }
  }, [dispatch, isLoggedOut]);

  useEffect(() => {
    if (isError && message === "Mohon login ke akun anda" && !isLoggedOut) {
      dispatch(reset());
      navigate("/login");
    }
  }, [isError, message, dispatch, navigate, isLoggedOut]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!user && !isLoggedOut && !isError) {
    console.log("PetunjukPenggunaan tidak dirender: menunggu getMe selesai");
    return null;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "Petunjuk Halaman Awal":
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Halaman Beranda
            </h2>
            <p className="mb-6 text-base text-gray-600 leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae
              natus, accusantium libero distinctio numquam provident mollitia
              explicabo ipsum velit praesentium fugit labore? Et nesciunt
              suscipit aspernatur reiciendis excepturi a adipisci!
            </p>
            <p className="mb-6 italic text-sm text-gray-500">
              Lihat gambar berikut!
            </p>
            <div className="bg-gradient-to-r from-[#b7c8ff] to-[#d9e2ff] rounded-lg p-4 flex items-center justify-between max-w-full mb-12 shadow-sm">
              <div className="flex items-center gap-3">
                <img
                  alt="NumLess logo icon with letter N in blue and purple"
                  className="w-8 h-8 rounded-full"
                  height="32"
                  src="https://storage.googleapis.com/a1aa/image/4efecb72-3335-457d-bf91-012d552b6eb7.jpg"
                  width="32"
                />
                <span className="font-bold text-sm text-[#6E2A7F] select-none">
                  NumLess
                </span>
              </div>
              <div className="flex gap-2 text-sm font-medium text-[#1a2ea0]">
                {["Beranda", "Fitur", "Login", "Halaman Dosen"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className="border-2 border-[#6E2A7F] rounded-lg px-3 py-1 flex flex-col items-center relative transition-all duration-200 hover:bg-[#6E2A7F]/10"
                    >
                      <span className="absolute -top-3 -left-3 bg-[#6E2A7F] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold select-none">
                        {index + 1}
                      </span>
                      {item}
                      {index === 0 && (
                        <span className="text-[#6E2A7F] text-[10px]">•</span>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        );
      case "Petunjuk Login":
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Petunjuk Login
            </h2>
            <p className="mb-6 text-base text-gray-600 leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae
              natus, accusantium libero distinctio numquam provident mollitia
              explicabo ipsum velit praesentium fugit labore? Et nesciunt
              suscipit aspernatur reiciendis excepturi a adipisci!
            </p>
          </>
        );
      case "Petunjuk Buat Akun":
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Petunjuk Buat Akun
            </h2>
            <p className="mb-6 text-base text-gray-600 leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae
              natus, accusantium libero distinctio numquam provident mollitia
              explicabo ipsum velit praesentium fugit labore? Et nesciunt
              suscipit aspernatur reiciendis excepturi a adipisci!
            </p>
          </>
        );
      case "Petunjuk Home":
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Petunjuk Home
            </h2>
            <p className="mb-6 text-base text-gray-600 leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae
              natus, accusantium libero distinctio numquam provident mollitia
              explicabo ipsum velit praesentium fugit labore? Et nesciunt
              suscipit aspernatur reiciendis excepturi a adipisci!
            </p>
          </>
        );
      case "Petunjuk Informasi":
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Petunjuk Informasi
            </h2>
            <p className="mb-6 text-base text-gray-600 leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae
              natus, accusantium libero distinctio numquam provident mollitia
              explicabo ipsum velit praesentium fugit labore? Et nesciunt
              suscipit aspernaturasi!
            </p>
          </>
        );
      case "Petunjuk Halaman Materi":
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Halaman Materi
            </h2>
            <p className="mb-6 text-base text-gray-600 leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae
              natus, accusantium libero distinctio numquam!
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar setIsLoggedOut={setIsLoggedOut} />
      <main className="flex flex-col md:flex-row p-4 md:p-6 gap-8 max-w-full mx-auto flex-grow mt-20">
        <nav className="flex flex-col gap-6 w-[256px] bg-white rounded-xl p-6 shadow-lg flex-shrink-0">
          {[
            "Petunjuk Halaman Awal",
            "Petunjuk Login",
            "Petunjuk Buat Akun",
            "Petunjuk Home",
            "Petunjuk Informasi",
            "Petunjuk Halaman Materi",
          ].map((section) => (
            <button
              key={section}
              className={`rounded-lg py-3 px-4 text-center font-medium text-sm transition-all duration-200 ${
                activeSection === section
                  ? "bg-[#6E2A7F] text-white shadow-md"
                  : "bg-[#e3e7f9] text-gray-800"
              }`}
              style={{
                backgroundColor:
                  activeSection === section
                    ? "#6E2A7F"
                    : hoveredSection === section
                    ? "#FFFFFF"
                    : "#e3e7f9",
                color:
                  activeSection === section
                    ? "#FFFFFF"
                    : hoveredSection === section
                    ? "#000000"
                    : "#1F2937",
                transition: "background-color 0.2s, color 0.2s",
              }}
              type="button"
              onClick={() => setActiveSection(section)}
              onMouseEnter={() => setHoveredSection(section)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {section}
            </button>
          ))}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center mb-2 text-sm text-white bg-gray-600 rounded-lg sm:text-base hover:bg-gray-700"
            style={{
              width: "160px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              paddingLeft: "5px", // Mengimbangi ikon agar teks terpusat
            }}
          >
            <img src={backIcon} alt="Kembali" className="w-5 h-5 mr-2" />
            Kembali
          </button>
        </nav>
        <section className="bg-white rounded-xl p-6 md:p-6 flex-1 max-h-[800px] overflow-y-auto shadow-lg border border-gray-100 rounded-xl duration-200 max-w-full">
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default PetunjukPenggunaan;
