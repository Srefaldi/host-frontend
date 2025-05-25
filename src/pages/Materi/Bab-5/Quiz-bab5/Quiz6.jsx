import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz6 = ({ onComplete }) => {
  const [inputCondition, setInputCondition] = useState("");
  const [inputIteration, setInputIteration] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty inputs
    if (!inputCondition || !inputIteration) {
      window.scrollTo(0, 0);
      Swal.fire({
        title: "Isi Semua Kolom!",
        text: "Silakan isi semua bagian sebelum mengirim.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#6E2A7F",
      });
      return;
    }

    // Fungsi untuk normalisasi jawaban
    const normalizeAnswer = (answer) => {
      return answer.replace(/\s+/g, "").toLowerCase();
    };

    // Normalisasi jawaban pengguna dan jawaban yang benar
    const normalizedInputCondition = normalizeAnswer(inputCondition);
    const normalizedInputIteration = normalizeAnswer(inputIteration);
    const correctCondition = "i > 0"; // Jawaban yang benar untuk kondisi
    const correctIteration = "i--"; // Jawaban yang benar untuk iterasi
    const normalizedCorrectCondition = normalizeAnswer(correctCondition);
    const normalizedCorrectIteration = normalizeAnswer(correctIteration);

    // Cek jawaban
    if (
      normalizedInputCondition === normalizedCorrectCondition &&
      normalizedInputIteration === normalizedCorrectIteration
    ) {
      setShowExplanation(true);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
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
      window.scrollTo(0, 0);
      setInputCondition("");
      setInputIteration("");
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
    setInputCondition("");
    setInputIteration("");
    setShowExplanation(false);
  };

  return (
    <div className="max-w-full p-6 mx-auto mt-4 bg-white rounded-lg shadow-lg">
      <h2
        className="text-lg font-semibold text-center"
        style={{ color: "#6E2A7F" }}
      >
        UJI PENGETAHUAN
      </h2>

      <div className="mt-4">
        <p className="mt-2 text-gray-600">
          Lengkapilah bagian kode berikut dengan pernyataan while yang sesuai
          untuk mencetak angka dari 5 hingga 1.
        </p>

        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`\npublic class Quiz\n{\n    public static void Main()\n    {\n        int i = 5;\n\n        while (`}
              <input
                type="text"
                value={inputCondition}
                onChange={(e) => setInputCondition(e.target.value)}
                className="border border-gray-400 px-2 py-1 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {`)\n        {\n            Console.WriteLine(i);\n            `}
              <input
                type="text"
                value={inputIteration}
                onChange={(e) => setInputIteration(e.target.value)}
                className="border border-gray-400 px-2 py-1 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {`;\n        }\n    }\n}`}
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
            onClick={handleSubmit}
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
          Jawaban yang benar adalah: <code>i > 0</code> untuk kondisi, dan{" "}
          <code>i--</code> untuk iterasi.
          <br />
          Dalam perulangan <code>while</code> di C#, kondisi <code>i > 0</code>{" "}
          memastikan perulangan berjalan selama nilai <code>i</code> lebih besar
          dari 0. Iterasi <code>i--</code> mengurangi nilai <code>i</code>{" "}
          sebesar 1 pada setiap iterasi, sehingga mencetak angka dari 5 hingga
          1.
        </div>
      )}
    </div>
  );
};

export default Quiz6;
