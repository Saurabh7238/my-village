"use client";

import Image from "next/image";

const schools = [
  {
    name: "Government Primary School – Ward 2",
    location: "Near Panchayat Bhawan",
    inauguration: "12 August 2010",
    students: 180,
    washrooms: 2,
    handpumps: 1,
    image: "/OIP.jpg",
  },
  {
    name: "Government Middle School – Ward 5",
    location: "Adjacent to Weekly Market",
    inauguration: "5 January 2012",
    students: 220,
    washrooms: 3,
    handpumps: 2,
   image: "/OIP.jpg",
  },
  {
    name: "Government Primary School – Ward 8",
    location: "Near Village Bus Stop",
    inauguration: "18 March 2015",
    students: 150,
    washrooms: 2,
    handpumps: 1,
    image: "/OIP.jpg",
  },
];

export default function SchoolDetailsPage() {
  return (
    <div className="pt-36 max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Government Schools</h1>
      <p className="text-gray-700 mb-6">
        Overview of government schools in the village, including location, facilities, and student enrollment.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map((school, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
            <Image
              src={school.image}
              alt={`Image of ${school.name}`}
              width={400}
              height={250}
              className="rounded mb-3 object-cover"
            />
            <h2 className="text-lg font-semibold text-green-600">{school.name}</h2>
            <p className="text-sm text-gray-700">📍 Location: {school.location}</p>
            <p className="text-sm text-gray-700">🗓️ Inauguration: {school.inauguration}</p>
            <p className="text-sm text-gray-700">👨‍👩‍👧‍👦 Students: {school.students}</p>
            <p className="text-sm text-gray-700">🚻 Washrooms: {school.washrooms}</p>
            <p className="text-sm text-gray-700">🚰 Handpumps: {school.handpumps}</p>
          </div>
        ))}
      </div>
    </div>
  );
}