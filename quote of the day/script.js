const slides = document.querySelectorAll(".quote-bubble");
let currentIndex = 0;

const prevBtn = document.getElementById("prev-quote");
const nextBtn = document.getElementById("next-quote");
const favoriteBtn = document.getElementById("favorite-quote");
const shareBtn = document.getElementById("share-quote");
const favoritesList = document.getElementById("favorites-list");

// Show next quote
function showNextQuote() {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
}

// Show previous quote
function showPrevQuote() {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    slides[currentIndex].classList.add("active");
}

// Auto-slide every 4 seconds
setInterval(showNextQuote, 4000);

// Save favorite quote
function saveFavorite() {
    const currentQuote = slides[currentIndex].querySelector(".quote-text").textContent;
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(currentQuote)) {
        favorites.push(currentQuote);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        displayFavorites();
    }
}

// Display favorites
function displayFavorites() {
    favoritesList.innerHTML = "";
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.forEach((quote) => {
        const li = document.createElement("li");
        li.textContent = quote;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.classList.add("remove-fav");
        removeBtn.onclick = () => removeFavorite(quote);
        
        li.appendChild(removeBtn);
        favoritesList.appendChild(li);
    });
}

// Remove favorite
function removeFavorite(quote) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter((q) => q !== quote);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites();
}

// Event Listeners
prevBtn.addEventListener("click", showPrevQuote);
nextBtn.addEventListener("click", showNextQuote);
favoriteBtn.addEventListener("click", saveFavorite);

// Initial Load
slides[currentIndex].classList.add("active");
displayFavorites();
