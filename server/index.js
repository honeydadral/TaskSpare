// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import { protect, adminOnly } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Replace your current cors line with this
// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'http://localhost:5174'   // ← add this line
//   ],
//   credentials: true             // optional – if you ever use cookies
// }));
app.use(cors({ origin: true }));  // allows any origin – convenient while learning
app.use(express.json());
app.use('/routes/auth', authRoutes);
// MongoDB connection

app.use('/api/auth', authRoutes);

// MongoDB connection — remove the options object
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch(err => {
    console.error('MongoDB Atlas connection error:', err.message);
    process.exit(1);
  });

// Simple product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
  stock: Number,
  rating: Number,
  category: String,
});

const Product = mongoose.model('Product', productSchema);

// ─── API Routes ───

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ADD THIS TEST ROUTE HERE
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from TaskSphere Backend! 🚀',
    time: new Date().toISOString(),
    status: 'Server is alive and MongoDB is connected'
  });
});

// Temporary seed route — visit once to add sample products
app.get('/api/seed', async (req, res) => {
  try {
    // Optional: clear existing data (comment out if you want to keep old products)
    // await Product.deleteMany({});

    const samples = await Product.insertMany([
      {
        name: "Wireless Noise-Cancelling Headphones",
        price: 89.99,
        description: "Premium over-ear headphones with 30-hour battery life, active noise cancellation, and comfortable fit.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        stock: 45,
        rating: 4.7,
        category: "Audio"
      },
      {
        name: "4K Action Camera Waterproof",
        price: 199.99,
        description: "Ultra HD action cam with wide-angle lens, electronic stabilization, and waterproof housing up to 40m.",
        image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e4",
        stock: 18,
        rating: 4.6,
        category: "Cameras"
      },
      {
        name: "Smart Fitness Tracker Watch",
        price: 59.99,
        description: "Track steps, heart rate, sleep, and workouts. Water-resistant with long battery life.",
        image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e",
        stock: 120,
        rating: 4.4,
        category: "Wearables"
      }
    ]);

    res.json({
      success: true,
      message: 'Database seeded with sample products',
      inserted: samples.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Add more later: POST /api/products, PUT, DELETE...


// Create product (admin only)
app.post('/api/products', protect, adminOnly, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});