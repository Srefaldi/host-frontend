import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz1 = ({ onComplete }) => {
  const [inputCondition, setInputCondition] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty input
    if (!inputCondition) {
      Swal.fire({
        title: "Isi Jawaban!",
        text: "Silakan isi kolom jawaban sebelum mengirim.",
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
    const correctCondition = 'jenisHewan == "Kucing"'; // Kondisi yang benar
    const normalizedCorrectCondition = normalizeAnswer(correctCondition);

    // Cek jawaban
    if (normalizedInputCondition === normalizedCorrectCondition) {
      setShowExplanation(true);
      window.scrollTo(0, document.body.scrollHeight);
      Swal.fire({
        title: "Jawaban Anda Benar!",
        text: "Silakan lanjut pelajari materi pernyataan if bersarang.",
        icon: "success",
        confirmButtonText: "Lanjut",
        confirmButtonColor: "#6E2A7F",
      }).then(() => {
        onComplete(true);
      });
    } else {
      Swal.fire({
        title: "Jawaban Anda Belum Tepat!",
        html: getIncorrectFeedback(inputCondition),
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      }).then(() => {
        window.scrollTo(0, 0);
        setInputCondition("");
        setShowExplanation(false);
      });
    }
  };

  const handleReset = () => {
    setInputCondition("");
    setShowExplanation(false);
  };

  // Function to generate feedback for incorrect answers
  const getIncorrectFeedback = (input) => {
    const normalizedInput = input.replace(/\s+/g, "").toLowerCase();
    if (normalizedInput.includes("!=") || normalizedInput.includes("!==")) {
      return `Jawaban Anda <strong>${input}</strong> salah. Operator ketidaksetaraan seperti <code>!=</code> akan memberikan hasil sebaliknya dari yang diinginkan. Gunakan operator kesetaraan untuk memeriksa apakah <code>jenisHewan</code> adalah <code>"Kucing"</code>. Tinjau kembali materi tentang operator perbandingan. Yuk, coba lagi!`;
    } else if (
      !normalizedInput.includes("==") &&
      !normalizedInput.includes("=")
    ) {
      return `Jawaban Anda <strong>${input}</strong> tidak tepat. Kondisi harus menggunakan operator kesetaraan untuk membandingkan <code>jenisHewan</code> dengan <code>"Kucing"</code>. Tinjau kembali materi tentang pernyataan <code>if</code>. Yuk, coba lagi!`;
    } else if (
      !normalizedInput.includes('"kucing"') &&
      !normalizedInput.includes("'kucing'")
    ) {
      return `Jawaban Anda <strong>${input}</strong> salah. Nilai string <code>"Kucing"</code> harus ditulis dengan tanda kutip dan huruf kapital yang sesuai. Tinjau kembali materi tentang tipe data string. Yuk, coba lagi!`;
    } else {
      return `Jawaban Anda <strong>${input}</strong> belum tepat. Periksa kembali sintaksis kondisi, pastikan menggunakan operator kesetaraan dan nilai string yang benar. Tinjau kembali materi tentang pernyataan <code>if</code>. Yuk, coba lagi!`;
    }
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
        <p className="mb-4 text-gray-700">
          Terdapat program mengenai penentuan makanan hewan berdasarkan
          jenisnya. Dengan kondisi berikut:
          <br />
          <p className="ml-2">
            • Jika jenis hewan adalah kucing maka diberikan makan ikan.
          </p>
          <p className="ml-2">
            • Jika jenis hewan lain maka diberikan makan sayur.
          </p>
          <p>Lengkapilah potongan kode di bawah ini:</p>
        </p>
        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`string jenisHewan = "Kucing"; \n\nif (`}
              <input
                type="text"
                value={inputCondition}
                onChange={(e) => setInputCondition(e.target.value)}
                className="ml-1 mr-1 border border-gray-400 px-1 py-1 w-40 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {`) \n{ \n    Console.WriteLine("diberikan makan ikan"); \n} \nelse \n{ \n    Console.WriteLine("diberikan makan sayur"); \n}`}
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
          Dalam C#, pernyataan <code>if</code> digunakan untuk memeriksa kondisi
          tertentu dan menjalankan blok kode berdasarkan hasil evaluasi kondisi
          tersebut.
        </div>
      )}
    </div>
  );
};

export default Quiz1;
