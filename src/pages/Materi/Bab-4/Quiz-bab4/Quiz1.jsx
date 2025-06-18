import React, { useState } from "react";
import Swal from "sweetalert2";

const QuizOperator = ({ onComplete }) => {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty inputs
    if (!inputA || !inputB) {
      Swal.fire({
        title: "Isi Semua Jawaban!",
        text: "Silakan isi semua kolom jawaban sebelum mengirim.",
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
    const normalizedInputA = normalizeAnswer(inputA);
    const normalizedInputB = normalizeAnswer(inputB);

    // Cek jawaban
    if (
      normalizedInputA === normalizeAnswer("-") &&
      normalizedInputB === normalizeAnswer("!")
    ) {
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
        html: getIncorrectFeedback(normalizedInputA, normalizedInputB),
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      }).then(() => {
        setInputA("");
        setInputB("");
        setShowExplanation(false);
      });
    }
  };

  const handleReset = () => {
    setInputA("");
    setInputB("");
    setShowExplanation(false);
  };

  // Function to generate feedback for incorrect answers
  const getIncorrectFeedback = (inputA, inputB) => {
    let feedback = "Beberapa jawaban Anda belum tepat:<br><ul>";

    // Check inputA
    if (inputA !== "-") {
      feedback += `<li>Untuk <code>b</code>, operator <strong>${inputA}</strong> salah. Gunakan operator unary yang membuat nilai numerik menjadi negatif.</li>`;
    }

    // Check inputB
    if (inputB !== "!") {
      feedback += `<li>Untuk <code>c</code>, operator <strong>${inputB}</strong> salah. Gunakan operator unary yang menghasilkan negasi dari nilai boolean.</li>`;
    }

    feedback +=
      "</ul>Tinjau kembali materi tentang operator unary. Yuk, coba lagi!";
    return feedback;
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
          Lengkapi kode berikut dengan operator unary yang benar sehingga b
          bernilai negatif dari a dan c bernilai negasi dari true ...
        </p>

        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`int a = 5;\nint b = `}
              <input
                type="text"
                value={inputA}
                onChange={(e) => setInputA(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {` a; // b akan bernilai -5\nbool c =   `}
              <input
                type="text"
                value={inputB}
                onChange={(e) => setInputB(e.target.value)}
                className="-ml-4 border border-gray-400 px-2 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {` true; // c akan bernilai false\nConsole.WriteLine(b);\nConsole.WriteLine(c);`}
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
          Dalam C#, operator unary digunakan untuk operasi pada satu operand.
          Operator negasi numerik mengubah nilai positif menjadi negatif, dan
          operator negasi logis membalik nilai boolean.
        </div>
      )}
    </div>
  );
};

export default QuizOperator;
