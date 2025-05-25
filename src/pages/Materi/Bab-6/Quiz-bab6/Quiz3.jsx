import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz3 = ({ onComplete }) => {
  const [inputMain, setInputMain] = useState("");
  const [inputReturn, setInputReturn] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty inputs
    if (!inputMain || !inputReturn) {
      Swal.fire({
        title: "Isi Semua Jawaban!",
        text: "Silakan isi semua kolom jawaban sebelum mengirim.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#6E2A7F",
      });
      return;
    }

    // Function to normalize answers
    const normalizeAnswer = (answer) => {
      return answer.replace(/\s+/g, "").toLowerCase();
    };

    // Normalize user answers and correct answers
    const normalizedInputMain = normalizeAnswer(inputMain);
    const normalizedInputReturn = normalizeAnswer(inputReturn);
    const correctMain = "PerkalianTigaAngka()";
    const correctReturn = "return hasil";
    const normalizedCorrectMain = normalizeAnswer(correctMain);
    const normalizedCorrectReturn = normalizeAnswer(correctReturn);

    // Check answers
    if (
      normalizedInputMain === normalizedCorrectMain &&
      normalizedInputReturn === normalizedCorrectReturn
    ) {
      // If correct but has capitalization/spacing issues, correct the display
      setInputMain(correctMain);
      setInputReturn(correctReturn);
      setShowExplanation(true);

      Swal.fire({
        title: "Jawaban Anda Benar!",
        text: "Silakan lanjut ke materi berikutnya.",
        icon: "success",
        confirmButtonText: "Lanjut",
        confirmButtonColor: "#6E2A7F",
      }).then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        onComplete(true);
      });
    } else {
      window.scrollTo(0, 0);
      setInputMain("");
      setInputReturn("");
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
    setInputMain("");
    setInputReturn("");
    setShowExplanation(false);
  };

  return (
    <div className="mt-4 max-w-full p-6 mx-auto rounded-lg">
      <h2
        className="text-lg font-semibold text-center"
        style={{ color: "#6E2A7F" }}
      >
        UJI PENGETAHUAN
      </h2>

      <form onSubmit={handleSubmit}>
        <p className="mt-2 text-gray-600">
          Lengkapilah kode program berikut agar method PerkalianTigaAngka()
          dapat mengembalikan hasil perkalian tiga angka bertipe int dan
          mencetaknya ke layar:
        </p>

        <div className="p-4 mt-3 font-mono text-sm bg-gray-100 rounded-lg mb-4">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`public class BelajarCSharp\n{\n    public static void Main(string[] args)\n    {\n        Console.WriteLine(`}
              <input
                type="text"
                value={inputMain}
                onChange={(e) => setInputMain(e.target.value)}
                className="ml-1 mr-1 border-2 border-gray-400 px-2 py-1 w-40 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {`);\n    }\n\n    static int PerkalianTigaAngka()\n    {\n        int a = 2, b = 3, c = 4;\n        int hasil = a * b * c;\n        `}
              <input
                type="text"
                value={inputReturn}
                onChange={(e) => setInputReturn(e.target.value)}
                className="ml-1 mr-1 border-2 border-gray-400 px-2 py-1 w-40 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {`;\n    }\n}`}
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
          Untuk pemanggilan method: <strong>PerkalianTigaAngka()</strong>,
          <br />
          Untuk pernyataan pengembalian: <strong>return hasil;</strong>.
          <br />
          Dalam C#, method <code>PerkalianTigaAngka()</code> harus dipanggil
          dengan sintaks yang benar di dalam <code>Main</code> menggunakan{" "}
          <code>PerkalianTigaAngka()</code> untuk mendapatkan nilai
          kembaliannya, yang kemudian dicetak menggunakan{" "}
          <code>Console.WriteLine</code>. Method ini memiliki tipe kembalian{" "}
          <code>int</code>, sehingga memerlukan pernyataan{" "}
          <code>return hasil;</code> untuk mengembalikan nilai variabel{" "}
          <code>hasil</code>, yang merupakan hasil perkalian tiga angka (2 * 3 *
          4 = 24).
        </div>
      )}
    </div>
  );
};

export default Quiz3;
