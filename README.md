# Menu-Music-Mix

A React web application that presents two interconnected datasets from the Berlin State Library: historical menu cards and early 20th-century shellac music recordings. Built during the culture.explore(data) hackathon at the Staatsbibliothek zu Berlin.

## Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Styling**: TailwindCSS 4.1.14
- **Image Processing**: Sharp (for TIF to JPG conversion)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Project Structure

```
src/
├── assets/
│   ├── Historical Menus/    # Menu card images (JPG) and metadata
│   ├── mp3/                  # Audio files (vocal/instrumental)
│   └── metadata_pre_1915.csv # Music metadata
├── components/
│   ├── MenuViewer.jsx        # Menu card browser with year filtering
│   └── MusicPlayer.jsx       # Audio player with category filtering
├── pages/
│   ├── Home.jsx              # Main application page
│   └── About.jsx             # Project information and credits
├── utils/
│   ├── menuData.js           # Menu data parsing and organization
│   └── musicData.js          # Music metadata parsing and MP3 imports
└── App.jsx                   # Main app with page routing
```

## Key Features

### Historical Menu Cards

- **Digitized menu cards** from Berlin State Library's Menükarten-Sammlung
- Browse by year with dropdown filtering
- Two-mode viewing:
  - **Browse mode**: Preview first page, navigate between menus
  - **View mode**: Full page-by-page navigation for each menu
- Chronological navigation with Previous/Next controls
- Metadata display: title, date, page count

### Music Collection

- **35 shellac recordings** (70 sides) from 1900-1914
- Categorized as vocal (26) or instrumental (8)
- Dual-sided playback (Side A & B) mimicking physical records
- Filter by category (All/Vocal/Instrumental)
- Metadata display: title, date
- Active track indication with play/pause controls

## Technical Highlights

### Image Processing: TIF to JPG Conversion

**Challenge**: Historical menu scans were provided as `.tif` files, which have poor browser support.

**Solution**: Pre-build conversion using Sharp library

```bash
npm install sharp --save-dev
node convert-tif-to-jpg.js  # Batch converted 213 TIF files to JPG
```

**Benefits**:

- Universal browser support (JPG)
- Smaller file sizes (~90% quality with MozJPEG)
- Faster loading times
- No client-side decoding overhead

**Implementation**: Updated `menuData.js` to use `import.meta.glob` for JPG files:

```javascript
const imageFiles = import.meta.glob("../assets/Historical Menus/*/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});
```

### Audio File Handling: Development vs Production

**Challenge**: MP3 files worked locally but failed on Vercel deployment with error:

```
NotSupportedError: Failed to load because no supported source was found
```

**Root Cause**: Hardcoded paths (`/src/assets/mp3/...`) don't exist in production builds.

**Solution**: Use Vite's `import.meta.glob` for proper asset bundling:

```javascript
const mp3Files = import.meta.glob("../assets/mp3/**/*.mp3", {
  eager: true,
  query: "?url",
  import: "default",
});
```

**How it works**:

1. **Development**: Vite dev server resolves imports dynamically
2. **Production**: Vite processes assets during build, generating hashed filenames
3. **Import.meta.glob**: Ensures Vite tracks and bundles all MP3 files
4. **Result**: Correct URLs in both environments

### Data Organization

**Menu Cards**:

- Metadata extracted from `SBB_Metadaten.txt` files per menu
- Organized by PPN (unique identifier)
- Grouped by year with chronological sorting
- Images linked via glob pattern matching

**Music**:

- CSV metadata parsing with character encoding fixes (German umlauts)
- Manual categorization based on folder structure (vocal/instrumental)
- Dual-track structure (00000003.mp3 = Side A, 00000004.mp3 = Side B)
- Chronological sorting by recording date

### State Management

- **Client-side routing**: Simple state-based navigation (Home ↔ About)
- **Menu state**: Year filter, current menu index, view mode (browse/view), page index
- **Music state**: Category filter, current track, play/pause state
- **Audio reference**: React `useRef` for HTML5 audio element control

### Responsive Design

- **Mobile-first**: TailwindCSS utility classes
- **Breakpoints**: Single column on mobile, two-column grid on desktop (`lg:grid-cols-2`)
- **Flexbox layouts**: Equal-height sections with `flex-col` and `flex-1`
- **Scrollable content**: Overflow handling for long lists and menu pages

## Installation

```bash
# Clone repository
git clone [repository-url]
cd menu-music-mix

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development Scripts

```bash
npm run dev      # Start Vite dev server (http://localhost:5173)
npm run build    # Build for production (output: dist/)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## Asset Processing

### Converting TIF Images (if needed)

```bash
npm install sharp --save-dev
# Create convert script and run batch conversion
node convert-tif-to-jpg.js
```

### Audio File Structure

```
src/assets/mp3/
├── vocal/
│   ├── [PPN]/
│   │   ├── 00000003.mp3  # Side A
│   │   └── 00000004.mp3  # Side B
└── instrumental/
    └── [PPN]/
        ├── 00000003.mp3
        └── 00000004.mp3
```

## Data Sources

- **Menu Cards**: [Berlin State Library - On the Menu](https://lab.sbb.berlin/on-the-menu/)

  - License: CC BY 4.0 International
  - Format: JPG images + metadata (TXT)

- **Music**: [Berlin State Library - Echoes of Berlin: 78s](https://lab.sbb.berlin/echoes-of-berlin-78s/)
  - License: CC BY-SA 4.0
  - Format: MP3 audio + metadata (CSV)

## Contributing

This project was created during a hackathon. For questions or contributions, please contact the team members listed in the About page.

## License


## Acknowledgments

- **Staatsbibliothek zu Berlin – Preußischer Kulturbesitz** for providing the datasets
- **culture.explore(data)** hackathon organizers
