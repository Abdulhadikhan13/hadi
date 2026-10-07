import React, { useState } from 'react';
import {
  CreditCard,
  Heart,
  LogOut,
  MapPin,
  Package,
  Plus,
  Trash2,
  User,
  X,
  Eye,
  LayoutDashboard,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../data/initialData';
import { Order } from '../types';

export const LoginPage: React.FC = () => {
  const { login, navigateTo, showToast } = useStore();
  const [email, setEmail] = useState('customer@goldno1.com');
  const [password, setPassword] = useState('••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 4) {
      setError('Please enter your account password.');
      return;
    }
    setError('');
    const res = login(email, password);
    if (res.success) {
      navigateTo('account');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#FBFBF9] flex items-center justify-center py-14 px-4">
      <div className="w-full max-w-md bg-[#F4F1EA] border border-[#E5DFD3] p-8 sm:p-10 space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs tracking-[0.22em] text-[#9A6F0A] font-medium">
            CLIENT PRIVÉ PORTAL
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141413]">
            Sign In to GOLD NO1
          </h1>
          <p className="text-xs text-[#6E6A63]">
            Access your orders, BIS certificates, saved addresses, and wishlist.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-900 px-3.5 py-2.5 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#141413] mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@goldno1.com"
              className="w-full bg-[#FBFBF9] border border-[#D8D0C1] px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-[#B8860B]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#141413] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-[#FBFBF9] border border-[#D8D0C1] px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-[#B8860B]"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="inline-flex items-center gap-2 text-[#4A4740] cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#141413]"
              />
              <span>Remember Me</span>
            </label>
            <button
              type="button"
              onClick={() => {
                setResetEmail(email);
                setForgotModalOpen(true);
              }}
              className="text-[#9A6F0A] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-[0.16em] hover:bg-[#B8860B] transition-colors"
          >
            LOGIN
          </button>
        </form>

        <div className="pt-4 border-t border-[#D8D0C1] text-center space-y-3">
          <p className="text-xs text-[#6E6A63]">
            New to GOLD NO1?{' '}
            <button
              type="button"
              onClick={() => navigateTo('register')}
              className="text-[#141413] font-semibold underline underline-offset-4"
            >
              Create an Account
            </button>
          </p>

          <div className="flex items-center justify-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                login('customer@goldno1.com');
                navigateTo('account');
              }}
              className="px-3 py-1.5 bg-[#FBFBF9] border border-[#D8D0C1] text-[11px] text-[#4A4740] hover:border-[#141413]"
            >
              Demo Customer Login
            </button>
            <button
              type="button"
              onClick={() => {
                login('admin@goldno1.com');
                navigateTo('admin');
              }}
              className="px-3 py-1.5 bg-[#FBFBF9] border border-[#D8D0C1] text-[11px] text-[#4A4740] hover:border-[#141413]"
            >
              Showroom Admin Login
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FBFBF9] border border-[#E5DFD3] max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-3">
              <h3 className="font-serif text-2xl font-semibold text-[#141413]">
                Reset Your Password
              </h3>
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                className="p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#4A4740] leading-relaxed">
              Enter your registered email address and we will send a secure password reset link.
            </p>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-sm"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                className="px-4 py-2 border border-[#D8D0C1] text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setForgotModalOpen(false);
                  showToast(
                    'Password Reset Link Sent',
                    `Sent to ${resetEmail || 'your email'}`,
                    'success'
                  );
                }}
                className="px-5 py-2 bg-[#141413] text-[#FBFBF9] text-xs font-medium"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const { register, navigateTo } = useStore();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!form.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!form.mobile.trim() || form.mobile.trim().length < 8) {
      setError('Please enter a valid mobile number.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    const res = register({
      fullName: form.fullName,
      email: form.email,
      mobile: form.mobile,
      password: form.password,
    });
    if (res.success) {
      navigateTo('account');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#FBFBF9] flex items-center justify-center py-14 px-4">
      <div className="w-full max-w-md bg-[#F4F1EA] border border-[#E5DFD3] p-8 sm:p-10 space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs tracking-[0.22em] text-[#9A6F0A] font-medium">
            JOIN GOLD NO1
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141413]">
            Create Your Account
          </h1>
          <p className="text-xs text-[#6E6A63]">
            Where Every Gold Story Begins. Register for priority bridal consultations & order tracking.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-900 px-3.5 py-2.5 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#141413] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="e.g., Ananya Deshmukh"
              className="w-full bg-[#FBFBF9] border border-[#D8D0C1] px-3.5 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#141413] mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full bg-[#FBFBF9] border border-[#D8D0C1] px-3.5 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#141413] mb-1">
              Mobile Number *
            </label>
            <input
              type="tel"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              placeholder="+91 98201 XXXXX"
              className="w-full bg-[#FBFBF9] border border-[#D8D0C1] px-3.5 py-2.5 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#141413] mb-1">
              Password *
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Minimum 6 characters"
              className="w-full bg-[#FBFBF9] border border-[#D8D0C1] px-3.5 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#141413] mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              placeholder="Re-enter password"
              className="w-full bg-[#FBFBF9] border border-[#D8D0C1] px-3.5 py-2.5 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-[0.16em] hover:bg-[#B8860B] transition-colors"
          >
            REGISTER ACCOUNT
          </button>
        </form>

        <div className="pt-4 border-t border-[#D8D0C1] text-center">
          <p className="text-xs text-[#6E6A63]">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigateTo('login')}
              className="text-[#141413] font-semibold underline underline-offset-4"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export const MyAccountPage: React.FC = () => {
  const {
    currentUser,
    updateUserProfile,
    addUserAddress,
    removeUserAddress,
    logout,
    orders,
    wishlist,
    products,
    navigateTo,
    openProductDetails,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'orders' | 'wishlist' | 'addresses' | 'payments'
  >('profile');

  const [profileForm, setProfileForm] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    mobile: currentUser?.mobile || '',
  });

  const [newAddress, setNewAddress] = useState({
    label: 'Residence',
    houseFlat: '',
    street: '',
    area: '',
    city: '',
    state: '',
    pinCode: '',
  });

  if (!currentUser) {
    return <LoginPage />;
  }

  const wishlistedItems = products.filter((p) => wishlist.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(profileForm);
  };

  const handleAddAddr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.houseFlat.trim() || !newAddress.city.trim()) return;
    addUserAddress(newAddress);
    setNewAddress({
      label: 'Residence',
      houseFlat: '',
      street: '',
      area: '',
      city: '',
      state: '',
      pinCode: '',
    });
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] py-12 lg:py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1360px] mx-auto">
        {/* Top Greeting Header */}
        <div className="border-b border-[#E5DFD3] pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
              MY ACCOUNT DASHBOARD
            </p>
            <h1 className="mt-1 font-serif text-3xl sm:text-5xl font-semibold text-[#141413]">
              Welcome, {currentUser.fullName || 'Customer'}
            </h1>
            <p className="text-xs text-[#6E6A63] mt-1">
              Member since {currentUser.joinedDate} · {currentUser.email}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('admin')}
              className="px-4 py-2 border border-[#D8D0C1] text-xs font-medium text-[#141413] hover:border-[#141413] inline-flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Showroom Admin</span>
            </button>
            <button
              type="button"
              onClick={logout}
              className="px-4 py-2 bg-[#141413] text-[#FBFBF9] text-xs font-medium hover:bg-red-900 transition-colors inline-flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Account Sidebar */}
          <aside className="lg:col-span-3 bg-[#F4F1EA] border border-[#E5DFD3] p-4 space-y-1">
            {[
              { id: 'profile' as const, label: 'My Profile', icon: User },
              { id: 'orders' as const, label: `My Orders (${orders.length})`, icon: Package },
              { id: 'wishlist' as const, label: `Wishlist (${wishlist.length})`, icon: Heart },
              {
                id: 'addresses' as const,
                label: `Saved Addresses (${currentUser.addresses.length})`,
                icon: MapPin,
              },
              { id: 'payments' as const, label: 'Payment Methods', icon: CreditCard },
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full px-4 py-3 text-left text-xs font-medium flex items-center gap-3 transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#141413] text-[#FBFBF9]'
                      : 'text-[#4A4740] hover:bg-[#EFECE4] hover:text-[#141413]'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={logout}
              className="w-full px-4 py-3 text-left text-xs font-medium text-red-800 hover:bg-red-50 flex items-center gap-3 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </aside>

          {/* Right Active Section */}
          <div className="lg:col-span-9 bg-[#FBFBF9] border border-[#E5DFD3] p-6 sm:p-8">
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-6 max-w-xl">
                <h2 className="font-serif text-2xl font-semibold text-[#141413] border-b border-[#EFECE4] pb-3">
                  My Profile
                </h2>
                <div>
                  <label className="block text-xs font-medium text-[#141413] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.fullName}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, fullName: e.target.value })
                    }
                    className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#141413] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                    className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#141413] mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={profileForm.mobile}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, mobile: e.target.value })
                    }
                    className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-wider hover:bg-[#B8860B] transition-colors"
                >
                  SAVE PROFILE CHANGES
                </button>
              </form>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#EFECE4] pb-3">
                  <h2 className="font-serif text-2xl font-semibold text-[#141413]">
                    Recent Orders
                  </h2>
                  <button
                    type="button"
                    onClick={() => navigateTo('orders')}
                    className="text-xs font-semibold underline text-[#B8860B]"
                  >
                    Open Full Order History Page
                  </button>
                </div>
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-[#F4F1EA] border border-[#E5DFD3] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <p className="font-mono font-semibold text-[#141413]">
                        {ord.id} · {ord.date}
                      </p>
                      <p className="text-[#4A4740]">
                        {ord.items.map((i) => `${i.name} (×${i.quantity})`).join(', ')}
                      </p>
                      <p className="text-[#6E6A63] font-mono tabular-nums">
                        Total: <strong className="text-[#141413]">{formatINR(ord.grandTotal)}</strong> ·{' '}
                        Status: <strong className="text-[#9A6F0A]">{ord.orderStatus}</strong>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateTo('orders')}
                      className="px-4 py-2 bg-[#141413] text-[#FBFBF9] text-xs font-medium whitespace-nowrap"
                    >
                      VIEW ORDER
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#EFECE4] pb-3">
                  <h2 className="font-serif text-2xl font-semibold text-[#141413]">
                    Saved Wishlist ({wishlistedItems.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => navigateTo('wishlist')}
                    className="text-xs font-semibold underline text-[#B8860B]"
                  >
                    Manage Full Wishlist
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistedItems.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-4 border border-[#E5DFD3] bg-[#F4F1EA] flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 object-cover border border-[#D8D0C1]"
                        />
                        <div className="min-w-0">
                          <p className="font-serif text-lg font-semibold text-[#141413] truncate">
                            {prod.name}
                          </p>
                          <p className="text-xs font-mono text-[#6E6A63]">
                            {prod.goldPurity} · {formatINR(prod.finalPrice)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => openProductDetails(prod.id)}
                        className="px-3 py-1.5 bg-[#141413] text-[#FBFBF9] text-xs"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-semibold text-[#141413] border-b border-[#EFECE4] pb-3">
                  Saved Delivery Addresses
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentUser.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-4 bg-[#F4F1EA] border border-[#E5DFD3] flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <p className="font-semibold text-[#141413]">{addr.label}</p>
                        <p className="text-[#4A4740]">
                          {addr.houseFlat}, {addr.street}, {addr.area}
                        </p>
                        <p className="text-[#4A4740]">
                          {addr.city}, {addr.state} — {addr.pinCode}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeUserAddress(addr.id)}
                        className="text-[#8A8479] hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={handleAddAddr}
                  className="pt-4 border-t border-[#EFECE4] space-y-4 max-w-xl"
                >
                  <h3 className="font-serif text-xl font-semibold text-[#141413]">
                    Add New Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={newAddress.label}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, label: e.target.value })
                      }
                      placeholder="Label (e.g. Home, Office)"
                      className="border border-[#D8D0C1] bg-white px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      required
                      value={newAddress.houseFlat}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, houseFlat: e.target.value })
                      }
                      placeholder="House / Flat / Building *"
                      className="border border-[#D8D0C1] bg-white px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      required
                      value={newAddress.street}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, street: e.target.value })
                      }
                      placeholder="Street / Road *"
                      className="border border-[#D8D0C1] bg-white px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      value={newAddress.area}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, area: e.target.value })
                      }
                      placeholder="Area / Locality"
                      className="border border-[#D8D0C1] bg-white px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      required
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, city: e.target.value })
                      }
                      placeholder="City *"
                      className="border border-[#D8D0C1] bg-white px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      required
                      value={newAddress.state}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, state: e.target.value })
                      }
                      placeholder="State *"
                      className="border border-[#D8D0C1] bg-white px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      required
                      value={newAddress.pinCode}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, pinCode: e.target.value })
                      }
                      placeholder="PIN Code *"
                      className="border border-[#D8D0C1] bg-white px-3 py-2 text-xs font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#141413] text-[#FBFBF9] text-xs font-medium inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Save Address</span>
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-[#141413] border-b border-[#EFECE4] pb-3">
                  Saved Payment Methods
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentUser.savedPaymentMethods.map((pm) => (
                    <div
                      key={pm.id}
                      className="p-4 bg-[#F4F1EA] border border-[#E5DFD3] text-xs space-y-1"
                    >
                      <p className="font-semibold text-[#141413]">
                        {pm.type} — {pm.label}
                      </p>
                      <p className="font-mono text-[#6E6A63]">{pm.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#6E6A63]">
                  All payments on GOLD NO1 are processed through 256-bit encrypted banking gateways.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrderHistoryPage: React.FC = () => {
  const { orders, navigateTo, openProductDetails } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="min-h-screen bg-[#FBFBF9] py-12 lg:py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1360px] mx-auto">
        <div className="border-b border-[#E5DFD3] pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#9A6F0A] font-medium">
              PURCHASE ARCHIVE & TRACKING
            </p>
            <h1 className="mt-1 font-serif text-3xl sm:text-5xl font-semibold text-[#141413]">
              Order History
            </h1>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('account')}
            className="text-xs font-semibold tracking-wider text-[#141413] hover:text-[#B8860B]"
          >
            ← Back to My Account
          </button>
        </div>

        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#FBFBF9] border border-[#E5DFD3] p-6 space-y-5"
            >
              {/* Top Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#EFECE4] text-xs font-mono tabular-nums">
                <div>
                  <span className="text-[#6E6A63] font-sans block">Order ID</span>
                  <strong className="text-sm text-[#141413]">{order.id}</strong>
                </div>
                <div>
                  <span className="text-[#6E6A63] font-sans block">Order Date</span>
                  <strong className="text-[#141413]">{order.date}</strong>
                </div>
                <div>
                  <span className="text-[#6E6A63] font-sans block">Total Amount</span>
                  <strong className="text-sm text-[#141413]">
                    {formatINR(order.grandTotal)}
                  </strong>
                </div>
                <div>
                  <span className="text-[#6E6A63] font-sans block">Payment Status</span>
                  <strong className="text-[#141413]">{order.paymentStatus}</strong>
                </div>
                <div>
                  <span className="text-[#6E6A63] font-sans block">Order Status</span>
                  <strong
                    className={
                      order.orderStatus === 'Delivered'
                        ? 'text-[#2E6B40]'
                        : order.orderStatus === 'Cancelled'
                        ? 'text-red-700'
                        : 'text-[#9A6F0A]'
                    }
                  >
                    {order.orderStatus}
                  </strong>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(order)}
                    className="px-4 py-2 bg-[#141413] text-[#FBFBF9] text-xs font-sans font-medium tracking-wider hover:bg-[#B8860B] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>VIEW ORDER</span>
                  </button>
                </div>
              </div>

              {/* Order Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.items.map((item, idx) => (
                  <div
                    key={`${item.productId}-${idx}`}
                    className="flex items-center gap-4 p-3 bg-[#F4F1EA] border border-[#E5DFD3]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover bg-[#FBFBF9] border border-[#D8D0C1] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => openProductDetails(item.productId)}
                        className="font-serif text-lg font-semibold text-[#141413] hover:text-[#B8860B] text-left truncate block"
                      >
                        {item.name}
                      </button>
                      <p className="text-xs text-[#6E6A63] font-mono tabular-nums">
                        {item.goldPurity} · {item.netWeight}g · Qty: {item.quantity} ·{' '}
                        {formatINR(item.unitFinalPrice * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View Order Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-[#FBFBF9] border border-[#E5DFD3] max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-4">
                <div>
                  <p className="text-xs text-[#9A6F0A] font-mono">
                    OFFICIAL BIS HALLMARK INVOICE SUMMARY
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#141413]">
                    Order {selectedOrder.id}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 text-[#141413]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Timeline Bar */}
              <div className="bg-[#F4F1EA] border border-[#E5DFD3] p-4 text-xs">
                <p className="font-semibold text-[#141413] mb-2">
                  Current Status: <span className="text-[#9A6F0A]">{selectedOrder.orderStatus}</span>
                </p>
                <div className="flex flex-wrap items-center gap-2 text-[#6E6A63]">
                  {(['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'] as const).map(
                    (st, i) => (
                      <React.Fragment key={st}>
                        <span
                          className={
                            selectedOrder.orderStatus === st
                              ? 'font-bold text-[#141413] underline'
                              : ''
                          }
                        >
                          {st}
                        </span>
                        {i < 4 && <span>→</span>}
                      </React.Fragment>
                    )
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-[#EFECE4] border border-[#E5DFD3]">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={`${item.productId}-${idx}`}
                    className="p-4 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-serif text-lg font-semibold text-[#141413]">
                        {item.name}
                      </p>
                      <p className="font-mono text-[#6E6A63]">
                        Code: {item.productCode} · {item.goldPurity} · {item.netWeight}g · Size:{' '}
                        {item.selectedSize} · Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-mono font-semibold text-[#141413]">
                      {formatINR(item.unitFinalPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="bg-[#F4F1EA] border border-[#E5DFD3] p-4 space-y-1.5 text-xs font-mono tabular-nums">
                <div className="flex justify-between">
                  <span className="font-sans">Gold & Stone Subtotal</span>
                  <span>{formatINR(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans">Making Charges</span>
                  <span>{formatINR(selectedOrder.makingChargesTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans">GST (3%)</span>
                  <span>{formatINR(selectedOrder.gstTotal)}</span>
                </div>
                <div className="pt-2 border-t border-[#D8D0C1] flex justify-between text-base font-bold text-[#141413]">
                  <span className="font-serif">Grand Total</span>
                  <span>{formatINR(selectedOrder.grandTotal)}</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2.5 bg-[#141413] text-[#FBFBF9] text-xs font-medium"
                >
                  CLOSE ORDER DETAILS
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
