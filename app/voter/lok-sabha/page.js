"use client";

import { useState, useEffect } from "react";

export default function LokSabhaPage() {
  const [voters, setVoters] = useState([]);
  const [search, setSearch] = useState("");
  const [constituencyFilter, setConstituencyFilter] = useState("");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    fetch("/lokSabhaVoters.json")
      .then((res) => res.json())
      .then((data) => setVoters(data))
      .catch((err) => console.error("Failed to load Lok Sabha voter list:", err));
  }, []);

  const uniqueConstituencies = [...new Set(voters.map((v) => v.constituency).filter(Boolean))];

  const filteredVoters = voters.filter((voter) => {
    const name = voter?.name?.toLowerCase?.() || "";
    const matchesSearch = name.includes(search.toLowerCase());
    const matchesConstituency = constituencyFilter ? voter.constituency === constituencyFilter : true;
    return matchesSearch && matchesConstituency;
  });

  const handleExport = async () => {
    try {
      const response = await fetch("/api/export-voters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voters: filteredVoters }),
      });

      if (!response.ok) throw new Error("Export failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "lok-sabha-voters.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  const labels = {
    en: {
      title: "Lok Sabha Voter Details",
      search: "Search by name...",
      constituency: "Constituency",
      guardian: "Guardian",
      gender: "Gender",
      age: "Age",
      noResults: "No voters found for selected criteria.",
      export: "Export to Excel",
      allConstituencies: "All Constituencies",
      toggle: "Switch to Hindi",
      dashboard: "→ View Dashboard",
    },
    hi: {
      title: "लोकसभा मतदाता विवरण",
      search: "नाम से खोजें...",
      constituency: "निर्वाचन क्षेत्र",
      guardian: "पिता/पति का नाम",
      gender: "लिंग",
      age: "आयु",
      noResults: "चयनित मानदंडों के लिए कोई मतदाता नहीं मिला।",
      export: "एक्सेल में निर्यात करें",
      allConstituencies: "सभी निर्वाचन क्षेत्र",
      toggle: "अंग्रेज़ी में बदलें",
      dashboard: "→ डैशबोर्ड देखें",
    },
  };

  const t = labels[language];

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700 border-b pb-2">{t.title}</h1>
        <button
          onClick={() => setLanguage(language === "en" ? "hi" : "en")}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
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
        value={constituencyFilter}
        onChange={(e) => setConstituencyFilter(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-6"
      >
        <option value="">{t.allConstituencies}</option>
        {uniqueConstituencies.map((constituency, index) => (
          <option key={index} value={constituency}>
            {constituency}
          </option>
        ))}
      </select>

      <button
        onClick={handleExport}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {t.export}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredVoters.map((voter, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition duration-200"
          >
            <h2 className="text-lg font-semibold text-blue-700">{voter.name || "Unnamed Voter"}</h2>
            <p className="text-sm text-gray-600">{t.constituency}: {voter.constituency || "Unknown"}</p>
            <p className="text-sm text-gray-600">{t.guardian}: {voter.guardian || "N/A"}</p>
            <p className="text-sm text-gray-600">{t.gender}: {voter.gender || "N/A"}</p>
            <p className="text-sm text-gray-600">{t.age}: {voter.age || "N/A"}</p>
          </div>
        ))}
        {filteredVoters.length === 0 && (
          <p className="text-gray-500">{t.noResults}</p>
        )}
      </div>

      <div className="mt-8 text-sm text-blue-600 underline hover:text-blue-800">
        <a href="/voter/lok-sabha/dashboard">{t.dashboard}</a>
      </div>
    </div>
  );
}