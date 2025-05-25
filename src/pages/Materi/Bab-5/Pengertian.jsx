import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import iconBook from "../../../assets/img/book.png";
import iconTujuan from "../../../assets/img/tujuan.png";
import iconKonten from "../../../assets/img/konten.png";
import QuizOperator from "./Quiz-bab5/Quiz1";

const KontrolAlur = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();

  const handleQuizComplete = () => {
    handleLessonComplete("/materi/bab5/pernyataan-if-else");
    setQuizCompleted(true);
  };

  const handleNext = () => {
    if (quizCompleted) {
      handleLessonComplete("/materi/bab5/pengertian-kontrol-alur");
      window.scrollTo(0, 0);
      navigate("/materi/bab5/pernyataan-if-else");
    }
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab4/rangkuman-bab4");
  };

  return (
    <div className="mt-4 mb-4">
      <h1 className="mb-4 text-2xl font-bold text-center">
        BAB 5 - KONTROL ALUR
      </h1>

      {/* Pendahuluan Materi */}
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
            Pada bab ini membahas tentang kontrol alur dalam pemrograman C#.
            Kontrol alur adalah mekanisme yang digunakan untuk mengatur urutan
            eksekusi pernyataan dalam program berdasarkan kondisi tertentu.
            Dengan memahami kontrol alur, programmer dapat membuat keputusan,
            mengulangi blok kode, dan mengelola alur eksekusi program secara
            dinamis. Dalam C#, terdapat berbagai struktur kontrol alur, termasuk
            pernyataan kondisional, perulangan, dan pengendalian alur seperti
            break dan continue. Pemahaman yang baik tentang kontrol alur sangat
            penting untuk menulis program yang efisien dan efektif.
          </p>
        </div>
      </div>

      {/* Tujuan Pembelajaran */}
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
          <li>Memahami konsep kontrol alur dalam pemrograman.</li>
          <li>
            Menggunakan dan memilih jenis kontrol alur yang sesuai dalam bahasa
            pemrograman C#.
          </li>
          <li>
            Memahami dan menerapkan pernyataan if dan switch dalam program.
          </li>
          <li>
            Menggunakan perulangan for dan while dengan tepat, serta memahami
            konsep perulangan do-while, serta penggunaan break dan continue.
          </li>
        </ul>
      </div>

      {/* Konten Materi */}
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
          <li>5.1 Pengertian Kontrol Alur</li>
          <li>5.2 Pernyataan If</li>
          <li>5.3 Pernyataan Switch</li>
          <li>5.4 Perulangan (for, while, do-while)</li>
          <li>5.5 Pernyataan Break dan Continue</li>
          <li>5.6 Perulangan Bersarang</li>
          <li>Rangkuman</li>
        </ul>
      </div>

      {/* Pengertian Kontrol Alur */}
      <div>
        <h2 className="mt-2 text-2xl font-bold">5.1 Pengertian Kontrol Alur</h2>
        <div className="p-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
          <p className="mb-4">
            Aplikasi komputer tidak akan banyak berguna jika hanya bisa
            menjalankan satu flow atau alur. Bayangkan jika program yang kita
            buat hanya menjalankan perintah satu persatu dari atas ke bawah.
            Jika programnya seperti itu, berarti cuma ada satu variasi masalah
            yang bisa ditangani. Berubah sedikit saja kondisinya, program
            tersebut sudah tidak bisa berfungsi lagi. Penanganan berbagai
            variasi masalah menuntut agar bahasa pemrograman memiliki kontrol
            alur. Kontrol alur memungkinkan program menentukan kode mana yang
            akan dijalankan berdasarkan kondisi-kondisi tertentu. Kontrol alur
            dalam pemrograman mengacu pada mekanisme yang digunakan untuk
            mengarahkan urutan eksekusi instruksi berdasarkan kondisi atau
            kriteria tertentu. Dengan menggunakan kontrol alur, kita dapat
            membuat keputusan dalam kode, mengulangi serangkaian instruksi, dan
            mengelola penanganan kesalahan.
          </p>
          <p className="mb-4">
            Sebelum melanjutkan ke materi berikutnya, ada istilah-istilah yang
            perlu dipahami sehubungan dengan kontrol alur ini, yaitu{" "}
            <strong>kondisi</strong> dan
            <strong> aksi</strong>.
          </p>
          <p className="mb-4">
            <strong>Kondisi</strong> adalah bagian dari kontrol alur yang
            menentukan bagian mana yang akan dijalankan selanjutnya. Kondisi
            bernilai <strong>Boolean (true/false)</strong> dan diapit dalam
            tanda kurung,
            <strong> perhatikan contoh berikut:</strong>
          </p>
          <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
            <code>{`(Pilkom == "Pendidikan Komputer") `}</code>
          </pre>
          <p className="mb-4">
            Dalam contoh di atas terdapat operator kesamaan ==. Tanda kurung
            merupakan keharusan. Jika kondisi tidak diletakkan dalam tanda
            kurung, nilai kondisi harus selalu bertipe boolean.
          </p>
          <p className="mb-4">
            Sedangkan <strong>Aksi</strong> merupakan satu atau sekumpulan
            perintah yang akan dijalankan bila kondisinya terpenuhi. Jika ingin
            perintah dijalankan lebih dari satu, gunakan kurung kurawal untuk
            mengapitnya, <strong> perhatikan contoh berikut:</strong>
          </p>
          <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
            <code>{`public class SharpLearn
{ 
    public static void Main(String[] args) 
    { 
        string pilkom = "Pendidikan Komputer"; 

        // Kondisi 
        if (pilkom == "Pendidikan Komputer") 
        { 
            // Aksi 
            Console.WriteLine("Selamat datang di program Pendidikan Komputer!"); 
            Console.WriteLine("Ini adalah aksi yang dijalankan ketika kondisi terpenuhi."); 
        } 
    } 
} `}</code>
          </pre>
        </div>
      </div>

      <QuizOperator onComplete={handleQuizComplete} />

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

export default KontrolAlur;
