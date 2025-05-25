import React from "react";

function Footer() {
  return (
    <footer className="bg-white">
      <div className="w-full max-w-screen-xl p-2 mx-auto md:flex md:items-center md:justify-center">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a
            href="https://flowbite.com/"
            className="hover:no-underline"
            style={{ color: "#68217A" }}
          >
            Sharp
          </a>{" "}
          Learn. Pilkommedia.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
