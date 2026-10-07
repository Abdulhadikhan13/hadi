import React from 'react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigateTo, settings } = useStore();

  return (
    <footer className="bg-[#141413] text-[#EFECE4] border-t border-[#2C2A27]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand Identity */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home');
              }}
              className="inline-block font-serif text-3xl font-bold tracking-[0.14em] text-[#FBFBF9]"
            >
              {settings.brandName}
            </a>
            <p className="font-serif italic text-lg text-[#D4AF37]">
              “{settings.tagline}”
            </p>
            <p className="text-sm text-[#A8A297] leading-relaxed max-w-sm">
              Handcrafted BIS Hallmarked 22K & 24K gold and certified diamond heirlooms designed for weddings, auspicious celebrations, and everyday elegance.
            </p>
            <div className="pt-2 flex items-center gap-5 text-xs tracking-wider text-[#D4AF37]">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FBFBF9] underline underline-offset-4 transition-colors"
              >
                Instagram
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FBFBF9] underline underline-offset-4 transition-colors"
              >
                Facebook
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={settings.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FBFBF9] underline underline-offset-4 transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#FBFBF9] tracking-wide">
              Shop
            </h3>
            <ul className="space-y-2.5 text-sm text-[#A8A297]">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('gold-jewellery')}
                  className="hover:text-[#FBFBF9] transition-colors"
                >
                  Gold Jewellery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('diamond-jewellery')}
                  className="hover:text-[#FBFBF9] transition-colors"
                >
                  Diamond Jewellery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('bridal-collection')}
                  className="hover:text-[#FBFBF9] transition-colors"
                >
                  Bridal Collection
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('new-arrivals')}
                  className="hover:text-[#FBFBF9] transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('best-sellers')}
                  className="hover:text-[#FBFBF9] transition-colors"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('offers')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Festive Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#FBFBF9] tracking-wide">
              Customer Care
            </h3>
            <ul className="space-y-2.5 text-sm text-[#A8A297]">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="hover:text-[#FBFBF9] transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('terms')}
                  className="hover:text-[#FBFBF9] transition-colors"
                >
                  Insured Shipping
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('terms')}
                  className="hover:text-[#FBFBF9] transition-colors"
                >
                  Returns & Lifetime Exchange
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('about')}
                  className="hover:text-[#FBFBF9] transition-colors"
                >
                  Gold Purity & FAQs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('orders')}
                  className="hover:text-[#FBFBF9] transition-colors"
                >
                  Track & View Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#FBFBF9] tracking-wide">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-[#A8A297]">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('about')}
                  className="hover:text-[#FBFBF9] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('privacy')}
                  className="hover:text-[#FBFBF9] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('terms')}
                  className="hover:text-[#FBFBF9] transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('account')}
                  className="hover:text-[#FBFBF9] transition-colors"
                >
                  My Account
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('admin')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Showroom Admin
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Trust Row */}
        <div className="mt-14 pt-8 border-t border-[#2C2A27] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8479]">
          <p>© 2026 GOLD NO1. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            <span>BIS 916 & 999 Hallmarked</span>
            <span aria-hidden="true">·</span>
            <span>IGI Certified Natural Diamonds</span>
            <span aria-hidden="true">·</span>
            <span>100% Insured Doorstep Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
