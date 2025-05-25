import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz4 = ({ onComplete }) => {
  const [inputMethodCall, setInputMethodCall] = useState("");
  const [inputParameter, setInputParameter] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty inputs
    if (!inputMethodCall || !inputParameter) {
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
    const normalizedInputMethodCall = normalizeAnswer(inputMethodCall);
    const normalizedInputParameter = normalizeAnswer(inputParameter);
    const correctMethodCall = "Sapa";
    const correctParameter = "nama";
    const normalizedCorrectMethodCall = normalizeAnswer(correctMethodCall);
    const normalizedCorrectParameter = normalizeAnswer(correctParameter);

    // Check answers
    if (
      normalizedInputMethodCall === normalizedCorrectMethodCall &&
      normalizedInputParameter === normalizedCorrectParameter
    ) {
      // If correct but has capitalization/spacing issues, correct the display
      setInputMethodCall(correctMethodCall);
      setInputParameter(correctParameter);
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
      setInputMethodCall("");
      setInputParameter("");
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
    setInputMethodCall("");
    setInputParameter("");
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
          Lengkapilah kode berikut agar method Sapa() menerima satu parameter
          berupa string dan mencetak sapaan ke layar dengan format "Halo,
          [nama]!"...
        </p>

        <div className="p-4 mt-3 font-mono text-sm bg-gray-100 rounded-lg mb-4">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`public class Quiz\n{\n    public static void Main(string[] args)\n    {\n        `}
              <input
                type="text"
                value={inputMethodCall}
                onChange={(e) => setInputMethodCall(e.target.value)}
                className="ml-1 mr-1 border-2 border-gray-400 px-2 py-1 w-40 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {`("Andi");\n    }\n\n    static void Sapa(string nama)\n    {\n        Console.WriteLine("Halo, " + `}
              <input
                type="text"
                value={inputParameter}
                onChange={(e) => setInputParameter(e.target.value)}
                className="ml-1 mr-1 border-2 border-gray-400 px-2 py-1 w-40 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {`);\n    }\n}`}
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
          Untuk pemanggilan method: <strong>Sapa</strong>,
          <br />
          Untuk parameter: <strong>nama</strong>.
          <br />
          Dalam C#, method <code>Sapa</code> dipanggil dengan nama method
          diikuti parameter dalam tanda kurung, dalam hal ini{" "}
          <code>Sapa("Andi")</code>, untuk mengirim string "Andi" ke method.
          Parameter <code>nama</code> digunakan dalam method <code>Sapa</code>{" "}
          untuk menerima nilai string yang diteruskan, yang kemudian digabungkan
          dengan "Halo, " menggunakan operator + untuk menghasilkan output
          "Halo, Andi!" ke layar melalui <code>Console.WriteLine</code>.
        </div>
      )}
    </div>
  );
};

export default Quiz4;
