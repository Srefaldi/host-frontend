import React, { useState } from "react";
import Swal from "sweetalert2";

const Quiz3 = ({ onComplete }) => {
  const [inputPreIncrement, setInputPreIncrement] = useState("");
  const [inputPostIncrement, setInputPostIncrement] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Input validation
    if (!inputPreIncrement || !inputPostIncrement) {
      Swal.fire({
        title: "Isi Semua Jawaban!",
        text: "Silakan isi semua kolom jawaban sebelum mengirim.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#6E2A7F",
      });
      return;
    }

    // Normalizing answer function
    const normalizeAnswer = (ans) => {
      return ans.trim().replace(/\s+/g, " ").toLowerCase();
    };

    // Normalize user input
    const normalizedInputPreIncrement = normalizeAnswer(inputPreIncrement);
    const normalizedInputPostIncrement = normalizeAnswer(inputPostIncrement);

    // Answer verification
    if (
      normalizedInputPreIncrement === normalizeAnswer("++") &&
      normalizedInputPostIncrement === normalizeAnswer("++")
    ) {
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
        html: getIncorrectFeedback(
          normalizedInputPreIncrement,
          normalizedInputPostIncrement
        ),
        icon: "error",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#EF4444",
      }).then(() => {
        setInputPreIncrement("");
        setInputPostIncrement("");
        setShowExplanation(false);
      });
    }
  };

  const handleReset = () => {
    setInputPreIncrement("");
    setInputPostIncrement("");
    setShowExplanation(false);
  };

  // Feedback function for incorrect answers
  const getIncorrectFeedback = (preInc, postInc) => {
    let feedback = "Beberapa jawaban Anda belum tepat:<br><ul>";

    // Check pre-increment input
    if (preInc !== "++") {
      feedback += `<li>Untuk <code>pre-increment</code>, operator <strong>${preInc}</strong> salah. Gunakan operator yang menambahkan nilai variabel sebelum digunakan.</li>`;
    }

    // Check post-increment input
    if (postInc !== "++") {
      feedback += `<li>Untuk <code>post-increment</code>, operator <strong>${postInc}</strong> salah. Gunakan operator yang menambahkan nilai variabel setelah digunakan.</li>`;
    }

    feedback +=
      "</ul>Tinjau kembali materi tentang operator increment. Yuk, coba lagi!";
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

      <form onSubmit={handleSubmit}>
        <p className="mt-2 text-gray-600">
          Lengkapilah bagian kode yang hilang dengan operator increment yang
          benar untuk pre-increment dan post-increment ...
        </p>

        <div className="p-4 mt-3 mb-4 font-mono text-sm bg-gray-100 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <code>
              {`
public class SoalIncrement
{
    public static void Main(string[] args)
    {
        int a = 5;
        Console.WriteLine("Hasil Pre-Increment: " + `}
              <input
                type="text"
                value={inputPreIncrement}
                onChange={(e) => setInputPreIncrement(e.target.value)}
                className="ml-1 mr-1 border border-gray-400 px-1 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {`a);
        Console.WriteLine("Hasil Setelah Pre-Increment: " + a);

        int b = 5;
        Console.WriteLine("Hasil Post-Increment: " + b`}
              <input
                type="text"
                value={inputPostIncrement}
                onChange={(e) => setInputPostIncrement(e.target.value)}
                className="ml-1 mr-1 border border-gray-400 px-1 py-1 w-20 mb-2 rounded-md focus:ring-2 focus:ring-[#6E2A7F]"
                placeholder="Jawaban ..."
              />
              {`);
        Console.WriteLine("Hasil Setelah Post-Increment: " + b);
    }
}
              `}
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
              viewBox="0 0 24 24"
              className="flex-shrink-0 w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4"
              />
            </svg>
            BENAR
          </div>
          Dalam C#, operator increment digunakan untuk menambah nilai variabel.
          Pre-increment menambah nilai sebelum digunakan, sedangkan
          post-increment menambah nilai setelah digunakan.
        </div>
      )}
    </div>
  );
};

export default Quiz3;
