import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz2 = ({ onComplete }) => {
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

    const correctAnswer = "B";

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
      window.scrollTo(0, 0);
      setSelectedAnswer("");
      setShowExplanation(false);
      Swal.fire({
        title: "Jawaban Salah!",
        text: "Baca kembali materi dan coba lagi.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswer("");
    setShowExplanation(false);
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
          Yang dimaksudkan dengan statement if bersarang, kecuali . . . .
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
            B. Statement if yang dikecualikan dari statement if lainnya
          </strong>
          .
          <br />
          Nested <code>if</code> statements (pernyataan <code>if</code>{" "}
          bersarang) mengacu pada penggunaan satu atau lebih pernyataan{" "}
          <code>if</code> di dalam pernyataan <code>if</code> lain untuk
          menangani logika bersyarat yang lebih kompleks. Mari kita periksa
          setiap opsi:
          <ul className="list-disc list-inside">
            <li>
              <strong>
                A. Statement if yang menjadi target dari if atau else lain:
              </strong>{" "}
              Benar, ini menggambarkan nested <code>if</code> karena pernyataan{" "}
              <code>if</code> berada di dalam blok <code>if</code> atau{" "}
              <code>else</code> lain.
            </li>
            <li>
              <strong>
                B. Statement if yang dikecualikan dari statement if lainnya:
              </strong>{" "}
              Salah, nested <code>if</code> statements selalu berada di dalam
              pernyataan <code>if</code> lain, bukan dikecualikan.
            </li>
            <li>
              <strong>C. Statement if di dalam statement if:</strong> Benar, ini
              adalah definisi inti dari nested <code>if</code>.
            </li>
            <li>
              <strong>D. Statement if yang tidak memiliki kondisi:</strong>{" "}
              Benar, dalam konteks nested <code>if</code>, pernyataan ini salah
              karena semua <code>if</code> harus memiliki kondisi, tetapi opsi
              ini tetap mengacu pada konsep <code>if</code>.
            </li>
            <li>
              <strong>
                E. Statement if yang terpisah dari blok kode lainnya:
              </strong>{" "}
              Salah, tetapi nested <code>if</code> statements tidak "terpisah";
              mereka tertanam di dalam blok kode lain. Namun, ini masih
              berhubungan dengan konsep <code>if</code>.
            </li>
          </ul>
          Oleh karena itu, opsi B adalah jawaban yang benar karena "dikecualikan
          dari statement if lainnya" tidak menggambarkan nested <code>if</code>{" "}
          statements.
        </div>
      )}
    </div>
  );
};

const getOptionText = (option) => {
  switch (option) {
    case "A":
      return "Statement if yang menjadi target dari if atau else lain";
    case "B":
      return "Statement if yang dikecualikan dari statement if lainnya";
    case "C":
      return "Statement if di dalam statement if";
    case "D":
      return "Statement if yang tidak memiliki kondisi.";
    case "E":
      return "Statement if yang terpisah dari blok kode lainnya.";
    default:
      return "";
  }
};

export default Quiz2;
