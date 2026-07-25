// src/pages/shop/Shop.jsx
import React, { useState, useRef } from 'react';
import { FaFilter, FaTimes, FaShoppingBag } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

const PRODUCTS = [
  { id: 1, name: 'Cyber Edition Box', price: '550 EGY', oldPrice: '700', category: 'Boxes', img: '/products/product1.jpg', inStock: true },
  { id: 2, name: 'Neon Glitch Hoodie', price: '550 EGY', oldPrice: '700', category: 'Hoodies', img: '/products/product2.jpg', inStock: true },
  { id: 3, name: 'Vortex Sneakers', price: '550 EGY', oldPrice: '700', category: 'Shoes', img: '/products/product3.jpg', inStock: false },
  { id: 4, name: 'TRIVO Cap', price: '250 EGY', oldPrice: null, category: 'Accessories', img: '/products/product4.jpg', inStock: true },
  { id: 5, name: 'Glitch T-Shirt', price: '450 EGY', oldPrice: '550', category: 'T-Shirts', img: '/products/product5.jpg', inStock: true },
  { id: 6, name: 'Racer Jacket', price: '1200 EGY', oldPrice: '1500', category: 'Jackets', img: '/products/product6.jpg', inStock: true },
  { id: 7, name: 'Tech Backpack', price: '800 EGY', oldPrice: null, category: 'Accessories', img: '/products/product7.jpg', inStock: true }
];

const CATEGORIES = ['All', 'Boxes', 'Hoodies', 'Shoes', 'T-Shirts', 'Jackets', 'Accessories', 'Pants'];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const sectionRef = useRef(null);

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === 'price-high') return parseFloat(b.price) - parseFloat(a.price);
    return 0;
  });

  return (
    <section ref={sectionRef} className="min-h-screen bg-black text-white pt-32 px-6 md:px-12 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
              Shop <span className="text-red-500">Collection</span>
            </h1>
            <p className="text-white/40 font-mono tracking-[0.5em] text-sm mt-4">
              {filteredProducts.length} PRODUCTS AVAILABLE
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:flex-none">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 bg-white/5 border border-white/10 px-4 py-3 pl-10 text-white text-sm focus:border-red-500 outline-none transition-colors"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            </div>

            {/* Filter Button Mobile */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden bg-white/5 border border-white/10 p-3 hover:border-red-500 transition-colors"
            >
              <FaFilter size={18} className="text-white/70" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/10 pb-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4">
            <label className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 px-4 py-2 text-white text-sm focus:border-red-500 outline-none transition-colors appearance-none cursor-pointer pr-8 relative"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='white' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10px center',
              }}
            >
              <option value="default" className="bg-black text-white">Default</option>
              <option value="price-low" className="bg-black text-white">Price: Low to High</option>
              <option value="price-high" className="bg-black text-white">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-[#0a0a0a] border border-white/5 hover:border-red-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-72 w-full overflow-hidden bg-[#111]">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <span className="text-white font-black text-sm uppercase tracking-widest">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-white text-sm font-black uppercase tracking-tight group-hover:text-red-500 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-white/30 text-[10px] font-mono tracking-widest mt-1">
                      {product.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-mono text-lg">{product.price}</span>
                    {product.oldPrice && (
                      <p className="text-white/40 font-mono text-sm line-through">{product.oldPrice}</p>
                    )}
                  </div>
                </div>

                <button
                  disabled={!product.inStock}
                  className={`w-full mt-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    product.inStock
                      ? 'bg-white text-black hover:bg-red-600 hover:text-white'
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Add to Cart' : 'Unavailable'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/30 font-mono text-sm">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;