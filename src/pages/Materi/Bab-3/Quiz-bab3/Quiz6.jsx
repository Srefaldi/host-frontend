import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz6 = ({ onComplete }) => {
  const [operator1, setOperator1] = useState("");
  const [operator2, setOperator2] = useState("");
  const [operator3, setOperator3] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty inputs
    if (!operator1 || !operator2 || !operator3) {
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
    const normalizedOperator1 = normalizeAnswer(operator1);
    const normalizedOperator2 = normalizeAnswer(operator2);
    const normalizedOperator3 = normalizeAnswer(operator3);

    // Cek jawaban
    if (
      normalizedOperator1 === normalizeAnswer("<") &&
      normalizedOperator2 === normalizeAnswer("==") &&
      normalizedOperator3 === normalizeAnswer(">")
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
        html: getIncorrectFeedback(
          normalizedOperator1,
          normalizedOperator2,
          normalizedOperator3
        ),
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      }).then(() => {
        setOperator1("");
        setOperator2("");
        setOperator3("");
        setShowExplanation(false);
        onComplete(false);
      });
    }
  };

  const handleReset = () => {
    setOperator1("");
    setOperator2("");
    setOperator3("");
    setShowExplanation(false);
  };

  // Function to generate feedback for incorrect answers
  const getIncorrectFeedback = (operator1, operator2, operator3) => {
    let feedback = "Beberapa jawaban Anda belum tepat:<br><ul>";

    // Check operator1 (less than)
    if (operator1 !== "<") {
      feedback += `<li>Untuk <code>hasil1</code>, operator <strong>${operator1}</strong> salah. Pastikan operator sesuai untuk membandingkan apakah 50 lebih kecil dari 30.</li>`;
    }

    // Check operator2 (equal to)
    if (operator2 !== "==") {
      feedback += `<li>Untuk <code>hasil2</code>, operator <strong>${operator2}</strong> salah. Pastikan operator sesuai untuk membandingkan apakah 15 sama dengan 15.</li>`;
    }

    // Check operator3 (greater than)
    if (operator3 !== ">") {
      feedback += `<li>Untuk <code>hasil3</code>, operator <strong>${operator3}</strong> salah. Pastikan operator sesuai untuk membandingkan karakter 'B' dengan 'b' berdasarkan nilai ASCII.</li>`;
    }

    feedback +=
      "</ul>Tinjau kembali materi tentang operator perbandingan . Yuk, coba lagi!";
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
          Lengkapi kode berikut dengan operator perbandingan yang benar:
        </p>

        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`bool hasil1 = 50 `}
              <input
                type="text"
                value={operator1}
                onChange={(e) => setOperator1(e.target.value)}
                className="border border-gray-400 mb-2 px-2 py-1 w-20 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {` 30; // Bandingkan apakah 50 lebih kecil dari 30\n`}
              {`bool hasil2 = 15 `}
              <input
                type="text"
                value={operator2}
                onChange={(e) => setOperator2(e.target.value)}
                className="border border-gray-400 px-2 mb-2 py-1 w-20 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {` 15; // Bandingkan apakah 15 sama dengan 15\n`}
              {`bool hasil3 = 'B'`}
              <input
                type="text"
                value={operator3}
                onChange={(e) => setOperator3(e.target.value)}
                className="border border-gray-400 px-2 py-1 mb-2 w-20 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {` 'b'; // Bandingkan apakah karakter 'B' lebih besar dari 'b'\n\n`}
              {`Console.WriteLine("hasil1 = " + hasil1);\nConsole.WriteLine("hasil2 = " + hasil2);\nConsole.WriteLine("hasil3 = " + hasil3);`}
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
        <div className="bg-green-100 border border-green-300 rounded-md p-4 text-green-800 text-sm font-normal mt-4">
          <div className="flex items-center mb-2 font-semibold">
            <svg
              className="w-5 h-5 mr-2 flex-shrink-0"
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
          Dalam C#, operator perbandingan digunakan untuk membandingkan nilai,
          menghasilkan nilai boolean berdasarkan kondisi tertentu.
        </div>
      )}
    </div>
  );
};

export default Quiz6;
