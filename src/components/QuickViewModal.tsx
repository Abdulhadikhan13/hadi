import React, { useState } from 'react';
import { Heart, ShoppingBag, X, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../data/initialData';
import { JewelleryImage } from './JewelleryImage';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openProductDetails,
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  if (!quickViewProduct) return null;

  const activeSize = selectedSize || quickViewProduct.sizes[0] || 'Standard';
  const wishlisted = isInWishlist(quickViewProduct.id);
  const discountedFinal = quickViewProduct.discount
    ? Math.round(quickViewProduct.finalPrice * (1 - quickViewProduct.discount / 100))
    : quickViewProduct.finalPrice;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view ${quickViewProduct.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div
        className="fixed inset-0"
        onClick={() => setQuickViewProduct(null)}
      />
      <div className="relative z-10 w-full max-w-3xl bg-[#FBFBF9] border border-[#E5DFD3] grid grid-cols-1 md:grid-cols-2 overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close Quick View"
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-[#FBFBF9]/90 border border-[#D8D0C1] flex items-center justify-center text-[#141413] hover:border-[#141413]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Image */}
        <div className="bg-[#F4F1EA] aspect-square md:aspect-auto h-full">
          <JewelleryImage
            src={quickViewProduct.images[0]}
            alt={quickViewProduct.name}
            className="w-full h-full min-h-[280px]"
          />
        </div>

        {/* Right Details */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6E6A63] font-mono tabular-nums">
              <span className="text-[#9A6F0A] font-medium">
                {quickViewProduct.goldPurity} Gold
              </span>
              <span aria-hidden="true">·</span>
              <span>{quickViewProduct.netWeight}g Net</span>
              <span aria-hidden="true">·</span>
              <span>{quickViewProduct.productCode}</span>
            </div>

            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#141413]">
              {quickViewProduct.name}
            </h2>

            <div className="mt-3 flex items-baseline gap-3 font-mono tabular-nums">
              <span className="text-2xl font-semibold text-[#141413]">
                {formatINR(discountedFinal)}
              </span>
              {quickViewProduct.discount && (
                <span className="text-sm text-[#8A8479] line-through">
                  {formatINR(quickViewProduct.finalPrice)}
                </span>
              )}
            </div>
            <p className="text-xs text-[#6E6A63] mt-1">
              Includes Base Gold ({formatINR(quickViewProduct.price)}), Making Charges (
              {formatINR(quickViewProduct.makingCharges)}) & 3% GST ({formatINR(quickViewProduct.gst)})
            </p>

            <p className="mt-4 text-sm text-[#4A4740] leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Size selector */}
            <div className="mt-5">
              <label className="block text-xs font-medium text-[#141413] mb-2">
                Select Size / Fit
              </label>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-xs border transition-colors whitespace-nowrap ${
                      activeSize === size
                        ? 'bg-[#141413] text-[#FBFBF9] border-[#141413]'
                        : 'bg-[#FBFBF9] text-[#4A4740] border-[#D8D0C1] hover:border-[#141413]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-4 flex items-center gap-4">
              <span className="text-xs font-medium text-[#141413]">Quantity</span>
              <div className="inline-flex items-center border border-[#D8D0C1] bg-[#FBFBF9] font-mono tabular-nums">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[#F4F1EA]"
                >
                  −
                </button>
                <span className="w-9 text-center text-xs">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(quickViewProduct.stock, q + 1))}
                  className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[#F4F1EA]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5DFD3] space-y-3">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  addToCart(quickViewProduct.id, quantity, activeSize, true);
                  setQuickViewProduct(null);
                }}
                className="flex-1 py-3 px-4 bg-[#141413] text-[#FBFBF9] text-xs font-medium tracking-wider hover:bg-[#B8860B] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART</span>
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(quickViewProduct.id)}
                aria-label="Toggle Wishlist"
                className="w-11 h-11 border border-[#D8D0C1] flex items-center justify-center text-[#141413] hover:border-[#B8860B] transition-colors shrink-0"
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlisted ? 'fill-[#B8860B] text-[#B8860B]' : 'text-[#141413]'
                  }`}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={() => openProductDetails(quickViewProduct.id)}
              className="w-full py-2 text-xs font-medium text-[#4A4740] hover:text-[#141413] flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Full Specifications & Purity Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
