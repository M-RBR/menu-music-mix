import { useEffect, useRef, useState } from "react";
import UTIF from "utif";

export default function TifImage({ src, alt, className }) {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!src) return;

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const loadAndDecodeTif = async () => {
      try {
        // Fetch the TIF file
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`Failed to load image: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();

        // Decode the TIF using UTIF
        const ifds = UTIF.decode(arrayBuffer);
        if (!ifds || ifds.length === 0) {
          throw new Error("No image data found in TIF file");
        }

        // Decode the first image page
        UTIF.decodeImage(arrayBuffer, ifds[0]);
        const firstPage = ifds[0];

        // Create RGBA data
        const rgba = UTIF.toRGBA8(firstPage);

        if (!isMounted) return;

        // Draw to canvas
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = firstPage.width;
        canvas.height = firstPage.height;

        const ctx = canvas.getContext("2d");
        const imageData = ctx.createImageData(
          firstPage.width,
          firstPage.height
        );
        imageData.data.set(rgba);
        ctx.putImageData(imageData, 0, 0);

        setIsLoading(false);
      } catch (err) {
        console.error("Error loading TIF image:", err);
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    loadAndDecodeTif();

    return () => {
      isMounted = false;
    };
  }, [src]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
      >
        <div className="text-center p-4">
          <p className="text-red-600 text-sm">Failed to load image</p>
          <p className="text-gray-500 text-xs mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-sm mt-2">Loading image...</p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-contain ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity`}
        aria-label={alt}
      />
    </div>
  );
}
