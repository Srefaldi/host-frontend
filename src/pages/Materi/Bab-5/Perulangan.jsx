import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import QuizPerulangan from "./Quiz-bab5/Quiz5";
import QuizKedua from "./Quiz-bab5/Quiz6";

const PernyataanPerulangan = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quiz2Completed, setQuiz2Completed] = useState(false);
  const [quiz1Passed, setQuiz1Passed] = useState(false);
  const [quiz2Passed, setQuiz2Passed] = useState(false);
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();
  const { completedLessons } = useSelector((state) => state.auth);
  const currentLessonPath = "/materi/bab5/pernyataan-perulangan";

  // Initialize quiz states based on completedLessons
  useEffect(() => {
    if (completedLessons.includes(currentLessonPath)) {
      setQuizCompleted(true);
      setQuiz2Completed(true);
      setQuiz1Passed(true);
      setQuiz2Passed(true);
    }
  }, [completedLessons, currentLessonPath]);

  const handleQuizComplete = (isPassed) => {
    console.log("Quiz 1 completed, isPassed:", isPassed); // Debugging
    setQuizCompleted(true);
    setQuiz1Passed(isPassed);

    if (isPassed && !completedLessons.includes(currentLessonPath)) {
      handleLessonComplete(currentLessonPath);
    }
  };

  const handleQuiz2Complete = (isPassed) => {
    console.log("Quiz 2 completed, isPassed:", isPassed); // Debugging
    setQuiz2Completed(true);
    setQuiz2Passed(isPassed);

    if (isPassed && !completedLessons.includes(currentLessonPath)) {
      handleLessonComplete(currentLessonPath);
    }
  };

  const handleNext = () => {
    if (!quiz2Passed) return; // Prevent navigation if quiz 2 not passed

    window.scrollTo(0, 0);
    navigate("/materi/bab5/pernyataan-break-continue");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab5/pernyataan-switch");
  };

  // Debugging state changes
  useEffect(() => {
    console.log("quizCompleted:", quizCompleted, "quiz1Passed:", quiz1Passed);
    console.log("quiz2Completed:", quiz2Completed, "quiz2Passed:", quiz2Passed);
  }, [quizCompleted, quiz1Passed, quiz2Completed, quiz2Passed]);

  return (
    <div className="mt-4 mb-4">
      <h1 className="mb-4 text-2xl font-bold text-center">
        BAB 5 - KONTROL ALUR
      </h1>

      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="mt-2 mb-4 text-2xl font-bold">
          5.4 Pernyataan Perulangan
        </h2>
        <p className="mb-3 text-xl font-bold">Perintah For</p>
        <p className="mb-3">
          <strong>
            Perulangan for biasa digunakan untuk mengulang suatu proses yang
            telah diketahui jumlah perulangannya.
          </strong>{" "}
          Perulangan for juga biasa disebut dengan determinate loop. Dari segi
          penulisannya, struktur perulangan for tampaknya lebih efisien karena
          susunannya lebih simpel dan sederhana.
        </p>
        <p className="mb-3 font-bold text-l">
          Format umum atas perulangan for adalah:
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`for (inisialisasi; kondisi; iterasi) 
{ 
    runtun statemen; 
}`}</code>
        </pre>
        <ul className="mt-2 text-justify text-gray-600 list-disc list-inside">
          <li className="mb-2 ml-4">
            <strong>Inisialisasi: </strong>
            <span>
              Inisialisasi biasanya berupa sebuah statemen penugasan yang
              menetapkan nilai awal dari variabel kendali suatu perulangan, yang
              berperan{" "}
              <span className="ml-5">
                sebagai counter pengendali perulangan.
              </span>
            </span>
          </li>
          <li className="mb-2 ml-4">
            <strong>Kondisi:</strong> Sebuah ekspresi boolean yang menentukan
            apakah sebuah perulangan atau loop akan terus berulang atau
            berhenti.
          </li>
          <li className="mb-2 ml-4">
            <strong>Iterasi:</strong> Sebuah ekspresi yang mendefinisikan jumlah
            perubahan variabel kendali dari sebuah perulangan setiap kali
            perulangan terjadi.
          </li>
          <li className="mb-2 ml-4">
            <strong>Eksekusi:</strong> Perulangan for akan terus mengeksekusi
            runtun statemen sepanjang pengujian kondisi bernilai true. Ketika
            kondisi bernilai false, maka{" "}
            <span className="ml-5">
              perulangan akan berhenti dan eksekusi program akan berlanjut ke
              statemen berikutnya setelah for.
            </span>
          </li>
        </ul>
        <p className="mb-3 font-bold">Contoh Penggunaan Perulangan for:</p>
        <p className="mb-3">
          <strong>Contoh 1:</strong> Apabila kita ingin mencetak kata hello
          sebanyak 10 kali pada sebuah program, dalam kasus tersebut, sudah kita
          ketahui bahwa pengulangan pencetakan kata akan dilakukan sebanyak 10
          kali.
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`for (int i = 0; i < 10; i++) 
{ 
    Console.WriteLine("hello"); 
}`}</code>
        </pre>
        <p className="mb-3">
          <strong>Contoh 2 (increment):</strong> Apabila kita ingin mencetak
          angka 1 hingga 15. Dalam kasus tersebut, sudah kita ketahui bahwa
          pengulangan akan dimulai dari angka 1 (satu) sampai dengan 15 (lima
          belas).
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`for (int i = 1; i <= 15; i++) 
{ 
    Console.WriteLine(i); 
}`}</code>
        </pre>
        <p className="mb-3">
          <strong>Contoh 3 (decrement):</strong> Jika kita ingin mencetak angka
          sebaliknya dari 15 (lima belas) hingga 1 (satu). Maka hal yang perlu
          kita lakukan adalah mengganti nilai awal menjadi 15 pada inisialisasi,
          mengganti kondisi dan mengganti iterasi increment(i++), menjadi
          decrement(i--).
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`for (int i = 15; i >= 1; i--) 
{ 
    Console.WriteLine(i); 
}`}</code>
        </pre>
        <p className="mb-3">
          <strong>Contoh 4 (perulangan for dengan pengkondisian):</strong> Jika
          kita akan mencetak angka genap dari 1 hingga 20 (2 4 6 8 10 12 14 16
          18 20). Dalam kasus tersebut, sudah kita ketahui bahwa pengulangan
          akan dimulai dari angka 1 (satu) sampai dengan 20 (dua puluh), hanya
          saja terdapat statemen pengkondisian untuk mengecek apakah sebuah
          angka merupakan bilangan genap atau ganjil.
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`for (int i = 1; i <= 20; i++) 
{ 
    if (i % 2 == 0) 
    { 
        Console.WriteLine(i); 
    } 
}`}</code>
        </pre>
      </div>
      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <p className="mb-3">
          <strong>Hal Penting pada Perulangan for:</strong>
          <br />
          <span>
            Satu hal yang penting mengenai perulangan for adalah bahwa{" "}
            <strong>ekspresi kondisional selalu diuji terlebih dahulu</strong>.
            Hal ini berarti bahwa kode di dalam for tidak akan dieksekusi bila
            kondisi tersebut bernilai false.
          </span>
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`for (int hitung = 10; hitung < 5; hitung++) 
{ 
    Console.WriteLine(hitung); // statemen ini tidak akan pernah dieksekusi 
}`}</code>
        </pre>
        <p className="mb-3">
          Perulangan ini tidak akan pernah dieksekusi karena variabel
          kendalinya, hitung, lebih besar dari 5 ketika pertama kali program
          mengeksekusi perulangan for. Ini membuat ekspresi kondisional,{" "}
          <code>hitung {"<"} 5</code>, bernilai false; jadi,{" "}
          <strong>satu iterasi perulangan pun tidak pernah terjadi.</strong>
        </p>
      </div>
      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <p className="mb-3">
          <strong>Variasi Perulangan For:</strong>
          <br /> Perulangan for merupakan salah satu statement yang paling
          fleksibel dalam bahasa C# karena mengizinkan berbagai variasi.
        </p>
        <p className="mb-3">
          <strong>Menggunakan beberapa variabel kendali:</strong>
          <br /> Perulangan for memperbolehkan kita untuk menggunakan{" "}
          <strong>dua</strong> atau <strong>lebih variabel</strong> untuk
          mengendalikan perulangan. Ketika menggunakan beberapa variabel kendali
          perulangan, statement inisialisasi dan increment untuk tiap variabel
          dipisahkan dengan koma ,.
        </p>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler:</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/w3OAvF"
            frameborder="0"
          ></iframe>
        </div>
        <p className="mb-2">
          Di sini, koma , memisahkan dua statement inisialisasi dan dua ekspresi
          iterasi. Ketika perulangan dimulai, kedua i dan j diinisialisasi.
          Setiap kali loop berulang, i di-increment dan j di-decrement. Kita
          dapat menaruh sebanyak mungkin inisialisasi dan statement iterasi,
          tetapi pada praktiknya, variabel kendali dalam sebuah perulangan yang
          lebih dari dua akan membuat perulangan for menjadi sulit dimengerti.
        </p>
      </div>
      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <p className="mb-3">
          <strong>Ekspresi Kondisional:</strong>
          <br /> Ekspresi kondisional pengendali perulangan for dapat berupa
          sembarang ekspresi yang menghasilkan bool. Kondisi ini bisa saja tidak
          melibatkan variabel kendali perulangan. Sebagai contoh, pada program
          berikut, perulangan for dikendalikan oleh nilai dari variabel{" "}
          <strong>selesai</strong>.
        </p>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler:</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/D8Tbsj"
            frameborder="0"
          ></iframe>
        </div>
        <p className="mb-2">
          Pada contoh di atas, perulangan for beriterasi sampai variabel bool,
          selesai, bernilai true. Variabel ini ditetapkan bernilai true di dalam
          perulangan ketika kuadrat dari i lebih besar dari atau sama dengan j.
        </p>
      </div>
      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <p className="mb-3">
          <strong>Bagian yang hilang:</strong>
          <br />
          Dalam C#, adalah hal yang memungkinkan untuk salah satu atau semuanya
          dari inisialisasi, kondisi, atau iterasi pada perulangan for dibiarkan
          kosong. Sebagai contoh perhatikan kode program di bawah ini:
        </p>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler:</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/w3OAvF"
            frameborder="0"
          ></iframe>
        </div>
        <p className="mb-2">
          Pada kode program di atas, iterasi pada perulangan for dibiarkan
          kosong dan variabel kendali perulangan i di increment di dalam
          body/isi sebuah perulangan.
        </p>
        <p className="mb-2">
          Selain dari bagian iterasi, bagian inisialisasi juga dapat dibiarkan
          kosong dalam sebuah perulangan for:
        </p>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler:</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/JPI1d1"
            frameborder="0"
          ></iframe>
        </div>
      </div>
      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <p className="mb-3">
          <strong>Perulangan Tak Berhingga:</strong>
          <br /> Kita dapat menciptakan loop tak berhingga (perulangan yang
          tidak pernah berhenti) menggunakan for dengan membiarkan ekspresi
          kondisi kosong.
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`for (; ; ) 
{ 
    // runtun statemen . . . 
}`}</code>
        </pre>
      </div>

      <QuizPerulangan onComplete={handleQuizComplete} />

      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <p className="mb-3 text-xl font-bold">Perintah While</p>
        <p className="mb-2">
          Selain dari perulangan for, terdapat perulangan while di dalam C#.
          Perulangan while biasanya{" "}
          <strong>
            digunakan pada saat kita ingin terus menerus mengulang sebuah proses
            selama suatu kondisi terpenuhi atau bernilai true.
          </strong>
        </p>
        <p className="mb-2">Format umum dari perulangan while adalah:</p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`while (kondisi) 
{ 
    runtun statemen; 
}`}</code>
        </pre>
        <p className="mb-2">
          Statement dieksekusi bila kondisi bernilai true. Jika bernilai false,
          kendali program akan melewatinya dan bergerak ke baris kode lainnya
          setelah perulangan.
        </p>
        <p className="mb-2">
          Berikut adalah sebuah contoh sederhana di mana perulangan while,
          dipakai untuk menghitung jumlah digit di dalam suatu integer:
        </p>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler:</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/RI7QV5"
            frameborder="0"
          ></iframe>
        </div>
        <p className="mb-2 font-bold">Perulangan While Bekerja Seperti Ini:</p>
        <p className="mb-2">
          Nilai dari <strong>angka</strong> diuji. Jika <strong>angka</strong>{" "}
          lebih besar dari 0, kounter <strong>jumlahDigit</strong> di inkrement,
          dan <strong>angka</strong> dibagi dengan 10. Selama nilai di dalam{" "}
          <strong>angka</strong> lebih besar dari 0, maka perulangan akan
          berulang. Ketika <strong>angka</strong> bernilai 0, perulangan akan
          berhenti dan <strong>jumlahDigit</strong> memuat jumlah digit di dalam
          integer yang diberikan.
        </p>
      </div>
      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h3 className="font-bold">
          Perulangan while dengan format perulangan for
        </h3>
        <p className="mb-2">
          Perulangan while juga dapat dibentuk dengan format yang sama dengan
          for, pada umumnya kita perlu memperhatikan tiga hal, yaitu:
          inisialisasi, kondisi, dan iterasi. Sehingga strukturnya menjadi:
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`inisialisasi; 
while (kondisi) 
{ 
    runtun statemen; 
    iterasi; 
}`}</code>
        </pre>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler:</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/agOA3C"
            frameborder="0"
          ></iframe>
        </div>
      </div>
      <div className="p-4 mt-2 mb-4 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <p className="mb-3 text-xl font-bold">Perintah Do While</p>
        <p className="mb-2">
          Di dalam C#, perulangan do-while mirip dengan perulangan while dengan
          satu-satunya perbedaan yaitu, do-while memeriksa kondisi setelah
          mengeksekusi pernyataan.
        </p>
        <p className="mb-2">
          Hal itu berarti kondisi diuji di awal perulangan, perulangan do-while
          memeriksa kondisinya di akhir perulangan. Ini berarti bahwa perulangan
          do-while{" "}
          <strong>selalu dieksekusi sedikitnya 1 kali perulangan.</strong>{" "}
          Format umum atas perulangan do-while adalah:
        </p>
        <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
          <code>{`do 
{ 
    runtun statemen; 
} while (kondisi);`}</code>
        </pre>
        <p className="mb-2">
          Perulangan <strong>do-while</strong> dieksekusi sepanjang ekspresi
          kondisional bernilai <strong>true</strong>. Program berikut
          menggunakan perulangan <strong>do-while</strong> untuk menampilkan
          digit - digit dari sebuah integer dengan urutan terbalik:
        </p>
        <p className="mb-2 font-bold">Cobalah kode program pada compiler:</p>
        <div className="flex justify-center mb-4">
          <iframe
            width="100%"
            height="475"
            src="https://dotnetfiddle.net/Widget/j2E6n0"
            frameborder="0"
          ></iframe>
        </div>
        <p className="mb-2 font-bold">Cara perulangan do-while bekerja:</p>
        <p className="mb-2">
          Pada tiap iterasi, digit paling kiri didapatkan dengan menghitung sisa
          dari sebuah pembagian integer (pembagian oleh 10). Digit ini kemudian
          ditampilkan. Selanjutnya, nilai di dalam <strong>angka</strong> dibagi
          10, Proses ini berulang sampai <strong>angka</strong> bernilai 0.
        </p>
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

export default PernyataanPerulangan;
