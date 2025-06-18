import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz2 = ({ onComplete }) => {
  const [inputCall1, setInputCall1] = useState("");
  const [inputCall2, setInputCall2] = useState("");
  const [inputMethod, setInputMethod] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  // Function to normalize answers (remove spaces and make lowercase)
  const normalizeAnswer = (answer) => {
    return answer.replace(/\s+/g, "").toLowerCase();
  };

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
      Swal.fire({
        title: "Jawaban Anda Belum Tepat!",
        html: getIncorrectFeedback(inputCall1, inputCall2, inputMethod),
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      }).then(() => {
        window.scrollTo(0, 0);
        setInputCall1("");
        setInputCall2("");
        setInputMethod("");
        setShowExplanation(false);
        onComplete(false);
      });
    }
  };

  const handleReset = () => {
    setInputCall1("");
    setInputCall2("");
    setInputMethod("");
    setShowExplanation(false);
  };

  // Function to generate feedback for incorrect answers
  const getIncorrectFeedback = (call1, call2, method) => {
    let feedback = "Jawaban Anda belum tepat. Berikut adalah masalahnya:<ul>";

    if (normalizeAnswer(call1) !== normalizeAnswer("TampilkanPesan();")) {
      feedback += `<li><strong>Pemanggilan pertama (${call1})</strong> salah. Pemanggilan method harus menggunakan nama method yang benar diikuti tanda kurung dan titik koma. Pastikan sintaksis pemanggilan sesuai dengan nama method yang didefinisikan. Tinjau kembali materi tentang pemanggilan method di C#. </li>`;
    }
    if (normalizeAnswer(call2) !== normalizeAnswer("TampilkanPesan();")) {
      feedback += `<li><strong>Pemanggilan kedua (${call2})</strong> salah. Pemanggilan method harus menggunakan nama method yang benar diikuti tanda kurung dan titik koma. Pastikan sintaksis pemanggilan sesuai dengan nama method yang didefinisikan. Tinjau kembali materi tentang pemanggilan method di C#. </li>`;
    }
    if (normalizeAnswer(method) !== normalizeAnswer("TampilkanPesan()")) {
      if (method.trim().length === 0) {
        feedback += `<li><strong>Nama method (kosong)</strong> salah. Nama method harus diisi dengan nama yang sesuai, diikuti tanda kurung, tanpa titik koma. Tinjau kembali materi tentang definisi method di C#. </li>`;
      } else {
        feedback += `<li><strong>Nama method (${method})</strong> salah. Nama method harus sesuai dengan yang dipanggil, diikuti tanda kurung, tanpa titik koma. Pastikan Anda tidak menambahkan kata kunci seperti <code>static</code> atau <code>void</code> di sini. Tinjau kembali materi tentang definisi method di C#. </li>`;
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
          Lengkapilah kode berikut agar method TampilkanPesan() menampilkan
          pesan sebanyak tiga kali. Method ini tidak menggunakan parameter dan
          tidak mengembalikan nilai.
        </p>

        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
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
          Jawaban Anda benar. Method dalam kode ini dipanggil tiga kali untuk
          menampilkan pesan "Selamat Belajar Method di C#!" sebanyak tiga kali:
          <ul>
            <li>
              Pemanggilan pertama: <code>{inputCall1}</code>
            </li>
            <li>
              Pemanggilan kedua: <code>{inputCall2}</code>
            </li>
            <li>
              Nama method: <code>{inputMethod}</code>
            </li>
          </ul>
          Dalam C#, pemanggilan method menggunakan nama method diikuti tanda
          kurung dan titik koma (<code>MethodName();</code>). Definisi method
          menggunakan nama method diikuti tanda kurung tanpa titik koma, dengan
          tipe <code>void</code> jika tidak mengembalikan nilai.
        </div>
      )}
    </div>
  );
};

export default Quiz2;
