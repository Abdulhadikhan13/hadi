import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  INITIAL_CATEGORIES,
  INITIAL_CUSTOMERS,
  INITIAL_GOLD_RATES,
  INITIAL_OFFERS,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_STORE_SETTINGS,
} from '../data/initialData';
import {
  CartItem,
  CategoryItem,
  Customer,
  CustomerReview,
  DeliveryAddress,
  FilterState,
  GoldRates,
  OfferItem,
  Order,
  OrderStatus,
  PageId,
  PaymentStatus,
  Product,
  StoreSettings,
} from '../types';

interface CartSummary {
  itemCount: number;
  subtotalBase: number;
  makingChargesTotal: number;
  gstTotal: number;
  discountAmount: number;
  deliveryCharge: number;
  grandTotal: number;
  detailedItems: {
    product: Product;
    quantity: number;
    selectedSize: string;
    lineBase: number;
    lineMaking: number;
    lineGst: number;
    lineTotal: number;
  }[];
}

interface ToastMessage {
  id: string;
  title: string;
  subtitle?: string;
  type?: 'gold' | 'success' | 'error';
}

interface StoreContextType {
  currentPage: PageId;
  navigateTo: (page: PageId, options?: { category?: string; search?: string; collection?: string }) => void;
  selectedProductId: string;
  openProductDetails: (productId: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  categories: CategoryItem[];
  addCategory: (cat: Omit<CategoryItem, 'id'>) => void;
  updateCategory: (cat: CategoryItem) => void;
  deleteCategory: (id: string) => void;

  goldRates: GoldRates;
  updateGoldRates: (rates: Partial<GoldRates>, recalculateCatalogue?: boolean) => void;

  cart: CartItem[];
  addToCart: (productId: string, quantity?: number, selectedSize?: string, openDrawer?: boolean) => void;
  updateCartQuantity: (productId: string, selectedSize: string, quantity: number) => void;
  removeFromCart: (productId: string, selectedSize: string) => void;
  clearCart: () => void;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  appliedOfferCode: string;
  applyOfferCode: (code: string) => { success: boolean; message: string };
  removeOfferCode: () => void;
  cartSummary: CartSummary;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToCart: (productId: string) => void;

  currentUser: Customer | null;
  customers: Customer[];
  login: (email: string, password?: string) => { success: boolean; message: string };
  register: (data: { fullName: string; email: string; mobile: string; password?: string }) => {
    success: boolean;
    message: string;
  };
  logout: () => void;
  updateUserProfile: (data: Partial<Customer>) => void;
  addUserAddress: (address: Omit<DeliveryAddress, 'id'>) => void;
  removeUserAddress: (id: string) => void;

  orders: Order[];
  lastPlacedOrder: Order | null;
  placeOrder: (params: {
    customerName: string;
    customerEmail: string;
    customerMobile: string;
    shippingAddress: DeliveryAddress;
    paymentMethod: Order['paymentMethod'];
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updatePaymentStatus: (orderId: string, status: PaymentStatus) => void;

  reviews: CustomerReview[];
  addReview: (review: Omit<CustomerReview, 'id' | 'date'>) => void;
  updateReview: (review: CustomerReview) => void;
  deleteReview: (id: string) => void;

  offers: OfferItem[];
  addOffer: (offer: Omit<OfferItem, 'id'>) => void;
  toggleOfferStatus: (id: string) => void;
  deleteOffer: (id: string) => void;

  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  resetDemoStore: () => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  toast: ToastMessage | null;
  showToast: (title: string, subtitle?: string, type?: ToastMessage['type']) => void;
}

const DEFAULT_FILTERS: FilterState = {
  category: 'All',
  purity: 'All',
  priceRange: 'All',
  weightRange: 'All',
  gender: 'All',
  occasion: 'All',
  collection: 'All',
  sortBy: 'popular',
};

const STORAGE_KEYS = {
  PRODUCTS: 'goldno1_products_v1',
  CATEGORIES: 'goldno1_categories_v1',
  GOLD_RATES: 'goldno1_gold_rates_v1',
  CART: 'goldno1_cart_v1',
  WISHLIST: 'goldno1_wishlist_v1',
  USER: 'goldno1_current_user_v1',
  CUSTOMERS: 'goldno1_customers_v1',
  ORDERS: 'goldno1_orders_v1',
  REVIEWS: 'goldno1_reviews_v1',
  OFFERS: 'goldno1_offers_v1',
  SETTINGS: 'goldno1_settings_v1',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>(INITIAL_PRODUCTS[0].id);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>(() =>
    loadFromStorage(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS)
  );
  const [categories, setCategories] = useState<CategoryItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES)
  );
  const [goldRates, setGoldRates] = useState<GoldRates>(() =>
    loadFromStorage(STORAGE_KEYS.GOLD_RATES, INITIAL_GOLD_RATES)
  );
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.CART, [
      { productId: 'prod-1', quantity: 1, selectedSize: '18 Inches (Standard)' },
    ])
  );
  const [wishlist, setWishlist] = useState<string[]>(() =>
    loadFromStorage(STORAGE_KEYS.WISHLIST, ['prod-2', 'prod-6', 'prod-8'])
  );
  const [customers, setCustomers] = useState<Customer[]>(() =>
    loadFromStorage(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS)
  );
  const [currentUser, setCurrentUser] = useState<Customer | null>(() =>
    loadFromStorage(STORAGE_KEYS.USER, INITIAL_CUSTOMERS[0])
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    loadFromStorage(STORAGE_KEYS.ORDERS, INITIAL_ORDERS)
  );
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [reviews, setReviews] = useState<CustomerReview[]>(() =>
    loadFromStorage(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS)
  );
  const [offers, setOffers] = useState<OfferItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.OFFERS, INITIAL_OFFERS)
  );
  const [settings, setSettings] = useState<StoreSettings>(() =>
    loadFromStorage(STORAGE_KEYS.SETTINGS, INITIAL_STORE_SETTINGS)
  );

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [appliedOfferCode, setAppliedOfferCode] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch {}
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GOLD_RATES, JSON.stringify(goldRates));
    } catch {}
  }, [goldRates]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
    } catch {}
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } catch {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
    } catch {}
  }, [offers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  const showToast = (title: string, subtitle?: string, type: ToastMessage['type'] = 'gold') => {
    const id = String(Date.now());
    setToast({ id, title, subtitle, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3400);
  };

  const navigateTo = (
    page: PageId,
    options?: { category?: string; search?: string; collection?: string }
  ) => {
    if (options?.category !== undefined) {
      setFilters({ ...DEFAULT_FILTERS, category: options.category });
    } else if (options?.collection !== undefined) {
      setFilters({ ...DEFAULT_FILTERS, collection: options.collection });
    } else if (page === 'shop') {
      // keep existing or reset if coming from specialized page
    }

    if (options?.search !== undefined) {
      setSearchQuery(options.search);
    }

    setCurrentPage(page);
    setCartDrawerOpen(false);
    setQuickViewProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDetails = (productId: string) => {
    setSelectedProductId(productId);
    setQuickViewProduct(null);
    setCartDrawerOpen(false);
    setCurrentPage('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product Management
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const created: Product = { ...newProd, id };
    setProducts((prev) => [created, ...prev]);
    showToast('Jewellery Added to Catalogue', created.name, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast('Product Updated', updated.name, 'success');
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product Removed', target?.name || id, 'gold');
  };

  // Category Management
  const addCategory = (cat: Omit<CategoryItem, 'id'>) => {
    const created: CategoryItem = { ...cat, id: `cat-${Date.now()}` };
    setCategories((prev) => [...prev, created]);
    showToast('Category Created', created.name, 'success');
  };

  const updateCategory = (cat: CategoryItem) => {
    setCategories((prev) => prev.map((c) => (c.id === cat.id ? cat : c)));
    showToast('Category Updated', cat.name, 'success');
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Category Removed', undefined, 'gold');
  };

  // Gold Rate Management
  const updateGoldRates = (rates: Partial<GoldRates>, recalculateCatalogue = false) => {
    const nextRates: GoldRates = {
      ...goldRates,
      ...rates,
      lastUpdated: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: 'short',
      }),
    };
    setGoldRates(nextRates);

    if (recalculateCatalogue) {
      setProducts((prev) =>
        prev.map((prod) => {
          const perGramRate =
            prod.goldPurity === '24K'
              ? nextRates.gold24KPer10g / 10
              : prod.goldPurity === '22K'
              ? nextRates.gold22KPer10g / 10
              : nextRates.gold18KPer10g / 10;
          const stoneVal = prod.stoneWeight > 0 ? prod.stoneWeight * 65000 : 0;
          const newBasePrice = Math.round(prod.netWeight * perGramRate + stoneVal);
          const newGst = Math.round((newBasePrice + prod.makingCharges) * 0.03);
          const newFinalPrice = newBasePrice + prod.makingCharges + newGst;
          return {
            ...prod,
            price: newBasePrice,
            gst: newGst,
            finalPrice: newFinalPrice,
          };
        })
      );
      showToast('Gold Rates & Catalogue Prices Updated', 'All product prices synced to new per-gram rate', 'success');
    } else {
      showToast('Today’s Gold Rate Updated', `22K: ₹${nextRates.gold22KPer10g.toLocaleString('en-IN')}/10g`, 'success');
    }
  };

  // Cart Operations
  const addToCart = (
    productId: string,
    quantity = 1,
    selectedSize?: string,
    openDrawer = true
  ) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    const sizeToUse = selectedSize || prod.sizes[0] || 'Standard';

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === productId && item.selectedSize === sizeToUse
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { productId, quantity, selectedSize: sizeToUse }];
    });

    if (openDrawer) {
      setCartDrawerOpen(true);
    }
    showToast('Added to Shopping Bag', `${prod.name} (${sizeToUse})`, 'gold');
  };

  const updateCartQuantity = (productId: string, selectedSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, selectedSize: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.productId === productId && item.selectedSize === selectedSize))
    );
    showToast('Removed from Shopping Bag', undefined, 'gold');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedOfferCode('');
  };

  const applyOfferCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    const found = offers.find((o) => o.code.toUpperCase() === normalized && o.active);
    if (!found) {
      return { success: false, message: 'Invalid or expired privilege code.' };
    }
    if (cartSummary.subtotalBase + cartSummary.makingChargesTotal < found.minOrderAmount) {
      return {
        success: false,
        message: `Minimum order value of ₹${found.minOrderAmount.toLocaleString('en-IN')} required for ${found.code}.`,
      };
    }
    setAppliedOfferCode(found.code);
    showToast('Privilege Code Applied', `${found.discountPercent}% privilege activated`, 'success');
    return {
      success: true,
      message: `${found.code} applied (${found.discountPercent}% privilege).`,
    };
  };

  const removeOfferCode = () => {
    setAppliedOfferCode('');
    showToast('Privilege Code Removed', undefined, 'gold');
  };

  const cartSummary: CartSummary = useMemo(() => {
    const detailedItems = cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        const discountedBase = product.discount
          ? Math.round(product.price * (1 - product.discount / 100))
          : product.price;
        const lineBase = discountedBase * item.quantity;
        const lineMaking = product.makingCharges * item.quantity;
        const lineGst = Math.round((lineBase + lineMaking) * 0.03);
        const lineTotal = lineBase + lineMaking + lineGst;
        return {
          product,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          lineBase,
          lineMaking,
          lineGst,
          lineTotal,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    const itemCount = detailedItems.reduce((sum, i) => sum + i.quantity, 0);
    const subtotalBase = detailedItems.reduce((sum, i) => sum + i.lineBase, 0);
    const makingChargesTotal = detailedItems.reduce((sum, i) => sum + i.lineMaking, 0);

    let discountAmount = 0;
    if (appliedOfferCode) {
      const offer = offers.find(
        (o) => o.code.toUpperCase() === appliedOfferCode.toUpperCase() && o.active
      );
      if (offer && subtotalBase + makingChargesTotal >= offer.minOrderAmount) {
        discountAmount = Math.round(
          (subtotalBase + makingChargesTotal) * (offer.discountPercent / 100)
        );
      }
    }

    const taxableAmount = Math.max(0, subtotalBase + makingChargesTotal - discountAmount);
    const gstTotal = Math.round(taxableAmount * 0.03);
    const deliveryCharge =
      taxableAmount === 0 || taxableAmount >= settings.freeShippingThreshold ? 0 : 450;
    const grandTotal = taxableAmount + gstTotal + deliveryCharge;

    return {
      itemCount,
      subtotalBase,
      makingChargesTotal,
      gstTotal,
      discountAmount,
      deliveryCharge,
      grandTotal,
      detailedItems,
    };
  }, [cart, products, appliedOfferCode, offers, settings.freeShippingThreshold]);

  // Wishlist Operations
  const toggleWishlist = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', prod?.name, 'gold');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', prod?.name, 'gold');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveWishlistToCart = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    addToCart(productId, 1, prod.sizes[0], true);
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  // Auth & User Management
  const login = (email: string, _password?: string) => {
    const normalized = email.trim().toLowerCase();
    const existing = customers.find((c) => c.email.toLowerCase() === normalized);
    if (existing) {
      setCurrentUser(existing);
      showToast(`Welcome back, ${existing.fullName}`, 'Signed in to GOLD NO1 Privé', 'success');
      return { success: true, message: 'Signed in successfully.' };
    }
    // Create a clean customer session if signing in with a new valid email
    const newCustomer: Customer = {
      id: `cust-${Date.now()}`,
      fullName: normalized.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      email: email.trim(),
      mobile: '+91 98201 00000',
      role: normalized.includes('admin') ? 'admin' : 'customer',
      joinedDate: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      addresses: [INITIAL_CUSTOMERS[0].addresses[0]],
      savedPaymentMethods: INITIAL_CUSTOMERS[0].savedPaymentMethods,
    };
    setCustomers((prev) => [...prev, newCustomer]);
    setCurrentUser(newCustomer);
    showToast(`Welcome, ${newCustomer.fullName}`, 'Signed in to GOLD NO1', 'success');
    return { success: true, message: 'Signed in successfully.' };
  };

  const register = (data: { fullName: string; email: string; mobile: string; password?: string }) => {
    const normalized = data.email.trim().toLowerCase();
    const exists = customers.find((c) => c.email.toLowerCase() === normalized);
    if (exists) {
      return { success: false, message: 'An account with this email already exists.' };
    }
    const created: Customer = {
      id: `cust-${Date.now()}`,
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      mobile: data.mobile.trim(),
      role: 'customer',
      joinedDate: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      addresses: [],
      savedPaymentMethods: [],
    };
    setCustomers((prev) => [...prev, created]);
    setCurrentUser(created);
    showToast('Account Created', `Welcome to GOLD NO1, ${created.fullName}`, 'success');
    return { success: true, message: 'Account created successfully.' };
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed Out', 'Thank you for visiting GOLD NO1', 'gold');
    navigateTo('home');
  };

  const updateUserProfile = (data: Partial<Customer>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setCustomers((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showToast('Profile Updated', 'Your personal details have been saved.', 'success');
  };

  const addUserAddress = (addr: Omit<DeliveryAddress, 'id'>) => {
    if (!currentUser) return;
    const newAddr: DeliveryAddress = { ...addr, id: `addr-${Date.now()}` };
    const updated: Customer = {
      ...currentUser,
      addresses: [...currentUser.addresses, newAddr],
    };
    setCurrentUser(updated);
    setCustomers((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showToast('Address Added', `${addr.city}, ${addr.pinCode}`, 'success');
  };

  const removeUserAddress = (id: string) => {
    if (!currentUser) return;
    const updated: Customer = {
      ...currentUser,
      addresses: currentUser.addresses.filter((a) => a.id !== id),
    };
    setCurrentUser(updated);
    setCustomers((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showToast('Address Removed', undefined, 'gold');
  };

  // Order Placement & Management
  const placeOrder = (params: {
    customerName: string;
    customerEmail: string;
    customerMobile: string;
    shippingAddress: DeliveryAddress;
    paymentMethod: Order['paymentMethod'];
  }): Order => {
    const orderNumber = Math.floor(10000 + Math.random() * 90000);
    const now = new Date();
    const estDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);

    const newOrder: Order = {
      id: `GN1-ORD-${orderNumber}`,
      customerId: currentUser?.id || 'guest',
      customerName: params.customerName,
      customerEmail: params.customerEmail,
      customerMobile: params.customerMobile,
      date: now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      estimatedDelivery: estDate.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      items: cartSummary.detailedItems.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        productCode: i.product.productCode,
        image: i.product.images[0],
        goldPurity: i.product.goldPurity,
        netWeight: i.product.netWeight,
        selectedSize: i.selectedSize,
        quantity: i.quantity,
        unitBasePrice: Math.round(i.lineBase / i.quantity),
        unitMakingCharges: i.product.makingCharges,
        unitGst: Math.round(i.lineGst / i.quantity),
        unitFinalPrice: Math.round(i.lineTotal / i.quantity),
      })),
      subtotal: cartSummary.subtotalBase,
      makingChargesTotal: cartSummary.makingChargesTotal,
      gstTotal: cartSummary.gstTotal,
      discountAmount: cartSummary.discountAmount,
      deliveryCharge: cartSummary.deliveryCharge,
      grandTotal: cartSummary.grandTotal,
      paymentMethod: params.paymentMethod,
      paymentStatus: params.paymentMethod === 'Cash on Delivery' ? 'Pending (COD)' : 'Paid',
      orderStatus: 'Confirmed',
      shippingAddress: params.shippingAddress,
    };

    // Decrement product stock
    setProducts((prev) =>
      prev.map((prod) => {
        const orderedQty = cart
          .filter((c) => c.productId === prod.id)
          .reduce((sum, c) => sum + c.quantity, 0);
        if (orderedQty > 0) {
          return { ...prod, stock: Math.max(0, prod.stock - orderedQty) };
        }
        return prod;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    showToast('Order Confirmed!', `Order ID: ${newOrder.id}`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
    showToast('Order Status Updated', `${orderId} → ${status}`, 'success');
  };

  const updatePaymentStatus = (orderId: string, status: PaymentStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: status } : o))
    );
    showToast('Payment Status Updated', `${orderId} → ${status}`, 'success');
  };

  // Reviews
  const addReview = (rev: Omit<CustomerReview, 'id' | 'date'>) => {
    const created: CustomerReview = {
      ...rev,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
    setReviews((prev) => [created, ...prev]);
    showToast('Review Published', 'Thank you for sharing your experience with GOLD NO1.', 'success');
  };

  const updateReview = (rev: CustomerReview) => {
    setReviews((prev) => prev.map((r) => (r.id === rev.id ? rev : r)));
    showToast('Review Updated', rev.customerName, 'success');
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review Deleted', undefined, 'gold');
  };

  // Offers
  const addOffer = (offer: Omit<OfferItem, 'id'>) => {
    const created: OfferItem = { ...offer, id: `off-${Date.now()}` };
    setOffers((prev) => [created, ...prev]);
    showToast('Offer Created', created.code, 'success');
  };

  const toggleOfferStatus = (id: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o))
    );
    showToast('Offer Status Updated', undefined, 'gold');
  };

  const deleteOffer = (id: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
    showToast('Offer Removed', undefined, 'gold');
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Showroom Settings Saved', 'Changes are live across GOLD NO1.', 'success');
  };

  const resetDemoStore = () => {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setGoldRates(INITIAL_GOLD_RATES);
    setCart([{ productId: 'prod-1', quantity: 1, selectedSize: '18 Inches (Standard)' }]);
    setWishlist(['prod-2', 'prod-6', 'prod-8']);
    setCustomers(INITIAL_CUSTOMERS);
    setCurrentUser(INITIAL_CUSTOMERS[0]);
    setOrders(INITIAL_ORDERS);
    setReviews(INITIAL_REVIEWS);
    setOffers(INITIAL_OFFERS);
    setSettings(INITIAL_STORE_SETTINGS);
    showToast('Showroom Demo Reset', 'All default products, rates & settings restored', 'success');
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchQuery('');
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedProductId,
        openProductDetails,
        quickViewProduct,
        setQuickViewProduct,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        goldRates,
        updateGoldRates,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartDrawerOpen,
        setCartDrawerOpen,
        appliedOfferCode,
        applyOfferCode,
        removeOfferCode,
        cartSummary,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        currentUser,
        customers,
        login,
        register,
        logout,
        updateUserProfile,
        addUserAddress,
        removeUserAddress,
        orders,
        lastPlacedOrder,
        placeOrder,
        updateOrderStatus,
        updatePaymentStatus,
        reviews,
        addReview,
        updateReview,
        deleteReview,
        offers,
        addOffer,
        toggleOfferStatus,
        deleteOffer,
        settings,
        updateSettings,
        resetDemoStore,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        resetFilters,
        toast,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return ctx;
};
