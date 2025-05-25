import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../../features/authSlice";
import Navbar from "../Landing/Navbar";
import Footer from "../Landing/Footer";
import loginImage from "../../assets/img/hero-login.png";
import Swal from "sweetalert2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [nis, setNis] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // Tampilkan alert saat login berhasil
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Login Berhasil!",
        text: message || "Selamat datang! Anda berhasil masuk.",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/dashboard");
      });
    }

    // Tampilkan alert saat login gagal
    if (isError) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: message || "Terjadi kesalahan. Silakan coba lagi.",
        showConfirmButton: true,
      });
    }

    // Reset state setelah login
    dispatch(reset());
  }, [isSuccess, isError, message, dispatch, navigate, user]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ nis, password }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">
          <div className="items-center justify-center hidden md:flex md:flex-1">
            <img
              alt="Illustration"
              className="h-auto max-w-full"
              src={loginImage}
            />
          </div>
          <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold mb-10 text-[#68217A]">
              MASUK SISWA
            </h1>
            <p className="mb-3 text-gray-600">
              Silahkan masuk dengan akun yang telah terdaftar ...
            </p>
            <form onSubmit={Auth}>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="NIS"
                  value={nis}
                  onChange={(e) => setNis(e.target.value)}
                  required
                />
              </div>
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute mt-3 text-gray-600 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </span>
              </div>
              <button
                type="submit"
                style={{ backgroundColor: "#68217A" }}
                className="w-full py-2 text-white rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isLoading}
              >
                {isLoading ? "Memuat..." : "MASUK"}
              </button>
            </form>
            <p className="mt-4 text-gray-600">
              Belum punya akun?{" "}
              <a href="/daftar-siswa" className="text-purple-500">
                DAFTAR
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
