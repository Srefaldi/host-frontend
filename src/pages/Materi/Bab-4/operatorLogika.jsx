import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import QuizLogic from "./Quiz-bab4/Quiz6";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import Swal from "sweetalert2";

const OperatorLogika = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();
  const { completedLessons } = useSelector((state) => state.auth);
  const currentLessonPath = "/materi/bab4/operator-logika";

  // Initialize quizPassed and quizCompleted based on completedLessons
  useEffect(() => {
    if (completedLessons.includes(currentLessonPath)) {
      setQuizPassed(true);
      setQuizCompleted(true);
    }
  }, [completedLessons]);

  const handleQuizComplete = (isPassed) => {
    console.log("Quiz completed, isPassed:", isPassed); // Debugging
    setQuizCompleted(true);
    setQuizPassed(isPassed);

    if (isPassed) {
      handleLessonComplete(currentLessonPath);
    }
  };

  const handleNext = () => {
    if (!quizPassed) return; // Prevent navigation if quiz not passed
 
    window.scrollTo(0, 0);
    navigate("/materi/bab4/operator-conditional");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab4/operator-comparison");
  };

  // Debugging state changes
  useEffect(() => {
    console.log("quizCompleted:", quizCompleted, "quizPassed:", quizPassed);
    console.log("Table rendered successfully"); // Debugging table render
  }, [quizCompleted, quizPassed]);

  return (
    <div className="mt-4 mb-4">
      <h1 className="mb-4 text-2xl font-bold text-center">BAB 4 - OPERATOR</h1>
      <h2 className="mt-2 mb-4 text-2xl font-bold">Operator Logika</h2>

      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <p className="mb-2">
          <strong>Operator logika</strong> digunakan untuk membandingkan dua
          buah nilai atau lebih yang menghasilkan{" "}
          <strong>nilai boolean true</strong> atau <strong>false.</strong>
        </p>
        <p className="mb-2">
          Berikut adalah daftar<strong>Operator Logika</strong> dalam C#:
        </p>
        <p className="text-sm italic text-center text-gray-600">
          Tabel 4.6 Tabel daftar operator logika
        </p>
        <div className="flex justify-center p-4 mt-2 mb-4">
          <table className="text-center border border-gray-300 w-150">
            <thead className="bg-[#68217A] text-white text-center">
              <tr>
                <th className="p-2 text-white border border-gray-300">
                  Operator
                </th>
                <th className="p-2 text-white border border-gray-300">
                  Keterangan
                </th>
                <th className="p-2 text-white border border-gray-300">
                  Contoh
                </th>
                <th className="p-2 text-white border border-gray-300">Hasil</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300">&&</td>
                <td className="p-2 border border-gray-300">AND</td>
                <td className="p-2 border border-gray-300">
                  <code>(5 > 3) && (2 {"<"} 4)</code>
                </td>
                <td className="p-2 border border-gray-300">true</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">||</td>
                <td className="p-2 border border-gray-300">OR</td>
                <td className="p-2 border border-gray-300">
                  <code>(5 > 3) || (2 > 4)</code>
                </td>
                <td className="p-2 border border-gray-300">true</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">!</td>
                <td className="p-2 border border-gray-300">NOT</td>
                <td className="p-2 border border-gray-300">
                  <code>!(5 > 3)</code>
                </td>
                <td className="p-2 border border-gray-300">false</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-2">
          Hasil operasi dari operator logika sama seperti operator perbandingan,
          yakni boolean True dan False. Namun perlu diingat{" "}
          <strong>Operand</strong> harus bertipe boolean. Karena jika tidak,
          maka akan terjadi error.
        </p>
        <p className="mb-2">
          Jika kita mencoba membuktikan dengan tabel kebenaran logika, maka
          hasilnya akan seperti berikut :
        </p>
        <h2 className="font-bold">Operator AND (&&)</h2>
        <p className="text-sm italic text-center text-gray-600">
          Tabel 4.7 Tabel daftar operator logika AND
        </p>
        <div className="flex justify-center p-4 mt-2 mb-4">
          <table className="text-center border border-gray-300 w-150">
            <thead className="bg-[#68217A] text-white text-center">
              <tr>
                <th className="p-2 text-white border border-gray-300">
                  Pernyataan 1
                </th>
                <th className="p-2 text-white border border-gray-300">
                  Pernyataan 2
                </th>
                <th className="p-2 border border-gray-300">Hasil</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300">true</td>
                <td className="p-2 border border-gray-300">true</td>
                <td className="p-2 border border-gray-300">true</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">true</td>
                <td className="p-2 border border-gray-300">false</td>
                <td className="p-2 border border-gray-300">false</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">false</td>
                <td className="p-2 border border-gray-300">true</td>
                <td className="p-2 border border-gray-300">false</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">false</td>
                <td className="p-2 border border-gray-300">false</td>
                <td className="p-2 border border-gray-300">false</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-2">
          Operator <strong>AND</strong> akan menghasilkan nilai{" "}
          <strong>true </strong>jika dan hanya jika kedua operan bernilai{" "}
          <strong>true.</strong>
        </p>
        <h2 className="font-bold">Operator OR (||)</h2>
        <p className="text-sm italic text-center text-gray-600">
          Tabel 4.8 Tabel daftar operator logika OR
        </p>
        <div className="flex justify-center p-4 mt-2 mb-4">
          <table className="text-center border border-gray-300 w-150">
            <thead className="bg-[#68217A] text-white text-center">
              <tr>
                <th className="p-2 text-white border border-gray-300">
                  Pernyataan 1
                </th>
                <th className="p-2 text-white border border-gray-300">
                  Pernyataan 2
                </th>
                <th className="p-2 border border-gray-300">Hasil</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300">true</td>
                <td className="p-2 border border-gray-300">true</td>
                <td className="p-2 border border-gray-300">true</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">true</td>
                <td className="p-2 border border-gray-300">false</td>
                <td className="p-2 border border-gray-300">true</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">false</td>
                <td className="p-2 border border-gray-300">true</td>
                <td className="p-2 border border-gray-300">true</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">false</td>
                <td className="p-2 border border-gray-300">false</td>
                <td className="p-2 border border-gray-300">false</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-2">
          Operator OR akan menghasilkan nilai <strong>true</strong> jika salah
          satu atau kedua operan bernilai <strong>true.</strong>
        </p>
        <h2 className="font-bold">Operator NOT (!)</h2>
        <p className="text-sm italic text-center text-gray-600">
          Tabel 4.9 Tabel daftar operator logika NOT
        </p>
        <div className="flex justify-center p-4 mt-2 mb-4">
          <table className="text-center border border-gray-300 w-150">
            <thead className="bg-[#68217A] text-white text-center">
              <tr>
                <th className="p-2 text-white border border-gray-300">
                  Pernyataan 1
                </th>
                <th className="p-2 border border-gray-300">Hasil</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300">true</td>
                <td className="p-2 border border-gray-300">false</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">false</td>
                <td className="p-2 border border-gray-300">true</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-2">
          Operator <strong>NOT</strong> akan membalikkan nilai dari operan. Jika
          operan bernilai <strong>true</strong>, maka hasilnya{" "}
          <strong>false</strong>, dan sebaliknya.
        </p>
        <p className="mt-4 mb-2 font-bold">
          Cobalah kode program tersebut pada compiler:
        </p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/NuvUjg"
            frameborder="0"
          ></iframe>
        </div>
      </div>

      {/* Kuis */}
      <QuizLogic onComplete={handleQuizComplete} />

      {/* Tombol Navigasi */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="flex items-center px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
          aria-label="Kembali ke materi sebelumnya"
        >
          <img src={backIcon} alt="Kembali" className="w-5 h-5 mr-2" />
          Kembali
        </button>
        <button
          onClick={handleNext}
          disabled={!quizPassed}
          className="flex items-center justify-between"
          style={{
            backgroundColor: quizPassed ? "#6E2A7F" : "#B0B0B0",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            transition: "background-color 0.2s",
            cursor: quizPassed ? "pointer" : "not-allowed",
          }}
          onMouseEnter={(e) => {
            if (quizPassed) {
              e.currentTarget.style.backgroundColor = "#5B1F6A";
            }
          }}
          onMouseLeave={(e) => {
            if (quizPassed) {
              e.currentTarget.style.backgroundColor = "#6E2A7F";
            }
          }}
          aria-label={
            quizPassed
              ? "Lanjut ke materi berikutnya"
              : "Selesaikan kuis dengan benar untuk melanjutkan"
          }
        >
          <span>Selanjutnya</span>
          <img
            src={quizPassed ? nextIcon : lockIcon}
            alt={quizPassed ? "Selanjutnya" : "Terkunci"}
            className="w-5 h-5 ml-2"
          />
        </button>
      </div>
    </div>
  );
};

export default OperatorLogika;
