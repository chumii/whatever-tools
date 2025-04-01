import React from "react";
import { Link } from "react-router-dom";

function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow p-4 flex justify-between items-center">
        <span className="text-m font-bold tracking-wide pl-5">whatever</span>
        <nav className="space-x-4 text-sm font-medium">
          <Link to="/" className="text-gray-300 hover:text-white">
            Loot History
          </Link>
          {/* <Link to="/git" className="text-gray-300 hover:text-white">
            git
          </Link> */}
          {/* Weitere Seitenlinks hier */}
        </nav>
      </header>
      <main className="w-full mx-auto px-6 py-8">{children}</main>
    </div>
  );
}

export default PageLayout;
