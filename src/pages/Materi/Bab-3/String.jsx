import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import QuizString from "./Quiz-bab3/Quiz8";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";
import Swal from "sweetalert2";

const String = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();
  const { completedLessons } = useSelector((state) => state.auth);
  const currentLessonPath = "/materi/bab3/string";

  // Initialize quizPassed based on completedLessons
  useEffect(() => {
    if (completedLessons.includes(currentLessonPath)) {
      setQuizPassed(true);
      setQuizCompleted(true);
    }
  }, [completedLessons]);

  const handleQuizComplete = (isPassed) => {
    console.log("Quiz completed, isPassed:", isPassed); // Debugging
    setQuizCompleted(true);
    setQuizPassed(isPassed);

    if (isPassed) {
      handleLessonComplete(currentLessonPath);
    }
  };

  const handleNext = () => {
    if (!quizPassed) return; // Prevent navigation if quiz not passed
    handleLessonComplete("/materi/bab3/latihan-bab3");
    window.scrollTo(0, 0);
    navigate("/materi/bab3/latihan-bab3");
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
        <h2 className="text-2xl font-bold">Tipe Data Dasar: String</h2>
        <p className="mt-4">
          String digunakan untuk menyimpan teks. Variabel string berisi kumpulan
          karakter yang dikelilingi oleh tanda kutip ganda.
        </p>
        <p className="mt-2">
          Di topik sebelumnya kita telah mempelajari cara deklarasi dan
          inisialisasi variabel. String juga dideklarasi dan diinisialisasi
          dengan cara yang sama:
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>{`string greeting = "Hello"; `}</code>
        </pre>
        <h3 className="mt-4 text-xl font-bold">String Properties</h3>
        <p className="mt-2">
          String pada C# sebenarnya adalah sebuah objek, yang berisi properti
          dan fungsi/method yang dapat melakukan operasi tertentu pada string.
          Misalnya, panjang dari sebuah string dapat ditemukan dengan properti{" "}
          <code>Length</code>:
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`string txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
Console.WriteLine("Panjang dari string txt adalah : " + txt.Length); 
// Output 
Panjang dari string txt adalah : 26 `}
          </code>
        </pre>
        <h3 className="mt-4 text-xl font-bold">String Methods</h3>
        <p className="mt-2">
          Ada banyak method atau fungsi string yang tersedia, misalnya{" "}
          <code>ToUpper()</code> dan
          <code>ToLower()</code>, yang mengembalikan salinan string yang diubah
          menjadi huruf besar atau kecil. Contoh penggunaan fungsi/method
          <code>ToUpper()</code> dan <code>ToLower()</code> :
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`string txt = "Hello World"; 
Console.WriteLine(txt.ToUpper());   // Output "HELLO WORLD" 
Console.WriteLine(txt.ToLower());   // Output "hello world `}
          </code>
        </pre>
        <h3 className="mt-4 text-xl font-bold">String Concatenation</h3>
        <p className="mt-2">
          Operator <code>+</code> dapat digunakan untuk menggabungkan lebih dari
          satu string. Ini disebut concatenation. Contoh penggunaan string
          <code>concatenation:</code>
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`string firstName = "John "; 
string lastName = "Doe"; 
string name = firstName + lastName; 
Console.WriteLine(name); // Output "John Doe" `}
          </code>
        </pre>
        <p className="mt-2">
          Kita juga dapat menggunakan method/fungsi{" "}
          <code>string.Concat() </code>
          untuk menggabungkan dua string :
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`string firstName = "John "; 
string lastName = "Doe"; 
string name = string.Concat(firstName, lastName); 
Console.WriteLine(name); // Output "John Doe" `}
          </code>
        </pre>
        <h3 className="mt-4 text-xl font-bold">String Interpolation</h3>
        <p className="mt-2">
          Opsi lain dari string concatenation adalah string interpolation yang
          diperkenalkan di C# versi 6. String interpolation menggantikan
          nilai-nilai variabel ke dalam placeholder dalam sebuah string. Contoh
          penggunaan <code>string interpolation</code> :
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`string firstName = "John"; 
string lastName = "Doe"; 
string name = $"My full name is: {firstName} {lastName}"; 
Console.WriteLine(name); // 
// Output 
My full name is: John Doe `}
          </code>
        </pre>
        <p className="mt-2">
          Perhatikan juga bahwa harus menggunakan tanda dolar <code>$</code>
          untuk method interpolation pada string.
        </p>
        <h3 className="mt-4 text-xl font-bold">Access Strings</h3>
        <p className="mt-2">
          Agar dapat mengakses karakter dalam string dengan indeksnya di dalam
          tanda kurung siku [ ]. Contoh mencetak karakter pertama di{" "}
          <code>myString</code>:
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`string myString = "Hello"; 
Console.WriteLine(myString[0]);  // Output "H" `}
          </code>
        </pre>
        <p className="mt-2">
          <strong>Catatan:</strong>{" "}
          <code>indeks string dimulai dengan 0 : [0]</code> adalah karakter
          pertama. [1] adalah karakter kedua, dan seterusnya. Contoh mencetak
          karakter kedua [1] di myString:
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`string myString = "Hello"; 
Console.WriteLine(myString[1]);  // Output "e"  `}
          </code>
        </pre>
        <h3 className="mt-4 text-xl font-bold">Metode Lainya</h3>
        <p className="mt-2">
          Anda juga dapat menemukan posisi indeks karakter tertentu dalam
          string, dengan menggunakan method/fungsi <code>IndexOf()</code>:
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`string myString = "Hello"; 
Console.WriteLine(myString.IndexOf("e"));  // Output "1" `}
          </code>
        </pre>
        <p className="mt-2">
          Method/fungsi lain yang juga berguna adalah <code>Substring()</code>,
          yang mengekstrak karakter dari string, mulai dari posisi/indeks
          karakter yang ditentukan, dan mengembalikan string baru. Method ini
          sering digunakan bersama dengan <code>IndexOf()</code> untuk
          mendapatkan posisi karakter tertentu.
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`// Full name 
string name = "John Doe"; 

// Location of the letter D 
int charPos = name.IndexOf("D"); 

// Get last name 
string lastName = name.Substring(charPos); 

// Print the result 
Console.WriteLine(lastName); 
`}
          </code>
        </pre>
        <h3 className="mt-4 text-xl font-bold">Special Characters</h3>
        <p className="mt-2">
          Backslash (<code>\</code>) escape character mengubah special
          characters menjadi string characters.
        </p>
        <div className="flex justify-center p-4 mt-2 mb-4">
          <table className="border border-gray-300">
            <thead className="bg-[#68217A] text-white text-center">
              <tr>
                <th className="p-2 text-white border border-gray-300">
                  Karakter Escape
                </th>
                <th className="p-2 text-white border border-gray-300">Hasil</th>
                <th className="p-2 text-white border border-gray-300">
                  Deskripsi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300">\'</td>
                <td className="p-2 border border-gray-300">'</td>
                <td className="p-2 border border-gray-300">Single quote</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">\"</td>
                <td className="p-2 border border-gray-300">"</td>
                <td className="p-2 border border-gray-300">Double quote</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">\\</td>
                <td className="p-2 border border-gray-300">\</td>
                <td className="p-2 border border-gray-300">Backslash</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">Contoh :</p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`// backslash ditambahkan pada double quote didalam sebuah string ( \" ): 
string txt = "We are the so-called \"Vikings\" from the north."; 

// backslash ditambahkan pada single quote didalam sebuah string (\') : 
string txt = "It\'s alright."; 

// backslash ditambahkan pada single backslash didalam sebuah string (\\): 
string txt = "The character \\ is called backslash."; `}
          </code>
        </pre>
        <p className="mt-2">
          Escape character lainnya pada C# yang juga berguna adalah:
        </p>
        <div className="flex justify-center p-4 mt-2 mb-4">
          <table className="border border-gray-300">
            <thead className="bg-[#68217A] text-white text-center">
              <tr>
                <th className="p-2 text-white border border-gray-300">Kode</th>
                <th className="p-2 text-white border border-gray-300">Hasil</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300">\n</td>
                <td className="p-2 border border-gray-300">Baris Baru</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">\t</td>
                <td className="p-2 border border-gray-300">Spasi Maju</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">\b</td>
                <td className="p-2 border border-gray-300">Spasi Mundur</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="mt-4 text-xl font-bold">
          Perbedaan Menambahkan Angka dan String
        </h3>
        <p className="mt-2">
          C# menggunakan operator <code>+</code> untuk dua proses yaitu addition
          (penambahan nilai) dan concatenation (penggabungan string). Hal yang
          perlu diingat adalah angka ditambahkan sedangkan string digabungkan.
          Contoh, jika Anda menambahkan dua angka, hasilnya akan menjadi angka:
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`int x = 10; 
int y = 20; 
int z = x + y;  // z akan menjadi 30 (sebuah integer/angka) `}
          </code>
        </pre>
        <p className="mt-2">
          Namun, jika menambahkan dua buah string, hasilnya akan menjadi
          rangkaian string:
        </p>
        <pre className="p-2 font-mono bg-gray-100 rounded">
          <code>
            {`string x = "10"; 
string y = "20"; 
string z = x + y;  // z akan menjadi 1020 (a string) 
`}
          </code>
        </pre>
      </div>

      {/* Kuis */}
      <QuizString onComplete={handleQuizComplete} />

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

export default String;
