"use client";

import Image from "next/image";

const streetLights = [
  {
    location: "Ward 1 - Near Temple",
    date: "2025-07-10",
    cost: "₹11,000",
    image: "/light.png",
    type: "Solar LED",
    remarks: "Installed by Gram Urja Ltd.",
  },
  {
    location: "Ward 2 - Market Road",
    date: "2025-07-12",
    cost: "₹10,500",
    image: "/light1.png",
    type: "LED",
    remarks: "Grid-powered",
  },
  {
    location: "Ward 3 - Primary School",
    date: "2025-07-15",
    cost: "₹12,000",
    image: "/light.png",
    type: "Solar LED",
    remarks: "Installed by Gram Urja Ltd.",
  },
  {
    location: "Ward 4 - Bus Stop",
    date: "2025-07-18",
    cost: "₹9,800",
    image: "/light1.png",
    type: "LED",
    remarks: "Grid-powered",
  },
  {
    location: "Ward 5 - Panchayat Bhawan",
    date: "2025-07-20",
    cost: "₹10,200",
    image: "/light.png",
    type: "Solar LED",
    remarks: "Installed by Gram Urja Ltd.",
  },
  {
    location: "Ward 6 - Near Anganwadi",
    date: "2025-07-22",
    cost: "₹11,500",
    image: "/light1.png",
    type: "LED",
    remarks: "Grid-powered",
  },
  {
    location: "Ward 7 - Community Hall",
    date: "2025-07-25",
    cost: "₹10,800",
    image: "/light.png",
    type: "Solar LED",
    remarks: "Installed by Gram Urja Ltd.",
  },
  {
    location: "Ward 8 - Main Junction",
    date: "2025-07-28",
    cost: "₹12,300",
    image: "/light1.png",
    type: "LED",
    remarks: "Grid-powered",
  },
  {
    location: "Ward 9 - Near Post Office",
    date: "2025-07-30",
    cost: "₹11,700",
    image: "/light.png",
    type: "Solar LED",
    remarks: "Installed by Gram Urja Ltd.",
  },
  {
    location: "Ward 10 - Village Entry Gate",
    date: "2025-08-01",
    cost: "₹13,000",
    image: "/light1.png",
    type: "LED",
    remarks: "Grid-powered",
  },
];

export default function StreetLightDetails() {
  return (
    <div className="pt-36 max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Street Light Installations</h1>
      <p className="text-gray-700 mb-6">
        Detailed overview of street lights installed across the village with cost, date, and location.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {streetLights.map((light, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
            <Image
              src={light.image}
              alt={`Street light at ${light.location}`}
              width={400}
              height={250}
              className="rounded mb-3 object-cover"
            />
            <h2 className="text-lg font-semibold text-green-600">{light.location}</h2>
            <p className="text-sm text-gray-700">📅 Installed on: {light.date}</p>
            <p className="text-sm text-gray-700">💰 Cost: {light.cost}</p>
            <p className="text-sm text-gray-700">💡 Type: {light.type}</p>
            <p className="text-sm text-gray-700">🛠️ Remarks: {light.remarks}</p>
          </div>
        ))}
      </div>
    </div>
  );
}