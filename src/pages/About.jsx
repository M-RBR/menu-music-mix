import { ArrowLeft } from "lucide-react";
import ViewofBerlin1910 from "../assets/About page image/00000001.jpg";

export default function About({ onBack }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-2xl border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            About this website
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* About Content */}
          <div className="space-y-6">
            <section>
              <p className="text-gray-700 leading-relaxed">
                Menu-Music-Mix is an interactive digital archive that brings
                together two aspects of Berlin's cultural history from 1900 to
                1914: historical menu cards and shellac music recordings. This
                website allows you to explore the tastes and sounds of early
                20th-century Berlin in an engaging way.{" "}
                <p className="text-gray-700 leading-relaxed mt-3">
                  This website was developed as part of{" "}
                  <a
                    href="https://lab.sbb.berlin/culture-explore-data/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline italic"
                  >
                    culture.explore(data): An Open Cultural Data Hackathon
                  </a>
                  , which took place at the Staatsbibliothek zu Berlin on 7–8
                  October 2025.
                </p>
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                The Concept
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Our interdisciplinary team, comprising experts in data science,
                history, digital humanities, web development, and graphic
                design, chose to examine two seemingly disparate datasets rather
                than focusing on a single one. The objective was to identify
                conceptual and historical connections between them. This
                approach led to a comparative analysis of menus and songs in
                German produced in Berlin between 1900 and 1914.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                The website presents a curated selection of static data that was
                cleaned, processed, and analyzed during the hackathon. Its
                primary aim is to make this material accessible to a broader
                audience and to facilitate further research into Berlin’s
                cultural and social history during the early twentieth century.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Dataset 1: Historical Menu Cards
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                The menu card collection features 2,403 digitized historical
                menus from the Berlin State Library's{" "}
                <span className="italic">Menükarten-Sammlung</span>, spanning
                from approximately 1880 to 1913. These cards offer a rich visual
                and cultural archive of dining culture across Europe during the
                late 19th and early 20th centuries.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The collection includes menus from royal and imperial courts,
                luxury hotels, transatlantic cruise ships, and major public
                events. Each menu card provides insights into social hierarchy,
                culinary trends, and the rise of the modern service economy.
              </p>
              <p className="text-sm text-gray-600 mt-3">
                Source:{" "}
                <a
                  href="https://lab.sbb.berlin/on-the-menu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Berlin State Library - On the Menu
                </a>
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Dataset 2: Echoes of Berlin: 78s
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                The music collection presents 110 digitized shellac records
                featuring music primarily by Paul Lincke, a key composer in the
                development of Berlin operetta. These recordings, made between
                the 1900s and 1940s, capture the vibrant musical culture of the
                era in short, catchy pieces.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From iconic numbers like{" "}
                <span className="italic">Das macht die Berliner Luft</span> to
                lesser-known excerpts, these recordings offer a window into
                early 20th-century Berlin's performance practices,
                instrumentation, and popular musical tastes.
              </p>
              <p className="text-sm text-gray-600 mt-3">
                Source:{" "}
                <a
                  href="https://lab.sbb.berlin/echoes-of-berlin-78s/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Berlin State Library - Echoes of Berlin: 78s
                </a>
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Technical Information
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                This website is built with React and TailwindCSS, featuring
                custom TIF image decoding for displaying historical menu scans
                and an integrated audio player for the shellac recordings.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  Interactive browsing of historical menus by year and date
                </li>
                <li>
                  Filterable music player with vocal and instrumental categories
                </li>
                <li>Multiple pages per menu with easy navigation</li>
                <li>Dual-sided shellac record playback (Side A & B)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Licenses & Credits
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Music Recordings:</strong> CC BY-SA 4.0
              </p>
              <p className="text-gray-700 leading-relaxed">
                All materials are provided by the
                <strong>
                  {" "}
                  Staatsbibliothek zu Berlin – Preußischer Kulturbesitz
                </strong>{" "}
                (Berlin State Library).
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Contributers
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Bishnu Prashad Bhatta, Timothée Garnault, Tanmayee Mulay,
                Angelina Riemann, Maxim Roozen, Ruth Sander, Media Younis
              </p>
            </section>

            <section>
              {/* Centered image */}
              <div className="flex justify-center mb-4">
                <img
                  src={ViewofBerlin1910}
                  alt="Historical view of Berlin from 1910"
                  className="rounded-lg shadow-md max-w-full h-auto"
                />
              </div>

              {/* Image description and link */}
              <p className="text-gray-700 leading-relaxed text-center mb-3">
                View of Berlin in 1910 (from the dataset{" "}
                <a
                  href="https://lab.sbb.berlin/views-of-berlin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline italic"
                >
                  Views of Berlin
                </a>
                )
              </p>
            </section>

            {/* Back Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Main Page
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
