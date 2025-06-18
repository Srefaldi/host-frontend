import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz4 = ({ onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty selection
    if (!selectedAnswer) {
      Swal.fire({
        title: "Pilih Jawaban!",
        text: "Silakan pilih salah satu jawaban sebelum mengirim.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#6E2A7F",
      });
      return;
    }

    const correctAnswer = "A";

    // Check answer
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
        )}</strong> salah. Dalam C#, dua konstanta <code>case</code> di dalam <code>switch</code> yang sama memang tidak boleh memiliki nilai identik, sehingga pernyataan ini benar. Tinjau kembali materi tentang struktur <code>switch</code>. Yuk, coba lagi!`;
      case "C":
        return `Pilihan Anda <strong>${getOptionText(
          option
        )}</strong> tidak tepat. Ekspresi dalam <code>switch</code> memang dapat bertipe <code>char</code>, <code>byte</code>, <code>short</code>, <code>int</code>, enumerasi, atau <code>string</code>, sehingga pernyataan ini benar. Tinjau kembali materi tentang struktur <code>switch</code>. Yuk, coba lagi!`;
      case "D":
        return `Pilihan Anda <strong>${getOptionText(
          option
        )}</strong> tidak benar. Struktur <code>switch</code> memang tidak mendukung tipe data <code>boolean</code>, sehingga pernyataan ini benar. Tinjau kembali materi tentang struktur <code>switch</code>. Yuk, coba lagi!`;
      case "E":
        return `Pilihan Anda <strong>${getOptionText(
          option
        )}</strong> salah. Dalam C#, <code>switch</code> tidak mengizinkan beberapa <code>case</code> memiliki nilai yang sama, karena setiap <code>case</code> harus unik. Pernyataan ini salah, tetapi bukan jawaban yang diminta. Tinjau kembali materi tentang struktur <code>switch</code>. Yuk, coba lagi!`;
      default:
        return "Jawaban Anda belum tepat. Silakan baca kembali materi tentang struktur <code>switch</code> dan coba lagi.";
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
          Bukan merupakan pernyataan yang tepat mengenai struktur switch dalam
          C# adalah ...
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
          Dalam C#, struktur <code>switch</code> digunakan untuk membandingkan
          nilai ekspresi dengan konstanta yang memiliki tipe data yang
          kompatibel.
        </div>
      )}
    </div>
  );
};

const getOptionText = (option) => {
  switch (option) {
    case "A":
      return "Switch statement memastikan persamaan antara sebuah nilai dari sebuah string dengan nilai variabel selain string yang ada pada case di dalam sebuah switch.";
    case "B":
      return "Dua konstanta case di dalam switch yang sama tidak boleh memiliki nilai identik.";
    case "C":
      return "Ekspresi dalam switch harus seperti char, byte, short atau int, bertipe enumerasi, atau bertipe string.";
    case "D":
      return "Switch tidak dapat digunakan dengan tipe data boolean.";
    case "E":
      return "Switch statement dapat memiliki lebih dari satu case untuk nilai sama.";
    default:
      return "";
  }
};

export default Quiz4;
