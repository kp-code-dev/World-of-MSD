const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const compression = require("compression");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const JWT_SECRET = process.env.JWT_SECRET || "worldofmsd_super_secret_key_123"; // Fallback for local testing only

// Middleware
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==========================================
// 1. DATABASE CONNECTION
// ==========================================
const MONGO_URL = process.env.MONGO_URL;

if (MONGO_URL && MONGO_URL.includes("mongodb+srv://")) {
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("✅ Server Connected to MongoDB!"))
    .catch((err) => console.log("❌ Connection Error:", err.message));
} else {
  console.log("⚠️ MONGO_URL not set properly in .env, skipping connection.");
}

// ==========================================
// 2. SCHEMAS (Database Structure)
// ==========================================
const gameSchema = new mongoose.Schema({
  id: String,
  title: String,
  keywords: [String],
  image: String,
  label: String,
  description: String,
  developer: String,
  publisher: String,
  releaseDate: String,
  size: String,
  downloadUrl: String,
  screenshots: [String],
  playUrl: String,
  minRequirements: Object,
  recRequirements: Object,
});

gameSchema.index({ id: 1 });
gameSchema.index({ title: 'text', keywords: 'text' });

const slideSchema = new mongoose.Schema({
  image: String,
  link: String,
});

const settingSchema = new mongoose.Schema({
  id: { type: String, default: "global" },
  logoUrl: String,
  faviconUrl: String,
  ourGoalText: String,
  officialSiteLink: String,
  facebookLink: String,
  instagramLink: String,
  telegramLink: String,
  youtubeLink: String,
});

const Game = mongoose.model("Game", gameSchema);
const Slide = mongoose.model("Slide", slideSchema);
const Setting = mongoose.model("Setting", settingSchema);

// ==========================================
// 3. API ROUTES
// ==========================================

// --- Auth Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer token"

  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};

// --- Admin Login Route ---
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Hardcoded simple admin credentials
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ username: "admin" }, JWT_SECRET, {
      expiresIn: "12h",
    });
    res.json({ token, message: "Login successful!" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "World of MSD Backend is running perfectly!" });
});

// Route 1: Get all games
app.get("/api/games", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route 3:
app.get("/api/games/:id", async (req, res) => {
  try {
    const game = await Game.findOne({ id: req.params.id });
    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/games", authenticateToken, async (req, res) => {
  try {
    const newGame = new Game(req.body);
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route: Update an existing game
app.put("/api/games/:id", authenticateToken, async (req, res) => {
  try {
    const updatedGame = await Game.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedGame) {
      res.json(updatedGame);
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: Delete a game
app.delete("/api/games/:id", authenticateToken, async (req, res) => {
  try {
    const deletedGame = await Game.findOneAndDelete({ id: req.params.id });
    if (deletedGame) {
      res.json({ message: "Game deleted successfully!" });
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 4. SETTINGS & SLIDES ROUTES
// ==========================================

// Route: Get slides
app.get('/api/slides', async (req, res) => {
    try {
        const slides = await Slide.find();
        res.json(slides);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route: Add a slide
app.post('/api/slides', authenticateToken, async (req, res) => {
    try {
        const newSlide = new Slide(req.body);
        const savedSlide = await newSlide.save();
        res.status(201).json(savedSlide);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route: Update a slide
app.put('/api/slides/:id', authenticateToken, async (req, res) => {
    try {
        const updatedSlide = await Slide.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedSlide) {
            res.json(updatedSlide);
        } else {
            res.status(404).json({ message: "Slide not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route: Delete a slide
app.delete('/api/slides/:id', authenticateToken, async (req, res) => {
    try {
        await Slide.findByIdAndDelete(req.params.id);
        res.json({ message: "Slide deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route: Get Settings
app.get('/api/settings', async (req, res) => {
    try {
        let settingsData = await Setting.findOne({ id: "global" });
        if (!settingsData) {
            // Default settings
            settingsData = new Setting({
                id: "global",
                logoUrl: "", 
                faviconUrl: "",
                ourGoalText: "No Doubt everyone loves free games of any platform.\nWorld of MSD is the arena for free games, it allows you\nto download all your favorite games completely free.",
                officialSiteLink: "https://worldlofmsd.com",
                facebookLink: "https://www.facebook.com/thala.07.msd",
                instagramLink: "https://www.instagram.com/thala07_m.s.d",
                telegramLink: "https://t.me/kalpesh_mevada_05",
                youtubeLink: "https://www.youtube.com/@thala_07-msd"
            });
            await settingsData.save();
        }
        res.json(settingsData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route: Update Settings
app.put('/api/settings', authenticateToken, async (req, res) => {
    try {
        const updatedSettings = await Setting.findOneAndUpdate(
            { id: "global" }, 
            req.body, 
            { new: true, upsert: true }
        );
        res.json(updatedSettings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage });

// Route: Upload file
app.post("/api/upload", authenticateToken, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// ==========================================
// 5. START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
