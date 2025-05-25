import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterGuru, reset } from "../../../features/authSlice";
import Navbar from "../../Landing/Navbar";
import Footer from "../../Landing/Footer";
import loginImage from "../../../assets/img/daftarfoto.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";

const RegisterGuruu = () => {
  const [fullName, setFullName] = useState("");
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [school, setSchool] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    // Tampilkan alert saat pendaftaran berhasil
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil!",
        text: message || "Akun guru Anda berhasil dibuat. Silakan login.",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/login-guru");
      });
    }

    // Tampilkan alert saat pendaftaran gagal
    if (isError) {
      Swal.fire({
        icon: "error",
        title: "Pendaftaran Gagal",
        text: message || "Terjadi kesalahan. Silakan coba lagi.",
        showConfirmButton: true,
      });
    }

    // Reset state setelah pendaftaran
    dispatch(reset());
  }, [isSuccess, isError, message, dispatch, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Kata sandi dan konfirmasi kata sandi tidak cocok");
      return;
    }
    setPasswordError("");
    dispatch(
      RegisterGuru({
        fullName,
        nip,
        password,
        school,
      })
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center flex-1 mt-6 mb-5">
        <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">
          <div className="items-center justify-center hidden md:flex md:flex-1">
            <img
              alt="Illustration"
              className="h-auto max-w-[300px]"
              src={loginImage}
            />
          </div>
          <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold mb-10 text-[#68217A]">
              DAFTAR GURU
            </h1>
            <p className="mb-3 text-gray-600">
              Silahkan daftar untuk membuat akun guru ...
            </p>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Nama Lengkap"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="NIP"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-4 mb-4 md:flex-row">
                <div className="relative flex-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Kata Sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="absolute mt-2 text-gray-600 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </span>
                </div>
                <div className="relative flex-1">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Konfirmasi Kata Sandi"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span
                    className="absolute mt-2 text-gray-600 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Asal Sekolah"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                style={{ backgroundColor: "#68217A" }}
                className="w-full py-2 text-white rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isLoading}
              >
                {isLoading ? "Memuat..." : "DAFTAR"}
              </button>
            </form>
            <p className="mt-4 text-gray-600">
              Sudah punya akun?{" "}
              <a href="/login-guru" className="text-purple-500">
                MASUK
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterGuruu;
