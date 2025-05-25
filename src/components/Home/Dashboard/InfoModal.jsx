import React, { useState } from "react";
import { Link } from "react-router-dom";
import Kunci from "../../../assets/img/lock.png"; // Pastikan path ini sesuai dengan lokasi ikon kunci Anda

const InfoModal = ({ isOpen, toggleModal }) => {
  const daftarMateri = [
    {
      bab: "BAB 1",
      judul: "PENDAHULUAN",
      subMateri: [
        "Pengenalan C#",
        "Instalasi C#",
        "Struktur Kode Pemrograman C#",
        "Struktur Eksekusi Kode",
        "Sintaks Print",
        "Sintaks Komentar",
        "Error Pada C#",
      ],
    },
    {
      bab: "BAB 2",
      judul: "VARIABEL",
      subMateri: [
        "Pengertian Variabel",
        "Penamaan Variabel",
        "Kategori Variabel",
        "Deklarasi dan Inialisasi Variabel",
        "Deklarasi Banyak Variabel",
        "Variabel Konstanta",
        "Sintaks Input",
      ],
    },
    {
      bab: "BAB 3",
      judul: "TIPE DATA",
      subMateri: [
        "Pengertian Tipe Data",
        "Klasifikasi Tipe Data",
        "Tipe Data Dasar",
        "1. Integer",
        "2. Floating-point",
        "3. Boolean",
        "4. Char",
        "5. String",
      ],
    },
    {
      bab: "BAB 4",
      judul: "OPERATOR",
      subMateri: [
        "Pengertian Operator",
        "Operator Arithmetic",
        "Operator Increment Decrement",
        "Operator Assignment",
        "Operator Comparison",
        "Operator Logika",
        "Operator Conditional",
        "Operator Equality",
      ],
    },
    {
      bab: "BAB 5",
      judul: "KONTROL ALUR",
      subMateri: [
        "Pengertian Kontrol Alur",
        "Pernyataan If-Else",
        "Pernyataan Switch",
        "Pernyataan Perulangan",
        "Pernyataan Break dan Continue",
        "Perulangan Bersarang",
      ],
    },
    {
      bab: "BAB 6",
      judul: "METHOD",
      subMateri: [
        "Pengenalan Method",
        "Method Void",
        "Method Dengan Tipe Data",
        "Parameter Method",
      ],
    },
  ];

  const [openBabIndex, setOpenBabIndex] = useState(null);

  if (!isOpen) return null;

  const toggleBab = (index) => {
    setOpenBabIndex(openBabIndex === index ? null : index);
  };

  return (
    <div
      id="info-modal"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-3xl mx-auto">
        <div className="relative bg-white rounded-lg shadow-sm max-h-[80vh] overflow-y-auto">
          <div className="text-center flex items-center justify-between p-4 border-b rounded-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Progres Belajar
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 inline-flex justify-center items-center"
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
          <div className="p-4">
            {daftarMateri.map((materi, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={index === 0 ? () => toggleBab(index) : null}
                  className={`w-full text-left font-semibold text-gray-900 flex items-center justify-between ${
                    index === 0 ? "" : "cursor-not-allowed"
                  }`}
                  disabled={index !== 0}
                >
                  <span>
                    {materi.bab}: {materi.judul}
                  </span>
                  <span>{openBabIndex === index ? "▼" : "▲"}</span>
                </button>
                {openBabIndex === index && (
                  <ul className="list-disc list-inside mt-3 pl-4">
                    {materi.subMateri.map((sub, subIndex) => (
                      <li key={subIndex} className="flex mt-2 justify-between">
                        <span>{sub}</span>
                        {index === 0 &&
                          sub !== "Pengenalan C#" &&
                          sub !== "Instalasi C#" && (
                            <img
                              src={Kunci}
                              alt="Kunci"
                              className="w-4 h-4 ml-2"
                            />
                          )}
                      </li>
                    ))}
                  </ul>
                )}
                {index > 0 && (
                  <div className="flex items-center mt-2">
                    <img src={Kunci} alt="Kunci" className="w-4 h-4 mr-2" />
                    <span className="text-gray-500">Terkunci</span>
                  </div>
                )}
              </div>
            ))}
            <button
              className="mt-4 bg-[#68217A] text-white py-2 px-4 rounded-md"
              onClick={toggleModal}
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
