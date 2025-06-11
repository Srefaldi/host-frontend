import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import alur from "./img-bab1/alur.png";
import logoc from "./img-bab1/logo.png";
import Quiz from "./Quiz-bab1/Quiz1";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import iconBook from "../../../assets/img/book.png";
import iconTujuan from "../../../assets/img/tujuan.png";
import iconKonten from "../../../assets/img/konten.png";

const PengenalanCSharp = () => {
  const [openSections, setOpenSections] = useState({
    pendahuluan: false,
    tujuan: false,
    konten: false,
  });
  const navigate = useNavigate();
  const { handleLessonComplete, handleQuizComplete } = useOutletContext();
  const [quizCompleted, setQuizCompleted] = useState(false);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleQuizCompleteLocal = () => {
    setQuizCompleted(true);
    handleQuizComplete("/materi/bab1/pengenalan");
  };

  const handleNext = () => {
    window.scrollTo(0, 0);
    handleLessonComplete("/materi/bab1/pengenalan");
    navigate("/materi/bab1/struktur-kode");
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="mb-4 text-xl font-bold text-center sm:text-2xl">
        BAB 1 - PENDAHULUAN
      </h1>

      {/* Pendahuluan Materi */}
      <div className="w-full mb-4 border border-gray-300 rounded-lg">
        <h3
          className="flex items-center p-3 text-sm font-bold text-white cursor-pointer sm:p-4 sm:text-base"
          onClick={() => toggleSection("pendahuluan")}
          style={{ backgroundColor: "#68217A" }}
        >
          <img
            src={iconBook}
            alt="Icon"
            className="w-6 h-6 mr-2 sm:w-8 sm:h-8"
          />
          PENDAHULUAN MATERI
          <span className="ml-2">▼</span>
        </h3>
        <div className="p-3 text-sm text-justify text-gray-700 bg-white rounded-b-lg sm:p-4 sm:text-base">
          <p>
            Pada bab ini, kita akan mempelajari pendahuluan bahasa pemrograman
            C#. Bahasa ini memiliki kesamaan dan perbedaan dengan bahasa
            pemrograman lain, yang memberikan ciri khas tersendiri. Setelah
            mempelajari materi ini, diharapkan pembaca dapat menulis kode
            program sesuai ketentuan dan menghindari kesalahan umum dalam
            pemrograman.
          </p>
        </div>
      </div>

      {/* Tujuan Pembelajaran */}
      <div
        className="w-full mb-4 border border-gray-300 rounded-lg"
        style={{ backgroundColor: "#68217A" }}
      >
        <h3
          className="flex items-center p-3 text-sm font-bold text-white cursor-pointer sm:p-4 sm:text-base"
          onClick={() => toggleSection("tujuan")}
        >
          <img
            src={iconTujuan}
            alt="Icon"
            className="w-6 h-6 mr-2 sm:w-8 sm:h-8"
          />
          TUJUAN PEMBELAJARAN
          <span className="ml-2"> ▼</span>
        </h3>
        <ul className="p-3 pl-6 text-sm text-justify text-gray-700 list-disc bg-white rounded-b-lg sm:p-4 sm:text-base">
          <li>Mampu memahami struktur kode bahasa pemrograman C#</li>
          <li>
            Mampu memahami struktur eksekusi kode (sequence, selection, dan
            iteration)
          </li>
          <li>
            Mampu menggunakan sintaks print untuk fungsi output dan sintaks
            komentar
          </li>
          <li>
            Mampu mengetahui jenis-jenis error yang ada pada bahasa pemrograman
            C#
          </li>
        </ul>
      </div>

      {/* Konten Materi */}
      <div
        className="w-full mb-4 border border-gray-300 rounded-lg"
        style={{ backgroundColor: "#68217A" }}
      >
        <h3
          className="flex items-center p-3 text-sm font-bold text-white cursor-pointer sm:p-4 sm:text-base"
          onClick={() => toggleSection("konten")}
        >
          <img
            src={iconKonten}
            alt="Icon"
            className="w-6 h-6 mr-2 sm:w-8 sm:h-8"
          />
          KONTEN MATERI
          <span className="ml-2">▼</span>
        </h3>
        <ul className="p-3 pl-6 text-sm text-justify text-gray-700 list-none bg-white rounded-b-lg sm:p-4 sm:text-base">
          <li>1.1 Pengenalan C#</li>
          <li>1.2 Struktur Kode Bahasa Pemrograman C#</li>
          <li>1.3 Struktur Eksekusi Kode</li>
          <li>1.4 Sintaks Print</li>
          <li>1.5 Sintaks Komentar</li>
          <li>1.6 Error pada C#</li>
          <li>Rangkuman</li>
        </ul>
      </div>

      {/* Pengertian C# */}
      <div className="p-3 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md sm:p-4">
        <h2 className="text-xl font-bold sm:text-2xl">1.1 Pengenalan C#</h2>
        <p className="mt-4 text-sm sm:text-base">
          C# (“See-Sharp”) adalah bahasa pemrograman modern yang dikembangkan
          oleh Microsoft sebagai bagian dari inisiatif .NET mereka. Bahasa ini
          pertama kali dirilis pada tahun 2000 dan dirancang di bawah
          kepemimpinan Anders Hejlsberg, seorang tokoh terkemuka dalam
          pengembangan bahasa pemrograman, yang juga dikenal sebagai pengembang
          Borland Turbo C++ dan Borland Delphi. C# merupakan bahasa yang
          dikompilasi dan sangat kuat, fleksibel, serta mendukung pemrograman
          berorientasi objek.
        </p>
        <figure className="w-full p-0 my-3 text-center sm:p-4 sm:my-0">
          <img
            src={logoc}
            alt="Gambar 1.1 Logo C#"
            className="w-full max-w-xs mx-auto rounded-lg sm:max-w-sm md:max-w-sm"
          />
          <div className="mt-3">
            <figcaption className="text-xs text-gray-600 sm:text-sm">
              Gambar 1.1. Logo C#
            </figcaption>
          </div>
        </figure>
        <p className="mt-4 text-sm sm:text-base">
          Seperti halnya bahasa pemrograman yang lain, C# bisa digunakan untuk
          membangun berbagai macam jenis aplikasi, seperti aplikasi berbasis
          windows (desktop) dan aplikasi berbasis web serta aplikasi berbasis
          web services.
        </p>
        <p className="mt-4 text-sm sm:text-base">
          C# dikembangkan sebagai respons terhadap kebutuhan akan bahasa
          pemrograman yang kuat namun sederhana untuk mengembangkan aplikasi
          pada platform Microsoft. Bahasa ini dipengaruhi oleh beberapa bahasa
          pemrograman lain seperti C++, Java, dan Delphi, mengambil elemen
          terbaik dari masing-masing bahasa untuk menciptakan bahasa yang
          efisien dan mudah digunakan. Pada tahun 2002, versi pertama C#
          diperkenalkan sebagai bagian dari .NET Framework 1.0. Sejak saat itu,
          C# telah mengalami beberapa pembaruan dan perbaikan yang signifikan.
        </p>
        <p className="mt-4 text-sm sm:text-base">
          Pada tahun 2003, C# diakui sebagai standar oleh ECMA (European
          Computer Manufacturers Association) dan ISO (International
          Organization for Standardization), yang membantu dalam penyebaran
          bahasa ini secara global.
        </p>
        <p className="mt-4 text-sm sm:text-base">
          Program C# tidak seperti program C dan C++ yang di-compile menjadi
          binary yang bisa dieksekusi langsung oleh prosesor. Program C#
          di-compile menjadi CIL (Common Intermediate Language). Komunitas
          Visual Studio hanya mengubah program Bahasa C# menjadi MIL, yang
          merupakan singkatan dari Microsoft Intermediate Language. Kode MIL ini
          kemudian diubah menjadi bahasa mesin oleh sistem eksekusi virtual yang
          dikenal sebagai Common Language Runtime. Seperti Gambar dibawah ini.
        </p>
        <figure className="w-full p-0 my-3 text-center sm:p-4 sm:my-0">
          <img
            src={alur}
            alt="Gambar 1.2 Alur eksekusi Common Language Runtime"
            className="w-full max-w-xs mx-auto rounded-lg sm:max-w-sm md:max-w-xl"
          />
          <div className="mt-3">
            <figcaption className="text-xs text-gray-600 sm:text-sm">
              Gambar 1.2. Alur Eksekusi Common Language Runtime
            </figcaption>
          </div>
        </figure>
      </div>

      {/* Kuis */}
      <Quiz onComplete={handleQuizCompleteLocal} />

      {/* Tombol Navigasi */}
      <div className="flex justify-between mt-6 gap-4">
        {" "}
        {/* Added gap-4 for spacing */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 text-base font-semibold transition-colors duration-200"
        >
          <img src={backIcon} alt="Kembali" className="w-5 h-5 mr-2" />
          Kembali
        </button>
        <button
          onClick={quizCompleted ? handleNext : null}
          disabled={!quizCompleted}
          className="flex items-center justify-between"
          style={{
            backgroundColor: quizCompleted ? "#6E2A7F" : "#B0B0B0",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            transition: "background-color 0.2s",
            cursor: quizCompleted ? "pointer" : "not-allowed",
          }}
          onMouseEnter={(e) => {
            if (quizCompleted) {
              e.currentTarget.style.backgroundColor = "#5B1F6A";
            }
          }}
          onMouseLeave={(e) => {
            if (quizCompleted) {
              e.currentTarget.style.backgroundColor = "#6E2A7F";
            }
          }}
        >
          <span>Selanjutnya</span>
          <img
            src={quizCompleted ? nextIcon : lockIcon}
            alt={quizCompleted ? "Selanjutnya" : "Terkunci"}
            className="w-5 h-5 ml-2"
          />
        </button>
      </div>
    </div>
  );
};

export default PengenalanCSharp;
