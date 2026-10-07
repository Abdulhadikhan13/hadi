/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ShoppingCartPage, WishlistPage } from './pages/CartAndWishlistPages';
import { CheckoutPage } from './pages/CheckoutPage';
import {
  LoginPage,
  MyAccountPage,
  OrderHistoryPage,
  RegisterPage,
} from './pages/AccountAndAuthPages';
import {
  AboutUsPage,
  ContactUsPage,
  OffersPage,
  PrivacyPolicyPage,
  TermsAndConditionsPage,
} from './pages/InfoAndOffersPages';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const AppRouter: React.FC = () => {
  const { currentPage } = useStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
      case 'gold-jewellery':
      case 'diamond-jewellery':
      case 'bridal-collection':
      case 'new-arrivals':
      case 'best-sellers':
      case 'search':
        return <ShopPage />;
      case 'product-details':
        return <ProductDetailsPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'cart':
        return <ShoppingCartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'account':
        return <MyAccountPage />;
      case 'orders':
        return <OrderHistoryPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'about':
        return <AboutUsPage />;
      case 'contact':
        return <ContactUsPage />;
      case 'offers':
        return <OffersPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsAndConditionsPage />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#141413]">
      <Navbar />
      <main className="flex-1">{renderPage()}</main>
      {currentPage !== 'admin' && <Footer />}
      <QuickViewModal />
      <CartDrawer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
}
