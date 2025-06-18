import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import QuizInteger from "./Quiz-bab3/Quiz4";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";

const Integer = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const navigate = useNavigate();
  const { handleLessonComplete, handleQuizComplete } = useOutletContext();
  const { completedLessons } = useSelector((state) => state.auth);
  const currentLessonPath = "/materi/bab3/integer";

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
    handleQuizComplete("/materi/bab3/integer");
    setQuizCompleted(true);
    setQuizPassed(isPassed);
  };

  const handleNext = () => {
    if (!quizPassed) return; // Prevent navigation if quiz not passed
    handleLessonComplete("/materi/bab3/integer");
    window.scrollTo(0, 0);
    navigate("/materi/bab3/floating-point");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab3/tipe-data-dasar");
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-center">BAB 3 - TIPE DATA</h1>
      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Tipe Data Dasar: Integer</h2>
        <p className="mt-4">
          Tipe data integer digunakan untuk menyimpan bilangan bulat, baik
          positif maupun negatif, tanpa desimal seperti: 2, 40, dan -123. Tipe
          data ini sangat umum digunakan dalam pemrograman untuk operasi
          aritmatika dasar dan penghitungan. Dalam bahasa pemrograman C#,
          terdapat beberapa sub-tipe integer yang dibedakan berdasarkan ukuran
          memori dan jangkauan nilainya.
        </p>
        <p className="mt-4 font-bold">
          Berikut ini adalah tabel yang merangkum jangkauan dan ukuran memori
          setiap tipe data integer dalam C#:
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
                <td className="p-2 border border-gray-300">sbyte</td>
                <td className="p-2 border border-gray-300">1 byte</td>
                <td className="p-2 border border-gray-300">-128 hingga 127</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">byte</td>
                <td className="p-2 border border-gray-300">1 byte</td>
                <td className="p-2 border border-gray-300">0 hingga 255</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">short</td>
                <td className="p-2 border border-gray-300">2 byte</td>
                <td className="p-2 border border-gray-300">
                  -32.768 hingga 32.767
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">ushort</td>
                <td className="p-2 border border-gray-300">2 byte</td>
                <td className="p-2 border border-gray-300">0 hingga 65.535</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">int</td>
                <td className="p-2 border border-gray-300">4 byte</td>
                <td className="p-2 border border-gray-300">
                  -2.147.483.648 hingga 2.147.483.647
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">uint</td>
                <td className="p-2 border border-gray-300">4 byte</td>
                <td className="p-2 border border-gray-300">
                  0 hingga 4.294.967.295
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">long</td>
                <td className="p-2 border border-gray-300">8 byte</td>
                <td className="p-2 border border-gray-300">
                  -9.223.372.036.854.775.808 hingga 9.223.372.036.854.775.807
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">ulong</td>
                <td className="p-2 border border-gray-300">8 byte</td>
                <td className="p-2 border border-gray-300">
                  0 hingga 18.446.744.073.709.551.615
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">
          Ukuran Memori Penyimpanan adalah jumlah memori yang dibutuhkan untuk
          menyimpan angka tersebut. Semakin besar jangkauan, semakin banyak juga
          ruang memori yang dibutuhkan. Berbeda dengan beberapa bahasa
          pemrograman lain, C# mendukung integer unsigned, yang memungkinkan
          penggunaan seluruh jangkauan nilai positif, yang bisa meningkatkan
          kapasitas penyimpanan.
        </p>
        <h3 className="mt-4 text-xl font-bold">Cobalah Kode Program Berikut</h3>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/o4Narm"
          ></iframe>
        </div>
        <p className="mt-2">
          Pada kode di atas, terdapat deklarasi beberapa variabel dengan
          berbagai tipe data integer. Variabel var1 bertipe sbyte, var2 bertipe
          byte, var3 bertipe short, var4 bertipe ushort, var5 bertipe int, var6
          bertipe uint, var7 bertipe long, dan var8 bertipe ulong. Khusus untuk
          ulong, nilai harus diakhiri dengan karakter UL untuk menunjukkan bahwa
          itu adalah tipe ulong.
        </p>
        <h3 className="mt-4 text-xl font-bold">
          Penulisan Angka Biner, Oktal, dan Heksadesimal di C#
        </h3>
        <p className="mt-2">
          Untuk keperluan tertentu, kadang kita butuh mengolah angka dalam
          sistem bilangan biner, oktal, dan heksadesimal. Ini juga bisa
          ditampung oleh tipe data integer dalam bahasa C#.
        </p>
        <h4 className="mt-2 font-bold">Bilangan Biner</h4>
        <p className="mt-2">
          Biner adalah sebutan untuk sistem bilangan yang terdiri dari 2 digit,
          yakni 0 dan 1. Untuk menginput angka ini, kita dapat menambah awalan{" "}
          <code>0b</code> sebelum penulisan angka, seperti{" "}
          <code>0b10100100</code>.
        </p>
        <h4 className="mt-2 font-bold">Bilangan Oktal</h4>
        <p className="mt-2">
          Oktal adalah sistem bilangan yang terdiri dari 8 digit angka, yakni 0,
          1, 2, 3, 4, 5, 6, dan 7. Namun, dalam bahasa C#, tidak ada dukungan
          langsung untuk bilangan oktal seperti di beberapa bahasa lain. Kita
          harus mengonversi bilangan oktal menjadi bilangan desimal atau
          menggunakan string dan melakukan parsing.
        </p>
        <h4 className="mt-2 font-bold">Bilangan Heksadesimal</h4>
        <p className="mt-2">
          Heksadesimal adalah sistem bilangan yang terdiri dari 16 digit angka,
          yakni 0-9 serta huruf A-F. Untuk membuat angka heksa di C#, tambah
          awalan <code>0x</code> sebelum penulisan angka, seperti{" "}
          <code>0xA4</code>. Sebagai tambahan, sistem bilangan yang kita pakai
          sehari-hari, yakni dengan 10 digit 0-9, disebut juga sebagai bilangan
          desimal.
        </p>
        <h3 className="mt-4 text-xl font-bold">Cobalah Kode Program Berikut</h3>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/FLiUpA"
          ></iframe>
        </div>
        <p className="mt-2">
          Kode program ini mendeklarasikan tiga variabel: var1, var2, dan var3
          sebagai tipe data <code>int</code>. Ketiganya diisi dengan nilai yang
          berbeda dalam berbagai format bilangan: biner (<code>0b10100100</code>
          ), desimal (<code>164</code>), dan heksadesimal (<code>0xA4</code>).
          Saat ditampilkan, semuanya dikonversi ke bilangan desimal, yaitu 164.
          <br />
          <br />
          Perlu diperhatikan bahwa C# <b>tidak mendukung notasi oktal</b>. Jika
          angka ditulis dengan awalan nol seperti <code>0123</code>, itu tetap
          dianggap sebagai desimal, bukan oktal. Dalam pemrograman, nilai yang
          dituliskan langsung dalam kode disebut <b>literal</b>, seperti{" "}
          <code>123</code> (integer literal) atau <code>0b10100100</code> (biner
          literal).
        </p>
        <h3 className="mt-4 text-xl font-bold">
          Cara Membaca (Input) Data Integer
        </h3>
        <p className="mt-2">
          Proses pembacaan data di bahasa C# bisa dilakukan dengan menggunakan
          <code>Console.ReadLine()</code> and konversi tipe data menggunakan
          Convert atau Parse. Khusus tipe data integer, perintah yang dipakai
          untuk proses pembacaan ini adalah:
        </p>
        <ul className="pl-6 list-disc">
          <li>
            <code>Convert.ToByte()</code>
          </li>
          <li>
            <code>Convert.ToInt16()</code> atau <code>short.Parse()</code>
          </li>
          <li>
            <code>Convert.ToInt32()</code> atau <code>int.Parse()</code>
          </li>
          <li>
            <code>Convert.ToInt64()</code> atau <code>long.Parse()</code>
          </li>
        </ul>
        <h3 className="mt-4 text-xl font-bold">Cobalah Kode Program Berikut</h3>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/GmTjoM"
          ></iframe>
        </div>
        <p className="mt-2">
          Kode program ini mendeklarasikan empat variabel integer yang nilainya
          diambil dari input pengguna menggunakan{" "}
          <code>Console.ReadLine()</code>. Input yang dibaca dikonversi ke tipe
          data integer sebelum disimpan dalam variabel.
          <br />
          <br />
          Setelah semua nilai dimasukkan, program akan menampilkan kembali
          hasilnya. Dengan memahami cara membaca dan menampilkan data dalam
          berbagai sistem bilangan seperti biner, desimal, dan heksadesimal,
          kita dapat lebih mudah melakukan operasi aritmatika dan logika dalam
          C#.
        </p>
      </div>
      {/* Kuis */}
      <QuizInteger onComplete={handleQuizCompleteLocal} />
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

export default Integer;
