import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import QuizKedua from "./Quiz-bab5/Quiz8";

const PernyataanBersarang = () => {
  const [quiz2Completed, setQuiz2Completed] = useState(false);
  const [quiz2Passed, setQuiz2Passed] = useState(false);
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();
  const { completedLessons } = useSelector((state) => state.auth);
  const currentLessonPath = "/materi/bab5/perulangan-bersarang";

  // Initialize quiz states based on completedLessons
  useEffect(() => {
    if (completedLessons.includes(currentLessonPath)) {
      setQuiz2Completed(true);
      setQuiz2Passed(true);
    }
  }, [completedLessons]);

  const handleQuiz2Complete = (isPassed) => {
    console.log("Quiz 2 completed, isPassed:", isPassed); // Debugging
    setQuiz2Completed(true);
    setQuiz2Passed(isPassed);

    if (isPassed) {
      handleLessonComplete(currentLessonPath);
    }
  };

  const handleNext = () => {
    if (!quiz2Passed) return; // Prevent navigation if quiz not passed
    handleLessonComplete("/materi/bab5/latihan-bab5");
    window.scrollTo(0, 0);
    navigate("/materi/bab5/latihan-bab5");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab5/pernyataan-break-continue");
  };

  // Debugging state changes
  useEffect(() => {
    console.log("quiz2Completed:", quiz2Completed, "quiz2Passed:", quiz2Passed);
  }, [quiz2Completed, quiz2Passed]);

  return (
    <div className="mt-4 mb-4">
      <h1 className="mb-4 text-2xl font-bold text-center">
        BAB 5 - KONTROL ALUR
      </h1>

      <div className="p-4 mb-2 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="mt-2 mb-4 text-2xl font-bold">
          5.6 Perulangan Bersarang
        </h2>
        <p className="mb-3 text-xl font-bold">Perulangan Bersarang</p>
        <p className="mb-3">
          Perulangan bersarang (nested loop) adalah{" "}
          <strong>perulangan yang berada di dalam perulangan lain.</strong>
          Dalam C#, perulangan bersarang{" "}
          <strong>for, while, dan do while</strong> diperbolehkan dan kita juga
          <strong>
            dapat meletakkan perulangan bersarang di dalam jenis perulangan lain
          </strong>
          , seperti dalam perulangan <strong>for</strong> kita diperbolehkan
          untuk meletakkan perulangan <strong>while</strong> bersarang.
        </p>
      </div>

      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <p className="mb-3 text-xl font-bold">Perulangan for Bersarang</p>
        <p className="mb-3">
          Fungsi dari perulangan for pada dasarnya digunakan ketika berapa kali
          pernyataan perulangan akan dieksekusi dengan jumlah yang diketahui
          sebelumnya.{" "}
          <strong>Perulangan bersarang dari for diperbolehkan</strong>, yang
          berarti kita dapat menggunakan perulangan for di dalam perulangan
          lainnya.
        </p>
        <p className="mb-2 font-bold">
          Format umum atas perulangan for bersarang adalah:
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`for (inisialisasi; kondisi; iterasi) 
{ 
    for (inisialisasi; kondisi; iterasi) 
    { 
        runtun statemen; 
    } 
}`}</code>
        </pre>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler:</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/WPfbcE"
            frameborder="0"
          ></iframe>
        </div>
      </div>

      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <p className="mb-3 text-xl font-bold">Perulangan while Bersarang</p>
        <p className="mb-3">
          Dalam perulangan while, kondisi pengujian diberikan pada awal
          perulangan, dan semua pernyataan dieksekusi bernilai true dan ketika
          sampai kondisi <strong>boolean</strong> yang menjadi false, kontrol
          akan keluar dari perulangan while.{" "}
          <strong>Perulangan while bersarang diperbolehkan</strong>, yang
          berarti Anda dapat menggunakan perulangan while di dalam perulangan
          lainnya. Namun, tidak disarankan untuk menggunakan perulangan while
          bersarang karena sulit untuk di-maintenance dan di-debug.
        </p>
        <p className="mb-2 font-bold">
          Format umum atas perulangan while bersarang adalah:
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`while (kondisi) 
{ 
    runtun statemen; 

    while (kondisi) 
    { 
        runtun statemen; 
    } 
}`}</code>
        </pre>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler:</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/9PtXZV"
            frameborder="0"
          ></iframe>
        </div>
      </div>

      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <p className="mb-3 text-xl font-bold">Perulangan do-while Bersarang</p>
        <p className="mb-3">
          Dalam C#, perulangan do while mirip dengan perulangan while dengan
          satu-satunya perbedaan yaitu, Ia memeriksa kondisi setelah
          mengeksekusi pernyataan.{" "}
          <strong>Perulangan do-while bersarang diperbolehkan</strong>, yang
          berarti Anda dapat menggunakan perulangan do-while di dalam perulangan
          lainnya.
        </p>
        <p className="mb-2 font-bold">
          Format umum atas perulangan do-while bersarang adalah:
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`do 
{ 
    runtun statemen; 

    do 
    { 
        runtun statemen; 
    } while (kondisi); 
} while (kondisi);`}</code>
        </pre>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler:</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/LhMiDU"
            frameborder="0"
          ></iframe>
        </div>
      </div>

      <QuizKedua onComplete={handleQuiz2Complete} />

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
              : "Selesaikan kuis dengan benar untuk melanjutkan"
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

export default PernyataanBersarang;
