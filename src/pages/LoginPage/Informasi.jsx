import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Landing/NavbarLogin/NavbarLogin";
import Footer from "../../components/Landing/Footer";
import backIcon from "../../assets/img/kembali.png";

const Informasi = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container px-3 py-6 mx-auto sm:px-4 sm:py-8">
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-800 sm:text-3xl sm:mb-6">
          PERIHAL
        </h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center mb-2 text-sm text-white bg-gray-500 rounded-lg sm:text-base hover:bg-gray-600"
          style={{
            width: "120px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            paddingLeft: "5px", // Mengimbangi ikon agar teks terpusat
          }}
        >
          <img src={backIcon} alt="Kembali" className="w-5 h-5 mr-2" />
          Kembali
        </button>
        <section
          className="p-4 mb-4 bg-white rounded-lg shadow sm:p-6 sm:mb-6"
          style={{ border: "4px solid #6E2A7F" }}
        >
          <h2 className="flex items-center mb-4 text-lg font-bold text-gray-800 sm:text-xl">
            <i className="mr-2 fas fa-info-circle"></i> INFORMASI MEDIA
          </h2>
          <p className="mb-4 text-sm text-gray-700 sm:text-base">
            Media pembelajaran ini dibuat untuk memenuhi persyaratan dalam
            menyelesaikan program Strata-1 Pendidikan Komputer dengan judul:
          </p>
          <p className="mb-4 text-sm font-bold text-center text-gray-800 sm:text-base">
            PENGEMBANGAN MEDIA PEMBELAJARAN INTERAKTIF BERBASIS WEB PADA MATERI
            DASAR-DASAR PEMROGRAMAN C# DENGAN METODE TUTORIAL
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700 sm:text-base">
              <tbody>
                <tr>
                  <td className="py-1.5 sm:py-2">Nama</td>
                  <td className="py-1.5 sm:py-2">: SOPIA REFALDI</td>
                </tr>
                <tr>
                  <td className="py-1.5 sm:py-2">Email</td>
                  <td className="py-1.5 sm:py-2">
                    :{" "}
                    <a
                      href="mailto:sopiarefaldii@gmail.com"
                      className="text-purple-600"
                    >
                      sopiarefaldii@gmail.com
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 sm:py-2">Dosen Pembimbing 1</td>
                  <td className="py-1.5 sm:py-2">
                    : Dr. R. Ati Sukmawati, M.Kom
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 sm:py-2">Dosen Pembimbing 2</td>
                  <td className="py-1.5 sm:py-2">
                    : Muhammad Hifdzi Adini, S.Kom., M.T
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 sm:py-2">Program Studi</td>
                  <td className="py-1.5 sm:py-2">: S-1 Pendidikan Komputer</td>
                </tr>
                <tr>
                  <td className="py-1.5 sm:py-2">Fakultas</td>
                  <td className="py-1.5 sm:py-2">
                    : Fakultas Keguruan dan Ilmu Pendidikan (FKIP)
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 sm:py-2">Instansi</td>
                  <td className="py-1.5 sm:py-2">
                    : Universitas Lambung Mangkurat
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section
          className="p-4 bg-white rounded-lg shadow sm:p-6"
          style={{ border: "4px solid #6E2A7F" }}
        >
          <h2 className="flex items-center mb-4 text-base font-bold text-gray-800 sm:text-lg">
            <i className="mr-2 fas fa-book"></i> DAFTAR PUSTAKA DAN ATRIBUSI
          </h2>
          <h3 className="mb-2 text-sm font-semibold text-gray-800 sm:text-base">
            Daftar Pustaka
          </h3>
          <ul className="mb-4 text-sm text-gray-700 list-disc list-inside sm:text-base">
            <li>
              Ali, R. (2014).{" "}
              <i>
                C# for Beginners Crash Course: Master C# Programming Fast and
                Easy Today
              </i>
              .
            </li>
            <li>
              C#, B., Kurniawan, A., Adnan, R., Aryaputra, P., Sasono, N.,
              Ahmad, A., Fathur, H. M., I, R., Saryada, W., & Wirasta, A.
              (2004). <i>Pengenalan Bahasa C# (CSH101)</i>.
            </li>
            <li>
              Raharjo, B. (2022). <i>Pemrograman Bahasa C#</i>.
            </li>
          </ul>
          <h3 className="mb-2 text-sm font-semibold text-gray-800 sm:text-base">
            Atribusi
          </h3>
          <p className="text-sm text-gray-700 sm:text-base">
            Ilustrasi pada media pembelajaran diadaptasi dari{" "}
            <a href="https://storyset.com/work" className="text-purple-600">
              storyset.com/work
            </a>
            .
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Informasi;
