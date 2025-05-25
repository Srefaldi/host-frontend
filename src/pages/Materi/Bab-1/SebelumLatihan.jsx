import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import nextIcon from "../../../assets/img/selanjutnya.png";

const SebelumLatihan = () => {
  const [riwayat, setRiwayat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString) => {
    if (!dateString) {
      console.warn("Tanggal tidak tersedia:", dateString);
      return "Tanggal tidak tersedia";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn("Format tanggal tidak valid:", dateString);
      return "Tanggal tidak valid";
    }

    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Ambil data riwayat dari API
  useEffect(() => {
    const fetchRiwayat = async () => {
      if (!user?.uuid) {
        setError("Mohon login ke akun Anda");
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/scores", {
          withCredentials: true,
        });
        console.log("Data scores dari API:", response.data);

        // Filter hanya skor untuk latihan Bab 1
        const filteredScores = response.data.scores.filter(
          (score) => score.type === "latihan" && score.chapter === 1
        );
        console.log("Filtered scores (Bab 1):", filteredScores);

        // Format data untuk tabel
        const formattedRiwayat = filteredScores.map((score) => {
          console.log("Score item:", score);
          return {
            tanggal: formatDate(score.created_at),
            persentase: `${score.score}%`,
            status: score.score >= 75 ? "Lulus" : "Tidak Lulus",
          };
        });
        setRiwayat(formattedRiwayat);
      } catch (error) {
        const errorMsg =
          error.response?.data?.msg || "Gagal mengambil data riwayat";
        console.error("Error fetching scores:", errorMsg);
        setError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRiwayat();
  }, [user]);

  const handleNext = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab1/latihan-bab1");
  };

  return (
    <div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        {/* Bagian Aturan */}
        <h1 className="mb-4 text-2xl font-bold text-center">
          BAB 1 - PENDAHULUAN
        </h1>
        <section>
          <h2 className="font-semibold text-gray-800 mb-3">Aturan</h2>
          <p className="mb-3 leading-relaxed">
            Latihan ini bertujuan untuk menguji pengetahuan Anda tentang materi
            pendahuluan pada pemograman C#.
          </p>
          <p className="mb-3 leading-relaxed">
            Terdapat 10 pertanyaan yang harus dikerjakan dalam Latihan ini.
            Beberapa ketentuannya sebagai berikut:
          </p>
          <ul className="list-disc list-inside mb-3 leading-relaxed">
            <li>Syarat nilai kelulusan: 75%</li>
            <li>Durasi ujian: 20 menit</li>
          </ul>
          <p className="mb-3 leading-relaxed">
            Apabila tidak memenuhi syarat kelulusan, maka Anda harus mengulang
            pengerjaan Latihan kembali.
          </p>
          <p className="mb-6 leading-relaxed">Selamat Mengerjakan!</p>
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 text-base px-6 py-3 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              style={{
                backgroundColor: "#6E2A7F",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#5B1F6A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#6E2A7F")
              }
            >
              <span>MULAI</span>
              <img src={nextIcon} alt="Selanjutnya" className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Bagian Riwayat */}
        <section className="mt-16">
          <h3 className="font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            Riwayat
          </h3>
          {isLoading ? (
            <p className="text-gray-600">Memuat riwayat...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : riwayat.length === 0 ? (
            <p className="text-gray-600">Belum ada riwayat</p>
          ) : (
            <table className="w-full text-left text-gray-600">
              <thead>
                <tr>
                  <th className="pb-2 font-semibold">Tanggal</th>
                  <th className="pb-2 font-semibold">Persentase</th>
                  <th className="pb-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {riwayat.map((item, index) => (
                  <tr key={index}>
                    <td className="pt-2 pb-3">{item.tanggal}</td>
                    <td className="pt-2 pb-3">{item.persentase}</td>
                    <td className="pt-2 pb-3">
                      <span
                        className={`text-[10px] font-semibold px-2 py-[2px] rounded ${
                          item.status === "Lulus"
                            ? "text-green-600 bg-green-100"
                            : "text-red-600 bg-red-100"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
};

export default SebelumLatihan;
