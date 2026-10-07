import React, { useState } from 'react';
import {
  ArrowLeft,
  Boxes,
  Edit3,
  FolderKanban,
  Gem,
  LayoutDashboard,
  MessageSquareQuote,
  PackageCheck,
  Plus,
  RotateCcw,
  Settings,
  Tag,
  Trash2,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR, STUDIO_IMAGES } from '../data/initialData';
import { GoldPurity, OrderStatus, PaymentStatus, Product } from '../types';

type AdminTab =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'orders'
  | 'customers'
  | 'inventory'
  | 'gold-rates'
  | 'offers'
  | 'reviews'
  | 'settings';

export const AdminDashboardPage: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    deleteCategory,
    orders,
    updateOrderStatus,
    updatePaymentStatus,
    customers,
    goldRates,
    updateGoldRates,
    offers,
    addOffer,
    toggleOfferStatus,
    deleteOffer,
    reviews,
    deleteReview,
    settings,
    updateSettings,
    resetDemoStore,
    navigateTo,
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Product Form State
  const [prodForm, setProdForm] = useState({
    name: '',
    category: 'Gold Necklaces',
    subcategory: 'Heritage Collection',
    description: '',
    price: 125000,
    goldPurity: '22K' as GoldPurity,
    grossWeight: 18.0,
    netWeight: 17.5,
    stoneWeight: 0.5,
    makingCharges: 12000,
    stock: 8,
    image: STUDIO_IMAGES.necklace,
    productCode: 'GN1-NEW-2299',
    metal: 'Yellow Gold' as Product['metal'],
    certification: 'BIS 916 Hallmarked with HUID',
    occasion: 'Festive' as Product['occasion'],
    collection: 'Royal Gold' as Product['collection'],
    isNew: true,
    isBestSeller: false,
    discount: 0,
  });

  // Gold Rate Form State
  const [rateDraft, setRateDraft] = useState({
    gold24KPer10g: goldRates.gold24KPer10g,
    gold22KPer10g: goldRates.gold22KPer10g,
    gold18KPer10g: goldRates.gold18KPer10g,
    silverPer10g: goldRates.silverPer10g,
    isDemoRate: goldRates.isDemoRate,
    recalculateCatalogue: false,
  });

  // Category Form State
  const [newCatForm, setNewCatForm] = useState({
    name: '',
    description: '',
    image: STUDIO_IMAGES.necklace,
  });

  // Offer Form State
  const [newOfferForm, setNewOfferForm] = useState({
    code: '',
    title: '',
    description: '',
    discountPercent: 5,
    minOrderAmount: 50000,
    validUntil: '31 December 2026',
    applicableOn: 'All Gold & Diamond Jewellery',
  });

  // Settings Form State
  const [settingsDraft, setSettingsDraft] = useState(settings);

  // Dashboard Metrics
  const totalSales = orders
    .filter((o) => o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + o.grandTotal, 0);

  const openNewProductModal = () => {
    setEditingProduct(null);
    setProdForm({
      name: '',
      category: categories[0]?.name || 'Gold Necklaces',
      subcategory: 'Showroom Edition',
      description:
        'Handcrafted BIS Hallmarked gold creation designed with signature Indian heritage detailing.',
      price: 145000,
      goldPurity: '22K',
      grossWeight: 20.0,
      netWeight: 20.0,
      stoneWeight: 0,
      makingCharges: 14500,
      stock: 5,
      image: STUDIO_IMAGES.necklace,
      productCode: `GN1-SK-${Math.floor(1000 + Math.random() * 9000)}`,
      metal: 'Yellow Gold',
      certification: 'BIS 916 Hallmarked with HUID',
      occasion: 'Festive',
      collection: 'Royal Gold',
      isNew: true,
      isBestSeller: false,
      discount: 0,
    });
    setProductModalOpen(true);
  };

  const openEditProductModal = (prod: Product) => {
    setEditingProduct(prod);
    setProdForm({
      name: prod.name,
      category: prod.category,
      subcategory: prod.subcategory,
      description: prod.description,
      price: prod.price,
      goldPurity: prod.goldPurity,
      grossWeight: prod.grossWeight,
      netWeight: prod.netWeight,
      stoneWeight: prod.stoneWeight,
      makingCharges: prod.makingCharges,
      stock: prod.stock,
      image: prod.images[0] || STUDIO_IMAGES.necklace,
      productCode: prod.productCode,
      metal: prod.metal,
      certification: prod.certification,
      occasion: prod.occasion,
      collection: prod.collection,
      isNew: prod.isNew,
      isBestSeller: prod.isBestSeller,
      discount: prod.discount || 0,
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const gst = Math.round((Number(prodForm.price) + Number(prodForm.makingCharges)) * 0.03);
    const finalPrice = Number(prodForm.price) + Number(prodForm.makingCharges) + gst;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: prodForm.name,
        category: prodForm.category,
        subcategory: prodForm.subcategory,
        description: prodForm.description,
        price: Number(prodForm.price),
        goldPurity: prodForm.goldPurity,
        grossWeight: Number(prodForm.grossWeight),
        netWeight: Number(prodForm.netWeight),
        stoneWeight: Number(prodForm.stoneWeight),
        makingCharges: Number(prodForm.makingCharges),
        gst,
        finalPrice,
        stock: Number(prodForm.stock),
        images: [prodForm.image, ...editingProduct.images.slice(1)],
        productCode: prodForm.productCode,
        metal: prodForm.metal,
        certification: prodForm.certification,
        occasion: prodForm.occasion,
        collection: prodForm.collection,
        isNew: prodForm.isNew,
        isBestSeller: prodForm.isBestSeller,
        discount: prodForm.discount > 0 ? Number(prodForm.discount) : undefined,
      });
    } else {
      addProduct({
        name: prodForm.name,
        category: prodForm.category,
        subcategory: prodForm.subcategory,
        description: prodForm.description,
        price: Number(prodForm.price),
        goldPurity: prodForm.goldPurity,
        grossWeight: Number(prodForm.grossWeight),
        netWeight: Number(prodForm.netWeight),
        stoneWeight: Number(prodForm.stoneWeight),
        makingCharges: Number(prodForm.makingCharges),
        gst,
        finalPrice,
        stock: Number(prodForm.stock),
        images: [prodForm.image, STUDIO_IMAGES.heroShowroom],
        rating: 5.0,
        reviews: 1,
        isNew: prodForm.isNew,
        isBestSeller: prodForm.isBestSeller,
        discount: prodForm.discount > 0 ? Number(prodForm.discount) : undefined,
        productCode: prodForm.productCode,
        metal: prodForm.metal,
        certification: prodForm.certification,
        sizes: ['Standard Fit'],
        gender: 'Women',
        occasion: prodForm.occasion,
        collection: prodForm.collection,
      });
    }
    setProductModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] flex flex-col lg:flex-row">
      {/* Left Admin Sidebar (260px) */}
      <aside className="w-full lg:w-64 bg-[#141413] text-[#EFECE4] shrink-0 flex flex-col justify-between border-r border-[#2E2C28]">
        <div>
          <div className="p-6 border-b border-[#2E2C28] flex items-center justify-between">
            <div>
              <span className="font-serif text-xl font-bold tracking-[0.14em] text-[#FBFBF9] block">
                GOLD NO1
              </span>
              <span className="text-[11px] text-[#D4AF37] font-mono">
                Showroom Admin Console
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="lg:hidden px-3 py-1 border border-[#3A3731] text-xs text-[#FBFBF9]"
            >
              Exit
            </button>
          </div>

          <nav className="p-3 grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-1 gap-1">
            {[
              { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
              { id: 'products' as const, label: 'Products', icon: Gem },
              { id: 'categories' as const, label: 'Categories', icon: FolderKanban },
              { id: 'orders' as const, label: 'Orders', icon: PackageCheck },
              { id: 'customers' as const, label: 'Customers', icon: Users },
              { id: 'inventory' as const, label: 'Inventory', icon: Boxes },
              { id: 'gold-rates' as const, label: 'Gold Rates', icon: TrendingUp },
              { id: 'offers' as const, label: 'Offers', icon: Tag },
              { id: 'reviews' as const, label: 'Reviews', icon: MessageSquareQuote },
              { id: 'settings' as const, label: 'Settings', icon: Settings },
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-2.5 text-left text-xs font-medium flex items-center gap-2.5 transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#C59B27] text-[#141413] font-semibold'
                      : 'text-[#A8A297] hover:bg-[#1C1B19] hover:text-[#FBFBF9]'
                  }`}
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="hidden lg:block p-5 border-t border-[#2E2C28] space-y-2">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="w-full py-2.5 px-3 border border-[#3A3731] text-xs text-[#EFECE4] hover:border-[#D4AF37] flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </button>
          <button
            type="button"
            onClick={resetDemoStore}
            className="w-full py-2 px-3 text-[11px] text-[#8A8479] hover:text-[#FBFBF9] flex items-center justify-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <div className="flex-1 min-w-0 p-6 sm:p-8 lg:p-10 space-y-8 overflow-x-hidden">
        {/* Top Workspace Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8D0C1] pb-5">
          <div>
            <p className="text-xs font-mono text-[#6E6A63]">
              GOLD NO1 / Admin / <span className="text-[#141413] uppercase">{activeTab}</span>
            </p>
            <h1 className="font-serif text-3xl font-bold text-[#141413] capitalize mt-0.5">
              {activeTab.replace('-', ' ')} Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openNewProductModal}
              className="px-4 py-2.5 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-wider hover:bg-[#B8860B] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Product</span>
            </button>
          </div>
        </div>

        {/* 1. DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* 4 Key Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              <div className="bg-[#FBFBF9] border border-[#D8D0C1] p-6">
                <p className="text-xs text-[#6E6A63] font-medium">Total Sales</p>
                <p className="mt-2 font-mono tabular-nums text-2xl sm:text-3xl font-bold text-[#141413]">
                  {formatINR(totalSales)}
                </p>
                <p className="text-xs text-[#2E6B40] mt-1">
                  Active confirmed & delivered orders
                </p>
              </div>

              <div className="bg-[#FBFBF9] border border-[#D8D0C1] p-6">
                <p className="text-xs text-[#6E6A63] font-medium">Total Orders</p>
                <p className="mt-2 font-mono tabular-nums text-2xl sm:text-3xl font-bold text-[#141413]">
                  {orders.length}
                </p>
                <p className="text-xs text-[#6E6A63] mt-1">
                  Insured shipments tracked
                </p>
              </div>

              <div className="bg-[#FBFBF9] border border-[#D8D0C1] p-6">
                <p className="text-xs text-[#6E6A63] font-medium">Total Customers</p>
                <p className="mt-2 font-mono tabular-nums text-2xl sm:text-3xl font-bold text-[#141413]">
                  {customers.length}
                </p>
                <p className="text-xs text-[#6E6A63] mt-1">
                  Registered Privé client profiles
                </p>
              </div>

              <div className="bg-[#FBFBF9] border border-[#D8D0C1] p-6">
                <p className="text-xs text-[#6E6A63] font-medium">Total Products</p>
                <p className="mt-2 font-mono tabular-nums text-2xl sm:text-3xl font-bold text-[#141413]">
                  {products.length}
                </p>
                <p className="text-xs text-[#9A6F0A] mt-1">
                  Across {categories.length} gold & diamond categories
                </p>
              </div>
            </div>

            {/* Today's Gold Rate Quick Bar */}
            <div className="bg-[#FBFBF9] border border-[#D8D0C1] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#141413]">
                  Active Bullion Rates ({goldRates.isDemoRate ? 'Demo Mode' : 'Live'})
                </h2>
                <p className="text-xs text-[#6E6A63] font-mono tabular-nums mt-1">
                  24K: {formatINR(goldRates.gold24KPer10g)}/10g · 22K:{' '}
                  {formatINR(goldRates.gold22KPer10g)}/10g · 18K:{' '}
                  {formatINR(goldRates.gold18KPer10g)}/10g · Silver:{' '}
                  {formatINR(goldRates.silverPer10g)}/10g
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('gold-rates')}
                className="px-4 py-2 border border-[#141413] text-xs font-medium hover:bg-[#141413] hover:text-[#FBFBF9] transition-colors whitespace-nowrap"
              >
                Update Gold Rates
              </button>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-[#FBFBF9] border border-[#D8D0C1] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E5DFD3] flex items-center justify-between">
                <h2 className="font-serif text-xl font-semibold text-[#141413]">
                  Recent Orders
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-medium text-[#B8860B] hover:underline"
                >
                  Manage All Orders →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F4F1EA] border-b border-[#E5DFD3] text-[#4A4740] font-semibold">
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Order Status</th>
                      <th className="py-3 px-4 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFECE4] font-mono tabular-nums">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#F4F1EA]/50">
                        <td className="py-3 px-4 font-semibold text-[#141413]">{ord.id}</td>
                        <td className="py-3 px-4 font-sans text-[#141413]">
                          {ord.customerName}
                        </td>
                        <td className="py-3 px-4 text-[#6E6A63]">{ord.date}</td>
                        <td className="py-3 px-4 font-sans">{ord.paymentStatus}</td>
                        <td className="py-3 px-4 font-sans font-medium text-[#9A6F0A]">
                          {ord.orderStatus}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-[#141413]">
                          {formatINR(ord.grandTotal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-[#FBFBF9] border border-[#D8D0C1] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5DFD3] flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold text-[#141413]">
                All Catalogue Products ({products.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F4F1EA] border-b border-[#E5DFD3] text-[#4A4740] font-semibold">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Code</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Purity & Net Wt</th>
                    <th className="py-3 px-4 text-right">Final Price</th>
                    <th className="py-3 px-4 text-right">Stock</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE4]">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#F4F1EA]/50">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 object-cover border border-[#D8D0C1] shrink-0"
                        />
                        <span className="font-serif text-base font-semibold text-[#141413]">
                          {prod.name}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[#6E6A63]">
                        {prod.productCode}
                      </td>
                      <td className="py-3 px-4 text-[#4A4740]">{prod.category}</td>
                      <td className="py-3 px-4 font-mono tabular-nums">
                        {prod.goldPurity} · {prod.netWeight}g
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold text-[#141413]">
                        {formatINR(prod.finalPrice)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums">
                        {prod.stock}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEditProductModal(prod)}
                            className="p-1.5 border border-[#D8D0C1] hover:border-[#141413] text-[#141413]"
                            title="Edit Product"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1.5 border border-[#D8D0C1] hover:border-red-700 text-red-700"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newCatForm.name.trim()) return;
                addCategory({
                  name: newCatForm.name.trim(),
                  slug: newCatForm.name.trim(),
                  description: newCatForm.description.trim() || '22K Hallmarked Gold Collection',
                  image: newCatForm.image,
                  itemCount: 10,
                });
                setNewCatForm({
                  name: '',
                  description: '',
                  image: STUDIO_IMAGES.necklace,
                });
              }}
              className="lg:col-span-4 bg-[#FBFBF9] border border-[#D8D0C1] p-6 space-y-4"
            >
              <h2 className="font-serif text-xl font-semibold text-[#141413]">
                Add Gold Category
              </h2>
              <div>
                <label className="block text-xs font-medium text-[#141413] mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCatForm.name}
                  onChange={(e) => setNewCatForm({ ...newCatForm, name: e.target.value })}
                  placeholder="e.g. Gold Waist Belts (Kamarbandh)"
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#141413] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newCatForm.description}
                  onChange={(e) =>
                    setNewCatForm({ ...newCatForm, description: e.target.value })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#141413] text-[#FBFBF9] text-xs font-medium"
              >
                Create Category
              </button>
            </form>

            <div className="lg:col-span-8 bg-[#FBFBF9] border border-[#D8D0C1] divide-y divide-[#EFECE4]">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-4 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover border border-[#D8D0C1]"
                    />
                    <div>
                      <p className="font-serif text-lg font-semibold text-[#141413]">
                        {cat.name}
                      </p>
                      <p className="text-[#6E6A63]">{cat.description}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteCategory(cat.id)}
                    className="p-2 text-[#8A8479] hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-[#FBFBF9] border border-[#D8D0C1] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5DFD3]">
              <h2 className="font-serif text-xl font-semibold text-[#141413]">
                Manage Client Orders ({orders.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F4F1EA] border-b border-[#E5DFD3] text-[#4A4740] font-semibold">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer & Contact</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4 text-right">Total</th>
                    <th className="py-3 px-4">Payment Status</th>
                    <th className="py-3 px-4">Order Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE4]">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#F4F1EA]/50">
                      <td className="py-3 px-4 font-mono font-semibold text-[#141413]">
                        {ord.id}
                        <span className="block text-[11px] font-normal text-[#6E6A63]">
                          {ord.date}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <strong className="text-[#141413] block">{ord.customerName}</strong>
                        <span className="text-[#6E6A63] font-mono">{ord.customerMobile}</span>
                      </td>
                      <td className="py-3 px-4 text-[#4A4740]">
                        {ord.items.map((i) => `${i.name} (×${i.quantity})`).join(', ')}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold text-[#141413]">
                        {formatINR(ord.grandTotal)}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={ord.paymentStatus}
                          onChange={(e) =>
                            updatePaymentStatus(ord.id, e.target.value as PaymentStatus)
                          }
                          className="border border-[#D8D0C1] bg-white px-2 py-1 text-xs"
                        >
                          <option value="Paid">Paid</option>
                          <option value="Pending (COD)">Pending (COD)</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(ord.id, e.target.value as OrderStatus)
                          }
                          className="border border-[#D8D0C1] bg-white px-2 py-1 text-xs font-medium text-[#141413]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. CUSTOMERS MANAGEMENT */}
        {activeTab === 'customers' && (
          <div className="bg-[#FBFBF9] border border-[#D8D0C1] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5DFD3]">
              <h2 className="font-serif text-xl font-semibold text-[#141413]">
                Registered Clients ({customers.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F4F1EA] border-b border-[#E5DFD3] text-[#4A4740] font-semibold">
                    <th className="py-3 px-4">Customer Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Mobile</th>
                    <th className="py-3 px-4">Joined</th>
                    <th className="py-3 px-4">Saved Locations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE4]">
                  {customers.map((c) => (
                    <tr key={c.id}>
                      <td className="py-3 px-4 font-semibold text-[#141413]">{c.fullName}</td>
                      <td className="py-3 px-4 text-[#4A4740]">{c.email}</td>
                      <td className="py-3 px-4 font-mono">{c.mobile}</td>
                      <td className="py-3 px-4 text-[#6E6A63]">{c.joinedDate}</td>
                      <td className="py-3 px-4 text-[#4A4740]">
                        {c.addresses.map((a) => a.city).join(', ') || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. INVENTORY & INLINE PRICE/STOCK MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="bg-[#FBFBF9] border border-[#D8D0C1] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5DFD3]">
              <h2 className="font-serif text-xl font-semibold text-[#141413]">
                Live Vault Inventory & Quick Price / Stock Controls
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F4F1EA] border-b border-[#E5DFD3] text-[#4A4740] font-semibold">
                    <th className="py-3 px-4">SKU Code</th>
                    <th className="py-3 px-4">Jewellery Name</th>
                    <th className="py-3 px-4">Purity & Net Wt</th>
                    <th className="py-3 px-4 text-right">Base Price (₹)</th>
                    <th className="py-3 px-4 text-right">Final Price (Incl. GST)</th>
                    <th className="py-3 px-4 text-center">Stock Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE4] font-mono tabular-nums">
                  {products.map((prod) => (
                    <tr key={prod.id}>
                      <td className="py-3 px-4 text-[#6E6A63]">{prod.productCode}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-[#141413]">
                        {prod.name}
                      </td>
                      <td className="py-3 px-4">
                        {prod.goldPurity} · {prod.netWeight}g
                      </td>
                      <td className="py-3 px-4 text-right">
                        <input
                          type="number"
                          value={prod.price}
                          onChange={(e) => {
                            const newBase = Math.max(1000, Number(e.target.value));
                            const newGst = Math.round(
                              (newBase + prod.makingCharges) * 0.03
                            );
                            updateProduct({
                              ...prod,
                              price: newBase,
                              gst: newGst,
                              finalPrice: newBase + prod.makingCharges + newGst,
                            });
                          }}
                          className="w-28 border border-[#D8D0C1] bg-white px-2 py-1 text-right text-xs"
                        />
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-[#141413]">
                        {formatINR(prod.finalPrice)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center border border-[#D8D0C1] bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              updateProduct({
                                ...prod,
                                stock: Math.max(0, prod.stock - 1),
                              })
                            }
                            className="w-7 h-7 flex items-center justify-center hover:bg-[#F4F1EA]"
                          >
                            −
                          </button>
                          <span className="w-9 text-center font-semibold">{prod.stock}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateProduct({ ...prod, stock: prod.stock + 1 })
                            }
                            className="w-7 h-7 flex items-center justify-center hover:bg-[#F4F1EA]"
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 7. GOLD RATES MANAGEMENT */}
        {activeTab === 'gold-rates' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateGoldRates(
                {
                  gold24KPer10g: Number(rateDraft.gold24KPer10g),
                  gold22KPer10g: Number(rateDraft.gold22KPer10g),
                  gold18KPer10g: Number(rateDraft.gold18KPer10g),
                  silverPer10g: Number(rateDraft.silverPer10g),
                  isDemoRate: rateDraft.isDemoRate,
                },
                rateDraft.recalculateCatalogue
              );
            }}
            className="bg-[#FBFBF9] border border-[#D8D0C1] p-6 sm:p-8 max-w-2xl space-y-6"
          >
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#141413]">
                Update Today’s Bullion Rates (Per 10 Grams)
              </h2>
              <p className="text-xs text-[#6E6A63] mt-1">
                Changes made here immediately update the “Today’s Gold Rate” section and Know Your Gold cards on the storefront.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono tabular-nums">
              <div>
                <label className="block text-xs font-sans font-medium text-[#141413] mb-1">
                  22K Gold Rate (₹ / 10g)
                </label>
                <input
                  type="number"
                  value={rateDraft.gold22KPer10g}
                  onChange={(e) =>
                    setRateDraft({
                      ...rateDraft,
                      gold22KPer10g: Number(e.target.value),
                    })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-[#141413] mb-1">
                  24K Fine Gold Rate (₹ / 10g)
                </label>
                <input
                  type="number"
                  value={rateDraft.gold24KPer10g}
                  onChange={(e) =>
                    setRateDraft({
                      ...rateDraft,
                      gold24KPer10g: Number(e.target.value),
                    })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-[#141413] mb-1">
                  18K Gold Rate (₹ / 10g)
                </label>
                <input
                  type="number"
                  value={rateDraft.gold18KPer10g}
                  onChange={(e) =>
                    setRateDraft({
                      ...rateDraft,
                      gold18KPer10g: Number(e.target.value),
                    })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-[#141413] mb-1">
                  Silver Rate (₹ / 10g)
                </label>
                <input
                  type="number"
                  value={rateDraft.silverPer10g}
                  onChange={(e) =>
                    setRateDraft({
                      ...rateDraft,
                      silverPer10g: Number(e.target.value),
                    })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3.5 py-2.5 text-sm"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-[#EFECE4] text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rateDraft.recalculateCatalogue}
                  onChange={(e) =>
                    setRateDraft({
                      ...rateDraft,
                      recalculateCatalogue: e.target.checked,
                    })
                  }
                  className="accent-[#141413]"
                />
                <span className="text-[#141413] font-medium">
                  Automatically recalculate all product base prices & GST based on Net Weight × New Rate
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rateDraft.isDemoRate}
                  onChange={(e) =>
                    setRateDraft({ ...rateDraft, isDemoRate: e.target.checked })
                  }
                  className="accent-[#141413]"
                />
                <span className="text-[#6E6A63]">
                  Display “Sample / Demo Market Reference” badge next to Today’s Gold Rate
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="px-7 py-3 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-wider hover:bg-[#B8860B] transition-colors"
            >
              PUBLISH TODAY’S GOLD RATE
            </button>
          </form>
        )}

        {/* 8. OFFERS MANAGEMENT */}
        {activeTab === 'offers' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newOfferForm.code.trim() || !newOfferForm.title.trim()) return;
                addOffer({
                  ...newOfferForm,
                  code: newOfferForm.code.trim().toUpperCase(),
                  active: true,
                });
                setNewOfferForm({
                  code: '',
                  title: '',
                  description: '',
                  discountPercent: 5,
                  minOrderAmount: 50000,
                  validUntil: '31 December 2026',
                  applicableOn: 'All Gold & Diamond Jewellery',
                });
              }}
              className="lg:col-span-4 bg-[#FBFBF9] border border-[#D8D0C1] p-6 space-y-4"
            >
              <h2 className="font-serif text-xl font-semibold text-[#141413]">
                Create Promotional Offer
              </h2>
              <div>
                <label className="block text-xs font-medium text-[#141413] mb-1">
                  Promo Code *
                </label>
                <input
                  type="text"
                  required
                  value={newOfferForm.code}
                  onChange={(e) =>
                    setNewOfferForm({
                      ...newOfferForm,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="e.g. DIWALIGOLD10"
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-xs font-mono uppercase"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#141413] mb-1">
                  Offer Title *
                </label>
                <input
                  type="text"
                  required
                  value={newOfferForm.title}
                  onChange={(e) =>
                    setNewOfferForm({ ...newOfferForm, title: e.target.value })
                  }
                  placeholder="e.g. 10% Auspicious Festive Privilege"
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#141413] mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={newOfferForm.discountPercent}
                    onChange={(e) =>
                      setNewOfferForm({
                        ...newOfferForm,
                        discountPercent: Number(e.target.value),
                      })
                    }
                    className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#141413] mb-1">
                    Min Order (₹)
                  </label>
                  <input
                    type="number"
                    value={newOfferForm.minOrderAmount}
                    onChange={(e) =>
                      setNewOfferForm({
                        ...newOfferForm,
                        minOrderAmount: Number(e.target.value),
                      })
                    }
                    className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-xs font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#141413] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newOfferForm.description}
                  onChange={(e) =>
                    setNewOfferForm({ ...newOfferForm, description: e.target.value })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 text-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#141413] text-[#FBFBF9] text-xs font-medium"
              >
                Publish Offer
              </button>
            </form>

            <div className="lg:col-span-8 bg-[#FBFBF9] border border-[#D8D0C1] divide-y divide-[#EFECE4]">
              {offers.map((off) => (
                <div
                  key={off.id}
                  className="p-5 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#141413]">
                        {off.code}
                      </span>
                      <span className="text-[#9A6F0A] font-mono">
                        · {off.discountPercent}% OFF (Min {formatINR(off.minOrderAmount)})
                      </span>
                    </div>
                    <p className="font-serif text-lg font-semibold text-[#141413]">
                      {off.title}
                    </p>
                    <p className="text-[#6E6A63]">{off.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleOfferStatus(off.id)}
                      className={`px-3 py-1.5 border text-xs font-medium ${
                        off.active
                          ? 'bg-[#2E6B40] text-white border-[#2E6B40]'
                          : 'bg-[#F4F1EA] text-[#6E6A63] border-[#D8D0C1]'
                      }`}
                    >
                      {off.active ? 'Active' : 'Paused'}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteOffer(off.id)}
                      className="p-1.5 text-[#8A8479] hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. REVIEWS MANAGEMENT */}
        {activeTab === 'reviews' && (
          <div className="bg-[#FBFBF9] border border-[#D8D0C1] divide-y divide-[#EFECE4]">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 flex items-start justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-[#141413]">{rev.customerName}</strong>
                    <span className="text-[#6E6A63]">· {rev.location}</span>
                    <span className="text-[#B8860B] font-mono">
                      {'★'.repeat(rev.rating)}
                    </span>
                  </div>
                  <p className="font-serif italic text-base text-[#141413]">
                    “{rev.comment}”
                  </p>
                  <p className="text-[#6E6A63]">
                    Product: {rev.productName} · {rev.date}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteReview(rev.id)}
                  className="p-1.5 text-[#8A8479] hover:text-red-700 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 10. SETTINGS */}
        {activeTab === 'settings' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateSettings(settingsDraft);
            }}
            className="bg-[#FBFBF9] border border-[#D8D0C1] p-6 sm:p-8 max-w-3xl space-y-5"
          >
            <h2 className="font-serif text-2xl font-semibold text-[#141413] border-b border-[#EFECE4] pb-3">
              Showroom Identity, Contact & Social Configuration
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  Showroom Address
                </label>
                <input
                  type="text"
                  value={settingsDraft.address}
                  onChange={(e) =>
                    setSettingsDraft({ ...settingsDraft, address: e.target.value })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={settingsDraft.phone}
                  onChange={(e) =>
                    setSettingsDraft({ ...settingsDraft, phone: e.target.value })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  Concierge Email
                </label>
                <input
                  type="text"
                  value={settingsDraft.email}
                  onChange={(e) =>
                    setSettingsDraft({ ...settingsDraft, email: e.target.value })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={settingsDraft.openingHours}
                  onChange={(e) =>
                    setSettingsDraft({
                      ...settingsDraft,
                      openingHours: e.target.value,
                    })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  Instagram Link
                </label>
                <input
                  type="text"
                  value={settingsDraft.instagramUrl}
                  onChange={(e) =>
                    setSettingsDraft({
                      ...settingsDraft,
                      instagramUrl: e.target.value,
                    })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  Facebook Link
                </label>
                <input
                  type="text"
                  value={settingsDraft.facebookUrl}
                  onChange={(e) =>
                    setSettingsDraft({
                      ...settingsDraft,
                      facebookUrl: e.target.value,
                    })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  YouTube Link
                </label>
                <input
                  type="text"
                  value={settingsDraft.youtubeUrl}
                  onChange={(e) =>
                    setSettingsDraft({
                      ...settingsDraft,
                      youtubeUrl: e.target.value,
                    })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2"
                />
              </div>
              <div className="flex items-center pt-5">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsDraft.codEnabled}
                    onChange={(e) =>
                      setSettingsDraft({
                        ...settingsDraft,
                        codEnabled: e.target.checked,
                      })
                    }
                    className="accent-[#141413]"
                  />
                  <span className="font-medium text-[#141413]">
                    Enable Cash on Delivery (COD) at Checkout
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="px-7 py-3 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-wider hover:bg-[#B8860B] transition-colors"
            >
              SAVE SHOWROOM SETTINGS
            </button>
          </form>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveProduct}
            className="bg-[#FBFBF9] border border-[#E5DFD3] max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-3">
              <h2 className="font-serif text-2xl font-semibold text-[#141413]">
                {editingProduct ? `Edit ${editingProduct.name}` : 'Add New Jewellery Product'}
              </h2>
              <button
                type="button"
                onClick={() => setProductModalOpen(false)}
                className="p-1 text-[#141413]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  Product Code *
                </label>
                <input
                  type="text"
                  required
                  value={prodForm.productCode}
                  onChange={(e) =>
                    setProdForm({ ...prodForm, productCode: e.target.value })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  Category
                </label>
                <select
                  value={prodForm.category}
                  onChange={(e) =>
                    setProdForm({ ...prodForm, category: e.target.value })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  Gold Purity
                </label>
                <select
                  value={prodForm.goldPurity}
                  onChange={(e) =>
                    setProdForm({
                      ...prodForm,
                      goldPurity: e.target.value as GoldPurity,
                    })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 font-mono"
                >
                  <option value="22K">22K</option>
                  <option value="24K">24K</option>
                  <option value="18K">18K</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  Gross Weight (g)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={prodForm.grossWeight}
                  onChange={(e) =>
                    setProdForm({
                      ...prodForm,
                      grossWeight: Number(e.target.value),
                    })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  Net Gold Weight (g)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={prodForm.netWeight}
                  onChange={(e) =>
                    setProdForm({
                      ...prodForm,
                      netWeight: Number(e.target.value),
                    })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  Base Gold/Stone Price (₹)
                </label>
                <input
                  type="number"
                  value={prodForm.price}
                  onChange={(e) =>
                    setProdForm({ ...prodForm, price: Number(e.target.value) })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  Making Charges (₹)
                </label>
                <input
                  type="number"
                  value={prodForm.makingCharges}
                  onChange={(e) =>
                    setProdForm({
                      ...prodForm,
                      makingCharges: Number(e.target.value),
                    })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  value={prodForm.stock}
                  onChange={(e) =>
                    setProdForm({ ...prodForm, stock: Number(e.target.value) })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-[#141413] mb-1">
                  Studio Photography Preset
                </label>
                <select
                  value={prodForm.image}
                  onChange={(e) =>
                    setProdForm({ ...prodForm, image: e.target.value })
                  }
                  className="w-full border border-[#D8D0C1] bg-white px-3 py-2"
                >
                  <option value={STUDIO_IMAGES.necklace}>22K Heritage Necklace</option>
                  <option value={STUDIO_IMAGES.bangles}>22K Royal Gold Bangles</option>
                  <option value={STUDIO_IMAGES.ring}>Solitaire & Gold Ring</option>
                  <option value={STUDIO_IMAGES.earrings}>Traditional Jhumka Earrings</option>
                  <option value={STUDIO_IMAGES.bridalBanner}>Grand Bridal Ensemble</option>
                  <option value={STUDIO_IMAGES.heroShowroom}>Showroom Editorial Set</option>
                </select>
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-medium text-[#141413] mb-1">
                Product Description
              </label>
              <textarea
                rows={2}
                value={prodForm.description}
                onChange={(e) =>
                  setProdForm({ ...prodForm, description: e.target.value })
                }
                className="w-full border border-[#D8D0C1] bg-white px-3 py-2"
              />
            </div>

            <div className="flex items-center gap-6 text-xs pt-1">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prodForm.isNew}
                  onChange={(e) =>
                    setProdForm({ ...prodForm, isNew: e.target.checked })
                  }
                  className="accent-[#141413]"
                />
                <span>Mark as New Arrival</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prodForm.isBestSeller}
                  onChange={(e) =>
                    setProdForm({ ...prodForm, isBestSeller: e.target.checked })
                  }
                  className="accent-[#141413]"
                />
                <span>Mark as Best Seller</span>
              </label>
            </div>

            <div className="pt-3 border-t border-[#E5DFD3] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setProductModalOpen(false)}
                className="px-4 py-2 border border-[#D8D0C1] text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#141413] text-[#FBFBF9] text-xs font-semibold tracking-wider"
              >
                {editingProduct ? 'Save Changes' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
