import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import Quiz from "./Quiz-bab1/Quiz3";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";

const StrukturKode = () => {
  const navigate = useNavigate();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { handleLessonComplete, handleQuizComplete } = useOutletContext();
  const { completedLessons } = useSelector((state) => state.auth);
  const currentLessonPath = "/materi/bab1/struktur-kode";

  // Periksa apakah materi sudah diselesaikan saat komponen dimuat
  useEffect(() => {
    if (completedLessons.includes(currentLessonPath)) {
      setQuizCompleted(true);
    }
  }, [completedLessons, currentLessonPath]);

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab1/pengenalan");
  };

  const handleNext = () => {
    handleLessonComplete("/materi/bab1/struktur-kode");
    window.scrollTo(0, 0);
    navigate("/materi/bab1/struktur-eksekusi");
  };

  const handleQuizCompleteLocal = () => {
    handleQuizComplete("/materi/bab1/struktur-kode");
    setQuizCompleted(true);
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-center">
        BAB 1 - PENDAHULUAN
      </h1>

      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">
          1.2 Struktur Kode Bahasa Pemrograman C#
        </h2>

        <p className="mt-4">
          Sebelum memulai pembelajaran pemrograman kita perlu mengetahui
          struktur dasar dari kode bahasa pemrograman C#. Kita dapat melihat
          struktur kode bahasa pemrograman C# yang paling dasar dengan contoh
          kode di bawah ini.
          <br />
          Cobalah kode pada compiler:
        </p>

        <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-x-auto">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/DuCLpB"
            frameBorder="0"
          ></iframe>
        </pre>

        <p className="mt-4">Penjelasan Kode:</p>

        <ul className="mt-4 pl-6 list-disc">
          <li>
            <strong>using System;</strong> - Digunakan untuk mengimpor namespace
            System, sehingga kita dapat menggunakan kelas seperti Console tanpa
            menuliskan System.Console.
          </li>
          <li>
            <strong>namespace CsharpLearn</strong> - Namespace berfungsi untuk
            mengelompokkan kode agar terorganisir dan menghindari konflik nama.
          </li>
          <li>
            <strong>class Program</strong> - Adalah kerangka utama yang berisi
            data dan metode program.
          </li>
          <li>
            <strong>static void Main(string[] args)</strong> - Titik awal
            eksekusi program. Parameter <em>args</em> digunakan untuk menerima
            argumen dari command line.
          </li>
          <li>
            <strong>Console.WriteLine</strong> - Pernyataan untuk menampilkan
            teks ke layar.
          </li>
        </ul>
      </div>

      {/* Kuis */}
      <Quiz onComplete={handleQuizCompleteLocal} />

      {/* Tombol Navigasi */}
      <div className="flex justify-between mt-6 gap-4">
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

export default StrukturKode;
