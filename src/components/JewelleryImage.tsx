import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface JewelleryImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  enableZoom?: boolean;
  subtitle?: string;
}

export const JewelleryImage: React.FC<JewelleryImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  enableZoom = false,
  subtitle,
}) => {
  const [hasError, setHasError] = useState(false);
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableZoom) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#F4F1EA] via-[#EFEAE0] to-[#E6DFD1] flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
      >
        <div className="w-16 h-16 rounded-full border border-[#C59B27]/40 flex items-center justify-center mb-3 bg-[#FBFBF9]/60">
          <Sparkles className="w-6 h-6 text-[#B8860B]" />
        </div>
        <p className="font-serif text-base font-semibold text-[#141413] tracking-wide max-w-[200px]">
          {alt}
        </p>
        {subtitle && (
          <p className="text-xs text-[#6E6A63] mt-1 tracking-wider">{subtitle}</p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-[#F4F1EA] ${
        enableZoom ? 'cursor-zoom-in' : ''
      } ${className}`}
      onMouseEnter={() => enableZoom && setZoomActive(true)}
      onMouseLeave={() => enableZoom && setZoomActive(false)}
      onMouseMove={handleMouseMove}
      onClick={() => enableZoom && setZoomActive((z) => !z)}
    >
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        style={
          enableZoom && zoomActive
            ? {
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                transform: 'scale(1.85)',
              }
            : undefined
        }
        className={`w-full h-full object-cover transition-transform duration-200 ease-out ${imgClassName}`}
      />
    </div>
  );
};
