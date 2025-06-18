import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import QuizMethodData from "./Quiz-bab6/Quiz3";

const MethodDenganTipeData = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLessonComplete } = useOutletContext();
  const { completedLessons } = useSelector((state) => state.auth);

  // Check if the current lesson is already completed
  useEffect(() => {
    const currentPath = location.pathname;
    if (completedLessons.includes(currentPath)) {
      setQuizCompleted(true);
    }
  }, [completedLessons, location.pathname]);

  const handleNext = () => {
    if (quizCompleted) {
      window.scrollTo(0, 0);
      navigate("/materi/bab6/parameter-method");
    }
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab6/method-void");
  };

  const handleQuizComplete = () => {
    handleLessonComplete("/materi/bab6/method-tipe-data");
    setQuizCompleted(true);
  };

  return (
    <div className="mt-4 mb-4">
      <h1 className="mb-4 text-2xl font-bold text-center">BAB 6 - METHOD</h1>

      <div className="p-4 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="mt-2 mb-4 text-2xl font-bold">
          6.3 Method Dengan Tipe Data
        </h2>
        <h3 className="mb-3 text-xl font-bold">
          Mendefinisikan dan Memanggil Method dengan Nilai Balik
        </h3>
        <p className="mb-4">
          Sebelumnya kita telah mempelajari bahwa mendefinisikan sebuah method
          dengan kata kunci void membuat method tersebut tidak memiliki nilai
          balik/return value.
        </p>
        <p className="mb-4">
          Berikut contoh dan penjelasan dari potongan kode method yang memiliki
          nilai balik:
        </p>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler:</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/KVIRoC"
            frameborder="0"
          ></iframe>
        </div>
        <p className="mb-4">
          Kode program di atas mendefinisikan{" "}
          <strong>
            sebuah method untuk melakukan satu fungsionalitas, yaitu operasi
            penjumlahan dari 3 buah variabel
          </strong>
          . Perhatikan bahwa kali ini, kita menggunakan int sebagai nilai balik.
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`int PenjumlahanTigaAngka()`}</code>
        </pre>
        <p className="mb-4">
          Artinya, setelah blok kode program di dalam method
          <strong>PenjumlahanTigaAngka()</strong> selesai dieksekusi, method
          tersebut akan menghasilkan sebuah nilai dari tipe int.
        </p>
        <p className="mb-4">
          Di dalam method <strong>PenjumlahanTigaAngka()</strong> di atas, kita
          mendeklarasikan variabel hasil dengan tipe int untuk menampung hasil
          dari penjumlahan angka <strong>angka1 + angka2 + angka3</strong>.
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`int hasil = angka1 + angka2 + angka3;`}</code>
        </pre>
        <p className="mb-4">
          Lalu variabel tersebut kita berikan ke pernyataan return sebagai nilai
          balik dari method <strong>PenjumlahanTigaAngka()</strong>.
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`return hasil;`}</code>
        </pre>
        <p className="mb-4">
          Perhatikan bahwa <strong>nilai yang diberikan ke pernyataan</strong>{" "}
          return{" "}
          <strong>
            harus dari tipe data yang sama dengan definisi nilai balik
          </strong>
          sebuah method. Dalam hal ini, nilai variabel hasil harus dari tipe int
          karena nilai balik dari method PenjumlahanTigaAngka() juga bertipe
          int.
        </p>

        <h3 className="mb-3 text-xl font-bold">
          Menyederhanakan Definisi Method
        </h3>
        <p className="mb-4">
          Di dalam method <code>PenjumlahanTigaAngka()</code> sebelumnya, kita
          mendeklarasikan variabel lokal <code>hasil</code> untuk menampung
          hasil operasi <code>angka1 + angka2 + angka3</code>. Lalu memberikan
          variabel tersebut ke pernyataan <code>return</code> sebagai nilai
          balik dari method tersebut.
        </p>
        <p className="mb-4">
          Karena operasi <code>angka1 + angka2 + angka3</code> sendiri
          menghasilkan nilai dengan tipe <code>int</code>, kita sama sekali
          tidak memerlukan variabel <code>hasil</code> untuk menampung hasil
          operasi tersebut. Sebagai gantinya, kita bisa langsung memberikan
          operasi <code>angka1 + angka2 + angka3</code> ke pernyataan{" "}
          <code>return</code>. seperti pada definisi baru method
          PenjumlahanTigaAngka() yang lebih ringkas pada contoh di bawah ini:
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`static int PenjumlahanTigaAngka() 
{ 
    int angka1 = 3, angka2 = 4, angka3 = 5; 
    return angka1 + angka2 + angka3; 
}`}</code>
        </pre>
        <p className="mb-4">
          Pada C#, kita bahkan bisa meringkasnya lebih jauh dengan menggunakan
          konstruksi yang dinamakan <strong>expression-embodied member</strong>{" "}
          seperti yang ditunjukkan oleh kode program di bawah ini:
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`static int PenjumlahanTigaAngka() => angka1 + angka2 + angka3;`}</code>
        </pre>
        <p className="mb-4">
          Tanda <code>=> </code> disebut dengan <strong>operator lambda</strong>
          . Operator yang mirip dengan anak panah ini menyatakan bahwa nilai
          balik dari method di sebelah kirinya adalah hasil dari operasi yang
          “ditunjuk” oleh anak panah di sebelah kanannya.
        </p>
      </div>

      <QuizMethodData onComplete={handleQuizComplete} />

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

export default MethodDenganTipeData;
