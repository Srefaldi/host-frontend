import React, { useState } from "react";
import Swal from "sweetalert2";

const QuizComparison = ({ onComplete }) => {
  const [inputComparison, setInputComparison] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty input
    if (!inputComparison) {
      Swal.fire({
        title: "Isi Jawaban!",
        text: "Silakan isi kolom jawaban sebelum mengirim.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#6E2A7F",
      });
      return;
    }

    // Fungsi untuk normalisasi jawaban
    const normalizeAnswer = (answer) => {
      return answer.trim().replace(/\s+/g, " ").toLowerCase();
    };

    // Normalisasi jawaban pengguna dan jawaban yang benar
    const normalizedInputComparison = normalizeAnswer(inputComparison);
    const correctComparison = ">"; // Operator perbandingan yang benar

    // Cek jawaban
    if (normalizedInputComparison === normalizeAnswer(correctComparison)) {
      setShowExplanation(true);
      Swal.fire({
        title: "Jawaban Anda Benar!",
        text: "Silakan lanjut ke materi berikutnya.",
        icon: "success",
        confirmButtonText: "Lanjut",
        confirmButtonColor: "#6E2A7F",
      }).then(() => {
        onComplete(true);
      });
    } else {
      Swal.fire({
        title: "Jawaban Anda Belum Tepat!",
        html: getIncorrectFeedback(normalizedInputComparison),
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      }).then(() => {
        window.scrollTo(0, 0);
        setInputComparison("");
        setShowExplanation(false);
      });
    }
  };

  const handleReset = () => {
    setInputComparison("");
    setShowExplanation(false);
  };

  // Function to generate feedback for incorrect answers
  const getIncorrectFeedback = (comparison) => {
    return `Operator <strong>${comparison}</strong> salah. Gunakan operator perbandingan yang memeriksa apakah nilai pertama lebih besar dari nilai kedua. Tinjau kembali materi tentang operator perbandingan. Yuk, coba lagi!`;
  };

  return (
    <div className="max-w-full p-6 mx-auto mt-4 bg-white rounded-lg shadow-lg">
      <h2
        className="text-lg font-semibold text-center"
        style={{ color: "#6E2A7F" }}
      >
        UJI PENGETAHUAN
      </h2>

      <form onSubmit={handleSubmit}>
        <p className="mt-2 text-gray-600">
          Lengkapilah bagian kode berikut dengan operator perbandingan yang
          sesuai untuk mendapatkan hasil yang benar.
        </p>

        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`public class SoalPerbandingan4\n{\n    public static void Main(string[] args)\n    {\n        int x = 18;\n        int y = 12;\n\n        if (x `}
              <input
                type="text"
                value={inputComparison}
                onChange={(e) => setInputComparison(e.target.value)}
                className="ml-1 mr-1 border border-gray-400 px-1 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {` y)\n        {\n            Console.WriteLine("x lebih besar dari y");\n        }\n        else {\n            Console.WriteLine("x lebih kecil atau sama dengan y");\n        }\n    }\n}`}
            </code>
          </pre>
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
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
            Cek Jawaban
          </button>

          <button
            type="button"
            onClick={handleReset}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#c0392b")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "red")
            }
          >
            Hapus Jawaban
          </button>
        </div>
      </form>

      {/* Explanation Section */}
      {showExplanation && (
        <div className="p-4 mt-4 text-sm font-normal text-green-800 bg-green-100 border border-green-300 rounded-md">
          <div className="flex items-center mb-2 font-semibold">
            <svg
              className="flex-shrink-0 w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4"
              ></path>
            </svg>
            BENAR
          </div>
          Dalam C#, operator perbandingan digunakan untuk membandingkan dua
          nilai dan menghasilkan nilai boolean.
        </div>
      )}
    </div>
  );
};

export default QuizComparison;
