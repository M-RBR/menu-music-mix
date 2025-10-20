import { BadgeInfo } from "lucide-react";
import { useState } from "react";
import MusicPlayer from "../components/MusicPlayer";
import MenuViewer from "../components/MenuViewer";
import MenuImage from "../assets/Home page images/Menuekarte2945.jpg";
import PaulLinkeImage from "../assets/Home page images/paul-lincke.jpg";

export default function Home({ onAboutClick }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-2xl border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Images and Title Row */}
          <div className="flex items-center justify-between gap-8 mb-4">
            {/* Left Image */}
            <img
              src={MenuImage}
              alt="Historical menu example from 1900"
              className="rounded-lg shadow-md w-32 h-32 object-cover"
            />

            {/* Center Title */}
            <div className="flex-1 text-center">
              <h1 className="text-4xl font-bold text-gray-900">
                MENU-MUSIC-MIX
              </h1>
              <p className="text-gray-600 mt-2 text-lg italic">
                Tastes and sounds of Berlin in the years 1900-1914
              </p>
            </div>

            {/* Right Image */}
            <img
              src={PaulLinkeImage}
              alt="Image of the composer Paul Lincke around 1905"
              className="rounded-lg shadow-md w-32 h-32 object-cover"
            />
          </div>

          {/* About Icon */}
          <div className="flex justify-center">
            <span className="relative inline-block">
              <BadgeInfo
                className="size-5 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={onAboutClick}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap z-10">
                  About this website
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900"></span>
                </span>
              )}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Menu Cards */}
          <section className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <div className="flex items-center justify-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Historical Menu Cards
              </h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex-1">
              <MenuViewer />
            </div>
          </section>

          {/* Right Section - Music */}
          <section className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <div className="flex items-center justify-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Echoes of Berlin: 78s
              </h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex-1">
              <MusicPlayer />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
