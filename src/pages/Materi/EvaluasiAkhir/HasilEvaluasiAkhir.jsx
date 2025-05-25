import React from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import nextIcon from "../../../assets/img/selanjutnya.png";
import lockIcon from "../../../assets/img/lock.png";
import "../Bab-1/Style/HasilLatihanBab1.css";

const HasilEvaluasiAkhir = () => {
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();
  const { state } = useLocation();
  const { score = 0, totalQuestions = 20, kkm = 75 } = state || {};
  const percentage = Math.min((score / (totalQuestions * 5)) * 100, 100); // Cap at 100%
  const isPassing = percentage >= kkm;

  const handleRetry = () => {
    navigate("/materi/evaluasi/evaluasi-akhir");
  };

  const handleNext = () => {
    if (isPassing) {
      handleLessonComplete("/materi/evaluasi/evaluasi-akhir");
      handleLessonComplete("/materi/evaluasi/kesimpulan");
      navigate("/dashboard");
    }
  };

  return (
    <div className="max-w-4xl p-4 mx-auto mt-20 bg-white rounded-lg shadow-md sm:p-6 lg:p-8">
      <h1 className="mb-4 text-xl font-bold text-center text-gray-800 sm:text-2xl">
        Hasil Evaluasi Akhir
      </h1>
      <div className="p-4 text-center bg-gray-100 rounded-lg sm:p-6">
        <h2 className="text-base font-semibold text-gray-800 sm:text-lg">
          Skor Anda: {score} / {totalQuestions * 5}
        </h2>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Persentase: {percentage.toFixed(2)}%
        </p>
        <p
          className={`mt-2 text-base sm:text-lg font-semibold ${
            isPassing ? "text-green-600" : "text-red-600"
          }`}
        >
          Status: {isPassing ? "Lulus" : "Tidak Lulus"}
        </p>
      </div>
      <div className="flex flex-col justify-center mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleRetry}
          className="flex items-center justify-center w-full gap-2 px-6 py-3 text-base text-white transition-all duration-200 rounded-lg shadow-sm hover:shadow-md sm:px-8 sm:w-auto"
          style={{ backgroundColor: "#EF4444" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#DC2626")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#EF4444")
          }
        >
          Ulangi Kuis
        </button>
        <button
          onClick={handleNext}
          className={`flex items-center justify-center gap-2 px-6 py-3 text-base transition-all duration-200 rounded-lg shadow-sm hover:shadow-md sm:px-8 w-full sm:w-auto ${
            isPassing
              ? "text-white bg-purple-700 hover:bg-purple-800"
              : "text-gray-500 bg-gray-200 cursor-not-allowed"
          }`}
          disabled={!isPassing}
        >
          <span>Kembali Ke Dashboard</span>
          <img
            src={isPassing ? nextIcon : lockIcon}
            alt={isPassing ? "Selanjutnya" : "Terkunci"}
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
        </button>
      </div>
    </div>
  );
};

export default HasilEvaluasiAkhir;
