import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";

const Rangkuman = () => {
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();

  const handleNext = () => {
    handleLessonComplete("/materi/evaluasi/evaluasi-akhir");
    handleLessonComplete("/materi/bab6/rangkuman-bab6");
    window.scrollTo(0, 0);
    navigate("/materi/evaluasi/evaluasi-akhir"); // Ganti dengan rute topik berikutnya
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab6/parameter-method"); // Ganti dengan rute topik sebelumnya
  };

  return (
    <div>
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">
          RANGKUMAN MATERI
        </h2>
        <div className="mb-4 text-justify text-gray-700">
          <p className="mt-4 mb-4">
            Pada bab ini, kamu telah mempelajari hal-hal berikut tentang method
            dalam C#:
          </p>
        </div>
        <ul className="pl-6 mb-4 list-disc">
          <li className="mb-2 text-justify">
            <strong>Method</strong>
            <p className="mt-4 mb-4">
              Method merupakan kumpulan dari beberapa statement yang digabungkan
              menjadi satu yang bertujuan untuk melakukan suatu tugas tertentu.
            </p>
          </li>
          <li className="mb-2 text-justify">
            <strong>Struktur Method</strong>
            <p className="mt-4 mb-4">
              Struktur dari method pada C# adalah sebagai berikut :
              <pre className="p-2 mb-4 font-mono bg-gray-100 rounded">
                <code>{`[Access modifier][tipe data][nama method](parameter1, parameter2, ...) { 
    // Statements 
}`}</code>
              </pre>
            </p>
          </li>
          <li className="mb-2 text-justify">
            <strong>Jenis Method</strong>
            <p className="mt-4 mb-4">
              Method terbagi menjadi dua yaitu method yang tidak mengembalikan
              suatu nilai (void) dan method dengan tipe data yang mengembalikan
              suatu nilai.
            </p>
          </li>
          <li className="mb-2 text-justify">
            <strong>Parameter Method</strong>
            <p className="mt-4 mb-4">
              Dalam pendeklarasian, sebuah method dapat memiliki sebuah
              parameter ataupun lebih untuk menerima nilai yang dikirimkan ke
              dalam statement pada method.
            </p>
          </li>
          <li className="mb-2 text-justify">
            <strong>Expression-Embodied Member</strong>
            <p className="mt-4 mb-4">
              Sebuah cara ringkas untuk mendefinisikan method menggunakan
              operator lambda =>.
            </p>
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
