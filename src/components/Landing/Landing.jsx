import React, { useEffect, useState } from "react";
import iconHamburger from "../../assets/img/icon-hamburger.svg";
import iconClose from "../../assets/img/icon-close.svg";
import heroImage from "../../assets/img/logo-hero.png";
import guruIcon from "../../assets/img/icon-guru.png";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import InfoModal from "./InfoModal";

const daftarMateri = [
  {
    bab: "BAB 1",
    judul: "PENDAHULUAN",
    subMateri: [
      "Pengenalan C#",
      "Struktur Kode Pemrograman C#",
      "Struktur Eksekusi Kode",
      "Sintaks Print",
      "Sintaks Komentar",
      "Error Pada C#",
    ],
  },
  {
    bab: "BAB 2",
    judul: "VARIABEL",
    subMateri: [
      "Pengertian Variabel",
      "Penamaan Variabel",
      "Kategori Variabel",
      "Deklarasi dan Inialisasi Variabel",
      "Deklarasi Banyak Variabel",
      "Variabel Konstanta",
      "Sintaks Input",
    ],
  },
  {
    bab: "BAB 3",
    judul: "TIPE DATA",
    subMateri: [
      "Pengertian Tipe Data",
      "Klasifikasi Tipe Data",
      "Tipe Data Dasar",
      "1. Integer",
      "2. Floating-point",
      "3. Boolean",
      "4. Char",
      "5. String",
    ],
  },
  {
    bab: "BAB 4",
    judul: "OPERATOR",
    subMateri: [
      "Pengertian Operator",
      "Operator Arithmetic",
      "Operator Increment Decrement",
      "Operator Assignment",
      "Operator Comparison",
      "Operator Logika",
      "Operator Conditional",
      "Operator Equality",
    ],
  },
  {
    bab: "BAB 5",
    judul: "KONTROL ALUR",
    subMateri: [
      "Pengertian Kontrol Alur",
      "Pernyataan If-Else",
      "Pernyataan Switch",
      "Pernyataan Perulangan",
      "Pernyataan Break dan Continue",
      "Perulangan Bersarang",
    ],
  },
  {
    bab: "BAB 6",
    judul: "METHOD",
    subMateri: [
      "Pengenalan Method",
      "Method Void",
      "Method Dengan Tipe Data",
      "Parameter Method",
    ],
  },
];

function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to scroll to the daftar-materi section
  const scrollToDaftarMateri = () => {
    const element = document.getElementById("daftar-materi");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Navbar */}
      <header className="text-gray-700 border-b border-gray-200 body-font">
        <div className="container flex flex-col flex-wrap items-center justify-between p-4 mx-auto md:flex-row">
          <Link
            to="/"
            className="flex items-center font-medium text-gray-900 title-font md:mb-0 no-underline"
          >
            <span className="ml-3 text-xl">
              <span className="font-bold" style={{ color: "#68217A" }}>
                SHARP
              </span>{" "}
              LEARN
            </span>
          </Link>

          <div className="flex items-center md:ml-auto">
            <button
              className="inline-flex items-center px-3 py-1 text-base border-0 rounded md:hidden focus:outline-none hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <img
                src={isMenuOpen ? iconClose : iconHamburger}
                className="w-6 h-6 hamburger"
                alt="Menu"
              />
            </button>
            <div
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } absolute top-16 right-0 bg-white shadow-lg rounded-lg p-4 w-full sm:w-64 md:flex md:static md:bg-transparent md:shadow-none md:p-0 md:w-auto flex-col md:flex-row`}
            >
              <button
                className="inline-flex items-center justify-center border border-[#68217A] mx-2 mb-2 md:mb-0 focus:outline-none rounded text-black hover:bg-[#68217A] hover:text-white"
                style={{ width: "100px", height: "37px", fontSize: "14px" }}
              >
                <Link to="/daftar-siswa" className="text-black no-underline">
                  DAFTAR
                </Link>
              </button>
              <button
                className="inline-flex items-center justify-center mx-2 text-white border-0 rounded focus:outline-none hover:bg-opacity-80"
                style={{
                  backgroundColor: "#68217A",
                  width: "100px",
                  height: "35px",
                  fontSize: "14px",
                }}
              >
                <Link
                  to="/login"
                  className="text-white no-underline hover:text-gray-200"
                >
                  MASUK
                </Link>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tampilan Utama */}
      <section className="text-gray-700 body-font">
        <div className="container flex flex-col items-center px-5 py-12 mx-auto md:flex-row">
          <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
            <h1 className="mb-4 text-3xl title-font sm:text-3xl md:text-4xl">
              <span className="font-bold" style={{ color: "#68217A" }}>
                MEDIA PEMBELAJARAN
              </span>
              <br className="hidden lg:inline-block" />
              DASAR - DASAR C#
            </h1>
           <p className="mb-6 text-base text-gray-600 leading-relaxed">
              Bagian Latihan dan Kuis dirancang untuk membantu pengguna memahami
              materi pembelajaran melalui soal-soal. Latihan dapat dikerjakan
              berkali-kali sebagai sarana penguatan konsep, sedangkan kuis
              bertujuan untuk mengukur sejauh mana pemahaman pengguna terhadap
              materi yang telah dipelajari.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={scrollToDaftarMateri}
                className="inline-flex items-center justify-center font-bold text-white border-0 rounded focus:outline-none hover:bg-opacity-80"
                style={{
                  backgroundColor: "#68217A",
                  width: "180px",
                  height: "55px",
                  fontSize: "16px",
                }}
              >
                DAFTAR MATERI
              </button>
              <Link
                to="/login-guru"
                className="inline-flex items-center justify-center font-bold text-gray-600 border border-gray-400 rounded no-underline focus:outline-none hover:bg-gray-100"
                style={{
                  backgroundColor: "#FFFFFF",
                  width: "180px",
                  height: "55px",
                  fontSize: "16px",
                }}
              >
                HALAMAN GURU >>>
              </Link>
            </div>
          </div>

          <div className="w-5/6 sm:w-3/4 md:w-1/2 lg:max-w-lg">
            <img
              className="object-cover object-center w-full h-auto rounded"
              alt="hero"
              src={heroImage}
            />
          </div>
        </div>
      </section>

      {/* Daftar Materi */}
      <section id="daftar-materi" className="py-10 bg-gray-100">
        <div className="container px-6 mx-auto">
          <h2 className="mb-6 text-3xl font-bold text-center">
            MATERI PEMBELAJARAN
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {daftarMateri.map((materi, index) => (
              <div
                key={index}
                className="relative p-6 transition bg-white rounded-lg shadow-md hover:shadow-lg"
              >
                <div className="absolute top-0 left-0 w-full bg-[#68217A] text-white text-center rounded-t-lg p-4">
                  <h3 className="text-xl font-semibold">{materi.bab}</h3>
                  <p className="text-lg font-bold">{materi.judul}</p>
                </div>
                <div className="pt-20">
                  <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                    {materi.subMateri.map((sub, i) => (
                      <li key={i}>{sub}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Link
            to="/login"
            className="inline-flex items-center justify-center text-white no-underline border-0 rounded focus:outline-none hover:bg-opacity-80"
            style={{
              backgroundColor: "#68217A",
              width: "160px",
              height: "48px",
              fontSize: "16px",
            }}
          >
            MULAI BELAJAR
          </Link>
        </div>
      </section>

      {/* Modal Informasi */}
      <InfoModal isOpen={isModalOpen} toggleModal={toggleModal} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Landing;
