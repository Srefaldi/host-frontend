import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz8 = ({ onComplete }) => {
  const [inputIteration, setInputIteration] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  // Fungsi untuk normalisasi jawaban
  const normalizeAnswer = (answer) => {
    return answer
      .replace(/[;,\s]+/g, "") // Hapus spasi, koma, dan titik koma
      .toLowerCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cek apakah input kosong atau hanya berisi spasi
    if (!inputIteration.trim()) {
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

    // Normalisasi jawaban pengguna dan jawaban yang benar
    const normalizedInputIteration = normalizeAnswer(inputIteration);
    const correctIteration = "for(intj=0;j<2;j++)";
    const normalizedCorrectIteration = normalizeAnswer(correctIteration);

    // Cek jawaban
    if (normalizedInputIteration === normalizedCorrectIteration) {
      setShowExplanation(true);
      Swal.fire({
        title: "Jawaban Anda Benar!",
        text: "Silakan lanjut ke materi berikutnya.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#6E2A7F",
      }).then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        onComplete(true);
      });
    } else {
      Swal.fire({
        title: "Jawaban Anda Belum Tepat!",
        html: getIncorrectFeedback(inputIteration),
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      }).then(() => {
        window.scrollTo(0, 0);
        setInputIteration("");
        setShowExplanation(false);
        onComplete(false);
      });
    }
  };

  const handleReset = () => {
    setInputIteration("");
    setShowExplanation(false);
    // Atur fokus ke input
    document.querySelector('input[placeholder="Jawaban..."]').focus();
  };

  // Fungsi untuk menghasilkan feedback
  const getIncorrectFeedback = (iteration) => {
    const normalizedIteration = normalizeAnswer(iteration);

    let feedback = "Jawaban Anda belum tepat. Berikut adalah masalahnya:<ul>";

    if (!normalizedIteration.includes("for(")) {
      feedback += `<li><strong>Iterasi (${iteration})</strong> salah. Anda perlu menggunakan perulangan <code>for</code> untuk mencetak kombinasi pasangan bilangan. Tinjau kembali sintaksis perulangan <code>for</code> di C#.</li>`;
    } else {
      if (!normalizedIteration.includes("intj=0")) {
        feedback += `<li><strong>Iterasi (${iteration})</strong> salah. Inisialisasi variabel dalam perulangan <code>for</code> tidak tepat. Pastikan variabel dimulai dari nilai awal yang sesuai untuk mencetak bilangan dari 0 sampai 1. Tinjau kembali materi tentang perulangan <code>for</code>.</li>`;
      }
      if (
        normalizedIteration.includes("j<=2") ||
        normalizedIteration.includes("j>=2")
      ) {
        feedback += `<li><strong>Iterasi (${iteration})</strong> salah. Kondisi perulangan menghasilkan jumlah iterasi yang tidak sesuai. Pastikan kondisi hanya mencakup bilangan 0 dan 1. Tinjau kembali materi tentang perulangan <code>for</code>.</li>`;
      } else if (!normalizedIteration.includes("j<2")) {
        feedback += `<li><strong>Iterasi (${iteration})</strong> salah. Kondisi perulangan tidak tepat. Pastikan kondisi memungkinkan perulangan berjalan untuk menghasilkan bilangan 0 dan 1. Tinjau kembali materi tentang perulangan <code>for</code>.</li>`;
      }
      if (!normalizedIteration.includes("j++")) {
        if (
          normalizedIteration.includes("j--") ||
          normalizedIteration.includes("j=j-1") ||
          normalizedIteration.includes("j-=1")
        ) {
          feedback += `<li><strong>Iterasi (${iteration})</strong> hampir benar, tetapi langkah perulangan salah. Anda perlu menambah nilai variabel, bukan menguranginya, untuk mencetak bilangan dari 0 sampai 1. Tinjau kembali materi tentang perulangan <code>for</code>.</li>`;
        } else {
          feedback += `<li><strong>Iterasi (${iteration})</strong> salah. Langkah perulangan tidak tepat. Pastikan Anda menggunakan operator yang benar untuk menambah nilai variabel setiap iterasi. Tinjau kembali materi tentang perulangan <code>for</code>.</li>`;
        }
      }
    }

    feedback += "</ul>Yuk, coba lagi!";
    return feedback;
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
          Lengkapilah bagian kode yang kosong agar program menampilkan seluruh
          kombinasi pasangan bilangan dari 0 sampai 1, dalam bentuk i j:
        </p>

        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`public class Quiz\n{\n    public static void Main(string[] args)\n    {\n        for (int i = 0; i < 2; i++)\n        {\n            `}
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
          Jawaban Anda benar. Perulangan <code>for</code> yang Anda tulis (
          <code>{inputIteration}</code>) memungkinkan pencetakan semua kombinasi
          pasangan bilangan dari 0 sampai 1 dalam format <code>i j</code>.
        </div>
      )}
    </div>
  );
};

export default Quiz8;
