function fetchProducts() {
    const url = window.location.href;
    const sku = url.split('/').pop();

    fetch(`http://localhost:3030/shop/${sku}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error fetching product: ${res.statusText}`);
            }
            return res.json();
        })
        .then((data) => {
            if (!data) {
                console.error('Product not found');
                return;
            }
            console.log(data);
            updatePage(data);
        })
        .catch((err) => {
            console.error('Error:', err.message);
        });
}

function updatePage(data) {
    // Update main product image
    const mainImage = document.querySelector('#main-product-image');
    if (mainImage) {
        const imagePath = data.mainImg || "";  
        mainImage.src = formatImagePath(imagePath);
    }

    // Update thumbnails
    const thumbnailRow = document.querySelector('.thumbnail-row');
    if (thumbnailRow) {
        thumbnailRow.innerHTML = '';

        const images = [data.mainImg, ...data.secondaryImgs].filter((value, index, self) => self.indexOf(value) === index);

        if (images.length > 1) {
            thumbnailRow.style.display = 'flex';

            images.forEach((img, index) => {
                const thumbnailDiv = document.createElement('div');
                thumbnailDiv.classList.add('thumbnail');
                if (index === 0) {
                    thumbnailDiv.classList.add('selected');
                }
                thumbnailDiv.style.backgroundImage = `url(${formatImagePath(img)})`;

                thumbnailRow.appendChild(thumbnailDiv);

                thumbnailDiv.addEventListener('click', () => {
                    mainImage.src = thumbnailDiv.style.backgroundImage.slice(5, -2);
                    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('selected'));
                    thumbnailDiv.classList.add('selected');
                });
            });
        } else {
            thumbnailRow.style.display = 'none';
        }
    }

    // Update product name
    const productName = document.querySelector('#product-name');
    if (productName) {
        productName.textContent = data.pName;
    }

    // Update product price
    const productPrice = document.querySelector('#product-price');
    if (productPrice) {
        productPrice.textContent = `${data.price} $`;
    }

    // Calculate average rating from reviews
    const averageRating = calculateAverageRating(data.reviews);

    // Update rating and stock
    const productRating = document.querySelector('#product-rating');
    const productStock = document.querySelector('#product-stock');

    if (productRating) {
        productRating.textContent = averageRating ? `${averageRating.toFixed(1)}/5 rating` : 'No rating yet';
    }

    if (productStock) {
        productStock.textContent = `${data.stock} left`;
    }

    // Update product description
    const productDescription = document.querySelector('#product-description');
    if (productDescription) {
        productDescription.innerHTML = `<strong>Product description</strong> - ${data.desc || 'No description available.'}`;
    }

    // Update product type
    const productType = document.querySelector('#product-type');
    if (productType) {
        productType.textContent = data.pType;
    }

    // Set quantity input to 1
    const quantityBox = document.querySelector('.quantity-box');
    if (quantityBox) {
        quantityBox.value = 1;
    }

    // Update reviews
    const reviewSection = document.querySelector('.review-section');
    if (reviewSection) {
        reviewSection.innerHTML = `
            <h2>Reviews <span style="font-weight: normal;"> Total: ${data.reviews.length} reviews</span></h2>
            ${data.reviews.length > 0 ? data.reviews.map(review => `
                <div class="review">
                    <div class="review-user">👤 ${review.reviewer || 'Anonymous'} ${generateStars(review.rating)}</div>
                    <div>${review.comment || 'No comment.'}</div>
                    <div class="review-date">Date: ${getCurrentDate()}</div> 
                </div>
            `).join('') : '<p>No reviews yet.</p>'}
        `;
    }
}

// Helpers
function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return null;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
}

function generateStars(rating) {
    if (!rating) return '';
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < Math.floor(rating) ? '★' : '☆';
    }
    return `<span style="color: gold;">${stars}</span>`;
}

function formatImagePath(path) {
    if (!path) return '/assets/default.png'; // fallback image
    return path.startsWith('assets') ? `/${path}` : `/assets/${path}`;
}

function getCurrentDate() {
    const today = new Date();
    return today.toLocaleDateString('en-GB'); // dd/mm/yyyy format
}

window.onload = fetchProducts;
