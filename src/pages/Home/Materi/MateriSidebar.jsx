import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import styled from "styled-components";
import ProgressBar from "../../../components/Home/Materi/ProgressBarComponents";
import daftarBab from "./daftarBab.json";
import pendahuluanIcon from "./style/img/pendahuluan.png";
import variabelIcon from "./style/img/variabel.png";
import tipeDataIcon from "./style/img/tipedata.png";
import operatorIcon from "./style/img/operator.png";
import kontrolAlurIcon from "./style/img/kontrol.png";
import methodIcon from "./style/img/method.png";
import lockIcon from "./style/img/lock.png";
import unlockIcon from "./style/img/unlock.png";
import evaluasi from "./style/img/evaluasi.png";
import { HiX } from "react-icons/hi";

const SidebarContainer = styled.div`
  overflow-y: auto;
  height: calc(100vh - 80px);
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const ScrollableList = styled.ul`
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const MateriSidebar = ({
  completedLessons,
  progress,
  toggleSidebar,
  handleStartLearningAgain,
}) => {
  const [openBab, setOpenBab] = useState(null);
  const location = useLocation();

  useEffect(() => {
    console.log("MateriSidebar - Progress:", progress);
    console.log("MateriSidebar - Completed Lessons:", completedLessons);
    const currentPath = location.pathname;
    const activeBab = daftarBab.find((bab) =>
      bab.subBab.some((sub) => sub.path === currentPath)
    );

    if (activeBab) {
      setOpenBab(activeBab.id);
    } else {
      setOpenBab(null);
    }
  }, [location.pathname, completedLessons, progress]);

  const handleToggleDropdown = (babId) => {
    setOpenBab(openBab === babId ? null : babId);
  };

  const iconMap = {
    pendahuluanIcon,
    variabelIcon,
    tipeDataIcon,
    operatorIcon,
    kontrolAlurIcon,
    methodIcon,
    evaluasi,
  };

  return (
    <SidebarContainer className="relative p-3 text-gray-900 bg-white sm:p-4 max-w-80 md:max-w-80">
      <button
        className="absolute z-50 p-2 text-white bg-gray-500 rounded-lg md:hidden top-4 right-4 "
        style={{ padding: "8px", width: "40px" }}
        onClick={toggleSidebar}
      >
        <HiX size={24} />
      </button>
      <h2 className="mb-4 text-lg font-bold text-center sm:text-xl">
        DAFTAR MATERI
      </h2>
      <ProgressBar progress={progress} />

      <ul className="mt-4 space-y-2">
        {daftarBab.map((bab) => (
          <li key={bab.id}>
            <button
              onClick={() => handleToggleDropdown(bab.id)}
              className="flex items-center justify-between w-full p-3 text-sm text-left transition duration-200 rounded sm:p-4 sm:text-base"
              style={{
                backgroundColor: "#68217A",
                color: "white",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#4A5B6D")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#68217A")
              }
            >
              <span>
                <img
                  src={iconMap[bab.icon]}
                  alt={bab.judul}
                  className="inline-block w-6 h-6 mr-2 sm:w-8 sm:h-8"
                />
                {bab.judul}
              </span>
              <span>{openBab === bab.id ? "▲" : "▼"}</span>
            </button>
            <ScrollableList
              className={classNames("pl-4 transition-all duration-300", {
                "max-h-[200px] sm:max-h-[300px] overflow-y-auto":
                  openBab === bab.id,
                "max-h-0 overflow-hidden": openBab !== bab.id,
              })}
            >
              {bab.subBab.map((sub, index) => (
                <li key={index} className="flex items-center justify-between">
                  <Link
                    to={sub.path}
                    className={`text-gray-900 block p-1.5 sm:p-2 hover:bg-gray-300 rounded text-sm sm:text-base ${
                      completedLessons.includes(sub.path)
                        ? ""
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={(e) => {
                      if (!completedLessons.includes(sub.path)) {
                        e.preventDefault();
                      } else {
                        window.scrollTo(0, 0);
                      }
                    }}
                  >
                    {sub.label}
                  </Link>
                  <img
                    src={
                      completedLessons.includes(sub.path)
                        ? unlockIcon
                        : lockIcon
                    }
                    alt={
                      completedLessons.includes(sub.path)
                        ? "Unlocked"
                        : "Locked"
                    }
                    className="w-4 h-4 mb-5 sm:w-5 sm:h-5"
                  />
                </li>
              ))}
            </ScrollableList>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link
          to="/dashboard"
          className="block text-center bg-[#68217A] text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-full hover:bg-[#4A5B6D] transition text-sm sm:text-base"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </SidebarContainer>
  );
};

export default MateriSidebar;
