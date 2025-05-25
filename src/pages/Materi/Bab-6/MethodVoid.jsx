import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import QuizMethodVoid from "./Quiz-bab6/Quiz2";

const MethodVoid = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();

  const handleNext = () => {
    if (quizCompleted) {
      handleLessonComplete("/materi/bab6/method-void");
      window.scrollTo(0, 0);
      navigate("/materi/bab6/method-tipe-data");
    }
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab6/pengenalan-method");
  };

  const handleQuizComplete = () => {
    handleLessonComplete("/materi/bab6/method-tipe-data");
    setQuizCompleted(true);
  };

  return (
    <div className="mt-4 mb-4">
      <h1 className="mb-4 text-2xl font-bold text-center">BAB 6 - METHOD</h1>
      <div className="p-4 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="mt-2 mb-4 text-2xl font-bold">6.2 Method Void</h2>
        <h3 className="mb-3 text-xl font-bold">Pendahuluan</h3>
        <p className="mb-4">
          Method void adalah jenis method yang menjalankan sekumpulan perintah
          tanpa mengembalikan nilai. Method ini berguna untuk melakukan operasi
          seperti menampilkan informasi atau memodifikasi data tanpa memberikan
          hasil kembali. Dengan menggunakan method void, kita dapat menyusun
          kode yang lebih terstruktur dan mudah diubah.
        </p>
      </div>

      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h3 className="mb-3 text-xl font-bold">
          Mendefinisikan dan Memanggil Method
        </h3>
        <p className="mb-4">
          Suatu method void adalah suatu{" "}
          <strong>
            method yang hanya menjalankan sekumpulan pernyataan dan tidak
            menghasilkan atau mengembalikan suatu nilai
          </strong>{" "}
          (tetapi masih dapat menampilkan sesuatu ke layar).
        </p>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler:</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/PpV7zY"
            frameBorder="0"
          ></iframe>
        </div>
        <p className="mb-4">
          Kode program di atas akan menghasilkan keluaran yang sama secara
          berulang, yaitu mencetak sebuah angka 46 dari{" "}
          <code>Console.WriteLine(20 + 26)</code>. Apabila kita diminta untuk
          mengubah operasi penambahan menjadi operasi perkalian, kita hanya
          perlu mengubah <code>20 + 26</code> menjadi <code>20 * 26</code> di
          satu tempat saja, yaitu di dalam blok{" "}
          <code>HitungTampilkanHasil()</code>.
        </p>
      </div>

      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h3 className="mb-3 text-xl font-bold">Penjelasan Method Void</h3>
        <p className="mb-4">
          Perhatikan kembali potongan kode program di bawah ini:
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`static void HitungTampilkanHasil() 
{ 
    Console.WriteLine(10 + 20); 
}`}</code>
        </pre>
        <ul className="pl-6 mb-4 list-disc">
          <li className="mb-2">
            Potongan kode program di atas inilah yang kita sebut dengan{" "}
            <strong>method</strong>.
          </li>
          <li className="mb-2">
            Kata kunci <code>void</code> berfungsi untuk{" "}
            <strong>
              memberitahu compiler bahwa method di atas tidak mengembalikan
              nilai apapun
            </strong>
            .
          </li>
          <li className="mb-2">
            <code>HitungTampilkanHasil</code> merupakan identifier (pengenal
            atau nama) yang kita berikan untuk method di atas. Identifier yang
            diberikan untuk sebuah method sebaiknya bisa menjelaskan apa fungsi
            atau apa yang dilakukan oleh method tersebut.
          </li>
          <li className="mb-2">
            Kode program di dalam method <code>HitungTampilkanHasil()</code>{" "}
            berfungsi untuk <strong>melakukan sebuah operasi aritmatika</strong>{" "}
            (dalam hal ini penjumlahan <code>20 + 26</code>) dan sekaligus
            menampilkannya ke layar console <code>Console.WriteLine()</code>.
          </li>
        </ul>
        <p className="mb-4">
          Method yang telah didefinisikan bisa kita gunakan sebanyak yang kita
          perlukan. Untuk menggunakannya, kita cukup memanggil method tersebut
          seperti pada kode program di bawah ini:
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`static void Main(string[] args) 
{ 
    HitungTampilkanHasil(); 
    HitungTampilkanHasil(); 
    HitungTampilkanHasil(); 
}`}</code>
        </pre>
      </div>

      <QuizMethodVoid onComplete={handleQuizComplete} />

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

export default MethodVoid;
