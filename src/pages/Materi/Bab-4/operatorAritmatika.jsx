import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import Quiz2 from "./Quiz-bab4/Quiz2";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import bab41 from "./img-bab4/1.png";
import Swal from "sweetalert2";

const OperatorAritmatika = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();
  const { completedLessons } = useSelector((state) => state.auth);
  const currentLessonPath = "/materi/bab4/operator-arithmetic";

  // Initialize quizPassed based on completedLessons
  useEffect(() => {
    if (completedLessons.includes(currentLessonPath)) {
      setQuizPassed(true);
      setQuizCompleted(true);
    }
  }, [completedLessons]);

  const handleQuizComplete = (isPassed) => {
    console.log("Quiz completed, isPassed:", isPassed);
    setQuizCompleted(true);
    setQuizPassed(isPassed);

    if (isPassed) {
      handleLessonComplete(currentLessonPath);
    }
  };

  const handleNext = () => {
    if (!quizPassed) return;

    window.scrollTo(0, 0);
    navigate("/materi/bab4/operator-increment-decrement");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab4/pengertian-operator");
  };

  useEffect(() => {
    console.log("quizCompleted:", quizCompleted, "quizPassed:", quizPassed);
  }, [quizCompleted, quizPassed]);

  return (
    <div className="mt-4 mb-4">
      <h1 className="mb-4 text-2xl font-bold text-center">BAB 4 - OPERATOR</h1>
      <h2 className="mb-4 text-2xl font-bold">Operator Aritmatika</h2>

      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <p className="mb-2">
          Operator Arithmetic (Aritmatika) dalam pemrograman, operasi
          menggunakan informasi numerik dan kemudian menggunakan data tersebut
          sering terjadi. Misalnya, informasi seperti tinggi dan berat badan
          seseorang dinyatakan sebagai nilai numerik seperti 177cm dan 58kg.
        </p>
        <p className="mb-2">
          <strong>
            Sebuah pernyataan pada operasi aritmatika biasanya tersusun dari
            satu atau lebih operand dan satu atau lebih operator yang
            merepresentasikan sebuah ekspresi,
          </strong>
          seperti terlihat pada gambar di bawah ini.
        </p>
        <figure className="w-full p-0 my-3 mt-4 text-center md:p-4 md:my-0">
          <img
            src={bab41}
            alt="Gambar 4.1 Konsep pernyataan operasi aritmatika"
            className="w-full max-w-2xl mx-auto rounded-lg"
          />
          <div className="mt-3">
            <figcaption className="text-sm text-gray-600 sm:text-base">
              Gambar 4.1. Konsep pernyataan operasi aritmatika
            </figcaption>
          </div>
        </figure>
        <p className="mb-2">
          Dalam bahasa pemrograman C#, sebuah ekspresi merupakan suatu operasi
          yang menghasilkan sebuah nilai. Pada gambar di atas, penjumlahan
          antara operand bilangan_1 dan operand bilangan_2 menghasilkan sebuah
          nilai yang kemudian ditetapkan ke dalam variabel hasil. Oleh karena
          itu, bilangan_1 + bilangan_2 merupakan sebuah ekspresi.
        </p>
        <h3 className="mt-4 text-xl font-bold">Penggunaan Operator</h3>
        <p className="mt-2">
          Untuk melakukan operasi aritmatika, C# menyediakan beberapa operator
          seperti tanda plus <code>+</code> untuk operasi penambahan, tanda
          minus <code>-</code> untuk operasi pengurangan, tanda asterik{" "}
          <code>*</code> untuk operasi perkalian, tanda garis miring{" "}
          <code>/</code> untuk operasi pembagian, dan tanda persen{" "}
          <code>%</code> untuk operasi modulus.
        </p>
        <p className="mt-2">
          Sebagai contoh, misalkan kita punya <code>a = 15</code>,{" "}
          <code>b = 10</code>.
        </p>
        <p className="mt-2 text-sm italic text-center text-gray-600">
          Tabel 4.1 Tabel daftar operator aritmatika
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
                <td className="p-2 border border-gray-300">+</td>
                <td className="p-2 border border-gray-300">Penjumlahan</td>
                <td className="p-2 border border-gray-300">a + b</td>
                <td className="p-2 border border-gray-300">25</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">-</td>
                <td className="p-2 border border-gray-300">Pengurangan</td>
                <td className="p-2 border border-gray-300">a - b</td>
                <td className="p-2 border border-gray-300">5</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">*</td>
                <td className="p-2 border border-gray-300">Perkalian</td>
                <td className="p-2 border border-gray-300">a * b</td>
                <td className="p-2 border border-gray-300">150</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">/</td>
                <td className="p-2 border border-gray-300">Pembagian</td>
                <td className="p-2 border border-gray-300">a / b</td>
                <td className="p-2 border border-gray-300">1.5</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">%</td>
                <td className="p-2 border border-gray-300">Modulus</td>
                <td className="p-2 border border-gray-300">a % b</td>
                <td className="p-2 border border-gray-300">5</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">++</td>
                <td className="p-2 border border-gray-300">Increment</td>
                <td className="p-2 border border-gray-300">a++</td>
                <td className="p-2 border border-gray-300">16</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">--</td>
                <td className="p-2 border border-gray-300">Decrement</td>
                <td className="p-2 border border-gray-300">a--</td>
                <td className="p-2 border border-gray-300">14</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">-</td>
                <td className="p-2 border border-gray-300">Minus</td>
                <td className="p-2 border border-gray-300">-a</td>
                <td className="p-2 border border-gray-300">-15</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">
          Terdapat prioritas dalam operator-operator di atas. Operator
          increment, decrement, dan minus akan dihitung terlebih dahulu,
          kemudian baru modulus, perkalian dan pembagian, terakhir barulah
          operator pengurangan dan penjumlahan. Jika perlu untuk mengubah urutan
          eksekusi, tanda kurung dapat digunakan.
        </p>
        <h3 className="mt-4 text-xl font-bold">Contoh Penerapan Operator</h3>
        <p className="mt-2">
          Penggunaan operator penjumlahan, pengurangan, dan lain-lain:
        </p>
        <p className="mt-2 text-bold">Cobalah kode program pada compiler:</p>
        <div className="flex justify-center mt-2 mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/Hb0BbF"
          ></iframe>
        </div>
      </div>

      <Quiz2 onComplete={handleQuizComplete} />

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

export default OperatorAritmatika;
