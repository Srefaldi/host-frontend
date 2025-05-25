import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz1 = ({ onComplete }) => {
  const [inputCondition, setInputCondition] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fungsi untuk normalisasi jawaban
    const normalizeAnswer = (answer) => {
      return answer.replace(/\s+/g, "").toLowerCase();
    };

    // Normalisasi jawaban pengguna dan jawaban yang benar
    const normalizedInputCondition = normalizeAnswer(inputCondition);
    const correctCondition = 'jenisHewan == "Kucing"'; // Kondisi yang benar
    const normalizedCorrectCondition = normalizeAnswer(correctCondition);

    // Cek jawaban
    if (normalizedInputCondition === normalizedCorrectCondition) {
      setShowExplanation(true);
      window.scrollTo(0, document.body.scrollHeight);
      Swal.fire({
        title: "Jawaban Anda Benar!",
        text: "Silakan lanjut pelajari materi pernyataan if bersarang.",
        icon: "success",
        confirmButtonText: "Lanjut",
        confirmButtonColor: "#6E2A7F",
      }).then(() => {
        onComplete(true);
      });
    } else {
      window.scrollTo(0, 0);
      setInputCondition("");
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
    setInputCondition("");
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
          Terdapat program mengenai penentuan makanan hewan berdasarkan
          jenisnya. Dengan kondisi berikut:
          <br />
          <p className="ml-2">
            • Jika jenis hewan adalah kucing maka diberikan makan ikan.
          </p>
          <p className="ml-2">
            • Jika jenis hewan lain maka diberikan makan sayur.
          </p>
          <p>Lengkapilah potongan kode di bawah ini:</p>
        </p>
        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`string jenisHewan == "Kucing"; \n\nif (`}
              <input
                type="text"
                value={inputCondition}
                onChange={(e) => setInputCondition(e.target.value)}
                className="ml-1 mr-1 border border-gray-400 px-1 py-1 w-40 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {`) \n{ \n    Console.WriteLine("diberikan makan ikan"); \n} \nelse \n{ \n    Console.WriteLine("diberikan makan sayur"); \n}`}
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
          Jawaban yang benar adalah: <strong>jenisHewan == "Kucing"</strong>.
          <br />
          Dalam C#, pernyataan <code>if (jenisHewan == "Kucing")</code>{" "}
          digunakan untuk memeriksa apakah nilai variabel{" "}
          <code>jenisHewan</code> sama dengan string <code>"Kucing"</code>.
          Operator <code>==</code> membandingkan kesetaraan, dan jika benar,
          blok kode di dalam <code>if</code> akan dieksekusi (menampilkan
          "diberikan makan ikan"). Jika salah, blok <code>else</code> akan
          dieksekusi (menampilkan "diberikan makan sayur"). Pastikan spasi dan
          tanda kutip digunakan dengan benar dalam kondisi.
        </div>
      )}
    </div>
  );
};

export default Quiz1;
