const path = require('path');
require("dotenv").config();
const express = require("express");
const port = process.env.CLIENT_PORT;

const app = express();

app.use('/assets',  express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'html')));
app.use('/script',  express.static(path.join(__dirname, 'script')));

const route = express.Router();
app.use(route);

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/home', (req, res) => {
    console.log(`Request at ${req.url}`);
    res.sendFile(path.join(__dirname, 'html', 'homePage.html'));
});

route.get('/shop', (req, res) => {
    console.log(`Request at ${req.url}`);
    res.sendFile(path.join(__dirname, 'html', 'shop.html'));
});

route.get('/customize', (req, res) => {
    console.log(`Request at ${req.url}`);
    res.sendFile(path.join(__dirname, 'html', 'customService.html'));
});

route.get('/FAQ', (req, res) => {
    console.log(`Request at ${req.url}`);
    res.sendFile(path.join(__dirname, 'html', 'faq.html'));
});

route.get('/team', (req, res) => {
    console.log(`Request at ${req.url}`);
    res.sendFile(path.join(__dirname, 'html', 'team.html'));
});

route.get('/management', (req, res) => {
    console.log(`Request at ${req.url}`);
    res.sendFile(path.join(__dirname, 'html', 'modifyProduct.html'));
});

route.get('/management/add', (req, res) => {
    console.log(`Request at ${req.url}`);
    res.sendFile(path.join(__dirname, 'html', 'addProduct.html'));
});

route.get('/management/:SKU', (req, res) => {
    console.log(`Request at ${req.url}`);
    res.sendFile(path.join(__dirname, 'html', 'proManage.html'));
});

route.get('/register', (req, res) => {
    console.log(`Request at ${req.url}`);
    res.sendFile(path.join(__dirname, 'html', 'register.html'));
});

route.get('/login', (req, res) => {
    console.log(`Request at ${req.url}`);
    res.sendFile(path.join(__dirname, 'html', 'login.html'));
});

route.get('/cart', (req, res) => {
    console.log(`Request at ${req.url}`);
    res.sendFile(path.join(__dirname, 'html', 'cart.html'));
});

route.get('/shop/search', (req, res) => {
    console.log(`Request at ${req.url}`);
    res.sendFile(path.join(__dirname, 'html', 'search.html'));
});

route.get('/shop/:SKU', (req, res) => {
    console.log(`Request at ${req.url}`);
    res.sendFile(path.join(__dirname, 'html', 'productDetail.html'));
});




route.use((req, res, next) => {
    if (req.url.startsWith('/web/') || req.url.startsWith('/web_editor/')) {
        // Ignore logging for /web/ and /web_editor/ requests
        return res.status(404).end(); // Send empty 404 response silently
    }

    console.log(`Request at ${req.url}`);
    console.log("404: Invalid accessed");
    res.status(404).send("Invalid Page");
});
app.listen(port, () => {
    console.log(`Client listening on port: ${port}`);
});


