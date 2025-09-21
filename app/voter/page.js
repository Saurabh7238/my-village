"use client";

import { motion } from "framer-motion";

export default function VoterPage() {
  return (
    <div className="pt-20 px-4">
      <h1 className="text-3xl font-bold text-green-700 text-center">Voter Information</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
        {/* Gram Panchayat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h2 className="text-xl font-semibold text-green-600">Gram Panchayat</h2>
          <p className="text-gray-700 mt-2">
            Village-level governance details including ward-wise voter distribution and elected representatives.
          </p>
        </motion.div>

        {/* Lok Sabha */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h2 className="text-xl font-semibold text-green-600">Lok Sabha</h2>
          <p className="text-gray-700 mt-2">
            National parliamentary constituency data including MP details and polling booth information.
          </p>
        </motion.div>

        {/* Vidhan Sabha */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg cursor-pointer"
        >
          <h2 className="text-xl font-semibold text-green-600">Vidhan Sabha</h2>
          <p className="text-gray-700 mt-2">
            State legislative assembly voter data including MLA profiles and voter turnout statistics.
          </p>
        </motion.div>
      </div>
    </div>
  );
}