import React, { useState } from 'react';
import { AuthProvider } from "E:\\custom_crafts_studio\\src\\contexts\\AuthContext.tsx";
import { CartProvider } from "E:\\custom_crafts_studio\\src\\contexts\\CartContext.tsx";
import Header from "E:\\custom_crafts_studio\\src\\components\\Layout\\Header.tsx";
import Footer from 'E:\\custom_crafts_studio\\src\\components\\Layout\\Footer.tsx';
import HomePage from 'E:\\custom_crafts_studio\\src\\components\\Home\\HomePage.tsx';
import LoginForm from 'E:\\custom_crafts_studio\\src\\components\\auth\\LoginForm.tsx';
import SignupForm from 'E:\\custom_crafts_studio\\src\\components\\auth\\SignupForm.tsx';
import ProductGrid from 'E:\\custom_crafts_studio\\src\\components\\Products\\ProductGrid.tsx';
import CartPage from 'E:\\custom_crafts_studio\\src\\components\\cart\\CartPage.tsx';
import UserDashboard from 'E:\\custom_crafts_studio\\src\\components\\Dashbord\\UserDashboard.tsx';
import { products } from 'E:\\custom_crafts_studio\\src\\data\\products.ts';
import { Product } from 'E:\\custom_crafts_studio\\src\\types\\index.ts';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProduct(null);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    // For now, just add to cart when viewing product
    // In a real app, you'd show a product detail page
  };

  const getFilteredProducts = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginForm onNavigate={handleNavigate} />;
      case 'signup':
        return <SignupForm onNavigate={handleNavigate} />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <UserDashboard onNavigate={handleNavigate} />;
      case 'clothing':
        return (
          <ProductGrid
            products={getFilteredProducts('clothing')}
            category="clothing"
            onViewProduct={handleViewProduct}
          />
        );
      case 'riding-gear':
        return (
          <ProductGrid
            products={getFilteredProducts('riding-gear')}
            category="riding-gear"
            onViewProduct={handleViewProduct}
          />
        );
      case 'vehicle-wrap':
        return (
          <ProductGrid
            products={getFilteredProducts('vehicle-wrap')}
            category="vehicle-wrap"
            onViewProduct={handleViewProduct}
          />
        );
      case 'mobile-accessories':
        return (
          <ProductGrid
            products={getFilteredProducts('mobile-accessories')}
            category="mobile-accessories"
            onViewProduct={handleViewProduct}
          />
        );
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const showHeaderFooter = !['login', 'signup'].includes(currentPage);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          {showHeaderFooter && (
            <Header currentPage={currentPage} onNavigate={handleNavigate} />
          )}
          
          <main>
            {renderCurrentPage()}
          </main>
          
          {showHeaderFooter && <Footer />}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;