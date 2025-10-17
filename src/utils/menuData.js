// Import all metadata files
const metadataFiles = import.meta.glob(
  "../assets/Historical Menus/*/SBB_Metadaten.txt",
  { eager: true, query: "?raw", import: "default" }
);

// Import all .jpg files
const imageFiles = import.meta.glob("../assets/Historical Menus/*/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

export function parseMenuData() {
  const menus = [];

  for (const [path, content] of Object.entries(metadataFiles)) {
    const ppnMatch = path.match(/PPN(\w+)/);
    if (!ppnMatch) continue;

    const ppn = `PPN${ppnMatch[1]}`;
    const lines = content.split("\n");

    const metadata = {};
    lines.forEach((line) => {
      const [key, ...valueParts] = line.split(":");
      if (key && valueParts.length > 0) {
        metadata[key.trim()] = valueParts.join(":").trim();
      }
    });

    const title = metadata["Titel"] || "Menükarte";
    const yearMatch = metadata["Erscheinungsjahr"]?.match(/(\d{4})/);
    const year = yearMatch ? yearMatch[1] : "Unknown";
    const fullDate = metadata["Erscheinungsjahr"] || "Unknown";
    const location = metadata["Ort"] || "";
    const pageCount = parseInt(metadata["Umfang"]) || 0;

    // Get all image files for this PPN
    const images = [];
    for (const [imgPath, imgUrl] of Object.entries(imageFiles)) {
      if (imgPath.includes(ppn)) {
        const fileMatch = imgPath.match(/(\d{8})\.jpg/);
        if (fileMatch) {
          images.push({
            filename: fileMatch[0],
            number: fileMatch[1],
            url: imgUrl,
          });
        }
      }
    }

    // Sort images by number
    images.sort((a, b) => a.number.localeCompare(b.number));

    if (images.length > 0) {
      menus.push({
        ppn,
        title,
        year,
        fullDate,
        location,
        pageCount,
        images,
      });
    }
  }

  // Sort by year (oldest first)
  menus.sort((a, b) => {
    if (a.year === "Unknown") return 1;
    if (b.year === "Unknown") return -1;
    return a.year.localeCompare(b.year);
  });

  return menus;
}

export function getMenusByYear() {
  const menus = parseMenuData();
  const byYear = {};

  menus.forEach((menu) => {
    if (!byYear[menu.year]) {
      byYear[menu.year] = [];
    }
    byYear[menu.year].push(menu);
  });

  return byYear;
}

export function getYears() {
  const menusByYear = getMenusByYear();
  return Object.keys(menusByYear)
    .filter((year) => year !== "Unknown")
    .sort((a, b) => a.localeCompare(b));
}
