import React, { useState } from "react";
import Swal from "sweetalert2";

// Quiz component for multiple-choice questions
const Quiz = ({ onComplete }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showCompiler, setShowCompiler] = useState(false);

  // Handle radio option change
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOption) {
      Swal.fire({
        title: "Pilih Jawaban!",
        text: "Silakan pilih salah satu opsi sebelum mengirim.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    if (selectedOption === "C") {
      setShowExplanation(true);
      Swal.fire({
        title: "Jawaban Anda Benar!",
        text: "Silakan lanjut ke materi berikutnya.",
        icon: "success",
        confirmButtonText: "Lanjut",
        confirmButtonColor: "#6E2A7F",
      }).then(() => {
        onComplete();
      });
    } else {
      setSelectedOption("");
      setShowExplanation(false);
      Swal.fire({
        title: "Jawaban Salah!",
        text: "Baca kembali materi dan coba lagi.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      }).then(() => {
        window.scrollTo(0, 0);
      });
    }
  };

  // Reset quiz state
  const handleReset = () => {
    setSelectedOption("");
    setShowExplanation(false);
    setShowCompiler(false);
  };

  // Toggle compiler visibility
  const handleTryCode = () => {
    setShowCompiler((prev) => !prev);
  };

  return (
    <div className="max-w-full p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2
        className="text-lg font-semibold text-center"
        style={{ color: "#6E2A7F" }}
      >
        UJI PENGETAHUAN
      </h2>
      <p className="mb-4 text-gray-700">
        Sintaks C# untuk membuat single line comment adalah …
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {["A", "B", "C", "D", "E"].map((option) => (
            <div key={option} className="mb-2">
              <label
                className={`flex items-center cursor-pointer p-3 rounded-lg border-2 transition duration-200 ${
                  selectedOption === option
                    ? "bg-[#6E2A7F] text-white border-[#6E2A7F]"
                    : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                }`}
              >
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                  className="hidden"
                />
                {option}. {getOptionText(option)}
              </label>
            </div>
          ))}
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row mt-4 gap-2">
          <button
            type="submit"
            style={{
              backgroundColor: "#6E2A7F",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
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
              borderRadius: "0.375rem",
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
          <button
            type="button"
            onClick={handleTryCode}
            style={{
              backgroundColor: "white",
              color: "#6E2A7F",
              border: "2px solid #6E2A7F",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              transition: "background-color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e0e0e0";
              e.currentTarget.style.borderColor = "#5B1F6A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.borderColor = "#6E2A7F";
            }}
          >
            {showCompiler ? "Sembunyikan Compiler" : "Coba di Compiler"}
          </button>
        </div>
        {showCompiler && (
          <div className="mt-6">
            <iframe
              width="100%"
              height="475"
              src="https://dotnetfiddle.net/Widget/wpjyVs"
              frameBorder="0"
            ></iframe>
          </div>
        )}
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
          Jawaban yang benar adalah: <strong>C. //</strong>
          <br />
          Dalam C#, <code>//</code> digunakan untuk membuat komentar satu baris.
          Semua teks setelah <code>//</code> hingga akhir baris akan diabaikan
          oleh compiler.
        </div>
      )}
    </div>
  );
};

// Helper function for option text
const getOptionText = (option) => {
  switch (option) {
    case "A":
      return "$$";
    case "B":
      return "&&";
    case "C":
      return "//";
    case "D":
      return "##";
    case "E":
      return "{}*{}";
    default:
      return "";
  }
};

export default Quiz;
