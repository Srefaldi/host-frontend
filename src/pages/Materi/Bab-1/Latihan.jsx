import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import nextIcon from "../../../assets/img/selanjutnya.png";
import IconPetunjuk from "../../../assets/img/informasi.png";
import "../style/latihan.css";

const LatihanBab1 = () => {
  const navigate = useNavigate();
  const { handleQuizComplete } = useOutletContext();
  const { user } = useSelector((state) => state.auth);
  const [showLatihan, setShowLatihan] = useState(false);

  // State untuk instruksi
  const [riwayat, setRiwayat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // State untuk latihan
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(5).fill([""]));
  const [score, setScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(Array(5).fill(null));
  const [hasAnswered, setHasAnswered] = useState(Array(5).fill(false));
  const [timeLeft, setTimeLeft] = useState(10 * 60);

  // Daftar pertanyaan (hanya 5 soal)
  const questions = [
    {
      id: 1,
      prompt:
        'Lengkapi kode berikut untuk menampilkan output "Mari Belajar C#".',
      code: `public class Latihan 
{ 
    public static void Main(string[] args) 
    { 
        Console.WriteLine(_____); 
    } 
}`,
      correctAnswer: ['"Mari Belajar C#"'],
    },
    {
      id: 2,
      prompt: "Lengkapi program C# berikut untuk mencetak angka 10 ke layar.",
      code: `public class Latihan 
{ 
    public static void Main(string[] args) 
    { 
        Console.WriteLine(_____); 
    } 
}`,
      correctAnswer: ["10"],
    },
    {
      id: 3,
      prompt: "Lengkapilah program C# berikut untuk membuat komentar.",
      code: `public class Latihan 
{ 
    public static void Main(string[] args) 
    { 
        _____
        buatlah komentar ini 
        lebih dari satu baris
        _____
    } 
}`,
      correctAnswer: ["/*", "*/"],
    },
    {
      id: 4,
      prompt:
        'Tambahkan baris baru untuk mencetak "Semangat Belajar C#" setelah "Ayo Belajar".',
      code: `public class Latihan 
{ 
    public static void Main(string[] args) 
    { 
        Console.WriteLine("Ayo Belajar"); 
        _____ 
    } 
}`,
      correctAnswer: ['Console.WriteLine("Semangat Belajar C#");'],
    },
    {
      id: 5,
      prompt:
        "Lengkapilah kode program berikut agar mencetak output String “Hello” dan Integer Angka 10.",
      code: `public class Latihan 
{ 
    public static void Main(string[] args) 
    { 
        Console.WriteLine(_____); 
    } 
}`,
      correctAnswer: ['"Hello " + 10'],
    },
  ];

  // Format tanggal untuk riwayat
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

  // Ambil riwayat nilai dari API
  useEffect(() => {
    const fetchRiwayat = async () => {
      if (!user?.uuid) {
        setError("Mohon login ke akun Anda");
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/scores`,
          {
            withCredentials: true,
          }
        );
        console.log("Data scores dari API:", response.data);

        const filteredScores = response.data.scores.filter(
          (score) => score.type === "latihan" && score.chapter === 1
        );
        console.log("Filtered scores (Bab 1):", filteredScores);

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
          error.response?.data?.msg ||
          `Gagal mengambil data riwayat: ${error.message}`;
        console.error("Error fetching scores:", error);
        setError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRiwayat();
  }, [user]);

  // Timer untuk latihan
  useEffect(() => {
    if (showLatihan) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showLatihan]);

  // Fungsi untuk normalisasi jawaban
  const normalizeAnswer = (answer) => {
    return answer.trim().replace(/\s+/g, " ").toLowerCase();
  };

  // Fungsi untuk mengubah jawaban pengguna
  const handleAnswerChange = (value, inputIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = [...newAnswers[currentQuestionIndex]];
    newAnswers[currentQuestionIndex][inputIndex] = value;
    setAnswers(newAnswers);
    console.log("Updated answers:", newAnswers); // Debugging
  };

  // Fungsi untuk mengirim jawaban
  const submitAnswer = () => {
    const userAnswers = answers[currentQuestionIndex];

    if (userAnswers.some((answer) => answer === "")) {
      Swal.fire({
        title: "Soal Belum Dijawab!",
        text: "Silakan isi jawaban sebelum mengirim.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    // Normalisasi jawaban pengguna dan jawaban yang benar
    const normalizedUserAnswers = userAnswers.map((answer) =>
      normalizeAnswer(answer)
    );
    const normalizedCorrectAnswers = questions[
      currentQuestionIndex
    ].correctAnswer.map((answer) => normalizeAnswer(answer));

    // Cek apakah jawaban benar
    const isCorrect = normalizedUserAnswers.every(
      (answer, idx) => answer === normalizedCorrectAnswers[idx]
    );

    // Update skor (setiap soal bernilai 20 poin)
    if (isCorrect) {
      setScore((prevScore) => prevScore + 20);
    }

    const newAnswerStatus = [...answerStatus];
    newAnswerStatus[currentQuestionIndex] = "submitted";
    setAnswerStatus(newAnswerStatus);
    setHasAnswered((prev) => {
      const newHasAnswered = [...prev];
      newHasAnswered[currentQuestionIndex] = true;
      return newHasAnswered;
    });

    Swal.fire({
      title: "Jawaban Terkirim!",
      text: "Silahkan lanjutkan ke soal berikutnya.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      setCurrentQuestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, questions.length - 1)
      );
    });
  };

  // Fungsi untuk memilih soal
  const handleQuestionSelect = (index) => {
    if (hasAnswered[index]) {
      Swal.fire({
        icon: "info",
        title: "Sudah Menjawab",
        text: "Anda sudah menjawab soal ini.",
      });
    } else {
      setCurrentQuestionIndex(index);
      const newAnswers = [...answers];
      newAnswers[index] = index === 2 ? ["", ""] : [""];
      setAnswers(newAnswers);
    }
  };

  // Fungsi untuk menyelesaikan latihan
  const handleFinish = async () => {
    const hasIncompleteAnswers = answers.some((answer) =>
      answer.some((a) => a === "")
    );
    if (hasIncompleteAnswers) {
      Swal.fire({
        title: "Masih Ada Soal Belum Dijawab!",
        text: "Silakan periksa kembali jawaban Anda.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      title: "Konfirmasi Pengiriman",
      text: "Apakah Anda yakin untuk mengirim jawaban Anda?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      confirmButtonColor: "#6E2A7F",
      cancelButtonColor: "#EF4444",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const scorePercentage = (score / (questions.length * 20)) * 100; // Simpan skor sebagai persentase
        const payload = {
          user_id: user.uuid,
          type: "latihan",
          chapter: 1,
          score: scorePercentage,
        };
        console.log("Sending score to backend:", payload);

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_ENDPOINT}/scores`,
            payload,
            { withCredentials: true }
          );
          console.log("Score save response:", response.status, response.data);

          if (scorePercentage >= 75) {
            handleQuizComplete("/materi/bab1/latihan-bab1");
            handleQuizComplete("/materi/bab1/rangkuman-bab1");
          }

          navigate("/materi/bab1/hasil-latihan-bab1", {
            state: { score, totalQuestions: questions.length },
          });
        } catch (error) {
          const errorMsg = error.response
            ? `Error ${error.response.status}: ${
                error.response.data.msg || error.response.data
              }`
            : error.message;
          console.error("Error saving score:", errorMsg);
          Swal.fire({
            title: "Gagal!",
            text: `Terjadi kesalahan saat menyimpan skor: ${errorMsg}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  // Fungsi ketika waktu habis
  const handleTimeUp = async () => {
    const scorePercentage = (score / (questions.length * 20)) * 100;
    console.log("Time up score percentage:", scorePercentage);
    const payload = {
      user_id: user.uuid,
      type: "latihan",
      chapter: 1,
      score: scorePercentage,
    };
    console.log("Sending score to backend (time up):", payload);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/scores`,
        payload,
        { withCredentials: true }
      );
      console.log(
        "Score save response (time up):",
        response.status,
        response.data
      );

      Swal.fire({
        title: "Waktu Habis!",
        text: "Jawaban Anda akan dikirim.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#6E2A7F",
      }).then(() => {
        if (scorePercentage >= 75) {
          handleQuizComplete("/materi/bab1/latihan-bab1");
        }
        navigate("/materi/bab1/hasil-latihan-bab1", {
          state: { score, totalQuestions: questions.length },
        });
      });
    } catch (error) {
      const errorMsg = error.response
        ? `Error ${error.response.status}: ${
            error.response.data.msg || error.response.data
          }`
        : error.message;
      console.error("Error saving score (time up):", errorMsg);
      Swal.fire({
        title: "Gagal!",
        text: `Terjadi kesalahan saat menyimpan skor: ${errorMsg}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Render halaman instruksi
  const renderInstruksi = () => (
    <div className="max-w-4xl p-4 mx-auto bg-white rounded-lg shadow-md sm:p-6 lg:p-8">
      <h1 className="mb-4 text-2xl font-bold text-center">
        BAB 1 - PENDAHULUAN
      </h1>
      <section>
        <h2 className="mb-3 font-semibold text-gray-800">Aturan</h2>
        <p className="mb-3 leading-relaxed">
          Latihan ini bertujuan untuk menguji pengetahuan Anda tentang materi
          pendahuluan pada pemrograman C#.
        </p>
        <p className="mb-3 leading-relaxed">
          Terdapat 5 pertanyaan yang harus dikerjakan dalam latihan ini.
          Beberapa ketentuannya sebagai berikut:
        </p>
        <ul className="mb-3 leading-relaxed list-disc list-inside">
          <li>Syarat nilai kelulusan: 75%</li>
          <li>Durasi ujian: 10 menit</li>
        </ul>
        <p className="mb-6 leading-relaxed">
          Apabila tidak memenuhi syarat kelulusan, maka Anda harus mengulang
          pengerjaan latihan kembali.
        </p>
        <p className="mb-6 leading-relaxed">Selamat Mengerjakan!</p>
        <div className="flex justify-end">
          <button
            onClick={() => setShowLatihan(true)}
            className="flex items-center gap-2 px-6 py-3 text-base text-white transition-all duration-200 rounded-lg shadow-sm hover:shadow-md sm:px-8"
            style={{ backgroundColor: "#6E2A7F" }}
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

      <section className="mt-16">
        <h3 className="pb-1 mb-3 font-semibold text-gray-800 border-b border-gray-300">
          Riwayat
        </h3>
        {isLoading ? (
          <p className="text-gray-600">Memuat riwayat...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : riwayat.length === 0 ? (
          <p className="text-gray-600">Belum ada riwayat</p>
        ) : (
          <div className="overflow-x-auto">
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
          </div>
        )}
      </section>
    </div>
  );

  // Render halaman latihan
  const renderLatihan = () => (
    <div className="max-w-6xl p-4 mx-auto bg-white rounded-lg shadow-lg sm:p-6 lg:p-8">
      <h2 className="text-lg font-semibold text-center text-gray-800">
        LATIHAN BAB 1
      </h2>

      <div
        className="relative p-4 mt-4 border rounded-lg sm:p-6"
        style={{ backgroundColor: "rgba(128, 128, 128, 0.158)" }}
      >
        <h3
          className="flex items-center w-full p-2 text-lg font-semibold border rounded-lg sm:w-80 md:w-96"
          style={{ outline: "2px solid #6E2A7F", outlineOffset: "2px" }}
        >
          <img src={IconPetunjuk} alt="Icon" className="w-6 h-6 mr-2" />
          PETUNJUK MENGERJAKAN
        </h3>
        <ol className="mt-2 text-justify text-gray-600 list-decimal list-inside">
          <li>
            Jawablah soal-soal di bawah ini dengan mengisikannya pada input yang
            tersedia.
          </li>
          <li>
            Tekan tombol{" "}
            <button
              disabled
              style={{
                backgroundColor: "#6E2A7F",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                cursor: "not-allowed",
                opacity: 0.6,
              }}
            >
              Kirim
            </button>{" "}
            untuk mengirim jawaban.
          </li>
          <li>
            Apabila notifikasi berwarna Hijau, jawaban Anda telah terkirim.
          </li>
          <li>
            Tekan tombol{" "}
            <button
              disabled
              style={{
                backgroundColor: "white",
                color: "#6E2A7F",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "2px solid #6E2A7F",
                cursor: "not-allowed",
                opacity: 0.6,
              }}
            >
              Selesai
            </button>{" "}
            untuk mengirim semua jawaban.
          </li>
        </ol>
      </div>

      <div className="flex flex-col mt-6 lg:flex-row lg:items-start">
        <div className="flex flex-col mr-3 lg:mr-6">
          <div className="p-4 mt-5 text-center text-red-600 bg-gray-100 border rounded-lg sm:p-5">
            <h3 className="font-semibold">
              Waktu Tersisa: {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </h3>
          </div>
          <h3 className="mt-8 text-lg font-semibold text-center">SOAL</h3>
          <div className="flex flex-col items-center">
            <div className="flex flex-row justify-center mb-2">
              {questions.map((question, index) => (
                <button
                  key={question.id}
                  onClick={() => handleQuestionSelect(index)}
                  style={{
                    width: "2rem",
                    height: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "0.5rem",
                    margin: "0.125rem",
                    backgroundColor:
                      currentQuestionIndex === index
                        ? "#6E2A7F"
                        : answerStatus[index] === "submitted"
                        ? "#10B981"
                        : "#D1D5DB",
                    color:
                      currentQuestionIndex === index ||
                      answerStatus[index] === "submitted"
                        ? "white"
                        : "black",
                  }}
                  className="sm:w-8 sm:h-8"
                >
                  {question.id}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full p-4 border rounded-lg lg:p-6">
          <h3 className="font-semibold">{`Soal ${questions[currentQuestionIndex].id}`}</h3>
          <p className="text-gray-600">
            {questions[currentQuestionIndex].prompt}
          </p>
          <div className="p-4 mt-2 font-mono text-sm bg-gray-100 rounded-lg">
            <pre className="code-block">
              <code>
                {questions[currentQuestionIndex].code
                  .split("_____")
                  .map((part, index) => (
                    <React.Fragment key={`part-${index}`}>
                      {part.split(" ").map((word, wordIndex) => {
                        if (
                          word.includes("class") ||
                          word.includes("public") ||
                          word.includes("static") ||
                          word.includes("void") ||
                          word.includes("Console")
                        ) {
                          return (
                            <span key={`word-${wordIndex}`} className="keyword">
                              {word}{" "}
                            </span>
                          );
                        } else if (word.includes('"')) {
                          return (
                            <span key={`word-${wordIndex}`} className="string">
                              {word}{" "}
                            </span>
                          );
                        } else if (word.includes("//")) {
                          return (
                            <span key={`word-${wordIndex}`} className="comment">
                              {word}{" "}
                            </span>
                          );
                        }
                        return <span key={`word-${wordIndex}`}>{word} </span>;
                      })}
                      {index <
                        questions[currentQuestionIndex].code.split("_____")
                          .length -
                          1 && (
                        <span>
                          {currentQuestionIndex === 2 ? (
                            <input
                              type="text"
                              key={`input-${index}`}
                              value={answers[currentQuestionIndex][index] || ""}
                              onChange={(e) =>
                                handleAnswerChange(e.target.value, index)
                              }
                              onKeyDown={(e) =>
                                console.log("Key pressed:", e.key)
                              } // Debugging
                              className="w-20 px-2 py-1 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-300 sm:w-24"
                              placeholder="Jawaban..."
                              autoFocus={index === 0}
                            />
                          ) : (
                            <input
                              type="text"
                              key={`input-0`}
                              value={answers[currentQuestionIndex][0] || ""}
                              onChange={(e) =>
                                handleAnswerChange(e.target.value, 0)
                              }
                              onKeyDown={(e) =>
                                console.log("Key pressed:", e.key)
                              } // Debugging
                              className="w-20 px-2 py-1 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-300 sm:w-24"
                              placeholder="Jawaban..."
                              autoFocus
                            />
                          )}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
              </code>
            </pre>
          </div>

          <div className="flex flex-col mt-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <button
              onClick={submitAnswer}
              style={{
                backgroundColor: "#6E2A7F",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#5B1F6A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#6E2A7F")
              }
              className="w-full sm:w-auto"
            >
              Kirim
            </button>
            <button
              onClick={() => {
                const newAnswers = [...answers];
                newAnswers[currentQuestionIndex] =
                  currentQuestionIndex === 2 ? ["", ""] : [""];
                setAnswers(newAnswers);
              }}
              className="w-full px-4 py-2 mt-2 text-white bg-red-500 rounded-lg hover:bg-red-600 sm:w-auto sm:mt-0"
            >
              Hapus Jawaban
            </button>
            <button
              onClick={handleFinish}
              style={{
                backgroundColor: "white",
                color: "#6E2A7F",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                transition: "background-color 0.2s, border-color 0.2s",
                border: "2px solid #6E2A7F",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e0e0e0";
                e.currentTarget.style.borderColor = "#5B1F6A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.borderColor = "#6E2A7F";
              }}
              className="w-full sm:w-auto"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return showLatihan ? renderLatihan() : renderInstruksi();
};

export default LatihanBab1;
