import { useState, useEffect } from "react";
import { parseMenuData, getMenusByYear, getYears } from "../utils/menuData";
import TifImage from "./TifImage";

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
      <div className="text-center text-gray-500 py-8">
        No menus available for this selection
      </div>
    );
  }

  return (
    <div>
      {/* Year Filter */}
      <div className="mb-4">
        <label className="block text-base font-medium text-gray-900 mb-2">
          Filter by Year:
        </label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Years ({allMenus.length} menus)</option>
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
          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mb-4 h-64">
            <TifImage
              src={currentMenu.images[0].url}
              alt={`${currentMenu.title} - First page`}
              className="w-full h-full bg-gray-50"
            />
          </div>

          {/* Menu Info */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-900">
              Title:{" "}
              <p className="font-medium text-gray-900 italic">
                {currentMenu.title}
              </p>
            </h4>
            <p className="text-sm text-gray-600">
              Date: {currentMenu.fullDate}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {currentMenu.images.length} page
              {currentMenu.images.length > 1 ? "s" : ""}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-2">
            <button
              onClick={handlePrevMenu}
              disabled={currentMenuIndex === 0}
              className="flex-1 px-4 py-2 bg-gray-200 text-black border border-black rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>
            <button
              onClick={handleViewMenu}
              className="flex-1 px-4 py-2 bg-blue-600 text-black border border-black rounded-lg hover:bg-blue-700 transition-colors"
            >
              View all pages of this menu
            </button>
            <button
              onClick={handleNextMenu}
              disabled={currentMenuIndex === displayedMenus.length - 1}
              className="flex-1 px-4 py-2 bg-gray-200 text-black border border-black rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>

          {/* Menu Counter */}
          <div className="text-center text-sm text-gray-500 mt-2 underline">
            Menu {currentMenuIndex + 1} of {displayedMenus.length}
          </div>
        </div>
      )}

      {/* View Mode */}
      {viewMode === "view" && (
        <div>
          {/* Full Page View */}
          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mb-4 h-96">
            <TifImage
              src={currentMenu.images[currentPageIndex].url}
              alt={`${currentMenu.title} - Page ${currentPageIndex + 1}`}
              className="w-full h-full bg-gray-50"
            />
          </div>

          {/* Page Info */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-900">
              Title:{" "}
              <p className="font-medium text-gray-900 italic">
                {currentMenu.title}
              </p>
            </h4>
            <p className="text-sm text-gray-600">
              Date: {currentMenu.fullDate}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Page {currentPageIndex + 1} of {currentMenu.images.length}
            </p>
          </div>

          {/* Page Navigation */}
          <div className="flex gap-2 mb-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPageIndex === 0}
              className="flex-1 px-4 py-2 bg-gray-200 text-black border border-black rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous Page
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPageIndex === currentMenu.images.length - 1}
              className="flex-1 px-4 py-2 bg-gray-200 text-black border border-black rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next Page →
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={handleCloseView}
            className="w-full px-4 py-2 bg-blue-600 text-black border border-black rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close & Browse Other Menus
          </button>
        </div>
      )}
    </div>
  );
}
