import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import Quiz from "./Quiz-bab1/Quiz6";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";

// Material page for "Sintaks Komentar"
const SintaksKomentar = () => {
  const navigate = useNavigate();
  const { handleLessonComplete, handleQuizComplete } = useOutletContext();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { completedLessons } = useSelector((state) => state.auth);
  const currentLessonPath = "/materi/bab1/sintaks-komentar";

  // Periksa apakah materi sudah diselesaikan saat komponen dimuat
  useEffect(() => {
    if (completedLessons.includes(currentLessonPath)) {
      setQuizCompleted(true);
    }
  }, [completedLessons, currentLessonPath]);

  // Navigate to next lesson
  const handleNext = () => {
    handleLessonComplete("/materi/bab1/sintaks-komentar");
    window.scrollTo(0, 0);
    navigate("/materi/bab1/error-csharp");
  };

  // Navigate to previous lesson
  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab1/sintaks-print");
  };

  // Handle quiz completion
  const handleQuizCompleteLocal = () => {
    handleQuizComplete("/materi/bab1/sintaks-komentar");
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
        <h2 className="text-2xl font-bold">1.5 Sintaks Komentar</h2>

        <p className="mt-4">
          Komentar dalam bahasa pemrograman merupakan bagian yang cukup penting
          untuk memberi tahu maksud dan tujuan dari kode program tersebut.
          Komentar merupakan bagian dari program yang tidak akan dieksekusi oleh
          sistem. Dalam bahasa pemrograman C#, terdapat dua tipe komentar:
        </p>

        <ul className="mt-4 pl-6 list-disc">
          <li>Single line comment</li>
          <li>Multiple line comment</li>
        </ul>

        <p className="mt-4">
          Untuk memberi komentar, kita dapat menggunakan sintaks <code>//</code>{" "}
          untuk single-line comment atau <code>/* */</code> untuk multi-line
          comment.
        </p>

        <p className="mt-4">Cobalah kode program pada compiler:</p>

        <pre className="mt-4 p-4 overflow-x-auto bg-gray-100 rounded-lg">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/wpjyVs"
            frameBorder="0"
            title="C# Comment Example"
          ></iframe>
        </pre>
      </div>

      {/* Quiz */}
      <div className="mb-6">
        <Quiz onComplete={handleQuizCompleteLocal} />
      </div>

      {/* Navigation Buttons */}
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
            if (quizCompleted)
              e.currentTarget.style.backgroundColor = "#5B1F6A";
          }}
          onMouseLeave={(e) => {
            if (quizCompleted)
              e.currentTarget.style.backgroundColor = "#6E2A7F";
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

export default SintaksKomentar;
