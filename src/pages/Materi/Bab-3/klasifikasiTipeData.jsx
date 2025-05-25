import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import QuizKlasifikasiTipeData from "./Quiz-bab3/Quiz2";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";

const KlasifikasiTipeData = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();

  const handleQuizComplete = () => {
    handleLessonComplete("/materi/bab3/tipe-data-dasar");
    setQuizCompleted(true);
  };

  const handleNext = () => {
    handleLessonComplete("/materi/bab3/klasifikasi-tipedata");
    window.scrollTo(0, 0);
    navigate("/materi/bab3/tipe-data-dasar");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab3/pengertian-tipedata");
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-center">BAB 3 - TIPE DATA</h1>
      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">3.2 Klasifikasi Tipe Data</h2>
        <p className="mt-4">
          Klasifikasi tipe data dalam C# merujuk pada pengelompokan berbagai
          jenis data yang dapat digunakan dalam program. Tipe data menentukan
          jenis nilai yang dapat disimpan dalam variabel, serta operasi yang
          dapat dilakukan pada nilai tersebut.
        </p>

        <h3 className="mt-4 text-xl font-bold">
          Predefined Types (Tipe Data Bawaan)
        </h3>
        <p className="mt-2">
          Tipe data yang telah disebutkan pada topik sebelumnya seperti{" "}
          <code>int</code> dan <code>string</code> sendiri sebenarnya merupakan
          alias yang diberikan oleh C# untuk format umum tipe data yang
          disediakan di lingkungan .NET. Format .NET untuk tipe data{" "}
          <code>int</code> atau integer di C# adalah <code>System.Int32</code>.
          Sedangkan untuk tipe data <code>string</code> di C# adalah{" "}
          <code>System.String</code> di .NET. Oleh karena itu, kita juga bisa
          mengganti <code>int</code> dengan <code>System.Int32</code> untuk
          mendeklarasikan sebuah variabel bertipe integer.
        </p>
        <p className="mt-2">
          C# menyediakan beberapa tipe data bawaan yang bisa langsung kita
          gunakan yang biasa disebut dengan built-in data types atau predefined
          types.
        </p>
        <p className="mt-4 mb-4 font-bold">
          Pada tabel berikut adalah daftar tipe data bawaan C# :
        </p>
        <div className="flex justify-center mb-4">
          <table className="border border-gray-300">
            <thead className="bg-[#68217A] text-white text-center">
              <tr>
                <th className="p-2 text-white border border-gray-300">
                  Tipe Data
                </th>
                <th className="p-2 text-white border border-gray-300">
                  Jangkauan Nilai
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300">byte</td>
                <td className="p-2 border border-gray-300">0 ~ 255</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">sbyte</td>
                <td className="p-2 border border-gray-300">-128 ~ 127</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">short</td>
                <td className="p-2 border border-gray-300">-32.768 ~ 32.767</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">ushort</td>
                <td className="p-2 border border-gray-300">0 ~ 65.535</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">int</td>
                <td className="p-2 border border-gray-300">
                  -2.147.483.648 ~ 2.147.483.647
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">uint</td>
                <td className="p-2 border border-gray-300">
                  0 ~ 4.294.967.295
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">long</td>
                <td className="p-2 border border-gray-300">
                  -9.223.372.036.854.775.808 ~ 9.223.372.036.854.775.807
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">ulong</td>
                <td className="p-2 border border-gray-300">
                  0 ~ 18.446.744.073.709.551.615
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">float</td>
                <td className="p-2 border border-gray-300">
                  -3.402823e38 ~ 3.402823e38
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">double</td>
                <td className="p-2 border border-gray-300">
                  -1.79769313486232e308 ~ 1.79769313486232e308
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">decimal</td>
                <td className="p-2 border border-gray-300">
                  -79228162514264337593543950335 ~ 79228162514264337593543950335
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">char</td>
                <td className="p-2 border border-gray-300">
                  Sebuah karakter unicode
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">string</td>
                <td className="p-2 border border-gray-300">
                  Sebuah string karakter unicode
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">boolean</td>
                <td className="p-2 border border-gray-300">True & False</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">object</td>
                <td className="p-2 border border-gray-300">Sebuah Objek</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          Semua tipe data pada tabel di atas merupakan tipe nilai (value type)
          kecuali <code>object</code> dan <code>string</code> yang merupakan
          tipe referensi (reference type).
        </p>

        <h3 className="mt-4 text-xl font-bold">
          User-defined Types (Tipe Data yang Didefinisikan Sendiri)
        </h3>
        <p className="mt-2">
          Selain dari tipe data bawaan / predefined types, kita juga bisa
          mendefinisikan tipe data kita sendiri yang biasa disebut dengan
          user-defined types dengan menggunakan <code>class</code>,{" "}
          <code>struct</code>, <code>interface</code>, <code>enum</code>, dan{" "}
          <code>delegate</code>.
        </p>
      </div>

      {/* Kuis */}
      <QuizKlasifikasiTipeData onComplete={handleQuizComplete} />

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
          aria-label={
            quizCompleted
              ? "Lanjut ke materi berikutnya"
              : "Selesaikan kuis untuk melanjutkan"
          }
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

export default KlasifikasiTipeData;
