import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import QuizDeklarasiVariabel from "./Quiz-bab2/Quiz4";

const DeklarasiInisialisasi = () => {
  const navigate = useNavigate();
  const { handleLessonComplete, handleQuizComplete } = useOutletContext();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const { completedLessons } = useSelector((state) => state.auth);
  const currentLessonPath = "/materi/bab2/deklarasi-inialisasi";

  // Periksa apakah materi sudah diselesaikan saat komponen dimuat
  useEffect(() => {
    if (completedLessons.includes(currentLessonPath)) {
      setQuizCompleted(true);
      setQuizPassed(true);
    }
  }, [completedLessons, currentLessonPath]);

  const handleQuizCompleteLocal = (isPassed) => {
    handleQuizComplete("/materi/bab2/deklarasi-inialisasi");
    setQuizCompleted(true);
    setQuizPassed(isPassed);
    if (isPassed) {
      // Scroll ke bagian paling bawah halaman
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    handleLessonComplete("/materi/bab2/deklarasi-inialisasi");
    window.scrollTo(0, 0);
    navigate("/materi/bab2/deklarasi-banyak");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab2/kategori-variabel");
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-center">BAB 2 - VARIABEL</h1>

      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">
          2.4 Deklarasi dan Inisialisasi Variabel
        </h2>

        <p className="mt-4">
          Deklarasi variabel adalah suatu proses yang dimaksudkan untuk
          memberitahu kompiler tentang nama variabel dan tipe data yang
          diwakili. Compiler mengalokasikan ruang memori berdasarkan tipe data
          yang diwakili.
        </p>

        <p className="mt-4">
          Inisialisasi variabel adalah proses pemberian nilai awal pada sebuah
          variabel yang dapat dilakukan saat deklarasi variabel atau pada baris
          kode lainnya.
        </p>

        <h3 className="mt-4 text-xl font-bold">Cara Deklarasi Variabel</h3>

        <p className="mt-4">
          Terdapat dua cara untuk mendeklarasikan variabel di C# :
        </p>

        <ol className="mt-4 pl-6 list-decimal">
          <li>
            <strong>Eksplisit:</strong> dengan menuliskan tipe data lalu diikuti
            nama variabel.
            <pre className="mt-2 p-2 bg-gray-200 rounded">
              <code>int namaVariabel;</code>
            </pre>
            <ul className="mt-2 ml-4 list-disc">
              <li>
                <strong>Mendeklarasikan Variabel Kosong:</strong>
                <pre className="mt-2 p-2 bg-gray-200 rounded">
                  <code>
                    string alamat;
                    <br />
                    int umur;
                    <br />
                    float beratBadan;
                    <br />
                    bool isMenikah;
                  </code>
                </pre>
              </li>
              <li>
                <strong>Inisialisasi Variabel:</strong>
                <pre className="mt-2 p-2 bg-gray-200 rounded">
                  <code>
                    alamat = "Handil Bakti No. 26";
                    <br />
                    umur = 18;
                    <br />
                    beratBadan = 49.5;
                    <br />
                    isMenikah = false;
                  </code>
                </pre>
              </li>
              <li>
                <strong>Deklarasi Sekaligus Inisialisasi:</strong>
                <pre className="mt-2 p-2 bg-gray-200 rounded">
                  <code>
                    string nama = "Sopia Refaldi";
                    <br />
                    int angkatan = 10;
                    <br />
                    float nilaiAkademik = 3.84;
                  </code>
                </pre>
              </li>
            </ul>
          </li>
          <li className="mt-4">
            <strong>Implisit:</strong> apabila kita tidak mengetahui tipe data
            yang akan digunakan, maka membuat variabel dapat menggunakan kata
            kunci <code>var</code>.
            <pre className="mt-2 p-2 bg-gray-200 rounded">
              <code>var namaVariabel = 10;</code>
            </pre>
            <p className="mt-4">
              Perlu diingat, untuk pembuatan variabel dengan <code>var</code>{" "}
              harus kita isi nilainya, karena kalau tidak akan terjadi error.
            </p>
            <p className="mt-4">
              Contoh penggunaan <code>var</code> dalam mendeklarasikan variabel:
            </p>
            <pre className="mt-2 p-2 bg-gray-200 rounded">
              <code>
                var nama = "Sopia Refaldi";
                <br />
                var umur = 18;
                <br />
                var nilaiAkademik = 3.84;
              </code>
            </pre>
            <p className="mt-4">
              Dalam contoh di atas, kita menggunakan <code>var</code> untuk
              mendeklarasikan variabel <code>nama</code>, <code>umur</code>, dan{" "}
              <code>nilaiAkademik</code> tanpa perlu menyebutkan tipe datanya
              secara eksplisit.
            </p>
          </li>
        </ol>

        <h2 className="mt-4 text-xl font-bold">
          Mencetak Variabel Menggunakan Sintaks Print
        </h2>

        <p className="mt-4">
          Pada pemrograman, mencetak data ke layar merupakan salah satu fungsi
          dasar yang sangat penting untuk menampilkan hasil proses dari program
          kita. Dalam bahasa C#, kita dapat mencetak data yang tersimpan dalam
          variabel menggunakan sintaks print seperti
          <code>Console.WriteLine()</code>. Dengan cara ini, kita tidak hanya
          bisa menampilkan teks statis, tetapi juga nilai variabel seperti nama,
          angka, atau data lainnya. Materi ini akan membahas bagaimana mencetak
          variabel dengan cara yang mudah dan praktis.
        </p>

        <p className="mt-4 font-bold">Cobalah Kode Program Pada Compiler:</p>

        <iframe
          width="100%"
          height="400"
          src="https://dotnetfiddle.net/Widget/ZDE2kr"
          frameBorder="0"
          className="mt-4"
          title="C# Variable Declaration and Printing Example"
        ></iframe>
      </div>

      {/* Kuis Deklarasi Variabel */}
      <QuizDeklarasiVariabel onComplete={handleQuizCompleteLocal} />

      {/* Tombol Navigasi */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="flex items-center px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
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

export default DeklarasiInisialisasi;
