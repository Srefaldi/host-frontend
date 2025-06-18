import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz4 = ({ onComplete }) => {
  const [var1, setVar1] = useState("");
  const [var2, setVar2] = useState("");
  const [var3, setVar3] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty inputs
    if (!var1 || !var2 || !var3) {
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
    const normalizedVar1 = normalizeAnswer(var1);
    const normalizedVar2 = normalizeAnswer(var2);
    const normalizedVar3 = normalizeAnswer(var3);

    // Cek jawaban
    if (
      normalizedVar1 === normalizeAnswer("0b10100100") &&
      normalizedVar2 === normalizeAnswer("164") &&
      normalizedVar3 === normalizeAnswer("0xA4")
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
          normalizedVar1,
          normalizedVar2,
          normalizedVar3
        ),
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      }).then(() => {
        setVar1("");
        setVar2("");
        setVar3("");
        setShowExplanation(false);
      });
    }
  };

  const handleReset = () => {
    setVar1("");
    setVar2("");
    setVar3("");
    setShowExplanation(false);
  };

  // Function to generate feedback for incorrect answers
  const getIncorrectFeedback = (var1, var2, var3) => {
    let feedback = "Beberapa jawaban Anda belum tepat:<br><ul>";

    // Check var1 (binary)
    if (var1 !== "0b10100100") {
      feedback += `<li>Untuk <code>var1</code>, jawaban <strong>${var1}</strong> salah. Pastikan Anda menggunakan prefiks <code>0b</code> dan format biner yang benar untuk nilai tersebut.</li>`;
    }

    // Check var2 (decimal)
    if (var2 !== "164") {
      feedback += `<li>Untuk <code>var2</code>, jawaban <strong>${var2}</strong> salah. Gunakan representasi desimal langsung tanpa prefiks.</li>`;
    }

    // Check var3 (hexadecimal)
    if (var3 !== "0xa4") {
      feedback += `<li>Untuk <code>var3</code>, jawaban <strong>${var3}</strong> salah. Pastikan Anda menggunakan prefiks <code>0x</code> dan format heksadesimal yang benar.</li>`;
    }

    feedback +=
      "</ul>Tinjau kembali materi tentang representasi bilangan . Yuk, coba lagi!";
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
          Lengkapi kode berikut agar bisa menyimpan nilai 164 dalam bentuk
          biner, desimal, dan heksadesimal ...
        </p>

        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`int var1 = `}
              <input
                type="text"
                value={var1}
                onChange={(e) => setVar1(e.target.value)}
                className="border border-gray-400 mb-2 px-2 py-1 w-32 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {`;\nint var2 = `}
              <input
                type="text"
                value={var2}
                onChange={(e) => setVar2(e.target.value)}
                className="border border-gray-400 px-2 mb-2 py-1 w-32 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {`;\nint var3 = `}
              <input
                type="text"
                value={var3}
                onChange={(e) => setVar3(e.target.value)}
                className="border border-gray-400 px-2 mb-2 py-1 w-32 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {`;\n\nConsole.WriteLine(var1);\nConsole.WriteLine(var2);\nConsole.WriteLine(var3);`}
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
          Dalam C#, nilai tersebut dapat direpresentasikan dalam tiga bentuk:
          biner menggunakan prefiks <code>0b</code>, desimal langsung, dan
          heksadesimal menggunakan prefiks <code>0x</code>. Ketiganya memiliki
          nilai yang sama saat disimpan sebagai <code>int</code>.
        </div>
      )}
    </div>
  );
};

export default Quiz4;
