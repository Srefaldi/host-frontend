import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import QuizOperator from "./Quiz-bab4/Quiz1";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import iconBook from "../../../assets/img/book.png";
import iconTujuan from "../../../assets/img/tujuan.png";
import iconKonten from "../../../assets/img/konten.png";
import Swal from "sweetalert2";

const Operator = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();

  const handleQuizComplete = (isPassed) => {
    console.log("Quiz completed, isPassed:", isPassed); // Debugging
    setQuizCompleted(true);
    setQuizPassed(isPassed);

    if (isPassed) {
      handleLessonComplete("/materi/bab4/operator-arithmetic");
    }
  };

  const handleNext = () => {
    if (!quizPassed) return; // Prevent navigation if quiz not passed
    handleLessonComplete("/materi/bab4/pengertian-operator");
    window.scrollTo(0, 0);
    navigate("/materi/bab4/operator-arithmetic");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab3/rangkuman-bab3");
  };

  // Debugging state changes
  useEffect(() => {
    console.log("quizCompleted:", quizCompleted, "quizPassed:", quizPassed);
  }, [quizCompleted, quizPassed]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-center">BAB 4 - OPERATOR</h1>

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

        <div className="p-4 text-justify text-gray-700 rounded-b-lg">
          <p>
            Pada bab ini, kita akan membahas tentang operator dalam bahasa
            pemrograman C#. Operator adalah simbol yang digunakan untuk
            melakukan operasi pada satu atau lebih operand. Memahami berbagai
            jenis operator dan cara penggunaannya sangat penting untuk menulis
            kode yang efektif dan efisien. Dalam C#, terdapat berbagai kategori
            operator, termasuk operator aritmatika, relasional, logika, dan
            bitwise. Setelah mempelajari materi ini, diharapkan pembaca dapat
            menggunakan operator dengan tepat dalam berbagai konteks
            pemrograman.
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
          <li>Mampu memahami konsep operator dan operan dalam C#.</li>
          <li>
            Menggunakan berbagai jenis operator untuk operasi matematika dan
            logika.
          </li>
          <li>
            Mengelola prioritas operator dengan benar untuk menulis ekspresi
            yang sesuai.
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
          <li>4.1 Pengertian Operator</li>
          <li>4.2 Kategori Operator dalam C#</li>
          <li>4.3 Operator Aritmatika</li>
          <li>4.4 Operator Increment dan Decrement</li>
          <li>4.5 Operator Penugasan</li>
          <li>4.6 Operator Perbandingan</li>
          <li>4.7 Operator Logika</li>
          <li>4.8 Operator Bersyarat</li>
          <li>4.9 Operator Kesetaraan</li>
          <li>Rangkuman</li>
        </ul>
      </div>

      {/* Pengertian Operator */}
      <div>
        <h2 className="mt-2 text-2xl font-bold">4.1 Pengertian Operator</h2>
        <div className="p-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
          <p className="mb-4">
            <strong>Operator</strong> dalam C# adalah simbol-simbol khusus yang
            melakukan tindakan tertentu pada Operand. <strong>Operand</strong>{" "}
            adalah nilai asal yang dipakai dalam sebuah proses operasi.
            Misalnya, dalam matematika 7 + 10. Tanda tambah (+) disebut{" "}
            <strong>Operator</strong> sedangkan angka 7 dan 10 disebut{" "}
            <strong>Operand</strong>. Sebagai contoh penulisan operator dalam
            Bahasa pemrograman perhatikan contoh berikut:
          </p>
          <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
            <code>
              {`int x = 5 + 5; 
int y = 10 + x; 
int z = x + y;`}
            </code>
          </pre>
          <p className="mb-4">
            Dalam contoh di atas, operator + menambahkan dua literal angka dan
            menetapkan hasilnya ke sebuah variabel. Operator ini juga
            menambahkan nilai dari dua variabel int dan menetapkan hasilnya ke
            sebuah variabel.
          </p>

          <p className="mb-4">
            Beberapa operator berperilaku berbeda berdasarkan jenis operannya.
            Misalnya, operator + juga dapat digunakan untuk menggabungkan dua
            string.
          </p>
          <p className="mb-4">Contoh penggunaan dalam String :</p>
          <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
            <code>
              {`string kalimat = "Hello " + "World!"; 
string hasil = greeting + name;`}
            </code>
          </pre>
        </div>

        <div className="p-4 mt-2 text-justify text-gray-700 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Kategori Operator dalam C#</h2>
          <p className="mb-2">
            Didalam Bahasa pemrograman C#, terdapat tiga kategori operator yang
            digunakan untuk melakukan berbagai jenis operasi.
          </p>
          <ul className="pl-6 list-disc">
            <li>
              <strong>Operator Unary:</strong> bekerja pada satu operan, Contoh:
              +7, -9, !true, ~0b1100
              <p className="mt-2 mb-2">
                Perhatikan contoh kode program berikut :
              </p>
              <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
                <code>
                  {`int a = 5; 
int b = -a; // b akan bernilai -5 
bool c = !true; // c akan bernilai false 
int d = ~0b1100; // d akan bernilai bitwise complement dari 0b1100 
`}
                </code>
              </pre>
            </li>
            <li>
              <strong>Operator Binary:</strong> bekerja pada dua operan (operan
              sisi kiri dan sisi kanan operator). Contoh: 4 + 8, 9 * 2, 8 % 2
              <p className="mt-2 mb-2">
                Perhatikan contoh kode program berikut :
              </p>
              <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
                <code>
                  {`int a = 10; 
int b = 5; 
int hasil; 

hasil = a + b; // Penambahan 
hasil = a - b; // Pengurangan 
hasil = a * b; // Perkalian 
hasil = a / b; // Pembagian 
hasil = a % b; // Modulus`}
                </code>
              </pre>
            </li>
            <li>
              <strong>Operator Ternary:</strong> Operator yang membutuhkan tiga
              operan untuk melakukan operasi. Contoh: (a == 1) ? 20 : 30
              <p className="mt-2 mb-2">
                Perhatikan contoh kode program berikut :
              </p>
              <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
                <code>
                  {`int a = 5; 
int b = (a == 5) ? 20 : 30; // b akan bernilai 20`}
                </code>
              </pre>
            </li>
          </ul>
        </div>
      </div>

      {/* Kuis */}
      <QuizOperator onComplete={handleQuizComplete} />

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
          disabled={!quizPassed}
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

export default Operator;
