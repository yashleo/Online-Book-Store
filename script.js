document.addEventListener('DOMContentLoaded', () => {
    const initialBookImages = [
        'https://edit.org/img/blog/m68-book-cover-templates.webp',
        'https://edit.org/img/blog/d3s-design-book-covers.webp',
        'https://edit.org/img/blog/t9i-edit-book-covers-online.webp',
        'https://edit.org/img/blog/vnl-1024-ebook-cover-maker-online-free-template.webp',
        'https://edit.org/img/blog/xk5-1024-free-ebook-cover-templates-download-online.webp',
        'https://edit.org/editor/json/2021/05/21/0/e/0ea214e6b2be2b9d2808b3ac71522f3a.webp',
        'https://edit.org/editor/json/2021/05/25/a/9/a91aaaf332a56db5fe2888bf17d7fc05.webp',
        'https://edit.org/editor/json/2021/05/31/3/a/3a6f9de234cf50f92c938787d69c0e35.webp',
        'https://edit.org/editor/json/2021/05/12/8/c/8cdbb8b22d5c018f613fe01de827b1ff.webp',
        'https://edit.org/editor/json/2021/05/21/0/4/04140c8d66757fb0a3eda0b005fd445c.webp',
    ];

    let bookImages = [...initialBookImages];

    const books = [];
    const booksContainer = document.getElementById('books-container');
    const cartContainer = document.getElementById('cart-container');
    const buyForm = document.getElementById('buy-form');
    const buyAllButton = document.getElementById('buy-all');
    const cart = [];

    function generateRandomId() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    function getRandomBookImage() {
        if (bookImages.length === 0) {
            bookImages = [...initialBookImages];
        }
        const randomIndex = Math.floor(Math.random() * bookImages.length);
        return bookImages.splice(randomIndex, 1)[0];
    }

    function generateBooks(count) {
        for (let i = 0; i < count; i++) {
            const newBook = {
                id: generateRandomId(),
                title: `Book ${books.length + 1}`,
                author: `Author ${books.length + 1}`,
                image: getRandomBookImage(),
                description: `This is book ${books.length + 1}.`
            };
            books.push(newBook);
        }
    }

    function displayBooks() {
        booksContainer.innerHTML = '';
        books.slice(0, 5).forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>ID: ${book.id}</p>
                <button onclick="addToCart(${book.id})">Add to Cart</button>
            `;
            booksContainer.appendChild(bookItem);
        });
    }

    window.addToCart = function (bookId) {
        if (cart.length >= 3) {
            alert('You can only add up to 3 books to the cart.');
            return;
        }

        const book = books.find(book => book.id === bookId);
        if (book && !cart.includes(book)) {
            cart.push(book);
            displayCart();
        } else {
            alert('Book not found or already in cart!');
        }
    };

    function displayCart() {
        cartContainer.innerHTML = '';
        cart.forEach(book => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>ID: ${book.id}</p>
                <button class="remove-button" onclick="removeFromCart(${book.id})">Remove from Cart</button>
            `;
            cartContainer.appendChild(cartItem);
        });
    }

    window.removeFromCart = function (bookId) {
        const bookIndex = cart.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
            cart.splice(bookIndex, 1);
            displayCart();
        }
    };

    buyAllButton.addEventListener('click', () => {
        cart.forEach(book => {
            const bookIndex = books.findIndex(b => b.id === book.id);
            if (bookIndex !== -1) {
                books.splice(bookIndex, 1);
            }
        });
        cart.length = 0; // Clear the cart
        alert('You have bought all the books in the cart!');
        displayBooks();
        displayCart();
    });

    function replaceBook(oldBookId) {
        const oldBookIndex = books.findIndex(book => book.id === oldBookId);
        const newBook = {
            id: generateRandomId(),
            title: `Book ${books.length + 1}`,
            author: `Author ${books.length + 1}`,
            image: getRandomBookImage(),
            description: `This is book ${books.length + 1}.`
        };

        if (oldBookIndex !== -1) {
            books.splice(oldBookIndex, 1, newBook);
        }
    }

    buyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const bookId = parseInt(document.getElementById('book-id').value, 10);
        const bookIndex = books.findIndex(book => book.id === bookId);

        if (bookIndex >= 0) {
            alert(`You have bought "${books[bookIndex].title}"`);
            replaceBook(bookId);
            displayBooks();
        } else {
            alert('Book ID not found!');
        }

        document.getElementById('book-id').value = '';
    });

    // Set background image for #home section
    const homeSection = document.getElementById('home');
