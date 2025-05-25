import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEvaluations, createQuestion } from "../../features/authSlice.js";
import Swal from "sweetalert2";

const AddQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { evaluations, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

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

  useEffect(() => {
    dispatch(getEvaluations());
  }, [dispatch]);

  // Redirect ke login jika sesi kadaluarsa
  useEffect(() => {
    if (isError && message === "Mohon login ke akun anda") {
      navigate("/login"); // Replace window.location.href with navigate
    }
  }, [isError, message, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
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
        navigate("/evaluations");
      } else {
        Swal.fire({
          title: "Gagal!",
          text: action.payload || "Terjadi kesalahan saat menambahkan soal.",
          icon: "error",
        });
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen text-gray-800 bg-white">
      <main className="flex flex-1 overflow-hidden">
        <section className="flex-1 p-8 overflow-auto">
          <h1 className="mb-5 text-3xl font-semibold text-gray-800">
            Tambah Soal
          </h1>

          {isLoading && <p className="text-center">Loading...</p>}
          {isError && <p className="text-center text-red-500">{message}</p>}

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Pilih Bab/Evaluasi
              </label>
              <select
                name="evaluation_id"
                value={formData.evaluation_id}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                onClick={() => navigate("/evaluations")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Simpan
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AddQuestion;
