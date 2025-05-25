import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ScoreList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    getClasses();
    getUsers();
  }, [selectedClass]);

  useEffect(() => {
    if (error === "Mohon login ke akun anda") {
      navigate("/login"); // Replace window.location.href with navigate
    }
  }, [error, navigate]);

  const getClasses = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/users`,
        {
          withCredentials: true,
        }
      );
      const uniqueClasses = [
        ...new Set(
          response.data.map((user) => user.class).filter((cls) => cls)
        ),
      ].sort();
      setClasses(uniqueClasses);
      setError(null);
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Gagal memuat daftar kelas";
      console.error("Error fetching classes:", errorMsg);
      setError(errorMsg);
    }
  };

  const getUsers = async () => {
    try {
      const meResponse = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/me`,
        {
          withCredentials: true,
        }
      );
      console.log("Current user (teacher):", meResponse.data);

      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/users`,
        {
          params: { class: selectedClass || undefined },
          withCredentials: true,
        }
      );

      const filteredUsers = response.data.filter(
        (user) => user.role === "user"
      );

      const usersWithScores = await Promise.all(
        filteredUsers.map(async (user) => {
          try {
            const scoreResponse = await axios.get(
              `${import.meta.env.VITE_API_ENDPOINT}/scores/${user.uuid}`,
              {
                withCredentials: true,
              }
            );
            console.log(
              `Raw scores for ${user.name} (UUID: ${user.uuid}):`,
              scoreResponse.data.scores
            );
            return { ...user, scores: scoreResponse.data.scores || [] };
          } catch (error) {
            console.error(
              `Error fetching scores for user ${user.uuid}:`,
              error.response ? error.response.data : error.message
            );
            return { ...user, scores: [] };
          }
        })
      );
      console.log("Users with scores:", usersWithScores);
      setUsers(usersWithScores);
      setError(null);
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Gagal memuat data siswa";
      console.error("Error fetching users:", errorMsg);
      setError(errorMsg);
    }
  };

  const exportToPDF = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/scores/export/json`,
        {
          params: { class: selectedClass || undefined },
          withCredentials: true,
        }
      );

      const usersWithScores = response.data;

      if (!usersWithScores.length) {
        throw new Error(
          `Tidak ada siswa ditemukan untuk kelas ${
            selectedClass || "semua kelas"
          }`
        );
      }

      const doc = new jsPDF({ orientation: "landscape" });
      doc.setFontSize(16);
      doc.text(
        `Daftar Nilai Siswa ${selectedClass ? `- Kelas ${selectedClass}` : ""}`,
        14,
        10
      );

      const tableData = usersWithScores.map((user) => {
        const getHighestScore = (scores, type, chapter) => {
          const filteredScores = scores.filter(
            (s) =>
              s.type === type &&
              (type === "evaluasi_akhir" ? true : Number(s.chapter) === chapter)
          );
          if (filteredScores.length === 0) return 0;
          return Math.floor(Math.max(...filteredScores.map((s) => s.score)));
        };

        return [
          user.nis,
          user.name,
          user.class || "-",
          getHighestScore(user.scores, "latihan", 1),
          getHighestScore(user.scores, "latihan", 2),
          getHighestScore(user.scores, "latihan", 3),
          getHighestScore(user.scores, "latihan", 4),
          getHighestScore(user.scores, "latihan", 5),
          getHighestScore(user.scores, "latihan", 6),
          getHighestScore(user.scores, "evaluasi", 1),
          getHighestScore(user.scores, "evaluasi", 2),
          getHighestScore(user.scores, "evaluasi", 3),
          getHighestScore(user.scores, "evaluasi", 4),
          getHighestScore(user.scores, "evaluasi", 5),
          getHighestScore(user.scores, "evaluasi", 6),
          getHighestScore(user.scores, "evaluasi_akhir", null),
        ];
      });

      autoTable(doc, {
        head: [
          [
            "NIS",
            "Nama",
            "Kelas",
            "Latihan Bab 1",
            "Latihan Bab 2",
            "Latihan Bab 3",
            "Latihan Bab 4",
            "Latihan Bab 5",
            "Latihan Bab 6",
            "Kuis Bab 1",
            "Kuis Bab 2",
            "Kuis Bab 3",
            "Kuis Bab 4",
            "Kuis Bab 5",
            "Kuis Bab 6",
            "Evaluasi Akhir",
          ],
        ],
        body: tableData,
        theme: "grid",
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
        margin: { top: 20 },
        columnStyles: {
          0: { cellWidth: 20 },
          1: { cellWidth: 40 },
          2: { cellWidth: 15 },
        },
      });

      doc.save(`Daftar_Nilai_${selectedClass || "Semua_Kelas"}.pdf`);
      setError(null);
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg || error.message || "Gagal mengekspor ke PDF";
      console.error("Error exporting to PDF:", errorMsg);
      setError(errorMsg);
    }
  };

  const exportToExcel = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/scores/export/excel`,
        {
          params: { class: selectedClass || undefined },
          responseType: "blob",
          withCredentials: true,
        }
      );
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `Daftar_Nilai_${selectedClass || "Semua_Kelas"}.xlsx`);
      setError(null);
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Gagal menekspor ke Excel";
      console.error("Error exporting to Excel:", errorMsg);
      setError(errorMsg);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = [user.name, user.class || ""]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass
      ? user.class?.toLowerCase() === selectedClass.toLowerCase()
      : true;
    return matchesSearch && matchesClass;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getHighestScore = (scores, type, chapter) => {
    console.log(
      "Checking score for type:",
      type,
      "chapter:",
      chapter,
      "scores:",
      scores
    );
    const filteredScores = scores.filter(
      (s) =>
        s.type === type &&
        (type === "evaluasi_akhir" ? true : Number(s.chapter) === chapter)
    );
    if (filteredScores.length === 0) {
      console.log("No scores found, returning 0");
      return 0;
    }
    const highestScore = Math.max(...filteredScores.map((s) => s.score));
    console.log("Highest score found:", highestScore);
    return Math.floor(highestScore);
  };

  const renderHeader = () => (
    <thead className="hidden sm:table-header-group">
      <tr className="text-center border-b border-gray-200">
        <th
          rowSpan={2}
          className="w-[10%] px-2 py-1 text-sm font-semibold text-center align-middle select-none sm:px-3 sm:py-2 sm:text-base"
        >
          NIS
        </th>
        <th
          rowSpan={2}
          className="w-[20%] px-2 py-1 text-sm font-semibold text-center align-middle select-none sm:px-3 sm:py-2 sm:text-base"
        >
          Nama
        </th>
        <th
          rowSpan={2}
          className="w-[10%] px-2 py-1 text-sm font-semibold text-center align-middle select-none sm:px-3 sm:py-2 sm:text-base"
        >
          Kelas
        </th>
        <th
          colSpan={6}
          className="px-2 py-1 text-sm font-semibold text-center select-none sm:px-3 sm:py-2 sm:text-base"
        >
          LATIHAN BAB
        </th>
        <th
          colSpan={6}
          className="px-2 py-1 text-sm font-semibold text-center select-none sm:px-3 sm:py-2 sm:text-base"
        >
          KUIS BAB
        </th>
        <th
          rowSpan={2}
          className="w-[10%] px-2 py-1 text-sm font-semibold text-center align-middle select-none sm:px-3 sm:py-2 sm:text-base"
        >
          EVALUASI AKHIR
        </th>
      </tr>
      <tr className="border-b border-gray-200">
        {[...Array(6)].map((_, i) => (
          <th
            key={`latihan-sub-${i}`}
            className="w-[6.25%] px-2 py-1 text-sm font-semibold text-center select-none sm:px-3 sm:py-2 sm:text-base"
          >
            {i + 1}
          </th>
        ))}
        {[...Array(6)].map((_, i) => (
          <th
            key={`evaluasi-sub-${i}`}
            className="w-[6.25%] px-2 py-1 text-sm font-semibold text-center select-none sm:px-3 sm:py-2 sm:text-base"
          >
            {i + 1}
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderBody = () => (
    <tbody className="text-center">
      {currentUsers.length === 0 ? (
        <tr>
          <td
            colSpan={16}
            className="px-2 py-1 text-sm text-center text-gray-500 sm:px-3 sm:py-2 sm:text-base"
          >
            Tidak ada data
          </td>
        </tr>
      ) : (
        currentUsers.map((user) => (
          <tr
            key={user.uuid}
            className="flex flex-col border-b border-gray-200 sm:table-row sm:border-b"
          >
            <td className="flex items-center px-2 py-1 text-center sm:table-cell sm:px-3 sm:py-2 sm:font-mono sm:text-base sm:select-text sm:align-middle">
              <span className="inline-block w-24 font-semibold text-center sm:hidden">
                NIS:
              </span>
              {user.nis}
            </td>
            <td className="flex items-center px-2 py-1 text-center sm:table-cell sm:px-3 sm:py-2 sm:font-mono sm:text-base sm:select-text sm:align-middle">
              <span className="inline-block w-24 font-semibold text-center sm:hidden">
                Nama:
              </span>
              {user.name}
            </td>
            <td className="flex items-center px-2 py-1 text-center sm:table-cell sm:px-3 sm:py-2 sm:font-mono sm:text-base sm:select-text sm:align-middle">
              <span className="inline-block w-24 font-semibold text-center sm:hidden">
                Kelas:
              </span>
              {user.class || "-"}
            </td>
            {[...Array(6)].map((_, i) => (
              <td
                key={`latihan-data-${i}`}
                className="flex items-center px-2 py-1 text-center sm:table-cell sm:px-3 sm:py-2 sm:font-mono sm:text-base sm:select-text sm:align-middle"
              >
                <span className="inline-block w-24 font-semibold text-center sm:hidden">
                  Latihan Bab {i + 1}:
                </span>
                {getHighestScore(user.scores, "latihan", i + 1)}
              </td>
            ))}
            {[...Array(6)].map((_, i) => (
              <td
                key={`evaluasi-data-${i}`}
                className="flex items-center px-2 py-1 text-center sm:table-cell sm:px-3 sm:py-2 sm:font-mono sm:text-base sm:select-text sm:align-middle"
              >
                <span className="inline-block w-24 font-semibold text-center sm:hidden">
                  Kuis Bab {i + 1}:
                </span>
                {getHighestScore(user.scores, "evaluasi", i + 1)}
              </td>
            ))}
            <td className="flex items-center px-2 py-1 text-center sm:table-cell sm:px-3 sm:py-2 sm:font-mono sm:text-base sm:select-text sm:align-middle">
              <span className="inline-block w-24 font-semibold text-center sm:hidden">
                Evaluasi Akhir:
              </span>
              {getHighestScore(user.scores, "evaluasi_akhir", null)}
            </td>
          </tr>
        ))
      )}
    </tbody>
  );

  const renderPagination = () => (
    <div className="flex flex-wrap justify-end mt-4 space-x-1 select-none sm:mt-6">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 rounded-l hover:bg-gray-600 sm:px-3"
        disabled={currentPage === 1}
      >
        «
      </button>
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 hover:bg-gray-600 sm:px-3"
        disabled={currentPage === 1}
      >
        ‹
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`px-2 py-1 text-xs font-semibold text-white bg-gray-500 hover:bg-gray-600 sm:px-3 ${
            currentPage === index + 1 ? "bg-gray-700" : ""
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 hover:bg-gray-600 sm:px-3"
        disabled={currentPage === totalPages}
      >
        ›
      </button>
      <button
        onClick={() => setCurrentPage(totalPages)}
        className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 rounded-r hover:bg-gray-600 sm:px-3"
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );

  return (
    <div
      className="flex flex-col min-h-screen text-gray-800 bg-white"
      style={{ marginTop: window.innerWidth >= 768 ? "100px" : "60px" }}
    >
      <main className="flex flex-1 overflow-hidden">
        <section className="flex-1 p-4 overflow-auto sm:p-6 md:p-8">
          <h1 className="mb-4 text-2xl font-semibold text-gray-800 sm:mb-5 sm:text-3xl">
            Daftar Nilai Siswa
          </h1>

          {error && (
            <p className="mb-4 text-sm text-center text-red-500 sm:text-base">
              {error}
            </p>
          )}

          <div className="flex flex-col mb-4 space-y-4 sm:mb-6 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <span>Menampilkan</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 sm:px-3 sm:py-2"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
              <span>data</span>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 sm:px-3 sm:py-2 sm:w-40"
              >
                <option value="">Semua Kelas</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Cari nama atau kelas..."
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 sm:px-3 sm:py-2 sm:w-64"
              />
            </div>
          </div>

          <div className="relative mb-4">
            <button
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="px-3 py-1 text-sm font-semibold text-white bg-purple-500 rounded hover:bg-purple-600 focus:outline-none sm:px-4 sm:py-2"
            >
              EXPORT
            </button>
            {isExportOpen && (
              <div className="absolute z-10 w-32 mt-2 bg-white border border-gray-300 rounded-md shadow-lg sm:w-48">
                <button
                  onClick={() => {
                    exportToPDF();
                    setIsExportOpen(false);
                  }}
                  className="block w-full px-3 py-1 text-sm text-left text-gray-700 hover:bg-gray-100 sm:px-4 sm:py-2"
                >
                  PDF
                </button>
                <button
                  onClick={() => {
                    exportToExcel();
                    setIsExportOpen(false);
                  }}
                  className="block w-full px-3 py-1 text-sm text-left text-gray-700 hover:bg-gray-100 sm:px-4 sm:py-2"
                >
                  Excel
                </button>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full mt-4 text-sm text-gray-700 bg-white border table-fixed sm:mt-5 sm:text-base">
              {renderHeader()}
              {renderBody()}
            </table>
          </div>

          {renderPagination()}
        </section>
      </main>
    </div>
  );
};

export default ScoreList;
