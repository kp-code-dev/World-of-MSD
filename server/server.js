const express = require("express");
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
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==========================================
// 1. DATA INITIALIZATION
// ==========================================
let games = [];
let slides = [];
let settings = {
  id: "global",
  logoUrl: "", 
  faviconUrl: "",
  ourGoalText: "No Doubt everyone loves free games of any platform.\nWorld of MSD is the arena for free games, it allows you\nto download all your favorite games completely free.",
  officialSiteLink: "https://worldlofmsd.com",
  facebookLink: "https://www.facebook.com/thala.07.msd",
  instagramLink: "https://www.instagram.com/thala07_m.s.d",
  telegramLink: "https://t.me/kalpesh_mevada_05",
  youtubeLink: "https://www.youtube.com/@thala_07-msd"
};

try {
  const gamesContent = fs.readFileSync(path.join(__dirname, 'data/games.js'), 'utf8');
  const gamesMatch = gamesContent.match(/export const gamesData = (\[[\s\S]*\]);/);
  if (gamesMatch) {
    games = new Function('return ' + gamesMatch[1])();
  }
} catch (e) {
  console.log("Error loading games.js:", e.message);
}

try {
  const slidesContent = fs.readFileSync(path.join(__dirname, 'data/slides.js'), 'utf8');
  const slidesMatch = slidesContent.match(/export const slides = (\[[\s\S]*\]);/);
  if (slidesMatch) {
    slides = new Function('return ' + slidesMatch[1])();
    // Add dummy _id for React frontend which expects MongoDB ObjectIDs
    slides = slides.map((s, i) => ({ ...s, _id: Date.now().toString() + i }));
  }
} catch (e) {
  console.log("Error loading slides.js:", e.message);
}

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

// Route 1: Get all games
app.get("/api/games", (req, res) => {
  res.json(games);
});

// Route 3:
app.get("/api/games/:id", (req, res) => {
  const game = games.find(g => g.id === req.params.id);
  if (game) {
    res.json(game);
  } else {
    res.status(404).json({ message: "Game not found" });
  }
});

app.post("/api/games", authenticateToken, (req, res) => {
  const newGame = req.body;
  games.push(newGame);
  res.status(201).json(newGame);
});

// Route: Update an existing game
app.put("/api/games/:id", authenticateToken, (req, res) => {
  const index = games.findIndex(g => g.id === req.params.id);
  if (index !== -1) {
    games[index] = { ...games[index], ...req.body };
    res.json(games[index]);
  } else {
    res.status(404).json({ message: "Game not found" });
  }
});

// Route: Delete a game
app.delete("/api/games/:id", authenticateToken, (req, res) => {
  const index = games.findIndex(g => g.id === req.params.id);
  if (index !== -1) {
    games.splice(index, 1);
    res.json({ message: "Game deleted successfully!" });
  } else {
    res.status(404).json({ message: "Game not found" });
  }
});

// ==========================================
// 4. SETTINGS & SLIDES ROUTES
// ==========================================

// Route: Get slides
app.get('/api/slides', (req, res) => {
    res.json(slides);
});

// Route: Add a slide
app.post('/api/slides', authenticateToken, (req, res) => {
    const newSlide = req.body;
    newSlide._id = Date.now().toString(); // dummy _id
    slides.push(newSlide);
    res.status(201).json(newSlide);
});

// Route: Update a slide
app.put('/api/slides/:id', authenticateToken, (req, res) => {
    const index = slides.findIndex(s => s._id === req.params.id);
    if (index !== -1) {
        slides[index] = { ...slides[index], ...req.body };
        res.json(slides[index]);
    } else {
        res.status(404).json({ message: "Slide not found" });
    }
});

// Route: Delete a slide
app.delete('/api/slides/:id', authenticateToken, (req, res) => {
    const index = slides.findIndex(s => s._id === req.params.id);
    if (index !== -1) {
        slides.splice(index, 1);
        res.json({ message: "Slide deleted successfully!" });
    } else {
        res.status(404).json({ message: "Slide not found" });
    }
});

// Route: Get Settings
app.get('/api/settings', (req, res) => {
    res.json(settings);
});

// Route: Update Settings
app.put('/api/settings', authenticateToken, (req, res) => {
    settings = { ...settings, ...req.body };
    res.json(settings);
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
