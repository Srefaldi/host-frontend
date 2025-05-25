import React, { useState, useEffect } from "react";
import axios from "axios";

const ProgresBelajar = () => {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default 10 untuk performa
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  // Fetch data saat selectedClass berubah
  useEffect(() => {
    getClasses();
    getUsers();
  }, [selectedClass]);

  // Redirect ke login jika error autentikasi
  useEffect(() => {
    if (error === "Mohon login ke akun anda") {
      window.location.href = "/login";
    }
  }, [error]);

  // Fetch kelas
  const getClasses = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/classes`,
        { withCredentials: true }
      );
      setClasses(response.data.sort() || []);
      console.log("Classes fetched:", response.data);
    } catch (error) {
      console.error(
        "Error fetching classes:",
        error.response?.data?.msg || error.message
      );
      setError(error.response?.data?.msg || "Terjadi kesalahan");
      setClasses([]);
    }
  };

  // Fetch users
  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/users`,
        {
          params: { class: selectedClass || undefined },
          withCredentials: true,
        }
      );
      setUsers(response.data || []);
      setError(null);
      console.log("Users fetched:", response.data);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data?.msg || error.message
      );
      setError(error.response?.data?.msg || "Terjadi kesalahan");
      setUsers([]);
    }
  };

  // Filter users berdasarkan NIS, nama, dan kelas
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    const nisMatch =
      user.nis?.toString().toLowerCase().includes(searchLower) || false;
    const nameMatch = user.name?.toLowerCase().includes(searchLower) || false;
    const classMatch = user.class?.toLowerCase().includes(searchLower) || false;
    console.log("Filtering user:", {
      nis: user.nis,
      name: user.name,
      class: user.class,
      searchLower,
      nisMatch,
      nameMatch,
      classMatch,
    });
    return nisMatch || nameMatch || classMatch;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className="flex flex-col min-h-screen text-gray-800 bg-white"
      style={{ marginTop: window.innerWidth >= 768 ? "80px" : "50px" }}
    >
      <main className="flex flex-1 overflow-hidden">
        <section className="flex-1 p-4 overflow-auto sm:p-6 md:p-8">
          <h1 className="mb-4 text-2xl font-semibold text-gray-800 sm:mb-5 sm:text-3xl">
            Progres Belajar
          </h1>

          {error && (
            <p className="mb-4 text-center text-red-500 sm:text-base">
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
                placeholder="Cari NIS, nama, atau kelas..."
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 sm:px-3 sm:py-2 sm:w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full mt-4 text-sm text-gray-700 border table-fixed sm:mt-5 sm:text-base">
              <thead className="hidden sm:table-header-group">
                <tr className="border-b border-gray-200">
                  <th className="w-[15%] px-2 py-1 font-semibold text-center sm:px-3 sm:py-2">
                    NIS
                  </th>
                  <th className="w-[30%] px-2 py-1 font-semibold text-center sm:px-3 sm:py-2">
                    Nama
                  </th>
                  <th className="w-[15%] px-2 py-1 font-semibold text-center sm:px-3 sm:py-2">
                    Kelas
                  </th>
                  <th className="w-[40%] px-2 py-1 font-semibold text-center sm:px-3 sm:py-2">
                    Progres Belajar
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
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
                      <td className="flex items-center px-2 py-1 text-center sm:table-cell sm:px-3 sm:py-2 sm:font-mono sm:text-base sm:align-middle">
                        <span className="inline-block w-20 font-semibold sm:hidden">
                          NIS:
                        </span>
                        {user.nis || "-"}
                      </td>
                      <td className="flex items-center px-2 py-1 text-center sm:table-cell sm:px-3 sm:py-2 sm:font-mono sm:text-base sm:align-middle">
                        <span className="inline-block w-20 font-semibold sm:hidden">
                          Nama:
                        </span>
                        {user.name || "-"}
                      </td>
                      <td className="flex items-center px-2 py-1 text-center sm:table-cell sm:px-3 sm:py-2 sm:font-mono sm:text-base sm:align-middle">
                        <span className="inline-block w-20 font-semibold sm:hidden">
                          Kelas:
                        </span>
                        {user.class || "-"}
                      </td>
                      <td className="flex items-center justify-center px-2 py-1 text-center sm:table-cell sm:px-3 sm:py-2 sm:font-mono sm:text-base sm:align-middle">
                        <span className="inline-block w-20 font-semibold sm:hidden">
                          Progres:
                        </span>
                        <div className="flex flex-col items-center w-full sm:w-3/4">
                          <div className="w-full h-4 overflow-hidden bg-gray-200 rounded sm:w-3/4">
                            <div
                              className="flex items-center justify-center h-full text-xs font-semibold text-white bg-blue-500"
                              style={{ width: `${user.progress || 0}%` }}
                            >
                              {user.progress !== null
                                ? `${user.progress.toFixed(2)}%`
                                : "0%"}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap justify-end mt-4 space-x-1 sm:mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 rounded-l hover:bg-gray-600 sm:px-3 sm:text-sm"
              disabled={currentPage === 1}
            >
              «
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 hover:bg-gray-600 sm:px-3 sm:text-sm"
              disabled={currentPage === 1}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-2 py-1 text-xs font-semibold text-white bg-gray-500 hover:bg-gray-600 sm:px-3 sm:text-sm ${
                  currentPage === index + 1 ? "bg-gray-700" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 hover:bg-gray-600 sm:px-3 sm:text-sm"
              disabled={currentPage === totalPages}
            >
              ›
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 rounded-r hover:bg-gray-600 sm:px-3 sm:text-sm"
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProgresBelajar;
