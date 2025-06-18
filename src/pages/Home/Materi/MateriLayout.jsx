import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import MateriSidebar from "./MateriSidebar";
import Navbar from "./Navbar";
import Footer from "../../../components/Landing/Footer2";
import Swal from "sweetalert2";
import daftarBab from "./daftarBab.json";
import { getMe, validateLesson } from "../../../features/authSlice";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const MateriLayout = () => {
  const [progress, setProgress] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isError, isLoading, completedLessons } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Hitung total lessons, kecualikan halaman hasil
  const allLessons = daftarBab
    .flatMap((bab) => bab.subBab.map((sub) => sub.path))
    .filter(
      (path) =>
        !path.includes("hasil-latihan") &&
        !path.includes("hasil-kuis") &&
        !path.includes("hasil-evaluasi-akhir")
    );
  const totalLessons = allLessons.length; // Total sub-bab yang valid
  const previousPathRef = useRef(location.pathname);

  console.log("Total Lessons:", totalLessons); // Log untuk debugging

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (!user && !isLoading) {
      dispatch(getMe());
    }
  }, [dispatch, user, isLoading]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.uuid || !isAuthenticated) {
        console.log("UUID pengguna tidak ditemukan atau tidak terautentikasi");
        return;
      }
      try {
        console.log("Mengambil progres untuk pengguna:", user.uuid);
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/me`,
          {
            withCredentials: true,
          }
        );
        console.log("Respon progres:", response.data);
        setProgress(response.data.progress ?? 0);
      } catch (error) {
        console.error(
          "Error mengambil progres:",
          error.response?.data || error.message
        );
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
          dispatch(getMe());
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal Memuat Progres",
            text:
              error.response?.data?.msg ||
              "Tidak dapat mengambil progres dari server. Silakan coba lagi.",
          });
        }
      }
    };
    fetchProgress();
  }, [user?.uuid, isAuthenticated, dispatch]);

  useEffect(() => {
    if (isError && !isLoading && !user) {
      console.log("Error autentikasi, mengarahkan ke login");
      navigate("/login");
    }
  }, [isError, isLoading, user, navigate]);

  useEffect(() => {
    const restrictAccess = async () => {
      const currentPath = location.pathname;
      const previousPath = previousPathRef.current;

      // Daftar halaman hasil yang diizinkan
      const resultPages = [
        "/materi/bab1/hasil-latihan-bab1",
        "/materi/bab1/hasil-kuis-bab1",
        "/materi/bab2/hasil-latihan-bab2",
        "/materi/bab2/hasil-kuis-bab2",
        "/materi/bab3/hasil-latihan-bab3",
        "/materi/bab3/hasil-kuis-bab3",
        "/materi/bab4/hasil-latihan-bab4",
        "/materi/bab4/hasil-kuis-bab4",
        "/materi/bab5/hasil-latihan-bab5",
        "/materi/bab5/hasil-kuis-bab5",
        "/materi/bab6/hasil-latihan-bab6",
        "/materi/bab6/hasil-kuis-bab6",
        "/materi/evaluasi/hasil-evaluasi-akhir",
      ];

      console.log("Restrict Access - Current Path:", currentPath);
      console.log("Restrict Access - Previous Path:", previousPath);
      console.log("Restrict Access - Completed Lessons:", completedLessons);

      // Jika currentPath adalah halaman hasil, izinkan akses tanpa validasi
      if (resultPages.includes(currentPath)) {
        console.log("Access allowed for result page:", currentPath);
        previousPathRef.current = currentPath;
        return;
      }

      const currentIndex = allLessons.indexOf(currentPath);

      // Jika path tidak valid, arahkan ke materi terakhir yang diselesaikan
      if (currentIndex === -1) {
        const startLesson = getStartLesson();
        console.log("Navigating to start lesson (invalid path):", startLesson);
        navigate(startLesson);
        return;
      }

      try {
        const response = await dispatch(
          validateLesson({ lessonPath: currentPath })
        ).unwrap();
        console.log("Validate Lesson Response:", response);
        if (!response.isAccessible) {
          Swal.fire({
            icon: "error",
            title: "Akses Ditolak",
            text: "Anda harus menyelesaikan materi sebelumnya terlebih dahulu.",
          });
          const previousIndex = allLessons.indexOf(previousPath);
          if (
            previousIndex !== -1 &&
            (completedLessons.includes(previousPath) ||
              previousIndex === 0 ||
              (previousIndex > 0 &&
                completedLessons.includes(allLessons[previousIndex - 1])))
          ) {
            console.log("Navigating back to previous path:", previousPath);
            navigate(previousPath);
          } else {
            const startLesson = getStartLesson();
            console.log(
              "Previous path invalid, navigating to start lesson:",
              startLesson
            );
            navigate(startLesson);
          }
        } else {
          console.log("Access allowed, updating previous path:", currentPath);
          previousPathRef.current = currentPath;
        }
      } catch (error) {
        console.error("Error validasi akses materi:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal Memvalidasi Akses",
          text:
            error.message || "Terjadi kesalahan saat memvalidasi akses materi.",
        });
        const previousIndex = allLessons.indexOf(previousPath);
        if (
          previousIndex !== -1 &&
          (completedLessons.includes(previousPath) ||
            previousIndex === 0 ||
            (previousIndex > 0 &&
              completedLessons.includes(allLessons[previousIndex - 1])))
        ) {
          console.log(
            "Error - Navigating back to previous path:",
            previousPath
          );
          navigate(previousPath);
        } else {
          const startLesson = getStartLesson();
          console.log(
            "Error - Previous path invalid, navigating to start lesson:",
            startLesson
          );
          navigate(startLesson);
        }
      }
    };

    if (user && completedLessons) {
      restrictAccess();
    }
  }, [location.pathname, user, completedLessons, dispatch, navigate]);

  const updateProgressInBackend = async (newProgress, newCompletedLessons) => {
    if (!user?.uuid || !isAuthenticated) {
      console.log("UUID pengguna tidak ditemukan atau tidak terautentikasi");
      return;
    }
    // Validasi progres
    if (newProgress < 0 || newProgress > 100) {
      console.error("Progres tidak valid:", newProgress);
      Swal.fire({
        icon: "error",
        title: "Progres Tidak Valid",
        text: "Progres harus antara 0 dan 100.",
      });
      return;
    }
    try {
      console.log(
        "Memperbarui progres untuk pengguna:",
        user.uuid,
        "ke",
        newProgress,
        "dengan completedLessons:",
        newCompletedLessons
      );
      const response = await axios.patch(
        `${import.meta.env.VITE_API_ENDPOINT}/users/${user.uuid}/progress`,
        { progress: newProgress, completedLessons: newCompletedLessons },
        { withCredentials: true }
      );
      console.log("Respon pembaruan progres:", response.data);
      setProgress(newProgress);
      dispatch(getMe());
    } catch (error) {
      console.error(
        "Error memperbarui progres:",
        error.response?.data || error.message
      );
      if (error.response?.status === 401) {
        setIsAuthenticated(false);
        dispatch(getMe());
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Memperbarui Progres",
          text:
            error.response?.data?.msg ||
            "Tidak dapat menyimpan progres ke server. Silakan coba lagi.",
        });
      }
    }
  };

  const getNextLesson = (currentLessonId) => {
    const currentIndex = allLessons.indexOf(currentLessonId);
    if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
      return null;
    }
    return allLessons[currentIndex + 1];
  };

  const getStartLesson = () => {
    if (progress >= 100) {
      return allLessons[allLessons.length - 1];
    }
    if (completedLessons.length > 0) {
      const lastCompleted = completedLessons[completedLessons.length - 1];
      const lastIndex = allLessons.indexOf(lastCompleted);
      if (lastIndex < allLessons.length - 1) {
        return allLessons[lastIndex + 1];
      }
      return lastCompleted;
    }
    return allLessons[0];
  };

  const handleLessonComplete = (lessonId) => {
    console.log("handleLessonComplete dipanggil dengan lessonId:", lessonId);
    if (!allLessons.includes(lessonId)) {
      console.error("lessonId tidak valid:", lessonId);
      Swal.fire({
        icon: "error",
        title: "Materi Tidak Valid",
        text: "Materi yang dipilih tidak ditemukan dalam daftar materi.",
      });
      return;
    }
    if (!completedLessons.includes(lessonId)) {
      const newCompletedLessons = [...completedLessons, lessonId];
      const newProgress = (newCompletedLessons.length / totalLessons) * 100;
      const roundedProgress = parseFloat(newProgress.toFixed(2));
      console.log(
        "New completedLessons:",
        newCompletedLessons,
        "New progress:",
        roundedProgress
      );
      updateProgressInBackend(roundedProgress, newCompletedLessons);
    } else {
      console.log("Materi sudah diselesaikan:", lessonId);
    }
  };

  const handleQuizComplete = (currentLessonId) => {
    console.log(
      "handleQuizComplete dipanggil dengan currentLessonId:",
      currentLessonId
    );
    if (!allLessons.includes(currentLessonId)) {
      console.error("currentLessonId tidak valid:", currentLessonId);
      Swal.fire({
        icon: "error",
        title: "Materi Tidak Valid",
        text: "Materi kuis yang dipilih tidak ditemukan dalam daftar materi.",
      });
      return;
    }
    if (!completedLessons.includes(currentLessonId)) {
      const newCompletedLessons = [...completedLessons, currentLessonId];
      const newProgress = (newCompletedLessons.length / totalLessons) * 100;
      const roundedProgress = parseFloat(newProgress.toFixed(2));
      console.log(
        "New completedLessons setelah kuis:",
        newCompletedLessons,
        "New progress:",
        roundedProgress
      );
      updateProgressInBackend(roundedProgress, newCompletedLessons);
    } else {
      console.log(
        "Tidak ada perubahan pada completedLessons:",
        currentLessonId
      );
    }
  };

  const handleStartLearningAgain = () => {
    const startLesson = getStartLesson();
    console.log("Memulai belajar lagi, mengarahkan ke:", startLesson);
    navigate(startLesson);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1, marginTop: "80px" }}>
        <div
          style={{
            position: "fixed",
            top: "80px",
            left: 0,
            height: "calc(100vh - 80px)",
            backgroundColor: "white",
            transition: "transform 0.3s",
            zIndex: 50,
            width: isSidebarOpen ? "100%" : "320px",
            transform: isSidebarOpen
              ? "translateX(0)"
              : window.innerWidth >= 768
              ? "translateX(0)"
              : "translateX(-100%)",
            maxWidth: "320px",
          }}
        >
          <MateriSidebar
            completedLessons={completedLessons}
            progress={progress}
            toggleSidebar={toggleSidebar}
            handleStartLearningAgain={handleStartLearningAgain}
          />
        </div>
        {isSidebarOpen && window.innerWidth < 768 && (
          <div
            style={{
              position: "fixed",
              top: "80px",
              left: 0,
              width: "100%",
              height: "calc(100vh - 80px)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 40,
            }}
            onClick={toggleSidebar}
          />
        )}
        <div
          style={{
            flex: 1,
            padding: window.innerWidth >= 640 ? "24px" : "16px",
            marginLeft: window.innerWidth >= 768 ? "320px" : "0px",
            overflowY: "auto",
          }}
        >
          <button
            style={{
              position: "fixed",
              top: "92px",
              right: "16px",
              padding: "8px",
              color: "white",
              backgroundColor: "#6b7280",
              borderRadius: "8px",
              zIndex: 30,
              width: "40px",
              height: "40px",
              display: window.innerWidth >= 768 ? "none" : "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
          <Outlet context={{ handleLessonComplete, handleQuizComplete }} />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MateriLayout;
