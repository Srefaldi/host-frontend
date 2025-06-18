import React, { useState } from "react";
import Swal from "sweetalert2";

// Quiz component for multiple-choice questions
const Quiz = ({ onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showCompiler, setShowCompiler] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAnswer) {
      Swal.fire({
        title: "Pilih Jawaban!",
        text: "Silakan pilih salah satu opsi sebelum mengirim.",
        icon: "warning",
        confirmButtonText: "OK",
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
        onComplete();
      });
    } else {
      Swal.fire({
        title: "Jawaban Anda Belum Tepat!",
        html: `Pilihan Anda <strong>${getOptionText(
          selectedAnswer
        )}</strong> bukan hal utama yang perlu diperhatikan dalam memilih tipe data. Perhatikan jenis data yang akan disimpan dan bagaimana data tersebut akan digunakan dalam program. Coba tinjau kembali materi tentang tipe data di C#. Yuk, coba lagi!`,
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

  // Reset quiz state
  const handleReset = () => {
    setSelectedAnswer("");
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
        Yang perlu diperhatikan dalam memilih tipe data untuk sebuah variabel
        ...
      </p>
      <form onSubmit={handleSubmit}>
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
        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-4 sm:flex-row">
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
              src="https://dotnetfiddle.net/Widget/60SVzk"
              frameBorder="0"
            ></iframe>
          </div>
        )}
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
          Jawaban yang benar adalah:{" "}
          <strong>B. Kapan dan untuk apa tipe data tersebut digunakan</strong>
          <br />
          Penjelasan: Tipe data digunakan untuk menentukan jenis data yang dapat
          disimpan dalam variabel dan bagaimana data tersebut dapat digunakan
          dalam program.
        </div>
      )}
    </div>
  );
};

// Helper function for option text
const getOptionText = (option) => {
  switch (option) {
    case "A":
      return "Lokasi penyimpanan variabel di dalam memori";
    case "B":
      return "Kapan dan untuk apa tipe data tersebut digunakan";
    case "C":
      return "Cara menuliskan nama variabel dalam bahasa pemrograman";
    case "D":
      return "Ukuran layar untuk menampilkan variabel";
    case "E":
      return "Warna teks variabel pada editor kode";
    default:
      return "";
  }
};

export default Quiz;
