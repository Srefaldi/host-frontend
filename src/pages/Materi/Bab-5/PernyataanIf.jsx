import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import QuizIfElse from "./Quiz-bab5/Quiz2";
import Quiz2 from "./Quiz-bab5/Quiz3";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";

const PernyataanIfElse = () => {
  const [quiz1Completed, setQuiz1Completed] = useState(false);
  const [quiz2Completed, setQuiz2Completed] = useState(false);
  const [quiz1Passed, setQuiz1Passed] = useState(false);
  const [quiz2Passed, setQuiz2Passed] = useState(false);
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();
  const { completedLessons } = useSelector((state) => state.auth);
  const currentLessonPath = "/materi/bab5/pernyataan-if-else";

  // Initialize quiz states based on completedLessons
  useEffect(() => {
    if (completedLessons.includes(currentLessonPath)) {
      setQuiz1Completed(true);
      setQuiz2Completed(true);
      setQuiz1Passed(true);
      setQuiz2Passed(true);
    }
  }, [completedLessons]);

  const handleQuiz1Complete = (isPassed) => {
    console.log("Quiz 1 completed, isPassed:", isPassed); // Debugging
    setQuiz1Completed(true);
    setQuiz1Passed(isPassed);

    if (isPassed) {
      handleLessonComplete(currentLessonPath);
    }
  };

  const handleQuiz2Complete = (isPassed) => {
    console.log("Quiz 2 completed, isPassed:", isPassed); // Debugging
    setQuiz2Completed(true);
    setQuiz2Passed(isPassed);

    if (isPassed) {
      handleLessonComplete(currentLessonPath);
    }
  };

  const handleNext = () => {
    if (!quiz2Passed) return; // Prevent navigation if quiz 2 not passed

    window.scrollTo(0, 0);
    navigate("/materi/bab5/pernyataan-switch");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab5/pengertian-kontrol-alur");
  };

  // Debugging state changes
  useEffect(() => {
    console.log("quiz1Completed:", quiz1Completed, "quiz1Passed:", quiz1Passed);
    console.log("quiz2Completed:", quiz2Completed, "quiz2Passed:", quiz2Passed);
  }, [quiz1Completed, quiz1Passed, quiz2Completed, quiz2Passed]);

  return (
    <div className="mt-4 mb-4">
      <h1 className="mb-4 text-2xl font-bold text-center">
        BAB 5 - KONTROL ALUR
      </h1>

      {/* Pendahuluan Materi */}
      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="mt-2 mb-4 text-2xl font-bold">5.2 Pernyataan If-Else</h2>
        <p className="mb-2">
          Dalam pemrograman, pernyataan <strong>if-else</strong> adalah salah
          satu kontrol alur dasar yang memungkinkan program untuk mengambil
          keputusan berdasarkan kondisi tertentu. Kontrol alur ini sangat
          penting untuk membuat aplikasi yang dinamis dan responsif terhadap
          berbagai situasi yang mungkin terjadi selama eksekusi program.
        </p>
        <h3 className="font-bold">Pernyataan If</h3>
        <p className="mb-2">
          if digunakan{" "}
          <strong>
            untuk mengeksekusi suatu blok statement sesuai dengan kondisi yang
            ada
          </strong>
          . Sintaks if juga umumnya digunakan sebagai decision making (penentu
          keputusan).
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`if (kondisi) 
{ 
    // statement 
}`}</code>
        </pre>
        <p className="mb-2">
          Pernyataan if menentukan kondisi ekspresi yang akan dievaluasi.
          Apabila <strong> kondisi benar (true)</strong>, maka{" "}
          <strong>
            pernyataan dalam kurung kurawal {`{}`} akan dieksekusi
          </strong>
          . Apabila <strong>kondisi salah (false)</strong>, maka{" "}
          <strong>akan diabaikan</strong>. Kemudian komputer akan melanjutkan
          program yang berada setelah pernyataan if tersebut.
        </p>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler :</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/feof8O"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h3 className="font-bold">Penggunaan Operator</h3>
        <p className="mb-2">
          Dalam menggunakan statement if kita juga dapat memanfaatkan{" "}
          <strong>operator perbandingan (operator relasi)</strong>,
          <strong> operator logika</strong>, dan{" "}
          <strong> operator kesetaraan</strong> untuk membangun logika dengan
          statement if. Misalnya kita akan membuat logika untuk mengetahui
          <strong>
            apakah suatu angka masukan dari pengguna lebih besar daripada angka
            5
          </strong>
          .
        </p>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler :</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/FR3iI5"
            frameBorder="0"
          ></iframe>
        </div>
        <p className="mb-2">
          Pada kode program di atas, if menjelaskan bahwa apabila nilai yang
          dimasukan lebih dari 5, maka statement Console.WriteLine akan
          dijalankan yang mana menampilkan kata "nilai lebih dari 5" pada layar.
        </p>
        <p className="mb-2 font-bold">Contoh 1 :</p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`if (5 + 4 == 9) 
{ 
    Console.WriteLine("Benar"); 
}`}</code>
        </pre>
        <p className="mb-2">
          Pada program di atas, <strong>if</strong> menjelaskan bahwa apabila
          hasil dari <strong>5 + 4 </strong>yaitu <strong> 9 </strong>sama
          dengan 9 maka statement Console.WriteLine akan dijalankan, yang mana
          menampilkan kata <strong>Benar </strong>pada layar.
        </p>
        <p className="mb-2 font-bold">Contoh 2 :</p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`if (3 * 3 != 9) 
{ 
    Console.WriteLine("Benar"); 
}`}</code>
        </pre>
        <p className="mb-2">
          Pada program di atas, operator diubah dari sama dengan == menjadi
          bukan sama dengan <strong>!= </strong>maka kata benar tidak akan
          dicetak pada layar.
        </p>
      </div>
      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h3 className="font-bold">Pernyataan Else</h3>
        <p className="mb-2">
          <strong>Else adalah statement pengikut dari if</strong>, apabila
          statement if adalah statement utama maka statement else adalah
          statement kedua atau statement opsional. Statement else akan
          dieksekusi apabila statement if tidak mendapatkan hasil atau mempunyai
          hasil salah (false).
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`if (kondisi) 
{ 
    // statement 
} 
else 
{ 
    // statement 
}`}</code>
        </pre>
        <p className="mb-2">Compiler akan menguji kondisi:</p>
        <ul className="pl-6 mb-2 list-disc">
          <li>
            Apabila statement bernilai True, maka kode di dalam pernyataan if
            akan dieksekusi.
          </li>
          <li>
            Apabila statement bernilai False, maka kode di dalam pernyataan else
            akan dieksekusi.
          </li>
        </ul>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler :</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/pSZyLU"
            frameBorder="0"
          ></iframe>
        </div>
      </div>

      <QuizIfElse onComplete={handleQuiz1Complete} />

      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h3 className="font-bold">Pernyataan if bersarang</h3>
        <p className="mb-2">
          <strong>Statemen if </strong>bersarang umum dijumpai dalam
          pemrograman. <strong>Statement if bersarang </strong>adalah sebuah
          statement <strong>if </strong>yang menjadi target dari{" "}
          <strong>if </strong> atau <strong>else</strong> lain. Jadi dapat
          diasumsikan bahwa ada statement <strong>if </strong>di dalam statement{" "}
          <strong>if </strong>.
        </p>
        <p className="mb-2 font-bold">Contoh 1 :</p>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler :</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/j64s8i"
            frameBorder="0"
          ></iframe>
        </div>
        <p className="mb-2 font-bold">Contoh 2 :</p>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler :</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/0HuiA0"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h3 className="font-bold">If, Else, dan Else If</h3>
        <p className="mb-2">
          Statement <strong>if-else-if </strong>merupakan sintaks pemrograman
          yang umum dijumpai. Format umum dari statement{" "}
          <strong>if-else-if </strong> adalah
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`if (kondisi) 
    statement; 
else if (kondisi) 
    statement; 
else if (kondisi) 
    statement; 
. . . 
else 
    statement;`}</code>
        </pre>
        <p className="mb-2">
          Ekspresi kondisional dievaluasi dari atas ke bawah. Begitu ditemukan
          kondisi yang bernilai <strong>True</strong>, maka statement terkait
          akan dieksekusi, dan sisa kondisi akan dilompati. Jika tidak ada
          kondisi bernilai <strong>True</strong>, maka <strong>else </strong>
          terakhir akan dieksekusi. Kalau <strong>else </strong> terakhir
          berperan sebagai kondisi default. Jika tidak ada{" "}
          <strong>else </strong> terakhir dan semua kondisi bernilai{" "}
          <strong>False </strong>, <strong>maka tidak akan ada aksi</strong>{" "}
          yang akan dilakukan.
        </p>
        <p className="mb-2">
          Berikut contoh program yang mendemonstrasikan penggunaan if-else-if.
          Program ini mencari faktor digit tunggal terkecil (selain 1) atas
          sebuah nilai yang diberikan.
        </p>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler :</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/RwWXSf"
            frameBorder="0"
          ></iframe>
        </div>
      </div>

      <Quiz2 onComplete={handleQuiz2Complete} />

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
          className="flex items-center justify-between px-4 py-2 text-white rounded-lg"
          style={{
            backgroundColor: quiz2Passed ? "#6E2A7F" : "#A0A0A0",
            cursor: quiz2Passed ? "pointer" : "not-allowed",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            quiz2Passed && (e.currentTarget.style.backgroundColor = "#5B1F6A")
          }
          onMouseLeave={(e) =>
            quiz2Passed && (e.currentTarget.style.backgroundColor = "#6E2A7F")
          }
          disabled={!quiz2Passed}
          aria-label={
            quiz2Passed
              ? "Lanjut ke materi berikutnya"
              : "Selesaikan kedua kuis dengan benar untuk melanjutkan"
          }
        >
          <span>Selanjutnya</span>
          <img
            src={quiz2Passed ? nextIcon : lockIcon}
            alt={quiz2Passed ? "Selanjutnya" : "Terkunci"}
            className="w-5 h-5 ml-2"
          />
        </button>
      </div>
    </div>
  );
};

export default PernyataanIfElse;
