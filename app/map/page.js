"use client";

export default function MapPage() {
  return (
    <div className="pt-36 max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Village Map</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.370430999999!2d83.0625204!3d25.7310942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991cf1450dc16cf%3A0xd24a5f561129b0b!2sShri%20Radhe%20Krishna%20Mandir!5e0!3m2!1sen!2sin!4v1694767000000!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="mt-4 text-center">
        <a
          href="https://goo.gl/maps/DIRECT-LINK-TO-YOUR-TEMPLE"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-700 underline hover:text-green-900"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
