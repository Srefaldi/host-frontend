import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Untuk animasi
import { HiArrowLeft } from "react-icons/hi"; // Ikon untuk tombol
import confetti from "canvas-confetti"; // Untuk efek konfeti

const Penutup = () => {
  const navigate = useNavigate();

  // Efek konfeti saat komponen dimuat
  React.useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#68217A", "#4A5B6D", "#FFFFFF"],
    });
  }, []);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  // Animasi untuk konten
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 4px 15px rgba(104, 33, 122, 0.3)" },
    tap: { scale: 0.95 },
  };

  return (
    <div className="bg-gradient-to-b from-purple-100 to-white font-['Roboto'] flex flex-col items-center justify-center p-4 sm:p-6 min-h-screen">
      <motion.div
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h1 className="text-lg font-bold tracking-wide text-purple-700 sm:text-xl">
          EVALUASI
        </h1>
        <p className="mt-2 text-sm font-medium text-gray-700 sm:text-base">
          DASAR - DASAR PEMROGRAMAN C#
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-md mt-8 overflow-hidden bg-white border border-purple-200 rounded-lg shadow-lg"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ delay: 0.2 }}
      >
        <div className="py-3 text-sm font-semibold text-center text-white bg-purple-700 sm:text-base">
          HASIL EVALUASI
        </div>
        <div className="flex flex-col items-center p-6 sm:p-8">
          <motion.img
            alt="Illustration of a graduate celebrating"
            className="object-contain w-40 h-40 sm:w-48 sm:h-48"
            src="https://storage.googleapis.com/a1aa/image/be622aef-8623-4d8d-025f-7c590deeba32.jpg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <h2 className="mt-4 text-lg font-bold text-purple-700 sm:text-xl">
            SELAMAT!
          </h2>
          <p className="max-w-xs mt-2 text-sm leading-relaxed text-center text-gray-800 sm:text-base">
            Kamu telah menyelesaikan semua pembelajaran pada media ini dengan
            sukses!
          </p>
        </div>
      </motion.div>

      <motion.button
        className="flex items-center justify-center gap-2 px-6 py-3 mt-8 text-sm font-semibold text-white transition-colors bg-purple-700 rounded-full sm:text-base hover:bg-purple-800"
        onClick={handleBackToDashboard}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <HiArrowLeft size={20} />
        KEMBALI KE DASHBOARD
      </motion.button>
    </div>
  );
};

export default Penutup;
