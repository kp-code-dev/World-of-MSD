const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");
const fs = require("fs");

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("❌ No MONGO_URL found in .env");
  process.exit(1);
}

// Re-define Schemas
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

const slideSchema = new mongoose.Schema({
  image: String,
  link: String,
});

const Game = mongoose.model("Game", gameSchema);
const Slide = mongoose.model("Slide", slideSchema);

const seedDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected successfully!");

    // Clear existing data (if any)
    await Game.deleteMany({});
    await Slide.deleteMany({});
    console.log("🗑️ Cleared existing data");

    // Load Games Data
    const gamesContent = fs.readFileSync(path.join(__dirname, 'data/games.js'), 'utf8');
    const gamesMatch = gamesContent.match(/export const gamesData = (\[[\s\S]*\]);/);
    if (gamesMatch) {
      const games = new Function('return ' + gamesMatch[1])();
      await Game.insertMany(games);
      console.log(`✅ Successfully seeded ${games.length} games!`);
    }

    // Load Slides Data
    const slidesContent = fs.readFileSync(path.join(__dirname, 'data/slides.js'), 'utf8');
    const slidesMatch = slidesContent.match(/export const slides = (\[[\s\S]*\]);/);
    if (slidesMatch) {
      const slides = new Function('return ' + slidesMatch[1])();
      await Slide.insertMany(slides);
      console.log(`✅ Successfully seeded ${slides.length} slides!`);
    }

    console.log("🎉 Database Seed Completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
