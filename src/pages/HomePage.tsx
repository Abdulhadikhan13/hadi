import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Gem,
  HeartHandshake,
  Lock,
  RefreshCw,
  Scale,
  ShieldCheck,
  Sparkles,
  Edit3,
  X,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR, STUDIO_IMAGES } from '../data/initialData';
import { ProductCard } from '../components/ProductCard';
import { JewelleryImage } from '../components/JewelleryImage';

export const HomePage: React.FC = () => {
  const {
    products,
    categories,
    goldRates,
    reviews,
    settings,
    updateSettings,
    addReview,
    navigateTo,
    openProductDetails,
  } = useStore();

  const [purityModalOpen, setPurityModalOpen] = useState(false);
  const [editStoryModalOpen, setEditStoryModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const [storyDraft, setStoryDraft] = useState({
    storyHeadline: settings.storyHeadline,
    storyLead: settings.storyLead,
    storyBody: settings.storyBody,
    storyPromise: settings.storyPromise,
  });

  const [newReviewDraft, setNewReviewDraft] = useState({
    customerName: '',
    location: '',
    rating: 5,
    productName: 'Classic Gold Necklace',
    comment: '',
  });

  const featuredProducts = products.slice(0, 8);
  const newArrivalProducts = products.filter((p) => p.isNew).slice(0, 4);
  const bestSellerProducts = products.filter((p) => p.isBestSeller).slice(0, 4);

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(storyDraft);
    setEditStoryModalOpen(false);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewDraft.customerName.trim() || !newReviewDraft.comment.trim()) return;
    addReview({
      customerName: newReviewDraft.customerName.trim(),
      location: newReviewDraft.location.trim() || 'India',
      rating: newReviewDraft.rating,
      productName: newReviewDraft.productName,
      comment: newReviewDraft.comment.trim(),
      verified: true,
    });
    setNewReviewDraft({
      customerName: '',
      location: '',
      rating: 5,
      productName: 'Classic Gold Necklace',
      comment: '',
    });
    setReviewModalOpen(false);
  };

  return (
    <div className="space-y-0">
      {/* 1. LUXURY HERO SECTION */}
      <section className="relative bg-[#141413] text-[#FBFBF9] overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[600px] lg:min-h-[680px]">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-16 lg:py-24 z-10">
            <p className="text-xs tracking-[0.25em] text-[#D4AF37] font-medium mb-4">
              BIS 916 HALLMARKED · ARTISANAL INDIAN HERITAGE
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[0.08em] text-[#FBFBF9]">
              {settings.brandName}
            </h1>
            <p className="mt-3 font-serif italic text-2xl sm:text-3xl text-[#E6C665]">
              {settings.tagline}
            </p>
            <p className="mt-5 text-base sm:text-lg text-[#C9C3B8] leading-relaxed max-w-xl">
              “Discover timeless gold jewellery crafted to celebrate your most precious moments.”
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigateTo('gold-jewellery')}
                className="px-7 py-3.5 bg-[#C59B27] text-[#141413] text-xs font-semibold tracking-[0.16em] hover:bg-[#D4AF37] transition-colors whitespace-nowrap"
              >
                SHOP GOLD
              </button>
              <button
                type="button"
                onClick={() => navigateTo('shop')}
                className="px-7 py-3.5 border border-[#FBFBF9]/40 text-[#FBFBF9] text-xs font-semibold tracking-[0.16em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors whitespace-nowrap"
              >
                EXPLORE COLLECTION
              </button>
            </div>
          </div>

          {/* Right Hero Photography */}
          <div className="lg:col-span-6 relative min-h-[360px] lg:min-h-full">
            <JewelleryImage
              src={STUDIO_IMAGES.heroShowroom}
              alt="GOLD NO1 Luxury Indian 22K Gold Jewellery Showroom Showcase"
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#141413] via-[#141413]/25 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Below Hero: Trust Section */}
        <div className="bg-[#1C1B19] border-t border-[#2E2C28]">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 py-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-xs text-[#E5DFD3]">
              {[
                'BIS Hallmarked Gold',
                'Certified Diamonds',
                '100% Transparent Pricing',
                'Secure Shopping',
                'Trusted Craftsmanship',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="font-medium tracking-wide">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. TODAY'S GOLD RATE SECTION */}
      <section className="bg-[#F4F1EA] border-b border-[#E5DFD3] py-8 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1360px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#141413]">
                Today’s Gold Rate
              </h2>
              {goldRates.isDemoRate && (
                <span className="text-xs text-[#7D6624] font-mono">
                  · Sample / Demo Market Reference
                </span>
              )}
            </div>
            <p className="text-xs text-[#6E6A63] mt-1">
              Prices may vary according to market rates. Updated {goldRates.lastUpdated}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8">
            <div className="bg-[#FBFBF9] border border-[#E5DFD3] px-5 py-3.5 flex items-baseline justify-between gap-6">
              <div>
                <p className="text-xs text-[#6E6A63]">22K Gold (916 Hallmark)</p>
                <p className="font-serif text-sm text-[#141413] font-medium">Jewellery Standard</p>
              </div>
              <p className="font-mono tabular-nums text-lg font-semibold text-[#141413] whitespace-nowrap">
                {formatINR(goldRates.gold22KPer10g)}{' '}
                <span className="text-xs font-normal text-[#6E6A63]">/ 10g</span>
              </p>
            </div>

            <div className="bg-[#FBFBF9] border border-[#E5DFD3] px-5 py-3.5 flex items-baseline justify-between gap-6">
              <div>
                <p className="text-xs text-[#6E6A63]">24K Gold (999 Fine)</p>
                <p className="font-serif text-sm text-[#141413] font-medium">Coins & Bullion</p>
              </div>
              <p className="font-mono tabular-nums text-lg font-semibold text-[#141413] whitespace-nowrap">
                {formatINR(goldRates.gold24KPer10g)}{' '}
                <span className="text-xs font-normal text-[#6E6A63]">/ 10g</span>
              </p>
            </div>

            <div className="bg-[#FBFBF9] border border-[#E5DFD3] px-5 py-3.5 flex items-baseline justify-between gap-6">
              <div>
                <p className="text-xs text-[#6E6A63]">Fine Silver</p>
                <p className="font-serif text-sm text-[#141413] font-medium">999 Purity</p>
              </div>
              <p className="font-mono tabular-nums text-lg font-semibold text-[#141413] whitespace-nowrap">
                {formatINR(goldRates.silverPer10g)}{' '}
                <span className="text-xs font-normal text-[#6E6A63]">/ 10g</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPLORE OUR GOLD COLLECTION (10 Categories) */}
      <section className="py-16 lg:py-24 px-4 sm:px-8 lg:px-12 max-w-[1360px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
              ARTISANAL CATEGORIES
            </p>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[#141413]">
              Explore Our Gold Collection
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="text-xs font-semibold tracking-wider text-[#141413] hover:text-[#B8860B] inline-flex items-center gap-1.5"
          >
            <span>VIEW COMPLETE CATALOGUE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('shop', { category: cat.name })}
              className="group cursor-pointer bg-[#FBFBF9] border border-[#E5DFD3] hover:border-[#B8860B] transition-all duration-200 flex flex-col justify-between"
            >
              <div className="aspect-4/3 w-full bg-[#F4F1EA] overflow-hidden">
                <JewelleryImage
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full"
                  imgClassName="group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#141413] group-hover:text-[#B8860B] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#6E6A63] mt-1 line-clamp-2">{cat.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EFECE4] flex items-center justify-between text-xs font-medium text-[#141413]">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B8860B] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED COLLECTION: CURATED FOR YOU */}
      <section className="bg-[#F4F1EA]/70 border-y border-[#E5DFD3] py-16 lg:py-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
                SIGNATURE SHOWROOM SELECTION
              </p>
              <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[#141413]">
                Curated For You
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('shop')}
              className="text-xs font-semibold tracking-wider text-[#141413] hover:text-[#B8860B] inline-flex items-center gap-1.5"
            >
              <span>BROWSE ALL JEWELLERY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE BRIDAL COLLECTION */}
      <section className="bg-[#141413] text-[#FBFBF9] py-20 lg:py-28 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 relative aspect-16/9 border border-[#2E2C28] overflow-hidden">
            <JewelleryImage
              src={STUDIO_IMAGES.bridalBanner}
              alt="GOLD NO1 Grand Indian Bridal Gold Jewellery Collection"
              className="w-full h-full"
            />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs tracking-[0.22em] text-[#D4AF37] font-medium">
              ROYAL HERITAGE TROUSSEAU
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#FBFBF9]">
              The Bridal Collection
            </h2>
            <p className="font-serif italic text-xl text-[#E6C665]">
              “Made for the moments you’ll remember forever.”
            </p>
            <p className="text-sm text-[#C9C3B8] leading-relaxed">
              Every GOLD NO1 bridal ensemble is handcrafted by master karigars in 22K BIS Hallmarked gold — celebrating timeless temple nakshi, filigree chokers, and heirloom harams designed to be passed down through generations.
            </p>

            {/* Bridal Sub-Categories */}
            <div className="pt-2 border-t border-[#2E2C28]">
              <p className="text-xs text-[#A8A297] mb-3">Signature Bridal Ensembles:</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#E5DFD3]">
                {[
                  'Bridal necklaces',
                  'Long harams',
                  'Chokers',
                  'Bangles',
                  'Earrings',
                  'Maang tikka',
                  'Bridal sets',
                ].map((item, idx) => (
                  <React.Fragment key={item}>
                    <button
                      type="button"
                      onClick={() => navigateTo('bridal-collection')}
                      className="hover:text-[#D4AF37] underline underline-offset-4 transition-colors"
                    >
                      {item}
                    </button>
                    {idx < 6 && <span aria-hidden="true" className="text-[#6E6A63]">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={() => navigateTo('bridal-collection')}
                className="px-7 py-3.5 bg-[#C59B27] text-[#141413] text-xs font-semibold tracking-[0.16em] hover:bg-[#D4AF37] transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>EXPLORE BRIDAL COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEW ARRIVALS */}
      <section className="py-16 lg:py-24 px-4 sm:px-8 lg:px-12 max-w-[1360px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
              FRESH FROM OUR ATELIER
            </p>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[#141413]">
              New Arrivals
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('new-arrivals')}
            className="text-xs font-semibold tracking-wider text-[#141413] hover:text-[#B8860B] inline-flex items-center gap-1.5"
          >
            <span>VIEW ALL NEW ARRIVALS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivalProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              highlightNew={true}
            />
          ))}
        </div>
      </section>

      {/* 7. BEST SELLERS: LOVED BY MANY */}
      <section className="bg-[#F4F1EA]/70 border-y border-[#E5DFD3] py-16 lg:py-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
                MOST COVETED HEIRLOOMS
              </p>
              <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[#141413]">
                Loved By Many
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('best-sellers')}
              className="text-xs font-semibold tracking-wider text-[#141413] hover:text-[#B8860B] inline-flex items-center gap-1.5"
            >
              <span>EXPLORE BEST SELLERS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} showRating={true} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. GOLD PURITY EDUCATIONAL SECTION: KNOW YOUR GOLD */}
      <section className="py-16 lg:py-24 px-4 sm:px-8 lg:px-12 max-w-[1360px] mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
            TRANSPARENCY & EDUCATION
          </p>
          <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[#141413]">
            Know Your Gold
          </h2>
          <p className="mt-3 text-sm text-[#4A4740] leading-relaxed">
            Understanding karat purity helps you choose the right balance of richness and structural strength for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 24K Card */}
          <div className="bg-[#FBFBF9] border border-[#E5DFD3] p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-[#9A6F0A] font-medium">
                99.9% FINE GOLD · BIS 999
              </span>
              <h3 className="mt-2 font-serif text-4xl font-bold text-[#141413]">24K</h3>
              <p className="mt-1 font-serif text-xl font-medium text-[#4A4740]">Pure gold</p>
              <p className="mt-4 text-sm text-[#4A4740] leading-relaxed">
                The highest purity of gold available with a vibrant warm lustre. Because 24K gold is naturally soft, it is crafted into investment coins, bars, and auspicious gifting medallions rather than stone-studded jewellery.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EFECE4] text-xs text-[#6E6A63] font-mono tabular-nums">
              Current Rate: {formatINR(goldRates.gold24KPer10g)} / 10g
            </div>
          </div>

          {/* 22K Card */}
          <div className="bg-[#F4F1EA] border border-[#C59B27] p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-[#9A6F0A] font-medium">
                91.6% PURE GOLD · BIS 916 HALLMARK
              </span>
              <h3 className="mt-2 font-serif text-4xl font-bold text-[#141413]">22K</h3>
              <p className="mt-1 font-serif text-xl font-medium text-[#4A4740]">
                Traditional jewellery gold
              </p>
              <p className="mt-4 text-sm text-[#4A4740] leading-relaxed">
                Composed of 91.6% pure gold alloyed with 8.4% strengthening metals. This is the gold standard for Indian bridal necklaces, harams, bangles, chains, and family heirlooms.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#D8D0C1] text-xs text-[#141413] font-mono tabular-nums font-medium">
              Current Rate: {formatINR(goldRates.gold22KPer10g)} / 10g
            </div>
          </div>

          {/* 18K Card */}
          <div className="bg-[#FBFBF9] border border-[#E5DFD3] p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-[#9A6F0A] font-medium">
                75.0% PURE GOLD · BIS 750 HALLMARK
              </span>
              <h3 className="mt-2 font-serif text-4xl font-bold text-[#141413]">18K</h3>
              <p className="mt-1 font-serif text-xl font-medium text-[#4A4740]">
                Durable gold jewellery
              </p>
              <p className="mt-4 text-sm text-[#4A4740] leading-relaxed">
                Crafted with 75% pure gold for superior prong security and resilience. Essential for solitaire diamond rings, intricate stone-set earrings, and contemporary daily wear.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EFECE4] text-xs text-[#6E6A63] font-mono tabular-nums">
              Current Rate: {formatINR(goldRates.gold18KPer10g)} / 10g
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => setPurityModalOpen(true)}
            className="px-6 py-3 border border-[#141413] text-[#141413] text-xs font-semibold tracking-wider hover:bg-[#141413] hover:text-[#FBFBF9] transition-colors inline-flex items-center gap-2"
          >
            <span>Learn About Gold Purity</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 9. WHY CHOOSE GOLD NO1 */}
      <section className="bg-[#F4F1EA] border-y border-[#E5DFD3] py-16 lg:py-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
              THE GOLD NO1 ASSURANCE
            </p>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[#141413]">
              Why Choose GOLD NO1?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'BIS Hallmarked Jewellery',
                desc: 'Every gold piece bears official BIS Hallmarking with a unique 6-digit HUID code.',
              },
              {
                icon: Gem,
                title: 'Certified Diamonds',
                desc: 'Natural conflict-free diamonds graded and certified by independent gemological labs.',
              },
              {
                icon: Scale,
                title: 'Transparent Pricing',
                desc: 'Clear itemization of gross weight, net gold weight, making charges, and 3% GST.',
              },
              {
                icon: Sparkles,
                title: 'Expert Craftsmanship',
                desc: 'Hand-finished by master Indian karigars specializing in nakshi, temple, and filigree art.',
              },
              {
                icon: Lock,
                title: 'Secure Payments',
                desc: 'Encrypted checkout supporting UPI, Cards, Net Banking, and verified Cash on Delivery.',
              },
              {
                icon: RefreshCw,
                title: 'Easy Returns',
                desc: 'Transparent exchange and buyback policies calculated on prevailing market gold rates.',
              },
              {
                icon: Award,
                title: 'Trusted Service',
                desc: 'Personal showroom concierge support and tamper-evident insured doorstep delivery.',
              },
              {
                icon: HeartHandshake,
                title: 'Lifetime Support',
                desc: 'Complimentary ultrasonic cleaning, polishing, and prong inspection for your heirlooms.',
              },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-[#FBFBF9] border border-[#E5DFD3] p-6 space-y-3"
                >
                  <div className="w-10 h-10 border border-[#C59B27]/40 bg-[#F4F1EA] flex items-center justify-center text-[#B8860B]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#141413]">
                    ✓ {item.title}
                  </h3>
                  <p className="text-xs text-[#4A4740] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. OUR STORY SECTION (Editable by Owner) */}
      <section className="py-16 lg:py-24 px-4 sm:px-8 lg:px-12 max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
                OUR STORY
              </p>
              <button
                type="button"
                onClick={() => {
                  setStoryDraft({
                    storyHeadline: settings.storyHeadline,
                    storyLead: settings.storyLead,
                    storyBody: settings.storyBody,
                    storyPromise: settings.storyPromise,
                  });
                  setEditStoryModalOpen(true);
                }}
                className="text-xs text-[#6E6A63] hover:text-[#141413] inline-flex items-center gap-1 underline underline-offset-4"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Brand Story</span>
              </button>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#141413]">
              {settings.storyHeadline}
            </h2>
            <p className="text-base text-[#141413] font-medium leading-relaxed">
              {settings.storyLead}
            </p>
            <p className="text-sm text-[#4A4740] leading-relaxed">
              {settings.storyBody}
            </p>
            <p className="text-sm text-[#4A4740] leading-relaxed">
              {settings.storyPromise}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigateTo('about')}
                className="px-6 py-3 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-wider hover:bg-[#B8860B] transition-colors inline-flex items-center gap-2"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="aspect-4/3 bg-[#F4F1EA] border border-[#E5DFD3] overflow-hidden">
              <JewelleryImage
                src={STUDIO_IMAGES.necklace}
                alt="Handcrafted 22K Gold Necklace Artistry"
                className="w-full h-full"
              />
            </div>
            <div className="aspect-4/3 bg-[#F4F1EA] border border-[#E5DFD3] overflow-hidden">
              <JewelleryImage
                src={STUDIO_IMAGES.bangles}
                alt="Royal 22K Gold Bangles"
                className="w-full h-full"
              />
            </div>
            <div className="col-span-2 aspect-16/9 bg-[#F4F1EA] border border-[#E5DFD3] overflow-hidden">
              <JewelleryImage
                src={STUDIO_IMAGES.heroShowroom}
                alt="GOLD NO1 Showroom Presentation"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 11. CUSTOMER REVIEWS: WHAT OUR CUSTOMERS SAY */}
      <section className="bg-[#F4F1EA]/70 border-y border-[#E5DFD3] py-16 lg:py-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
                CLIENT TESTIMONIALS
              </p>
              <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[#141413]">
                What Our Customers Say
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setReviewModalOpen(true)}
              className="px-4 py-2 border border-[#141413] text-[#141413] text-xs font-medium tracking-wider hover:bg-[#141413] hover:text-[#FBFBF9] transition-colors whitespace-nowrap"
            >
              + SHARE YOUR REVIEW
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((rev) => (
              <div
                key={rev.id}
                className="bg-[#FBFBF9] border border-[#E5DFD3] p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#B8860B] tracking-widest font-mono">
                      {'★'.repeat(rev.rating)}
                      {'☆'.repeat(5 - rev.rating)}
                    </span>
                    <span className="text-[#6E6A63]">{rev.date}</span>
                  </div>
                  <p className="text-sm text-[#141413] leading-relaxed italic font-serif text-lg">
                    “{rev.comment}”
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EFECE4] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-[#141413]">{rev.customerName}</p>
                    <p className="text-[#6E6A63] mt-0.5">
                      {rev.location} · {rev.productName}
                    </p>
                  </div>
                  {rev.verified && (
                    <span className="text-[#2E6B40] font-medium">
                      ✓ Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. INSTAGRAM / SOCIAL SECTION: FOLLOW GOLD NO1 */}
      <section className="py-16 lg:py-24 px-4 sm:px-8 lg:px-12 max-w-[1360px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
              SHOWROOM JOURNAL & SOCIAL
            </p>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[#141413]">
              Follow GOLD NO1
            </h2>
          </div>

          <div className="flex items-center gap-5 text-xs font-semibold tracking-wider text-[#141413]">
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B8860B] underline underline-offset-4 transition-colors"
            >
              Instagram
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B8860B] underline underline-offset-4 transition-colors"
            >
              Facebook
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={settings.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B8860B] underline underline-offset-4 transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { img: STUDIO_IMAGES.necklace, title: '22K Heritage Filigree Necklace', id: 'prod-1' },
            { img: STUDIO_IMAGES.bangles, title: 'Royal Engraved Gold Bangles', id: 'prod-2' },
            { img: STUDIO_IMAGES.ring, title: 'Signature Solitaire & Gold Band', id: 'prod-3' },
            { img: STUDIO_IMAGES.earrings, title: 'Traditional Temple Jhumkas', id: 'prod-4' },
          ].map((slot) => (
            <button
              key={slot.id}
              type="button"
              onClick={() => openProductDetails(slot.id)}
              className="group relative aspect-4/3 bg-[#F4F1EA] border border-[#E5DFD3] overflow-hidden text-left"
            >
              <JewelleryImage
                src={slot.img}
                alt={slot.title}
                className="w-full h-full"
                imgClassName="group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
                <p className="text-xs font-medium text-[#FBFBF9]">{slot.title}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Gold Purity Educational Modal */}
      {purityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FBFBF9] border border-[#E5DFD3] max-w-2xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#141413]">
                The GOLD NO1 Guide to Purity & BIS Hallmarking
              </h3>
              <button
                type="button"
                onClick={() => setPurityModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-[#141413]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 text-sm text-[#4A4740] leading-relaxed">
              <p>
                <strong className="text-[#141413]">What is a BIS Hallmark?</strong> The Bureau of Indian Standards (BIS) Hallmark certifies that your gold jewellery conforms to the exact karat fineness stated on your invoice. Every GOLD NO1 ornament carries the BIS triangle mark, purity grade (916 for 22K, 750 for 18K), and a unique 6-digit alphanumeric HUID code.
              </p>
              <p>
                <strong className="text-[#141413]">How Your Final Price is Calculated:</strong>
                <br />
                <code>Final Price = (Net Gold Weight × Today’s Karat Rate) + Stone Value + Making Charges + 3% GST</code>
              </p>
              <p>
                We always deduct stone weight from gross weight so you only pay gold rate on the exact <strong className="text-[#141413]">Net Gold Weight</strong>.
              </p>
            </div>
            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setPurityModalOpen(false)}
                className="px-6 py-2.5 bg-[#141413] text-[#FBFBF9] text-xs font-medium tracking-wider"
              >
                CLOSE GUIDE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Owner Editable Story Modal */}
      {editStoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveStory}
            className="bg-[#FBFBF9] border border-[#E5DFD3] max-w-xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-3">
              <h3 className="font-serif text-2xl font-semibold text-[#141413]">
                Customize “Our Story” Content
              </h3>
              <button
                type="button"
                onClick={() => setEditStoryModalOpen(false)}
                className="p-1 text-[#141413]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#141413] mb-1">
                Story Headline
              </label>
              <input
                type="text"
                value={storyDraft.storyHeadline}
                onChange={(e) =>
                  setStoryDraft({ ...storyDraft, storyHeadline: e.target.value })
                }
                className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#141413] mb-1">
                Lead Introduction
              </label>
              <textarea
                rows={2}
                value={storyDraft.storyLead}
                onChange={(e) =>
                  setStoryDraft({ ...storyDraft, storyLead: e.target.value })
                }
                className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#141413] mb-1">
                Craftsmanship Narrative
              </label>
              <textarea
                rows={3}
                value={storyDraft.storyBody}
                onChange={(e) =>
                  setStoryDraft({ ...storyDraft, storyBody: e.target.value })
                }
                className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#141413] mb-1">
                Transparency Promise
              </label>
              <textarea
                rows={2}
                value={storyDraft.storyPromise}
                onChange={(e) =>
                  setStoryDraft({ ...storyDraft, storyPromise: e.target.value })
                }
                className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-sm"
              />
            </div>
            <div className="pt-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditStoryModalOpen(false)}
                className="px-4 py-2 border border-[#D8D0C1] text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#141413] text-[#FBFBF9] text-xs font-medium tracking-wider"
              >
                Save Story
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Customer Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleAddReview}
            className="bg-[#FBFBF9] border border-[#E5DFD3] max-w-lg w-full p-6 sm:p-8 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-3">
              <h3 className="font-serif text-2xl font-semibold text-[#141413]">
                Share Your GOLD NO1 Experience
              </h3>
              <button
                type="button"
                onClick={() => setReviewModalOpen(false)}
                className="p-1 text-[#141413]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#141413] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newReviewDraft.customerName}
                  onChange={(e) =>
                    setNewReviewDraft({ ...newReviewDraft, customerName: e.target.value })
                  }
                  placeholder="e.g., Kavita Menon"
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#141413] mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  value={newReviewDraft.location}
                  onChange={(e) =>
                    setNewReviewDraft({ ...newReviewDraft, location: e.target.value })
                  }
                  placeholder="e.g., Hyderabad"
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#141413] mb-1">
                  Product Purchased
                </label>
                <select
                  value={newReviewDraft.productName}
                  onChange={(e) =>
                    setNewReviewDraft({ ...newReviewDraft, productName: e.target.value })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-sm"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#141413] mb-1">
                  Rating
                </label>
                <select
                  value={newReviewDraft.rating}
                  onChange={(e) =>
                    setNewReviewDraft({
                      ...newReviewDraft,
                      rating: Number(e.target.value),
                    })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-sm"
                >
                  <option value={5}>★★★★★ (5/5)</option>
                  <option value={4}>★★★★☆ (4/5)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#141413] mb-1">
                Your Review *
              </label>
              <textarea
                rows={3}
                required
                value={newReviewDraft.comment}
                onChange={(e) =>
                  setNewReviewDraft({ ...newReviewDraft, comment: e.target.value })
                }
                placeholder="Share your thoughts on craftsmanship, finishing, and service..."
                className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-sm"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setReviewModalOpen(false)}
                className="px-4 py-2 border border-[#D8D0C1] text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#141413] text-[#FBFBF9] text-xs font-medium tracking-wider"
              >
                Publish Review
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
