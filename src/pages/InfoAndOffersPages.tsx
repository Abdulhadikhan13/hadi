import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Copy,
  Edit3,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR, STUDIO_IMAGES } from '../data/initialData';
import { JewelleryImage } from '../components/JewelleryImage';

export const AboutUsPage: React.FC = () => {
  const { settings, updateSettings, navigateTo } = useStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    storyHeadline: settings.storyHeadline,
    storyLead: settings.storyLead,
    storyBody: settings.storyBody,
    storyPromise: settings.storyPromise,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(draft);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9]">
      {/* Hero Banner */}
      <div className="bg-[#141413] text-[#FBFBF9] py-16 lg:py-24 px-4 sm:px-8 lg:px-12 border-b border-[#2E2C28]">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs tracking-[0.22em] text-[#D4AF37] font-medium">
              ABOUT {settings.brandName}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FBFBF9]">
              {settings.storyHeadline}
            </h1>
            <p className="font-serif italic text-2xl text-[#E6C665]">
              “{settings.tagline}”
            </p>
          </div>
          <div className="lg:col-span-5 aspect-16/9 border border-[#2E2C28] overflow-hidden">
            <JewelleryImage
              src={STUDIO_IMAGES.heroShowroom}
              alt="GOLD NO1 Flagship Showroom Aesthetic"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Main Editable Story Content */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-16 lg:py-24 space-y-12">
        <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-4">
          <span className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
            OUR PHILOSOPHY & CRAFTSMANSHIP
          </span>
          <button
            type="button"
            onClick={() => {
              setDraft({
                storyHeadline: settings.storyHeadline,
                storyLead: settings.storyLead,
                storyBody: settings.storyBody,
                storyPromise: settings.storyPromise,
              });
              setEditing((prev) => !prev);
            }}
            className="text-xs text-[#4A4740] hover:text-[#141413] inline-flex items-center gap-1.5 underline underline-offset-4"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{editing ? 'Cancel Editing' : 'Edit Story Information'}</span>
          </button>
        </div>

        {editing ? (
          <form
            onSubmit={handleSave}
            className="bg-[#F4F1EA] border border-[#C59B27] p-6 sm:p-8 space-y-4"
          >
            <div>
              <label className="block text-xs font-medium text-[#141413] mb-1">
                Headline
              </label>
              <input
                type="text"
                value={draft.storyHeadline}
                onChange={(e) => setDraft({ ...draft, storyHeadline: e.target.value })}
                className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#141413] mb-1">
                Lead Paragraph
              </label>
              <textarea
                rows={3}
                value={draft.storyLead}
                onChange={(e) => setDraft({ ...draft, storyLead: e.target.value })}
                className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#141413] mb-1">
                Artisanal Heritage & Design Paragraph
              </label>
              <textarea
                rows={4}
                value={draft.storyBody}
                onChange={(e) => setDraft({ ...draft, storyBody: e.target.value })}
                className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#141413] mb-1">
                Transparency & Customer Commitment Paragraph
              </label>
              <textarea
                rows={3}
                value={draft.storyPromise}
                onChange={(e) => setDraft({ ...draft, storyPromise: e.target.value })}
                className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-wider"
            >
              SAVE STORY UPDATES
            </button>
          </form>
        ) : (
          <div className="space-y-6 text-[#141413]">
            <p className="font-serif text-2xl sm:text-3xl leading-relaxed text-[#141413]">
              {settings.storyLead}
            </p>
            <p className="text-base text-[#4A4740] leading-relaxed">
              {settings.storyBody}
            </p>
            <p className="text-base text-[#4A4740] leading-relaxed">
              {settings.storyPromise}
            </p>
          </div>
        )}

        {/* Three Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#E5DFD3]">
          <div className="bg-[#F4F1EA] border border-[#E5DFD3] p-6 space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#B8860B]" />
            <h3 className="font-serif text-2xl font-semibold text-[#141413]">
              Uncompromising Purity
            </h3>
            <p className="text-xs text-[#4A4740] leading-relaxed">
              Every gold ornament is hallmarked in accordance with BIS standards, ensuring your family receives the exact karat purity promised.
            </p>
          </div>
          <div className="bg-[#F4F1EA] border border-[#E5DFD3] p-6 space-y-2">
            <Sparkles className="w-6 h-6 text-[#B8860B]" />
            <h3 className="font-serif text-2xl font-semibold text-[#141413]">
              Timeless Indian Artistry
            </h3>
            <p className="text-xs text-[#4A4740] leading-relaxed">
              From temple nakshi harams and bridal kadas to minimalist daily wear, each design honours Indian heritage with modern refinement.
            </p>
          </div>
          <div className="bg-[#F4F1EA] border border-[#E5DFD3] p-6 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-[#B8860B]" />
            <h3 className="font-serif text-2xl font-semibold text-[#141413]">
              Complete Transparency
            </h3>
            <p className="text-xs text-[#4A4740] leading-relaxed">
              Gross weight, net gold weight, stone weight, making charges, and GST are clearly itemized before you make any decision.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="px-7 py-3.5 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-wider hover:bg-[#B8860B] transition-colors"
          >
            EXPLORE OUR COLLECTION
          </button>
          <button
            type="button"
            onClick={() => navigateTo('contact')}
            className="px-7 py-3.5 border border-[#141413] text-[#141413] text-xs font-semibold tracking-wider hover:bg-[#141413] hover:text-[#FBFBF9] transition-colors"
          >
            CONTACT OUR SHOWROOM
          </button>
        </div>
      </div>
    </div>
  );
};

export const ContactUsPage: React.FC = () => {
  const { settings, updateSettings, showToast } = useStore();
  const [editingInfo, setEditingInfo] = useState(false);
  const [infoDraft, setInfoDraft] = useState({
    address: settings.address,
    phone: settings.phone,
    email: settings.email,
    openingHours: settings.openingHours,
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(infoDraft);
    setEditingInfo(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      return;
    }
    setSubmitted(true);
    showToast(
      'Message Received',
      'Our showroom concierge will respond shortly.',
      'success'
    );
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] py-12 lg:py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1360px] mx-auto space-y-12">
        <div className="border-b border-[#E5DFD3] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
              SHOWROOM CONCIERGE & APPOINTMENTS
            </p>
            <h1 className="mt-1 font-serif text-3xl sm:text-5xl font-semibold text-[#141413]">
              Contact {settings.brandName}
            </h1>
          </div>
          <button
            type="button"
            onClick={() => {
              setInfoDraft({
                address: settings.address,
                phone: settings.phone,
                email: settings.email,
                openingHours: settings.openingHours,
              });
              setEditingInfo((prev) => !prev);
            }}
            className="text-xs text-[#4A4740] hover:text-[#141413] inline-flex items-center gap-1.5 underline underline-offset-4"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{editingInfo ? 'Close Editor' : 'Edit Showroom Contact Details'}</span>
          </button>
        </div>

        {editingInfo && (
          <form
            onSubmit={handleSaveInfo}
            className="bg-[#F4F1EA] border border-[#C59B27] p-6 space-y-4"
          >
            <h2 className="font-serif text-2xl font-semibold text-[#141413]">
              Update Showroom Contact Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#141413] mb-1">
                  Showroom Address
                </label>
                <input
                  type="text"
                  value={infoDraft.address}
                  onChange={(e) =>
                    setInfoDraft({ ...infoDraft, address: e.target.value })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#141413] mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={infoDraft.phone}
                  onChange={(e) =>
                    setInfoDraft({ ...infoDraft, phone: e.target.value })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#141413] mb-1">
                  Email Address
                </label>
                <input
                  type="text"
                  value={infoDraft.email}
                  onChange={(e) =>
                    setInfoDraft({ ...infoDraft, email: e.target.value })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#141413] mb-1">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={infoDraft.openingHours}
                  onChange={(e) =>
                    setInfoDraft({ ...infoDraft, openingHours: e.target.value })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-xs"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-[#141413] text-[#FBFBF9] text-xs font-medium"
            >
              Save Contact Details
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Showroom Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F4F1EA] border border-[#E5DFD3] p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-wider text-[#141413]">
                  {settings.brandName}
                </h2>
                <p className="font-serif italic text-lg text-[#9A6F0A]">
                  {settings.tagline}
                </p>
              </div>

              <div className="space-y-4 text-xs text-[#4A4740]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#141413]">Address:</p>
                    <p className="mt-0.5 leading-relaxed">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#141413]">Phone:</p>
                    <p className="mt-0.5 font-mono">{settings.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#141413]">Email:</p>
                    <p className="mt-0.5">{settings.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#141413]">Opening Hours:</p>
                    <p className="mt-0.5">{settings.openingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Placeholder */}
            <div className="bg-[#EFECE4] border border-[#D8D0C1] p-6 min-h-[240px] flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-11 h-11 bg-[#141413] text-[#D4AF37] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#141413]">
                Google Maps Location Placeholder
              </h3>
              <p className="text-xs text-[#6E6A63] max-w-sm leading-relaxed">
                {settings.address}
              </p>
              <span className="text-[11px] font-mono text-[#9A6F0A]">
                [Embed Showroom Google Maps iFrame or Coordinates Here]
              </span>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7 bg-[#FBFBF9] border border-[#E5DFD3] p-6 sm:p-10">
            <h2 className="font-serif text-3xl font-semibold text-[#141413]">
              Send Us a Message
            </h2>
            <p className="text-xs text-[#6E6A63] mt-1 mb-6">
              Inquire about bespoke bridal orders, private showroom viewings, or existing orders.
            </p>

            {submitted && (
              <div className="mb-6 bg-[#F4F1EA] border border-[#C59B27] p-4 flex items-center gap-3 text-xs text-[#141413]">
                <CheckCircle2 className="w-4 h-4 text-[#2E6B40] shrink-0" />
                <span>
                  Thank you for contacting GOLD NO1. Our showroom concierge has received your inquiry.
                </span>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#141413] mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    placeholder="Your Full Name"
                    className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#141413] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    placeholder="you@example.com"
                    className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#141413] mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={contactForm.phone}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, phone: e.target.value })
                  }
                  placeholder="+91 98201 XXXXX"
                  className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#141413] mb-1">
                  Message *
                </label>
                <textarea
                  rows={5}
                  required
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  placeholder="How can our jewellery specialists assist you today?"
                  className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm"
                />
              </div>

              <button
                type="submit"
                className="px-7 py-3.5 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-[0.16em] hover:bg-[#B8860B] transition-colors inline-flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SEND MESSAGE</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OffersPage: React.FC = () => {
  const { offers, applyOfferCode, navigateTo, showToast } = useStore();

  return (
    <div className="min-h-screen bg-[#FBFBF9] py-12 lg:py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1360px] mx-auto space-y-10">
        <div className="border-b border-[#E5DFD3] pb-6">
          <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
            AUSPICIOUS PRIVILEGES & PROMOTIONS
          </p>
          <h1 className="mt-1 font-serif text-3xl sm:text-5xl font-semibold text-[#141413]">
            Exclusive Showroom Offers
          </h1>
          <p className="mt-2 text-sm text-[#4A4740] max-w-2xl">
            Apply any active privilege code in your Shopping Cart or Checkout to enjoy special savings on your GOLD NO1 purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers
            .filter((o) => o.active)
            .map((offer) => (
              <div
                key={offer.id}
                className="bg-[#F4F1EA] border border-[#C59B27] p-6 sm:p-8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[#9A6F0A] font-semibold">
                    {offer.discountPercent}% PRIVILEGE · {offer.applicableOn}
                  </span>
                  <h2 className="font-serif text-2xl font-semibold text-[#141413]">
                    {offer.title}
                  </h2>
                  <p className="text-xs text-[#4A4740] leading-relaxed">
                    {offer.description}
                  </p>
                  <p className="text-xs font-mono text-[#6E6A63] tabular-nums">
                    Min. Order: {formatINR(offer.minOrderAmount)} · Valid until{' '}
                    {offer.validUntil}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D8D0C1] flex items-center justify-between gap-3">
                  <span className="font-mono text-sm font-bold tracking-wider text-[#141413] bg-[#FBFBF9] px-3 py-1.5 border border-[#D8D0C1]">
                    {offer.code}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(offer.code);
                      applyOfferCode(offer.code);
                      showToast('Offer Code Copied & Selected', offer.code, 'success');
                      navigateTo('shop');
                    }}
                    className="px-4 py-2 bg-[#141413] text-[#FBFBF9] text-xs font-medium hover:bg-[#B8860B] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Apply & Shop</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  const { settings } = useStore();
  return (
    <div className="min-h-screen bg-[#FBFBF9] py-12 lg:py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-[#E5DFD3] pb-6">
          <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
            DATA PROTECTION & CLIENT CONFIDENTIALITY
          </p>
          <h1 className="mt-1 font-serif text-3xl sm:text-5xl font-semibold text-[#141413]">
            Privacy Policy
          </h1>
        </div>

        <div className="space-y-6 text-sm text-[#4A4740] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-semibold text-[#141413]">
              1. Information We Collect
            </h2>
            <p>
              When you browse or place an order with {settings.brandName}, we collect only the essential personal information required to process your BIS Hallmarked tax invoice, arrange insured logistics delivery, and provide lifetime ornament care — including your name, mobile number, email address, and shipping address.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-semibold text-[#141413]">
              2. Payment Security
            </h2>
            <p>
              All online transactions (UPI, Credit/Debit Cards, and Net Banking) are processed via encrypted, PCI-DSS compliant payment gateways. {settings.brandName} never stores your raw card numbers, CVV codes, or net-banking credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-semibold text-[#141413]">
              3. Confidentiality of Jewellery Purchases
            </h2>
            <p>
              We respect the privacy of your family and bridal acquisitions. Client order histories, custom sizing records, and delivery schedules are never shared with third-party marketers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export const TermsAndConditionsPage: React.FC = () => {
  const { settings } = useStore();
  return (
    <div className="min-h-screen bg-[#FBFBF9] py-12 lg:py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-[#E5DFD3] pb-6">
          <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
            SHOWROOM POLICIES & ASSURANCES
          </p>
          <h1 className="mt-1 font-serif text-3xl sm:text-5xl font-semibold text-[#141413]">
            Terms & Conditions
          </h1>
        </div>

        <div className="space-y-6 text-sm text-[#4A4740] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-semibold text-[#141413]">
              1. Gold Purity & BIS Hallmarking
            </h2>
            <p>
              Every gold ornament sold by {settings.brandName} is hallmarked in accordance with Bureau of Indian Standards (BIS) norms and accompanied by an itemized invoice stating Gross Weight, Net Gold Weight, Stone Weight, Making Charges, and 3% GST.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-semibold text-[#141413]">
              2. Pricing & Market Rate Fluctuations
            </h2>
            <p>
              Jewellery prices are linked to prevailing bullion market rates for 24K, 22K, and 18K gold. Once an order is confirmed at checkout, the price for that order is locked and protected against subsequent market fluctuations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-semibold text-[#141413]">
              3. Insured Shipping & Delivery
            </h2>
            <p>
              All orders are dispatched in tamper-evident sealed boxes with 100% transit insurance until signed for by the recipient.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-semibold text-[#141413]">
              4. Returns & Lifetime Exchange
            </h2>
            <p>
              Unused ornaments in original condition with intact BIS Hallmark tags and diamond certificates are eligible for easy return or exchange. Lifetime gold exchange is calculated transparently at prevailing market value for net gold weight.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
