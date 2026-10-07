import React, { useState } from 'react';
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  ArrowRight,
  LayoutDashboard,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PageId } from '../types';
import { formatINR } from '../data/initialData';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    openProductDetails,
    wishlist,
    cartSummary,
    setCartDrawerOpen,
    searchQuery,
    setSearchQuery,
    products,
    resetFilters,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = localSearch.trim();
    setSearchQuery(trimmed);
    setSearchOpen(false);
    setMobileMenuOpen(false);
    navigateTo('search', { search: trimmed });
  };

  const quickMatches = localSearch.trim()
    ? products
        .filter((p) => {
          const q = localSearch.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.subcategory.toLowerCase().includes(q) ||
            p.goldPurity.toLowerCase().includes(q) ||
            p.occasion.toLowerCase().includes(q)
          );
        })
        .slice(0, 4)
    : [];

  const handleNavClick = (page: PageId) => {
    if (page === 'shop') {
      resetFilters();
    }
    navigateTo(page);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 h-16 md:h-20 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-[#E5DFD3] px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.14em] text-[#141413] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
        >
          GOLD NO1
        </a>

        {/* Zone 2: Clean text navigation links with subtle hover underlines */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A4740]">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`py-1 whitespace-nowrap shrink-0 border-b transition-colors duration-150 ${
              currentPage === 'home'
                ? 'border-[#B8860B] text-[#141413] font-semibold'
                : 'border-transparent hover:text-[#141413] hover:border-[#B8860B]/60'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('shop')}
            className={`py-1 whitespace-nowrap shrink-0 border-b transition-colors duration-150 ${
              currentPage === 'shop'
                ? 'border-[#B8860B] text-[#141413] font-semibold'
                : 'border-transparent hover:text-[#141413] hover:border-[#B8860B]/60'
            }`}
          >
            Shop
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('gold-jewellery')}
            className={`py-1 whitespace-nowrap shrink-0 border-b transition-colors duration-150 ${
              currentPage === 'gold-jewellery' || currentPage === 'diamond-jewellery'
                ? 'border-[#B8860B] text-[#141413] font-semibold'
                : 'border-transparent hover:text-[#141413] hover:border-[#B8860B]/60'
            }`}
          >
            Collections
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('bridal-collection')}
            className={`py-1 whitespace-nowrap shrink-0 border-b transition-colors duration-150 ${
              currentPage === 'bridal-collection'
                ? 'border-[#B8860B] text-[#141413] font-semibold'
                : 'border-transparent hover:text-[#141413] hover:border-[#B8860B]/60'
            }`}
          >
            Bridal
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('new-arrivals')}
            className={`py-1 whitespace-nowrap shrink-0 border-b transition-colors duration-150 ${
              currentPage === 'new-arrivals'
                ? 'border-[#B8860B] text-[#141413] font-semibold'
                : 'border-transparent hover:text-[#141413] hover:border-[#B8860B]/60'
            }`}
          >
            New Arrivals
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('about')}
            className={`hidden xl:inline-block py-1 whitespace-nowrap shrink-0 border-b transition-colors duration-150 ${
              currentPage === 'about'
                ? 'border-[#B8860B] text-[#141413] font-semibold'
                : 'border-transparent hover:text-[#141413] hover:border-[#B8860B]/60'
            }`}
          >
            About
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className={`hidden xl:inline-block py-1 whitespace-nowrap shrink-0 border-b transition-colors duration-150 ${
              currentPage === 'contact'
                ? 'border-[#B8860B] text-[#141413] font-semibold'
                : 'border-transparent hover:text-[#141413] hover:border-[#B8860B]/60'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Right utility actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="Search Jewellery"
            className="w-10 h-10 flex items-center justify-center text-[#141413] hover:text-[#B8860B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('wishlist')}
            aria-label={`Wishlist (${wishlist.length} items)`}
            className="relative w-10 h-10 flex items-center justify-center text-[#141413] hover:text-[#B8860B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#141413] text-[#FBFBF9] text-[10px] font-mono tabular-nums flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('account')}
            aria-label="My Account"
            className="w-10 h-10 flex items-center justify-center text-[#141413] hover:text-[#B8860B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setCartDrawerOpen(true)}
            aria-label={`Shopping Cart (${cartSummary.itemCount} items)`}
            className="relative w-10 h-10 flex items-center justify-center text-[#141413] hover:text-[#B8860B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartSummary.itemCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#B8860B] text-white text-[10px] font-mono tabular-nums flex items-center justify-center rounded-full">
                {cartSummary.itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('admin')}
            title="Showroom Admin Dashboard"
            className={`hidden sm:flex items-center gap-1.5 ml-1 px-3 py-1.5 text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'admin'
                ? 'bg-[#141413] text-[#FBFBF9] border-[#141413]'
                : 'border-[#D8D0C1] text-[#4A4740] hover:border-[#141413] hover:text-[#141413]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[#141413] hover:text-[#B8860B] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Expandable Search Panel */}
      {searchOpen && (
        <div className="bg-[#F4F1EA] border-b border-[#E5DFD3] px-4 sm:px-8 lg:px-12 py-5 animate-fadeIn">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-5 h-5 text-[#6E6A63] absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search 'gold ring', 'bridal necklace', '22k chain', 'bangles'..."
                autoFocus
                className="w-full bg-[#FBFBF9] border border-[#D8D0C1] pl-12 pr-28 py-3 text-sm text-[#141413] placeholder:text-[#8A8479] focus:outline-none focus:border-[#B8860B]"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-1.5 bg-[#141413] text-[#FBFBF9] text-xs font-medium tracking-wider hover:bg-[#2C2A27] transition-colors whitespace-nowrap"
              >
                Search
              </button>
            </form>

            {/* Quick suggestion buttons */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-[#6E6A63]">
              <span>Popular searches:</span>
              {['gold ring', 'bridal necklace', '22k chain', 'bangles', 'diamond ring', 'temple haram'].map(
                (term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setLocalSearch(term);
                      setSearchQuery(term);
                      setSearchOpen(false);
                      navigateTo('search', { search: term });
                    }}
                    className="underline underline-offset-4 hover:text-[#141413] transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>

            {/* Instant matching preview */}
            {quickMatches.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#E5DFD3] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {quickMatches.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      openProductDetails(prod.id);
                    }}
                    className="flex items-center gap-3 p-2 bg-[#FBFBF9] border border-[#E5DFD3] hover:border-[#B8860B] text-left transition-colors"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover bg-[#F4F1EA] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#141413] truncate">{prod.name}</p>
                      <p className="text-[11px] text-[#6E6A63] font-mono tabular-nums">
                        {prod.goldPurity} · {formatINR(prod.finalPrice)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-[#FBFBF9] h-full overflow-y-auto p-6 flex flex-col justify-between z-10 border-r border-[#E5DFD3]">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#E5DFD3]">
                <span className="font-serif text-2xl font-bold tracking-[0.14em] text-[#141413]">
                  GOLD NO1
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Navigation Drawer"
                  className="p-2 text-[#141413]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-5 space-y-1">
                {(
                  [
                    { id: 'home', label: 'Home' },
                    { id: 'shop', label: 'All Jewellery Catalogue' },
                    { id: 'gold-jewellery', label: '22K & 24K Gold Jewellery' },
                    { id: 'diamond-jewellery', label: 'Certified Diamond Jewellery' },
                    { id: 'bridal-collection', label: 'The Bridal Collection' },
                    { id: 'new-arrivals', label: 'New Arrivals' },
                    { id: 'best-sellers', label: 'Best Sellers' },
                    { id: 'offers', label: 'Festive Offers & Privileges' },
                    { id: 'about', label: 'Our Story (About Us)' },
                    { id: 'contact', label: 'Contact Showroom' },
                    { id: 'account', label: 'My Account' },
                    { id: 'orders', label: 'Order History' },
                    { id: 'wishlist', label: `My Wishlist (${wishlist.length})` },
                    { id: 'cart', label: `Shopping Cart (${cartSummary.itemCount})` },
                    { id: 'admin', label: 'Showroom Admin Console' },
                  ] as { id: PageId; label: string }[]
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between py-2.5 px-3 text-left text-sm transition-colors ${
                      currentPage === item.id
                        ? 'bg-[#F4F1EA] text-[#141413] font-semibold'
                        : 'text-[#4A4740] hover:bg-[#F4F1EA]/60 hover:text-[#141413]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8A8479]" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5DFD3] mt-6">
              <p className="text-xs text-[#6E6A63] leading-relaxed">
                Where Every Gold Story Begins. BIS 916 Hallmarked Gold & Certified Diamonds.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
