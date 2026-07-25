// src/pages/cart/Cart.jsx
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';

// Mock cart data
const INITIAL_CART = [
  { id: 1, name: 'Cyber Edition Box', price: 550, quantity: 1, img: '/products/product1.jpg', size: 'M', color: 'Black' },
  { id: 2, name: 'Neon Glitch Hoodie', price: 550, quantity: 2, img: '/products/product2.jpg', size: 'L', color: 'Red' },
  { id: 5, name: 'Glitch T-Shirt', price: 450, quantity: 1, img: '/products/product5.jpg', size: 'S', color: 'White' },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const sectionRef = useRef(null);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <section ref={sectionRef} className="min-h-screen bg-black text-white pt-32 px-6 md:px-12 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
              Your <span className="text-red-500">Cart</span>
            </h1>
            <p className="text-white/40 font-mono tracking-[0.5em] text-sm mt-4">
              {cartItems.length} ITEMS
            </p>
          </div>
          <Link
            to="/shop"
            className="text-white/40 hover:text-white transition-colors font-mono text-sm tracking-widest flex items-center gap-2"
          >
            <FaShoppingBag size={16} />
            Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="text-center py-20">
            <div className="text-white/10 text-9xl mb-8">🛒</div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Your cart is empty</h2>
            <p className="text-white/40 font-mono text-sm mb-8">Looks like you haven't added any items yet.</p>
            <Link
              to="/shop"
              className="inline-block bg-red-600 text-white px-12 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0a0a0a] border border-white/5 hover:border-red-500/30 transition-all duration-300 p-6 flex gap-6"
                >
                  {/* Image */}
                  <div className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0 overflow-hidden bg-[#111]">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <h3 className="text-white font-black uppercase tracking-tight text-sm">
                        {item.name}
                      </h3>
                      <div className="flex gap-4 mt-2 text-white/40 font-mono text-[10px] tracking-widest">
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                      </div>
                      <p className="text-white font-mono text-lg mt-3">EGY {item.price}</p>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                      {/* Quantity */}
                      <div className="flex items-center gap-3 bg-white/5 border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-white/40 hover:text-white transition-colors"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="text-white font-mono min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-white/40 hover:text-white transition-colors"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/30 hover:text-red-500 transition-colors p-2"
                      >
                        <FaTrashAlt size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#0a0a0a] border border-white/5 p-8 sticky top-32">
                <h2 className="text-xl font-black uppercase tracking-tighter mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 border-b border-white/10 pb-6">
                  <div className="flex justify-between text-white/60">
                    <span className="font-mono text-sm">Subtotal</span>
                    <span className="font-mono text-sm">EGY {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span className="font-mono text-sm">Shipping</span>
                    <span className="font-mono text-sm">EGY {shipping}</span>
                  </div>
                </div>

                <div className="flex justify-between pt-6 mb-8">
                  <span className="font-black uppercase tracking-tighter">Total</span>
                  <span className="font-black text-2xl text-red-500">EGY {total}</span>
                </div>

                <button className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500">
                  Proceed to Checkout
                </button>

                <div className="mt-4 text-center">
                  <span className="text-white/20 font-mono text-[10px] tracking-widest">
                    🔒 Secure Checkout
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;