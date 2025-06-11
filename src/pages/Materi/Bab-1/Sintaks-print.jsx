import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Quiz from "./Quiz-bab1/Quiz5";
import nextIcon from "../../../assets/img/selanjutnya.png";
import backIcon from "../../../assets/img/kembali.png";
import lockIcon from "../../../assets/img/lock.png";

// Material page for "Sintaks Print"
const SintaksPrint = () => {
  const navigate = useNavigate();
  const [mainCode, setMainCode] = useState(
    `Console.WriteLine("Hello World!");`
  );
  const [mainOutput, setMainOutput] = useState("");
  const [numericCode, setNumericCode] = useState(
    `Console.WriteLine(1);\nConsole.WriteLine(7.5);`
  );
  const [numericOutput, setNumericOutput] = useState("");
  const [stringConcatCode, setStringConcatCode] = useState(
    `Console.WriteLine("Hello " + "Hello");`
  );
  const [stringConcatOutput, setStringConcatOutput] = useState("");
  const [stringAndNumberCode, setStringAndNumberCode] = useState(
    `Console.WriteLine("Hello " + 10);`
  );
  const [stringAndNumberOutput, setStringAndNumberOutput] = useState("");
  const [numberAndNumberCode, setNumberAndNumberCode] = useState(
    `Console.WriteLine(10 + 10);`
  );
  const [numberAndNumberOutput, setNumberAndNumberOutput] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { handleLessonComplete } = useOutletContext();

  // Navigate to previous lesson
  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate("/materi/bab1/struktur-eksekusi");
  };

  // Navigate to next lesson
  const handleNext = () => {
    handleLessonComplete("/materi/bab1/sintaks-print");
    window.scrollTo(0, 0);
    navigate("/materi/bab1/sintaks-komentar");
  };

  // Run main code
  const handleRunMain = () => {
    const trimmedCode = mainCode.trim();
    if (
      trimmedCode.startsWith("Console.WriteLine(") &&
      trimmedCode.endsWith('");')
    ) {
      const outputText = trimmedCode.slice(
        trimmedCode.indexOf('"') + 1,
        trimmedCode.lastIndexOf('"')
      );
      setMainOutput(outputText);
    } else {
      setMainOutput(
        "Format kode tidak valid. Pastikan menggunakan Console.WriteLine()."
      );
    }
  };

  // Run numeric code
  const handleRunNumeric = () => {
    const trimmedCode = numericCode.trim();
    const lines = trimmedCode.split("\n");
    const outputLines = lines.map((line) => {
      if (line.startsWith("Console.WriteLine(") && line.endsWith(");")) {
        const number = line.slice(line.indexOf("(") + 1, line.lastIndexOf(")"));
        return number;
      }
      return "Format kode tidak valid.";
    });
    setNumericOutput(outputLines.join("\n"));
  };

  // Run string concatenation code
  const handleRunStringConcat = () => {
    const trimmedCode = stringConcatCode.trim();
    if (
      trimmedCode.startsWith("Console.WriteLine(") &&
      trimmedCode.endsWith(");")
    ) {
      const outputText = trimmedCode.slice(
        trimmedCode.indexOf('"') + 1,
        trimmedCode.lastIndexOf('"')
      );
      setStringConcatOutput(outputText.replace(/" \+ "/g, ""));
    } else {
      setStringConcatOutput(
        "Format kode tidak valid. Pastikan menggunakan Console.WriteLine()."
      );
    }
  };

  // Run string and number code
  const handleRunStringAndNumber = () => {
    const trimmedCode = stringAndNumberCode.trim();
    if (
      trimmedCode.startsWith("Console.WriteLine(") &&
      trimmedCode.endsWith(");")
    ) {
      const outputText = trimmedCode.slice(
        trimmedCode.indexOf('"') + 1,
        trimmedCode.lastIndexOf('"')
      );
      const number = trimmedCode.match(/\d+/);
      setStringAndNumberOutput(
        number ? `${outputText}${number[0]}` : "Format kode tidak valid."
      );
    } else {
      setStringAndNumberOutput(
        "Format kode tidak valid. Pastikan menggunakan Console.WriteLine()."
      );
    }
  };

  // Run number and number code (safer parsing instead of eval)
  const handleRunNumberAndNumber = () => {
    const trimmedCode = numberAndNumberCode.trim();
    if (
      trimmedCode.startsWith("Console.WriteLine(") &&
      trimmedCode.endsWith(");")
    ) {
      const expression = trimmedCode.slice(
        trimmedCode.indexOf("(") + 1,
        trimmedCode.lastIndexOf(")")
      );
      const match = expression.match(/(\d+)\s*\+\s*(\d+)/);
      if (match) {
        const result = parseInt(match[1]) + parseInt(match[2]);
        setNumberAndNumberOutput(result.toString());
      } else {
        setNumberAndNumberOutput(
          "Format kode tidak valid. Hanya operasi + didukung."
        );
      }
    } else {
      setNumberAndNumberOutput(
        "Format kode tidak valid. Pastikan menggunakan Console.WriteLine()."
      );
    }
  };

  // Handle quiz completion
  const handleQuizCompletion = () => {
    handleLessonComplete("/materi/bab1/sintaks-komentar");
    setQuizCompleted(true);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-center">
        BAB 1 - PENDAHULUAN
      </h1>

      {/* White Container - Content Only */}
      <div className="p-4 mb-6 text-justify text-gray-700 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">1.4 Sintaks Print</h2>

        <h3 className="mt-4 text-xl font-semibold">
          Menampilkan hasil dalam program menggunakan fungsi
        </h3>

        <h4 className="mt-4 text-xl font-semibold">Console.WriteLine()</h4>

        <p className="mt-4">
          <code>Console.WriteLine()</code> dalam bahasa pemrograman C# adalah
          sebuah command untuk menampilkan hasil di dalam (). Untuk menampilkan
          sebuah karakter atau kalimat menggunakan fungsi{" "}
          <code>Console.WriteLine()</code>, maka karakter atau kalimat tersebut
          harus dilingkupi dengan tanda kutip ("").
        </p>

        <p className="mt-4">Cobalah kode program pada compiler:</p>

        <div className="mt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full max-w-md p-4 rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-semibold">Compiler</h2>
            <textarea
              className="w-full h-32 p-2 border border-gray-300 rounded-lg"
              value={mainCode}
              onChange={(e) => setMainCode(e.target.value)}
            />
            <button
              onClick={handleRunMain}
              className="mt-2 w-full px-4 py-2 text-white rounded-md text-base font-semibold transition-colors duration-200"
              style={{
                backgroundColor: "#6E2A7F",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#5B1F6A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#6E2A7F")
              }
            >
              Jalankan
            </button>
          </div>
          <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-semibold">Output</h2>
            <pre className="h-32 p-2 overflow-auto border border-gray-300 rounded-lg">
              {mainOutput}
            </pre>
          </div>
        </div>

        <h3 className="mt-4 text-xl font-semibold">
          Contoh Console.WriteLine Nilai Numerik
        </h3>

        <p className="mt-4">
          Untuk mencetak nilai numerik, masukkan angka tanpa tanda kutip.
        </p>

        <div className="mt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full max-w-md p-4 rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-semibold">Compiler</h2>
            <textarea
              className="w-full h-32 p-2 border border-gray-300 rounded-lg"
              value={numericCode}
              onChange={(e) => setNumericCode(e.target.value)}
            />
            <button
              onClick={handleRunNumeric}
              className="mt-2 w-full px-4 py-2 text-white rounded-md text-base font-semibold transition-colors duration-200"
              style={{
                backgroundColor: "#6E2A7F",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#5B1F6A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#6E2A7F")
              }
            >
              Jalankan
            </button>
          </div>
          <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-semibold">Output</h2>
            <pre className="h-32 p-2 overflow-auto border border-gray-300 rounded-lg">
              {numericOutput}
            </pre>
          </div>
        </div>

        <h3 className="mt-4 text-xl font-semibold">
          Contoh Menggabungkan String
        </h3>

        <p className="mt-4">
          Anda dapat menggabungkan string dan string lainnya.
        </p>

        <div className="mt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full max-w-md p-4 rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-semibold">Compiler</h2>
            <textarea
              className="w-full h-32 p-2 border border-gray-300 rounded-lg"
              value={stringConcatCode}
              onChange={(e) => setStringConcatCode(e.target.value)}
            />
            <button
              onClick={handleRunStringConcat}
              className="mt-2 w-full px-4 py-2 text-white rounded-md text-base font-semibold transition-colors duration-200"
              style={{
                backgroundColor: "#6E2A7F",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#5B1F6A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#6E2A7F")
              }
            >
              Jalankan
            </button>
          </div>
          <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-semibold">Output</h2>
            <pre className="h-32 p-2 overflow-auto border border-gray-300 rounded-lg">
              {stringConcatOutput}
            </pre>
          </div>
        </div>

        <h3 className="mt-4 text-xl font-semibold">Contoh String dan Angka</h3>

        <p className="mt-4">Anda juga dapat menggabungkan string dan angka.</p>

        <div className="mt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full max-w-md p-4 rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-semibold">Compiler</h2>
            <textarea
              className="w-full h-32 p-2 border border-gray-300 rounded-lg"
              value={stringAndNumberCode}
              onChange={(e) => setStringAndNumberCode(e.target.value)}
            />
            <button
              onClick={handleRunStringAndNumber}
              className="mt-2 w-full px-4 py-2 text-white rounded-md text-base font-semibold transition-colors duration-200"
              style={{
                backgroundColor: "#6E2A7F",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#5B1F6A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#6E2A7F")
              }
            >
              Jalankan
            </button>
          </div>
          <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-semibold">Output</h2>
            <pre className="h-32 p-2 overflow-auto border border-gray-300 rounded-lg">
              {stringAndNumberOutput}
            </pre>
          </div>
        </div>

        <h3 className="mt-4 text-xl font-semibold">Contoh Angka dan Angka</h3>

        <p className="mt-4">
          Anda juga dapat menggabungkan angka dan angka lainnya.
        </p>

        <div className="mt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full max-w-md p-4 rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-semibold">Compiler</h2>
            <textarea
              className="w-full h-32 p-2 border border-gray-300 rounded-lg"
              value={numberAndNumberCode}
              onChange={(e) => setNumberAndNumberCode(e.target.value)}
            />
            <button
              onClick={handleRunNumberAndNumber}
              className="mt-2 w-full px-4 py-2 text-white rounded-md text-base font-semibold transition-colors duration-200"
              style={{
                backgroundColor: "#6E2A7F",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#5B1F6A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#6E2A7F")
              }
            >
              Jalankan
            </button>
          </div>
          <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-semibold">Output</h2>
            <pre className="h-32 p-2 overflow-auto border border-gray-300 rounded-lg">
              {numberAndNumberOutput}
            </pre>
          </div>
        </div>
      </div>

      {/* Quiz component */}
      <Quiz onComplete={handleQuizCompletion} />

      {/* Navigation buttons */}
      <div className="flex justify-between mt-6 gap-4">
        <button
          onClick={handleBack}
          className="flex items-center px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 text-base font-semibold transition-colors duration-200"
        >
          <img src={backIcon} alt="Kembali" className="w-5 h-5 mr-2" />
          Kembali
        </button>
        <button
          onClick={quizCompleted ? handleNext : null}
          disabled={!quizCompleted}
          className="flex items-center justify-between px-4 py-2 text-base font-semibold"
          style={{
            backgroundColor: quizCompleted ? "#6E2A7F" : "#B0B0B0",
            color: "white",
            borderRadius: "0.5rem",
            transition: "background-color 0.2s",
            cursor: quizCompleted ? "pointer" : "not-allowed",
          }}
          onMouseEnter={(e) => {
            if (quizCompleted)
              e.currentTarget.style.backgroundColor = "#5B1F6A";
          }}
          onMouseLeave={(e) => {
            if (quizCompleted)
              e.currentTarget.style.backgroundColor = "#6E2A7F";
          }}
        >
          <span>Selanjutnya</span>
          <img
            src={quizCompleted ? nextIcon : lockIcon}
            alt={quizCompleted ? "Selanjutnya" : "Terkunci"}
            className="w-5 h-5 ml-2"
          />
        </button>
      </div>
    </div>
  );
};

export default SintaksPrint;
