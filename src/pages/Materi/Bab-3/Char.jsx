import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import QuizChar from "./Quiz-bab3/Quiz7";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import Swal from "sweetalert2";

const Char = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const navigate = useNavigate();
  const { handleLessonComplete, handleQuizComplete } = useOutletContext();
  const { completedLessons } = useSelector((state) => state.auth);
  const currentLessonPath = "/materi/bab3/char";

  // Periksa apakah materi sudah diselesaikan saat komponen dimuat
  useEffect(() => {
    if (completedLessons.includes(currentLessonPath)) {
      setQuizCompleted(true);
      setQuizPassed(true);
    }
  }, [completedLessons, currentLessonPath]);

  const onQuizComplete = (isPassed) => {
    console.log("Quiz completed, isPassed:", isPassed); // Debugging
    setQuizCompleted(true);
    setQuizPassed(isPassed);

    if (isPassed) {
      handleLessonComplete(currentLessonPath);
      handleQuizComplete(currentLessonPath);
    }
  };

  const handleNext = () => {
    if (!quizPassed) return; // Prevent navigation if quiz not passed
    handleLessonComplete(currentLessonPath);
    window.scrollTo(0, 0);
    navigate("/materi/bab3/string");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab3/boolean");
  };

  // Debugging state changes
  useEffect(() => {
    console.log("quizCompleted:", quizCompleted, "quizPassed:", quizPassed);
  }, [quizCompleted, quizPassed]);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-center">BAB 3 - TIPE DATA</h1>
      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Tipe Data Dasar: Char</h2>
        <p className="mt-4">
          Tipe data <code>char</code> (character) dalam bahasa pemrograman C#
          digunakan untuk merepresentasikan karakter tunggal (single character)
          dalam Unicode UTF-16. Tipe data ini dapat digunakan untuk menyimpan
          karakter seperti huruf, angka, simbol, atau karakter khusus lainnya.
          Dalam C#, tipe data <code>char</code> adalah alias untuk jenis{" "}
          <code>System.Char</code>.
        </p>
        <h3 className="mt-4 text-xl font-bold">
          Deklarasi dan Inisialisasi Variabel char
        </h3>
        <p className="mt-2">
          Untuk mendeklarasikan variabel dengan tipe data <code>char</code>,
          gunakan kata kunci <code>char</code> diikuti dengan nama variabel dan
          karakter yang ingin disimpan di dalam tanda petik satu. Berikut adalah
          contoh kode untuk mendeklarasikan dan menginisialisasi variabel char:
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`char var1 = 'a';\nchar var2 = 'Z';\n\nConsole.WriteLine(var1);  // Output: a\nConsole.WriteLine(var2);  // Output: Z`}
          </code>
        </pre>
        <p className="mt-2">
          Dalam kode di atas, <code>var1</code> menyimpan karakter{" "}
          <code>'a'</code> dan <code>var2</code> menyimpan karakter{" "}
          <code>'Z'</code>. Karakter disimpan dalam tanda petik satu.
        </p>
        <h3 className="mt-4 text-xl font-bold">
          Menyimpan Karakter Angka dan Non-Alfanumerik
        </h3>
        <p className="mt-2">
          Tipe data <code>char</code> juga bisa digunakan untuk menyimpan
          karakter angka dan karakter non-alfanumerik. Berikut adalah contohnya:
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`char var1 = '5';\nchar var2 = '$';\n\nConsole.WriteLine(var1);  // Output: 5\nConsole.WriteLine(var2);  // Output: $`}
          </code>
        </pre>
        <p className="mt-2">
          Pada kode di atas, <code>var1</code> menyimpan karakter{" "}
          <code>'5'</code> dan <code>var2</code> menyimpan karakter{" "}
          <code>'$'</code>. Perlu diperhatikan bahwa karakter <code>'5'</code>{" "}
          berbeda dengan angka <code>5</code> dari tipe data integer.
        </p>
        <h3 className="mt-4 text-xl font-bold">Karakter Unicode dalam C#</h3>
        <p className="mt-2">
          Tipe data <code>char</code> mendukung karakter Unicode. Karakter
          Unicode dapat diwakili dengan awalan (prefix) <code>\u</code>, diikuti
          dengan empat digit nomor Unicode heksadesimal. Berikut adalah contoh
          kode yang menggunakan karakter Unicode:
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`char var1 = '\u0041';\nchar var2 = '\u00B5'; \nchar var3 = '\u00C6'; \n\nConsole.WriteLine(var1);  // Output: A\nConsole.WriteLine(var2);  // Output: µ\nConsole.WriteLine(var3);  // Output: Æ`}
          </code>
        </pre>
        <p className="mt-2">
          Karakter Unicode mendukung berbagai jenis aksara di dunia, termasuk
          huruf Arab, China, Jepang, Korea, serta karakter khusus seperti emoji.
          Namun, tidak semua karakter Unicode bisa ditampilkan tergantung pada
          media yang dipakai.
        </p>
        <h3 className="mt-4 text-xl font-bold">Karakter Khusus dalam C#</h3>
        <p className="mt-2">
          Tipe data <code>char</code> juga mendukung karakter khusus seperti
          tanda kutip, karakter enter, dan lainnya dengan menggunakan karakter
          backslash <code>\</code>, yang disebut sebagai escape character.
          Berikut adalah contoh kode yang menggunakan karakter khusus:
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`char var1 = '\''; \nchar var2 = '\n'; \nchar var3 = '\"'; \n\nConsole.Write(var1); \nConsole.Write(var2); \nConsole.Write(var3);`}
          </code>
        </pre>
        <p className="mt-2">
          Dalam contoh di atas, karakter tanda kutip tunggal (<code>'</code>)
          diwakili oleh <code>\'</code>, karakter enter diwakili oleh{" "}
          <code>\n</code>, dan karakter tanda kutip dua (<code>"</code>)
          diwakili oleh <code>\"</code>. Perhatikan bahwa{" "}
          <code>Console.Write()</code> digunakan untuk menampilkan karakter
          tanpa baris baru, sehingga karakter tanda kutip dua tampil di baris
          baru karena karakter enter (<code>\n</code>) di atasnya.
        </p>
        <h3 className="mt-4 text-xl font-bold">Membaca Input Tipe Data char</h3>
        <p className="mt-2">
          Proses pembacaan data <code>char</code> dapat dilakukan dengan
          menggunakan <code>Console.ReadKey()</code>
          atau <code>Console.ReadLine()</code> dikombinasikan dengan pengambilan
          karakter pertama. Berikut adalah contoh penggunaan{" "}
          <code>Console.ReadKey()</code>:
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`Console.Write("Masukkan sebuah karakter: ");\nchar var1 = Console.ReadKey().KeyChar;\n\nConsole.WriteLine();\nConsole.WriteLine("Karakter yang dimasukkan: " + var1);`}
          </code>
        </pre>
        <p className="mt-2">
          Dalam contoh di atas, <code>Console.ReadKey().KeyChar</code> digunakan
          untuk membaca karakter yang dimasukkan oleh pengguna dan menyimpannya
          dalam variabel <code>var1</code>.
        </p>
        <h3 className="mt-4 text-xl font-bold">Cobalah Kode Program Berikut</h3>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/RgoGvr"
          ></iframe>
        </div>
        <p className="mt-2">
          Tipe data char dalam C# digunakan untuk merepresentasikan karakter
          tunggal dalam Unicode UTF-16. Dengan memahami cara mendeklarasikan,
          menginisialisasi, dan menggunakan variabel char, kita dapat menulis
          kode yang lebih efektif dan efisien dalam mengelola karakter di dalam
          program kita.
        </p>
      </div>

      {/* Kuis */}
      <QuizChar onComplete={onQuizComplete} />

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

export default Char;
