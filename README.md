# Web Dev Project: Figuro.Co Website (Section2_Group4)

This repository is for a **Figuro.Co Website** project of **ITCS223: Introduction to Web Development** by **Apes Together Strong** group (section 2 group 4).

<br>

## 🔍 Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

<br>

## 📖 About

This project, Figuro.Co Website, is a custom art toy e-commerce website that allows customers to browse premade products, submit customization requests, and track their personalized orders. 

<br>

## ✨ Features

- **Premade Product Shopping:** Browse a catalog of available art toys, add items to a shopping cart, and complete purchases.
- **Customization Request System:** Customer can request custom designs by filling out detailed forms and uploading reference images.
- **Staff Tools:** Authorized staff can manage products.
- **Search Functionality:** A search tool allows users and staff to quickly locate specific products by query.

<br>

## ⚙️ Installation

❗Please use **COMMAND PROMPT** and **NOT POWERSHELL**❗

```
# Required module that need to be installed
npm install
do
    cookie-parser
    cors
    dotenv
    express
    multer"
    mysql2
    nodemon
    concurrently

# Also make changes in the 'script' section to:
  "scripts": {
    "start": "concurrently "npm run front" "npm run back"",
    "front": "nodemon client.js",
    "back": "nodemon server.js"
  }
```

<br>

## 🚀 Usage

```
# Must move every files into the same folder, and then change directory.
cd [directory]

# Run the server.
npm start
```

<br>

## 🗂️ Project Structure

```Structure
672-projectphase2-sec2_group04-main/
├── sec2_gr4_fe_src/          # All front-end source files, encompassing HTML, CSS, and supplementary files (e.g., images)
│   └── html/                 # HTML and CSS files
│       ├── assets/           # Images files
│       │   ├── products/     # Product image files
│       │   │   └── ...
│       │   └── ...
│       └── ...
├── sec2_gr4_ws_src/          # All web service source files
│   ├── script/               # Javascript files
│   │   └── ...
│   ├── server.js             # Web service server
│   ├── client.js             # Front-end server (client server)
│   ├── package-lock.json
│   ├── package.json
│   └── .env
├── sec2_gr4_database.sql     # Database (MySQL)
└── README.md
```

Although, this is how the structure should be before the usage:
```
672-projectphase2-sec2_group04-main/
├── html/
│   ├── assets/
│   │   ├── products/
│   │   │   └── ...
│   │   └── ...
│   └── ...
├── server.js
├── client.js
├── package-lock.json
├── package.json
├── .env
├── ...
├── sec2_gr4_database.sql
└── README.md
```
Make sure every file is in the same directory, except the assets and products folders. 

<br>

## 🧪 Examples

### Result page

{pic}


<br>

## 🤝 Contributing

Apes Together Strong (section 2)
- 6688001 Pattareeya Achaiyaphoom
- 6688013 Korawit Chantavilaiying
- 6688021 Apinut Cotivongsa
- 6688032 Nipada Jadjaidee
- 6688157 Woraphol Meakapat

<br>

## 📄 License

This project is for academic purposes only (Mahidol University).

