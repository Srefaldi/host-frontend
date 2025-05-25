import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz2 = ({ onComplete }) => {
  const [inputCall1, setInputCall1] = useState("");
  const [inputCall2, setInputCall2] = useState("");
  const [inputMethod, setInputMethod] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty inputs
    if (!inputCall1 || !inputCall2 || !inputMethod) {
      Swal.fire({
        title: "Isi Semua Jawaban!",
        text: "Silakan isi semua kolom jawaban sebelum mengirim.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#6E2A7F",
      });
      return;
    }

    const correctCall1 = "TampilkanPesan();";
    const correctCall2 = "TampilkanPesan();";
    const correctMethod = "TampilkanPesan()";

    // Function to normalize answers (remove spaces and make lowercase)
    const normalizeAnswer = (answer) => {
      return answer.replace(/\s+/g, "").toLowerCase();
    };

    // Check if answers match when normalized
    const isCorrect =
      normalizeAnswer(inputCall1) === normalizeAnswer(correctCall1) &&
      normalizeAnswer(inputCall2) === normalizeAnswer(correctCall2) &&
      normalizeAnswer(inputMethod) === normalizeAnswer(correctMethod);

    if (isCorrect) {
      // If correct but has capitalization/spacing issues, correct the display
      setInputCall1(correctCall1);
      setInputCall2(correctCall2);
      setInputMethod(correctMethod);
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
      window.scrollTo(0, 0);
      setInputCall1("");
      setInputCall2("");
      setInputMethod("");
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
    setInputCall1("");
    setInputCall2("");
    setInputMethod("");
    setShowExplanation(false);
  };

  return (
    <div className="mt-4 max-w-full p-6 mx-auto rounded-lg">
      <h2
        className="text-lg font-semibold text-center"
        style={{ color: "#6E2A7F" }}
      >
        UJI PENGETAHUAN
      </h2>

      <form onSubmit={handleSubmit}>
        <p className="mt-2 text-gray-600">
          Lengkapilah kode berikut agar method TampilkanPesan() menampilkan
          pesan sebanyak tiga kali. Method ini tidak menggunakan parameter dan
          tidak mengembalikan nilai.
        </p>

        <div className="p-4 mt-3 font-mono text-sm bg-gray-100 rounded-lg mb-4">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`public class Program\n{\n    static void Main(string[] args)\n    {\n        `}
              <input
                type="text"
                value={inputCall1}
                onChange={(e) => setInputCall1(e.target.value)}
                className="ml-1 mr-1 border-2 border-gray-400 px-2 py-1 w-40 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {`;\n        TampilkanPesan();\n        `}
              <input
                type="text"
                value={inputCall2}
                onChange={(e) => setInputCall2(e.target.value)}
                className="ml-1 mr-1 border-2 border-gray-400 px-2 py-1 w-40 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {`;\n    }\n\n     static void `}
              <input
                type="text"
                value={inputMethod}
                onChange={(e) => setInputMethod(e.target.value)}
                className="ml-1 mr-1 border-2 border-gray-400 px-2 py-1 w-40 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {` {\n        Console.WriteLine("Selamat Belajar Method di C#!");\n    }\n}`}
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
          Jawaban yang benar adalah:
          <br />
          Untuk pemanggilan pertama: <strong>TampilkanPesan();</strong>,
          <br />
          Untuk pemanggilan kedua: <strong>TampilkanPesan();</strong>,
          <br />
          Untuk nama method: <strong>TampilkanPesan()</strong>.
          <br />
          Dalam C#, method <code>TampilkanPesan()</code> harus dipanggil dengan
          sintaks yang benar, yaitu nama method diikuti tanda kurung dan titik
          koma untuk setiap pemanggilan. Dalam kode ini, method dipanggil tiga
          kali (dua kali dengan <code>TampilkanPesan();</code> yang dimasukkan
          pengguna dan sekali dalam kode yang sudah ada) untuk menampilkan pesan
          "Selamat Belajar Method di C#!" sebanyak tiga kali. Method
          didefinisikan dengan nama <code>TampilkanPesan()</code> tanpa
          parameter dan bertipe <code>void</code> karena tidak mengembalikan
          nilai.
        </div>
      )}
    </div>
  );
};

export default Quiz2;
