import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Landing/NavbarLogin/NavbarLogin";
import Footer from "../../../components/Landing/Footer";
import { getMe, reset } from "../../../features/authSlice";
import backIcon from "../../../assets/img/kembali.png";
import halamanAwalImg from "./img-petunjuk-penggunaan/Landing-1.png";
import halamanAwalImg2 from "./img-petunjuk-penggunaan/Landing-2.png";
import loginImg from "./img-petunjuk-penggunaan/Login-1.png";
import buatAkunImg from "./img-petunjuk-penggunaan/Register-1.png";
import homeImg from "./img-petunjuk-penggunaan/Dashboard-1.png";
import materiImg from "./img-petunjuk-penggunaan/Materi-1.png";
import materi1Img from "./img-petunjuk-penggunaan/Materi-2.png";
import materi2Img from "./img-petunjuk-penggunaan/Materi-3.png";
import latihanKuisImg from "./img-petunjuk-penggunaan/Latihan-1.jpeg";
import latihanKuisImg2 from "./img-petunjuk-penggunaan/Kuis-1.png";

const PetunjukPenggunaan = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [activeSection, setActiveSection] = useState("Petunjuk Halaman Awal");
  const [hoveredSection, setHoveredSection] = useState(null); // State untuk melacak tombol yang di-hover
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, user, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    console.log("Auth state:", { isLoading, isError, user, message });
    if (!isLoggedOut) {
      dispatch(getMe());
    }
  }, [dispatch, isLoggedOut]);

  useEffect(() => {
    if (isError && message === "Mohon login ke akun anda" && !isLoggedOut) {
      dispatch(reset());
      navigate("/login");
    }
  }, [isError, message, dispatch, navigate, isLoggedOut]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!user && !isLoggedOut && !isError) {
    console.log("PetunjukPenggunaan tidak dirender: menunggu getMe selesai");
    return null;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "Petunjuk Halaman Awal":
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Halaman Beranda
            </h2>
            <p className="mb-2 text-base leading-relaxed text-gray-600">
              Halaman Beranda adalah halaman awal yang muncul saat media
              pembelajaran pertama kali dibuka. Pada halaman beranda terdapat
              menu Daftar Materi, Halaman Guru, login, Daftar, dan Mulai
              belajar.
            </p>
            <p className="mb-2 text-sm italic text-gray-500">
              Lihat gambar berikut!
            </p>
            <img
              src={halamanAwalImg}
              alt="Petunjuk Halaman Awal"
              style={{
                width: "800px",
                height: "400px",
                margin: "16px auto",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "block",
              }}
            />
            <div className="mb-6 text-justify">
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Keterangan:
              </h3>
              <ol className="text-base leading-relaxed text-gray-600 list-decimal list-inside">
                <li>
                  <span className="font-medium">No 1</span>: adalah Tombol
                  Daftar, ketika diklik mengarahkan pengguna ke halaman
                  pendaftaran untuk membuat akun baru.
                </li>
                <li>
                  <span className="font-medium">No 2</span>: adalah Tombol
                  Masuk, ketika diklik membawa pengguna ke halaman login untuk
                  mengakses akun mereka.
                </li>
                <li>
                  <span className="font-medium">No 3</span>: adalah Daftar
                  Materi, ketika diklik menggulir halaman secara otomatis ke
                  bagian daftar materi pembelajaran yang tersedia.
                </li>
                <li>
                  <span className="font-medium">No 4</span>: adalah Halaman
                  Guru, ketika diklik mengarahkan ke halaman khusus untuk guru
                  guna mengelola aplikasi.
                </li>
              </ol>
            </div>
            <p className="mb-2 text-sm italic text-gray-500">
              Lihat gambar berikut!
            </p>
            <img
              src={halamanAwalImg2}
              alt="Petunjuk Halaman Awal - Gambar Kedua"
              style={{
                width: "800px",
                height: "600px",
                margin: "16px auto",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "block",
              }}
            />
            <div className="mb-6 text-justify">
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Keterangan:
              </h3>
              <ol className="text-base leading-relaxed text-gray-600 list-decimal list-inside">
                <li>
                  <span className="font-medium">No 1</span>: Tombol Mulai
                  Belajar, mengarahkan pengguna ke login untuk memasukan akun
                  belajar, dan memulai pembelajaran.
                </li>
              </ol>
            </div>
            <div className="bg-gradient-to-r from-[#b7c8ff] to-[#d9e2ff] rounded-lg p-4 flex items-center justify-between max-w-full mb-12 shadow-sm">
              <div className="flex items-center gap-3"></div>
            </div>
          </>
        );
      case "Petunjuk Login":
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Petunjuk Login
            </h2>
            <p className="mb-2 text-base leading-relaxed text-gray-600">
              Halaman Login adalah halaman sebagai prasyarat agar pengguna dapat
              masuk ke dalam aplikasi. Pada halaman login ada beberapa hal yang
              harus diisi yakni.
            </p>
            <p className="mb-2 text-sm italic text-gray-500">
              Lihat gambar berikut!
            </p>
            <img
              src={loginImg}
              alt="Petunjuk Login"
              style={{
                width: "900px",
                height: "500px",
                margin: "16px auto",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "block",
              }}
            />
            <div className="mb-6 text-justify">
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Keterangan:
              </h3>
              <ol className="text-base leading-relaxed text-gray-600 list-decimal list-inside">
                <li>
                  <span className="font-medium">No 1</span> adalah Kolom isian
                  untuk pengguna memasukkan <strong>NIS</strong> (Nomor Induk
                  Siswa).
                </li>
                <li>
                  <span className="font-medium">No 2</span> adalah Kolom isian
                  untuk pengguna memasukkan <strong>kata sandi</strong> atau
                  password yang sesuai.
                </li>
                <li>
                  <span className="font-medium">No 3</span> adalah Tombol{" "}
                  <strong>Masuk</strong> yang dapat diklik setelah NIS dan kata
                  sandi diisi dengan benar.
                </li>
              </ol>
            </div>
          </>
        );
      case "Petunjuk Buat Akun":
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Petunjuk Buat Akun
            </h2>
            <p className="mb-2 text-base leading-relaxed text-gray-600">
              Halaman Buat Akun adalah halaman untuk membuat akun untuk pengguna
              media pembelajaran. Disini pengguna diminta menginputkan data
              pribadi sebagai data dari pengguna yang akan disimpan oleh guru.
            </p>
            <p className="mb-2 text-sm italic text-gray-500">
              Lihat gambar berikut!
            </p>
            <img
              src={buatAkunImg}
              alt="Petunjuk Buat Akun"
              style={{
                width: "500px",
                height: "300px",
                margin: "16px auto",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "block",
              }}
            />
            <div className="mb-6 text-justify">
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Keterangan:
              </h3>
              <ol className="text-base leading-relaxed text-gray-600 list-decimal list-inside">
                <li>
                  <span className="font-medium">No 1</span>: Merupakan tombol
                  Daftar yang digunakan setelah pengguna mengisi seluruh kolom
                  isian dengan benar, termasuk nama lengkap, NIS, kata sandi,
                  kelas, dan token yang diberikan oleh guru.
                </li>
              </ol>
            </div>
          </>
        );
      case "Petunjuk Home":
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Petunjuk Dashboard
            </h2>
            <p className="mb-2 text-base leading-relaxed text-gray-600">
              Halaman Home pada aplikasi ini menyediakan tiga menu utama yang
              dapat diakses oleh pengguna, yaitu menu Petunjuk Penggunaan,
              Materi, dan Aplikasi.
            </p>
            <p className="mb-2 text-sm italic text-gray-500">
              Lihat gambar berikut!
            </p>
            <img
              src={homeImg}
              alt="Petunjuk Dashboard"
              style={{
                width: "800px",
                height: "500px",
                margin: "16px auto",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "block",
              }}
            />
            <div className="mb-6 text-justify">
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Keterangan:
              </h3>
              <ol className="text-base leading-relaxed text-gray-600 list-decimal list-inside">
                <li>
                  <span className="font-medium">No 1</span>: Menu pada bagian
                  navbar yang berisi dua pilihan, yaitu{" "}
                  <strong>Dashboard</strong> untuk kembali ke halaman utama, dan{" "}
                  <strong>Logout</strong> untuk keluar dari aplikasi.
                </li>
                <li>
                  <span className="font-medium">No 2</span>: Tombol{" "}
                  <strong>Petunjuk Penggunaan</strong> yang menampilkan halaman
                  berisi penjelasan singkat mengenai cara menggunakan media
                  pembelajaran ini.
                </li>
                <li>
                  <span className="font-medium">No 3</span>: Tombol{" "}
                  <strong>Mulai Belajar</strong> yang akan membawa pengguna ke
                  halaman materi yang memuat seluruh konten pembelajaran.
                </li>
                <li>
                  <span className="font-medium">No 4</span>: Tombol{" "}
                  <strong>Informasi</strong> yang mengarahkan ke halaman berisi
                  informasi pengembangan media serta daftar pustaka yang
                  digunakan.
                </li>
              </ol>
            </div>
          </>
        );
      case "Petunjuk Halaman Materi":
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Halaman Materi
            </h2>

            <p className="mb-2 text-base leading-relaxed text-gray-600">
              Halaman ini berisi materi pembelajaran{" "}
              <strong>Dasar-Dasar Pemrograman C#</strong>, yang disajikan dalam
              bentuk teks dan latihan interaktif untuk memperkuat pemahaman
              pengguna.
            </p>

            <p className="mb-2 text-sm italic text-gray-500">
              Lihat gambar berikut!
            </p>

            <img
              src={materiImg}
              alt="Petunjuk Halaman Materi"
              style={{
                width: "900px",
                height: "500px",
                margin: "16px auto",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "block",
              }}
            />

            <div className="mb-6 text-justify">
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Keterangan:
              </h3>
              <ol className="text-base leading-relaxed text-gray-600 list-decimal list-inside">
                <li>
                  <span className="font-medium">No 1</span>: Merupakan{" "}
                  <strong>sidebar menu</strong> pada halaman materi. Sidebar ini
                  menampilkan daftar lengkap materi dari awal hingga akhir,
                  termasuk indikator progres belajar pengguna. Di dalamnya juga
                  terlihat materi yang masih terkunci dan materi yang sudah
                  berhasil diselesaikan.
                </li>
              </ol>
            </div>

            <p className="mb-2 text-base leading-relaxed text-gray-600">
              Setiap halaman materi dilengkapi dengan{" "}
              <strong>uji pengetahuan</strong>, yang dapat berupa latihan
              melengkapi kode atau soal pilihan ganda. Berikut adalah salah satu
              contoh tampilannya.
            </p>

            <p className="mb-2 text-sm italic text-gray-500">
              Lihat gambar berikut!
            </p>

            <img
              src={materi1Img}
              alt="Tampilan Uji Pengetahuan"
              style={{
                width: "900px",
                height: "500px",
                margin: "16px auto",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "block",
              }}
            />

            <div className="mb-6 text-justify">
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Keterangan:
              </h3>
              <ol className="text-base leading-relaxed text-gray-600 list-decimal list-inside">
                <li>
                  <span className="font-medium">No 1</span>: Tombol{" "}
                  <strong>Kirim Jawaban</strong> dan{" "}
                  <strong>Hapus Jawaban</strong>. Tombol <em>Kirim Jawaban</em>{" "}
                  digunakan untuk memeriksa apakah jawaban yang diberikan benar
                  atau salah. Sementara <em>Hapus Jawaban</em> berfungsi untuk
                  menghapus atau mereset jawaban yang telah diisi.
                </li>
                <li>
                  <span className="font-medium">No 2</span>: Tombol{" "}
                  <strong>Selanjutnya</strong>, yang berfungsi untuk melanjutkan
                  ke materi berikutnya. Tombol ini hanya akan aktif jika
                  pengguna telah menjawab uji pengetahuan dengan benar.
                </li>
              </ol>
            </div>

            <p className="mb-2 text-base leading-relaxed text-gray-600">
              Setiap uji pengetahuan juga memberikan{" "}
              <strong>umpan balik otomatis</strong>. Jika jawaban pengguna
              benar, sistem akan menampilkan penjelasan atau respon yang sesuai.
              Berikut contoh tampilannya:
            </p>

            <p className="mb-2 text-sm italic text-gray-500">
              Lihat gambar berikut!
            </p>

            <img
              src={materi2Img}
              alt="Contoh Umpan Balik Jawaban"
              style={{
                width: "900px",
                height: "500px",
                margin: "16px auto",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "block",
              }}
            />
          </>
        );
      case "Petunjuk Latihan dan Kuis":
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Petunjuk Latihan dan Kuis
            </h2>
            <p className="mb-2 text-base leading-relaxed text-gray-600">
              Bagian <strong>Latihan dan Kuis</strong> dirancang untuk membantu
              pengguna memperdalam pemahaman terhadap materi melalui soal-soal
              interaktif. Latihan dapat dikerjakan berkali-kali untuk memperkuat
              konsep, sedangkan kuis bertujuan mengukur sejauh mana pemahaman
              pengguna setelah mempelajari materi tertentu.
            </p>
            <p className="mb-2 text-sm italic text-gray-500">
              Lihat gambar berikut!
            </p>
            <img
              src={latihanKuisImg}
              alt="Petunjuk Latihan dan Kuis"
              style={{
                width: "900px",
                height: "600px",
                margin: "16px auto",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "block",
              }}
            />
            <div className="mb-6 text-justify">
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Keterangan:
              </h3>
              <ol className="text-base leading-relaxed text-gray-600 list-decimal list-inside">
                <li>
                  <span className="font-medium">No 1</span> menunjukkan waktu
                  pengerjaan soal latihan, yaitu <strong>10 menit</strong>. Jika
                  waktu habis, seluruh jawaban akan otomatis dikirim.
                </li>
                <li>
                  <span className="font-medium">No 2</span> menunjukkan jumlah
                  soal latihan, yaitu
                  <strong> 5 soal</strong>. Pengguna tidak dapat mengirim
                  jawaban jika masih ada soal yang belum dijawab. Setelah
                  jawaban dikirim, pengguna tidak bisa mengubahnya kembali.
                </li>
                <li>
                  <span className="font-medium">No 3</span> merupakan kolom
                  isian tempat pengguna menuliskan jawaban untuk setiap soal.
                </li>
                <li>
                  <span className="font-medium">No 4</span> adalah kumpulan
                  tombol di halaman latihan:
                  <ul className="ml-6 list-disc list-inside">
                    <li>
                      <strong>Kirim</strong>: mengirim jawaban untuk soal yang
                      sedang dikerjakan.
                    </li>
                    <li>
                      <strong>Hapus Jawaban</strong>: menghapus jawaban yang
                      telah diisi.
                    </li>
                    <li>
                      <strong>Selesai</strong>: mengirim seluruh jawaban jika
                      semua soal telah dijawab.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>

            <p className="mb-2 text-base leading-relaxed text-gray-600">
              Selain soal latihan yang berbentuk isian kode, terdapat juga kuis
              pilihan ganda yang tersedia di akhir setiap bab. Contohnya dapat
              dilihat pada gambar berikut.
            </p>
            <p className="mb-2 text-sm italic text-gray-500">
              Lihat gambar berikut!
            </p>
            <img
              src={latihanKuisImg2}
              alt="Petunjuk Kuis Pilihan Ganda"
              style={{
                width: "900px",
                height: "500px",
                margin: "16px auto",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "block",
              }}
            />
            <div className="mb-6 text-justify">
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Keterangan:
              </h3>
              <ol className="text-base leading-relaxed text-gray-600 list-decimal list-inside">
                <li>
                  <span className="font-medium">No 1</span> menunjukkan waktu
                  pengerjaan kuis, yaitu <strong>20 menit</strong>. Setelah
                  waktu habis, semua jawaban akan otomatis dikirim.
                </li>
                <li>
                  <span className="font-medium">No 2</span> menunjukkan jumlah
                  soal kuis, yaitu
                  <strong> 10 soal</strong>. Semua soal harus dijawab sebelum
                  pengguna bisa mengirim. Setelah jawaban dikirim, tidak dapat
                  diubah kembali.
                </li>
                <li>
                  <span className="font-medium">No 3</span> adalah kumpulan
                  tombol yang digunakan di halaman kuis:
                  <ul className="ml-6 list-disc list-inside">
                    <li>
                      <strong>Kirim</strong>: mengirim jawaban untuk soal yang
                      sedang dijawab.
                    </li>
                    <li>
                      <strong>Hapus Jawaban</strong>: menghapus jawaban yang
                      telah diisi.
                    </li>
                    <li>
                      <strong>Selesai</strong>: mengirim semua jawaban sekaligus
                      setelah seluruh soal terisi.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar setIsLoggedOut={setIsLoggedOut} />
      <main className="flex flex-col flex-grow max-w-full gap-8 p-4 mx-auto mt-20 md:flex-row md:p-6">
        <nav className="flex flex-col gap-6 w-[256px] bg-white rounded-xl p-6 shadow-lg flex-shrink-0">
          {[
            "Petunjuk Halaman Awal",
            "Petunjuk Login",
            "Petunjuk Buat Akun",
            "Petunjuk Home",
            "Petunjuk Halaman Materi",
            "Petunjuk Latihan dan Kuis",
          ].map((section) => (
            <button
              key={section}
              className={`rounded-lg py-3 px-4 text-center font-medium text-sm transition-all duration-200 ${
                activeSection === section
                  ? "bg-[#6E2A7F] text-white shadow-md"
                  : "bg-[#e3e7f9] text-gray-800"
              }`}
              style={{
                backgroundColor:
                  activeSection === section
                    ? "#6E2A7F"
                    : hoveredSection === section
                    ? "#FFFFFF"
                    : "#e3e7f9",
                color:
                  activeSection === section
                    ? "#FFFFFF"
                    : hoveredSection === section
                    ? "#000000"
                    : "#1F2937",
                transition: "background-color 0.2s, color 0.2s",
              }}
              type="button"
              onClick={() => setActiveSection(section)}
              onMouseEnter={() => setHoveredSection(section)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {section}
            </button>
          ))}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center mb-2 text-sm text-white bg-gray-600 rounded-lg sm:text-base hover:bg-gray-700"
            style={{
              width: "160px",
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
        </nav>
        <section className="bg-white rounded-xl p-6 md:p-6 flex-1 max-h-[800px] overflow-y-auto shadow-lg border border-gray-100 rounded-xl duration-200 max-w-full">
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default PetunjukPenggunaan;
