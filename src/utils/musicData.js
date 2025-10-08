import metadataCSV from "../assets/metadata_pre_1915.csv?raw";

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

    const isVocal =
      notes.toLowerCase().includes("vocal") ||
      notes.toLowerCase().includes("soprano") ||
      notes.toLowerCase().includes("tenor") ||
      notes.toLowerCase().includes("duet") ||
      notes.toLowerCase().includes("comic") ||
      notes.toLowerCase().includes("gesang");

    const category = isVocal ? "vocals" : "instrumental";

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
