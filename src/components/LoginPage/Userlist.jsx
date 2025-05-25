import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState({ uuid: "", name: "", class: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getClasses();
    getUsers();
  }, []);

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
      console.error(
        "Error fetching classes:",
        error.response?.data || error.message
      );
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/users`,
        {
          params: { class: selectedClass },
          withCredentials: true,
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_ENDPOINT}/users/${userId}`,
        {
          withCredentials: true,
        }
      );
      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Siswa berhasil dihapus.",
        timer: 1500,
        showConfirmButton: false,
      });
      getUsers();
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text:
          error.response?.data?.msg ||
          "Terjadi kesalahan saat menghapus siswa.",
      });
    }
  };

  const openEditModal = (user) => {
    setEditUser({
      uuid: user.uuid,
      name: user.name,
      class: user.class || "",
    });
    setMsg("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditUser({ uuid: "", name: "", class: "" });
    setMsg("");
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_ENDPOINT}/users/${editUser.uuid}`,
        {
          name: editUser.name,
          class: editUser.class,
        },
        {
          withCredentials: true,
        }
      );
      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data siswa berhasil diperbarui.",
        timer: 1500,
        showConfirmButton: false,
      });
      closeModal();
      getUsers();
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
      setMsg(
        error.response?.data?.msg || "Terjadi kesalahan saat memperbarui siswa."
      );
    }
  };

  useEffect(() => {
    getUsers();
  }, [selectedClass]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className="flex flex-col min-h-screen text-gray-800 bg-white"
      style={{ marginTop: window.innerWidth >= 768 ? "100px" : "60px" }}
    >
      <main className="flex flex-1 overflow-hidden">
        <section className="flex-1 p-4 overflow-auto sm:p-6 md:p-8">
          <h1 className="mb-4 text-2xl font-semibold text-gray-800 sm:text-3xl md:text-4xl">
            Data Siswa
          </h1>

          <div className="flex flex-col mb-4 space-y-4 sm:mb-6 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <span>Menampilkan</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 sm:text-base sm:px-3 sm:py-2"
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
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 sm:text-base sm:px-3 sm:py-2 sm:w-40"
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
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama..."
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 sm:text-base sm:px-3 sm:py-2 sm:w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full mt-4 text-sm text-gray-700 border sm:mt-5 sm:text-base">
              <thead className="hidden sm:table-header-group">
                <tr className=" border-b border-gray-200">
                  <th className="px-2 py-1 font-semibold text-center select-none sm:px-3 sm:py-2">
                    NIS
                  </th>
                  <th className="px-2 py-1 font-semibold text-center select-none sm:px-3 sm:py-2">
                    Nama
                  </th>
                  <th className="px-2 py-1 font-semibold text-center select-none sm:px-3 sm:py-2">
                    Kelas
                  </th>
                  <th className="px-2 py-1 font-semibold text-center select-none sm:px-3 sm:py-2">
                    Status Belajar
                  </th>
                  <th className="px-2 py-1 font-semibold text-center select-none sm:px-3 sm:py-2">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr
                    key={user.uuid}
                    className="flex flex-col border-b border-gray-200 sm:table-row sm:border-b"
                  >
                    <td className="flex items-center px-2 py-1 text-center sm:table-cell sm:px-3 sm:py-2 sm:font-mono sm:text-base sm:select-text">
                      <span className="w-20 font-semibold text-centerinline-block sm:hidden">
                        NIS:
                      </span>
                      {user.nis}
                    </td>
                    <td className="flex items-center px-2 py-1 text-center sm:table-cell sm:px-3 sm:py-2 sm:font-mono sm:text-base sm:select-text">
                      <span className="inline-block w-20 font-semibold sm:hidden">
                        Nama:
                      </span>
                      {user.name}
                    </td>
                    <td className="flex items-center px-2 py-1 text-center sm:table-cell sm:px-3 sm:py-2 sm:font-mono sm:text-base sm:select-text">
                      <span className="inline-block w-20 font-semibold sm:hidden">
                        Kelas:
                      </span>
                      {user.class || "-"}
                    </td>
                    <td className="flex items-center px-2 py-1 text-center sm:table-cell sm:px-3 sm:py-2 sm:font-mono sm:text-base sm:select-text">
                      <span className="inline-block w-20 font-semibold sm:hidden">
                        Status:
                      </span>
                      {user.status === "BELUM SELESAI" ? (
                        <span className="px-2 py-1 text-xs text-white bg-red-500 rounded sm:text-sm">
                          BELUM SELESAI
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs text-white bg-green-500 rounded sm:text-sm">
                          SELESAI
                        </span>
                      )}
                    </td>
                    <td className="flex items-center justify-center px-2 py-1 space-x-2 sm:table-cell sm:px-3 sm:py-2 sm:font-mono sm:text-base sm:select-text">
                      <span className="inline-block w-20 font-semibold sm:hidden">
                        Aksi:
                      </span>
                      <button
                        onClick={() => openEditModal(user)}
                        className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded hover:bg-green-600 sm:text-sm sm:px-3"
                      >
                        Perbarui
                      </button>
                      <button
                        onClick={() => deleteUser(user.uuid)}
                        className="px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded hover:bg-red-700 sm:text-sm sm:px-3"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for Editing User */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-11/12 max-w-md p-4 bg-white rounded-lg shadow-lg sm:p-6 sm:w-full">
                <h2 className="mb-4 text-lg font-semibold text-gray-800 sm:text-xl">
                  Perbarui Data Siswa
                </h2>
                <form onSubmit={updateUser}>
                  {msg && (
                    <p className="mb-4 text-sm text-center text-red-500 sm:text-base">
                      {msg}
                    </p>
                  )}
                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Nama
                    </label>
                    <input
                      type="text"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 sm:text-base sm:px-3 sm:py-2"
                      value={editUser.name}
                      onChange={(e) =>
                        setEditUser({ ...editUser, name: e.target.value })
                      }
                      placeholder="Nama Lengkap"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Kelas
                    </label>
                    <input
                      type="text"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 sm:text-base sm:px-3 sm:py-2"
                      value={editUser.class}
                      onChange={(e) =>
                        setEditUser({ ...editUser, class: e.target.value })
                      }
                      placeholder="Contoh: 10A"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-3 py-1 text-sm text-white bg-gray-500 rounded hover:bg-gray-600 sm:text-base sm:px-4 sm:py-2"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 sm:text-base sm:px-4 sm:py-2"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-end mt-4 space-x-1 select-none sm:mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 rounded-l hover:bg-gray-600 sm:text-sm sm:px-3"
              disabled={currentPage === 1}
            >
              «
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 hover:bg-gray-600 sm:text-sm sm:px-3"
              disabled={currentPage === 1}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-2 py-1 text-xs font-semibold text-white bg-gray-500 hover:bg-gray-600 sm:text-sm sm:px-3 ${
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
              className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 hover:bg-gray-600 sm:text-sm sm:px-3"
              disabled={currentPage === totalPages}
            >
              ›
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 rounded-r hover:bg-gray-600 sm:text-sm sm:px-3"
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

export default Userlist;
