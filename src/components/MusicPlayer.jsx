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
    <div className="flex flex-col h-full">
      <div className="flex gap-4 mb-4 justify-center flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className="px-4 py-2 border rounded transition-all"
          style={
            filter === "all"
              ? {
                  backgroundColor: "var(--color-burgundy)",
                  color: "var(--color-ivory)",
                  border: "2px solid var(--color-burgundy)",
                }
              : {
                  backgroundColor: "var(--color-cream)",
                  color: "var(--color-sepia)",
                  border: "2px solid var(--color-sepia)",
                }
          }
        >
          All ({songs.length})
        </button>
        <button
          onClick={() => setFilter("vocal")}
          className="px-4 py-2 border rounded transition-all"
          style={
            filter === "vocal"
              ? {
                  backgroundColor: "var(--color-burgundy)",
                  color: "var(--color-ivory)",
                  border: "2px solid var(--color-burgundy)",
                }
              : {
                  backgroundColor: "var(--color-cream)",
                  color: "var(--color-sepia)",
                  border: "2px solid var(--color-sepia)",
                }
          }
        >
          Vocal ({songs.filter((s) => s.category === "vocal").length})
        </button>
        <button
          onClick={() => setFilter("instrumental")}
          className="px-4 py-2 border rounded transition-all"
          style={
            filter === "instrumental"
              ? {
                  backgroundColor: "var(--color-burgundy)",
                  color: "var(--color-ivory)",
                  border: "2px solid var(--color-burgundy)",
                }
              : {
                  backgroundColor: "var(--color-cream)",
                  color: "var(--color-sepia)",
                  border: "2px solid var(--color-sepia)",
                }
          }
        >
          Instrumental (
          {songs.filter((s) => s.category === "instrumental").length})
        </button>
      </div>

      <div className="flex-1 max-h-96 overflow-y-auto space-y-2">
        {filteredSongs.map((song) => (
          <div
            key={song.ppn}
            className="rounded p-3 transition-all"
            style={{
              border: "2px solid var(--color-border)",
              backgroundColor: "var(--color-ivory)",
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4
                  className="font-medium"
                  style={{ color: "var(--color-sepia)" }}
                >
                  {song.title}
                </h4>
                <p
                  className="text-sm italic"
                  style={{ color: "var(--color-sepia)", opacity: 0.8 }}
                >
                  Date: {song.date}
                </p>
                {song.notes && (
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--color-sepia)", opacity: 0.7 }}
                  >
                    {song.notes}
                  </p>
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
                      className="px-3 py-1 rounded text-sm font-medium transition-all"
                      style={
                        isCurrentTrack && isPlaying
                          ? {
                              backgroundColor: "var(--color-teal)",
                              color: "var(--color-ivory)",
                              border: "2px solid var(--color-teal)",
                            }
                          : {
                              backgroundColor: "var(--color-cream)",
                              color: "var(--color-sepia)",
                              border: "2px solid var(--color-sepia)",
                            }
                      }
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
