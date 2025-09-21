"use client";

import { useState, useEffect } from "react";

export default function GramPanchayatPage() {
  const [voters, setVoters] = useState([]);
  const [search, setSearch] = useState("");
  const [wardFilter, setWardFilter] = useState("");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    fetch("/voterlist.json")
      .then((res) => res.json())
      .then((data) => setVoters(data))
      .catch((err) => console.error("Failed to load voter list:", err));
  }, []);

  const uniqueWards = [...new Set(voters.map((v) => v.ward).filter(Boolean))];

  const filteredVoters = voters.filter((voter) => {
    const name = voter?.name?.toLowerCase?.() || "";
    const matchesSearch = name.includes(search.toLowerCase());
    const matchesWard = wardFilter ? voter.ward === wardFilter : true;
    return matchesSearch && matchesWard;
  });

  const handleExport = async () => {
    const response = await fetch("/api/export-voters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voters: filteredVoters }),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "gram-panchayat-voters.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const labels = {
    en: {
      title: "Gram Panchayat Voter Details",
      search: "Search by name...",
      ward: "Ward",
      guardian: "Guardian",
      gender: "Gender",
      age: "Age",
      noResults: "No voters found for selected criteria.",
      export: "Export to Excel",
      allWards: "All Wards",
      toggle: "Switch to Hindi",
    },
    hi: {
      title: "ग्राम पंचायत मतदाता विवरण",
      search: "नाम से खोजें...",
      ward: "वार्ड",
      guardian: "पिता/पति का नाम",
      gender: "लिंग",
      age: "आयु",
      noResults: "चयनित मानदंडों के लिए कोई मतदाता नहीं मिला।",
      export: "एक्सेल में निर्यात करें",
      allWards: "सभी वार्ड",
      toggle: "अंग्रेज़ी में बदलें",
    },
  };

  const t = labels[language];

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">{t.title}</h1>
        <button
          onClick={() => setLanguage(language === "en" ? "hi" : "en")}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          {t.toggle}
        </button>
      </div>

      <input
        type="text"
        placeholder={t.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <select
        value={wardFilter}
        onChange={(e) => setWardFilter(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-6"
      >
        <option value="">{t.allWards}</option>
        {uniqueWards.map((ward, index) => (
          <option key={index} value={ward}>
            {ward}
          </option>
        ))}
      </select>

      <button
        onClick={handleExport}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {t.export}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredVoters.map((voter, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-green-700">{voter.name || "Unnamed Voter"}</h2>
            <p className="text-sm text-gray-600">{t.ward}: {voter.ward || "Unknown"}</p>
            <p className="text-sm text-gray-600">{t.guardian}: {voter.guardian || "N/A"}</p>
            <p className="text-sm text-gray-600">{t.gender}: {voter.gender || "N/A"}</p>
            <p className="text-sm text-gray-600">{t.age}: {voter.age || "N/A"}</p>
          </div>
        ))}
        {filteredVoters.length === 0 && (
          <p className="text-gray-500">{t.noResults}</p>
        )}
      </div>
    </div>
  );
}