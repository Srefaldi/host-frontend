import React from "react";
import ErrorIcon from "../../../../../assets/img/salah.png";

const PopUpJawabanSalah = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-red-500 text-white text-center rounded-lg p-6 shadow-lg w-96">
        <img
          src={ErrorIcon}
          alt="Error icon"
          className="w-10 h-10 mb-2 mx-auto"
        />
        <div className="text-sm font-normal">
          <span className="mb-1 text-sm font-semibold">
            JAWABAN ANDA SALAH!
          </span>
          <div className="mb-2 text-sm font-normal">
            Silakan baca kembali materi dan coba lagi.
          </div>
          <button
            onClick={onClose}
            className="bg-white text-red-500 px-4 py-2 rounded-lg"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpJawabanSalah;
