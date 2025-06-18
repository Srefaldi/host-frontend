import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import QuizFloat from "./Quiz-bab3/Quiz5";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";

const Float = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const navigate = useNavigate();
  const { handleLessonComplete, handleQuizComplete } = useOutletContext();
  const { completedLessons } = useSelector((state) => state.auth);
  const currentLessonPath = "/materi/bab3/floating-point";

  // Periksa apakah materi sudah diselesaikan saat komponen dimuat
  useEffect(() => {
    if (completedLessons.includes(currentLessonPath)) {
      setQuizCompleted(true);
      setQuizPassed(true);
    }
  }, [completedLessons, currentLessonPath]);

  // Debugging state changes
  useEffect(() => {
    console.log("quizCompleted:", quizCompleted, "quizPassed:", quizPassed);
  }, [quizCompleted, quizPassed]);

  const handleQuizCompleteLocal = (isPassed) => {
    console.log("Quiz completed, isPassed:", isPassed); // Debugging
    handleQuizComplete(currentLessonPath);
    setQuizCompleted(true);
    setQuizPassed(isPassed);
  };

  const handleNext = () => {
    if (!quizPassed) return; // Prevent navigation if quiz not passed
    handleLessonComplete(currentLessonPath);
    window.scrollTo(0, 0);
    navigate("/materi/bab3/boolean");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab3/integer");
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-center">BAB 3 - TIPE DATA</h1>
      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Tipe Data Dasar: Floating-Point</h2>
        <p className="mt-4">
          Tipe data floating-point dalam bahasa pemrograman C# digunakan untuk
          merepresentasikan bilangan desimal. Ada tiga jenis tipe data
          floating-point yang dapat digunakan pada C#:
        </p>
        <ol className="pl-6 list-decimal">
          <li>
            <strong>Tipe data float</strong>: Tipe data ini dapat digunakan
            untuk merepresentasikan bilangan desimal dengan presisi 6 atau 7
            digit angka di belakang koma. Contohnya:{" "}
            <code>float angka = 3.14f;</code>
          </li>
          <li>
            <strong>Tipe data double</strong>: Tipe data ini dapat digunakan
            untuk merepresentasikan bilangan desimal dengan presisi 15 atau 16
            digit angka di belakang koma. Contohnya:{" "}
            <code>double angka = 3.14;</code>
          </li>
          <li>
            <strong>Tipe data decimal</strong>: Tipe data ini dapat digunakan
            untuk merepresentasikan bilangan desimal dengan presisi sekitar
            28-29 digit angka di belakang koma. Contohnya:{" "}
            <code>decimal angka = 3.14m;</code>
          </li>
        </ol>
        <p className="mt-4 font-bold">
          Berikut adalah tabel perbedaan antara tipe data float, double, dan
          decimal dalam bahasa C#:
        </p>
        <div className="flex justify-center p-4 mt-2 mb-4">
          <table className="border border-gray-300">
            <thead className="bg-[#68217A] text-white text-center">
              <tr>
                <th className="p-2 text-white border border-gray-300">
                  Jenis Tipe Data
                </th>
                <th className="p-2 text-white border border-gray-300">
                  Ukuran Memori
                </th>
                <th className="p-2 text-white border border-gray-300">
                  Jangkauan
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300">float</td>
                <td className="p-2 border border-gray-300">4 byte</td>
                <td className="p-2 border border-gray-300">
                  ±1,5 x 10<sup>-45</sup> hingga ±3,4 x 10<sup>38</sup>
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">double</td>
                <td className="p-2 border border-gray-300">8 byte</td>
                <td className="p-2 border border-gray-300">
                  ±5.0 × 10<sup>-324</sup> hingga ±1,7 × 10<sup>308</sup>
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">decimal</td>
                <td className="p-2 border border-gray-300">16 byte</td>
                <td className="p-2 border border-gray-300">
                  ±1,0 x 10<sup>-28</sup> hingga ±7,9228 x 10<sup>28</sup>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">
          Ukuran Memori Penyimpanan adalah jumlah memori yang dibutuhkan untuk
          menyimpan angka tersebut. Semakin besar jangkauan, semakin banyak juga
          ruang memori yang dibutuhkan. Berbeda dengan beberapa bahasa
          pemrograman lain, C# mendukung tipe data decimal yang sering digunakan
          dalam aplikasi keuangan yang memerlukan ketelitian tinggi untuk
          representasi angka pecahan.
        </p>
        <h3 className="mt-4 text-xl font-bold">Cobalah Kode Program Berikut</h3>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/qZc3S5"
          ></iframe>
        </div>
        <p className="mt-2">
          Di awal kode program, dideklarasikan variabel <b>var1</b> bertipe{" "}
          <b>float</b>, variabel <b>var2</b> bertipe <b>double</b>, dan variabel{" "}
          <b>var3</b> bertipe <b>decimal</b>. Kemudian di baris 8-10, ketiga
          variabel ini diisi dengan angka <b>136.18</b>.
          <br />
          Perhatikan cara mengisi variabel <b>var1</b>, terdapat akhiran{" "}
          <b>F</b>, yaitu
          <code>136.18F</code>. Ini diperlukan karena secara <b>default</b>,
          semua angka pecahan di C# dianggap sebagai <b>double</b>. Akhiran{" "}
          <b>F</b> untuk proses input tipe data <b>float </b>
          harus ditulis, jika tidak akan terjadi <b>error</b>. Begitu pula
          dengan variabel <b>var3</b>
          yang bertipe <b>decimal</b>, akhiran <b>M</b> harus ditulis.
        </p>
        <h3 className="mt-4 text-xl font-bold">
          Cara Membaca (Input) Data Floating-Point
        </h3>
        <p className="mt-2">
          Proses pembacaan data di bahasa C# bisa dilakukan dengan menggunakan
          <code>Console.ReadLine()</code> dan konversi tipe data menggunakan
          Convert atau Parse. Khusus tipe data floating-point, perintah yang
          dipakai untuk proses pembacaan ini adalah:
        </p>
        <ul className="pl-6 list-disc">
          <li>
            <code>Convert.ToSingle()</code>
          </li>
          <li>
            <code>Convert.ToDouble()</code>
          </li>
          <li>
            <code>Convert.ToDecimal()</code>
          </li>
        </ul>
        <h3 className="mt-4 text-xl font-bold">Cobalah Kode Program Berikut</h3>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/g9HCuq"
          ></iframe>
        </div>
        <p className="mt-2">
          Pada kode program di atas, proses pembacaan data dilakukan menggunakan
          <b>Console.ReadLine()</b> dan dikonversi ke tipe data yang sesuai
          dengan
          <b>Convert.ToSingle()</b>, <b>Convert.ToDouble()</b>, dan{" "}
          <b>Convert.ToDecimal()</b>.
          <br />
          Setelah data dibaca, nilainya ditampilkan kembali. Untuk penggunaan
          umum, disarankan menggunakan <b>double</b> karena memiliki
          <b> jangkauan lebih besar </b> dan menjadi tipe <b>default</b> untuk
          bilangan pecahan di C#. Namun, jika membutuhkan <b>presisi tinggi</b>{" "}
          seperti dalam aplikasi keuangan, gunakan <b>decimal</b>.
        </p>
      </div>

      {/* Kuis */}
      <QuizFloat onComplete={handleQuizCompleteLocal} />

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
          disabled={!quizPassed} // Explicitly disable button when quiz not passed
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

export default Float;
