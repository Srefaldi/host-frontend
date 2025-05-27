import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getMe } from "../../../features/authSlice";
import Navbar from "../../../components/Landing/NavbarLogin/NavbarLogin";
import Footer from "../../../components/Landing/Footer";
import Sidebar from "../../../components/LoginPage/Sidebar";
import {
  IoStatsChart,
  IoArrowUp,
  IoArrowDown,
  IoKey,
  IoPeople,
  IoPieChart,
} from "react-icons/io5";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [token] = useState("HAYQK"); // Static token
  const [studentCount, setStudentCount] = useState(0);
  const [completedStudents, setCompletedStudents] = useState(0);
  const [averageScores, setAverageScores] = useState({});
  const [highestScores, setHighestScores] = useState({});
  const [lowestScores, setLowestScores] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);

  // Fetch class list
  const getClasses = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/classes`,
        {
          withCredentials: true,
        }
      );
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error.message);
      setError(
        error.response?.data?.msg ||
          "Terjadi kesalahan saat mengambil daftar kelas"
      );
    }
  };

  // Fetch student count, progress, and scores
  const getScoresData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch users with class filter
      const usersResponse = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/users`,
        {
          params: { class: selectedClass || undefined },
          withCredentials: true,
        }
      );
      const students = usersResponse.data.filter(
        (user) => user.role === "user"
      );
      setStudentCount(students.length);

      // Count students with 100% progress
      const completed = students.filter(
        (student) => student.progress === 100
      ).length;
      setCompletedStudents(completed);

      // Fetch scores for each student
      const scoresPromises = students.map(async (student) => {
        try {
          const scoreResponse = await axios.get(
            `${import.meta.env.VITE_API_ENDPOINT}/scores/${student.uuid}`,
            { withCredentials: true }
          );
          return {
            name: student.name,
            scores: scoreResponse.data.scores,
          };
        } catch (error) {
          console.error(
            `Gagal mengambil nilai untuk ${student.name}:`,
            error.message
          );
          return { name: student.name, scores: [] };
        }
      });

      const studentsWithScores = await Promise.all(scoresPromises);

      // Process scores for averages, highest, and lowest
      const averages = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], final: [] };
      const highest = {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        final: null,
      };
      const lowest = {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        final: null,
      };

      studentsWithScores.forEach(({ name, scores }) => {
        // Chapters 1-6
        for (let i = 1; i <= 6; i++) {
          const score = scores.find(
            (s) => s.type === "evaluasi" && s.chapter === i
          );
          if (score) {
            averages[i].push(score.score);
            if (!highest[i] || score.score > highest[i].score) {
              highest[i] = { name, score: score.score };
            }
            if (!lowest[i] || score.score < lowest[i].score) {
              lowest[i] = { name, score: score.score };
            }
          }
        }
        // Final evaluation
        const finalScore = scores.find((s) => s.type === "evaluasi_akhir");
        if (finalScore) {
          averages.final.push(finalScore.score);
          if (!highest.final || finalScore.score > highest.final.score) {
            highest.final = { name, score: finalScore.score };
          }
          if (!lowest.final || finalScore.score < lowest.final.score) {
            lowest.final = { name, score: finalScore.score };
          }
        }
      });

      // Calculate averages
      const formattedAverages = {};
      for (let i = 1; i <= 6; i++) {
        formattedAverages[i] =
          averages[i].length > 0
            ? Math.floor(
                averages[i].reduce((sum, val) => sum + val, 0) /
                  averages[i].length
              )
            : "-";
      }
      formattedAverages.final =
        averages.final.length > 0
          ? Math.floor(
              averages.final.reduce((sum, val) => sum + val, 0) /
                averages.final.length
            )
          : "-";

      // Format highest and lowest scores
      const formattedHighest = {};
      const formattedLowest = {};
      for (let i = 1; i <= 6; i++) {
        formattedHighest[i] = highest[i]
          ? `${highest[i].name} (${Math.floor(highest[i].score)})`
          : "-";
        formattedLowest[i] = lowest[i]
          ? `${lowest[i].name} (${Math.floor(lowest[i].score)})`
          : "-";
      }
      formattedHighest.final = highest.final
        ? `${highest.final.name} (${Math.floor(highest.final.score)})`
        : "-";
      formattedLowest.final = lowest.final
        ? `${lowest.final.name} (${Math.floor(lowest.final.score)})`
        : "-";

      setAverageScores(formattedAverages);
      setHighestScores(formattedHighest);
      setLowestScores(formattedLowest);
    } catch (error) {
      console.error("Error fetching scores data:", error.message);
      setError(
        error.response?.data?.msg ||
          "Terjadi kesalahan saat mengambil data nilai"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getMe());
    getClasses();
    getScoresData();
  }, [dispatch]);

  useEffect(() => {
    getScoresData();
  }, [selectedClass]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div
          className="flex flex-col flex-1 w-full p-4 mx-auto sm:p-6 md:p-8 max-w-7xl"
          style={{ marginTop: window.innerWidth >= 768 ? "100px" : "60px" }}
        >
          <h2 className="mb-6 text-2xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 sm:text-3xl md:text-4xl">
            DASHBOARD GURU
          </h2>
          {isLoading && (
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-5 h-5 border-purple-600 rounded-full border-3 border-t-transparent animate-spin sm:w-6 sm:h-6"></div>
                <p className="text-base sm:text-lg">Memuat data...</p>
              </div>
            </div>
          )}
          {error && (
            <p className="p-3 mb-6 text-base text-center text-red-700 bg-red-100 rounded-lg shadow sm:p-4 sm:text-lg">
              {error}
            </p>
          )}
          <div className="mb-6 sm:mb-8">
            <label className="block mb-2 text-base font-semibold text-gray-800 sm:text-lg">
              Pilih Kelas
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 text-base bg-white border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:scale-[1.02] transform sm:px-4 sm:py-3 sm:text-lg md:w-80"
            >
              <option value="">Semua Kelas</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          <div className="p-4 mb-6 rounded-lg shadow-lg bg-gradient-to-br from-purple-100 to-blue-100 sm:p-6 sm:mb-8">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md sm:p-6">
              <div className="flex items-center space-x-3">
                <IoKey className="text-xl text-purple-600 sm:text-2xl" />
                <span className="text-lg font-bold text-gray-800 sm:text-xl">
                  TOKEN
                </span>
              </div>
              <div className="text-lg font-semibold text-gray-900 sm:text-xl">
                {token}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 sm:mb-8">
            <div className="flex items-center justify-between p-4 text-white transition-shadow duration-200 rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-purple-800 hover:shadow-xl sm:p-6">
              <div>
                <div className="text-lg font-bold sm:text-xl">JUMLAH SISWA</div>
                <div className="mt-2 text-xl sm:mt-3 sm:text-2xl">
                  {studentCount > 0
                    ? `${studentCount} SISWA`
                    : "Tidak ada siswa"}
                </div>
              </div>
              <IoPeople className="text-3xl sm:text-4xl" />
            </div>
            <div className="flex items-center justify-between p-4 text-white transition-shadow duration-200 rounded-lg shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-700 hover:shadow-xl sm:p-6">
              <div>
                <div className="text-lg font-bold sm:text-xl">
                  PROGRES BELAJAR
                </div>
                <div className="mt-2 text-xl sm:mt-3 sm:text-2xl">
                  {studentCount > 0
                    ? `${completedStudents} SISWA SELESAI`
                    : "Tidak ada data"}
                </div>
              </div>
              <IoPieChart className="text-3xl sm:text-4xl" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div className="p-4 text-white transition-shadow duration-200 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-blue-7 00 hover:shadow-xl sm:p-6">
              <div className="flex items-center">
                <IoStatsChart className="mr-2 text-xl sm:mr-3 sm:text-2xl" />
                <div className="text-lg font-bold sm:text-xl">
                  NILAI RATA-RATA
                </div>
              </div>
              <div className="mt-3 text-base sm:mt-4 sm:text-lg">
                {studentCount > 0 ? (
                  <>
                    <p className="mb-1 sm:mb-2">Kuis 1: {averageScores[1]}</p>
                    <p className="mb-1 sm:mb-2">Kuis 2: {averageScores[2]}</p>
                    <p className="mb-1 sm:mb-2">Kuis 3: {averageScores[3]}</p>
                    <p className="mb-1 sm:mb-2">Kuis 4: {averageScores[4]}</p>
                    <p className="mb-1 sm:mb-2">Kuis 5: {averageScores[5]}</p>
                    <p className="mb-1 sm:mb-2">Kuis 6: {averageScores[6]}</p>
                    <p>Evaluasi: {averageScores.final}</p>
                  </>
                ) : (
                  <p>Tidak ada data</p>
                )}
              </div>
            </div>
            <div className="p-4 text-white transition-shadow duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-green-700 hover:shadow-xl sm:p-6">
              <div className="flex items-center">
                <IoArrowUp className="mr-2 text-xl sm:mr-3 sm:text-2xl" />
                <div className="text-lg font-bold sm:text-xl">
                  NILAI TERTINGGI
                </div>
              </div>
              <div className="mt-3 text-base sm:mt-4 sm:text-lg">
                {studentCount > 0 ? (
                  <>
                    <p className="mb-1 sm:mb-2">Kuis 1: {highestScores[1]}</p>
                    <p className="mb-1 sm:mb-2">Kuis 2: {highestScores[2]}</p>
                    <p className="mb-1 sm:mb-2">Kuis 3: {highestScores[3]}</p>
                    <p className="mb-1 sm:mb-2">Kuis 4: {highestScores[4]}</p>
                    <p className="mb-1 sm:mb-2">Kuis 5: {highestScores[5]}</p>
                    <p className="mb-1 sm:mb-2">Kuis 6: {highestScores[6]}</p>
                    <p>Evaluasi: {highestScores.final}</p>
                  </>
                ) : (
                  <p>Tidak ada data</p>
                )}
              </div>
            </div>
            <div className="p-4 text-white transition-shadow duration-200 rounded-lg shadow-lg bg-gradient-to-r from-red-500 to-red-700 hover:shadow-xl sm:p-6">
              <div className="flex items-center">
                <IoArrowDown className="mr-2 text-xl sm:mr-3 sm:text-2xl" />
                <div className="text-lg font-bold sm:text-xl">
                  NILAI TERENDAH
                </div>
              </div>
              <div className="mt-3 text-base sm:mt-4 sm:text-lg">
                {studentCount > 0 ? (
                  <>
                    <p className="mb-1 sm:mb-2">Kuis 1: {lowestScores[1]}</p>
                    <p className="mb-1 sm:mb-2">Kuis 2: {lowestScores[2]}</p>
                    <p className="mb-1 sm:mb-2">Kuis 3: {lowestScores[3]}</p>
                    <p className="mb-1 sm:mb-2">Kuis 4: {lowestScores[4]}</p>
                    <p className="mb-1 sm:mb-2">Kuis 5: {lowestScores[5]}</p>
                    <p className="mb-1 sm:mb-2">Kuis 6: {lowestScores[6]}</p>
                    <p>Evaluasi: {lowestScores.final}</p>
                  </>
                ) : (
                  <p>Tidak ada data</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
