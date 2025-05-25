import React from "react";
import SuccessIcon from "../../../../../assets/img/benar.png"; 

const PopUpJawabanBenar = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-green-500 text-white text-center rounded-lg p-6 shadow-lg w-96">
        <img
          src={SuccessIcon}
          alt="Success icon"
          className="w-10 h-10 mb-2 mx-auto"
        />
        <div className="text-sm font-normal">
          <span className="mb-1 text-sm font-semibold">JAWABAN ANDA BENAR</span>
          <div className="mb-2 text-sm font-normal">
            Silakan lanjutkan ke soal berikutnya.
          </div>
          <button
            onClick={onClose}
            className="bg-white text-green-500 px-4 py-2 rounded-lg"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpJawabanBenar;
