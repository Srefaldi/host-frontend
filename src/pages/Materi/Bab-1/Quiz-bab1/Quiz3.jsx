import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz = ({ onComplete }) => {
  const [functionName, setFunctionName] = useState("");
  const [methodName, setMethodName] = useState("");
  const [showCompiler, setShowCompiler] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const normalizeAnswer = (answer) => {
    return answer.trim().toLowerCase();
  };

  const handleSubmit = () => {
    if (!functionName || !methodName) {
      Swal.fire({
        title: "Isi Jawaban!",
        text: "Silakan isi kedua kolom sebelum mengirim.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const normalizedFunction = normalizeAnswer(functionName);
    const normalizedMethod = normalizeAnswer(methodName);

    if (normalizedFunction === "main" && normalizedMethod === "console") {
      setFunctionName("Main");
      setMethodName("Console");
      setShowExplanation(true);
      Swal.fire({
        title: "Jawaban Anda Benar!",
        text: "Silakan lanjut ke materi berikutnya.",
        icon: "success",
        confirmButtonText: "Lanjut",
        confirmButtonColor: "#6E2A7F",
      }).then(() => {
        onComplete();
      });
    } else {
      window.scrollTo(0, 0);
      setFunctionName("");
      setMethodName("");
      setShowExplanation(false);
      Swal.fire({
        title: "Jawaban Salah!",
        text: "Baca kembali materi dan coba lagi.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  const handleReset = () => {
    setFunctionName("");
    setMethodName("");
    setShowExplanation(false);
    setShowCompiler(false);
  };

  const handleTryCode = () => {
    setShowCompiler((prev) => !prev);
  };

  return (
    <div className="max-w-full p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2
        className="text-lg font-semibold text-center"
        style={{ color: "#6E2A7F" }}
      >
        UJI PENGETAHUAN
      </h2>

      <div className="mt-4">
        <p className="mt-2 text-gray-600">
          Lengkapilah struktur kode berikut dengan mengisi bagian yang kosong
          agar program memiliki sintaks yang benar ....
        </p>

        <div className="p-4 mt-3 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`public class Program\n{\n  static void `}
              <input
                type="text"
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-20 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
              />
              {`(string[] args)\n  {\n    `}
              <input
                type="text"
                value={methodName}
                onChange={(e) => setMethodName(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-20 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
              />
              {`.WriteLine("Hello World");\n  }\n}`}
            </code>
          </pre>
        </div>

        {/* Tombol Submit */}
        <div className="flex flex-col sm:flex-row mt-4 gap-2">
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#6E2A7F",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem", // Equivalent to rounded-md
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

          {/* Tombol Reset (Hapus Jawaban) */}
          <button
            onClick={handleReset}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem", // Equivalent to rounded-md
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

          {/* Tombol Coba Kode di Compiler */}
          <button
            onClick={handleTryCode}
            style={{
              backgroundColor: "white",
              color: "#6E2A7F",
              border: "2px solid #6E2A7F",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem", // Equivalent to rounded-md
              transition: "background-color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e0e0e0";
              e.currentTarget.style.borderColor = "#5B1F6A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.borderColor = "#6E2A7F";
            }}
          >
            Coba Kode di Compiler
          </button>
        </div>
      </div>

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
          Jawaban yang benar adalah: <strong>Main</strong> dan{" "}
          <strong>Console</strong>
          <br />
          <strong>Main</strong> adalah fungsi utama yang menjadi titik masuk
          program C#, dan <strong>Console</strong> adalah kelas yang digunakan
          untuk menampilkan output ke konsol, seperti dengan metode{" "}
          <code>WriteLine</code>.
        </div>
      )}

      {/* Iframe untuk Compiler */}
      {showCompiler && (
        <div className="mt-6">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/z3Z1xG"
            frameBorder="0"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Quiz;
