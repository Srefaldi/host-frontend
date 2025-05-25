import React, { useState } from "react";
import Swal from "sweetalert2";

const QuizAssignment = ({ onComplete }) => {
  const [inputMultiply, setInputMultiply] = useState("");
  const [inputDivide, setInputDivide] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty inputs
    if (!inputMultiply || !inputDivide) {
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
    const normalizedInputMultiply = normalizeAnswer(inputMultiply);
    const normalizedInputDivide = normalizeAnswer(inputDivide);
    const correctMultiply = "*="; // Operator penugasan untuk perkalian
    const correctDivide = "/="; // Operator penugasan untuk pembagian

    // Cek jawaban
    if (
      normalizedInputMultiply === normalizeAnswer(correctMultiply) &&
      normalizedInputDivide === normalizeAnswer(correctDivide)
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
      window.scrollTo(0, 0);
      setInputMultiply("");
      setInputDivide("");
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
    setInputMultiply("");
    setInputDivide("");
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

      <form onSubmit={handleSubmit}>
        <p className="mt-2 text-gray-600">
          Lengkapilah bagian kode berikut dengan operator penugasan gabungan
          yang sesuai untuk mendapatkan hasil perhitungan yang benar.
        </p>

        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`public class SoalPenugasan2\n{\n    public static void Main(string[] args)\n    {\n        int angka = 10;\n\n        // Kalikan angka dengan 4\n        angka `}
              <input
                type="text"
                value={inputMultiply}
                onChange={(e) => setInputMultiply(e.target.value)}
                className="ml-1 mr-1 border border-gray-400 px-1 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {` 4;\n        Console.WriteLine("Setelah perkalian: " + angka);\n\n        // Bagi angka dengan 2\n        angka `}
              <input
                type="text"
                value={inputDivide}
                onChange={(e) => setInputDivide(e.target.value)}
                className="ml-1 mr-1 border border-gray-400 px-1 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {` 2;\n        Console.WriteLine("Setelah pembagian: " + angka);\n    }\n}`}
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
          Jawaban yang benar adalah:
          <br />
          Untuk perkalian: <strong>*=</strong> (operator penugasan gabungan
          untuk perkalian, menjadi <code>angka *= 4</code>),
          <br />
          Untuk pembagian: <strong>/=</strong> (operator penugasan gabungan
          untuk pembagian, menjadi <code>angka /= 2</code>).
          <br />
          Dalam C#, operator <code>*=</code> mengalikan variabel dengan nilai
          tertentu dan menyimpan hasilnya ke variabel tersebut. Jadi,{" "}
          <code>angka *= 4</code> mengalikan <code>angka</code> (10) dengan 4,
          menghasilkan 40. Operator <code>/=</code> membagi variabel dengan
          nilai tertentu dan menyimpan hasilnya. Jadi, <code>angka /= 2</code>{" "}
          membagi <code>angka</code> (40) dengan 2, menghasilkan 20.
        </div>
      )}
    </div>
  );
};

export default QuizAssignment;
