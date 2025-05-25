import React from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import nextIcon from "../../../assets/img/selanjutnya.png";
import lockIcon from "../../../assets/img/lock.png";
import "../Bab-1/Style/HasilLatihanBab1.css";

const HasilKuisBab6 = () => {
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();
  const { state } = useLocation();
  const { score = 0, totalQuestions = 10, kkm = 75 } = state || {};
  const percentage = Math.min((score / (totalQuestions * 10)) * 100, 100);
  const isPassing = percentage >= kkm;

  const handleRetry = () => {
    navigate("/materi/bab6/kuis-bab6");
  };

  const handleNext = () => {
    if (isPassing) {
      handleLessonComplete("/materi/bab6/kuis-bab6");
      handleLessonComplete("/materi/bab6/rangkuman-bab6");
      navigate("/materi/bab6/rangkuman-bab6");
    }
  };

  return (
    <div className="mt-20 max-w-4xl p-4 mx-auto bg-white rounded-lg shadow-md sm:p-6 lg:p-8">
      <h1 className="mb-4 text-2xl font-bold text-center text-gray-800">
        Hasil Kuis Bab 6
      </h1>
      <div className="p-4 text-center bg-gray-100 rounded-lg sm:p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Skor Anda: {score} / {totalQuestions * 10}
        </h2>
        <p className="mt-2 text-gray-600">
          Persentase: {percentage.toFixed(2)}%
        </p>
        <p
          className={`mt-2 text-lg font-semibold ${
            isPassing ? "text-green-600" : "text-red-600"
          }`}
        >
          Status: {isPassing ? "Lulus" : "Tidak Lulus"}
        </p>
      </div>
      <div className="flex flex-col justify-center mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleRetry}
          className="flex items-center justify-center gap-2 px-6 py-3 text-base text-white transition-all duration-200 rounded-lg shadow-sm hover:shadow-md sm:px-8"
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
          className={`flex items-center justify-center gap-2 px-6 py-3 text-base transition-all duration-200 rounded-lg shadow-sm hover:shadow-md sm:px-8 ${
            isPassing
              ? "text-white bg-purple-700 hover:bg-purple-800"
              : "text-gray-500 bg-gray-200 cursor-not-allowed"
          }`}
          disabled={!isPassing}
        >
          <span>Selanjutnya</span>
          <img
            src={isPassing ? nextIcon : lockIcon}
            alt={isPassing ? "Selanjutnya" : "Terkunci"}
            className="w-5 h-5"
          />
        </button>
      </div>
    </div>
  );
};

export default HasilKuisBab6;
