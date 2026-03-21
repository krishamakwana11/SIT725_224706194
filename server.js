const express = require('express');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));

// Sample events data
const events = [
  {
    title: "Tech Innovation Meetup",
    date: "25 March 2026",
    location: "Melbourne CBD",
    description: "A networking event for students, developers, and tech enthusiasts.",
    image: "images/event1.jpg"
  },
  {
    title: "Food Festival",
    date: "30 March 2026",
    location: "Federation Square",
    description: "Enjoy delicious food, music, and cultural activities with friends and family.",
    image: "images/event2.jpg"
  },
  {
    title: "Career Expo 2026",
    date: "5 April 2026",
    location: "Deakin University",
    description: "Meet recruiters, explore job opportunities, and attend career workshops.",
    image: "images/event3.jpg"
  }
];

// API endpoint
app.get('/api/events', (req, res) => {
  res.json({ statusCode: 200, data: events, message: "Events fetched successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});