import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";

const Rangkuman = () => {
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();

  const handleNext = () => {
    handleLessonComplete("/materi/bab4/pengertian-kontrol-alur");
    handleLessonComplete("/materi/bab4/rangkuman-bab4");
    window.scrollTo(0, 0);
    navigate("/materi/bab5/pengertian-kontrol-alur"); // Ganti dengan rute topik berikutnya
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab4/operator-equality"); // Ganti dengan rute topik sebelumnya
  };

  return (
    <div>
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">
          RANGKUMAN MATERI
        </h2>
        <div className="mb-4 text-justify text-gray-700">
          <p>
            Pada bab ini, kamu telah mempelajari hal-hal berikut tentang
            operator dalam C#:
          </p>
        </div>
        <ul className="pl-6 mb-4 list-disc">
          <li className="mb-2 text-justify">
            <strong>Operator</strong>
            <ul className="mt-1 list-disc list-inside">
              <li>
                Simbol yang digunakan untuk melakukan operasi pada satu atau
                lebih operand.
              </li>
              <li>
                Operand adalah nilai yang digunakan oleh operator untuk
                menghasilkan hasil operasi.
              </li>
            </ul>
          </li>
          <li className="mb-2 text-justify">
            <strong>Kategori Operator</strong>
            <ul className="mt-1 list-disc list-inside">
              <li>Unary: Bekerja pada satu operand (contoh: ++a, --b).</li>
              <li>Binary: Bekerja pada dua operand (contoh: a + b, x * y).</li>
              <li>
                Ternary: Membutuhkan tiga operand (contoh: (a &gt; b) ? x : y).
              </li>
            </ul>
          </li>
          <li className="mb-2 text-justify">
            <strong>Operator Aritmatika</strong> digunakan pada suatu operasi
            yang menggunakan data numerik yang biasanya digunakan untuk
            perhitungan seperti penambahan (+), pengurangan (-), perkalian (*),
            pembagian (/) serta modulus (%).
          </li>
          <li className="mb-2 text-justify">
            <strong>Operator Penugasan</strong> merupakan operator yang
            digunakan untuk memberikan tugas pada variabel. Contoh operator
            penugasan seperti: =, +=, -=, *=, /=, %=.
          </li>
          <li className="mb-2 text-justify">
            <strong>Operator Perbandingan</strong> merupakan operator yang
            digunakan untuk membandingkan dua buah nilai dan akan menghasilkan
            nilai berupa boolean True atau False. Contoh operator perbandingan
            seperti: &gt;, &lt;, &gt;=, &lt;=.
          </li>
          <li className="mb-2 text-justify">
            <strong>Operator Logika</strong> dapat digunakan untuk
            mengkombinasikan pernyataan dan akan menghasilkan nilai berupa
            boolean True atau False. Contoh operator logika seperti: &&, ||, !.
          </li>
          <li className="mb-2 text-justify">
            <strong>Operator Kesetaraan</strong> merupakan cara paling umum
            untuk membandingkan kesetaraan sebuah objek atau variabel dan akan
            menghasilkan nilai berupa boolean True atau False. Contoh operator
            kesetaraan seperti: (equality) ==, (inequality) !=.
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
