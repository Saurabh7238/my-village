"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function VidhanSabhaPage() {
  const [voters, setVoters] = useState([]);
  const [search, setSearch] = useState("");
  const [constituencyFilter, setConstituencyFilter] = useState("");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    fetch("/api/voter-data?type=vidhan-sabha")
      .then((res) => res.json())
      .then((data) => {
        setVoters(data.voters || []);
      })
      .catch((err) => console.error("Failed to load Vidhan Sabha voter list:", err));
  }, []);

  const uniqueConstituencies = [...new Set(voters.map((v) => v.constituency || v.voterConstituency).filter(Boolean))];

  const filteredVoters = voters.filter((voter) => {
    const name = (voter?.elector_name || voter?.voterName)?.toLowerCase?.() || "";
    const matchesSearch = name.includes(search.toLowerCase());
    const matchesConstituency = constituencyFilter ? (voter.constituency || voter.voterConstituency) === constituencyFilter : true;
    return matchesSearch && matchesConstituency;
  });

  const labels = {
    en: {
      title: "Vidhan Sabha Voter Details",
      search: "Search by name...",
      constituency: "Constituency",
      guardian: "Guardian",
      gender: "Gender",
      age: "Age",
      noResults: "No voters found for selected criteria.",
      allConstituencies: "All Constituencies",
      toggle: "Switch to Hindi",
    },
    hi: {
      title: "विधानसभा मतदाता विवरण",
      search: "नाम से खोजें...",
      constituency: "निर्वाचन क्षेत्र",
      guardian: "अभिभावक",
      gender: "लिंग",
      age: "आयु",
      noResults: "चयनित मानदंडों के लिए कोई मतदाता नहीं मिला।",
      allConstituencies: "सभी निर्वाचन क्षेत्र",
      toggle: "अंग्रेज़ी में बदलें",
    },
  };

  const t = labels[language];

  const normalizeGender = (g) => {
    if (language === "hi") return g;
    if (g === "पु" || g === "Male") return "Male";
    if (g === "म" || g === "Female") return "Female";
    return g;
  };

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-700 border-b pb-2">{t.title}</h1>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredVoters.map((voter, index) => (
          <div
            key={voter.id || `voter-${index}`}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition duration-200"
          >
            {voter.image && (
              <img
                src={voter.image}
                alt={voter.elector_name || voter.voterName}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-lg font-semibold text-purple-700">{voter.elector_name || voter.voterName || "Unnamed Voter"}</h2>
            <p className="text-sm text-gray-600">{t.constituency}: {voter.constituency || voter.voterConstituency || "Unknown"}</p>
            <p className="text-sm text-gray-600">{t.guardian}: {voter.guardian_name || voter.voterGuardianName || "N/A"}</p>
            <p className="text-sm text-gray-600">{t.gender}: {normalizeGender(voter.gender || voter.voterGender) || "N/A"}</p>
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