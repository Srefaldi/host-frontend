import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz7 = ({ onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cek apakah ada jawaban yang dipilih
    if (!selectedAnswer) {
      window.scrollTo(0, 0);
      Swal.fire({
        title: "Isi Semua Kolom!",
        text: "Silakan pilih jawaban sebelum mengirim.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#6E2A7F",
      });
      return;
    }

    const correctAnswer = "A"; // Jawaban yang benar

    // Cek jawaban
    if (selectedAnswer === correctAnswer) {
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
      Swal.fire({
        title: "Jawaban Anda Belum Tepat!",
        html: getIncorrectFeedback(selectedAnswer),
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      }).then(() => {
        window.scrollTo(0, 0);
        setSelectedAnswer("");
        setShowExplanation(false);
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswer("");
    setShowExplanation(false);
  };

  // Function to generate feedback for incorrect answers
  const getIncorrectFeedback = (option) => {
    switch (option) {
      case "B":
        return `Pilihan Anda <strong>${getOptionText(
          option
        )}</strong> salah. <code>break</code> dan <code>continue</code> dapat digunakan pada semua jenis perulangan seperti <code>for</code>, <code>while</code>, dan <code>do-while</code>, bukan hanya <code>while</code>. Tinjau kembali materi tentang pernyataan <code>break</code> dan <code>continue</code>. Yuk, coba lagi!`;
      case "C":
        return `Pilihan Anda <strong>${getOptionText(
          option
        )}</strong> tidak tepat. <code>break</code> tidak menghentikan seluruh program, melainkan hanya perulangan tempatnya berada. <code>continue</code> tidak menghentikan blok perulangan, tetapi melewati iterasi saat ini. Tinjau kembali materi tentang pernyataan <code>break</code> dan <code>continue</code>. Yuk, coba lagi!`;
      case "D":
        return `Pilihan Anda <strong>${getOptionText(
          option
        )}</strong> salah. <code>break</code> digunakan untuk keluar dari perulangan, bukan mengulang iterasi. Sebaliknya, <code>continue</code> melewati iterasi saat ini, bukan keluar dari perulangan. Tinjau kembali materi tentang pernyataan <code>break</code> dan <code>continue</code>. Yuk, coba lagi!`;
      case "E":
        return `Pilihan Anda <strong>${getOptionText(
          option
        )}</strong> salah. <code>break</code> dan <code>continue</code> memiliki fungsi yang berbeda dalam perulangan. <code>break</code> menghentikan perulangan, sedangkan <code>continue</code> melanjutkan ke iterasi berikutnya. Tinjau kembali materi tentang pernyataan <code>break</code> dan <code>continue</code>. Yuk, coba lagi!`;
      default:
        return "Jawaban Anda belum tepat. Silakan baca kembali materi tentang pernyataan <code>break</code> dan <code>continue</code> dan coba lagi.";
    }
  };

  return (
    <div className="max-w-full p-6 mx-auto mt-4 rounded-lg">
      <h2
        className="text-lg font-semibold text-center"
        style={{ color: "#6E2A7F" }}
      >
        UJI PENGETAHUAN
      </h2>
      <form onSubmit={handleSubmit}>
        <p className="mb-4 text-gray-700">
          Pilihlah pernyataan yang paling tepat mengenai perbedaan utama antara
          break dan continue dalam perulangan ...
        </p>
        <div className="mb-4">
          {["A", "B", "C", "D", "E"].map((option) => (
            <div key={option} className="mb-2">
              <label
                className={`flex items-center cursor-pointer p-3 rounded-lg border-2 transition duration-200 ${
                  selectedAnswer === option
                    ? "bg-[#6E2A7F] text-white border-[#6E2A7F]"
                    : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                }`}
              >
                <input
                  type="radio"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="hidden"
                />
                {option}. {getOptionText(option)}
              </label>
            </div>
          ))}
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
            Kirim
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
              marginLeft: "1rem",
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
          Dalam C#, <code>break</code> menghentikan seluruh perulangan,
          sedangkan <code>continue</code> melewati iterasi saat ini dan
          melanjutkan ke iterasi berikutnya.
        </div>
      )}
    </div>
  );
};

const getOptionText = (option) => {
  switch (option) {
    case "A":
      return "break menghentikan seluruh perulangan, sedangkan continue melewati iterasi saat ini dan melanjutkan ke iterasi berikutnya.";
    case "B":
      return "break hanya bekerja pada perulangan while, sedangkan continue bekerja pada semua jenis perulangan.";
    case "C":
      return "break menghentikan program sepenuhnya, sedangkan continue menghentikan blok perulangan saat ini.";
    case "D":
      return "break digunakan untuk mengulang iterasi, sedangkan continue digunakan untuk keluar dari perulangan.";
    case "E":
      return "Tidak ada perbedaan antara break dan continue.";
    default:
      return "";
  }
};

export default Quiz7;
