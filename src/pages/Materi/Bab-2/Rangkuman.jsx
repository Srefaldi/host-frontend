import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";

const Rangkuman = () => {
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();

  const handleNext = () => {
    handleLessonComplete("/materi/bab3/pengertian-tipedata");
    handleLessonComplete("/materi/bab2/rangkuman-bab2");
    window.scrollTo(0, 0);
    navigate("/materi/bab3/pengertian-tipedata");
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab2/sintaks-input");
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
            <strong>Variabel</strong> adalah tempat untuk menyimpan data yang
            nilainya dapat berubah-ubah. Tipe data menentukan jenis dan
            pengolahan data yang disimpan.
          </li>
          <li className="text-justify">
            <strong>Penamaan Variabel</strong>:
            <ul className="mt-1 list-disc list-inside">
              <li>
                Nama variabel harus terdiri dari huruf, angka, atau underscore
                (_), dan diawali dengan huruf.
              </li>
              <li>
                Tidak boleh menggunakan kata kunci (keyword) kecuali diawali
                dengan <code>@</code>.
              </li>
              <li>Bersifat case-sensitive.</li>
            </ul>
          </li>
          <li className="text-justify">
            <strong>Deklarasi dan Inisialisasi Variabel</strong>:
            <ul className="mt-1 list-disc list-inside">
              <li>
                Deklarasi dilakukan dengan menentukan tipe data atau menggunakan
                kata kunci <code>var</code>.
              </li>
              <li>Inisialisasi adalah pemberian nilai awal pada variabel.</li>
            </ul>
          </li>
          <li className="text-justify">
            <strong>Variabel Konstant</strong>: Variabel konstanta memiliki
            nilai tetap yang tidak dapat diubah, dideklarasikan dengan kata
            kunci <code>const</code>.
          </li>
          <li className="text-justify">
            <strong>Kategori Variabel</strong>:
            <ul className="mt-1 list-disc list-inside">
              <li>
                <strong>Static</strong>: Diakses melalui tipe.
              </li>
              <li>
                <strong>Instance</strong>: Berbeda untuk setiap instance.
              </li>
              <li>
                <strong>Lokal</strong>: Berlaku di blok tertentu.
              </li>
              <li>
                <strong>Parameter</strong>: Untuk menerima nilai dalam metode.
              </li>
            </ul>
          </li>
          <li className="text-justify">
            <strong>Mencetak Variabel</strong>: Menggunakan{" "}
            <code>Console.WriteLine()</code> dengan teks statis atau dinamis
            melalui placeholder atau string interpolation <code>$</code>.
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
