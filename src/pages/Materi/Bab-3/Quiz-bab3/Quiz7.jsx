import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz7 = ({ onComplete }) => {
  const [charValue1, setCharValue1] = useState("");
  const [charValue2, setCharValue2] = useState("");
  const [charValue3, setCharValue3] = useState("");
  const [output1, setOutput1] = useState("");
  const [output2, setOutput2] = useState("");
  const [output3, setOutput3] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty inputs
    if (
      !charValue1 ||
      !charValue2 ||
      !charValue3 ||
      !output1 ||
      !output2 ||
      !output3
    ) {
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
    const normalizedCharValue1 = normalizeAnswer(charValue1);
    const normalizedCharValue2 = normalizeAnswer(charValue2);
    const normalizedCharValue3 = normalizeAnswer(charValue3);
    const normalizedOutput1 = normalizeAnswer(output1);
    const normalizedOutput2 = normalizeAnswer(output2);
    const normalizedOutput3 = normalizeAnswer(output3);

    // Cek jawaban
    if (
      normalizedCharValue1 === normalizeAnswer("'b'") &&
      normalizedCharValue2 === normalizeAnswer("'7'") &&
      normalizedCharValue3 === normalizeAnswer("'#'") &&
      normalizedOutput1 === normalizeAnswer("huruf") &&
      normalizedOutput2 === normalizeAnswer("angka") &&
      normalizedOutput3 === normalizeAnswer("simbol")
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
          normalizedCharValue1,
          normalizedCharValue2,
          normalizedCharValue3,
          normalizedOutput1,
          normalizedOutput2,
          normalizedOutput3
        ),
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      }).then(() => {
        setCharValue1("");
        setCharValue2("");
        setCharValue3("");
        setOutput1("");
        setOutput2("");
        setOutput3("");
        setShowExplanation(false);
      });
    }
  };

  const handleReset = () => {
    setCharValue1("");
    setCharValue2("");
    setCharValue3("");
    setOutput1("");
    setOutput2("");
    setOutput3("");
    setShowExplanation(false);
  };

  // Function to generate feedback for incorrect answers
  const getIncorrectFeedback = (
    charValue1,
    charValue2,
    charValue3,
    output1,
    output2,
    output3
  ) => {
    let feedback = "Beberapa jawaban Anda belum tepat:<br><ul>";

    // Check charValue1 and output1
    if (charValue1 !== "'b'") {
      feedback += `<li>Untuk <code>huruf</code>, nilai <strong>${charValue1}</strong> salah. Gunakan karakter huruf tunggal dengan tanda kutip tunggal (<code>'</code>).</li>`;
    }
    if (output1 !== "huruf") {
      feedback += `<li>Untuk output <code>huruf</code>, jawaban <strong>${output1}</strong> salah. Gunakan kategori yang mencerminkan jenis karakter huruf.</li>`;
    }

    // Check charValue2 and output2
    if (charValue2 !== "'7'") {
      feedback += `<li>Untuk <code>angka</code>, nilai <strong>${charValue2}</strong> salah. Gunakan karakter angka tunggal dengan tanda kutip tunggal (<code>'</code>).</li>`;
    }
    if (output2 !== "angka") {
      feedback += `<li>Untuk output <code>angka</code>, jawaban <strong>${output2}</strong> salah. Gunakan kategori yang mencerminkan jenis karakter angka.</li>`;
    }

    // Check charValue3 and output3
    if (charValue3 !== "'#'") {
      feedback += `<li>Untuk <code>simbol</code>, nilai <strong>${charValue3}</strong> salah. Gunakan karakter simbol tunggal dengan tanda kutip tunggal (<code>'</code>).</li>`;
    }
    if (output3 !== "simbol") {
      feedback += `<li>Untuk output <code>simbol</code>, jawaban <strong>${output3}</strong> salah. Gunakan kategori yang mencerminkan jenis karakter simbol.</li>`;
    }

    feedback +=
      "</ul>Tinjau kembali materi tentang tipe data <code>char</code> . Yuk, coba lagi!";
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
          Lengkapi kode berikut sehingga dapat menampilkan karakter B, 7, dan #
          dengan output yang benar ...
        </p>

        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`\npublic class BelajarCSharp \n{\n    public static void Main(string[] args) \n    {\n        char huruf = `}
              <input
                type="text"
                value={charValue1}
                onChange={(e) => setCharValue1(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {`;\n        char angka = `}
              <input
                type="text"
                value={charValue2}
                onChange={(e) => setCharValue2(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {`;\n        char simbol = `}
              <input
                type="text"
                value={charValue3}
                onChange={(e) => setCharValue3(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {`;\n\n        Console.WriteLine("Huruf: " + `}
              <input
                type="text"
                value={output1}
                onChange={(e) => setOutput1(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {`);\n        Console.WriteLine("Angka: " + `}
              <input
                type="text"
                value={output2}
                onChange={(e) => setOutput2(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {`);\n        Console.WriteLine("Simbol: " + `}
              <input
                type="text"
                value={output3}
                onChange={(e) => setOutput3(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
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
          Dalam C#, tipe data <code>char</code> digunakan untuk menyimpan
          karakter tunggal seperti huruf, angka, dan simbol. Output mencerminkan
          kategori masing-masing karakter saat dicetak menggunakan{" "}
          <code>Console.WriteLine</code>.
        </div>
      )}
    </div>
  );
};

export default Quiz7;
