const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Simple test route
app.get('/hello', (req, res) => {
    res.send('Hello from Express server!');
});

// Adding two numbers
// Example: http://localhost:3000/add?num1=5&num2=7
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.send('Please provide valid numbers like /add?num1=5&num2=7');
    }

    const sum = num1 + num2;
    res.send(`The sum of ${num1} and ${num2} is ${sum}`);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});