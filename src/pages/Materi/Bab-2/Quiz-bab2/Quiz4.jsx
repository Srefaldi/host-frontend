import React, { useState } from "react";
import Swal from "sweetalert2";

const QuizDeklarasiVariabel = ({ onComplete }) => {
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
        )}</strong> salah. Variabel implisit dengan <code>var</code> tidak khusus untuk tipe data integer, melainkan untuk tipe apa pun yang ditentukan kompiler. Tinjau kembali materi tentang deklarasi variabel implisit . Yuk, coba lagi!`;
      case "C":
        return `Pilihan Anda <strong>${getOptionText(
          option
        )}</strong> tidak tepat. Penggunaan bilangan genap tidak berkaitan dengan deklarasi variabel implisit. Variabel implisit digunakan saat tipe data ditentukan otomatis oleh kompiler. Tinjau kembali materi tentang deklarasi variabel implisit . Yuk, coba lagi!`;
      case "D":
        return `Pilihan Anda <strong>${getOptionText(
          option
        )}</strong> tidak benar. Variabel implisit tidak selalu untuk tipe data kompleks; mereka digunakan saat tipe data tidak diketahui atau disimpulkan kompiler. Tinjau kembali materi tentang deklarasi variabel implisit . Yuk, coba lagi!`;
      case "E":
        return `Pilihan Anda <strong>${getOptionText(
          option
        )}</strong> salah. Variabel implisit tidak terbatas pada penggunaan dalam loop; mereka dapat digunakan di mana saja selama kompiler dapat menyimpulkan tipe data. Tinjau kembali materi tentang deklarasi variabel implisit . Yuk, coba lagi!`;
      default:
        return "Jawaban Anda belum tepat. Silakan baca kembali materi tentang deklarasi variabel implisit dan coba lagi.";
    }
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
        <p className="mb-4 text-gray-700">
          Terdapat dua cara untuk mendeklarasikan variabel pada C#, eksplisit
          dan implisit. Kapan kita perlu menggunakan variabel implisit ...
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
          Jawaban yang benar adalah:{" "}
          <strong>
            B. Saat kita tidak mengetahui tipe data yang akan digunakan
          </strong>
          <br />
          Variabel implisit (dengan kata kunci <code>var</code>) digunakan saat
          tipe data tidak diketahui atau ditentukan secara otomatis oleh
          kompiler berdasarkan nilai yang diberikan, seperti dalam kasus
          ekspresi LINQ atau koleksi anonim.
        </div>
      )}
    </div>
  );
};

const getOptionText = (option) => {
  switch (option) {
    case "A":
      return "Saat kita menggunakan tipe data integer";
    case "B":
      return "Saat kita tidak mengetahui tipe data yang akan digunakan";
    case "C":
      return "Saat penggunaan dengan bilangan genap";
    case "D":
      return "Saat kita ingin mendeklarasikan variabel dengan tipe data yang lebih kompleks";
    case "E":
      return "Saat kita ingin menggunakan variabel di dalam loop saja";
    default:
      return "";
  }
};

export default QuizDeklarasiVariabel;
