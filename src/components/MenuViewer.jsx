import { useState, useEffect } from "react";
import { parseMenuData, getMenusByYear, getYears } from "../utils/menuData";

export default function MenuViewer() {
  const [allMenus] = useState(() => parseMenuData());
  const [menusByYear] = useState(() => getMenusByYear());
  const [years] = useState(() => getYears());
  const [selectedYear, setSelectedYear] = useState("all");
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  const [viewMode, setViewMode] = useState("browse"); // 'browse' or 'view'
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const displayedMenus =
    selectedYear === "all" ? allMenus : menusByYear[selectedYear] || [];
  const currentMenu = displayedMenus[currentMenuIndex];

  useEffect(() => {
    setCurrentMenuIndex(0);
    setViewMode("browse");
    setCurrentPageIndex(0);
  }, [selectedYear]);

  const handlePrevMenu = () => {
    if (currentMenuIndex > 0) {
      setCurrentMenuIndex(currentMenuIndex - 1);
      setViewMode("browse");
      setCurrentPageIndex(0);
    }
  };

  const handleNextMenu = () => {
    if (currentMenuIndex < displayedMenus.length - 1) {
      setCurrentMenuIndex(currentMenuIndex + 1);
      setViewMode("browse");
      setCurrentPageIndex(0);
    }
  };

  const handleViewMenu = () => {
    setViewMode("view");
    setCurrentPageIndex(0);
  };

  const handleCloseView = () => {
    setViewMode("browse");
    setCurrentPageIndex(0);
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (currentMenu && currentPageIndex < currentMenu.images.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  if (!currentMenu) {
    return (
      <div
        className="text-center py-8"
        style={{ color: "var(--color-sepia)", opacity: 0.7 }}
      >
        No menus available for this selection
      </div>
    );
  }

  return (
    <div>
      {/* Year Filter */}
      <div className="mb-4">
        <label
          className="block text-base font-medium mb-2"
          style={{ color: "var(--color-sepia)" }}
        >
          Filter by Year:
        </label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full px-3 py-2 rounded"
          style={{
            border: "2px solid var(--color-border)",
            backgroundColor: "var(--color-ivory)",
            color: "var(--color-sepia)",
          }}
        >
          <option value="all">All years ({allMenus.length} menus)</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year} ({menusByYear[year].length} menu
              {menusByYear[year].length > 1 ? "s" : ""})
            </option>
          ))}
        </select>
      </div>

      {/* Browse Mode */}
      {viewMode === "browse" && (
        <div>
          {/* Menu Preview */}
          <div
            className="rounded overflow-hidden mb-4 h-64"
            style={{
              backgroundColor: "var(--color-ivory)",
              border: "2px solid var(--color-gold)",
            }}
          >
            <img
              src={currentMenu.images[0].url}
              alt={`${currentMenu.title} - First page`}
              className="w-full h-full object-contain"
              style={{ backgroundColor: "var(--color-warm-gray)" }}
            />
          </div>

          {/* Menu Info */}
          <div className="mb-4">
            <h4
              className="flex justify-center font-medium"
              style={{ color: "var(--color-sepia)" }}
            >
              Title:{" "}
              <p
                className="font-medium italic ml-2"
                style={{ color: "var(--color-burgundy)" }}
              >
                {currentMenu.title}
              </p>
            </h4>
            <p
              className="text-sm underline"
              style={{ color: "var(--color-sepia)" }}
            >
              Date: {currentMenu.fullDate}
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-sepia)", opacity: 0.7 }}
            >
              {currentMenu.images.length} page
              {currentMenu.images.length > 1 ? "s" : ""}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-2">
            <button
              onClick={handlePrevMenu}
              disabled={currentMenuIndex === 0}
              className="flex-1 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{
                backgroundColor: "var(--color-cream)",
                color: "var(--color-sepia)",
                border: "2px solid var(--color-sepia)",
              }}
            >
              ← Previous
            </button>
            <button
              onClick={handleViewMenu}
              className="flex-1 px-4 py-2 rounded transition-all"
              style={{
                backgroundColor: "var(--color-burgundy)",
                color: "var(--color-ivory)",
                border: "2px solid var(--color-burgundy)",
              }}
            >
              View all pages
            </button>
            <button
              onClick={handleNextMenu}
              disabled={currentMenuIndex === displayedMenus.length - 1}
              className="flex-1 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{
                backgroundColor: "var(--color-cream)",
                color: "var(--color-sepia)",
                border: "2px solid var(--color-sepia)",
              }}
            >
              Next →
            </button>
          </div>

          {/* Menu Counter */}
          <div
            className="text-center text-base mt-2 underline"
            style={{ color: "var(--color-sepia)" }}
          >
            Menu {currentMenuIndex + 1} of {displayedMenus.length}
          </div>
        </div>
      )}

      {/* View Mode */}
      {viewMode === "view" && (
        <div>
          {/* Full Page View */}
          <div
            className="rounded overflow-hidden mb-4 h-96"
            style={{
              backgroundColor: "var(--color-ivory)",
              border: "2px solid var(--color-gold)",
            }}
          >
            <img
              src={currentMenu.images[currentPageIndex].url}
              alt={`${currentMenu.title} - Page ${currentPageIndex + 1}`}
              className="w-full h-full object-contain"
              style={{ backgroundColor: "var(--color-warm-gray)" }}
            />
          </div>

          {/* Page Info */}
          <div className="mb-4">
            <h4 className="font-medium" style={{ color: "var(--color-sepia)" }}>
              Title:{" "}
              <p
                className="font-medium italic"
                style={{ color: "var(--color-burgundy)" }}
              >
                {currentMenu.title}
              </p>
            </h4>
            <p className="text-sm" style={{ color: "var(--color-sepia)" }}>
              Date: {currentMenu.fullDate}
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-sepia)", opacity: 0.7 }}
            >
              Page {currentPageIndex + 1} of {currentMenu.images.length}
            </p>
          </div>

          {/* Page Navigation */}
          <div className="flex gap-2 mb-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPageIndex === 0}
              className="flex-1 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{
                backgroundColor: "var(--color-cream)",
                color: "var(--color-sepia)",
                border: "2px solid var(--color-sepia)",
              }}
            >
              ← Previous Page
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPageIndex === currentMenu.images.length - 1}
              className="flex-1 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{
                backgroundColor: "var(--color-cream)",
                color: "var(--color-sepia)",
                border: "2px solid var(--color-sepia)",
              }}
            >
              Next Page →
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={handleCloseView}
            className="w-full px-4 py-2 rounded transition-all"
            style={{
              backgroundColor: "var(--color-burgundy)",
              color: "var(--color-ivory)",
              border: "2px solid var(--color-burgundy)",
            }}
          >
            Close & Browse Other Menus
          </button>
        </div>
      )}
    </div>
  );
}
