import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Quiz from "./Quiz-bab2/Quiz1";
import alur from "./img-bab2/ilustrasi.png";
import logoc from "./img-bab2/script.png"; // Note: This import is unused in the code
import memori from "./img-bab2/memori.png";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import iconBook from "../../../assets/img/book.png";
import iconTujuan from "../../../assets/img/tujuan.png";
import iconKonten from "../../../assets/img/konten.png";

const Variabel = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();

  const handleQuizComplete = () => {
    handleLessonComplete("/materi/bab2/penamaan-variabel");
    setQuizCompleted(true);
    // Scroll ke bagian paling bawah halaman
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    handleLessonComplete("/materi/bab2/variabel");
    window.scrollTo(0, 0);
    navigate("/materi/bab2/penamaan-variabel");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab1/rangkuman-bab1");
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-center">BAB 2 - VARIABEL</h1>

      {/* Pendahuluan Materi */}
      <div className="w-full mb-2 border border-gray-300 rounded-lg shadow-md">
        <h3
          className="flex items-center p-4 font-bold text-white cursor-pointer"
          style={{ backgroundColor: "#68217A" }}
        >
          <img src={iconBook} alt="Icon" className="w-8 h-8 mr-2" />
          PENDAHULUAN MATERI
          <span className="ml-2">▼</span>
        </h3>

        <div className="p-4 text-justify text-gray-700 bg-white rounded-b-lg">
          <p>
            Pada bab ini, kita akan mempelajari tentang variabel dalam bahasa
            pemrograman C#. Variabel merupakan elemen penting dalam pemrograman
            yang digunakan untuk menyimpan data. Memahami cara mendeklarasikan
            dan menggunakan variabel dengan benar akan membantu dalam
            pengembangan program yang efisien. Setelah mempelajari materi ini,
            diharapkan pembaca dapat membedakan antara variabel dan konstanta,
            serta menghindari kesalahan dalam penamaan variabel.
          </p>
        </div>
      </div>

      {/* Tujuan Pembelajaran */}
      <div className="w-full mb-2 border border-gray-300 rounded-lg shadow-md">
        <h3
          className="flex items-center p-4 font-bold text-white cursor-pointer"
          style={{ backgroundColor: "#68217A" }}
        >
          <img src={iconTujuan} alt="Icon" className="w-8 h-8 mr-2" />
          TUJUAN PEMBELAJARAN
          <span className="ml-2">▼</span>
        </h3>

        <ul className="p-4 pl-6 text-justify text-gray-700 list-disc bg-white rounded-b-lg">
          <li>Mampu memahami konsep variabel data dan klasifikasinya</li>
          <li>
            Dapat memahami konsep variabel serta dapat mendeklarasikan dan
            menginisialisasikannya
          </li>
          <li>Mampu menggunakan fungsi input pada pemrograman</li>
          <li>Dapat menghindari kesalahan dalam penulisan variabel</li>
        </ul>
      </div>

      {/* Konten Materi */}
      <div className="w-full mb-2 border border-gray-300 rounded-lg shadow-md">
        <h3
          className="flex items-center p-4 font-bold text-white cursor-pointer"
          style={{ backgroundColor: "#68217A" }}
        >
          <img src={iconKonten} alt="Icon" className="w-8 h-8 mr-2" />
          KONTEN MATERI
          <span className="ml-2">▼</span>
        </h3>

        <ul className="p-4 pl-6 text-justify text-gray-700 list-none bg-white rounded-b-lg">
          <li>2.1 Pengertian Variabel</li>
          <li>2.2 Penamaan Variabel</li>
          <li>2.3 Kategori Variabel</li>
          <li>2.4 Deklarasi dan Inisialisasi Variabel</li>
          <li>2.5 Deklarasi Banyak Variabel</li>
          <li>2.6 Variabel Konstanta</li>
          <li>2.7 Sintaks Input</li>
          <li>Rangkuman</li>
        </ul>
      </div>

      {/* Pengertian Variabel */}
      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">2.1 Pengertian Variabel</h2>

        <p className="mt-4">
          Variabel adalah suatu data yang nilainya dapat berubah-ubah. Variabel
          sangat erat kaitannya dengan tipe data. Karena keberadaan suatu data
          perlu ditentukan tipe datanya untuk pengenalan jenis dari data dan
          penentuan cara pengolahan data tersebut. Contohnya dari variabel
          seperti script di bawah ini.
        </p>

        <pre className="mt-4 p-2 bg-gray-100 rounded-lg">
          <code className="text-gray-800">int s;</code>
        </pre>

        <p className="mt-4">
          Maksud dari satu baris script di atas ialah memberi instruksi untuk
          membuat variabel "s" yang dialokasikan pada memori sebesar bit tipe
          data integer dengan nilai NULL (tidak terisi apapun). Dalam
          mempelajari bahasa pemrograman selain Assembly, kita tidak perlu
          memikirkan dimana alamat memori untuk menyimpan variabel tersebut.
          Namun yang perlu dipahami ialah kapan dan untuk apa kita memilih tipe
          data untuk suatu variabel. Dengan kata lain, kita harus tahu dan paham
          dalam penggunaan tipe data pada variabel.
        </p>

        {/* Ilustrasi Data ke Variabel */}
        <figure className="p-0 md:p-4 my-3 md:my-0 text-center w-full mt-4">
          <img
            src={alur}
            alt="Gambar 2.1 Ilustrasi Data ke Variabel"
            className="w-full max-w-md mx-auto rounded-lg"
          />
          <div className="mt-3">
            <figcaption className="text-gray-600 text-sm sm:text-base">
              Gambar 2.1. Ilustrasi Data ke Variabel
            </figcaption>
          </div>
        </figure>

        <p className="mt-4">
          Data atau nilai yang disimpan pada sebuah variabel akan disimpan ke
          dalam memori (RAM). Semakin banyak variabel atau nilai yang dibuat,
          semakin banyak ruang memori yang digunakan.
        </p>

        {/* String CsharpLearn di Memori */}
        <figure className="p-0 md:p-4 my-3 md:my-0 text-center w-full mt-4">
          <img
            src={memori}
            alt="Gambar 2.2 String 'CsharpLearn' Disimpan di Memori Komputer"
            className="w-full max-w-3xl mx-auto rounded-lg"
          />
          <div className="mt-3">
            <figcaption className="text-gray-600 text-sm sm:text-base">
              Gambar 2.2. String "CsharpLearn" Disimpan di Memori Komputer
            </figcaption>
          </div>
        </figure>
      </div>

      {/* Quiz Component - Now always visible and outside white container */}
      <div className="mb-6">
        <Quiz onComplete={handleQuizComplete} />
      </div>

      {/* Navigation Buttons - Now outside white container */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="flex items-center px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
        >
          <img src={backIcon} alt="Kembali" className="w-5 h-5 mr-2" />
          Kembali
        </button>
        <button
          onClick={quizCompleted ? handleNext : null}
          disabled={!quizCompleted}
          className="flex items-center justify-between"
          style={{
            backgroundColor: quizCompleted ? "#6E2A7F" : "#B0B0B0",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            transition: "background-color 0.2s",
            cursor: quizCompleted ? "pointer" : "not-allowed",
          }}
          onMouseEnter={(e) => {
            if (quizCompleted) {
              e.currentTarget.style.backgroundColor = "#5B1F6A";
            }
          }}
          onMouseLeave={(e) => {
            if (quizCompleted) {
              e.currentTarget.style.backgroundColor = "#6E2A7F";
            }
          }}
        >
          <span>Selanjutnya</span>
          <img
            src={quizCompleted ? nextIcon : lockIcon}
            alt={quizCompleted ? "Selanjutnya" : "Terkunci"}
            className="w-5 h-5 ml-2"
          />
        </button>
      </div>
    </div>
  );
};

export default Variabel;
