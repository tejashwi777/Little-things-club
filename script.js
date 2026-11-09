
// LITTLE THINGS CLUB ♡

// Load saved game
let game = JSON.parse(localStorage.getItem("littleThingsSave")) || {
    coins: 50,
    flowers: [],
    decorations: 0
};

function saveGame() {
    localStorage.setItem("littleThingsSave", JSON.stringify(game));
    updateUI();
}

// Navigation
function showPage(pageName) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.querySelectorAll(".nav-btn").forEach(button => {
        button.classList.remove("active");
    });

    document.getElementById(pageName).classList.add("active");

    const selected = document.querySelector(
        `.nav-btn[data-page="${pageName}"]`
    );

    if (selected) selected.classList.add("active");

    document.getElementById("currentPage").textContent = pageName;

    if (pageName === "collection") {
        renderCollection();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Sidebar navigation
document.querySelectorAll(".nav-btn").forEach(button => {
    button.addEventListener("click", () => {
        showPage(button.dataset.page);
    });
});

// Toast notification
function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// Update wallet and stats
function updateUI() {
    document.getElementById("coins").textContent = game.coins;

    document.getElementById("flowerCount").textContent =
        game.flowers.length;

    document.getElementById("collectionCoins").textContent =
        game.coins;

    document.getElementById("collectionFlowerCount").textContent =
        game.flowers.length;

    document.getElementById("collectionUniqueCount").textContent =
        new Set(game.flowers.map(flower => flower.name)).size;
}

// Collect flowers
function collectFlower(name, emoji, price) {

    if (game.coins < price) {
        showToast("Oh no! You need more little coins ♡");
        return;
    }

    game.coins -= price;

    game.flowers.push({
        name: name,
        emoji: emoji,
        id: Date.now() + Math.random()
    });

    saveGame();

    showToast(`${emoji} You collected a ${name}! ♡`);

    renderCollection();
}

// Display collection
function renderCollection() {
    const grid = document.getElementById("collectionGrid");

    if (game.flowers.length === 0) {
        grid.innerHTML = `
            <p class="empty-state">
                Your collection is waiting for its first little treasure 🌷
            </p>
        `;
        return;
    }

    grid.innerHTML = game.flowers.map(flower => `
        <div class="collected-flower">
            <span>${flower.emoji}</span>
            <p>${flower.name}</p>
            <small>a little treasure ♡</small>
        </div>
    `).join("");
}

// Decorate the room
const decorations = [
    { emoji: "🧸", name: "a little teddy bear" },
    { emoji: "🌷", name: "a vase of flowers" },
    { emoji: "🕯️", name: "a cozy candle" },
    { emoji: "⭐", name: "a little star" },
    { emoji: "🎀", name: "a pretty ribbon" },
    { emoji: "🐈", name: "a sleepy kitty" },
    { emoji: "📚", name: "some lovely books" }
];

function decorateRoom() {
    const scene = document.getElementById("roomScene");
    const message = document.getElementById("roomMessage");

    const item = decorations[
        game.decorations % decorations.length
    ];

    const newDecoration = document.createElement("div");

    newDecoration.textContent = item.emoji;
    newDecoration.style.position = "absolute";
    newDecoration.style.left = `${15 + Math.random() * 70}%`;
    newDecoration.style.top = `${12 + Math.random() * 55}%`;
    newDecoration.style.fontSize = "32px";
    newDecoration.style.zIndex = "4";
    newDecoration.title = item.name;

    scene.appendChild(newDecoration);

    game.decorations++;
    saveGame();

    message.textContent = `You added ${item.name} to your room! ♡`;
}

// Surprise letters
const letters = [
    "You don't have to have everything figured out. You're allowed to be a work in progress. Keep going, little one. ♡",

    "I hope you remember that you are worthy of all the soft, beautiful and wonderful things life has to offer.",

    "Somewhere, someone is having a better day because you exist. Never underestimate your little presence.",

    "Take a deep breath. You have survived every difficult day so far. Give yourself a little credit.",

    "Your life doesn't need to look like anyone else's. Make it yours. Fill it with things that make your heart happy.",

    "A gentle reminder: you are not falling behind. You are simply living your own little story."
];

let usedLetters = [];

function openLetter() {
    const letter = document.getElementById("letter");
    const text = document.getElementById("letterText");

    if (usedLetters.length === letters.length) {
        usedLetters = [];
    }

    let available = letters
        .map((value, index) => index)
        .filter(index => !usedLetters.includes(index));

    const randomIndex =
        available[Math.floor(Math.random() * available.length)];

    usedLetters.push(randomIndex);

    text.textContent = letters[randomIndex];

    letter.classList.add("open");

    showToast("A little love, just for you 💌");
}

// Start game
updateUI();
renderCollection();
