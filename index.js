const express = require('express');
const path = require('path');
const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.render('Home'));

app.get('/about', (req, res) => res.render('about'));
app.get('/privacy', (req, res) => res.render('privacy'));
app.get('/features', (req, res) => res.render('features'));
app.get('/faq', (req, res) => res.render('faq'));
app.get('/amortization', (req, res) => res.render('AC'));
app.get('/compound-interest', (req, res) => res.render('CIC'));
app.get('/finance', (req, res) => res.render('FC1'));
app.get('/gst', (req, res) => res.render('GSTC1'));
app.get('/interest', (req, res) => res.render('IC1'));
app.get('/interest-rate', (req, res) => res.render('IRC'));
app.get('/investment', (req, res) => res.render('IV1'));
app.get('/loan', (req, res) => res.render('LC'));
app.get('/mortgage', (req, res) => res.render('MC1'));
app.get('/retirement', (req, res) => res.render('RC1'));
app.get('/salary', (req, res) => res.render('SC'));
app.get('/sales-tax', (req, res) => res.render('STC'));
app.get('/inflation', (req, res) => res.render('ITC'));
app.get('/income-tax', (req, res) => res.render('ICS'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
