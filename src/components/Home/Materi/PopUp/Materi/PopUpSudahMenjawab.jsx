import React from "react";
import ErrorIcon from "../../../../../assets/img/salah.png";

const PopUpSudahMenjawab = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="p-6 text-center text-white bg-red-500 rounded-lg shadow-lg w-96">
        <img
          src={ErrorIcon}
          alt="Error icon"
          className="w-10 h-10 mx-auto mb-2"
        />
        <div className="text-sm font-normal">
          <span className="mb-1 text-sm font-semibold">
            ANDA SUDAH MENJAWAB SOAL INI
          </span>
          <div className="mb-2 text-sm font-normal">
            Silakan lanjutkan kesoal berikutnya.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-red-500 bg-white rounded-lg"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpSudahMenjawab;
