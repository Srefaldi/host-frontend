import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";

const Rangkuman = () => {
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();
  const handleNext = () => {
    handleLessonComplete("/materi/bab1/rangkuman-bab1");
    window.scrollTo(0, 0);

    navigate("/materi/bab2/variabel");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab1/kuis-bab1");
  };

  return (
    <div>
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">
          RANGKUMAN MATERI
        </h2>
        <div className="mb-4 text-justify text-gray-700">
          <p>Pada bab ini, Anda telah mempelajari hal-hal berikut:</p>
        </div>
        <ul className="pl-6 mb-4 list-disc">
          <li className="text-justify">
            <strong>C#</strong> adalah bahasa pemrograman modern yang mendukung
            struktur eksekusi kode secara sekuensial, di mana kode yang ditulis
            terlebih dahulu akan dieksekusi terlebih dahulu.
          </li>

          <li className="text-justify">
            Struktur dasar kode dalam C# meliputi penulisan{" "}
            <strong>kelas</strong>, <strong>metode Main</strong>, dan penggunaan{" "}
            <strong>Console</strong> untuk operasi input/output.
          </li>
          <li className="text-justify">
            Bahasa C# memiliki struktur kontrol berupa <strong>sequence</strong>
            , <strong>selection</strong>, dan <strong>iteration</strong>, yang
            memengaruhi alur eksekusi program.
          </li>
          <li className="text-justify">
            Sintaks <strong>Print</strong> digunakan untuk mencetak output pada
            program konsol, misalnya:
            <pre className="p-2 mt-1 bg-gray-100 rounded">
              Console.WriteLine("Hello World!");
            </pre>
          </li>
          <li className="text-justify">
            Komponen penting dalam C# adalah <strong>komentar</strong>, yang
            berguna untuk memberikan catatan pada kode tanpa memengaruhi
            eksekusi program. C# mendukung dua jenis komentar:
            <ul className="mt-1 list-disc list-inside">
              <li>
                Single-line comment dengan tanda <code>//</code>.
              </li>
              <li>
                Multi-line comment dengan tanda <code>/* */</code>.
              </li>
            </ul>
          </li>
          <li className="text-justify">
            Tipe-tipe <strong>error</strong> yang dapat muncul dalam pembuatan
            program C# meliputi:
            <ul className="mt-1 list-disc list-inside">
              <li>
                <strong>Syntax Error</strong>: Kesalahan dalam penulisan kode.
              </li>
              <li>
                <strong>Runtime Error</strong>: Kesalahan yang terjadi saat
                program dijalankan.
              </li>
              <li>
                <strong>Logical Error</strong>: Kesalahan pada logika program
                yang menyebabkan output tidak sesuai harapan.
              </li>
            </ul>
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
            <img
              src={nextIcon}
              alt="Selanjutnya"
              className="w-5 h-5 ml-2"
            />{" "}
            {/* Ikon di pojok kanan */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rangkuman;
