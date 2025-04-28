const path = require('path');
require("dotenv").config();
const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');
const port = process.env.SERVER_PORT;
const cookieParser = require('cookie-parser');
const app = express();

const multer = require('multer');

// Configure multer to upload to 'uploads' folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './html/assets/Product/'); // Save to /uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const productUpload = multer({ storage: productStorage });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable CORS for cross-origin requests
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from frontend
    credentials: true  // Allow credentials (cookies) to be sent
}));

app.use('/assets', express.static('assets'));


// MySQL Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,  // e.g., 'localhost'
    user: process.env.DB_USER,  // e.g., 'root'
    password: process.env.DB_PASSWORD,  // your DB password
    database: process.env.DB_NAME  // e.g., 'my_database'
});

// Check DB connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database!');
});

// Middleware
app.use(express.json());  // To parse JSON data from requests
app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded data

// API endpoint to get all products
app.get('/shop', (req, res) => {
    db.query('SELECT DISTINCT p.SKU, pName, imgpath, price, pType FROM products p LEFT JOIN productionimage pi ON p.SKU = pi.SKU;', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        return res.send(results);  // Send products data as JSON
    });
});



app.post('/register', (req, res) => {
    const { username, fName, lName, age, tel, lineID, email, password, address } = req.body;
    
    if (![username, fName, lName, age, tel, lineID, email, password, address].every(Boolean)) {
        return res.status(400).json({ success: false, error: 'All fields are required.' });
    }
    
    const sql = `
    INSERT INTO accounts
    (username, fName, lName, age, tel, email, acc_password, lineID, address, roles, createdDT)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Customer', NOW())
    `;
    
    db.query(sql, [username, fName, lName, parseInt(age), tel, email, password, lineID, address], (dbErr) => {
        if (dbErr) {
            console.error('DB insert error:', dbErr);
            // Send a JSON response instead of an HTML error page
            return res.status(500).json({ success: false, error: dbErr.message });
        }
        res.status(201).json({ success: true, message: 'User registered successfully.' });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM accounts WHERE email = ?';
    db.execute(query, [email], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: 'No account found with this email' });
        }

        const user = results[0];

        // Instead of bcrypt.compare, just check directly
        if (user.acc_password !== password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Successful login, set cookies
        res.cookie('userId', user.accID, { httpOnly: true, secure: true, maxAge: 3600000 });

        res.json({ success: true, message: 'Login successful' });
    });
});



app.post('/logout', (req, res) => {
    res.clearCookie('userId');
    res.json({ message: 'Logged out' });
});

app.delete('/delete-account', (req, res) => {
    const userId = req.cookies.userId;
    if (!userId) {
        return res.status(401).json({ error: 'Not logged in' });
    }

    db.execute('DELETE FROM accounts WHERE accID = ?', [userId], (err) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }
        res.clearCookie('userId');
        res.json({ message: 'Account deleted' });
    });
});

app.get('/user-info', (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({ error: 'No user logged in' });
    }

    const query = 'SELECT username FROM accounts WHERE accID = ?';
    db.execute(query, [userId], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ username: results[0].username });
    });
});

// Get user's cart items
app.get('/cart', (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Not logged in' });
    }

    db.query(`
        SELECT p.SKU, p.pName, p.price, pi.imgpath, c.quantity
        FROM cart c
        JOIN products p ON c.SKU = p.SKU
        LEFT JOIN productionimage pi ON p.SKU = pi.SKU
        WHERE c.accID = ?
    `, [userId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(results);
    });
});




app.post('/cart/add', (req, res) => {
    const userId = req.cookies.userId;
    const { SKU } = req.body;

    if (!userId) {
        return res.status(401).json({ error: 'Not logged in' });
    }

    if (!SKU) {
        return res.status(400).json({ error: 'SKU is required' });
    }

    // Insert or update quantity if needed
    db.query('SELECT * FROM cart WHERE accID = ? AND SKU = ?', [userId, SKU], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            // Item exists -> update quantity +1
            db.query('UPDATE cart SET quantity = quantity + 1 WHERE accID = ? AND SKU = ?', [userId, SKU], (updateErr) => {
                if (updateErr) {
                    console.error('Update error:', updateErr);
                    return res.status(500).json({ error: 'Update error' });
                }
                return res.json({ message: 'Quantity updated in cart.' });
            });
        } else {
            // New insert
            db.query('INSERT INTO cart (accID, SKU, quantity) VALUES (?, ?, 1)', [userId, SKU], (insertErr) => {
                if (insertErr) {
                    console.error('Insert error:', insertErr);
                    return res.status(500).json({ error: 'Insert error' });
                }
                return res.json({ message: 'Item added to cart.' });
            });
        }
    });
});




// Remove item from cart
app.post('/cart/remove', (req, res) => {
    const userId = req.cookies.userId;
    const { SKU } = req.body;

    if (!userId) {
        return res.status(401).json({ error: 'Not logged in' });
    }

    if (!SKU) {
        return res.status(400).json({ error: 'SKU is required' });
    }

    db.query('DELETE FROM cart WHERE accID = ? AND SKU = ?', [userId, SKU], (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json({ message: 'Item removed from cart successfully' });
    });
});


// Route to handle customization form
app.post('/customize', upload.single('design'), (req, res) => {
    const userId = req.cookies.userId;
    const { lineID, productType, mainTheme, details, packaging } = req.body;
    const filePath = req.file ? req.file.path : null; // Save uploaded file path

    if (!userId) {
        return res.status(401).json({ error: 'User not logged in' });
    }

    // Step 1: Create new order first
    const orderQuery = `
        INSERT INTO orders (accID, totalPrice, orders_status)
        VALUES (?, 0.00, 'Pending')
    `;

    db.query(orderQuery, [userId], (orderErr, orderResult) => {
        if (orderErr) {
            console.error('Error creating order:', orderErr.message);
            return res.status(500).json({ error: 'Database error creating order' });
        }

        const newOrderID = orderResult.insertId; // 🎯 Get the new order ID

        // Step 2: Insert customization linked to new order
        const customizationQuery = `
            INSERT INTO customization (orderID, customTheme, customDetail, productType, packageType, customStatus, filepath, createdBy)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(customizationQuery, [newOrderID, mainTheme, details, productType, packaging, 'Pending', filePath, userId], (customErr, customResult) => {
            if (customErr) {
                console.error('Error creating customization:', customErr.message);
                return res.status(500).json({ error: 'Database error creating customization' });
            }

            res.json({ message: 'Customization submitted successfully!' });
        });
    });
});

app.post('/addProduct', productUpload.single('productImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Product image is required' });
    }

    const { SKU, pName, desc, pType, stock, price, catID } = req.body;
    const userId = req.cookies.userId; // Must be admin

    if (!userId) {
        return res.status(401).json({ error: 'Not logged in' });
    }

    const imagePath = "assets/Product/" + req.file.filename;

    if (!imagePath) {
        return res.status(400).json({ error: 'Product image is required' });
    }

    // Step 1: Insert into products table
    const productQuery = `
        INSERT INTO products (SKU, pName, \`desc\`, pType, stock, price, catID, createdBy)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(productQuery, [SKU, pName, desc, pType, stock, price, catID, userId], (productErr) => {
        if (productErr) {
            console.error('Error inserting product:', productErr.message);
            return res.status(500).json({ error: 'Database error inserting product' });
        }

        // Step 2: Insert into productionimage table
        const imageQuery = `
            INSERT INTO productionimage (SKU, imgpath)
            VALUES (?, ?)
        `;

        db.query(imageQuery, [SKU, imagePath], (imgErr) => {
            if (imgErr) {
                console.error('Error inserting product image:', imgErr.message);
                return res.status(500).json({ error: 'Database error inserting product image' });
            }

            res.json({ message: 'Product and image added successfully!' });
        });
    });
});


app.post('/shop/search', (req, res) => {
    const { productName, category, ptype } = req.body;

    let query = `
        SELECT p.SKU, p.pName, pi.imgpath AS mainImg, p.price, p.pType, p.desc, p.stock
        FROM products p
        JOIN productionimage pi ON p.SKU = pi.SKU
        JOIN categories c ON c.catID = p.catID
        WHERE 1=1
    `;
    const queryParams = [];

    // Add conditions based on the query parameters
    if (productName) {
        query += ` AND p.pName LIKE ?`;
        queryParams.push(`%${productName}%`);
    }
    if (category) {
        query += ` AND c.catName = ?`;
        queryParams.push(category);
    }
    if (ptype) {
        // Assuming the format is 'YYYY-MM' (e.g., '2024-01')
        query += ` AND p.pType = ?`;
        queryParams.push(ptype);  // Use the month-year format
    }

    // Perform the query
    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }

        return res.json(results);  // Send filtered products as JSON
    });
});




app.get('/shop/:SKU', (req, res) => {
    const SKU = req.params.SKU;

    // First, fetch the main product data
    db.query(`
        SELECT 
            p.SKU,
            p.pName,
            p.price,
            p.pType,
            p.desc,
            p.stock
        FROM products p
        WHERE p.SKU = ?`, [SKU], (err, productResults) => {

        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (productResults.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const product = productResults[0];

        // Fetch all images for this product
        db.query(`
            SELECT 
                pi.imgpath
            FROM productionimage pi
            WHERE pi.SKU = ?`, [SKU], (err, imageResults) => {

            if (err) {
                console.error('Error fetching images:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            const images = imageResults.map(img => img.imgpath);
            if (images.length === 0) {
                images.push('assets/placeholder.png'); // Default placeholder if no images
            }

            // Fetch all reviews for this product
            db.query(`
                SELECT 
                    r.accID AS reviewer,
                    r.rating,
                    r.comment,
                    r.imgpath AS reviewImg
                FROM reviews r
                WHERE r.SKU = ?`, [SKU], (err, reviewResults) => {

                if (err) {
                    console.error('Error fetching reviews:', err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // Calculate average rating
                let averageRating = 0;
                if (reviewResults.length > 0) {
                    const totalRating = reviewResults.reduce((sum, review) => sum + review.rating, 0);
                    averageRating = totalRating / reviewResults.length;
                    averageRating = parseFloat(averageRating.toFixed(1)); // Round to 1 decimal
                }

                // Prepare the final response
                const responseData = {
                    ...product,                  // All product info
                    mainImg: images[0],           // First image as main
                    secondaryImgs: images.slice(1), // Others as secondary images
                    averageRating,                // New field for avg rating
                    reviews: reviewResults        // List of all reviews
                };

                return res.json(responseData);
            });
        });
    });
});
    
// Middleware to check if user is an admin
app.get('/check-admin', (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Not logged in' });
    }

    // Query to check if the user has admin role
    const query = 'SELECT roles FROM accounts WHERE accID = ?';
    db.execute(query, [userId], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];

        if (user.roles === 'Admin') {
            return res.json({ isAdmin: true });
        }

        return res.json({ isAdmin: false });
    });
});


app.get('/management', (req, res) => {
    db.query('SELECT DISTINCT p.SKU, pName, imgpath, price, pType FROM products p LEFT JOIN productionimage pi ON p.SKU = pi.SKU;', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        return res.send(results);  // Send products data as JSON
    });
});


app.get('/management/:SKU', (req, res) => {
    const SKU = req.params.SKU;

    // Fetch product data
    db.query(`
        SELECT 
            p.SKU,
            p.pName,
            p.price,
            p.pType,
            p.desc,
            p.stock
        FROM products p
        WHERE p.SKU = ?`, [SKU], (err, productResults) => {

        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (productResults.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const product = productResults[0];

        // Fetch product images
        db.query(`
            SELECT 
                pi.imgpath
            FROM productionimage pi
            WHERE pi.SKU = ?`, [SKU], (err, imageResults) => {

            if (err) {
                console.error('Error fetching images:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            const images = imageResults.map(img => img.imgpath);
            if (images.length === 0) {
                images.push('assets/placeholder.png'); // Default image
            }

            // Fetch product categories
            db.query(`
                SELECT catID, catName
                FROM categories`, (err, categoryResults) => {

                if (err) {
                    console.error('Error fetching categories:', err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // Prepare response data
                const categories = categoryResults.map(cat => ({
                    catID: cat.catID,
                    catName: cat.catName
                }));

                // Final response
                const responseData = {
                    ...product,                    // product fields
                    mainImg: images[0],            // main image
                    secondaryImgs: images.slice(1),// secondary images
                    categories: categories         // categories list
                };

                return res.json(responseData);
            });
        });
    });
});

// Update product
app.put('/management/:SKU/update', (req, res) => {
    const SKU = req.params.SKU;
    const { pName, price, desc, pType, stock } = req.body;

    const sql = `
        UPDATE products
        SET pName = ?, price = ?, \`desc\` = ?, pType = ?, stock = ?
        WHERE SKU = ?
    `;
    const params = [pName, price, desc, pType, stock, SKU];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Database error during update:', err);
            return res.status(500).json({ error: 'Database error during update' });
        }

        res.json({ success: true, message: 'Product updated successfully' });
    });
});

// Delete product
app.delete('/management/:SKU/delete', (req, res) => {
    const SKU = req.params.SKU;

    db.query(`DELETE FROM products WHERE SKU = ?`, [SKU], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error during delete' });
        }

        res.json({ success: true, message: 'Product deleted successfully' });
    });
});
   
app.get('/categories', (req, res) => {
    // Query to fetch all categories
    const query = 'SELECT catID, catName FROM categories';  // Assuming your table is named 'categories'
    
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }

        // Send the categories as JSON response
        return res.json(results);
    });
});


// 404 handler for invalid routes
app.use((req, res) => {
    console.log(`Request at ${req.url}`);
    res.status(404).send('Invalid Page');
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});