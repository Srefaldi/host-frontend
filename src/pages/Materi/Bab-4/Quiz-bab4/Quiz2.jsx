import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz2 = ({ ...props }) => {
  const [inputTambah, setInputTambah] = useState("");
  const [inputKurang, setInputKurang] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty inputs
    if (!inputTambah || !inputKurang) {
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
    const normalizedInputTambah = normalizeAnswer(inputTambah);
    const normalizedInputKurang = normalizeAnswer(inputKurang);

    // Cek jawaban
    if (
      normalizedInputTambah === normalizeAnswer("+") &&
      normalizedInputKurang === normalizeAnswer("-")
    ) {
      setShowExplanation(true);
      Swal.fire({
        title: "Jawaban Anda Benar!",
        text: "Silakan lanjut ke materi berikutnya.",
        icon: "success",
        confirmButtonText: "Lanjut",
        confirmButtonColor: "#6E2A7F",
      }).then(() => {
        props.onComplete(true);
      });
    } else {
      Swal.fire({
        title: "Jawaban Anda Belum Tepat!",
        html: getIncorrectFeedback(
          normalizedInputTambah,
          normalizedInputKurang
        ),
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      }).then(() => {
        setInputTambah("");
        setInputKurang("");
        setShowExplanation(false);
      });
    }
  };

  const handleReset = () => {
    setInputTambah("");
    setInputKurang("");
    setShowExplanation(false);
  };

  // Function to generate feedback for incorrect answers
  const getIncorrectFeedback = (inputTambah, inputKurang) => {
    let feedback = "Beberapa jawaban Anda belum tepat:<br><ul>";

    // Check inputTambah
    if (inputTambah !== "+") {
      feedback += `<li>Untuk <code>hasilTambah</code>, operator <strong>${inputTambah}</strong> salah. Gunakan operator yang menghasilkan penjumlahan dua bilangan.</li>`;
    }

    // Check inputKurang
    if (inputKurang !== "-") {
      feedback += `<li>Untuk <code>hasilKurang</code>, operator <strong>${inputKurang}</strong> salah. Gunakan operator yang menghasilkan pengurangan dua bilangan.</li>`;
    }

    feedback +=
      "</ul>Tinjau kembali materi tentang operator aritmatika. Yuk, coba lagi!";
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
          Lengkapilah bagian kode yang hilang agar program dapat melakukan
          penjumlahan dan pengurangan dua bilangan yang dimasukkan oleh pengguna
          ...
        </p>

        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`int angka1 = 15;\nint angka2 = 10;\n\nint hasilTambah = angka1 `}
              <input
                type="text"
                value={inputTambah}
                onChange={(e) => setInputTambah(e.target.value)}
                className="border border-gray-400 px-1 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {` angka2;\nint hasilKurang = angka1 `}
              <input
                type="text"
                value={inputKurang}
                onChange={(e) => setInputKurang(e.target.value)}
                className="border border-gray-400 px-1 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {` angka2;\n\nConsole.WriteLine("Hasil Penjumlahan: " + hasilTambah);\nConsole.WriteLine("Hasil Pengurangan: " + hasilKurang);`}
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
        <div className="p-4 mt-4 text-sm font-normal text-green-800 bg-green-100 border border-green-300 rounded-md">
          <div className="flex items-center mb-2 font-semibold">
            <svg
              className="flex-shrink-0 w-5 h-5 mr-2"
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
          Dalam C#, operator aritmatika digunakan untuk operasi matematika.
          Operator penjumlahan menghasilkan jumlah dua bilangan, dan operator
          pengurangan menghasilkan selisih dua bilangan.
        </div>
      )}
    </div>
  );
};

export default Quiz2;
