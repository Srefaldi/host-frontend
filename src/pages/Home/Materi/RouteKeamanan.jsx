import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import daftarBab from "./daftarBab.json";

const ProtectedRoute = ({ element, path }) => {
  const { completedLessons, getStartLesson } = useOutletContext();
  const location = useLocation();

  // Ambil semua materi dalam urutan
  const allLessons = daftarBab.flatMap((bab) =>
    bab.subBab.map((sub) => sub.path)
  );

  // Tentukan materi berikutnya yang harus diakses pengguna
  const nextLesson = getStartLesson();

  // Periksa apakah jalur yang diminta dapat diakses
  const isRequestedPathAccessible =
    completedLessons.includes(path) || path === nextLesson;

  // Periksa apakah halaman saat ini (location.pathname) dapat diakses
  const isCurrentPathAccessible =
    completedLessons.includes(location.pathname) ||
    location.pathname === nextLesson;

  console.log(
    "ProtectedRoute: path=",
    path,
    "isRequestedPathAccessible=",
    isRequestedPathAccessible,
    "location.pathname=",
    location.pathname,
    "isCurrentPathAccessible=",
    isCurrentPathAccessible,
    "nextLesson=",
    nextLesson,
    "completedLessons=",
    completedLessons
  );

  // Gunakan useEffect untuk menampilkan notifikasi tanpa memblokir render
  useEffect(() => {
    if (!isRequestedPathAccessible) {
      Swal.fire({
        icon: "warning",
        title: "Akses Dibatasi",
        text: "Silakan pelajari materi secara bertahap dari yang termudah hingga tersulit.",
        confirmButtonText: "OK",
      });
    }
  }, [isRequestedPathAccessible]);

  // Jika jalur yang diminta tidak dapat diakses
  if (!isRequestedPathAccessible) {
    // Jika halaman saat ini dapat diakses, tetap render halaman saat ini
    if (isCurrentPathAccessible) {
      console.log("Halaman saat ini valid, tetap di:", location.pathname);
      return element;
    }
    // Jika halaman saat ini tidak dapat diakses, alihkan ke nextLesson
    console.log("Halaman saat ini tidak valid, mengalihkan ke:", nextLesson);
    return <Navigate to={nextLesson} replace />;
  }

  // Jika jalur yang diminta dapat diakses, render elemen
  console.log("Jalur yang diminta valid, render:", path);
  return element;
};

export default ProtectedRoute;
