import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoDocumentText } from "react-icons/io5";

const HistoryNilai = () => {
  const { user } = useSelector((state) => state.auth);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch available classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/classes`,
          { withCredentials: true }
        );
        setClasses(response.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Gagal memuat daftar kelas");
      }
    };
    fetchClasses();
  }, []);

  // Fetch scores when class is selected
  useEffect(() => {
    if (selectedClass) {
      const fetchScores = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_API_ENDPOINT
            }/scores/export/json?class=${selectedClass}`,
            { withCredentials: true }
          );
          setStudents(response.data);
          setError("");
        } catch (err) {
          setError(err.response?.data?.msg || "Gagal memuat data nilai");
          setStudents([]);
        } finally {
          setLoading(false);
        }
      };
      fetchScores();
    }
  }, [selectedClass]);

  // Handle class selection
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedStudent(null); // Reset selected student when class changes
  };

  // Toggle detailed view for a student
  const toggleStudentDetails = (student) => {
    setSelectedStudent(selectedStudent?.uuid === student.uuid ? null : student);
  };

  // Helper to get score for a specific type and chapter
  const getScore = (scores, type, chapter) => {
    const score = scores.find(
      (s) =>
        s.type === type &&
        (type === "evaluasi_akhir" ? true : s.chapter === chapter)
    );
    return score ? Math.floor(score.score) : "-";
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold text-center text-transparent sm:text-3xl bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
          Rekap Nilai Siswa
        </h1>

        {/* Class Selection */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-700">
            Pilih Kelas
          </label>
          <select
            value={selectedClass}
            onChange={handleClassChange}
            className="w-full p-2 border border-gray-300 rounded-lg sm:w-64 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">-- Pilih Kelas --</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-600">Memuat data...</div>
        )}

        {/* Scores Table */}
        {!loading && selectedClass && students.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="text-white bg-gradient-to-r from-purple-600 to-blue-500">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-left">
                    NIS
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-left">
                    Nama
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-left">
                    Kelas
                  </th>
                  {[...Array(6)].map((_, i) => (
                    <th
                      key={`latihan-${i + 1}`}
                      className="px-4 py-3 text-sm font-medium text-left"
                    >
                      Latihan Bab {i + 1}
                    </th>
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <th
                      key={`kuis-${i + 1}`}
                      className="px-4 py-3 text-sm font-medium text-left"
                    >
                      Kuis Bab {i + 1}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-sm font-medium text-left">
                    Evaluasi Akhir
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <React.Fragment key={student.uuid}>
                    <tr
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleStudentDetails(student)}
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {student.nis}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {student.class || "-"}
                      </td>
                      {[...Array(6)].map((_, i) => (
                        <td
                          key={`latihan-${i + 1}`}
                          className="px-4 py-3 text-sm text-gray-900"
                        >
                          {getScore(student.scores, "latihan", i + 1)}
                        </td>
                      ))}
                      {[...Array(6)].map((_, i) => (
                        <td
                          key={`kuis-${i + 1}`}
                          className="px-4 py-3 text-sm text-gray-900"
                        >
                          {getScore(student.scores, "evaluasi", i + 1)}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {getScore(student.scores, "evaluasi_akhir", null)}
                      </td>
                    </tr>
                    {/* Detailed History */}
                    {selectedStudent?.uuid === student.uuid && (
                      <tr>
                        <td colSpan={15} className="px-4 py-4 bg-gray-100">
                          <div className="p-4 border border-gray-200 rounded-lg">
                            <h3 className="mb-4 text-lg font-semibold text-gray-800">
                              Riwayat Nilai: {student.name}
                            </h3>
                            {student.scores.length > 0 ? (
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-200">
                                    <tr>
                                      <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">
                                        Tipe
                                      </th>
                                      <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">
                                        Bab
                                      </th>
                                      <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">
                                        Nilai
                                      </th>
                                      <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">
                                        Tanggal
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200">
                                    {student.scores.map((score, index) => (
                                      <tr key={index}>
                                        <td className="px-4 py-2 text-sm text-gray-900">
                                          {score.type === "latihan"
                                            ? "Latihan"
                                            : score.type === "evaluasi"
                                            ? "Kuis"
                                            : "Evaluasi Akhir"}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-900">
                                          {score.type === "evaluasi_akhir"
                                            ? "-"
                                            : score.chapter}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-900">
                                          {Math.floor(score.score)}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-900">
                                          {new Date(
                                            score.created_at
                                          ).toLocaleDateString("id-ID", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          })}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p className="text-gray-600">
                                Belum ada data nilai untuk siswa ini.
                              </p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {!loading && selectedClass && students.length === 0 && !error && (
          <div className="text-center text-gray-600">
            Tidak ada data siswa untuk kelas yang dipilih.
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryNilai;
