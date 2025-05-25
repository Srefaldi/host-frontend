import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import nextIcon from "../../../assets/img/selanjutnya.png";
import IconPetunjuk from "../../../assets/img/informasi.png";
import "../style/latihan.css";

const KuisBab3 = () => {
  const navigate = useNavigate();
  const { handleLessonComplete } = useOutletContext();
  const { user } = useSelector((state) => state.auth);
  const [showKuis, setShowKuis] = useState(false);

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
        return;
      }

      setIsLoading(true);
      try {
        const evalResponse = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/evaluations`,
          {
            withCredentials: true,
          }
        );
        const bab3Evaluation = evalResponse.data.find(
          (evaluation) => evaluation.type === "bab" && evaluation.chapter === 3
        );
        if (!bab3Evaluation) {
          setError("Evaluasi untuk Bab 3 tidak ditemukan");
          return;
        }
        setEvaluationId(bab3Evaluation.id);

        const kkmResponse = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/kkm`,
          {
            withCredentials: true,
          }
        );
        const bab3Kkm = kkmResponse.data.find(
          (k) => k.evaluation_id === bab3Evaluation.id
        );
        if (bab3Kkm) {
          setKkm(bab3Kkm.kkm);
        }

        const questionsResponse = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/questions/evaluation/${
            bab3Evaluation.id
          }`,
          { withCredentials: true }
        );
        const fetchedQuestions = questionsResponse.data.questions.map(
          (q, index) => ({
            id: index + 1,
            question: q.question_text,
            options: [
              q.option_a,
              q.option_b,
              q.option_c,
              q.option_d,
              q.option_e,
            ].filter(Boolean),
            correctAnswer: q[`option_${q.correct_answer.toLowerCase()}`],
          })
        );
        setQuestions(fetchedQuestions);
        setSelectedAnswers(Array(fetchedQuestions.length).fill(""));
        setAnswerStatus(Array(fetchedQuestions.length).fill(null));
        setHasAnswered(Array(fetchedQuestions.length).fill(false));
        console.log("Questions loaded:", fetchedQuestions);

        const scoresResponse = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/scores`,
          {
            withCredentials: true,
          }
        );
        const filteredScores = scoresResponse.data.scores.filter(
          (score) => score.type === "evaluasi" && score.chapter === 3
        );
        const formattedRiwayat = filteredScores.map((score) => ({
          tanggal: formatDate(score.created_at),
          persentase: `${score.score}%`,
          status: score.score >= kkm ? "Lulus" : "Tidak Lulus",
        }));
        setRiwayat(formattedRiwayat);
        console.log("Riwayat skor:", formattedRiwayat);
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
  }, [user, kkm]);

  useEffect(() => {
    if (showKuis && timeLeft > 0) {
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
  }, [showKuis, timeLeft]);

  const handleAnswerChange = (answer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const submitAnswer = () => {
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
      setScore((prev) => prev + 10);
    }
    console.log(
      `Question ${currentQuestionIndex + 1}: Selected=${answer}, Correct=${
        questions[currentQuestionIndex].correctAnswer
      }, Score=${
        score + (isCorrect && !hasAnswered[currentQuestionIndex] ? 10 : 0)
      }`
    );

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
      text: "Silakan lanjut ke soal berikutnya.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      }
    });
  };

  const resetAnswerForCurrentQuestion = () => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = "";
    setSelectedAnswers(newAnswers);
  };

  const handleQuestionSelect = (index) => {
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
          const scoreToSave = (score / (questions.length * 10)) * 100; // Convert to percentage
          console.log("Saving score:", {
            user_id: user.uuid,
            type: "evaluasi",
            chapter: 3,
            score: scoreToSave,
          });
          const response = await axios.post(
            `${import.meta.env.VITE_API_ENDPOINT}/scores`,
            {
              user_id: user.uuid,
              type: "evaluasi",
              chapter: 3,
              score: scoreToSave,
            },
            { withCredentials: true }
          );
          console.log("Score save response:", response.data);

          if (scoreToSave >= kkm) {
            handleLessonComplete("/materi/bab3/kuis-bab3");
            handleLessonComplete("/materi/bab3/rangkuman-bab3");
          }

          navigate("/materi/bab3/hasil-kuis-bab3", {
            state: {
              score: scoreToSave,
              totalQuestions: questions.length,
              kkm,
            },
          });
        } catch (error) {
          console.error("Error saving score:", error.response?.data || error);
          Swal.fire({
            title: "Gagal!",
            text:
              error.response?.data?.msg ||
              "Terjadi kesalahan saat menyimpan skor.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const handleTimeUp = async () => {
    try {
      const scoreToSave = (score / (questions.length * 10)) * 100; // Convert to percentage
      console.log("Saving score on time up:", {
        user_id: user.uuid,
        type: "evaluasi",
        chapter: 3,
        score: scoreToSave,
      });
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/scores`,
        {
          user_id: user.uuid,
          type: "evaluasi",
          chapter: 3,
          score: scoreToSave,
        },
        { withCredentials: true }
      );
      console.log("Score save response (time up):", response.data);

      if (scoreToSave >= kkm) {
        handleLessonComplete("/materi/bab3/kuis-bab3");
        handleLessonComplete("/materi/bab3/rangkuman-bab3");
      }

      Swal.fire({
        title: "Waktu Habis!",
        text: "Jawaban Anda akan dikirim.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#6E2A7F",
      }).then(() => {
        navigate("/materi/bab3/hasil-kuis-bab3", {
          state: { score: scoreToSave, totalQuestions: questions.length, kkm },
        });
      });
    } catch (error) {
      console.error(
        "Error saving score (time up):",
        error.response?.data || error
      );
      Swal.fire({
        title: "Gagal!",
        text:
          error.response?.data?.msg || "Terjadi kesalahan saat menyimpan skor.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const renderInstruksi = () => (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="p-2 sm:p-4 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-xl sm:text-2xl font-bold text-center">
          BAB 3 - TIPE DATA
        </h1>
        <section>
          <h2 className="mb-3 font-semibold text-gray-800 text-base sm:text-lg">
            Aturan
          </h2>
          <p className="mb-3 leading-relaxed text-sm sm:text-base">
            Kuis ini bertujuan untuk menguji pengetahuan Anda tentang operator
            dalam pemrograman C#.
          </p>
          <p className="mb-3 leading-relaxed text-sm sm:text-base">
            Terdapat {questions.length} pertanyaan pilihan ganda yang harus
            dikerjakan dalam kuis ini. Beberapa ketentuannya sebagai berikut:
          </p>
          <ul className="mb-3 leading-relaxed list-disc list-inside text-sm sm:text-base">
            <li>Syarat nilai kelulusan: {kkm}%</li>
            <li>Durasi ujian: 20 menit</li>
          </ul>
          <p className="mb-3 leading-relaxed text-sm sm:text-base">
            Apabila tidak memenuhi syarat kelulusan, Anda harus mengulang
            pengerjaan kuis kembali.
          </p>
          <p className="mb-6 leading-relaxed text-sm sm:text-base">
            Selamat Mengerjakan!
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => {
                if (questions.length === 0) {
                  Swal.fire({
                    title: "Gagal Memuat Kuis",
                    text:
                      error ||
                      "Soal tidak dapat dimuat. Silakan coba lagi nanti.",
                    icon: "error",
                    confirmButtonText: "OK",
                  });
                  return;
                }
                setShowKuis(true);
              }}
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
              <img
                src={nextIcon}
                alt="Selanjutnya"
                className="w-4 sm:w-5 h-4 sm:h-5"
              />
            </button>
          </div>
        </section>

        <section className="mt-8 sm:mt-16">
          <h3 className="pb-1 mb-3 font-semibold text-gray-800 border-b border-gray-300 text-base sm:text-lg">
            Riwayat
          </h3>
          {isLoading ? (
            <p className="text-gray-600 text-sm sm:text-base">
              Memuat riwayat...
            </p>
          ) : error ? (
            <p className="text-red-600 text-sm sm:text-base">{error}</p>
          ) : riwayat.length === 0 ? (
            <p className="text-gray-600 text-sm sm:text-base">
              Belum ada riwayat
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-600 text-sm sm:text-base">
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
                          className={`text-[10px] sm:text-xs font-semibold px-2 py-[2px] rounded ${
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

  const renderKuis = () => {
    if (questions.length === 0 || !questions[currentQuestionIndex]) {
      return (
        <div className="mx-auto max-w-4xl p-2 sm:p-4 text-center bg-white rounded-lg shadow-md">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            KUIS BAB 3
          </h2>
          <p className="mt-4 text-red-600 text-sm sm:text-base">
            {error || "Gagal memuat soal. Silakan coba lagi nanti."}
          </p>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="p-2 sm:p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-base sm:text-lg font-semibold text-center text-gray-800">
            KUIS BAB 3
          </h2>

          <div
            className="relative p-2 sm:p-4 mt-4 border rounded-lg"
            style={{ backgroundColor: "rgba(128, 128, 128, 0.158)" }}
          >
            <h3
              className="flex items-center p-2 text-base sm:text-lg font-semibold border rounded-lg w-full sm:w-80 md:w-96"
              style={{ outline: "2px solid #6E2A7F", outlineOffset: "2px" }}
            >
              <img
                src={IconPetunjuk}
                alt="Icon"
                className="w-5 sm:w-6 h-5 sm:h-6 mr-2"
              />
              PETUNJUK MENGERJAKAN
            </h3>
            <ol className="mt-2 text-justify text-gray-600 list-decimal list-inside text-sm sm:text-base">
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

          <div className="flex flex-col lg:flex-row mt-6 gap-2 sm:gap-4 lg:items-start">
            <div className="flex flex-col mr-0 lg:mr-6 w-full lg:w-auto">
              <div className="p-2 sm:p-4 mt-2 sm:mt-5 text-center text-red-600 bg-gray-100 border rounded-lg">
                <h3 className="font-semibold text-sm sm:text-base">
                  Waktu Tersisa: {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, "0")}
                </h3>
              </div>
              <h3 className="mt-4 sm:mt-8 text-base sm:text-lg font-semibold text-center">
                SOAL
              </h3>
              <div className="flex flex-row gap-1 justify-center">
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
              <div className="flex flex-row gap-1 justify-center mt-2">
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
            </div>

            <div className="w-full p-2 sm:p-4 border rounded-lg">
              <h3 className="font-semibold text-sm sm:text-base">{`${questions[currentQuestionIndex].id}. ${questions[currentQuestionIndex].question}`}</h3>
              <div className="mt-2 mb-4">
                {questions[currentQuestionIndex].options.map((option) => (
                  <div key={option} className="mb-2">
                    <label
                      className={`flex items-center cursor-pointer p-2 sm:p-3 rounded-lg border-2 transition duration-200 text-sm sm:text-base ${
                        selectedAnswers[currentQuestionIndex] === option
                          ? "bg-[#6E2A7F] text-white border-[#6E2A7F]"
                          : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
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
                ))}
                <div className="flex flex-col mt-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 justify-start">
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
                    onClick={resetAnswerForCurrentQuestion}
                    className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 sm:w-auto"
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
        </div>
      </div>
    );
  };

  return showKuis ? renderKuis() : renderInstruksi();
};

export default KuisBab3;
