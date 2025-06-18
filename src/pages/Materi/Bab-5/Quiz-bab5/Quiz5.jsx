import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz5 = ({ onComplete }) => {
  const [inputInit, setInputInit] = useState("");
  const [inputCondition, setInputCondition] = useState("");
  const [inputIteration, setInputIteration] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const normalizeAnswer = (answer) => {
    return answer
      .replace(/[;,\s]+/g, "") // Hapus spasi, koma, dan titik koma
      .toLowerCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Periksa input kosong atau hanya berisi spasi
    if (!inputInit.trim() || !inputCondition.trim() || !inputIteration.trim()) {
      window.scrollTo(0, 0);
      Swal.fire({
        title: "Isi Semua Kolom!",
        text: "Silakan isi semua bagian sebelum mengirim.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#6E2A7F",
      });
      return;
    }

    // Normalisasi jawaban
    const normalizedInputInit = normalizeAnswer(inputInit);
    const normalizedInputCondition = normalizeAnswer(inputCondition);
    const normalizedInputIteration = normalizeAnswer(inputIteration);
    const correctInit = "int i = 1";
    const correctCondition = "i <= 10";
    const correctIteration = "i++";
    const normalizedCorrectInit = normalizeAnswer(correctInit);
    const normalizedCorrectCondition = normalizeAnswer(correctCondition);
    const normalizedCorrectIteration = normalizeAnswer(correctIteration);

    // Cek jawaban
    if (
      normalizedInputInit === normalizedCorrectInit &&
      normalizedInputCondition === normalizedCorrectCondition &&
      normalizedInputIteration === normalizedCorrectIteration
    ) {
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
      Swal.fire({
        title: "Jawaban Anda Belum Tepat!",
        html: getIncorrectFeedback(inputInit, inputCondition, inputIteration),
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      }).then(() => {
        window.scrollTo(0, 0);
        setInputInit("");
        setInputCondition("");
        setInputIteration("");
        setShowExplanation(false);
        onComplete(false); // Tambahkan penanganan untuk jawaban salah
      });
    }
  };

  const handleReset = () => {
    setInputInit("");
    setInputCondition("");
    setInputIteration("");
    setShowExplanation(false);
    // Atur fokus ke input pertama
    document.querySelector('input[placeholder="Jawaban ..."]').focus();
  };

  const getIncorrectFeedback = (init, condition, iteration) => {
    const normalizedInit = normalizeAnswer(init);
    const normalizedCondition = normalizeAnswer(condition);
    const normalizedIteration = normalizeAnswer(iteration);
    const normalizedCorrectInit = normalizeAnswer("int i = 1");
    const normalizedCorrectCondition = normalizeAnswer("i <= 10");
    const normalizedCorrectIteration = normalizeAnswer("i++");

    let feedback = "Jawaban Anda belum tepat. Berikut adalah masalahnya:<ul>";

    if (normalizedInit !== normalizedCorrectInit) {
      if (!normalizedInit.includes("int")) {
        feedback += `<li><strong>Inisialisasi (${init})</strong> salah. Harus mendeklarasikan variabel dengan tipe <code>int</code>, misalnya <code>int i = 1</code>.</li>`;
      } else if (!normalizedInit.includes("i=1")) {
        feedback += `<li><strong>Inisialisasi (${init})</strong> salah. Variabel harus dimulai dari 1, misalnya <code>int i = 1</code>, untuk mencetak angka 1 hingga 10.</li>`;
      } else {
        feedback += `<li><strong>Inisialisasi (${init})</strong> salah. Periksa sintaksis, pastikan formatnya seperti <code>int i = 1</code>.</li>`;
      }
    }

    if (normalizedCondition !== normalizedCorrectCondition) {
      if (normalizedCondition.includes("i<11")) {
        feedback += `<li><strong>Kondisi (${condition})</strong> hampir benar, tetapi gunakan <code>i <= 10</code> untuk menyamakan dengan jawaban yang diharapkan.</li>`;
      } else if (
        !normalizedCondition.includes("<=") &&
        !normalizedCondition.includes("<")
      ) {
        feedback += `<li><strong>Kondisi (${condition})</strong> salah. Gunakan operator perbandingan seperti <code><=</code> untuk memeriksa batas perulangan.</li>`;
      } else if (!normalizedCondition.includes("10")) {
        feedback += `<li><strong>Kondisi (${condition})</strong> salah. Kondisi harus memeriksa hingga nilai 10, misalnya <code>i <= 10</code>.</li>`;
      } else {
        feedback += `<li><strong>Kondisi (${condition})</strong> salah. Periksa sintaksis, pastikan formatnya seperti <code>i <= 10</code>.</li>`;
      }
    }

    if (normalizedIteration !== normalizedCorrectIteration) {
      if (
        normalizedIteration.includes("i=i+1") ||
        normalizedIteration.includes("i+=1")
      ) {
        feedback += `<li><strong>Iterasi (${iteration})</strong> hampir benar, tetapi gunakan <code>i++</code> untuk menyamakan dengan jawaban yang diharapkan.</li>`;
      } else if (!normalizedIteration.includes("++")) {
        feedback += `<li><strong>Iterasi (${iteration})</strong> salah. Gunakan <code>i++</code> untuk menambah nilai variabel sebesar 1 setiap kali.</li>`;
      } else {
        feedback += `<li><strong>Iterasi (${iteration})</strong> salah. Periksa sintaksis, pastikan formatnya seperti <code>i++</code>.</li>`;
      }
    }

    feedback += "</ul>Yuk, coba lagi!";
    return feedback;
  };

  return (
    <div className="max-w-full p-6 mx-auto mt-4 bg-white rounded-lg shadow-lg">
      <h2
        className="text-lg font-semibold text-center"
        style={{ color: "#6E2A7F" }}
      >
        UJI PENGETAHUAN
      </h2>

      <div className="mt-4">
        <p className="mt-2 text-gray-600">
          Lengkapilah bagian kode berikut dengan pernyataan for yang sesuai
          untuk mencetak angka dari 1 hingga 10.
        </p>

        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`\npublic class Quiz\n{\n    public static void Main(string[] args)\n    {\n        for (`}
              <input
                type="text"
                value={inputInit}
                onChange={(e) => setInputInit(e.target.value)}
                className="ml-1 mr-1 border border-gray-400 px-1 py-1 w-40 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {`; `}
              <input
                type="text"
                value={inputCondition}
                onChange={(e) => setInputCondition(e.target.value)}
                className="ml-1 mr-1 border border-gray-400 px-1 py-1 w-40 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {`; `}
              <input
                type="text"
                value={inputIteration}
                onChange={(e) => setInputIteration(e.target.value)}
                className="ml-1 mr-1 border border-gray-400 px-1 py-1 w-40 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {`)\n        {\n            Console.WriteLine(i);\n        }\n    }\n}`}
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
            onClick={handleSubmit}
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
      </div>

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
          Selamat! Jawaban Anda benar. Perulangan <code>for</code> yang Anda
          tulis:
          <ul>
            <li>
              <code>{inputInit}</code>: Menginisialisasi variabel <code>i</code>{" "}
              dengan nilai 1.
            </li>
            <li>
              <code>{inputCondition}</code>: Memastikan perulangan berjalan
              selama <code>i</code> kurang dari atau sama dengan 10.
            </li>
            <li>
              <code>{inputIteration}</code>: Menambah nilai <code>i</code>{" "}
              sebesar 1 setiap iterasi.
            </li>
          </ul>
          Dengan ini, kode akan mencetak angka dari 1 hingga 10.
        </div>
      )}
    </div>
  );
};

export default Quiz5;
