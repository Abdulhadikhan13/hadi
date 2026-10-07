import React from 'react';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../data/initialData';
import { JewelleryImage } from './JewelleryImage';

interface ProductCardProps {
  product: Product;
  showRating?: boolean;
  highlightNew?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showRating = true,
  highlightNew = false,
}) => {
  const {
    openProductDetails,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const wishlisted = isInWishlist(product.id);
  const discountedFinalPrice = product.discount
    ? Math.round(product.finalPrice * (1 - product.discount / 100))
    : product.finalPrice;

  return (
    <article className="group bg-[#FBFBF9] border border-[#E5DFD3] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#C59B27]/70">
      {/* Top Image Container (4:3 ratio) */}
      <div className="relative aspect-4/3 w-full bg-[#F4F1EA] overflow-hidden">
        <button
          type="button"
          onClick={() => openProductDetails(product.id)}
          className="w-full h-full block text-left focus-visible:outline-none"
        >
          <JewelleryImage
            src={product.images[0]}
            alt={product.name}
            subtitle={`${product.goldPurity} Gold · ${product.netWeight}g`}
            className="w-full h-full"
            imgClassName="group-hover:scale-105 transition-transform duration-300"
          />
        </button>

        {/* Maximum 1 subtle text tag on top-left corner */}
        {(highlightNew || product.isNew) ? (
          <span className="absolute top-3 left-3 bg-[#141413]/90 text-[#FBFBF9] px-2.5 py-1 text-[11px] font-medium tracking-wider">
            NEW
          </span>
        ) : product.discount ? (
          <span className="absolute top-3 left-3 bg-[#B8860B] text-white px-2.5 py-1 text-[11px] font-medium tracking-wider tabular-nums">
            {product.discount}% OFF
          </span>
        ) : null}

        {/* Top-right Wishlist Heart Icon */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className="absolute top-3 right-3 w-9 h-9 bg-[#FBFBF9]/90 backdrop-blur-xs border border-[#E5DFD3] flex items-center justify-center text-[#141413] hover:border-[#B8860B] transition-transform duration-150 active:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? 'fill-[#B8860B] text-[#B8860B]' : 'text-[#141413]'
            }`}
          />
        </button>

        {/* Quick View overlay button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex justify-end pointer-events-none">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="pointer-events-auto px-3 py-1.5 bg-[#FBFBF9]/95 text-[#141413] border border-[#D8D0C1] text-xs font-medium flex items-center gap-1.5 hover:border-[#141413] transition-colors whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information & Actions */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean unboxed metadata with typographic separators */}
          <div className="flex items-center justify-between gap-2 text-xs text-[#6E6A63] font-mono tabular-nums">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-[#9A6F0A] font-medium">{product.goldPurity} Gold</span>
              <span aria-hidden="true">·</span>
              <span>{product.netWeight}g Net</span>
              <span aria-hidden="true">·</span>
              <span className="font-sans truncate">{product.category}</span>
            </div>
            {showRating && (
              <span className="shrink-0 text-[#4A4740]">
                ★ {product.rating.toFixed(1)} ({product.reviews})
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="mt-2 font-serif text-xl font-semibold text-[#141413] leading-snug">
            <button
              type="button"
              onClick={() => openProductDetails(product.id)}
              className="text-left hover:text-[#B8860B] transition-colors line-clamp-1"
            >
              {product.name}
            </button>
          </h3>
        </div>

        <div className="mt-4 pt-3.5 border-t border-[#EFECE4] flex items-center justify-between gap-3">
          <div className="font-mono tabular-nums">
            <div className="text-base font-semibold text-[#141413]">
              {formatINR(discountedFinalPrice)}
            </div>
            {product.discount ? (
              <div className="text-xs text-[#8A8479] line-through">
                {formatINR(product.finalPrice)}
              </div>
            ) : (
              <div className="text-[11px] font-sans text-[#6E6A63]">
                Incl. making & 3% GST
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setQuickViewProduct(product)}
              aria-label="Quick View"
              className="sm:hidden w-9 h-9 border border-[#D8D0C1] flex items-center justify-center text-[#141413] hover:border-[#141413] transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => addToCart(product.id, 1, product.sizes[0], true)}
              className="px-3.5 py-2 bg-[#141413] text-[#FBFBF9] text-xs font-medium tracking-wider hover:bg-[#B8860B] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
