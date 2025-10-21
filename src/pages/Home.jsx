import { BadgeInfo } from "lucide-react";
import { useState } from "react";
import MusicPlayer from "../components/MusicPlayer";
import MenuViewer from "../components/MenuViewer";
import MenuImage from "../assets/Home page images/Menuekarte2945.jpg";
import PaulLinkeImage from "../assets/Home page images/paul-lincke.jpg";

export default function Home({ onAboutClick }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "var(--color-ivory)",
          borderBottom: "3px solid var(--color-border)",
        }}
        className="shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Images and Title Row */}
          <div className="flex items-center justify-between gap-8 mb-4 flex-wrap sm:flex-nowrap">
            {/* Left Image */}
            <img
              src={MenuImage}
              alt="Historical menu example from 1900"
              className="rounded-sm shadow-lg w-32 h-32 object-cover"
              style={{ border: "2px solid var(--color-gold)" }}
            />

            {/* Center Title */}
            <div className="flex-1 text-center">
              <h1
                className="text-4xl font-bold"
                style={{
                  color: "var(--color-burgundy)",
                  letterSpacing: "0.05em",
                }}
              >
                MENU-MUSIC-MIX
              </h1>
              <p
                className="mt-2 text-lg italic"
                style={{ color: "var(--color-sepia)" }}
              >
                Tastes and sounds of Berlin in the years 1900-1914
              </p>
            </div>

            {/* Right Image */}
            <img
              src={PaulLinkeImage}
              alt="Image of the composer Paul Lincke around 1905"
              className="rounded-sm shadow-lg w-32 h-32 object-cover"
              style={{ border: "2px solid var(--color-gold)" }}
            />
          </div>

          {/* About Icon */}
          <div className="flex justify-center">
            <span className="relative inline-block">
              <BadgeInfo
                className="size-5 cursor-pointer transition-colors"
                style={{ color: "var(--color-teal)" }}
                onClick={onAboutClick}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <span
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1 text-sm rounded whitespace-nowrap z-10"
                  style={{
                    backgroundColor: "var(--color-sepia)",
                    color: "var(--color-ivory)",
                  }}
                >
                  About this website
                  <span
                    className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                    style={{ borderBottomColor: "var(--color-sepia)" }}
                  ></span>
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
          <section
            className="rounded-sm shadow-lg p-6 flex flex-col"
            style={{
              backgroundColor: "var(--color-ivory)",
              border: "2px solid var(--color-border)",
            }}
          >
            <div className="flex items-center justify-center mb-6">
              <h2
                className="text-2xl font-semibold"
                style={{ color: "var(--color-burgundy)" }}
              >
                Historical Menu Cards
              </h2>
            </div>
            <div
              className="rounded-sm p-4 flex-1"
              style={{ backgroundColor: "var(--color-cream)" }}
            >
              <MenuViewer />
            </div>
          </section>

          {/* Right Section - Music */}
          <section
            className="rounded-sm shadow-lg p-6 flex flex-col"
            style={{
              backgroundColor: "var(--color-ivory)",
              border: "2px solid var(--color-border)",
            }}
          >
            <div className="flex items-center justify-center mb-6">
              <h2
                className="text-2xl font-semibold"
                style={{ color: "var(--color-burgundy)" }}
              >
                Echoes of Berlin: 78s
              </h2>
            </div>
            <div
              className="rounded-sm p-4 flex-1"
              style={{ backgroundColor: "var(--color-cream)" }}
            >
              <MusicPlayer />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
