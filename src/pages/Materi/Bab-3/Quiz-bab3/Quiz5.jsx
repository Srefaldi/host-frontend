import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz5 = ({ onComplete }) => {
  const [var1Type, setVar1Type] = useState("");
  const [var2Type, setVar2Type] = useState("");
  const [var3Type, setVar3Type] = useState("");
  const [var1Value, setVar1Value] = useState("");
  const [var2Value, setVar2Value] = useState("");
  const [var3Value, setVar3Value] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty inputs
    if (
      !var1Type ||
      !var2Type ||
      !var3Type ||
      !var1Value ||
      !var2Value ||
      !var3Value
    ) {
      Swal.fire({
        title: "Isi Semua Jawaban!",
        text: "Silakan isi semua kolom jawaban sebelum mengirim.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#6E2A7F",
      });
      setVar1Type("");
      setVar2Type("");
      setVar3Type("");
      setVar1Value("");
      setVar2Value("");
      setVar3Value("");
      return;
    }

    // Fungsi untuk normalisasi jawaban
    const normalizeAnswer = (answer) => {
      return answer.trim().replace(/\s+/g, " ").toLowerCase();
    };

    // Normalisasi jawaban pengguna dan jawaban yang benar
    const normalizedVar1Type = normalizeAnswer(var1Type);
    const normalizedVar2Type = normalizeAnswer(var2Type);
    const normalizedVar3Type = normalizeAnswer(var3Type);
    const normalizedVar1Value = normalizeAnswer(var1Value);
    const normalizedVar2Value = normalizeAnswer(var2Value);
    const normalizedVar3Value = normalizeAnswer(var3Value);

    // Cek jawaban
    if (
      normalizedVar1Type === normalizeAnswer("float") &&
      normalizedVar2Type === normalizeAnswer("double") &&
      normalizedVar3Type === normalizeAnswer("decimal") &&
      normalizedVar1Value === normalizeAnswer("F") &&
      normalizedVar2Value === normalizeAnswer("D") &&
      normalizedVar3Value === normalizeAnswer("M")
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
      setVar1Type("");
      setVar2Type("");
      setVar3Type("");
      setVar1Value("");
      setVar2Value("");
      setVar3Value("");
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
    setVar1Type("");
    setVar2Type("");
    setVar3Type("");
    setVar1Value("");
    setVar2Value("");
    setVar3Value("");
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
          Lengkapi kode berikut dengan tipe data dan nilai yang benar:
        </p>

        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`public class BelajarCSharp \n{ \n    public static void Main(string[] args) \n    { \n        `}
              <input
                type="text"
                value={var1Type}
                onChange={(e) => setVar1Type(e.target.value)}
                className="border border-gray-400 px-2 mb-2 py-1 w-20 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {` var1; \n        `}
              <input
                type="text"
                value={var2Type}
                onChange={(e) => setVar2Type(e.target.value)}
                className="border border-gray-400 px-2 py-1 mb-2 w-20 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {` var2; \n        `}
              <input
                type="text"
                value={var3Type}
                onChange={(e) => setVar3Type(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {` var3; \n\n        var1 = 136.18`}
              <input
                type="text"
                value={var1Value}
                onChange={(e) => setVar1Value(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-18 mb-2 ml-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {`;\n        var2 = 136.18`}
              <input
                type="text"
                value={var2Value}
                onChange={(e) => setVar2Value(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-18 ml-2 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {`;\n        var3 = 136.18`}
              <input
                type="text"
                value={var3Value}
                onChange={(e) => setVar3Value(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-18 ml-2 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {`;\n\n        Console.WriteLine("var1 = " + var1); \n        Console.WriteLine("var2 = " + var2); \n        Console.WriteLine("var3 = " + var3); \n    } \n}`}
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
          Tipe data: <strong>float</strong> untuk var1, <strong>double</strong>{" "}
          untuk var2, <strong>decimal</strong> untuk var3.
          <br />
          Sufiks: <strong>F</strong> untuk var1, <strong>D</strong> untuk var2,{" "}
          <strong>M</strong> untuk var3.
          <br />
          Dalam C#, untuk bilangan desimal, tipe <code>float</code> memerlukan
          sufiks <code>F</code>, <code>double</code> memerlukan sufiks{" "}
          <code>D</code> (opsional, tapi disarankan untuk kejelasan), dan{" "}
          <code>decimal</code> memerlukan sufiks <code>M</code>. Nilai 136.18
          disimpan dengan tipe data yang sesuai.
        </div>
      )}
    </div>
  );
};

export default Quiz5;
