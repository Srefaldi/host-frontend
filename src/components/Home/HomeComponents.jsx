import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      {/* Laporan Progres Belajar */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-xl font-bold mb-2">Laporan Progres Belajar</h2>
        <p className="text-gray-600">Progres Anda saat ini: 75% selesai</p>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
          <div className="bg-blue-500 h-4 rounded-full" style={{ width: "75%" }}></div>
        </div>
      </div>

      {/* Tombol Navigasi */}
      <div className="grid grid-cols-2 gap-4">
        {/* Tombol Lanjut Materi */}
        <button
  className="bg-green-500 text-white py-6 text-lg font-semibold rounded-2xl shadow-md hover:bg-green-600"
  onClick={() => navigate("/materi")}
>
  Materi
</button>

        {/* Tombol Compiler */}
        <button
          className="bg-blue-500 text-white py-6 text-lg font-semibold rounded-2xl shadow-md hover:bg-blue-600"
          onClick={() => navigate("/complier")}
        >
          Buka Compiler
        </button>
      </div>
    </div>
  );
};

export default Home;