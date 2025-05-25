import React from "react";
import { useNavigate } from "react-router-dom";

const CompilerPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="w-full max-w-4xl bg-white p-4 rounded-t-lg shadow-md flex flex-col md:flex-row justify-between items-center border-b">
        <h1 className="text-xl font-bold text-gray-700 text-center md:text-left">C# Online Compiler</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 md:mt-0 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Kembali ke Dashboard
        </button>
      </div>
      
      {/* Compiler Iframe */}
      <div className="w-full max-w-4xl bg-white p-4 shadow-md border-b border-gray-300">
        <iframe 
          width="100%" 
          height="475" 
          src="https://dotnetfiddle.net/Widget/x40KZr" 
          frameBorder="0" 
          className="rounded-lg border"
        ></iframe>
      </div>

      {/* Footer */}
      {/* Uncomment this section if you want to include the footer */}
      {/* <div className="w-full max-w-4xl bg-white p-4 rounded-b-lg shadow-md text-center text-gray-600 text-sm border-t">
        Built with ❤️ using DotNetFiddle
      </div> */}
    </div>
  );
};

export default CompilerPage;