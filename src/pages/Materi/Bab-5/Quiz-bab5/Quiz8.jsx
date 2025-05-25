import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz8 = ({ onComplete }) => {
  const [inputIteration, setInputIteration] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cek apakah ada jawaban yang diisi
    if (!inputIteration) {
      window.scrollTo(0, 0);
      Swal.fire({
        title: "Isi Semua Kolom!",
        text: "Silakan isi bagian yang kosong sebelum mengirim.",
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
    const normalizedInputIteration = normalizeAnswer(inputIteration);
    const correctIteration = "for (int j = 0; j < 2; j++)";
    const normalizedCorrectIteration = normalizeAnswer(correctIteration);

    // Cek jawaban (case insensitive dan ignore spaces)
    if (normalizedInputIteration === normalizedCorrectIteration) {
      // Jika benar, simpan dengan format yang benar (kapitalisasi sesuai jawaban benar)
      const formattedAnswer = inputIteration.replace(/\s+/g, " ").trim();
      const correctFormatted = correctIteration;

      // Jika hanya masalah kapitalisasi, gunakan format yang benar
      if (
        normalizeAnswer(formattedAnswer) === normalizeAnswer(correctFormatted)
      ) {
        setInputIteration(correctFormatted);
      }

      // Set showExplanation to true to display the explanation
      setShowExplanation(true);

      Swal.fire({
        title: "Jawaban Anda Benar!",
        text: "Silahkan lanjut ke materi berikutnya.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        onComplete(true);
      });
    } else {
      window.scrollTo(0, 0);
      setInputIteration("");
      setShowExplanation(false);
      Swal.fire({
        title: "Jawaban Salah!",
        text: "Baca Kembali Materi dan Coba Lagi.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleReset = () => {
    setInputIteration("");
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
        <p className="mt-2 text-gray-600">
          Lengkapilah bagian kode yang kosong (tanda // ...) agar program
          menampilkan seluruh kombinasi pasangan bilangan dari 0 sampai 1, dalam
          bentuk i j:
        </p>

        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`public class Quiz\n{\n    public static void Main()\n    {\n        for (int i = 0; i < 2; i++)\n        {\n            `}
              <input
                type="text"
                value={inputIteration}
                onChange={(e) => setInputIteration(e.target.value)}
                className="border-2 border-gray-400 px-2 py-1 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban..."
              />
              {`\n            {\n                Console.WriteLine(i + " " + j);\n            }\n        }\n    }\n}`}
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
          Jawaban yang benar adalah: <code>for (int j = 0; j &lt; 2; j++)</code>
          .
          <br />
          Dalam perulangan <code>for</code> di C#, inisialisasi{" "}
          <code>int j = 0</code> menetapkan variabel kontrol <code>j</code>{" "}
          mulai dari 0. Kondisi <code>j &lt; 2</code> memastikan perulangan
          berjalan selama nilai <code>j</code> kurang dari 2. Iterasi{" "}
          <code>j++</code> meningkatkan nilai <code>j</code> sebesar 1 pada
          setiap iterasi, sehingga mencetak kombinasi pasangan bilangan dari 0
          sampai 1.
        </div>
      )}
    </div>
  );
};

export default Quiz8;
