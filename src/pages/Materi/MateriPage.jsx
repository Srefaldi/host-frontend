import React from "react";
import { Link } from "react-router-dom";

const MateriPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Daftar Materi C#</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bab 1 */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold">Bab 1: Pengenalan C#</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/materi/bab1/pengenalan" className="text-blue-500 hover:underline">
                📌 Pengenalan C#
              </Link>
            </li>
            <li>
              <Link to="/materi/bab1/instalasi" className="text-blue-500 hover:underline">
                🛠 Instalasi dan Setup
              </Link>
            </li>
          </ul>
        </div>

        {/* Bab 2 */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold">Bab 2: Variabel & Tipe Data</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/materi/bab2/tipedata" className="text-blue-500 hover:underline">
                🔢 Tipe Data
              </Link>
            </li>
            <li>
              <Link to="/materi/bab2/variabel" className="text-blue-500 hover:underline">
                📌 Variabel
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MateriPage;
