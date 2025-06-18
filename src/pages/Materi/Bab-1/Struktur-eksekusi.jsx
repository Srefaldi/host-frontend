import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import gambar118 from "./img-bab1/Gambar-118.png";
import Quiz from "./Quiz-bab1/Quiz4";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";

// Material page for "Struktur Eksekusi"
const StrukturEksekusi = () => {
  const navigate = useNavigate();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { handleLessonComplete, handleQuizComplete } = useOutletContext();
  const { completedLessons } = useSelector((state) => state.auth);
  const currentLessonPath = "/materi/bab1/struktur-eksekusi";

  // Periksa apakah materi sudah diselesaikan saat komponen dimuat
  useEffect(() => {
    if (completedLessons.includes(currentLessonPath)) {
      setQuizCompleted(true);
    }
  }, [completedLessons, currentLessonPath]);

  // Navigate to previous lesson
  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab1/struktur-kode");
  };

  // Navigate to next lesson
  const handleNext = () => {
    handleLessonComplete("/materi/bab1/struktur-eksekusi");
    window.scrollTo(0, 0);
    navigate("/materi/bab1/sintaks-print");
  };

  // Handle quiz completion
  const handleQuizCompleteLocal = () => {
    handleQuizComplete("/materi/bab1/struktur-eksekusi");
    setQuizCompleted(true);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-center">
        BAB 1 - PENDAHULUAN
      </h1>

      {/* White Container - Content Only */}
      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">1.3 Struktur Eksekusi Kode</h2>

        <p className="mt-4">
          Bahasa pemrograman C# memiliki struktur eksekusi kode yang sekuensial,
          yang berarti kode yang ditulis terlebih dahulu akan dieksekusi
          terlebih dahulu. Struktur eksekusi sekuensial adalah struktur umum
          yang digunakan sebagian besar bahasa pemrograman termasuk C#.
        </p>

        <h3 className="mt-4 text-xl font-semibold">
          Contoh Struktur Eksekusi Kode
        </h3>

        <p className="mt-4">
          Dapat diketahui lebih lanjut mengenai struktur eksekusi sekuensial
          menggunakan sampel kode di bawah ini. <br />
          Cobalah kode program pada compiler:
        </p>

        <div className="mt-4 italic">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/DuCLpB"
            frameBorder="0"
            title="C# Sequential Execution Example"
          ></iframe>
          <p className="mt-2">
            Pada kode di atas, program yang mencetak tiga baris string yang
            berisi nama jenis Pakaian yang akan dicetak pada sampel kode di atas
            akan ditampilkan dimulai dari "Ini Baju", "Ini Celana", hingga "Ini
            Topi" yang akan dicetak terakhir.
          </p>
        </div>

        <h3 className="mt-4 text-xl font-semibold">Control Structures</h3>

        <p className="mt-4">
          Di dalam struktur eksekusi kode terdapat control structures yang
          berguna untuk mengatur proses eksekusi sebuah kode program. Terdapat 3
          tipe control structures dalam bahasa pemrograman:
          <ul className="mt-4 pl-6 list-disc">
            <li>
              <strong>Sequence</strong> - struktur dimana perintah dieksekusi
              secara berurutan.
            </li>
            <li>
              <strong>Selection</strong> - seleksi dimana salah satu dari
              beberapa instruksi dipilih dan dieksekusi.
            </li>
            <li>
              <strong>Iteration</strong> - struktur dimana perintah yang sama
              dieksekusi berulang kali.
            </li>
          </ul>
        </p>

        {/* Tipe Control Structures Image and Caption */}
        <figure className="p-0 md:p-4 my-3 sm:my-8 text-center w-full mt-4">
          <img
            src={gambar118}
            alt="Gambar 1.3 Tipe control structures"
            className="w-full max-w-3xl mx-auto rounded-lg"
          />
          <div className="mt-3">
            <figcaption className="text-gray-600 text-sm sm:text-base">
              Gambar 1.3. Tipe Control Structures
            </figcaption>
          </div>
        </figure>
      </div>

      {/* Quiz - Outside white container */}
      <div className="mb-6">
        <Quiz onComplete={handleQuizCompleteLocal} />
      </div>

      {/* Navigation Buttons - Outside white container */}
      <div className="flex justify-between mt-6 gap-4">
        <button
          onClick={handleBack}
          className="flex items-center px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 text-base font-semibold transition-colors duration-200"
        >
          <img src={backIcon} alt="Kembali" className="w-5 h-5 mr-2" />
          Kembali
        </button>
        <button
          onClick={quizCompleted ? handleNext : null}
          disabled={!quizCompleted}
          className="flex items-center justify-between px-4 py-2 text-base font-semibold"
          style={{
            backgroundColor: quizCompleted ? "#6E2A7F" : "#B0B0B0",
            color: "white",
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

export default StrukturEksekusi;
