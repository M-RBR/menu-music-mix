import { useState, useRef, useEffect } from "react";
import { parseMusicData } from "../utils/musicData";

export default function MusicPlayer() {
  const [songs] = useState(() => parseMusicData());
  const [filter, setFilter] = useState("all");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const filteredSongs =
    filter === "all" ? songs : songs.filter((song) => song.category === filter);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const playTrack = (song, track) => {
    const trackKey = `${song.ppn}-${track.side}`;

    if (currentTrack === trackKey && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      setCurrentTrack(trackKey);
      if (audioRef.current) {
        audioRef.current.src = track.url;
        audioRef.current.play();
      }
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === "all"
              ? "bg-green-600 text-black"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          All ({songs.length})
        </button>
        <button
          onClick={() => setFilter("vocal")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === "vocal"
              ? "bg-green-600 text-black"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          Vocal ({songs.filter((s) => s.category === "vocal").length})
        </button>
        <button
          onClick={() => setFilter("instrumental")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === "instrumental"
              ? "bg-green-600 text-black"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          Instrumental (
          {songs.filter((s) => s.category === "instrumental").length})
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto space-y-2">
        {filteredSongs.map((song) => (
          <div
            key={song.ppn}
            className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{song.title}</h4>
                <p className="text-sm text-gray-600">{song.date}</p>
                {song.notes && (
                  <p className="text-xs text-gray-500 mt-1">{song.notes}</p>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                {song.tracks.map((track) => {
                  const trackKey = `${song.ppn}-${track.side}`;
                  const isCurrentTrack = currentTrack === trackKey;

                  return (
                    <button
                      key={track.side}
                      onClick={() => playTrack(song, track)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        isCurrentTrack && isPlaying
                          ? "bg-green-600 text-black"
                          : "bg-gray-200 text-black hover:bg-gray-300"
                      }`}
                      title={`Play side ${track.side}`}
                    >
                      {isCurrentTrack && isPlaying ? "⏸" : "▶"} {track.side}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
}
