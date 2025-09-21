"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function VoterPage() {
  const sections = [
    {
      title: "Gram Panchayat",
      description: "Ward-wise voter data and local representatives.",
      link: "/voter/gram-panchayat",
    },
    {
      title: "Lok Sabha",
      description: "Parliamentary constituency and MP details.",
      link: "/voter/lok-sabha",
    },
    {
      title: "Vidhan Sabha",
      description: "State assembly voter data and MLA profiles.",
      link: "/voter/vidhan-sabha",
    },
  ];

  return (
    <div className="pt-16 px-4">
      <h1 className="text-3xl font-bold text-green-700 text-center">Voter Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
        {sections.map((section, index) => (
          <Link key={index} href={section.link}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 + index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-green-600">{section.title}</h2>
              <p className="text-gray-700 mt-2">{section.description}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}