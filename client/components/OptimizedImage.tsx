import { useState, ImgHTMLAttributes } from "react";
import { ImageOff } from "lucide-react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  onError?: () => void;
}

const DEFAULT_FALLBACK = "/placeholder.svg";

export const OptimizedImage = ({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  className = "",
  onError,
  ...props
}: OptimizedImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
    onError?.();
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (isError) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <ImageOff className="w-8 h-8" />
          <span className="text-xs">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div
          className={`absolute inset-0 bg-gray-100 animate-pulse ${className}`}
        />
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </>
  );
};
