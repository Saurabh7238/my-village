"use client";

import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";

export default function HomePage() {
  const services = [
    { title: "Birth Certificates", href: "/birth" },
    { title: "Death Certificates", href: "/death" },
    { title: "Aadhar Create / Update", href: "/aadhar" },
    { title: "Voter List", href: "/voter" },
    { title: "Gram Budget", href: "/budget" },
    { title: "Development Projects", href: "/development" },
    { title: "Panchayat Members", href: "/members" },
    { title: "Appointments", href: "/appointments" },
    { title: "Gallery", href: "/gallery" },
    { title: "Map", href: "/map" },
    { title: "Rivers, Roads & Lights", href: "/infrastructure" },
  ];

  // Image array
  const images = [
    "/slide.png",
    "/voter.png",
    "/panchayat.jpg",
    "/panchayat.jpg",
    "/panchayat.jpg",
  ];

  return (
    <div className="pt-48">
      {/* HERO */}
      <section className="text-center py-12 bg-gradient-to-r from-green-100 via-blue-100 to-yellow-100">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Welcome to Gram Panchayat Portal
        </h1>
        <p className="text-lg text-gray-700">
          Manage certificates, budget, members, development & more
        </p>
      </section>

      {/* MOVING IMAGES – Smooth animation */}
      <section className="bg-white py-6 overflow-hidden">
        <div className="relative w-full">
          <motion.div
            className="flex gap-8"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
            }}
          >
            {[...images, ...images].map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Slide ${idx}`}
                className="rounded-xl shadow-lg hover:scale-105 transition h-32"
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-700">
          Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard
              key={s.href}
              title={s.title}
              href={s.href}
              index={i}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
