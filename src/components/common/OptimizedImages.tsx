// src/components/common/OptimizedImage.tsx
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  sizes?: string;
}

const OptimizedImage = ({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className,
  objectFit = "cover",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Handle Contentful image URL optimization
  const optimizedSrc = src.includes("images.ctfassets.net")
    ? `${src}?w=${width}&h=${height}&q=85&fm=webp`
    : src;

  if (hasError) {
    return (
      <div
        className={cn(
          "bg-gray-100 flex items-center justify-center",
          className
        )}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={cn(
          "duration-700 ease-in-out",
          isLoading
            ? "scale-110 blur-2xl grayscale"
            : "scale-100 blur-0 grayscale-0",
          objectFit === "cover" && "object-cover",
          objectFit === "contain" && "object-contain"
        )}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default OptimizedImage;
