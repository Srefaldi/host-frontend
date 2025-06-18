import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";

const Rangkuman = () => {
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();

  const handleNext = () => {
    handleLessonComplete("/materi/bab3/rangkuman-bab3");
    window.scrollTo(0, 0);
    navigate("/materi/bab4/pengertian-operator");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab3/operator-equality");
  };

  return (
    <div>
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">
          RANGKUMAN MATERI
        </h2>
        <div className="mb-4 text-justify text-gray-700">
          <p>Pada bab ini, kamu telah mempelajari hal-hal berikut:</p>
        </div>
        <ul className="pl-6 mb-4 list-disc">
          <li className="mb-2 text-justify">
            <strong>Tipe data</strong> adalah konsep penting dalam pemrograman
            komputer yang digunakan untuk menentukan jenis nilai atau data apa
            yang dapat disimpan dalam suatu variabel atau objek.
          </li>
          <li className="mb-2 text-justify">
            Tipe data dalam C# dibagi menjadi <strong>value types</strong> (int,
            float, double, bool, char) dan
            <strong> reference types</strong> (string, class).
          </li>
          <li className="mb-2 text-justify">
            Tipe data nilai meliputi:
            <ul className="mt-1 mb-2 list-disc list-inside">
              <li>
                <strong>int</strong>: digunakan untuk menyimpan bilangan bulat.
              </li>
              <li>
                <strong>float</strong>: digunakan untuk menyimpan bilangan
                pecahan dengan presisi yang lebih rendah.
              </li>
              <li>
                <strong>double</strong>: digunakan untuk menyimpan bilangan
                pecahan dengan presisi yang lebih tinggi.
              </li>
              <li>
                <strong>bool</strong>: digunakan untuk menyimpan nilai kebenaran
                (true atau false).
              </li>
              <li>
                <strong>char</strong>: digunakan untuk menyimpan karakter
                tunggal.
              </li>
            </ul>
          </li>
          <li className="mb-2 text-justify">
            Tipe data referensi meliputi:
            <ul className="mt-1 mb-2 list-disc list-inside">
              <li>
                <strong>string</strong>: digunakan untuk menyimpan kumpulan
                karakter.
              </li>
            </ul>
          </li>
          <li className="mb-2 text-justify">
            Tipe data <strong>string</strong> adalah tipe data yang menampung
            kumpulan karakter, seperti "aku", "kamu" atau "Belajar C#".
          </li>
        </ul>

        {/* Tombol Navigasi */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            className="flex items-center px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
          >
            <img src={backIcon} alt="Kembali" className="w-5 h-5 mr-2" />
            Kembali
          </button>
          <button
            onClick={handleNext}
            className="flex items-center justify-between"
            style={{
              backgroundColor: "#6E2A7F",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#5B1F6A")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#6E2A7F")
            }
          >
            <span>Selanjutnya</span>
            <img src={nextIcon} alt="Selanjutnya" className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rangkuman;
