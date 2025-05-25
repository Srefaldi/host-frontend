import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getMe, reset } from "../../features/authSlice.js";
import Navbar from "../../components/Landing/NavbarLogin/NavbarLogin";
import Footer from "../../components/Landing/Footer";
import daftarBab from "../Home/Materi/daftarBab.json";
import Swal from "sweetalert2";

// Impor gambar internal
import petunjukImage from "../../assets/img/petunjuk-penggunaan.png";
import materiImage from "../../assets/img/mulai-belajar.png";
import informasiImage from "../../assets/img/informasi-icon.png";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isLoading, user, message } = useSelector(
    (state) => state.auth
  );
  const [lastLessonPath, setLastLessonPath] = useState("/materi");
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    console.log("Auth state:", { isLoading, isError, user, message });
    if (!isLoggedOut) {
      dispatch(getMe());
    }
  }, [dispatch, isLoggedOut]);

  useEffect(() => {
    if (isError && message === "Mohon login ke akun anda" && !isLoggedOut) {
      dispatch(reset());
      navigate("/");
    }
  }, [isError, message, dispatch, navigate, isLoggedOut]);

  useEffect(() => {
    if (user?.progress) {
      const totalLessons = 39;
      const completedCount = Math.round((user.progress / 100) * totalLessons);
      const allLessons = daftarBab.flatMap((bab) =>
        bab.subBab.map((sub) => sub.path)
      );
      const lastCompletedIndex = Math.min(
        completedCount,
        allLessons.length - 1
      );
      const nextLessonPath = allLessons[lastCompletedIndex] || "/materi";
      setLastLessonPath(nextLessonPath);
      console.log("Last lesson path:", nextLessonPath);
    }
  }, [user]);

  const handleOpenPetunjuk = () => {
    navigate("/petunjuk-penggunaan"); // Navigasi ke halaman petunjuk penggunaan
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // Hanya kembalikan null jika user null, bukan logout, dan tidak ada error
  if (!user && !isLoggedOut && !isError) {
    console.log("Dashboard tidak dirender: menunggu getMe selesai");
    return null;
  }

  console.log("Dashboard dirender, user:", user);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setIsLoggedOut={setIsLoggedOut} />
      <div className="flex flex-1">
        <div className="flex-1 p-4 bg-white sm:p-6">
          <main className="container px-4 py-4 mx-auto">
            <h1
              className="mb-8 text-2xl font-bold text-center text-gray-800 sm:text-3xl md:text-4xl"
              style={{ minHeight: "3rem", marginTop: "4rem" }} // Menambahkan margin-top 4rem
            >
              DASAR-DASAR PEMROGRAMAN C#
            </h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div
                className="p-4 sm:p-6 md:p-8 text-center bg-white rounded-lg shadow-md min-h-[350px] sm:min-h-[400px] md:min-h-[500px]"
                style={{
                  border: "4px solid #6E2A7F",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2 className="mb-4 text-xl font-bold text-gray-800 sm:text-2xl">
                  PETUNJUK PENGGUNAAN
                </h2>
                <img
                  alt="Illustration of a book, glasses, and a cup of coffee"
                  className="object-contain w-48 h-48 mx-auto mb-4 sm:w-64 md:w-80 sm:h-64 md:h-80"
                  src={petunjukImage}
                />
                <button
                  className="px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base text-gray-600 bg-transparent border border-gray-600 rounded hover:bg-gray-300"
                  onClick={handleOpenPetunjuk} // Ganti fungsi untuk navigasi
                >
                  LIHAT PETUNJUK
                </button>
              </div>
              <div
                className="p-4 sm:p-6 md:p-8 text-center bg-white rounded-lg shadow-md min-h-[350px] sm:min-h-[400px] md:min-h-[500px]"
                style={{
                  border: "4px solid #6E2A7F",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2 className="mb-4 text-xl font-bold text-gray-800 sm:text-2xl">
                  MATERI
                </h2>
                <img
                  alt="Illustration of a person typing on a laptop with code on the screen"
                  className="object-contain w-48 h-48 mx-auto mb-4 sm:w-64 md:w-80 sm:h-64 md:h-80"
                  src={materiImage}
                />
                <Link
                  to={lastLessonPath}
                  className="px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base text-white rounded hover:bg-gray-300"
                  style={{ backgroundColor: "#6E2A7F" }}
                >
                  MULAI BELAJAR
                </Link>
              </div>
              <div
                className="p-4 sm:p-6 md:p-8 text-center bg-white rounded-lg shadow-md min-h-[350px] sm:min-h-[400px] md:min-h-[500px]"
                style={{
                  border: "4px solid #6E2A7F",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2 className="mb-4 text-xl font-bold text-gray-800 sm:text-2xl">
                  INFORMASI
                </h2>
                <img
                  alt="Illustration of people around a large FAQ text"
                  className="object-contain w-48 h-48 mx-auto mb-4 sm:w-64 md:w-80 sm:h-64 md:h-80"
                  src={informasiImage}
                />
                <Link
                  to="/informasi"
                  className="px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base text-gray-600 bg-transparent border border-gray-600 rounded hover:bg-gray-300"
                >
                  LIHAT INFORMASI
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
