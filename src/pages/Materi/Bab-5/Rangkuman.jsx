import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";

const Rangkuman = () => {
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();

  const handleNext = () => {
    handleLessonComplete("/materi/bab5/rangkuman-bab5");
    window.scrollTo(0, 0);
    navigate("/materi/bab6/pengenalan-method"); // Ganti dengan rute topik berikutnya
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab5/perulangan-bersarang"); // Ganti dengan rute topik sebelumnya
  };

  return (
    <div>
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">
          RANGKUMAN MATERI
        </h2>
        <div className="mb-4 text-justify text-gray-700">
          <p className="mt-4 mb-4">
            Pada bab ini, kamu telah mempelajari hal-hal berikut tentang kontrol
            alur dalam C#:
          </p>
        </div>
        <ul className="pl-6 mb-4 list-disc">
          <li className="mb-2 text-justify">
            <strong>Kontrol Alur</strong>
            <p className="mt-4 mb-4">
              Kontrol alur adalah mekanisme yang mengatur urutan eksekusi
              pernyataan dalam program berdasarkan kondisi tertentu.
            </p>
          </li>
          <li className="mb-2 text-justify">
            <strong>Pernyataan if</strong>
            <ul className="mt-1 list-disc list-inside">
              <li className="-ml-1">
                Statemen if digunakan untuk mengeksekusi suatu blok statement
                sesuai dengan kondisi yang{" "}
                <span className="ml-5">
                  ada, yang umumnya digunakan sebagai penentu keputusan.
                </span>
              </li>
              <li className="-ml-1">
                Pernyataan if menentukan kondisi ekspresi yang akan dievaluasi.
                Apabila kondisi benar (true),{" "}
                <span className="ml-5">
                  maka{" "}
                  <strong>
                    pernyataan dalam kurung kurawal {`{ }`} akan dieksekusi
                  </strong>
                  . Apabila <strong>kondisi salah</strong> (false), maka{" "}
                  <strong>if</strong>{" "}
                  <span className="ml-5">
                    <strong>
                      akan diabaikan dan dilakukan pengecekan berikutnya pada
                      else if hingga else
                    </strong>
                    .
                  </span>
                  a
                </span>
              </li>
            </ul>
          </li>
          <li className="mb-2 text-justify">
            <strong>Pernyataan Switch</strong>
            <ul className="mt-1 list-disc list-inside">
              <li className="-ml-1">
                <strong>Switch statement</strong> memastikan persamaan antara
                sebuah nilai dengan nilai-nilai yang ada pada{" "}
                <span className="ml-5">
                  case di dalam sebuah switch.{" "}
                  <strong>
                    Apabila nilai sama, maka operasi akan dieksekusi. Jika
                    tidak, maka
                  </strong>
                </span>
                <br />
                <span className="ml-5">
                  <strong>
                    {" "}
                    akan dilakukan ke pengecekan pada case selanjutnya.
                  </strong>
                </span>
              </li>
              <li className="-ml-1">
                Pada sebuah pemrograman sangat memungkinkan untuk memiliki
                sebuah switch yang
                <br />
                <span className="ml-5">
                  merupakan bagian dari statement switch sebelah luar/lainnya.
                </span>
              </li>
            </ul>
          </li>
          <li className="mb-2 text-justify">
            <strong>Jenis Perulangan</strong>
            <p className="mt-4 mb-4">
              Di dalam bahasa pemrograman C#, terdapat beberapa jenis
              perulangan, yaitu: for, while, do-while, dan foreach.
            </p>
          </li>
          <li className="mb-2 text-justify">
            <strong>Perulangan for</strong>
            <p className="mt-4 mb-4">
              Biasa digunakan untuk mengulang suatu proses yang telah diketahui
              jumlah perulangannya.
            </p>
          </li>
          <li className="mb-2 text-justify">
            <strong>Perulangan while</strong>
            <p className="mt-4 mb-4">
              Biasa digunakan pada saat kita ingin terus menerus mengulang
              sebuah proses selama suatu kondisi terpenuhi.
            </p>
          </li>
          <li className="mb-2 text-justify">
            <strong>Pernyataan break dan continue</strong>
            <p className="mt-4 mb-4">
              Pernyataan break digunakan untuk menghentikan eksekusi loop secara
              paksa, sedangkan continue digunakan untuk melewati iterasi saat
              ini dan melanjutkan ke iterasi berikutnya.
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
