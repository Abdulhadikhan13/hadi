import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  MapPin,
  ShieldCheck,
  Smartphone,
  Building2,
  Banknote,
  UserCheck,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../data/initialData';
import { Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cartSummary,
    currentUser,
    settings,
    placeOrder,
    lastPlacedOrder,
    navigateTo,
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Step 1 State
  const [customerDetails, setCustomerDetails] = useState({
    name: currentUser?.fullName || 'Aarav Sharma',
    mobile: currentUser?.mobile || '+91 98201 44510',
    email: currentUser?.email || 'customer@goldno1.com',
  });

  // Step 2 State
  const defaultAddr = currentUser?.addresses[0];
  const [address, setAddress] = useState({
    houseFlat: defaultAddr?.houseFlat || 'Flat 1402, Imperial Heights',
    street: defaultAddr?.street || 'Napean Sea Road',
    area: defaultAddr?.area || 'Malabar Hill',
    city: defaultAddr?.city || 'Mumbai',
    state: defaultAddr?.state || 'Maharashtra',
    pinCode: defaultAddr?.pinCode || '400006',
  });

  // Step 3 State
  const [paymentMethod, setPaymentMethod] =
    useState<Order['paymentMethod']>('UPI');
  const [upiId, setUpiId] = useState('aarav.sharma@okhdfcbank');
  const [cardLast4, setCardLast4] = useState('4829');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank Privé NetBanking');

  // If an order was just confirmed in this session, show the Order Confirmed screen
  const activeConfirmed = confirmedOrder || (cartSummary.detailedItems.length === 0 ? lastPlacedOrder : null);

  if (activeConfirmed && confirmedOrder) {
    return (
      <div className="min-h-screen bg-[#FBFBF9] py-14 lg:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto bg-[#F4F1EA] border border-[#C59B27] p-8 sm:p-12 space-y-8">
          <div className="text-center space-y-3 border-b border-[#D8D0C1] pb-8">
            <div className="w-14 h-14 mx-auto bg-[#141413] text-[#D4AF37] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-xs tracking-[0.22em] text-[#9A6F0A] font-medium">
              BIS HALLMARKED ORDER RECEIPT
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#141413]">
              Order Confirmed!
            </h1>
            <p className="font-serif italic text-xl text-[#4A4740]">
              “Thank you for choosing GOLD NO1.”
            </p>
          </div>

          {/* Key Order Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FBFBF9] border border-[#E5DFD3] p-5 text-xs font-mono tabular-nums">
            <div>
              <span className="text-[#6E6A63] font-sans block">Order ID</span>
              <strong className="text-sm text-[#141413]">{confirmedOrder.id}</strong>
            </div>
            <div>
              <span className="text-[#6E6A63] font-sans block">Estimated Delivery</span>
              <strong className="text-sm text-[#2E6B40]">
                {confirmedOrder.estimatedDelivery}
              </strong>
            </div>
            <div>
              <span className="text-[#6E6A63] font-sans block">Payment Method</span>
              <strong className="text-sm text-[#141413]">
                {confirmedOrder.paymentMethod} ({confirmedOrder.paymentStatus})
              </strong>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-[#FBFBF9] border border-[#E5DFD3] p-5 text-xs space-y-1">
            <p className="font-semibold text-[#141413] tracking-wider">
              INSURED DELIVERY ADDRESS
            </p>
            <p className="text-[#4A4740] pt-1">
              <strong>{confirmedOrder.customerName}</strong> ({confirmedOrder.customerMobile})
            </p>
            <p className="text-[#4A4740]">
              {confirmedOrder.shippingAddress.houseFlat}, {confirmedOrder.shippingAddress.street},{' '}
              {confirmedOrder.shippingAddress.area}, {confirmedOrder.shippingAddress.city},{' '}
              {confirmedOrder.shippingAddress.state} — {confirmedOrder.shippingAddress.pinCode}
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-[#FBFBF9] border border-[#E5DFD3] p-6 space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#141413] border-b border-[#EFECE4] pb-2">
              Order Summary
            </h2>

            <div className="divide-y divide-[#EFECE4]">
              {confirmedOrder.items.map((item, idx) => (
                <div
                  key={`${item.productId}-${idx}`}
                  className="py-3 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover bg-[#F4F1EA] border border-[#E5DFD3]"
                    />
                    <div>
                      <p className="font-serif text-base font-semibold text-[#141413]">
                        {item.name}
                      </p>
                      <p className="text-[#6E6A63] font-mono tabular-nums">
                        {item.goldPurity} · {item.netWeight}g · Size: {item.selectedSize} · Qty:{' '}
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono tabular-nums font-semibold text-[#141413]">
                    {formatINR(item.unitFinalPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E5DFD3] space-y-1.5 text-xs font-mono tabular-nums text-[#4A4740]">
              <div className="flex justify-between">
                <span className="font-sans">Gold & Stone Subtotal</span>
                <span>{formatINR(confirmedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans">Making Charges</span>
                <span>{formatINR(confirmedOrder.makingChargesTotal)}</span>
              </div>
              {confirmedOrder.discountAmount > 0 && (
                <div className="flex justify-between text-[#2E6B40]">
                  <span className="font-sans">Privilege Discount</span>
                  <span>− {formatINR(confirmedOrder.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-sans">GST (3%)</span>
                <span>{formatINR(confirmedOrder.gstTotal)}</span>
              </div>
              <div className="pt-2 border-t border-[#E5DFD3] flex justify-between text-base font-bold text-[#141413]">
                <span className="font-serif">Total Amount</span>
                <span>{formatINR(confirmedOrder.grandTotal)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigateTo('orders')}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-wider hover:bg-[#B8860B] transition-colors"
            >
              VIEW IN ORDER HISTORY
            </button>
            <button
              type="button"
              onClick={() => navigateTo('shop')}
              className="w-full sm:w-auto px-7 py-3.5 border border-[#141413] text-[#141413] text-xs font-semibold tracking-wider hover:bg-[#141413] hover:text-[#FBFBF9] transition-colors"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cartSummary.detailedItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FBFBF9] py-20 px-4 text-center space-y-4">
        <h1 className="font-serif text-3xl text-[#141413]">Your Shopping Bag is Empty</h1>
        <p className="text-sm text-[#6E6A63]">
          Add items to your shopping bag before proceeding to checkout.
        </p>
        <button
          type="button"
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-wider"
        >
          RETURN TO SHOP
        </button>
      </div>
    );
  }

  const validateStep1 = () => {
    if (!customerDetails.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return false;
    }
    if (!customerDetails.mobile.trim() || customerDetails.mobile.trim().length < 8) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return false;
    }
    if (!customerDetails.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const validateStep2 = () => {
    if (
      !address.houseFlat.trim() ||
      !address.street.trim() ||
      !address.city.trim() ||
      !address.state.trim() ||
      !address.pinCode.trim()
    ) {
      setErrorMsg('Please complete all required delivery address fields.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handlePlaceOrder = () => {
    const created = placeOrder({
      customerName: customerDetails.name.trim(),
      customerEmail: customerDetails.email.trim(),
      customerMobile: customerDetails.mobile.trim(),
      shippingAddress: {
        id: `addr-${Date.now()}`,
        label: 'Delivery Address',
        ...address,
      },
      paymentMethod,
    });
    setConfirmedOrder(created);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] py-12 lg:py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1360px] mx-auto">
        <div className="border-b border-[#E5DFD3] pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
              SECURE INSURED CHECKOUT
            </p>
            <h1 className="mt-1 font-serif text-3xl sm:text-5xl font-semibold text-[#141413]">
              Complete Your Order
            </h1>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('cart')}
            className="text-xs font-medium text-[#4A4740] hover:text-[#141413] inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Shopping Cart</span>
          </button>
        </div>

        {/* 4-Step Indicator */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { num: 1, label: 'STEP 1 — Customer Details' },
            { num: 2, label: 'STEP 2 — Delivery Address' },
            { num: 3, label: 'STEP 3 — Payment' },
            { num: 4, label: 'STEP 4 — Order Review' },
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => {
                if (s.num < step) setStep(s.num as any);
              }}
              className={`p-3.5 text-left border text-xs font-medium transition-colors ${
                step === s.num
                  ? 'bg-[#141413] text-[#FBFBF9] border-[#141413]'
                  : step > s.num
                  ? 'bg-[#F4F1EA] text-[#141413] border-[#C59B27]'
                  : 'bg-[#FBFBF9] text-[#8A8479] border-[#E5DFD3]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {errorMsg && (
          <div className="mb-6 bg-red-50 border border-red-300 text-red-900 px-4 py-3 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Active Checkout Step */}
          <div className="lg:col-span-8 bg-[#FBFBF9] border border-[#E5DFD3] p-6 sm:p-8">
            {/* STEP 1: CUSTOMER DETAILS */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-[#EFECE4] pb-3">
                  <UserCheck className="w-5 h-5 text-[#B8860B]" />
                  <h2 className="font-serif text-2xl font-semibold text-[#141413]">
                    Step 1 — Customer Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#141413] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerDetails.name}
                      onChange={(e) =>
                        setCustomerDetails({ ...customerDetails, name: e.target.value })
                      }
                      placeholder="Enter recipient full name for BIS invoice"
                      className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#141413] mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={customerDetails.mobile}
                      onChange={(e) =>
                        setCustomerDetails({ ...customerDetails, mobile: e.target.value })
                      }
                      placeholder="+91 98201 XXXXX"
                      className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#141413] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) =>
                        setCustomerDetails({ ...customerDetails, email: e.target.value })
                      }
                      placeholder="you@example.com"
                      className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep1()) setStep(2);
                    }}
                    className="px-7 py-3 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-wider hover:bg-[#B8860B] transition-colors inline-flex items-center gap-2"
                  >
                    <span>CONTINUE TO DELIVERY ADDRESS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DELIVERY ADDRESS */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-[#EFECE4] pb-3">
                  <MapPin className="w-5 h-5 text-[#B8860B]" />
                  <h2 className="font-serif text-2xl font-semibold text-[#141413]">
                    Step 2 — Delivery Address
                  </h2>
                </div>

                {currentUser && currentUser.addresses.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-[#6E6A63]">Select a saved address:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentUser.addresses.map((addr) => (
                        <button
                          key={addr.id}
                          type="button"
                          onClick={() =>
                            setAddress({
                              houseFlat: addr.houseFlat,
                              street: addr.street,
                              area: addr.area,
                              city: addr.city,
                              state: addr.state,
                              pinCode: addr.pinCode,
                            })
                          }
                          className="p-3 border border-[#D8D0C1] bg-[#F4F1EA] hover:border-[#B8860B] text-left text-xs space-y-1"
                        >
                          <p className="font-semibold text-[#141413]">{addr.label}</p>
                          <p className="text-[#4A4740]">
                            {addr.houseFlat}, {addr.street}, {addr.city} — {addr.pinCode}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#141413] mb-1">
                      House / Flat / Building *
                    </label>
                    <input
                      type="text"
                      value={address.houseFlat}
                      onChange={(e) =>
                        setAddress({ ...address, houseFlat: e.target.value })
                      }
                      className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#141413] mb-1">
                      Street / Road *
                    </label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                      className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#141413] mb-1">
                      Area / Locality *
                    </label>
                    <input
                      type="text"
                      value={address.area}
                      onChange={(e) =>
                        setAddress({ ...address, area: e.target.value })
                      }
                      className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#141413] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#141413] mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#141413] mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      value={address.pinCode}
                      onChange={(e) =>
                        setAddress({ ...address, pinCode: e.target.value })
                      }
                      className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 border border-[#D8D0C1] text-xs font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep2()) setStep(3);
                    }}
                    className="px-7 py-3 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-wider hover:bg-[#B8860B] transition-colors inline-flex items-center gap-2"
                  >
                    <span>CONTINUE TO PAYMENT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-[#EFECE4] pb-3">
                  <CreditCard className="w-5 h-5 text-[#B8860B]" />
                  <h2 className="font-serif text-2xl font-semibold text-[#141413]">
                    Step 3 — Select Payment Method
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'UPI' as const,
                      label: 'UPI (GPay, PhonePe, BHIM)',
                      desc: 'Instant zero-fee verified bank transfer',
                      icon: Smartphone,
                      enabled: true,
                    },
                    {
                      id: 'Credit/Debit Card' as const,
                      label: 'Credit / Debit Card',
                      desc: 'Visa, Mastercard, RuPay & Amex supported',
                      icon: CreditCard,
                      enabled: true,
                    },
                    {
                      id: 'Net Banking' as const,
                      label: 'Net Banking (RTGS / NEFT / IMPS)',
                      desc: 'All major Indian banks supported',
                      icon: Building2,
                      enabled: true,
                    },
                    {
                      id: 'Cash on Delivery' as const,
                      label: 'Cash on Delivery (COD)',
                      desc: 'Pay upon insured doorstep verification',
                      icon: Banknote,
                      enabled: settings.codEnabled,
                    },
                  ]
                    .filter((m) => m.enabled)
                    .map((method) => {
                      const IconComp = method.icon;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-4 border text-left transition-colors flex items-start gap-3 ${
                            paymentMethod === method.id
                              ? 'bg-[#F4F1EA] border-[#141413] ring-1 ring-[#141413]'
                              : 'bg-[#FBFBF9] border-[#D8D0C1] hover:border-[#141413]'
                          }`}
                        >
                          <IconComp className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-[#141413]">
                              {method.label}
                            </p>
                            <p className="text-[11px] text-[#6E6A63] mt-0.5">
                              {method.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                </div>

                {/* Contextual Payment Detail Input */}
                <div className="bg-[#F4F1EA] border border-[#E5DFD3] p-5">
                  {paymentMethod === 'UPI' && (
                    <div>
                      <label className="block text-xs font-medium text-[#141413] mb-1">
                        Enter UPI ID / VPA
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full max-w-md border border-[#D8D0C1] bg-white px-3 py-2 text-xs font-mono"
                      />
                    </div>
                  )}
                  {paymentMethod === 'Credit/Debit Card' && (
                    <div className="space-y-3 max-w-md">
                      <p className="text-xs font-medium text-[#141413]">
                        Encrypted Card Checkout (Ending •••• {cardLast4})
                      </p>
                      <input
                        type="text"
                        value={`•••• •••• •••• ${cardLast4}`}
                        onChange={(e) =>
                          setCardLast4(e.target.value.slice(-4) || '4829')
                        }
                        className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-xs font-mono"
                      />
                    </div>
                  )}
                  {paymentMethod === 'Net Banking' && (
                    <div>
                      <label className="block text-xs font-medium text-[#141413] mb-1">
                        Select Preferred Bank
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full max-w-md border border-[#D8D0C1] bg-white px-3 py-2 text-xs"
                      >
                        <option>HDFC Bank Privé NetBanking</option>
                        <option>ICICI Bank Corporate & Retail</option>
                        <option>State Bank of India (SBI)</option>
                        <option>Axis Bank Burgundy</option>
                      </select>
                    </div>
                  )}
                  {paymentMethod === 'Cash on Delivery' && (
                    <p className="text-xs text-[#4A4740]">
                      Cash / UPI on Delivery is verified for <strong>{customerDetails.name}</strong> at PIN Code <strong>{address.pinCode}</strong>. Total payable upon insured delivery: <strong className="font-mono">{formatINR(cartSummary.grandTotal)}</strong>.
                    </p>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 border border-[#D8D0C1] text-xs font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-7 py-3 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-wider hover:bg-[#B8860B] transition-colors inline-flex items-center gap-2"
                  >
                    <span>REVIEW YOUR ORDER</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: ORDER REVIEW */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-[#EFECE4] pb-3">
                  <ShieldCheck className="w-5 h-5 text-[#B8860B]" />
                  <h2 className="font-serif text-2xl font-semibold text-[#141413]">
                    Step 4 — Order Review
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-[#F4F1EA] border border-[#E5DFD3] p-4 space-y-1">
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#141413]">CUSTOMER & DELIVERY</span>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="underline text-[#B8860B]"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-[#141413] font-medium pt-1">{customerDetails.name}</p>
                    <p className="text-[#4A4740]">{customerDetails.mobile} · {customerDetails.email}</p>
                    <p className="text-[#4A4740]">
                      {address.houseFlat}, {address.street}, {address.area}, {address.city},{' '}
                      {address.state} — {address.pinCode}
                    </p>
                  </div>

                  <div className="bg-[#F4F1EA] border border-[#E5DFD3] p-4 space-y-1">
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#141413]">PAYMENT METHOD</span>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="underline text-[#B8860B]"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-[#141413] font-medium pt-1">{paymentMethod}</p>
                    <p className="text-[#4A4740]">
                      Official BIS Hallmark & Tax Invoice will be enclosed with your insured shipment.
                    </p>
                  </div>
                </div>

                {/* Itemized Review */}
                <div className="border border-[#E5DFD3] divide-y divide-[#EFECE4]">
                  {cartSummary.detailedItems.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="p-4 flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 object-cover bg-[#F4F1EA] border border-[#E5DFD3]"
                        />
                        <div>
                          <p className="font-serif text-lg font-semibold text-[#141413]">
                            {item.product.name}
                          </p>
                          <p className="text-[#6E6A63] font-mono tabular-nums">
                            {item.product.goldPurity} Gold · {item.product.netWeight}g Net · Size:{' '}
                            {item.selectedSize} · Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono tabular-nums font-semibold text-[#141413]">
                        {formatINR(item.lineTotal)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 border border-[#D8D0C1] text-xs font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="px-8 py-4 bg-[#C59B27] text-[#141413] text-xs font-bold tracking-[0.18em] hover:bg-[#D4AF37] transition-colors"
                  >
                    PLACE ORDER — {formatINR(cartSummary.grandTotal)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Persistent Order Summary */}
          <aside className="lg:col-span-4 bg-[#F4F1EA] border border-[#E5DFD3] p-6 space-y-4">
            <h3 className="font-serif text-2xl font-semibold text-[#141413] border-b border-[#D8D0C1] pb-3">
              Order Summary ({cartSummary.itemCount})
            </h3>
            <div className="space-y-2.5 text-xs font-mono tabular-nums text-[#4A4740]">
              <div className="flex justify-between">
                <span className="font-sans">Gold & Stone Subtotal</span>
                <span>{formatINR(cartSummary.subtotalBase)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans">Making Charges</span>
                <span>{formatINR(cartSummary.makingChargesTotal)}</span>
              </div>
              {cartSummary.discountAmount > 0 && (
                <div className="flex justify-between text-[#2E6B40]">
                  <span className="font-sans">Privilege Discount</span>
                  <span>− {formatINR(cartSummary.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-sans">GST (3%)</span>
                <span>{formatINR(cartSummary.gstTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans">Insured Shipping</span>
                <span className="text-[#2E6B40]">
                  {cartSummary.deliveryCharge === 0
                    ? 'FREE'
                    : formatINR(cartSummary.deliveryCharge)}
                </span>
              </div>
              <div className="pt-3 border-t border-[#D8D0C1] flex justify-between text-lg font-bold text-[#141413]">
                <span className="font-serif">Grand Total</span>
                <span>{formatINR(cartSummary.grandTotal)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
