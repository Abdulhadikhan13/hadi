import React, { useState } from 'react';
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Trash2,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../data/initialData';
import { JewelleryImage } from '../components/JewelleryImage';

export const WishlistPage: React.FC = () => {
  const {
    products,
    wishlist,
    toggleWishlist,
    moveWishlistToCart,
    openProductDetails,
    navigateTo,
  } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FBFBF9] py-12 lg:py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1360px] mx-auto">
        <div className="border-b border-[#E5DFD3] pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
              PERSONAL CURATION
            </p>
            <h1 className="mt-1 font-serif text-3xl sm:text-5xl font-semibold text-[#141413]">
              My Wishlist ({savedProducts.length})
            </h1>
          </div>
          {savedProducts.length > 0 && (
            <button
              type="button"
              onClick={() => navigateTo('shop')}
              className="text-xs font-semibold tracking-wider text-[#141413] hover:text-[#B8860B] inline-flex items-center gap-1.5"
            >
              <span>CONTINUE BROWSING</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {savedProducts.length === 0 ? (
          <div className="bg-[#F4F1EA] border border-[#E5DFD3] p-12 sm:p-16 text-center max-w-xl mx-auto space-y-5">
            <div className="w-14 h-14 mx-auto border border-[#C59B27]/50 bg-[#FBFBF9] flex items-center justify-center text-[#B8860B]">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-3xl font-semibold text-[#141413]">
              Your Wishlist is Currently Empty
            </h2>
            <p className="text-sm text-[#6E6A63] leading-relaxed">
              Save your favourite 22K gold necklaces, bangles, bridal sets, and solitaire rings here to compare weights and revisit at your leisure.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigateTo('shop')}
                className="px-7 py-3 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-wider hover:bg-[#B8860B] transition-colors"
              >
                EXPLORE COLLECTION
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedProducts.map((product) => {
              const discountedFinal = product.discount
                ? Math.round(product.finalPrice * (1 - product.discount / 100))
                : product.finalPrice;

              return (
                <div
                  key={product.id}
                  className="bg-[#FBFBF9] border border-[#E5DFD3] flex flex-col justify-between"
                >
                  <div className="relative aspect-4/3 bg-[#F4F1EA] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => openProductDetails(product.id)}
                      className="w-full h-full block"
                    >
                      <JewelleryImage
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Remove from Wishlist"
                      className="absolute top-3 right-3 w-9 h-9 bg-[#FBFBF9]/90 border border-[#D8D0C1] flex items-center justify-center text-[#141413] hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-[#6E6A63] font-mono tabular-nums">
                        <span className="text-[#9A6F0A] font-medium">
                          {product.goldPurity} Gold
                        </span>{' '}
                        · {product.netWeight}g Net · {product.category}
                      </p>
                      <h3 className="mt-1.5 font-serif text-xl font-semibold text-[#141413]">
                        <button
                          type="button"
                          onClick={() => openProductDetails(product.id)}
                          className="text-left hover:text-[#B8860B]"
                        >
                          {product.name}
                        </button>
                      </h3>
                      <p className="mt-2 font-mono tabular-nums text-base font-semibold text-[#141413]">
                        {formatINR(discountedFinal)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#EFECE4] flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => moveWishlistToCart(product.id)}
                        className="flex-1 py-2.5 px-4 bg-[#141413] text-[#FBFBF9] text-xs font-medium tracking-wider hover:bg-[#B8860B] transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>MOVE TO CART</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export const ShoppingCartPage: React.FC = () => {
  const {
    cartSummary,
    updateCartQuantity,
    removeFromCart,
    navigateTo,
    openProductDetails,
    appliedOfferCode,
    applyOfferCode,
    removeOfferCode,
    offers,
  } = useStore();

  const [couponInput, setCouponInput] = useState(appliedOfferCode);
  const [couponFeedback, setCouponFeedback] = useState<{
    type: 'success' | 'error';
    msg: string;
  } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyOfferCode(couponInput);
    setCouponFeedback({
      type: res.success ? 'success' : 'error',
      msg: res.message,
    });
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] py-12 lg:py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1360px] mx-auto">
        <div className="border-b border-[#E5DFD3] pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
              YOUR SELECTION
            </p>
            <h1 className="mt-1 font-serif text-3xl sm:text-5xl font-semibold text-[#141413]">
              Shopping Cart ({cartSummary.itemCount})
            </h1>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="text-xs font-semibold tracking-wider text-[#141413] hover:text-[#B8860B] inline-flex items-center gap-1.5"
          >
            <span>CONTINUE SHOPPING</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {cartSummary.detailedItems.length === 0 ? (
          <div className="bg-[#F4F1EA] border border-[#E5DFD3] p-12 sm:p-16 text-center max-w-xl mx-auto space-y-5">
            <div className="w-14 h-14 mx-auto border border-[#C59B27]/50 bg-[#FBFBF9] flex items-center justify-center text-[#B8860B]">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-3xl font-semibold text-[#141413]">
              Your Shopping Cart is Empty
            </h2>
            <p className="text-sm text-[#6E6A63] leading-relaxed">
              Discover our curated collection of 22K BIS Hallmarked gold and IGI-certified diamond jewellery.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigateTo('shop')}
                className="px-7 py-3 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-wider hover:bg-[#B8860B] transition-colors"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Itemized Table */}
            <div className="lg:col-span-8 space-y-4">
              <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-[#F4F1EA] border border-[#E5DFD3] text-xs font-semibold tracking-wider text-[#4A4740]">
                <div className="col-span-6">PRODUCT</div>
                <div className="col-span-2 text-right">UNIT PRICE</div>
                <div className="col-span-2 text-center">QUANTITY</div>
                <div className="col-span-2 text-right">SUBTOTAL</div>
              </div>

              {cartSummary.detailedItems.map((item) => {
                const unitFinal = Math.round(item.lineTotal / item.quantity);
                return (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="bg-[#FBFBF9] border border-[#E5DFD3] p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                  >
                    {/* Product & Image */}
                    <div className="md:col-span-6 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => openProductDetails(item.product.id)}
                        className="w-20 h-20 bg-[#F4F1EA] border border-[#E5DFD3] shrink-0 overflow-hidden"
                      >
                        <JewelleryImage
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full"
                        />
                      </button>
                      <div className="min-w-0">
                        <p className="text-xs text-[#6E6A63] font-mono tabular-nums">
                          {item.product.goldPurity} Gold · {item.product.netWeight}g Net ·{' '}
                          {item.product.productCode}
                        </p>
                        <h3 className="font-serif text-xl font-semibold text-[#141413] truncate">
                          <button
                            type="button"
                            onClick={() => openProductDetails(item.product.id)}
                            className="hover:text-[#B8860B] text-left"
                          >
                            {item.product.name}
                          </button>
                        </h3>
                        <p className="text-xs text-[#6E6A63] mt-0.5">
                          Size: <span className="text-[#141413]">{item.selectedSize}</span>
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedSize)
                          }
                          className="mt-2 inline-flex items-center gap-1 text-xs text-[#8A8479] hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="md:col-span-2 md:text-right font-mono tabular-nums text-xs">
                      <span className="md:hidden text-[#6E6A63] font-sans mr-2">
                        Unit Price (incl. GST):
                      </span>
                      <span className="font-medium text-[#141413]">
                        {formatINR(unitFinal)}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex items-center md:justify-center">
                      <div className="inline-flex items-center border border-[#D8D0C1] bg-[#FBFBF9] font-mono tabular-nums">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.quantity - 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-xs hover:bg-[#F4F1EA]"
                        >
                          −
                        </button>
                        <span className="w-9 text-center text-xs font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-xs hover:bg-[#F4F1EA]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="md:col-span-2 md:text-right font-mono tabular-nums text-sm font-semibold text-[#141413]">
                      <span className="md:hidden text-xs font-normal text-[#6E6A63] font-sans mr-2">
                        Subtotal:
                      </span>
                      {formatINR(item.lineTotal)}
                    </div>
                  </div>
                );
              })}

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => navigateTo('shop')}
                  className="px-6 py-3 border border-[#141413] text-[#141413] text-xs font-semibold tracking-wider hover:bg-[#141413] hover:text-[#FBFBF9] transition-colors"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>

            {/* Right Cart Summary */}
            <aside className="lg:col-span-4 bg-[#F4F1EA] border border-[#E5DFD3] p-6 sm:p-8 space-y-6">
              <h2 className="font-serif text-2xl font-semibold text-[#141413] border-b border-[#D8D0C1] pb-3">
                Cart Summary
              </h2>

              {/* Privilege Code Box */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-[#141413]">
                  Have a Privilege / Offer Code?
                </label>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="e.g. GOLDNO1WELCOME"
                    className="flex-1 bg-[#FBFBF9] border border-[#D8D0C1] px-3 py-2 text-xs font-mono uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#141413] text-[#FBFBF9] text-xs font-medium tracking-wider whitespace-nowrap"
                  >
                    Apply
                  </button>
                </form>
                {appliedOfferCode && (
                  <div className="flex items-center justify-between text-xs text-[#2E6B40] pt-1">
                    <span>Code {appliedOfferCode} active</span>
                    <button
                      type="button"
                      onClick={() => {
                        removeOfferCode();
                        setCouponInput('');
                        setCouponFeedback(null);
                      }}
                      className="underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {couponFeedback && (
                  <p
                    className={`text-xs ${
                      couponFeedback.type === 'success' ? 'text-[#2E6B40]' : 'text-red-700'
                    }`}
                  >
                    {couponFeedback.msg}
                  </p>
                )}

                {offers.filter((o) => o.active).length > 0 && (
                  <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-[#6E6A63]">
                    <Tag className="w-3 h-3 text-[#B8860B]" />
                    <span>Available:</span>
                    {offers
                      .filter((o) => o.active)
                      .map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => {
                            setCouponInput(o.code);
                            const res = applyOfferCode(o.code);
                            setCouponFeedback({
                              type: res.success ? 'success' : 'error',
                              msg: res.message,
                            });
                          }}
                          className="font-mono underline hover:text-[#141413]"
                        >
                          {o.code}
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-[#D8D0C1] text-xs font-mono tabular-nums text-[#4A4740]">
                <div className="flex justify-between">
                  <span className="font-sans">Subtotal (Gold & Stones)</span>
                  <span className="text-[#141413]">{formatINR(cartSummary.subtotalBase)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans">Making Charges</span>
                  <span className="text-[#141413]">
                    {formatINR(cartSummary.makingChargesTotal)}
                  </span>
                </div>
                {cartSummary.discountAmount > 0 && (
                  <div className="flex justify-between text-[#2E6B40]">
                    <span className="font-sans">Privilege Discount</span>
                    <span>− {formatINR(cartSummary.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-sans">GST (3%)</span>
                  <span className="text-[#141413]">{formatINR(cartSummary.gstTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans">Insured Delivery</span>
                  <span className="text-[#2E6B40]">
                    {cartSummary.deliveryCharge === 0
                      ? 'FREE'
                      : formatINR(cartSummary.deliveryCharge)}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#D8D0C1] flex justify-between items-baseline text-lg font-bold text-[#141413]">
                  <span className="font-serif">Grand Total</span>
                  <span>{formatINR(cartSummary.grandTotal)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigateTo('checkout')}
                className="w-full py-3.5 px-6 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-[0.16em] hover:bg-[#B8860B] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs text-[#6E6A63] pt-2">
                <ShieldCheck className="w-4 h-4 text-[#B8860B] shrink-0" />
                <span>Tamper-evident packaging with 100% transit insurance</span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};
