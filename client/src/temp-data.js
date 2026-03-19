// src/temp-data.js
// Dummy product data for development (replace with real API later)

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    description: "High-quality noise-cancelling over-ear headphones with 30-hour battery life and comfortable fit.",
    image: new URL('/iphone.png', import.meta.url).href,
    category: "Electronics",
    stock: 45,
    rating: 4.7,
  },
  {
    id: 2,
    name: "Smart Fitness Tracker Watch",
    price: 59.99,
    description: "Track your steps, heart rate, sleep, and workouts. Water-resistant and syncs with your phone.",
    image: new URL('@/assets/cover.jpg', import.meta.url).href,
    category: "Wearables",
    stock: 120,
    rating: 4.4,
  },
  {
    id: 3,
    name: "Portable Power Bank 20000mAh",
    price: 34.99,
    description: "Fast-charging power bank with dual USB ports. Perfect for travel and daily use.",
    image: new URL('@/assets/cover.jpg', import.meta.url).href,
    category: "Accessories",
    stock: 200,
    rating: 4.6,
  },
  {
    id: 4,
    name: "Mechanical Gaming Keyboard RGB",
    price: 129.99,
    description: "RGB backlit mechanical keyboard with customizable keys and anti-ghosting technology.",
    image: new URL('@/assets/cover.jpg', import.meta.url).href,
    category: "Gaming",
    stock: 28,
    rating: 4.8,
  },
  {
    id: 5,
    name: "4K Action Camera Waterproof",
    price: 199.99,
    description: "Ultra HD action cam with wide-angle lens, stabilization, and underwater housing included.",
    image: new URL('@/assets/cover.jpg', import.meta.url).href,
    category: "Cameras",
    stock: 15,
    rating: 4.5,
  },
  {
    id: 6,
    name: "Ergonomic Office Chair",
    price: 249.99,
    description: "Adjustable lumbar support, breathable mesh back, and 360° swivel for all-day comfort.",
    image: new URL('@/assets/cover.jpg', import.meta.url).href,
    category: "Furniture",
    stock: 8,
    rating: 4.9,
  },
];

export default products;