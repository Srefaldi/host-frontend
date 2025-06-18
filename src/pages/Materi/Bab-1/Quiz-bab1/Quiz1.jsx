import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz = ({ onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const correctAnswer = "B";
    const correctAnswerText = getOptionText(correctAnswer);
    const explanation =
      "Hasil dari kompilasi program C# adalah CIL (Common Intermediate Language), yang kemudian dijalankan oleh CLR (Common Language Runtime).";

    if (selectedAnswer === "") {
      Swal.fire({
        title: "Pilih Jawaban!",
        text: "Silakan pilih salah satu opsi sebelum mengirim.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    if (selectedAnswer === correctAnswer) {
      console.log("Correct answer selected");
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
      console.log("Incorrect answer selected:", selectedAnswer);
      Swal.fire({
        title: "Jawaban Anda Belum Tepat!",
        html: `Pilihan Anda <strong>${getOptionText(
          selectedAnswer
        )}</strong> bukan hasil dari kompilasi program C#. Coba tinjau kembali materi tentang proses kompilasi C#. Yuk, coba lagi!`,
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
    console.log("Resetting answer");
    setSelectedAnswer("");
    setShowExplanation(false);
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
          Hasil dari kompilasi program C# ...
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
            className="px-4 py-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
          >
            Hapus Jawaban
          </button>
        </div>
      </form>
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
          Jawaban yang benar adalah:{" "}
          <strong>B. CIL (Common Intermediate Language)</strong>
          <br />
          {getOptionText("B")} merupakan kepanjangan dari CIL, yang kemudian
          dijalankan oleh CLR (Common Language Runtime).
        </div>
      )}
    </div>
  );
};

const getOptionText = (option) => {
  switch (option) {
    case "A":
      return "Binary langsung";
    case "B":
      return "CIL (Common Intermediate Language)";
    case "C":
      return "Java bytecode";
    case "D":
      return "Assembly language";
    case "E":
      return "HTML";
    default:
      return "";
  }
};

export default Quiz;
