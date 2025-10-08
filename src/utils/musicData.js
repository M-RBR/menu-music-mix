import metadataCSV from "../assets/metadata_pre_1915.csv?raw";

// PPNs in the vocal folder based on actual folder structure
const vocalPPNs = [
  "1869130650",
  "1869139445",
  "1869140095",
  "1869141725",
  "1870612396",
  "1870612663",
  "1870689097",
  "1870691903",
  "1870692586",
  "1870692918",
  "1870694074",
  "1870694287",
  "1870761863",
  "1870762614",
  "1914588142",
  "1914898214",
  "191490110X",
  "1915476321",
  "1915478553",
  "1915478944",
  "1915481643",
  "1915493382",
  "1915785243",
  "1915787300",
  "1916013554",
  "1916013899",
];

export function parseMusicData() {
  const lines = metadataCSV.split("\n").filter((line) => line.trim());
  const songs = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    const match = line.match(/^"?(\d+),(?:"")?([^,]*?)(?:"")?,(.*)/);
    if (!match) continue;

    const ppn = match[1];
    const title = match[2]
      .replace(/�_/g, "ü")
      .replace(/��/g, "ß")
      .replace(/̦/g, "ö")
      .replace(/�/g, "ä");
    const restOfLine = match[3];

    const creatorMatch = restOfLine.match(/""([^"]*?)\s*\(KomponistIn\)/);
    const composer = creatorMatch ? creatorMatch[1] : "Unknown";

    const dateMatch = restOfLine.match(
      /\[(\d{4}|\d{4}\?|zwischen \d{4} und \d{4}|um \d{4}\?|ca\. \d{4}|nach \d{4})\]/
    );
    const date = dateMatch ? dateMatch[1] : "Unknown";

    const notesMatch = restOfLine.match(/Notes,([^,]*),SPL/);
    const notes = notesMatch ? notesMatch[1] : "";

    // Determine category based on actual folder structure
    const category = vocalPPNs.includes(ppn) ? "vocal" : "instrumental";

    songs.push({
      ppn,
      title: title || "Untitled",
      composer,
      date,
      category,
      notes,
      tracks: [
        {
          side: "A",
          url: `/src/assets/mp3/${category}/${ppn}/00000003.mp3`,
        },
        {
          side: "B",
          url: `/src/assets/mp3/${category}/${ppn}/00000004.mp3`,
        },
      ],
    });
  }

  return songs;
}

export function getSongsByCategory(category) {
  const allSongs = parseMusicData();
  if (category === "all") return allSongs;
  return allSongs.filter((song) => song.category === category);
}
