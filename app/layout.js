import "./globals.css";
import Header from "../components/Header";
import Providers from "./auth-provider";
import ScrollToTopButton from "../components/ScrollToTopButton";

export const metadata = {
  title: "Gram Panchayat Portal",
  description: "Manage Gram Panchayat information",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 text-gray-900 font-sans relative">
        <Providers>
          <noscript>
            <div className="bg-red-100 text-red-700 text-center p-2 text-sm">
              This site works best with JavaScript enabled.
            </div>
          </noscript>
          <Header />
          <div className="bg-yellow-100 text-yellow-800 text-center py-2 text-sm font-medium">
            📢 New voter list available! Check the updates in the Voter section.
          </div>
          <main className="max-w-6xl mx-auto px-4 pt-36 pb-8">{children}</main>
          <ScrollToTopButton />
          <footer className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white mt-8">
            <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm">
              © {new Date().getFullYear()} Gram Panchayat Portal — Built with ❤️ by Saurabh
              <blockquote className="italic text-green-100 mt-2">
                “This portal made it so easy to get my birth certificate!” — Rekha Devi, Ward 3
              </blockquote>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}