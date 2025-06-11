import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import nextIcon from "../../../assets/img/selanjutnya.png";
import IconPetunjuk from "../../../assets/img/informasi.png";
import "../style/latihan.css";

const EvaluasiAkhir = () => {
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();
  const { user } = useSelector((state) => state.auth);
  const [showEvaluasi, setShowEvaluasi] = useState(false);

  const [riwayat, setRiwayat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [kkm, setKkm] = useState(75);

  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState([]);
  const [hasAnswered, setHasAnswered] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [evaluationId, setEvaluationId] = useState(null);

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

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!user?.uuid) {
        console.warn("User UUID tidak tersedia, menunggu autentikasi");
        setError("Silakan login kembali.");
        navigate("/login");
        return;
      }

      setIsLoading(true);
      try {
        const evalResponse = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/evaluations`,
          { withCredentials: true }
        );
        const evaluasiAkhir = evalResponse.data.find(
          (evaluation) => evaluation.type === "evaluasi_akhir"
        );
        if (!evaluasiAkhir) {
          setError("Evaluasi Akhir tidak ditemukan");
          return;
        }
        setEvaluationId(evaluasiAkhir.id);

        const kkmResponse = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/kkm`,
          { withCredentials: true }
        );
        const evaluasiKkm = kkmResponse.data.find(
          (k) => k.evaluation_id === evaluasiAkhir.id
        );
        if (evaluasiKkm) {
          setKkm(evaluasiKkm.kkm);
        }

        const questionsResponse = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/questions/evaluation/${
            evaluasiAkhir.id
          }`,
          { withCredentials: true }
        );
        const fetchedQuestions = questionsResponse.data.questions.map(
          (q, index) => ({
            id: index + 1,
            question: q.question_text || "Pertanyaan tidak tersedia",
            options: [
              q.option_a,
              q.option_b,
              q.option_c,
              q.option_d,
              q.option_e,
            ].filter(Boolean),
            correctAnswer:
              q[`option_${q.correct_answer?.toLowerCase()}`] ||
              q.option_a ||
              "Jawaban tidak tersedia",
          })
        );
        setQuestions(fetchedQuestions);
        setSelectedAnswers(Array(fetchedQuestions.length).fill(""));
        setAnswerStatus(Array(fetchedQuestions.length).fill(null));
        setHasAnswered(Array(fetchedQuestions.length).fill(false));

        const scoresResponse = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/scores`,
          { withCredentials: true }
        );
        const filteredScores = scoresResponse.data.scores.filter(
          (score) => score.type === "evaluasi_akhir"
        );
        const formattedRiwayat = filteredScores.map((score) => ({
          tanggal: formatDate(score.created_at),
          persentase: `${score.score}%`,
          status: score.score >= kkm ? "Lulus" : "Tidak Lulus",
        }));
        setRiwayat(formattedRiwayat);
      } catch (error) {
        const errorMsg =
          error.response?.data?.msg ||
          "Gagal mengambil data. Silakan coba lagi.";
        console.error("Error fetching data:", errorMsg, error);
        setError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.uuid) {
      fetchInitialData();
    }
  }, [user, kkm, navigate]);

  useEffect(() => {
    if (showEvaluasi && timeLeft > 0) {
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
  }, [showEvaluasi, timeLeft]);

  const handleAnswerChange = (answer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const submitAnswer = () => {
    if (questions.length === 0 || !questions[currentQuestionIndex]) return;

    const answer = selectedAnswers[currentQuestionIndex];

    if (answer === "") {
      Swal.fire({
        title: "Soal Belum Dijawab!",
        text: "Silakan pilih jawaban sebelum mengirim.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const isCorrect = answer === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect && !hasAnswered[currentQuestionIndex]) {
      setScore((prev) => prev + 5);
    }

    const newAnswerStatus = [...answerStatus];
    newAnswerStatus[currentQuestionIndex] = "submitted";
    setAnswerStatus(newAnswerStatus);
    setHasAnswered((prev) => {
      const newHasAnswered = [...prev];
      newHasAnswered[currentQuestionIndex] = true;
      return newHasAnswered;
    });

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    }

    // Check if all questions are answered (all buttons are green)
    if (newAnswerStatus.every((status) => status === "submitted")) {
      Swal.fire({
        title: "Semua Soal Telah Terjawab!",
        text: "Silahkan selesaikan evaluasi.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const resetAnswerForCurrentQuestion = () => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = "";
    setSelectedAnswers(newAnswers);
  };

  const handleQuestionSelect = (index) => {
    if (index >= questions.length) return;
    if (hasAnswered[index]) {
      Swal.fire({
        icon: "info",
        title: "Sudah Menjawab",
        text: "Anda sudah menjawab soal ini.",
      });
    } else {
      setCurrentQuestionIndex(index);
    }
  };

  const handleFinish = async () => {
    const hasIncompleteAnswers = selectedAnswers.some(
      (answer) => answer === ""
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

    if (!user?.uuid) {
      Swal.fire({
        title: "Autentikasi Gagal",
        text: "Silakan login kembali.",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => navigate("/login"));
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
        try {
          const scoreToSave = (score / (questions.length * 5)) * 100;
          await axios.post(
            `${import.meta.env.VITE_API_ENDPOINT}/scores`,
            {
              user_id: user.uuid,
              type: "evaluasi_akhir",
              score: scoreToSave,
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (scoreToSave >= kkm) {
            handleLessonComplete("/materi/evaluasi/evaluasi-akhir");
            handleLessonComplete("/materi/evaluasi/kesimpulan");
          }

          navigate("/materi/evaluasi/hasil-evaluasi-akhir", {
            state: {
              score: scoreToSave,
              totalQuestions: questions.length,
              kkm,
            },
          });
        } catch (error) {
          console.error("Error saving score:", error);
          const errorMsg =
            error.response?.data?.msg ||
            "Gagal menyimpan skor. Silakan coba lagi.";
          Swal.fire({
            title: "Gagal Menyimpan Skor",
            text: errorMsg,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const handleTimeUp = async () => {
    try {
      const scoreToSave = (score / (questions.length * 5)) * 100;
      await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/scores`,
        {
          user_id: user.uuid,
          type: "evaluasi_akhir",
          score: scoreToSave,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (scoreToSave >= kkm) {
        handleLessonComplete("/materi/evaluasi/evaluasi-akhir");
        handleLessonComplete("/materi/evaluasi/kesimpulan");
      }

      Swal.fire({
        title: "Waktu Habis!",
        text: "Jawaban Anda akan dikirim.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#6E2A7F",
      }).then(() => {
        navigate("/materi/evaluasi/hasil-evaluasi-akhir", {
          state: { score: scoreToSave, totalQuestions: questions.length, kkm },
        });
      });
    } catch (error) {
      console.error("Error saving score:", error);
      const errorMsg =
        error.response?.data?.msg || "Gagal menyimpan skor. Silakan coba lagi.";
      Swal.fire({
        title: "Gagal Menyimpan Skor",
        text: errorMsg,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const renderInstruksi = () => (
    <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center">EVALUASI AKHIR</h1>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-800">Aturan</h2>
          <p className="mb-3 text-base leading-relaxed">
            Evaluasi ini bertujuan untuk menguji pengetahuan Anda tentang semua
            materi dalam pemrograman C# (Bab 1-6), termasuk variabel, tipe data,
            kontrol alur, dan method.
          </p>
          <p className="mb-3 text-base leading-relaxed">
            Terdapat {questions.length} pertanyaan pilihan ganda yang harus
            dikerjakan dalam evaluasi ini. Beberapa ketentuannya sebagai
            berikut:
          </p>
          <ul className="mb-3 text-base leading-relaxed list-disc list-inside">
            <li>Syarat nilai kelulusan: {kkm}%</li>
            <li>Durasi ujian: 20 menit</li>
          </ul>
          <p className="mb-3 text-base leading-relaxed">
            Apabila tidak memenuhi syarat kelulusan, Anda harus mengulang
            pengerjaan evaluasi kembali.
          </p>
          <p className="mb-6 text-base leading-relaxed">Selamat Mengerjakan!</p>
          <div className="flex justify-end">
            <button
              onClick={() => {
                if (questions.length === 0) {
                  Swal.fire({
                    title: "Gagal Memuat Evaluasi",
                    text:
                      error ||
                      "Soal tidak dapat dimuat. Silakan coba lagi nanti.",
                    icon: "error",
                    confirmButtonText: "OK",
                  });
                  return;
                }
                setShowEvaluasi(true);
              }}
              className="flex items-center w-full gap-2 px-6 py-3 text-base text-white transition-all duration-200 rounded-lg shadow-sm hover:shadow-md sm:w-auto"
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
          <h3 className="pb-1 mb-3 text-lg font-semibold text-gray-800 border-b border-gray-300">
            Riwayat
          </h3>
          {isLoading ? (
            <p className="text-base text-gray-600">Memuat riwayat...</p>
          ) : error ? (
            <p className="text-base text-red-600">{error}</p>
          ) : riwayat.length === 0 ? (
            <p className="text-base text-gray-600">Belum ada riwayat</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-600 text-base min-w-[300px]">
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
                          className={`text-xs font-semibold px-2 py-[2px] rounded ${
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
    </div>
  );

  const renderEvaluasi = () => {
    if (questions.length === 0 || !questions[currentQuestionIndex]) {
      return (
        <div className="max-w-4xl p-4 mx-auto text-center bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">
            EVALUASI AKHIR
          </h2>
          <p className="mt-4 text-base text-red-600">
            {error || "Gagal memuat soal. Silakan coba lagi nanti."}
          </p>
        </div>
      );
    }

    return (
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-center text-gray-800">
            EVALUASI AKHIR
          </h2>

          <div
            className="relative p-4 mt-4 border rounded-lg"
            style={{ backgroundColor: "rgba(128, 128, 128, 0.158)" }}
          >
            <h3
              className="flex items-center w-full p-2 text-lg font-semibold border rounded-lg"
              style={{ outline: "2px solid #6E2A7F", outlineOffset: "2px" }}
            >
              <img src={IconPetunjuk} alt="Icon" className="w-6 h-6 mr-2" />
              PETUNJUK MENGERJAKAN
            </h3>
            <ol className="mt-2 text-base text-justify text-gray-600 list-decimal list-inside">
              <li>
                Jawablah pertanyaan berikut dengan memilih salah satu jawaban
                yang paling tepat.
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
                Apabila tombol soal berwarna Hijau, jawaban Anda telah terkirim.
              </li>
              <li>
                Tekan tombol{" "}
                <button
                  disabled
                  style={{
                    backgroundColor: "white",
                    color: "6E2A7F",
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

          <div className="flex flex-col gap-4 mt-6 lg:flex-row lg:items-start">
            <div className="flex flex-col w-full mr-0 lg:mr-6 lg:w-auto">
              <div className="p-4 mt-5 text-center text-red-600 bg-gray-100 border rounded-lg">
                <h3 className="text-base font-semibold">
                  Waktu Tersisa: {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, "0")}
                </h3>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-center">SOAL</h3>
              <div className="flex flex-row justify-center gap-1">
                {questions.slice(0, 5).map((question, index) => (
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
                    className="w-8 h-8 sm:w-8 sm:h-8"
                  >
                    {question.id}
                  </button>
                ))}
              </div>
              <div className="flex flex-row justify-center gap-1 mt-2">
                {questions.slice(5, 10).map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => handleQuestionSelect(index + 5)}
                    style={{
                      width: "2rem",
                      height: "2rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "0.5rem",
                      margin: "0.125rem",
                      backgroundColor:
                        currentQuestionIndex === index + 5
                          ? "#6E2A7F"
                          : answerStatus[index + 5] === "submitted"
                          ? "#10B981"
                          : "#D1D5DB",
                      color:
                        currentQuestionIndex === index + 5 ||
                        answerStatus[index + 5] === "submitted"
                          ? "white"
                          : "black",
                    }}
                    className="w-8 h-8 sm:w-8 sm:h-8"
                  >
                    {question.id}
                  </button>
                ))}
              </div>
              <div className="flex flex-row justify-center gap-1 mt-2">
                {questions.slice(10, 15).map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => handleQuestionSelect(index + 10)}
                    style={{
                      width: "2rem",
                      height: "2rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "0.5rem",
                      margin: "0.125rem",
                      backgroundColor:
                        currentQuestionIndex === index + 10
                          ? "#6E2A7F"
                          : answerStatus[index + 10] === "submitted"
                          ? "#10B981"
                          : "#D1D5DB",
                      color:
                        currentQuestionIndex === index + 10 ||
                        answerStatus[index + 10] === "submitted"
                          ? "white"
                          : "black",
                    }}
                    className="w-8 h-8 sm:w-8 sm:h-8"
                  >
                    {question.id}
                  </button>
                ))}
              </div>
              <div className="flex flex-row justify-center gap-1 mt-2">
                {questions.slice(15, 20).map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => handleQuestionSelect(index + 15)}
                    style={{
                      width: "2rem",
                      height: "2rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "0.5rem",
                      margin: "0.125rem",
                      backgroundColor:
                        currentQuestionIndex === index + 15
                          ? "#6E2A7F"
                          : answerStatus[index + 15] === "submitted"
                          ? "#10B981"
                          : "#D1D5DB",
                      color:
                        currentQuestionIndex === index + 15 ||
                        answerStatus[index + 15] === "submitted"
                          ? "white"
                          : "black",
                    }}
                    className="w-8 h-8 sm:w-8 sm:h-8"
                  >
                    {question.id}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full p-4 border rounded-lg">
              <h3 className="text-base font-semibold">
                {questions[currentQuestionIndex]?.id &&
                questions[currentQuestionIndex]?.question
                  ? `${questions[currentQuestionIndex].id}. ${questions[currentQuestionIndex].question}`
                  : "Memuat soal..."}
              </h3>
              <div className="mt-2 mb-4">
                {questions[currentQuestionIndex]?.options?.map((option) => (
                  <div key={option} className="mb-2">
                    <label
                      className={`flex items-center cursor-pointer p-3 rounded-lg border-2 transition duration-200 text-base w-full ${
                        selectedAnswers[currentQuestionIndex] === option
                          ? "bg-[#6E2A7F] text-white border-[#6E2A7F]"
                          : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        value={option}
                        checked={
                          selectedAnswers[currentQuestionIndex] === option
                        }
                        onChange={() => handleAnswerChange(option)}
                        className="hidden"
                      />
                      {option}
                    </label>
                  </div>
                )) || <p className="text-base">Memuat opsi...</p>}
                <div className="flex flex-col justify-start mt-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
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
                    className="w-full px-4 py-2 text-base sm:w-auto"
                  >
                    Kirim
                  </button>
                  <button
                    onClick={resetAnswerForCurrentQuestion}
                    className="w-full px-4 py-2 text-base text-white bg-red-500 rounded-lg hover:bg-red-600 sm:w-auto"
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
                    className="w-full px-4 py-2 text-base sm:w-auto"
                  >
                    Selesai
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return showEvaluasi ? renderEvaluasi() : renderInstruksi();
};

export default EvaluasiAkhir;
