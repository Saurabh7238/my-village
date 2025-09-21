"use client";

import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function VidhanSabhaDashboard() {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    fetch("/vidhanSabhaVoters.json")
      .then((res) => res.json())
      .then((data) => setVoters(data));
  }, []);

  const ageGroups = {
    "18–30": 0,
    "31–45": 0,
    "46–60": 0,
    "60+": 0,
  };

  const genderCount = {
    male: 0,
    female: 0,
    other: 0,
  };

  voters.forEach((v) => {
    const age = v.age;
    if (age <= 30) ageGroups["18–30"]++;
    else if (age <= 45) ageGroups["31–45"]++;
    else if (age <= 60) ageGroups["46–60"]++;
    else ageGroups["60+"]++;

    if (v.gender === "पु") genderCount.male++;
    else if (v.gender === "म") genderCount.female++;
    else genderCount.other++;
  });

  const ageData = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: "Age Distribution",
        data: Object.values(ageGroups),
        backgroundColor: "#10b981",
      },
    ],
  };

  const genderData = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        label: "Gender Ratio",
        data: Object.values(genderCount),
        backgroundColor: ["#34d399", "#f472b6", "#a78bfa"],
      },
    ],
  };

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-green-700 mb-6">Vidhan Sabha Voter Dashboard</h2>

      <div className="mb-10">
        <Bar data={ageData} />
      </div>

      <div className="mb-10">
        <Pie data={genderData} />
      </div>
    </div>
  );
}