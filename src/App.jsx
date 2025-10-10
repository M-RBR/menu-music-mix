import "./App.css";
import MusicPlayer from "./components/MusicPlayer";
import MenuViewer from "./components/MenuViewer";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-2xl border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            MENU-MUSIC-MIX
          </h1>
          <p className="text-center text-gray-600 mt-2 text-lg italic">
            Views of Berlin in the year 1900-1914 through two datasets
          </p>
          <p className="text-center text-gray-800 text-sm mt-3">
            About this website
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Menu Cards */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Historical Menu Cards
              </h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <MenuViewer />
            </div>
          </section>

          {/* Right Section - Music */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Echoes of Berlin: 78s
              </h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <MusicPlayer />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
