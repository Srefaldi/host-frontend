import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import Quiz6 from "./Quiz-bab2/Quiz6";

const VariabelKonstanta = () => {
  const navigate = useNavigate();
  const { handleLessonComplete, handleQuizComplete } = useOutletContext();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const { completedLessons } = useSelector((state) => state.auth);
  const currentLessonPath = "/materi/bab2/variabel-konstanta";

  // Periksa apakah materi sudah diselesaikan saat komponen dimuat
  useEffect(() => {
    if (completedLessons.includes(currentLessonPath)) {
      setQuizCompleted(true);
      setQuizPassed(true);
    }
  }, [completedLessons, currentLessonPath]);

  const handleQuizCompleteLocal = (isPassed) => {
    handleQuizComplete("/materi/bab2/variabel-konstanta");
    setQuizCompleted(true);
    setQuizPassed(isPassed);
  };

  const handleNext = () => {
    handleLessonComplete("/materi/bab2/variabel-konstanta");
    window.scrollTo(0, 0);
    navigate("/materi/bab2/sintaks-input");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab2/deklarasi-banyak");
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-center">BAB 2 - VARIABEL</h1>

      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">2.6 Variabel Konstanta</h2>

        <p className="mt-4">
          Variabel konstanta adalah variabel yang nilainya tidak dapat diubah
          setelah dideklarasikan. Dalam bahasa pemrograman C#, kita dapat
          mendeklarasikan variabel konstanta dengan menggunakan keyword{" "}
          <code>const</code>. Variabel konstanta biasanya digunakan untuk
          menyimpan nilai-nilai tetap yang akan digunakan dalam program, seperti
          nilai konversi atau nilai yang dipakai sebagai batas atas atau batas
          bawah.
        </p>

        <h3 className="mt-4 text-xl font-bold">Pembuatan Konstanta dalam C#</h3>

        <p className="mt-4">
          Untuk membuat konstanta dalam bahasa C#, kita menggunakan format
          berikut:
        </p>

        <p className="mt-4">
          <code>
            access_modifier const tipe_data NAMA_KONSTANTA = nilai_konstanta;
          </code>
        </p>

        <blockquote className="mt-4 ml-6">
          <p>
            • <code>access_modifier</code>: Adalah salah satu dari keyword
            public, protected, atau private.
            <br />• <code>const</code>: Merupakan keyword untuk mendeklarasikan
            variabel sebagai konstanta.
            <br />• <code>tipe_data</code>: Tipe data dari konstanta.
            <br />• <code>NAMA_KONSTANTA</code>: Adalah tempat menulis nama
            konstanta. Aturan nama konstanta ini sama seperti aturan identifier.
            Yakni bisa terdiri dari huruf, angka, dan underscore. Angka tidak
            bisa menjadi karakter pertama. Selain itu, nama konstanta ini
            ditulis dalam huruf besar semua (SNAKE_CASE).
            <br />• <code>nilai_konstanta</code>: Nilai yang akan diisi ke dalam
            konstanta.
          </p>
        </blockquote>

        <p className="mt-4 font-bold">Cobalah Kode Program Pada Compiler:</p>

        <iframe
          width="100%"
          className="mt-4 w-full aspect-[4/3]"
          src="https://dotnetfiddle.net/Widget/9rDToN"
          frameBorder="0"
          title="C# Constant Variable Example"
        ></iframe>

        <p className="mt-4 italic">
          Pada kode di atas ini terdapat tiga buah konstanta, yakni{" "}
          <code>KURS_DOLLAR</code>, <code>PI</code>, dan <code>WEBSITE</code>.
          Setiap konstanta harus dideklarasikan dengan tipe data yang sesuai,
          yaitu <code>int</code>, <code>double</code>, dan <code>string</code>.
          Ketiga konstanta tadi akan ditampilkan dengan perintah{" "}
          <code>Console.WriteLine()</code>.
        </p>
      </div>

      {/* Kuis Variabel Konstanta */}
      <Quiz6 onComplete={handleQuizCompleteLocal} />

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
          onClick={quizPassed ? handleNext : null}
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
              : "Kuis belum dijawab dengan benar"
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

export default VariabelKonstanta;