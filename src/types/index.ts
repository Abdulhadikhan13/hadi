export type PageId =
  | 'home'
  | 'shop'
  | 'gold-jewellery'
  | 'diamond-jewellery'
  | 'bridal-collection'
  | 'new-arrivals'
  | 'best-sellers'
  | 'product-details'
  | 'about'
  | 'contact'
  | 'wishlist'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'orders'
  | 'login'
  | 'register'
  | 'search'
  | 'offers'
  | 'privacy'
  | 'terms'
  | 'admin';

export type GoldPurity = '24K' | '22K' | '18K';

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  price: number; // Base price before GST or inclusive base
  goldPurity: GoldPurity;
  grossWeight: number; // in grams
  netWeight: number; // in grams
  stoneWeight: number; // in carats or grams
  makingCharges: number; // in INR
  gst: number; // in INR (3% standard jewellery GST)
  finalPrice: number; // price + makingCharges + gst
  stock: number;
  images: string[];
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestSeller: boolean;
  discount?: number; // percentage e.g. 10
  productCode: string;
  metal: 'Yellow Gold' | 'Rose Gold' | 'Diamond & Gold' | 'Temple Gold';
  certification: string;
  sizes: string[];
  gender: 'Women' | 'Men' | 'Unisex';
  occasion: 'Bridal' | 'Festive' | 'Everyday' | 'Gifting' | 'Evening';
  collection: 'Bridal' | 'Heritage Temple' | 'Signature Diamond' | 'Royal Gold' | 'Modern Minimal';
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface GoldRates {
  gold24KPer10g: number;
  gold22KPer10g: number;
  gold18KPer10g: number;
  silverPer10g: number;
  lastUpdated: string;
  isDemoRate: boolean;
  apiEndpoint?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedSize: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export type PaymentStatus = 'Paid' | 'Pending (COD)' | 'Refunded';

export interface DeliveryAddress {
  id: string;
  label: string;
  houseFlat: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  productCode: string;
  image: string;
  goldPurity: GoldPurity;
  netWeight: number;
  selectedSize: string;
  quantity: number;
  unitBasePrice: number;
  unitMakingCharges: number;
  unitGst: number;
  unitFinalPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  date: string;
  estimatedDelivery: string;
  items: OrderItem[];
  subtotal: number;
  makingChargesTotal: number;
  gstTotal: number;
  discountAmount: number;
  deliveryCharge: number;
  grandTotal: number;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery';
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  shippingAddress: DeliveryAddress;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: 'customer' | 'admin';
  joinedDate: string;
  addresses: DeliveryAddress[];
  savedPaymentMethods: {
    id: string;
    type: 'UPI' | 'Card';
    label: string;
    detail: string;
  }[];
}

export interface CustomerReview {
  id: string;
  customerName: string;
  location: string;
  rating: number;
  comment: string;
  productName: string;
  productId?: string;
  date: string;
  verified: boolean;
}

export interface OfferItem {
  id: string;
  code: string;
  title: string;
  description: string;
  discountPercent: number;
  minOrderAmount: number;
  validUntil: string;
  active: boolean;
  applicableOn: string;
}

export interface StoreSettings {
  brandName: string;
  tagline: string;
  storyHeadline: string;
  storyLead: string;
  storyBody: string;
  storyPromise: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  codEnabled: boolean;
  freeShippingThreshold: number;
}

export interface FilterState {
  category: string;
  purity: string;
  priceRange: string;
  weightRange: string;
  gender: string;
  occasion: string;
  collection: string;
  sortBy: 'popular' | 'newest' | 'price-asc' | 'price-desc';
}
