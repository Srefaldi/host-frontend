import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Materi = () => {
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentSubtopic, setCurrentSubtopic] = useState(0);

  const chapters = [
    {
      title: "Bab 1: Pendahuluan",
      subtopics: [
        { title: "Pengertian C#", content: "C# adalah bahasa pemrograman yang dikembangkan oleh Microsoft..." },
        { title: "Sejarah C#", content: "C# pertama kali diperkenalkan oleh Microsoft pada tahun 2000..." },
      ],
    },
    {
      title: "Bab 2: Dasar-Dasar Pemrograman",
      subtopics: [
        { title: "Variabel dan Tipe Data", content: "C# memiliki berbagai tipe data seperti int, double, string..." },
        { title: "Operator", content: "Operator dalam C# digunakan untuk melakukan operasi matematika..." },
      ],
    },
  ];

  const selectedContent = chapters[currentChapter].subtopics[currentSubtopic].content;

  const handleNext = () => {
    if (currentSubtopic < chapters[currentChapter].subtopics.length - 1) {
      setCurrentSubtopic(currentSubtopic + 1);
    } else if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setCurrentSubtopic(0);
    }
  };

  const handlePrevious = () => {
    if (currentSubtopic > 0) {
      setCurrentSubtopic(currentSubtopic - 1);
    } else if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      setCurrentSubtopic(chapters[currentChapter - 1].subtopics.length - 1);
    }
  };

  return (
    <div className="relative flex">
      {/* Sidebar tetap di kiri */}
      <div className="fixed left-0 top-0 h-full w-1/4 bg-gray-100 p-6 overflow-auto shadow-md">
        <h2 className="text-xl font-bold mb-4">Daftar Materi</h2>
        {chapters.map((chapter, index) => (
          <div key={index}>
            <button
              className={`w-full text-left font-semibold py-2 px-4 rounded-md mb-2 ${
                index === currentChapter ? "bg-gray-300" : "bg-gray-200"
              }`}
              onClick={() => {
                setCurrentChapter(index);
                setCurrentSubtopic(0);
              }}
            >
              {chapter.title}
            </button>
            {index === currentChapter && (
              <div className="pl-4">
                {chapter.subtopics.map((sub, subIndex) => (
                  <button
                    key={subIndex}
                    className={`block w-full text-left py-1 px-4 rounded-md ${
                      subIndex === currentSubtopic ? "bg-blue-300" : "hover:bg-gray-300"
                    }`}
                    onClick={() => setCurrentSubtopic(subIndex)}
                  >
                    {sub.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Konten utama digeser ke kanan */}
      <div className="ml-[25%] w-3/4 p-6">
        <h2 className="text-2xl font-bold mb-4">{chapters[currentChapter].subtopics[currentSubtopic].title}</h2>
        <p className="text-gray-700 bg-white p-4 rounded-lg shadow-md">{selectedContent}</p>

        {/* Tombol Navigasi */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 disabled:bg-gray-300"
            onClick={handlePrevious}
            disabled={currentChapter === 0 && currentSubtopic === 0}
          >
            Kembali
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
            onClick={handleNext}
            disabled={currentChapter === chapters.length - 1 && currentSubtopic === chapters[currentChapter].subtopics.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Materi;
