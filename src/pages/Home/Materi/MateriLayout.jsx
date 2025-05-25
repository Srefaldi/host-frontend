import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import MateriSidebar from "./MateriSidebar";
import Navbar from "./Navbar";
import Footer from "../../../components/Landing/Footer2";
import Swal from "sweetalert2";
import daftarBab from "./daftarBab.json";
import { getMe } from "../../../features/authSlice";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Impor HiX untuk ikon tutup

const MateriLayout = () => {
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isError, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalLessons = 76;

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
        const fetchedProgress = response.data.progress ?? 0;
        setProgress(fetchedProgress);
        const completedCount = Math.round(
          (fetchedProgress / 100) * totalLessons
        );
        const lessons = daftarBab
          .flatMap((bab) => bab.subBab.map((sub) => sub.path))
          .slice(0, completedCount);
        setCompletedLessons(lessons);
        console.log("Mengatur completedLessons:", lessons);
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
  }, [user, dispatch, isAuthenticated]);

  useEffect(() => {
    if (isError && !isLoading) {
      console.log("Error autentikasi, mengarahkan ke login");
      navigate("/login");
    }
  }, [isError, isLoading, navigate]);

  const updateProgressInBackend = async (newProgress) => {
    if (!user?.uuid || !isAuthenticated) {
      console.log("UUID pengguna tidak ditemukan atau tidak terautentikasi");
      return;
    }
    try {
      console.log(
        "Memperbarui progres untuk pengguna:",
        user.uuid,
        "ke",
        newProgress
      );
      const response = await axios.patch(
        `${import.meta.env.VITE_API_ENDPOINT}/users/${user.uuid}/progress`,
        { progress: newProgress },
        { withCredentials: true }
      );
      console.log("Respon pembaruan progres:", response.data);
      setProgress(newProgress);
      const completedCount = Math.round((newProgress / 100) * totalLessons);
      const lessons = daftarBab
        .flatMap((bab) => bab.subBab.map((sub) => sub.path))
        .slice(0, completedCount);
      setCompletedLessons(lessons);
      console.log(
        "Mengatur ulang completedLessons setelah pembaruan:",
        lessons
      );
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
    const allLessons = daftarBab.flatMap((bab) =>
      bab.subBab.map((sub) => sub.path)
    );
    const currentIndex = allLessons.indexOf(currentLessonId);
    if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
      return null;
    }
    return allLessons[currentIndex + 1];
  };

  const getStartLesson = () => {
    const allLessons = daftarBab.flatMap((bab) =>
      bab.subBab.map((sub) => sub.path)
    );
    if (progress >= 100) {
      return allLessons[allLessons.length - 1]; // Last lesson
    }
    const nextIncompleteLesson = allLessons.find(
      (lesson) => !completedLessons.includes(lesson)
    );
    return nextIncompleteLesson || allLessons[0]; // Fallback to first lesson
  };

  const handleLessonComplete = (lessonId) => {
    console.log("handleLessonComplete dipanggil dengan lessonId:", lessonId);
    if (!completedLessons.includes(lessonId)) {
      const newCompletedLessons = [...completedLessons, lessonId];
      setCompletedLessons(newCompletedLessons);

      const newProgress = (newCompletedLessons.length / totalLessons) * 100;
      const roundedProgress = parseFloat(newProgress.toFixed(2));
      console.log(
        "New completedLessons:",
        newCompletedLessons,
        "New progress:",
        roundedProgress
      );
      updateProgressInBackend(roundedProgress);
    } else {
      console.log("Materi sudah diselesaikan:", lessonId);
    }
  };

  const handleQuizComplete = (currentLessonId) => {
    console.log(
      "handleQuizComplete dipanggil dengan currentLessonId:",
      currentLessonId
    );
    const nextLessonId = getNextLesson(currentLessonId);
    const newLessonsToComplete = [currentLessonId];

    if (nextLessonId && !completedLessons.includes(nextLessonId)) {
      newLessonsToComplete.push(nextLessonId);
    }

    const newCompletedLessons = [
      ...new Set([...completedLessons, ...newLessonsToComplete]),
    ];

    if (newCompletedLessons.length > completedLessons.length) {
      setCompletedLessons(newCompletedLessons);
      const newProgress = (newCompletedLessons.length / totalLessons) * 100;
      const roundedProgress = parseFloat(newProgress.toFixed(2));
      console.log(
        "New completedLessons setelah kuis:",
        newCompletedLessons,
        "New progress:",
        roundedProgress
      );
      updateProgressInBackend(roundedProgress);
    } else {
      console.log(
        "Tidak ada perubahan pada completedLessons:",
        currentLessonId
      );
    }
  };

  const handleStartLearningAgain = () => {
    const startLesson = getStartLesson();
    console.log("Starting learning again, navigating to:", startLesson);
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
              width: "40px", // Lebar tetap 40px
              height: "40px", // Tinggi ditambahkan untuk konsistensi
              display: window.innerWidth >= 768 ? "none" : "flex", // Hanya muncul di layar kecil
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
