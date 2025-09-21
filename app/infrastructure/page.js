"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaRoad,
  FaLightbulb,
  FaWater,
  FaSchool,
  FaHospital,
  FaSolarPanel,
  FaWifi,
  FaTractor,
  FaToilet,
  FaStore,
} from "react-icons/fa";

export default function InfrastructurePage() {
  const sections = [
    {
      title: "Public Facilities",
      items: [
        { icon: FaHospital, label: "Primary Health Centers", value: "2" },
        {
          icon: FaSchool,
          label: "Government Schools",
          value: "3",
          link: "/infrastructure/schools", // ✅ Link added
        },
        { icon: FaToilet, label: "Sanitation Units Built", value: "120+" },
        { icon: FaStore, label: "Community Hall", value: "1 (Ward 5)" },
      ],
    },
    {
      title: "Water & Irrigation",
      items: [
        { icon: FaWater, label: "Handpumps & Wells", value: "18" },
        { icon: FaWater, label: "Water Tanks Installed", value: "5" },
        {
          icon: FaTractor,
          label: "Irrigation Projects",
          value: "Canal + Rainwater Harvesting",
        },
      ],
    },
    {
      title: "Connectivity & Energy",
      items: [
        { icon: FaRoad, label: "Road Length Maintained", value: "20 km" },
        {
          icon: FaLightbulb,
          label: "Street Lights Installed",
          value: "150",
          link: "/infrastructure/street-lights",
        },
        {
          icon: FaSolarPanel,
          label: "Solar Panels",
          value: "Installed on 4 junctions",
        },
        {
          icon: FaWifi,
          label: "Internet Coverage",
          value: "CSC Center + 3G/4G Towers",
        },
      ],
    },
    {
      title: "Water Bodies",
      items: [
        {
          icon: FaWater,
          label: "Rivers Monitored",
          value: "2 (Ganga, Yamuna)",
        },
      ],
    },
  ];

  return (
    <div className="pt-36 max-w-5xl mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-green-700 mb-4"
      >
        Village Infrastructure & Development
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-gray-700 mb-6"
      >
        A comprehensive overview of infrastructure and development initiatives under the Gram Panchayat’s jurisdiction.
      </motion.p>

      {sections.map((section, idx) => (
        <motion.section
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + idx * 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-green-600 mb-3">
            {section.title}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.items.map(({ icon: Icon, label, value, link }, i) => {
              const content = (
                <div className="flex items-start gap-3 bg-white rounded-lg shadow p-4 text-gray-700 hover:shadow-md hover:scale-[1.02] transition cursor-pointer">
                  <Icon className="text-green-500 text-xl mt-1" />
                  <div>
                    <p className="font-medium">{label}</p>
                    <p className="text-sm">{value}</p>
                  </div>
                </div>
              );

              return (
                <li key={i}>
                  {link ? <Link href={link}>{content}</Link> : content}
                </li>
              );
            })}
          </ul>
        </motion.section>
      ))}
    </div>
  );
}