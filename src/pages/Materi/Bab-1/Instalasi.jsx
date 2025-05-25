import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
const InstalasiSetup = () => {
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab1/pengenalan");
  };

  const handleNext = () => {
    handleLessonComplete("/materi/bab1/instalasi");
    window.scrollTo(0, 0);
    navigate("/materi/bab1/struktur-kode");
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">
        Instalasi Setup .NET dan Visual Studio Code
      </h2>

      {/* Tombol Navigasi */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
        >
          <img src={backIcon} alt="Kembali" className="w-5 h-5 mr-2" />
          Kembali
        </button>
        <button
          onClick={handleNext}
          className="flex items-center justify-between"
          style={{
            backgroundColor: "#6E2A7F",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#5B1F6A")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#6E2A7F")
          }
        >
          <span>Selanjutnya</span>
          <img src={nextIcon} alt="Selanjutnya" className="w-5 h-5 ml-2" />{" "}
          {/* Ikon di pojok kanan */}
        </button>
      </div>
    </div>
  );
};

export default InstalasiSetup;
