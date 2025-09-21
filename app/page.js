"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";

export default function HomePage() {
  const [language, setLanguage] = useState("hi");
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleLanguage = () => setLanguage(language === "en" ? "hi" : "en");
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleModal = () => setShowModal(!showModal);

  const labels = {
    en: {
      welcome: "Welcome to Gram Panchayat Portal",
      description: "Manage certificates, budget, members, development & more",
      services: "Services",
      lang: "हिंदी",
      dark: "Dark Mode",
      slogan: "Panchayat Vikas, Sarvajan Sukhaya 🌞 | Efficient Governance for Every Citizen",
      footer: "© 2025 Gram Panchayat | Powered by Local Governance",
      fab: "📞",
      whatsappLink: "https://wa.me/qr/D5EKI63JQJHLC1?text=Hello%20Gram%20Panchayat%20Team%2C%20I%20have%20a%20query.",
      contactTitle: "Contact Gram Panchayat",
      contactMessage: "Send us a message or reach out via WhatsApp.",
      close: "Close",
      whatsapp: "Open WhatsApp",
      call: "Call Now",
    },
    hi: {
      welcome: "ग्राम पंचायत पोर्टल में आपका स्वागत है",
      description: "प्रमाणपत्र, बजट, सदस्य, विकास और अधिक प्रकाशित करें",
      services: "सेवाएं",
      lang: "English",
      dark: "डार्क मोड",
      slogan: "पंचायत विकास, सर्वजन सुखाय 🌞 | Efficient Governance for Every Citizen",
      footer: "© 2025 ग्राम पंचायत | स्थानीय शासन द्वारा संचालित",
      fab: "📞",
      whatsappLink: "https://wa.me/qr/D5EKI63JQJHLC1?text=नमस्ते%20ग्राम%20पंचायत%20टीम%2C%20मुझे%20एक%20सवाल%20है।",
      contactTitle: "संपर्क करें",
      contactMessage: "हमें संदेश भेजें या WhatsApp से जुड़ें।",
      close: "बंद करें",
      whatsapp: "WhatsApp खोलें",
      call: "कॉल करें",
    },
  };

  const t = labels[language];

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

  const images = [
    "/slide.png",
    "/voter.png",
    "/panchayat.jpg",
    "/panchayat.jpg",
    "/panchayat.jpg",
  ];

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} relative`}>
        {/* TOP BAR */}
        <div className="flex items-center justify-end px-2 py-1 border-b border-gray-200 bg-white dark:bg-gray-800 shadow-sm fixed top-0 left-0 right-0 z-50">
          <div className="flex gap-1">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 text-xs rounded bg-yellow-500 text-white hover:bg-yellow-600 transition"
            >
              {t.lang}
            </button>
            <button
              onClick={toggleDarkMode}
              className="px-2 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700 transition"
            >
              {t.dark}
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="pt-10 pb-16">
          {/* HERO */}
          <section className="text-center py-2 bg-gradient-to-r from-green-100 via-blue-100 to-yellow-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600">
            <h1 className="text-xl font-bold text-green-700 dark:text-yellow-400">{t.welcome}</h1>
            <p className="text-sm text-gray-700 dark:text-gray-300">{t.description}</p>
          </section>

          {/* BLACK STRIP BELOW HEADER */}
          <section className="bg-black text-white py-2 text-center shadow-sm">
            <p className="text-sm font-medium tracking-wide">{t.slogan}</p>
          </section>

          {/* MOVING IMAGES */}
          <section className="py-2 overflow-hidden bg-white dark:bg-gray-800">
            <div className="relative w-full">
              <motion.div
                className="flex gap-4"
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
                    className="rounded-md shadow-sm hover:scale-105 transition h-24"
                  />
                ))}
              </motion.div>
            </div>
          </section>

          {/* SERVICES GRID */}
          <section className="max-w-6xl mx-auto px-2 py-4">
            <h2 className="text-lg font-bold text-center mb-3 text-green-700 dark:text-yellow-400">
              {t.services}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {services.map((s, i) => (
                <ServiceCard key={s.href} title={s.title} href={s.href} index={i} />
              ))}
            </div>
          </section>
        </div>

        {/* STICKY FOOTER */}
        <footer className="fixed bottom-0 left-0 right-0 bg-gray-100 dark:bg-gray-800 text-center text-xs py-2 border-t border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
          {t.footer}
        </footer>

        {/* FLOATING ACTION BUTTON */}
        <button
          onClick={toggleModal}
          className="fixed bottom-16 right-4 bg-green-500 hover:bg-green-600 text-white text-lg px-4 py-2 rounded-full shadow-lg transition animate-pulse"
        >
          {t.fab}
        </button>

        {/* MODAL CONTACT FORM */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg p-6 w-80 shadow-xl">
              <h3 className="text-lg font-bold mb-2">{t.contactTitle}</h3>
              <p className="text-sm mb-4">{t.contactMessage}</p>
              <div className="flex justify-end gap-2">
                <a
                  href={t.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700 transition"
                >
                  {t.whatsapp}
                </a>
                <a
                  href="tel:+9336401640"
                  className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  {t.call}
                </a>
                <button
                  onClick={toggleModal}
                  className="px-3 py-1 text-sm rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}