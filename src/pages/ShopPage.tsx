import React, { useMemo, useState } from 'react';
import { SlidersHorizontal, Search, X, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { STUDIO_IMAGES } from '../data/initialData';
import { JewelleryImage } from '../components/JewelleryImage';

export const ShopPage: React.FC = () => {
  const {
    currentPage,
    products,
    categories,
    filters,
    setFilters,
    resetFilters,
    searchQuery,
    setSearchQuery,
    navigateTo,
  } = useStore();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Page header config based on route
  const pageConfig = useMemo(() => {
    switch (currentPage) {
      case 'gold-jewellery':
        return {
          kicker: 'BIS 916 & 999 HALLMARKED',
          title: 'Gold Jewellery Collection',
          subtitle:
            'Timeless 22K and 24K gold necklaces, bangles, rings, chains, and temple heirlooms.',
        };
      case 'diamond-jewellery':
        return {
          kicker: 'IGI CERTIFIED NATURAL DIAMONDS',
          title: 'Diamond Jewellery Collection',
          subtitle:
            'Hand-selected VVS-EF natural diamonds set in 18K & 22K hallmarked gold.',
        };
      case 'bridal-collection':
        return {
          kicker: 'ROYAL WEDDING TROUSSEAU',
          title: 'The Bridal Collection',
          subtitle: '“Made for the moments you’ll remember forever.”',
        };
      case 'new-arrivals':
        return {
          kicker: 'LATEST SHOWROOM RELEASES',
          title: 'New Arrivals',
          subtitle:
            'Discover our newest handcrafted designs fresh from the GOLD NO1 atelier.',
        };
      case 'best-sellers':
        return {
          kicker: 'MOST COVETED DESIGNS',
          title: 'Loved By Many — Best Sellers',
          subtitle:
            'Our highest-rated and most celebrated gold and diamond jewellery creations.',
        };
      case 'search':
        return {
          kicker: 'CATALOGUE SEARCH RESULTS',
          title: searchQuery ? `Results for “${searchQuery}”` : 'Search Our Catalogue',
          subtitle:
            'Search by ornament type, karat purity (22K, 24K, 18K), collection, or product code.',
        };
      default:
        return {
          kicker: 'COMPLETE SHOWROOM CATALOGUE',
          title: 'Fine Gold & Diamond Jewellery',
          subtitle:
            'Explore our full collection of BIS Hallmarked gold and certified diamond creations.',
        };
    }
  }, [currentPage, searchQuery]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((prod) => {
        // Route-level base filter
        if (currentPage === 'gold-jewellery') {
          if (prod.metal === 'Diamond & Gold' && prod.goldPurity === '18K') return false;
        }
        if (currentPage === 'diamond-jewellery') {
          if (prod.metal !== 'Diamond & Gold' && prod.collection !== 'Signature Diamond') {
            return false;
          }
        }
        if (currentPage === 'bridal-collection') {
          if (prod.occasion !== 'Bridal' && prod.collection !== 'Bridal' && prod.collection !== 'Heritage Temple') {
            return false;
          }
        }
        if (currentPage === 'new-arrivals' && !prod.isNew) {
          return false;
        }
        if (currentPage === 'best-sellers' && !prod.isBestSeller) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim() !== '') {
          const terms = searchQuery.toLowerCase().trim().split(/\s+/);
          const searchable = `${prod.name} ${prod.category} ${prod.subcategory} ${prod.goldPurity} ${prod.metal} ${prod.occasion} ${prod.collection} ${prod.productCode} ${prod.description}`.toLowerCase();
          const matchesAll = terms.every((t) => searchable.includes(t));
          if (!matchesAll) return false;
        }

        // Sidebar filters
        if (filters.category !== 'All' && prod.category !== filters.category) {
          return false;
        }
        if (filters.purity !== 'All' && prod.goldPurity !== filters.purity) {
          return false;
        }
        if (filters.gender !== 'All' && prod.gender !== filters.gender) {
          return false;
        }
        if (filters.occasion !== 'All' && prod.occasion !== filters.occasion) {
          return false;
        }
        if (filters.collection !== 'All' && prod.collection !== filters.collection) {
          return false;
        }

        // Price range filter
        if (filters.priceRange !== 'All') {
          const p = prod.finalPrice;
          if (filters.priceRange === 'under-50k' && p >= 50000) return false;
          if (filters.priceRange === '50k-150k' && (p < 50000 || p > 150000)) return false;
          if (filters.priceRange === '150k-300k' && (p < 150000 || p > 300000)) return false;
          if (filters.priceRange === 'above-300k' && p <= 300000) return false;
        }

        // Weight range filter
        if (filters.weightRange !== 'All') {
          const w = prod.netWeight;
          if (filters.weightRange === 'under-10g' && w >= 10) return false;
          if (filters.weightRange === '10g-25g' && (w < 10 || w > 25)) return false;
          if (filters.weightRange === '25g-50g' && (w < 25 || w > 50)) return false;
          if (filters.weightRange === 'above-50g' && w <= 50) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'newest') {
          return Number(b.isNew) - Number(a.isNew);
        }
        if (filters.sortBy === 'price-asc') {
          return a.finalPrice - b.finalPrice;
        }
        if (filters.sortBy === 'price-desc') {
          return b.finalPrice - a.finalPrice;
        }
        // popular
        return b.reviews - a.reviews;
      });
  }, [products, currentPage, searchQuery, filters]);

  const FilterControls = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-3">
        <h3 className="font-serif text-xl font-semibold text-[#141413]">Filter By</h3>
        <button
          type="button"
          onClick={resetFilters}
          className="text-xs text-[#6E6A63] hover:text-[#141413] inline-flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-semibold tracking-wider text-[#141413] mb-2.5">
          CATEGORY
        </label>
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {['All', ...categories.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
              className={`w-full text-left px-2.5 py-1.5 text-xs transition-colors flex items-center justify-between ${
                filters.category === cat
                  ? 'bg-[#141413] text-[#FBFBF9] font-medium'
                  : 'text-[#4A4740] hover:bg-[#F4F1EA]'
              }`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block text-xs font-semibold tracking-wider text-[#141413] mb-2">
          PRICE RANGE
        </label>
        <select
          value={filters.priceRange}
          onChange={(e) => setFilters((prev) => ({ ...prev, priceRange: e.target.value }))}
          className="w-full border border-[#D8D0C1] bg-[#FBFBF9] px-3 py-2 text-xs text-[#141413]"
        >
          <option value="All">All Prices</option>
          <option value="under-50k">Under ₹50,000</option>
          <option value="50k-150k">₹50,000 – ₹1,50,000</option>
          <option value="150k-300k">₹1,50,000 – ₹3,00,000</option>
          <option value="above-300k">Above ₹3,00,000</option>
        </select>
      </div>

      {/* Gold Purity */}
      <div>
        <label className="block text-xs font-semibold tracking-wider text-[#141413] mb-2">
          GOLD PURITY
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {['All', '24K', '22K', '18K'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, purity: p }))}
              className={`py-1.5 text-xs border font-mono transition-colors ${
                filters.purity === p
                  ? 'bg-[#141413] text-[#FBFBF9] border-[#141413]'
                  : 'bg-[#FBFBF9] text-[#4A4740] border-[#D8D0C1] hover:border-[#141413]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Weight */}
      <div>
        <label className="block text-xs font-semibold tracking-wider text-[#141413] mb-2">
          NET GOLD WEIGHT
        </label>
        <select
          value={filters.weightRange}
          onChange={(e) => setFilters((prev) => ({ ...prev, weightRange: e.target.value }))}
          className="w-full border border-[#D8D0C1] bg-[#FBFBF9] px-3 py-2 text-xs text-[#141413]"
        >
          <option value="All">All Weights</option>
          <option value="under-10g">Under 10 Grams</option>
          <option value="10g-25g">10g – 25g</option>
          <option value="25g-50g">25g – 50g</option>
          <option value="above-50g">Above 50 Grams</option>
        </select>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-xs font-semibold tracking-wider text-[#141413] mb-2">
          GENDER
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {['All', 'Women', 'Men', 'Unisex'].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, gender: g }))}
              className={`py-1.5 px-2 text-xs border transition-colors ${
                filters.gender === g
                  ? 'bg-[#141413] text-[#FBFBF9] border-[#141413]'
                  : 'bg-[#FBFBF9] text-[#4A4740] border-[#D8D0C1] hover:border-[#141413]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <label className="block text-xs font-semibold tracking-wider text-[#141413] mb-2">
          OCCASION
        </label>
        <select
          value={filters.occasion}
          onChange={(e) => setFilters((prev) => ({ ...prev, occasion: e.target.value }))}
          className="w-full border border-[#D8D0C1] bg-[#FBFBF9] px-3 py-2 text-xs text-[#141413]"
        >
          <option value="All">All Occasions</option>
          <option value="Bridal">Bridal & Wedding</option>
          <option value="Festive">Festive Celebrations</option>
          <option value="Everyday">Everyday Luxury</option>
          <option value="Gifting">Auspicious Gifting</option>
          <option value="Evening">Evening & Reception</option>
        </select>
      </div>

      {/* Collection */}
      <div>
        <label className="block text-xs font-semibold tracking-wider text-[#141413] mb-2">
          COLLECTION
        </label>
        <select
          value={filters.collection}
          onChange={(e) => setFilters((prev) => ({ ...prev, collection: e.target.value }))}
          className="w-full border border-[#D8D0C1] bg-[#FBFBF9] px-3 py-2 text-xs text-[#141413]"
        >
          <option value="All">All Collections</option>
          <option value="Bridal">The Bridal Collection</option>
          <option value="Heritage Temple">Heritage Temple</option>
          <option value="Signature Diamond">Signature Diamond</option>
          <option value="Royal Gold">Royal Gold</option>
          <option value="Modern Minimal">Modern Minimal</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FBFBF9]">
      {/* Bridal Special Banner if on Bridal Collection Page */}
      {currentPage === 'bridal-collection' ? (
        <div className="bg-[#141413] text-[#FBFBF9] border-b border-[#2E2C28]">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-4">
              <p className="text-xs tracking-[0.22em] text-[#D4AF37] font-medium">
                {pageConfig.kicker}
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#FBFBF9]">
                {pageConfig.title}
              </h1>
              <p className="font-serif italic text-xl text-[#E6C665]">
                {pageConfig.subtitle}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {[
                  { label: 'All Bridal', cat: 'All' },
                  { label: 'Bridal Necklaces & Harams', cat: 'Gold Necklaces' },
                  { label: 'Bridal Bangles', cat: 'Gold Bangles' },
                  { label: 'Bridal Earrings', cat: 'Gold Earrings' },
                  { label: 'Mangalsutra', cat: 'Gold Mangalsutra' },
                  { label: 'Bridal Anklets', cat: 'Gold Anklets' },
                ].map((b) => (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, category: b.cat }))}
                    className={`px-3 py-1.5 text-xs border transition-colors ${
                      filters.category === b.cat
                        ? 'bg-[#C59B27] text-[#141413] border-[#C59B27] font-semibold'
                        : 'border-[#3A3731] text-[#E5DFD3] hover:border-[#C59B27]'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6 h-64 sm:h-80 lg:h-96">
              <JewelleryImage
                src={STUDIO_IMAGES.bridalBanner}
                alt="The Bridal Collection"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#F4F1EA] border-b border-[#E5DFD3] py-12 px-4 sm:px-8 lg:px-12">
          <div className="max-w-[1360px] mx-auto">
            <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
              {pageConfig.kicker}
            </p>
            <h1 className="mt-1 font-serif text-3xl sm:text-5xl font-semibold text-[#141413]">
              {pageConfig.title}
            </h1>
            <p className="mt-2 text-sm text-[#4A4740] max-w-2xl">
              {pageConfig.subtitle}
            </p>

            {/* Collection Sub-Tabs */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {[
                { id: 'shop', label: 'All Jewellery' },
                { id: 'gold-jewellery', label: 'Gold Jewellery' },
                { id: 'diamond-jewellery', label: 'Diamond Jewellery' },
                { id: 'bridal-collection', label: 'Bridal Collection' },
                { id: 'new-arrivals', label: 'New Arrivals' },
                { id: 'best-sellers', label: 'Best Sellers' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => navigateTo(tab.id as any)}
                  className={`px-4 py-2 text-xs font-medium border transition-colors whitespace-nowrap ${
                    currentPage === tab.id
                      ? 'bg-[#141413] text-[#FBFBF9] border-[#141413]'
                      : 'bg-[#FBFBF9] text-[#4A4740] border-[#D8D0C1] hover:border-[#141413]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 py-10">
        {/* Top Toolbar: Search Box + Sort + Mobile Filter Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD3]">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#6E6A63] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by keyword (e.g. 'gold ring', '22k chain', 'bangles')..."
                className="w-full bg-[#F4F1EA] border border-[#D8D0C1] pl-10 pr-8 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#B8860B]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6E6A63] hover:text-[#141413]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden px-3.5 py-2 border border-[#141413] text-xs font-medium flex items-center gap-1.5 whitespace-nowrap"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <span className="text-xs text-[#6E6A63] font-mono tabular-nums">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'creation' : 'creations'}
            </span>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-[#6E6A63] whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: e.target.value as any,
                  }))
                }
                className="border border-[#D8D0C1] bg-[#FBFBF9] px-3 py-1.5 text-xs text-[#141413] focus:outline-none focus:border-[#B8860B]"
              >
                <option value="popular">Popular</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Left Filter Sidebar + Right Product Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 bg-[#FBFBF9] border border-[#E5DFD3] p-6">
              <FilterControls />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-[#F4F1EA] border border-[#E5DFD3] p-12 text-center space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-[#141413]">
                  No Matching Jewellery Found
                </h2>
                <p className="text-sm text-[#6E6A63] max-w-md mx-auto">
                  We could not find any pieces matching your current filter selection or search query. Try resetting the filters to view our full collection.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    resetFilters();
                    if (currentPage !== 'shop') navigateTo('shop');
                  }}
                  className="px-6 py-2.5 bg-[#141413] text-[#FBFBF9] text-xs font-medium tracking-wider hover:bg-[#B8860B] transition-colors"
                >
                  RESET ALL FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative z-10 w-80 max-w-[85vw] bg-[#FBFBF9] h-full overflow-y-auto p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5DFD3]">
              <span className="font-serif text-xl font-semibold text-[#141413]">
                Refine Catalogue
              </span>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 text-[#141413]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterControls />
            <div className="mt-6 pt-4 border-t border-[#E5DFD3]">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 bg-[#141413] text-[#FBFBF9] text-xs font-medium tracking-wider"
              >
                VIEW {filteredProducts.length} RESULTS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
