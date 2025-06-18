import React, { useState, useEffect } from "react";
import axios from "axios";

const ProgresBelajar = () => {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  // Daftar materi (sama dengan yang ada di backend)
  const daftarBab = [
    {
      id: 1,
      judul: "Pendahuluan",
      subBab: [
        { path: "/materi/bab1/pengenalan", label: "Pengenalan" },
        { path: "/materi/bab1/struktur-kode", label: "Struktur Kode" },
        { path: "/materi/bab1/struktur-eksekusi", label: "Struktur Eksekusi" },
        { path: "/materi/bab1/sintaks-print", label: "Sintaks Print" },
        { path: "/materi/bab1/sintaks-komentar", label: "Sintaks Komentar" },
        { path: "/materi/bab1/error-csharp", label: "Error C#" },
        { path: "/materi/bab1/latihan-bab1", label: "Latihan Bab 1" },
        { path: "/materi/bab1/kuis-bab1", label: "Kuis Bab 1" },
        { path: "/materi/bab1/rangkuman-bab1", label: "Rangkuman Bab 1" },
      ],
    },
    {
      id: 2,
      judul: "Variabel",
      subBab: [
        { path: "/materi/bab2/variabel", label: "Variabel" },
        { path: "/materi/bab2/penamaan-variabel", label: "Penamaan Variabel" },
        { path: "/materi/bab2/kategori-variabel", label: "Kategori Variabel" },
        {
          path: "/materi/bab2/deklarasi-inialisasi",
          label: "Deklarasi dan Inialisasi",
        },
        {
          path: "/materi/bab2/deklarasi-banyak",
          label: "Deklarasi Banyak Variabel",
        },
        {
          path: "/materi/bab2/variabel-konstanta",
          label: "Variabel dan Konstanta",
        },
        { path: "/materi/bab2/sintaks-input", label: "Sintaks Input" },
        { path: "/materi/bab2/latihan-bab2", label: "Latihan Bab 2" },
        { path: "/materi/bab2/kuis-bab2", label: "Kuis Bab 2" },
        { path: "/materi/bab2/rangkuman-bab2", label: "Rangkuman Bab 2" },
      ],
    },
    {
      id: 3,
      judul: "Tipe Data",
      subBab: [
        {
          path: "/materi/bab3/pengertian-tipedata",
          label: "Pengertian Tipe Data",
        },
        {
          path: "/materi/bab3/klasifikasi-tipedata",
          label: "Klasifikasi Tipe Data",
        },
        { path: "/materi/bab3/tipe-data-dasar", label: "Tipe Data Dasar" },
        { path: "/materi/bab3/integer", label: "Integer" },
        { path: "/materi/bab3/floating-point", label: "Floating Point" },
        { path: "/materi/bab3/boolean", label: "Boolean" },
        { path: "/materi/bab3/char", label: "Char" },
        { path: "/materi/bab3/string", label: "String" },
        { path: "/materi/bab3/latihan-bab3", label: "Latihan Bab 3" },
        { path: "/materi/bab3/kuis-bab3", label: "Kuis Bab 3" },
        { path: "/materi/bab3/rangkuman-bab3", label: "Rangkuman Bab 3" },
      ],
    },
    {
      id: 4,
      judul: "Operator",
      subBab: [
        {
          path: "/materi/bab4/pengertian-operator",
          label: "Pengertian Operator",
        },
        {
          path: "/materi/bab4/operator-arithmetic",
          label: "Operator Aritmatika",
        },
        {
          path: "/materi/bab4/operator-increment-decrement",
          label: "Operator Increment dan Decrement",
        },
        {
          path: "/materi/bab4/operator-assignment",
          label: "Operator Assignment",
        },
        {
          path: "/materi/bab4/operator-comparison",
          label: "Operator Perbandingan",
        },
        { path: "/materi/bab4/operator-logika", label: "Operator Logika" },
        {
          path: "/materi/bab4/operator-conditional",
          label: "Operator Kondisional",
        },
        { path: "/materi/bab4/operator-equality", label: "Operator Equality" },
        { path: "/materi/bab4/latihan-bab4", label: "Latihan Bab 4" },
        { path: "/materi/bab4/kuis-bab4", label: "Kuis Bab 4" },
        { path: "/materi/bab4/rangkuman-bab4", label: "Rangkuman Bab 4" },
      ],
    },
    {
      id: 5,
      judul: "Kontrol Alur",
      subBab: [
        {
          path: "/materi/bab5/pengertian-kontrol-alur",
          label: "Pengertian Kontrol Alur",
        },
        {
          path: "/materi/bab5/pernyataan-if-else",
          label: "Pernyataan If-Else",
        },
        { path: "/materi/bab5/pernyataan-switch", label: "Pernyataan Switch" },
        {
          path: "/materi/bab5/pernyataan-perulangan",
          label: "Pernyataan Perulangan",
        },
        {
          path: "/materi/bab5/pernyataan-break-continue",
          label: "Pernyataan Break dan Continue",
        },
        {
          path: "/materi/bab5/perulangan-bersarang",
          label: "Perulangan Bersarang",
        },
        { path: "/materi/bab5/latihan-bab5", label: "Latihan Bab 5" },
        { path: "/materi/bab5/kuis-bab5", label: "Kuis Bab 5" },
        { path: "/materi/bab5/rangkuman-bab5", label: "Rangkuman Bab 5" },
      ],
    },
    {
      id: 6,
      judul: "Method",
      subBab: [
        { path: "/materi/bab6/pengenalan-method", label: "Pengenalan Method" },
        { path: "/materi/bab6/method-void", label: "Method Void" },
        {
          path: "/materi/bab6/method-tipe-data",
          label: "Method dengan Tipe Data",
        },
        { path: "/materi/bab6/parameter-method", label: "Parameter Method" },
        { path: "/materi/bab6/latihan-bab6", label: "Latihan Bab 6" },
        { path: "/materi/bab6/kuis-bab6", label: "Kuis Bab 6" },
        { path: "/materi/bab6/rangkuman-bab6", label: "Rangkuman Bab 6" },
      ],
    },
    {
      id: 7,
      judul: "Evaluasi",
      subBab: [
        { path: "/materi/evaluasi/evaluasi-akhir", label: "Evaluasi Akhir" },
      ],
    },
  ];

  // Fungsi untuk mendapatkan label materi terakhir
  const getLastMateri = (completedLessons) => {
    if (!completedLessons || completedLessons.length === 0) {
      return "-";
    }
    const lastLessonPath = completedLessons[completedLessons.length - 1];
    for (const bab of daftarBab) {
      const subBab = bab.subBab.find((sub) => sub.path === lastLessonPath);
      if (subBab) {
        return `${bab.judul} - ${subBab.label}`;
      }
    }
    return "-";
  };

  useEffect(() => {
    getClasses();
    getUsers();
  }, [selectedClass]);

  useEffect(() => {
    if (error === "Mohon login ke akun anda") {
      window.location.href = "/login";
    }
  }, [error]);

  const getClasses = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/classes`,
        { withCredentials: true }
      );
      setClasses(response.data.sort() || []);
    } catch (error) {
      setError(error.response?.data?.msg || "Terjadi kesalahan");
      setClasses([]);
    }
  };

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
    } catch (error) {
      setError(error.response?.data?.msg || "Terjadi kesalahan");
      setUsers([]);
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    const nisMatch =
      user.nis?.toString().toLowerCase().includes(searchLower) || false;
    const nameMatch = user.name?.toLowerCase().includes(searchLower) || false;
    const classMatch = user.class?.toLowerCase().includes(searchLower) || false;
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
                  <th className="w-[25%] px-2 py-1 font-semibold text-center sm:px-3 sm:py-2">
                    Nama
                  </th>
                  <th className="w-[10%] px-2 py-1 font-semibold text-center sm:px-3 sm:py-2">
                    Kelas
                  </th>
                  <th className="w-[25%] px-2 py-1 font-semibold text-center sm:px-3 sm:py-2">
                    Progres Belajar
                  </th>
                  <th className="w-[25%] px-2 py-1 font-semibold text-center sm:px-3 sm:py-2">
                    Materi Terakhir
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
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
                        <div className="relative flex flex-col items-center w-full sm:w-3/4">
                          <div className="w-full h-4 overflow-hidden bg-gray-200 rounded sm:w-3/4">
                            <div
                              className="h-full"
                              style={{
                                width: `${user.progress || 0}%`,
                                backgroundColor: "#68217A",
                              }}
                            ></div>
                          </div>
                          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-4 text-xs font-semibold text-black">
                            {user.progress !== null
                              ? `${Math.round(user.progress)}%`
                              : "0%"}
                          </div>
                        </div>
                      </td>
                      <td className="flex items-center px-2 py-1 text-center sm:table-cell sm:px-3 sm:py-2 sm:font-mono sm:text-base sm:align-middle">
                        <span className="inline-block w-20 font-semibold sm:hidden">
                          Materi:
                        </span>
                        {getLastMateri(user.completedLessons)}
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
