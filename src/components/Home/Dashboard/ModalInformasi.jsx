import React, { useState } from "react";

const ModalInformasi = ({ isOpen, toggleModal }) => {
  const [isAtribusiOpen, setIsAtribusiOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      id="timeline-modal"
      className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-3xl mx-auto">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-sm max-h-[80vh] overflow-y-auto">
          {/* Modal header */}
          <div className="text-center flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">INFORMASI</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
              onClick={toggleModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5">
            {/* Sub-dropdown: Petunjuk Penggunaan */}
            <div className="mb-4">
              <button
                onClick={() => setIsAtribusiOpen(!isAtribusiOpen)}
                className="w-full text-left font-semibold text-gray-900 flex items-center justify-between"
              >
                <span>Petunjuk Penggunaan</span>
                <span>{isAtribusiOpen ? "▼" : "▲"}</span>
              </button>
              {isAtribusiOpen && (
                <div className="border border-gray-200 rounded-md p-2 mt-2">
                  <p>Petunjuk penggunaan media :</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>1. Baca materi dengan seksama.</li>
                    <li>2. Ikuti langkah-langkah yang diberikan.</li>
                    <li>3. Praktikkan setiap contoh yang ada.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInformasi;
