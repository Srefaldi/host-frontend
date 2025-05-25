import React, { useState } from "react";
import { Link } from "react-router-dom";
const InfoModal = ({ isOpen, toggleModal }) => {
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [isDaftarPustakaOpen, setIsDaftarPustakaOpen] = useState(false);
  const [isAtribusiOpen, setIsAtribusiOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      id="timeline-modal"
      className="fixed top-0 left-0 right-0 z-50 items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-3xl p-4 mx-auto">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 max-h-[80vh] overflow-y-auto">
          {" "}
          {/* Tambahkan max-h dan overflow-y-auto */}
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 text-center border-b border-gray-200 rounded-t md:p-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              INFORMASI
            </h3>
            <button
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5">
            {/* Sub-dropdown: Informasi Media */}
            <div className="mb-4">
              <button
                onClick={() => setIsMediaOpen(!isMediaOpen)}
                className="flex items-center justify-between w-full font-semibold text-left text-gray-900 dark:text-white"
              >
                <span>Informasi Media</span>
                <span>{isMediaOpen ? "▼" : "▲"}</span>
              </button>
              {isMediaOpen && (
                <div className="p-2 mt-2 border border-gray-200 rounded-md">
                  <p className="mt-2 font-bold text-center">PERIHAL</p>
                  <p className="mt-2 text-center">
                    Media pembelajaran ini dibuat untuk memenuhi persyaratan
                    dalam menyelesaikan program Strata-1 Pendidikan Komputer
                    dengan judul:
                  </p>
                  <p className="mt-2 font-bold text-center">
                    PENGEMBANGAN MEDIA PEMBELAJARAN INTERAKTIF BERBASIS WEB PADA
                    MATERI DASAR-DASAR PEMROGRAMAN C# DENGAN METODE TUTORIAL
                  </p>
                  <ul className="mt-3 list-disc list-inside">
                    <li>
                      <strong>Nama:</strong> Sopia Refaldi
                    </li>
                    <li>
                      <strong>Email:</strong> sopiarefaldii@gmail.com
                    </li>
                    <li>
                      <strong>Program Studi:</strong> S-1 Pendidikan Komputer
                    </li>

                    <li>
                      <strong>Dosen Pembimbing 1:</strong> Dr. R. Ati Sukmawati,
                      M.Kom
                    </li>
                    <li>
                      <strong>Dosen Pembimbing 2:</strong> Muhammad Hifdzi
                      Adini, S.Kom., M.T
                    </li>
                    <li>
                      <strong>Fakultas:</strong> Fakultas Keguruan dan Ilmu
                      Pendidikan (FKIP)
                    </li>
                    <li>
                      <strong>Instansi:</strong> Universitas Lambung Mangkurat
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Sub-dropdown: Informasi Daftar Pustaka */}
            <div className="mb-4">
              <button
                onClick={() => setIsDaftarPustakaOpen(!isDaftarPustakaOpen)}
                className="flex items-center justify-between w-full font-semibold text-left text-gray-900 dark:text-white"
              >
                <span>Informasi Daftar Pustaka</span>
                <span>{isDaftarPustakaOpen ? "▼" : "▲"}</span>
              </button>
              {isDaftarPustakaOpen && (
                <div className="p-2 mt-2 border border-gray-200 rounded-md">
                  <p>Daftar pustaka yang digunakan dalam media ini:</p>
                  <ul className="mt-2 list-disc list-inside">
                    <li>Referensi 1: </li>
                    <li>Referensi 2: </li>
                    <li>Referensi 3: </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Sub-dropdown: Atribusi dan Petunjuk Penggunaan */}
            <div className="mb-4">
              <button
                onClick={() => setIsAtribusiOpen(!isAtribusiOpen)}
                className="flex items-center justify-between w-full font-semibold text-left text-gray-900 dark:text-white"
              >
                <span>Petunjuk Penggunaan</span>
                <span>{isAtribusiOpen ? "▼" : "▲"}</span>
              </button>
              {isAtribusiOpen && (
                <div className="p-2 mt-2 border border-gray-200 rounded-md">
                  <p>Petunjuk penggunaan media :</p>
                  <ul className="mt-2 list-disc list-inside">
                    <li>1.</li>
                    <li>2.</li>
                    <li>3.</li>
                  </ul>
                </div>
              )}
            </div>

            <button
              style={{
                backgroundColor: "#6E2A7F",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                width: "100%",
                display: "inline-flex",
                justifyContent: "center",
                fontWeight: "500",
                fontSize: "0.875rem",
                textAlign: "center",
                transition: "background-color 0.2s, ring-color 0.2s",
                outline: "none",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#5B1F6A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#6E2A7F")
              }
            >
              <Link
                to="/login"
                style={{ color: "white", textDecoration: "none" }}
              >
                Mulai Belajar
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
