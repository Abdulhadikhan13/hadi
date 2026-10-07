import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  ShieldCheck,
  ShoppingBag,
  Truck,
  ZoomIn,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../data/initialData';
import { JewelleryImage } from '../components/JewelleryImage';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailsPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    reviews,
    addReview,
  } = useStore();

  const product =
    products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({
    customerName: '',
    location: '',
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedSize(product.sizes[0] || 'Standard');
    setQuantity(1);
  }, [product.id, product.sizes]);

  const wishlisted = isInWishlist(product.id);
  const discountedBase = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;
  const computedGst = Math.round((discountedBase + product.makingCharges) * 0.03);
  const computedFinalPrice = discountedBase + product.makingCharges + computedGst;

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product.id, quantity, selectedSize, false);
    navigateTo('checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.customerName.trim() || !reviewForm.comment.trim()) return;
    addReview({
      customerName: reviewForm.customerName.trim(),
      location: reviewForm.location.trim() || 'India',
      rating: reviewForm.rating,
      productName: product.name,
      productId: product.id,
      comment: reviewForm.comment.trim(),
      verified: true,
    });
    setReviewForm({ customerName: '', location: '', rating: 5, comment: '' });
  };

  return (
    <div className="bg-[#FBFBF9] min-h-screen pb-24 lg:pb-16">
      {/* Breadcrumb Bar */}
      <div className="bg-[#F4F1EA] border-b border-[#E5DFD3] px-4 sm:px-8 lg:px-12 py-3.5">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between text-xs text-[#6E6A63]">
          <div className="flex items-center gap-2 truncate">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="hover:text-[#141413]"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              onClick={() => navigateTo('shop', { category: product.category })}
              className="hover:text-[#141413]"
            >
              {product.category}
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#141413] font-medium truncate">{product.name}</span>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-1.5 text-[#141413] hover:text-[#B8860B] font-medium shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Catalogue</span>
          </button>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Sticky Image Gallery */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            <div className="relative aspect-4/3 bg-[#F4F1EA] border border-[#E5DFD3] overflow-hidden">
              <JewelleryImage
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.name} view ${activeImageIndex + 1}`}
                enableZoom={true}
                className="w-full h-full"
              />
              <div className="absolute bottom-3 right-3 bg-[#FBFBF9]/90 border border-[#D8D0C1] px-2.5 py-1 text-[11px] text-[#4A4740] flex items-center gap-1.5 pointer-events-none">
                <ZoomIn className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Hover or click to zoom</span>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={`${imgUrl}-${idx}`}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-4/3 bg-[#F4F1EA] border overflow-hidden transition-colors ${
                    activeImageIndex === idx
                      ? 'border-[#141413] ring-1 ring-[#141413]'
                      : 'border-[#E5DFD3] opacity-75 hover:opacity-100'
                  }`}
                >
                  <JewelleryImage
                    src={imgUrl}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Clean unboxed metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E6A63] font-mono tabular-nums">
                <span className="text-[#9A6F0A] font-medium">{product.goldPurity} Gold</span>
                <span aria-hidden="true">·</span>
                <span>{product.netWeight}g Net Weight</span>
                <span aria-hidden="true">·</span>
                <span>Code: {product.productCode}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#141413]">
                  ★ {product.rating.toFixed(1)} ({product.reviews} Verified Reviews)
                </span>
              </div>

              <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#141413]">
                {product.name}
              </h1>

              <p className="mt-3 text-sm text-[#4A4740] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Transparent Pricing Breakdown Box */}
            <div className="bg-[#F4F1EA] border border-[#E5DFD3] p-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#6E6A63] block">Final Showroom Price</span>
                  <div className="flex items-baseline gap-3 font-mono tabular-nums mt-0.5">
                    <span className="text-2xl sm:text-3xl font-bold text-[#141413]">
                      {formatINR(computedFinalPrice)}
                    </span>
                    {product.discount && (
                      <span className="text-sm text-[#8A8479] line-through">
                        {formatINR(product.finalPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs font-medium text-[#2E6B40]">
                  ✓ In Stock ({product.stock} available)
                </span>
              </div>

              <div className="pt-3 border-t border-[#D8D0C1] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono tabular-nums">
                <div>
                  <span className="text-[#6E6A63] font-sans block">Gold / Stone Value</span>
                  <span className="font-semibold text-[#141413]">{formatINR(discountedBase)}</span>
                </div>
                <div>
                  <span className="text-[#6E6A63] font-sans block">Making Charges</span>
                  <span className="font-semibold text-[#141413]">
                    {formatINR(product.makingCharges)}
                  </span>
                </div>
                <div>
                  <span className="text-[#6E6A63] font-sans block">GST (3%)</span>
                  <span className="font-semibold text-[#141413]">{formatINR(computedGst)}</span>
                </div>
                <div>
                  <span className="text-[#6E6A63] font-sans block">Final Price</span>
                  <span className="font-semibold text-[#9A6F0A]">
                    {formatINR(computedFinalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Select Size & Quantity */}
            <div className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-semibold tracking-wider text-[#141413] mb-2">
                  SELECT SIZE / FIT
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-xs border transition-colors whitespace-nowrap ${
                        selectedSize === size
                          ? 'bg-[#141413] text-[#FBFBF9] border-[#141413] font-medium'
                          : 'bg-[#FBFBF9] text-[#4A4740] border-[#D8D0C1] hover:border-[#141413]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-[#141413] mb-2">
                    QUANTITY
                  </label>
                  <div className="inline-flex items-center border border-[#D8D0C1] bg-[#FBFBF9] font-mono tabular-nums">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-sm hover:bg-[#F4F1EA]"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="w-10 h-10 flex items-center justify-center text-sm hover:bg-[#F4F1EA]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-xs text-[#6E6A63] pt-5 font-mono tabular-nums">
                  Total for {quantity}:{' '}
                  <strong className="text-[#141413]">
                    {formatINR(computedFinalPrice * quantity)}
                  </strong>
                </div>
              </div>
            </div>

            {/* Action Buttons: Add to Cart, Buy Now, Wishlist */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => addToCart(product.id, quantity, selectedSize, true)}
                className="flex-1 py-3.5 px-6 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-[0.14em] hover:bg-[#2C2A27] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 py-3.5 px-6 bg-[#C59B27] text-[#141413] text-xs font-semibold tracking-[0.14em] hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>BUY NOW</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="py-3.5 px-4 border border-[#D8D0C1] bg-[#FBFBF9] text-[#141413] text-xs font-medium hover:border-[#B8860B] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlisted ? 'fill-[#B8860B] text-[#B8860B]' : 'text-[#141413]'
                  }`}
                />
                <span>{wishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#E5DFD3] text-xs text-[#4A4740]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B8860B] shrink-0" />
                <span>{product.certification}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B8860B] shrink-0" />
                <span>100% Insured Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B8860B] shrink-0" />
                <span>Lifetime Exchange & Support</span>
              </div>
            </div>

            {/* Complete Product Details Table */}
            <div className="pt-6 border-t border-[#E5DFD3]">
              <h2 className="font-serif text-2xl font-semibold text-[#141413] mb-4">
                Product Details
              </h2>
              <div className="border border-[#E5DFD3] divide-y divide-[#E5DFD3] text-xs">
                {[
                  { label: 'Metal', value: product.metal },
                  { label: 'Purity', value: `${product.goldPurity} (BIS Hallmarked)` },
                  { label: 'Gross Weight', value: `${product.grossWeight.toFixed(2)} Grams` },
                  { label: 'Net Gold Weight', value: `${product.netWeight.toFixed(2)} Grams` },
                  {
                    label: 'Stone Weight',
                    value:
                      product.stoneWeight > 0
                        ? `${product.stoneWeight.toFixed(2)} ct / g`
                        : 'Nil (All-Gold Creation)',
                  },
                  { label: 'Selected Size', value: selectedSize },
                  { label: 'Certification', value: product.certification },
                  { label: 'Product Code', value: product.productCode },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-2 px-4 py-3 bg-[#FBFBF9] odd:bg-[#F4F1EA]/50"
                  >
                    <span className="text-[#6E6A63] font-medium">{row.label}</span>
                    <span className="text-[#141413] font-mono tabular-nums font-medium">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews for this Product */}
        <div className="mt-16 pt-14 border-t border-[#E5DFD3] grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-serif text-3xl font-semibold text-[#141413]">
              Verified Client Reviews
            </h2>
            <p className="text-sm text-[#4A4740]">
              Rated {product.rating.toFixed(1)} out of 5 based on {product.reviews} verified purchases at GOLD NO1.
            </p>

            <form
              onSubmit={handleReviewSubmit}
              className="bg-[#F4F1EA] border border-[#E5DFD3] p-5 space-y-3"
            >
              <h3 className="font-serif text-xl font-semibold text-[#141413]">
                Write a Review for {product.name}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={reviewForm.customerName}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, customerName: e.target.value })
                  }
                  placeholder="Your Name *"
                  className="bg-[#FBFBF9] border border-[#D8D0C1] px-3 py-2 text-xs"
                />
                <input
                  type="text"
                  value={reviewForm.location}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, location: e.target.value })
                  }
                  placeholder="City"
                  className="bg-[#FBFBF9] border border-[#D8D0C1] px-3 py-2 text-xs"
                />
              </div>
              <textarea
                rows={2}
                required
                value={reviewForm.comment}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, comment: e.target.value })
                }
                placeholder="Share your review of the finishing, weight, and experience..."
                className="w-full bg-[#FBFBF9] border border-[#D8D0C1] px-3 py-2 text-xs"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-[#141413] text-[#FBFBF9] text-xs font-medium tracking-wider hover:bg-[#B8860B] transition-colors"
              >
                SUBMIT REVIEW
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {reviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="bg-[#FBFBF9] border border-[#E5DFD3] p-5 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#B8860B] font-mono">
                    {'★'.repeat(rev.rating)}
                  </span>
                  <span className="text-[#6E6A63]">{rev.date}</span>
                </div>
                <p className="font-serif italic text-lg text-[#141413]">
                  “{rev.comment}”
                </p>
                <p className="text-xs text-[#6E6A63]">
                  <strong className="text-[#141413]">{rev.customerName}</strong> · {rev.location} ·{' '}
                  <span className="text-[#2E6B40]">✓ Verified Purchase</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mt-16 pt-14 border-t border-[#E5DFD3]">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
                COMPLEMENTARY CREATIONS
              </p>
              <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[#141413]">
                You May Also Like
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Buy Bar (<= 15% viewport height cap) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 h-16 bg-[#FBFBF9]/95 backdrop-blur-md border-t border-[#E5DFD3] px-4 flex items-center justify-between gap-4">
        <div className="font-mono tabular-nums">
          <p className="text-[10px] text-[#6E6A63] font-sans">Final Price (Incl. GST)</p>
          <p className="text-base font-bold text-[#141413]">{formatINR(computedFinalPrice)}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => addToCart(product.id, quantity, selectedSize, true)}
            className="px-4 py-2.5 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-wider whitespace-nowrap"
          >
            ADD TO CART
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="px-4 py-2.5 bg-[#C59B27] text-[#141413] text-xs font-semibold tracking-wider whitespace-nowrap"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};
