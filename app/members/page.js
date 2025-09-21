"use client";

export default function MembersPage() {
  return (
    <div className="pt-36 max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Panchayat Members
      </h1>
      <p className="text-gray-700 mb-6">
        Meet the elected members of your Gram Panchayat.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold">Sarpanch: Ram Singh</h2>
          <p className="text-sm text-gray-600">Contact: 9876543210</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold">Member: Sita Devi</h2>
          <p className="text-sm text-gray-600">Contact: 9876543211</p>
        </div>
      </div>
    </div>
  );
}
