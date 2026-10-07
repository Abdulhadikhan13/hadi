import React from 'react';
import { ShoppingBag, Trash2, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../data/initialData';

export const CartDrawer: React.FC = () => {
  const {
    cartDrawerOpen,
    setCartDrawerOpen,
    cartSummary,
    updateCartQuantity,
    removeFromCart,
    navigateTo,
    openProductDetails,
    toast,
  } = useStore();

  return (
    <>
      {/* Subtle Luxury Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-sm bg-[#141413] text-[#FBFBF9] border border-[#C59B27]/50 px-4 py-3.5 shadow-xl flex items-start gap-3 animate-fadeIn"
        >
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wide text-[#FBFBF9]">
              {toast.title}
            </p>
            {toast.subtitle && (
              <p className="text-xs text-[#A8A297] mt-0.5 truncate">{toast.subtitle}</p>
            )}
          </div>
        </div>
      )}

      {/* Slide-Over Shopping Cart Drawer */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setCartDrawerOpen(false)}
          />
          <aside
            aria-label="Shopping Bag Drawer"
            className="relative z-10 w-full max-w-md bg-[#FBFBF9] h-full border-l border-[#E5DFD3] flex flex-col justify-between"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#E5DFD3] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#B8860B]" />
                <h2 className="font-serif text-2xl font-semibold text-[#141413]">
                  Shopping Bag ({cartSummary.itemCount})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCartDrawerOpen(false)}
                aria-label="Close Shopping Bag"
                className="w-8 h-8 flex items-center justify-center text-[#141413] hover:text-[#B8860B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {cartSummary.detailedItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <ShoppingBag className="w-10 h-10 text-[#C59B27]/60 mb-3" />
                  <h3 className="font-serif text-2xl text-[#141413]">
                    Your Shopping Bag is Empty
                  </h3>
                  <p className="text-sm text-[#6E6A63] mt-1 max-w-xs">
                    Explore our 22K Hallmarked Gold and Certified Diamond collections to begin your story.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCartDrawerOpen(false);
                      navigateTo('shop');
                    }}
                    className="mt-6 px-6 py-2.5 bg-[#141413] text-[#FBFBF9] text-xs font-medium tracking-wider hover:bg-[#B8860B] transition-colors"
                  >
                    EXPLORE COLLECTION
                  </button>
                </div>
              ) : (
                cartSummary.detailedItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex gap-4 pb-5 border-b border-[#EFECE4]"
                  >
                    <button
                      type="button"
                      onClick={() => openProductDetails(item.product.id)}
                      className="w-20 h-20 bg-[#F4F1EA] border border-[#E5DFD3] shrink-0 overflow-hidden"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => openProductDetails(item.product.id)}
                          className="font-serif text-lg font-semibold text-[#141413] hover:text-[#B8860B] text-left truncate"
                        >
                          {item.product.name}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedSize)
                          }
                          aria-label="Remove item"
                          className="text-[#8A8479] hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#6E6A63] font-mono tabular-nums mt-0.5">
                        {item.product.goldPurity} · {item.product.netWeight}g · {item.selectedSize}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
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
                            className="w-7 h-7 flex items-center justify-center text-xs hover:bg-[#F4F1EA]"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-xs">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.quantity + 1
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center text-xs hover:bg-[#F4F1EA]"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-mono tabular-nums text-sm font-semibold text-[#141413]">
                          {formatINR(item.lineTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartSummary.detailedItems.length > 0 && (
              <div className="p-6 bg-[#F4F1EA] border-t border-[#E5DFD3] space-y-4">
                <div className="space-y-1.5 text-xs text-[#4A4740] font-mono tabular-nums">
                  <div className="flex justify-between">
                    <span className="font-sans">Gold & Stone Subtotal</span>
                    <span>{formatINR(cartSummary.subtotalBase)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans">Making Charges</span>
                    <span>{formatINR(cartSummary.makingChargesTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans">GST (3%)</span>
                    <span>{formatINR(cartSummary.gstTotal)}</span>
                  </div>
                  <div className="pt-2 border-t border-[#D8D0C1] flex justify-between text-base font-semibold text-[#141413]">
                    <span className="font-serif">Grand Total</span>
                    <span>{formatINR(cartSummary.grandTotal)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCartDrawerOpen(false);
                      navigateTo('cart');
                    }}
                    className="py-3 px-4 border border-[#141413] text-[#141413] text-xs font-medium tracking-wider hover:bg-[#141413] hover:text-[#FBFBF9] transition-colors whitespace-nowrap"
                  >
                    VIEW BAG
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCartDrawerOpen(false);
                      navigateTo('checkout');
                    }}
                    className="py-3 px-4 bg-[#141413] text-[#FBFBF9] text-xs font-medium tracking-wider hover:bg-[#B8860B] transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <span>CHECKOUT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
};
