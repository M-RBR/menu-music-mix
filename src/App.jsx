import "./App.css";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            MENU MUSIC MIX
          </h1>
          <p className="text-center text-gray-600 mt-2 italic">
            Historical Menu Cards & Berlin 78s • 1900-1914
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Menu Cards */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Historical Menu Cards
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Explore 2,403 historical menu cards from the Berlin State Library,
              spanning from 1880 to 1913. Discover dining culture across Europe
              during the late 19th and early 20th centuries.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-gray-900 mb-2">
                Collection Highlights
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Royal and imperial courts</li>
                <li>• Luxury hotels and cruise ships</li>
                <li>• Private celebrations and public events</li>
                <li>• Multilingual content (German, French, English)</li>
              </ul>
            </div>
            <div className="text-center">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Browse Menu Cards
              </button>
            </div>
          </section>

          {/* Right Section - Music */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Echoes of Berlin: 78s
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Experience early 20th-century Berlin through digitized shellac
              records featuring music by Paul Lincke and other composers. Short,
              catchy pieces that capture the musical culture of the era.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-4">
                Musical Highlights
              </h3>
              <MusicPlayer />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
