import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import QuizKategoriVariabel from "./Quiz-bab2/Quiz3";

const KategoriVariabel = () => {
  const navigate = useNavigate();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { handleLessonComplete } = useOutletContext();

  const handleQuizComplete = () => {
    handleLessonComplete("/materi/bab2/deklarasi-inialisasi");
    setQuizCompleted(true);
    // Scroll ke bagian paling bawah halaman
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    handleLessonComplete("/materi/bab2/kategori-variabel");
    window.scrollTo(0, 0);
    navigate("/materi/bab2/deklarasi-inialisasi");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab2/penamaan-variabel");
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-center">BAB 2 - VARIABEL</h1>

      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">2.3 Kategori Variabel</h2>

        <p className="mt-4">
          Variabel dalam C# dikelompokan menjadi variabel static, variabel
          instance, variabel lokal, dan parameter.
        </p>

        <h3 className="mt-4 text-xl font-bold">A. Variabel Static</h3>

        <p className="mt-4">
          Variabel static dibuat dengan mendeklarasikan suatu variabel dengan
          menggunakan keyword static. Variabel static adalah bagian dari tipe
          dan bukan merupakan bagian dari object, oleh karena itu variabel
          static hanya dapat diakses melalui tipenya. Jika kita mengakses data
          static melalui instance/object maka kompiler akan memberikan pesan
          kesalahan. Variabel static juga sering disebut dengan static field.
        </p>

        <p className="mt-4 font-bold">Cobalah Kode Program Pada Compiler:</p>

        <iframe
          width="100%"
          height="475"
          src="https://dotnetfiddle.net/Widget/f10LP8"
          frameBorder="0"
          className="mt-4"
          title="C# Static Variable Example"
        ></iframe>

        <p className="mt-4 italic">
          Pada kode di atas, kelas ContohStatic memiliki variabel static
          JumlahInstance yang diinisialisasi dengan nilai default 0. Setiap kali
          konstruktor ContohStatic dipanggil, nilai JumlahInstance akan
          bertambah 1. Dalam metode Main, tiga instance dari ContohStatic dibuat
          menggunakan new ContohStatic(). Setiap instance yang dibuat akan
          memanggil konstruktor, sehingga JumlahInstance bertambah menjadi 3.
          Metode TampilkanJumlahInstance kemudian dipanggil untuk menampilkan
          jumlah instance yang telah dibuat, yaitu 3. Ini menunjukkan bagaimana
          variabel static mempertahankan nilai yang sama di seluruh instance
          dari kelas tersebut.
        </p>

        <h3 className="mt-4 text-xl font-bold">B. Variabel Instance</h3>

        <p className="mt-4">
          Variabel instance adalah variabel yang merupakan bagian dari instance
          suatu tipe. Variabel ini dideklarasikan dalam suatu tipe tanpa
          menggunakan keyword static. Variabel ini juga sering disebut dengan
          instance field.
        </p>

        <p className="mt-4 font-bold">Cobalah Kode Program Pada Compiler:</p>

        <iframe
          width="100%"
          height="475"
          src="https://dotnetfiddle.net/Widget/t31kaR"
          frameBorder="0"
          className="mt-4"
          title="C# Instance Variable Example"
        ></iframe>

        <p className="mt-4 italic">
          Pada kode di atas, kelas Mahasiswa memiliki dua variabel instance:
          Nama dan Nim. Konstruktor Mahasiswa menerima dua parameter untuk
          menginisialisasi variabel instance ini. Dalam metode Main, dua
          instance dari Mahasiswa dibuat dengan nama dan NIM yang berbeda.
          Metode TampilkanInfo kemudian dipanggil untuk masing-masing instance,
          menampilkan informasi yang berbeda sesuai dengan data yang dimasukkan
          saat pembuatan instance. Ini menunjukkan bagaimana variabel instance
          dapat menyimpan nilai yang berbeda untuk setiap instance dari kelas.
        </p>

        <h3 className="mt-4 text-xl font-bold">C. Variabel Lokal</h3>

        <p className="mt-4">
          Variabel Lokal adalah variabel yang dideklarasikan di dalam suatu
          blok, statemen for, switch, atau using. Sebelum nilai dari variabel
          ini dapat diakses maka variabel ini perlu diberikan suatu nilai secara
          eksplisit. Kompiler akan gagal melakukan kompilasi jika variabel ini
          diakses pada saat belum diberikan suatu nilai.
        </p>

        <p className="mt-4 font-bold">Cobalah Kode Program Pada Compiler:</p>

        <iframe
          width="100%"
          height="475"
          src="https://dotnetfiddle.net/Widget/wyBPRU"
          frameBorder="0"
          className="mt-4"
          title="C# Local Variable Example"
        ></iframe>

        <p className="mt-4 italic">
          Pada kode di atas, metode Hitung dalam kelas ContohLokal
          mendeklarasikan variabel nilai dengan nilai 10. Kemudian, nilai dari
          variabel ini ditampilkan menggunakan Console.WriteLine. Dalam metode
          Main, instance dari ContohLokal dibuat dan metode Hitung dipanggil,
          yang menampilkan nilai 10. Ini menunjukkan bagaimana variabel bekerja
          di dalam metode, dengan cakupan yang terbatas hanya pada blok kode di
          mana mereka dideklarasikan.
        </p>

        <h3 className="mt-4 text-xl font-bold">D. Parameter</h3>

        <p className="mt-4">
          Parameter adalah variabel yang digunakan untuk menerima nilai yang
          dikirim ke dalam metode, konstraktor, atau indeks. Suatu method dapat
          memiliki serangkaian parameter. Parameter ini akan mengirimkan
          informasi yang diperlukan oleh method untuk melakukan operasinya.
          Dalam C# parameter dibagi menjadi value parameter, output parameter
          dan reference parameter. Untuk membuat parameter output digunakan
          keyword out dan untuk membuat parameter reference digunakan keyword
          ref. Jika tidak ditentukan out atau ref maka parameter akan dikirimkan
          secara by-value, ini berarti salinan dari value akan dibuat pada saat
          kita mengakses suatu method.
        </p>

        <p className="mt-4 font-bold">Cobalah Kode Program Pada Compiler:</p>

        <iframe
          width="100%"
          height="475"
          src="https://dotnetfiddle.net/Widget/Mnfwqg"
          frameBorder="0"
          className="mt-4"
          title="C# Parameter Example"
        ></iframe>

        <p className="mt-4 italic">
          Pada kode di atas, metode TampilkanPesan dalam kelas ContohParameter
          menerima satu parameter bertipe string pesan. Ketika metode ini
          dipanggil, nilai dari parameter pesan akan ditampilkan menggunakan
          Console.WriteLine. Dalam metode Main, instance dari ContohParameter
          dibuat dan metode TampilkanPesan dipanggil dengan "Halo, ini adalah
          pesan!". Ini menunjukkan bagaimana parameter bekerja dalam metode,
          memungkinkan pengiriman data ke dalam metode saat metode dipanggil.
        </p>
      </div>

      {/* Kuis Kategori Variabel */}
      <QuizKategoriVariabel onComplete={handleQuizComplete} />

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
          onClick={quizCompleted ? handleNext : null}
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

export default KategoriVariabel;
