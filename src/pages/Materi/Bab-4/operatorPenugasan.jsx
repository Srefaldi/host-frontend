import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import QuizAssignment from "./Quiz-bab4/Quiz4";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import Swal from "sweetalert2";

const OperatorAssignment = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();
  const { completedLessons } = useSelector((state) => state.auth);
  const currentLessonPath = "/materi/bab4/operator-assignment";

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
    navigate("/materi/bab4/operator-comparison");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab4/operator-increment-decrement");
  };

  // Debugging state changes
  useEffect(() => {
    console.log("quizCompleted:", quizCompleted, "quizPassed:", quizPassed);
  }, [quizCompleted, quizPassed]);

  return (
    <div>
      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center">
          BAB 4 - OPERATOR
        </h1>
        <h2 className="mb-4 text-2xl font-bold">Operator Penugasan</h2>
        <p className="mb-2">
          Operator penugasan (Assignment Operator) merupakan operator untuk
          memberikan tugas pada variabel. Dalam pemrograman C#, operator
          penugasan berguna untuk menetapkan nilai ke variabel. Termasuk
          operator penugasan sederhana (<code>=</code>), serta operator
          penugasan gabungan seperti <code>+=</code>, <code>-=</code>,{" "}
          <code>*=</code>, dan <code>/=</code>. Operator ini tidak hanya
          memberikan nilai tetapi juga melakukan operasi secara bersamaan.
          Misalnya, operator <code>+=</code> menambahkan operan sebelah kanan ke
          operan sebelah kiri dan menetapkan hasilnya ke operan sebelah kiri.
        </p>
        <p className="mb-2">
          Berikut adalah daftar <strong>Operator Assignment</strong> dalam C#:
        </p>
        <p className="text-sm italic text-center text-gray-600">
          Tabel 4.3 Tabel daftar simbol operator penugasan
        </p>
        <div className="flex justify-center p-4 mt-2 mb-6">
          <table className="text-center border border-gray-300">
            <thead className="bg-[#68217A] text-white text-center">
              <tr>
                <th className="p-2 text-white border border-gray-300">
                  Nama Operator
                </th>
                <th className="p-2 text-white border border-gray-300">
                  Simbol
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300">Pengisian Nilai</td>
                <td className="p-2 border border-gray-300">=</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">
                  Pengisian dan Penambahan
                </td>
                <td className="p-2 border border-gray-300">+=</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">
                  Pengisian dan Pengurangan
                </td>
                <td className="p-2 border border-gray-300">-=</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">
                  Pengisian dan Perkalian
                </td>
                <td className="p-2 border border-gray-300">*=</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">
                  Pengisian dan Pembagian
                </td>
                <td className="p-2 border border-gray-300">/=</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">
                  Pengisian dan Sisa Bagi
                </td>
                <td className="p-2 border border-gray-300">%=</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-2 font-bold">Contoh kasus operator penugasan:</p>
        <p className="text-sm italic text-center text-gray-600">
          Tabel 4.4 Tabel daftar contoh kasus operator penugasan
        </p>
        <div className="flex justify-center p-4 mt-2 mb-6">
          <table className="text-center border border-gray-300">
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
                <td className="p-2 border border-gray-300">+=</td>
                <td className="p-2 border border-gray-300">
                  Penjumlahan dan Penugasan
                </td>
                <td className="p-2 border border-gray-300">a += 30</td>
                <td className="p-2 border border-gray-300">45</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">-=</td>
                <td className="p-2 border border-gray-300">
                  Pengurangan dan Penugasan
                </td>
                <td className="p-2 border border-gray-300">a -= 12</td>
                <td className="p-2 border border-gray-300">3</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">*=</td>
                <td className="p-2 border border-gray-300">
                  Perkalian dan Penugasan
                </td>
                <td className="p-2 border border-gray-300">a *= 5</td>
                <td className="p-2 border border-gray-300">75</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">/=</td>
                <td className="p-2 border border-gray-300">
                  Pembagian dan Penugasan
                </td>
                <td className="p-2 border border-gray-300">a /= 3</td>
                <td className="p-2 border border-gray-300">5</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">%=</td>
                <td className="p-2 border border-gray-300">
                  Modulus dan Penugasan
                </td>
                <td className="p-2 border border-gray-300">a %= 6</td>
                <td className="p-2 border border-gray-300">3</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-2 font-bold">Contoh Penerapan Operator</p>
        <p className="mb-2">
          Berikut contoh pengimplementasian operator penugasan pada kode program
          bahasa C# :
        </p>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler:</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/XF1gC5"
          ></iframe>
        </div>
      </div>

      {/* Kuis */}
      <QuizAssignment onComplete={handleQuizComplete} />

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

export default OperatorAssignment;
