import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz8 = ({ onComplete }) => {
  const [dataType, setDataType] = useState("");
  const [stringValue, setStringValue] = useState("");
  const [output, setOutput] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty inputs
    if (!dataType || !stringValue || !output) {
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
    const normalizedDataType = normalizeAnswer(dataType);
    const normalizedStringValue = normalizeAnswer(stringValue);
    const normalizedOutput = normalizeAnswer(output);

    // Cek jawaban
    if (
      normalizedDataType === normalizeAnswer("string") &&
      normalizedStringValue === normalizeAnswer('"hello world"') &&
      normalizedOutput === normalizeAnswer("greeting")
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
          normalizedDataType,
          normalizedStringValue,
          normalizedOutput
        ),
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      }).then(() => {
        setDataType("");
        setStringValue("");
        setOutput("");
        setShowExplanation(false);
      });
    }
  };

  const handleReset = () => {
    setDataType("");
    setStringValue("");
    setOutput("");
    setShowExplanation(false);
  };

  // Function to generate feedback for incorrect answers
  const getIncorrectFeedback = (dataType, stringValue, output) => {
    let feedback = "Beberapa jawaban Anda belum tepat:<br><ul>";

    // Check dataType
    if (dataType !== "string") {
      feedback += `<li>Untuk tipe data, jawaban <strong>${dataType}</strong> salah. Gunakan tipe data yang sesuai untuk menyimpan teks dalam C#.</li>`;
    }

    // Check stringValue
    if (stringValue !== '"hello world"') {
      feedback += `<li>Untuk nilai <code>greeting</code>, jawaban <strong>${stringValue}</strong> salah. Gunakan teks dengan tanda kutip ganda (<code>"</code>) yang sesuai dengan output yang diharapkan.</li>`;
    }

    // Check output
    if (output !== "greeting") {
      feedback += `<li>Untuk output, jawaban <strong>${output}</strong> salah. Gunakan nama variabel yang sesuai untuk mencetak teks ke konsol.</li>`;
    }

    feedback +=
      "</ul>Tinjau kembali materi tentang tipe data <code>string</code> . Yuk, coba lagi!";
    return feedback;
  };

  return (
    <div className="max-w-full p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2
        className="text-lg font-semibold text-center"
        style={{ color: "#6E2A7F" }}
      >
        UJI PENGETAHUAN
      </h2>

      <form onSubmit={handleSubmit}>
        <p className="mt-2 text-gray-600">
          Lengkapi kode berikut dengan tipe data dan nilai yang benar untuk
          mencetak Hello World ...
        </p>

        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`\npublic class BelajarCSharp  \n{\n    public static void Main() \n    {\n        `}
              <input
                type="text"
                value={dataType}
                onChange={(e) => setDataType(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-20 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {` greeting = `}
              <input
                type="text"
                value={stringValue}
                onChange={(e) => setStringValue(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {`;\n        Console.WriteLine(`}
              <input
                type="text"
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-20 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
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
          Dalam C#, tipe data <code>string</code> digunakan untuk menyimpan teks
          dengan tanda kutip ganda. Variabel menyimpan nilai teks, dan
          <code>Console.WriteLine</code> mencetak nilai tersebut ke konsol.
        </div>
      )}
    </div>
  );
};

export default Quiz8;
