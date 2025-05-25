import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import iconBook from "../../../assets/img/book.png";
import iconTujuan from "../../../assets/img/tujuan.png";
import iconKonten from "../../../assets/img/konten.png";
import QuizMethod from "./Quiz-bab6/Quiz1";

const MethodMateri = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();

  const handleQuizComplete = () => {
    handleLessonComplete("/materi/bab6/pengenalan-method");
    setQuizCompleted(true);
  };

  const handleNext = () => {
    if (quizCompleted) {
      handleLessonComplete("/materi/bab6/pengenalan-method");
      window.scrollTo(0, 0);
      navigate("/materi/bab6/method-void");
    }
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab5/rangkuman-bab5");
  };

  return (
    <div className="mt-4 mb-4">
      <h1 className="mb-4 text-2xl font-bold text-center">BAB 6 - METHOD</h1>

      <div className="w-full mb-4 border border-gray-300 rounded-lg">
        <h3
          className="flex items-center p-4 font-bold text-white cursor-pointer"
          style={{ backgroundColor: "#68217A" }}
        >
          <img src={iconBook} alt="Icon" className="w-8 h-8 mr-2" />
          PENDAHULUAN MATERI
          <span className="ml-2">▼</span>
        </h3>
        <div className="p-4 text-justify text-gray-700 rounded-b-lg bg-white">
          <p>
            Pada bab ini, kita akan membahas tentang Method dalam pemrograman
            C#. Method adalah blok kode yang dirancang untuk melakukan tugas
            tertentu dan dapat dipanggil berulang kali di berbagai bagian
            program. Dengan menggunakan, kita dapat mengorganisir kode,
            meningkatkan keterbacaan, dan memudahkan pemeliharaan. Selain itu,
            kita juga akan mempelajari tentang parameter, argumen, dan
            pengembalian nilai dari fungsi, serta konsep fungsi lambda yang
            memberikan cara yang lebih ringkas untuk mendefinisikan fungsi.
          </p>
        </div>
      </div>

      <div
        className="w-full mb-4 border border-gray-300 rounded-lg"
        style={{ backgroundColor: "#68217A" }}
      >
        <h3 className="flex items-center p-4 font-bold text-white cursor-pointer">
          <img src={iconTujuan} alt="Icon" className="w-8 h-8 mr-2" />
          TUJUAN PEMBELAJARAN
          <span className="ml-2">▼</span>
        </h3>
        <ul className="p-4 pl-6 text-justify text-gray-700 list-disc bg-white rounded-b-lg">
          <li>Mampu memahami konsep method pada C#</li>
          <li>Mampu menerapkan method dalam bahasa pemrograman</li>
          <li>Mampu menerapkan method dengan tipe data dalam pemrograman</li>
          <li>Mampu menerapkan method dengan beberapa parameter berbeda</li>
        </ul>
      </div>

      <div
        className="w-full mb-4 border border-gray-300 rounded-lg"
        style={{ backgroundColor: "#68217A" }}
      >
        <h3 className="flex items-center p-4 font-bold text-white cursor-pointer">
          <img src={iconKonten} alt="Icon" className="w-8 h-8 mr-2" />
          KONTEN MATERI
          <span className="ml-2">▼</span>
        </h3>
        <ul className="p-4 pl-6 text-justify text-gray-700 list-none bg-white rounded-b-lg">
          <li>6.1 Pengenalan Method</li>
          <li>6.2 Method Void</li>
          <li>6.3 Method Dengan Tipe Data</li>
          <li>6.4 Parameter Method</li>
          <li>6.5 Rangkuman</li>
        </ul>
      </div>

      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="mt-2 mb-4 text-2xl font-bold">6.1 Pengenalan Method</h2>
        <p className="mb-4">
          <strong>Method</strong> (Metode) merupakan{" "}
          <strong>
            kumpulan dari beberapa pernyataan yang digabungkan menjadi satu yang
            bertujuan untuk melakukan suatu tugas tertentu
          </strong>
          . Method juga merupakan sekumpulan pernyataan yang akan dijalankan
          ketika dipanggil pada suatu program.
        </p>
        <p className="mb-4">
          Method memiliki banyak kelebihan diantaranya adalah :
        </p>
        <ul className="pl-6 mb-4 list-disc">
          <li>
            Kode bersifat <strong>reusable</strong> yang artinya kode tersebut
            dapat digunakan kembali.
          </li>
          <li>
            <strong>Mudah untuk menguji</strong>
          </li>
          <li>
            Modifikasi method{" "}
            <strong>tidak mempengaruhi program pemanggil</strong>
          </li>
          <li>
            Method dapat{" "}
            <strong>
              menerima lebih dari satu masukan/argumen yang berbeda
            </strong>
          </li>
        </ul>
        <p className="mb-4">Untuk mendefiniskan suatu method pada C# :</p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`[Access modifier][tipe data][nama method](parameter1, parameter2, ...) { 
    // Statements 
}`}</code>
        </pre>
        <p className="mb-4">Dari struktur di atas:</p>
        <ul className="pl-6 mb-4 list-disc">
          <li>
            <strong>Access modifier</strong>, untuk saat ini, gunakan saja
            access modifier public.
          </li>
          <li>
            <strong>Tipe data</strong> merupakan tipe data yang dihasilkan
            method. Bisa berupa void atau tipe data C# lainnya, termasuk enum
            atau class custom.
          </li>
          <li>
            <strong>Nama method</strong> berupa suatu identifier yang valid.
          </li>
          <li>
            <strong>Parameter</strong> sekumpulan variabel pada method untuk
            berkomunikasi dengan program di luar method. Method juga bisa tidak
            memiliki parameter.
          </li>
          <li>
            <strong>Statements</strong>, kumpulan perintah yang akan dijalankan
            ketika method dipanggil.
          </li>
        </ul>
        <p className="mb-4">
          Suatu method harus ditempatkan di dalam suatu class. Method adalah
          salah satu bentuk dari member suatu class. Suatu method dipanggil atau
          dijalankan dengan menuliskan namanya. Sebagai catatan, program dengan
          bahasa pemrograman C# paling tidak memiliki satu method, yaitu method
          Main.
        </p>
      </div>

      <QuizMethod onComplete={handleQuizComplete} />

      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="flex items-center px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
        >
          <img src={backIcon} alt="Kembali" className="w-5 h-5 mr-2" />
          Kembali
        </button>
        <button
          onClick={handleNext}
          className="flex items-center justify-between px-4 py-2 text-white rounded-lg"
          style={{
            backgroundColor: quizCompleted ? "#6E2A7F" : "#A0A0A0",
            cursor: quizCompleted ? "pointer" : "not-allowed",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            quizCompleted && (e.currentTarget.style.backgroundColor = "#5B1F6A")
          }
          onMouseLeave={(e) =>
            quizCompleted && (e.currentTarget.style.backgroundColor = "#6E2A7F")
          }
          disabled={!quizCompleted}
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

export default MethodMateri;
