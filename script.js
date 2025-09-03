const { useState, useEffect } = React;


const productsData = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1300,
    description: "High-quality wireless headphones with noise cancellation",
    image: "./img/hp.png"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 1500,
    description: "Feature-rich smartwatch with health monitoring",
    image: "./img/sw.png"
  },
  {
    id: 3,
    name: "Smartphone",
    price: 15000,
    description: "Latest smartphone with high-resolution camera",
    image: "./img/sp.jpg"
  },
  {
    id: 4,
    name: "Laptop",
    price: 57000,
    description: "Powerful laptop for work and entertainment",
    image: "./img/lt.webp"
  },
  {
    id: 5,
    name: "Digital Camera",
    price: 100000,
    description: "Professional DSLR camera for photography enthusiasts",
    image: "./img/cm.webp"
  },
  {
    id: 6,
    name: "Gaming Console",
    price: 57000,
    description: "Next-gen gaming console with immersive gameplay",
    image: "./img/ps5.webp"
  }
];

// Header Component
function Header({ cartItems, toggleCart }) {
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-shopping-bag"></i>
            <span>ADHISHOP</span>
          </div>
          <nav className="nav">
            <a href="#" className="nav-item">Home</a>
            <a href="#" className="nav-item">Products</a>
            <a href="#" className="nav-item">About</a>
            <a href="#" className="nav-item">Contact</a>
          </nav>
          <div className="cart-icon" onClick={toggleCart}>
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">{cartItemsCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// Product Card Component
function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">₹{product.price.toFixed(2)}</div>
        <button className="add-to-cart" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// Cart Item Component
function CartItem({ item, onUpdateQuantity, onRemoveItem }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <div className="cart-item-title">{item.name}</div>
        <div className="cart-item-price">${item.price.toFixed(2)}</div>
        <div className="cart-item-quantity">
          <button 
            className="quantity-btn" 
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button 
            className="quantity-btn" 
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <button 
          className="remove-item" 
          onClick={() => onRemoveItem(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

// Cart Sidebar Component
function CartSidebar({ isOpen, toggleCart, cartItems, onUpdateQuantity, onRemoveItem }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={toggleCart}></div>
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-cart" onClick={toggleCart}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
              />
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <>
            <div className="cart-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </>
        )}
      </div>
    </>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <h1>Welcome to AdhiShop</h1>
        <p>Discover the latest tech gadgets and electronics at amazing prices. Quality products with fast shipping and excellent customer service.</p>
      </div>
    </section>
  );
}

// Products Section Component
function ProductsSection({ products, onAddToCart }) {
  return (
    <section className="products-section">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About TechShop</h3>
            <p>Your one-stop shop for all tech gadgets and electronics. We offer quality products at competitive prices.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <p>Home</p>
            <p>Products</p>
            <p>About Us</p>
            <p>Contact</p>
          </div>
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p><i className="fas fa-map-marker-alt"></i> Dubai main road ,Dubai</p>
            <p><i className="fas fa-phone"></i> 8220073560</p>
            <p><i className="fas fa-envelope"></i> adithyanrobert005@gmail.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 AdhiShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('techshop_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('techshop_cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };
  
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };
  
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  return (
    <div className="App">
      <Header cartItems={cartItems} toggleCart={toggleCart} />
      <HeroSection />
      <ProductsSection products={productsData} onAddToCart={addToCart} />
      <CartSidebar 
        isOpen={isCartOpen} 
        toggleCart={toggleCart} 
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
      <Footer />
    </div>
  );
}

// Render the App
ReactDOM.render(<App />, document.getElementById('root'));