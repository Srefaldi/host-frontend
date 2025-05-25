import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvaluations,
  getQuestionsByEvaluation,
  deleteQuestion,
  createQuestion,
  updateQuestion,
} from "../../features/authSlice.js";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EvaluationList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    evaluations = [],
    questions = [],
    isLoading,
    isError,
    message,
    user,
  } = useSelector((state) => state.auth);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    evaluation_id: "",
    question_text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    option_e: "",
    correct_answer: "",
  });
  const [editQuestionData, setEditQuestionData] = useState(null);

  // Filter soal berdasarkan pencarian
  const filteredQuestions = questions.filter((question) =>
    question?.question_text
      ? question.question_text.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const currentQuestions = filteredQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    dispatch(getEvaluations());
  }, [dispatch]);

  // Periksa peran pengguna saat komponen dimuat
  useEffect(() => {
    if (user && user.role !== "guru" && user.role !== "admin") {
      Swal.fire({
        title: "Akses Ditolak",
        text: "Halaman ini hanya dapat diakses oleh guru atau admin.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/dashboard-guru");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (selectedEvaluation) {
      dispatch(getQuestionsByEvaluation(selectedEvaluation)).then((action) => {
        if (getQuestionsByEvaluation.rejected.match(action)) {
          Swal.fire({
            title: "Gagal!",
            text: action.payload || "Gagal memuat soal untuk evaluasi ini.",
            icon: "error",
          });
          setSelectedEvaluation(null);
        }
      });
    } else {
      dispatch({
        type: "questions/getQuestionsByEvaluation/fulfilled",
        payload: { questions: [] },
      });
    }
  }, [selectedEvaluation, dispatch]);

  // Tangani error tanpa redirect untuk admin/guru
  useEffect(() => {
    if (isError && message !== "Mohon login ke akun anda") {
      if (user && (user.role === "guru" || user.role === "admin")) {
        Swal.fire({
          title: "Gagal!",
          text: message || "Terjadi kesalahan.",
          icon: "error",
        });
      }
    } else if (isError && message === "Mohon login ke akun anda") {
      Swal.fire({
        title: "Sesi Berakhir",
        text: "Silakan login kembali.",
        icon: "warning",
        timer: 1500,
        showConfirmButton: false,
      });
      window.location.href = "/login";
    }
  }, [isError, message, user]);

  // Log untuk debugging
  useEffect(() => {
    console.log("Evaluations:", evaluations);
    console.log("Selected Evaluation:", selectedEvaluation);
    console.log("Questions:", questions);
    console.log("Filtered Questions:", filteredQuestions);
    console.log("Current Questions:", currentQuestions);
    console.log("Is Error:", isError, "Message:", message);
    console.log("User:", user);
  }, [
    evaluations,
    selectedEvaluation,
    questions,
    filteredQuestions,
    currentQuestions,
    isError,
    message,
    user,
  ]);

  const handleEvaluationChange = (e) => {
    setSelectedEvaluation(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteQuestion = (questionId) => {
    Swal.fire({
      title: "Konfirmasi Hapus",
      text: "Apakah Anda yakin ingin menghapus soal ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteQuestion(questionId)).then((action) => {
          if (deleteQuestion.fulfilled.match(action)) {
            Swal.fire({
              title: "Berhasil!",
              text: "Soal telah dihapus.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              title: "Gagal!",
              text: action.payload || "Terjadi kesalahan saat menghapus soal.",
              icon: "error",
            });
          }
        });
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const {
      evaluation_id,
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      option_e,
      correct_answer,
    } = formData;

    if (
      !evaluation_id ||
      !question_text ||
      !option_a ||
      !option_b ||
      !option_c ||
      !option_d ||
      !option_e ||
      !correct_answer
    ) {
      Swal.fire({
        title: "Gagal!",
        text: "Semua kolom wajib diisi.",
        icon: "error",
      });
      return;
    }

    dispatch(createQuestion(formData)).then((action) => {
      if (createQuestion.fulfilled.match(action)) {
        Swal.fire({
          title: "Berhasil!",
          text: "Soal telah ditambahkan.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setIsAddModalOpen(false);
        setFormData({
          evaluation_id: "",
          question_text: "",
          option_a: "",
          option_b: "",
          option_c: "",
          option_d: "",
          option_e: "",
          correct_answer: "",
        });
        if (selectedEvaluation) {
          dispatch(getQuestionsByEvaluation(selectedEvaluation));
        }
      } else {
        Swal.fire({
          title: "Gagal!",
          text: action.payload || "Terjadi kesalahan saat menambahkan soal.",
          icon: "error",
        });
      }
    });
  };

  const handleEditQuestion = (questionId) => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/questions/${questionId}`,
          {
            withCredentials: true,
          }
        );
        setEditQuestionData(response.data);
        setFormData(response.data);
        setIsEditModalOpen(true);
      } catch (error) {
        Swal.fire({
          title: "Gagal!",
          text: error.response?.data?.msg || "Tidak dapat mengambil data soal.",
          icon: "error",
        });
      }
    };
    fetchQuestion();
  };

  const handleUpdateQuestion = (e) => {
    e.preventDefault();
    dispatch(
      updateQuestion({ id: editQuestionData.id, questionData: formData })
    ).then((action) => {
      if (updateQuestion.fulfilled.match(action)) {
        Swal.fire({
          title: "Berhasil!",
          text: "Soal telah diperbarui.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setIsEditModalOpen(false);
        setFormData({
          evaluation_id: "",
          question_text: "",
          option_a: "",
          option_b: "",
          option_c: "",
          option_d: "",
          option_e: "",
          correct_answer: "",
        });
        if (selectedEvaluation) {
          dispatch(getQuestionsByEvaluation(selectedEvaluation));
        }
      } else {
        Swal.fire({
          title: "Gagal!",
          text: action.payload || "Terjadi kesalahan saat memperbarui soal.",
          icon: "error",
        });
      }
    });
  };

  const renderHeader = () => (
    <thead className="hidden sm:table-header-group">
      <tr className="text-center border-b border-gray-200">
        <th className="px-2 py-2 text-sm font-semibold w-[5%] sm:px-3 sm:text-base">
          NO
        </th>
        <th className="px-2 py-2 text-sm font-semibold w-[10%] sm:px-3 sm:text-base">
          BAB
        </th>
        <th className="px-2 py-2 text-sm font-semibold w-[25%] sm:px-3 sm:text-base">
          SOAL
        </th>
        <th className="px-2 py-2 text-sm font-semibold w-[10%] sm:px-3 sm:text-base">
          A
        </th>
        <th className="px-2 py-2 text-sm font-semibold w-[10%] sm:px-3 sm:text-base">
          B
        </th>
        <th className="px-2 py-2 text-sm font-semibold w-[10%] sm:px-3 sm:text-base">
          C
        </th>
        <th className="px-2 py-2 text-sm font-semibold w-[10%] sm:px-3 sm:text-base">
          D
        </th>
        <th className="px-2 py-2 text-sm font-semibold w-[10%] sm:px-3 sm:text-base">
          E
        </th>
        <th className="px-2 py-2 text-sm font-semibold w-[5%] sm:px-3 sm:text-base">
          JAWABAN
        </th>
        <th className="px-2 py-2 text-sm font-semibold w-[10%] sm:px-3 sm:text-base">
          AKSI
        </th>
      </tr>
    </thead>
  );

  const renderBody = () => (
    <tbody className="text-center">
      {currentQuestions.length === 0 ? (
        <tr className="border-b border-gray-200">
          <td
            colSpan="10"
            className="px-2 py-4 font-mono text-sm text-center text-gray-500 sm:px-3 sm:text-base"
          >
            Tidak ada soal untuk bab/evaluasi ini.
          </td>
        </tr>
      ) : (
        currentQuestions.map((question, index) => (
          <tr
            key={question.id}
            className="flex flex-col border-b border-gray-200 sm:table-row"
          >
            <td className="flex px-2 py-2 text-sm sm:table-cell sm:px-3 sm:font-mono sm:text-base sm:align-middle">
              <span className="inline-block w-24 font-semibold text-center sm:hidden">
                No:
              </span>
              {(currentPage - 1) * itemsPerPage + index + 1}
            </td>
            <td className="flex px-2 py-2 text-sm sm:table-cell sm:px-3 sm:font-mono sm:text-base sm:align-middle">
              <span className="inline-block w-24 font-semibold text-center sm:hidden">
                Bab:
              </span>
              {evaluations.find(
                (evaluation) => evaluation.id === question.evaluation_id
              )?.type === "bab"
                ? `Bab ${
                    evaluations.find(
                      (evaluation) => evaluation.id === question.evaluation_id
                    )?.chapter
                  }`
                : "Evaluasi Akhir"}
            </td>
            <td className="flex px-2 py-2 text-sm sm:table-cell sm:px-3 sm:font-mono sm:text-base sm:align-middle truncate">
              <span className="inline-block w-24 font-semibold text-center sm:hidden">
                Soal:
              </span>
              <span title={question.question_text}>
                {question.question_text}
              </span>
            </td>
            <td className="flex px-2 py-2 text-sm sm:table-cell sm:px-3 sm:font-mono sm:text-base sm:align-middle truncate">
              <span className="inline-block w-24 font-semibold text-center sm:hidden">
                Opsi A:
              </span>
              <span title={question.option_a}>{question.option_a}</span>
            </td>
            <td className="flex px-2 py-2 text-sm sm:table-cell sm:px-3 sm:font-mono sm:text-base sm:align-middle truncate">
              <span className="inline-block w-24 font-semibold text-center sm:hidden">
                Opsi B:
              </span>
              <span title={question.option_b}>{question.option_b}</span>
            </td>
            <td className="flex px-2 py-2 text-sm sm:table-cell sm:px-3 sm:font-mono sm:text-base sm:align-middle truncate">
              <span className="inline-block w-24 font-semibold text-center sm:hidden">
                Opsi C:
              </span>
              <span title={question.option_c}>{question.option_c}</span>
            </td>
            <td className="flex px-2 py-2 text-sm sm:table-cell sm:px-3 sm:font-mono sm:text-base sm:align-middle truncate">
              <span className="inline-block w-24 font-semibold text-center sm:hidden">
                Opsi D:
              </span>
              <span title={question.option_d}>{question.option_d}</span>
            </td>
            <td className="flex px-2 py-2 text-sm sm:table-cell sm:px-3 sm:font-mono sm:text-base sm:align-middle truncate">
              <span className="inline-block w-24 font-semibold text-center sm:hidden">
                Opsi E:
              </span>
              <span title={question.option_e}>{question.option_e}</span>
            </td>
            <td className="flex px-2 py-2 text-sm sm:table-cell sm:px-3 sm:font-mono sm:text-base sm:align-middle">
              <span className="inline-block w-24 font-semibold text-center sm:hidden">
                Jawaban:
              </span>
              {question.correct_answer}
            </td>
            <td className="flex justify-center px-2 py-2 text-sm sm:table-cell sm:px-3 sm:font-mono sm:text-base sm:align-middle">
              <span className="inline-block w-24 font-semibold text-center sm:hidden">
                Aksi:
              </span>
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => handleEditQuestion(question.id)}
                  className="px-2 py-1 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600 sm:px-3"
                >
                  Perbarui
                </button>
                <button
                  onClick={() => handleDeleteQuestion(question.id)}
                  className="px-2 py-1 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700 sm:px-3"
                >
                  Hapus
                </button>
              </div>
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
            Data Evaluasi
          </h1>

          {isLoading && (
            <p className="text-sm text-center text-gray-500 sm:text-base">
              Loading...
            </p>
          )}
          {isError && message !== "Mohon login ke akun anda" && (
            <p className="mb-4 text-sm text-center text-red-500 sm:text-base">
              {message}
            </p>
          )}

          <div className="flex flex-col mb-4 space-y-4 sm:mb-6 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex flex-col space-y-4">
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
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 sm:px-4 sm:py-2"
              >
                TAMBAH SOAL
              </button>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
              <select
                value={selectedEvaluation || ""}
                onChange={handleEvaluationChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 sm:px-3 sm:py-2 sm:w-40"
              >
                <option value="">Pilih Bab/Evaluasi</option>
                {evaluations.map((evaluation) => (
                  <option key={evaluation.id} value={evaluation.id}>
                    {evaluation.type === "bab"
                      ? `Bab ${evaluation.chapter}`
                      : "Evaluasi Akhir"}
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
                placeholder="Cari soal..."
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 sm:px-3 sm:py-2 sm:w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full mt-4 text-sm text-gray-700 bg-white border sm:mt-5 sm:text-base">
              {renderHeader()}
              {renderBody()}
            </table>
          </div>

          {renderPagination()}

          {/* Modal Tambah Soal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50 sm:px-6">
              <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto sm:max-w-2xl sm:p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-800 sm:text-xl">
                  Tambah Soal
                </h2>
                <form onSubmit={handleAddQuestion} className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Pilih Bab/Evaluasi
                    </label>
                    <select
                      name="evaluation_id"
                      value={formData.evaluation_id}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2"
                      required
                    >
                      <option value="">Pilih Bab/Evaluasi</option>
                      {evaluations.map((evaluation) => (
                        <option key={evaluation.id} value={evaluation.id}>
                          {evaluation.type === "bab"
                            ? `Bab ${evaluation.chapter}`
                            : "Evaluasi Akhir"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Teks Soal
                    </label>
                    <textarea
                      name="question_text"
                      value={formData.question_text}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2"
                      rows="4"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Opsi A
                    </label>
                    <input
                      type="text"
                      name="option_a"
                      value={formData.option_a}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Opsi B
                    </label>
                    <input
                      type="text"
                      name="option_b"
                      value={formData.option_b}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Opsi C
                    </label>
                    <input
                      type="text"
                      name="option_c"
                      value={formData.option_c}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Opsi D
                    </label>
                    <input
                      type="text"
                      name="option_d"
                      value={formData.option_d}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Opsi E
                    </label>
                    <input
                      type="text"
                      name="option_e"
                      value={formData.option_e}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Jawaban Benar
                    </label>
                    <select
                      name="correct_answer"
                      value={formData.correct_answer}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2"
                      required
                    >
                      <option value="">Pilih Jawaban</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                    </select>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 sm:px-4 sm:py-2"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 sm:px-4 sm:py-2"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal Edit Soal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50 sm:px-6">
              <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto sm:max-w-2xl sm:p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-800 sm:text-xl">
                  Edit Soal
                </h2>
                <form onSubmit={handleUpdateQuestion} className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Pilih Bab/Evaluasi
                    </label>
                    <select
                      name="evaluation_id"
                      value={formData.evaluation_id}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2"
                      required
                    >
                      <option value="">Pilih Bab/Evaluasi</option>
                      {evaluations.map((evaluation) => (
                        <option key={evaluation.id} value={evaluation.id}>
                          {evaluation.type === "bab"
                            ? `Bab ${evaluation.chapter}`
                            : "Evaluasi Akhir"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Teks Soal
                    </label>
                    <textarea
                      name="question_text"
                      value={formData.question_text}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2"
                      rows="4"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Opsi A
                    </label>
                    <input
                      type="text"
                      name="option_a"
                      value={formData.option_a}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Opsi B
                    </label>
                    <input
                      type="text"
                      name="option_b"
                      value={formData.option_b}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Opsi C
                    </label>
                    <input
                      type="text"
                      name="option_c"
                      value={formData.option_c}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Opsi D
                    </label>
                    <input
                      type="text"
                      name="option_d"
                      value={formData.option_d}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Opsi E
                    </label>
                    <input
                      type="text"
                      name="option_e"
                      value={formData.option_e}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Jawaban Benar
                    </label>
                    <select
                      name="correct_answer"
                      value={formData.correct_answer}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2"
                      required
                    >
                      <option value="">Pilih Jawaban</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                    </select>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 sm:px-4 sm:py-2"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 sm:px-4 sm:py-2"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default EvaluationList;
