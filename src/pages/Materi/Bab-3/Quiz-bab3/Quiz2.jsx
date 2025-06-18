import React, { useState } from "react";
import Swal from "sweetalert2";

const QuizKlasifikasiTipeData = ({ onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedAnswer) {
      Swal.fire({
        title: "Pilih Jawaban!",
        text: "Silakan pilih salah satu opsi sebelum mengirim.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#6E2A7F",
      });
      return;
    }

    if (selectedAnswer === "B") {
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
        html: getIncorrectFeedback(selectedAnswer),
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      }).then(() => {
        setSelectedAnswer("");
        setShowExplanation(false);
        window.scrollTo(0, 0);
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
      case "A":
        return `Pilihan Anda <strong>${getOptionText(
          option
        )}</strong> salah. <code>int</code> dan <code>string</code> adalah tipe data bawaan (built-in types) di C#, bukan mekanisme untuk mendefinisikan tipe data kustom. Tinjau kembali materi tentang user-defined types . Yuk, coba lagi!`;
      case "C":
        return `Pilihan Anda <strong>${getOptionText(
          option
        )}</strong> tidak tepat. <code>interface</code> mendefinisikan kontrak, bukan tipe data lengkap, dan <code>bool</code> adalah tipe data bawaan. Keduanya bukan cara utama untuk mendefinisikan user-defined types. Tinjau kembali materi tentang user-defined types . Yuk, coba lagi!`;
      case "D":
        return `Pilihan Anda <strong>${getOptionText(
          option
        )}</strong> tidak benar. Meskipun <code>enum</code> dan <code>record</code> dapat digunakan untuk tipe data kustom, <code>class</code> dan <code>struct</code> adalah cara utama untuk mendefinisikan user-defined types. Tinjau kembali materi tentang user-defined types . Yuk, coba lagi!`;
      case "E":
        return `Pilihan Anda <strong>${getOptionText(
          option
        )}</strong> salah. <code>delegate</code> digunakan untuk mendefinisikan tipe fungsi, dan <code>interface</code> untuk kontrak, bukan untuk mendefinisikan tipe data kustom seperti objek atau struktur. Tinjau kembali materi tentang user-defined types . Yuk, coba lagi!`;
      default:
        return "Jawaban Anda belum tepat. Silakan baca kembali materi tentang user-defined types dan coba lagi.";
    }
  };

  return (
    <div className="mt-4 max-w-full p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2
        className="text-lg font-semibold text-center"
        style={{ color: "#6E2A7F" }}
      >
        UJI PENGETAHUAN
      </h2>
      <form onSubmit={handleSubmit}>
        <p className="mb-4 text-gray-700">
          Dalam mendefinisikan user-defined types dengan menggunakan …
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
          Jawaban yang benar adalah: <strong>B. class dan struct</strong>
          <br />
          Dalam C#, user-defined types dapat didefinisikan menggunakan{" "}
          <code>class</code> dan <code>struct</code>. Kedua ini memungkinkan
          pembuatan tipe data kustom, di mana <code>class</code> adalah tipe
          referensi dan <code>struct</code> adalah tipe nilai.
        </div>
      )}
    </div>
  );
};

const getOptionText = (option) => {
  switch (option) {
    case "A":
      return "int dan string";
    case "B":
      return "class dan struct";
    case "C":
      return "interface dan bool";
    case "D":
      return "enum dan record";
    case "E":
      return "delegate dan interface";
    default:
      return "";
  }
};

export default QuizKlasifikasiTipeData;
