
// LITTLE THINGS CLUB ♡

// LITTLE THINGS CLUB ♡

const savedGame = JSON.parse(
    localStorage.getItem("littleThingsSave") || "null"
);

let game = {
    coins: 50,
    flowers: [],
    decorations: 0,
    roomItems: [],
    happiness: 70,
    ...savedGame
};

game.roomItems ||= [];
game.flowers ||= [];
game.happiness ??= 70;

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
    if (pageName === "games") {
    renderArcade();
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

    document.getElementById("happiness").textContent =
        game.happiness;

    let mood = "Happy";
    let emoji = "🐈";

    if (game.happiness >= 85) {
        mood = "Overjoyed";
        emoji = "😻";
    } else if (game.happiness >= 50) {
        mood = "Happy";
        emoji = "🐈";
    } else if (game.happiness >= 25) {
        mood = "Sleepy";
        emoji = "😿";
    } else {
        mood = "Lonely";
        emoji = "🥺";
    }

    document.getElementById("petMood").textContent = mood;
    document.getElementById("petCharacter").textContent = emoji;
}

// MOCHI THE LITTLE COMPANION ♡

function petCompanion() {
    game.happiness = Math.min(100, game.happiness + 10);

    const messages = [
        "purrrr... I love you ♡",
        "hehe, that tickles!",
        "you're my favourite human!",
        "more cuddles please!",
        "mrrp!  happy!"
    ];

    const bubble = document.getElementById("petBubble");

    bubble.textContent =
        messages[Math.floor(Math.random() * messages.length)];

    const pet = document.getElementById("petCharacter");

    pet.classList.remove("excited");
    void pet.offsetWidth;
    pet.classList.add("excited");

    saveGame();
    showToast("Mochi is feeling loved! ♡");
}

function feedCompanion() {
    if (game.coins < 5) {
        showToast("Mochi needs more treats! Collect some coins ♡");
        return;
    }

    if (game.happiness >= 100) {
        showToast("Mochi is already super happy! 😻");
        return;
    }

    game.coins -= 5;
    game.happiness = Math.min(100, game.happiness + 20);

    document.getElementById("petBubble").textContent =
        "YUM YUM! thank you for the treat 🍓";

    saveGame();
    showToast("Mochi loved the little treat! 🍓");
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




// ROOM DECORATING ♡

const decorations = [
    { emoji: "🧸", name: "Teddy bear" },
    { emoji: "🌷", name: "Flower vase" },
    { emoji: "🕯️", name: "Cozy candle" },
    { emoji: "⭐", name: "Little star" },
    { emoji: "🎀", name: "Pretty ribbon" },
    { emoji: "🐈", name: "Sleepy kitty" },
    { emoji: "📚", name: "Lovely books" }
];

function renderRoomDecorations() {
    const scene = document.getElementById("roomScene");

    scene.querySelectorAll(".room-decoration").forEach(item => {
        item.remove();
    });

    game.roomItems.forEach(item => {
        const decoration = document.createElement("div");

        decoration.className = "room-decoration";
        decoration.textContent = item.emoji;
        decoration.title = item.name;

        decoration.style.left = item.x + "%";
        decoration.style.top = item.y + "%";

        scene.appendChild(decoration);
    });
}

function decorateRoom() {
    const item = decorations[
        game.decorations % decorations.length
    ];

    const x = 12 + Math.random() * 76;
    const y = 12 + Math.random() * 53;

    game.roomItems.push({
        emoji: item.emoji,
        name: item.name,
        x: x,
        y: y
    });

    game.decorations++;

    renderRoomDecorations();
    saveGame();

    document.getElementById("roomMessage").textContent =
        `You added a ${item.name} to your cozy room! ♡`;

    showToast(`${item.emoji} A new room decoration!`);
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
// START LITTLE THINGS CLUB ♡

updateUI();
renderCollection();
renderRoomDecorations();
// =====================================
// LITTLE GAMES ARCADE ♡
// =====================================

// Save arcade rewards inside the existing game save
game.arcade ||= {};
game.arcade.spinDate ||= "";
game.arcade.quizDate ||= "";
game.arcade.memoryDate ||= "";

function arcadeToday() {
    return new Date().toLocaleDateString("en-CA");
}

// MEMORY MATCH

let memoryDeck = [];
let memoryFirstCard = null;
let memoryLock = false;
let memoryMoves = 0;
let memoryMatched = 0;

const memorySymbols = ["🌷", "🐈", "🍓", "🌙"];

function startMemoryGame() {
    memoryDeck = [...memorySymbols, ...memorySymbols]
        .sort(() => Math.random() - 0.5);

    memoryFirstCard = null;
    memoryLock = false;
    memoryMoves = 0;
    memoryMatched = 0;

    document.getElementById("memoryMoves").textContent = "0";
    document.getElementById("memoryPairs").textContent = "0";
    document.getElementById("memoryMessage").textContent =
        "Find all the matching pairs ♡";

    const grid = document.getElementById("memoryGrid");
    grid.innerHTML = "";

    memoryDeck.forEach((symbol, index) => {
        const card = document.createElement("button");

        card.className = "memory-card";
        card.textContent = "?";
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.setAttribute("aria-label", "Hidden memory card");

        card.addEventListener("click", () => flipMemoryCard(card));

        grid.appendChild(card);
    });
}

function flipMemoryCard(card) {
    if (
        memoryLock ||
        card.classList.contains("flipped") ||
        card.classList.contains("matched")
    ) {
        return;
    }

    card.textContent = card.dataset.symbol;
    card.classList.add("flipped");

    if (!memoryFirstCard) {
        memoryFirstCard = card;
        return;
    }

    memoryMoves++;
    document.getElementById("memoryMoves").textContent = memoryMoves;

    if (memoryFirstCard.dataset.symbol === card.dataset.symbol) {
        memoryFirstCard.classList.add("matched");
        card.classList.add("matched");

        memoryFirstCard = null;
        memoryMatched++;

        document.getElementById("memoryPairs").textContent = memoryMatched;

        if (memoryMatched === 4) {
            finishMemoryGame();
        }

    } else {
        memoryLock = true;

        const firstCard = memoryFirstCard;
        memoryFirstCard = null;

        setTimeout(() => {
            firstCard.textContent = "?";
            card.textContent = "?";

            firstCard.classList.remove("flipped");
            card.classList.remove("flipped");

            memoryLock = false;
        }, 750);
    }
}

function finishMemoryGame() {
    const message = document.getElementById("memoryMessage");

    if (game.arcade.memoryDate === arcadeToday()) {
        message.textContent = "You did it! Your reward was already collected today ♡";
        return;
    }

    game.coins += 20;
    game.arcade.memoryDate = arcadeToday();

    saveGame();

    message.textContent = "You found them all! +20 little coins ✿";
    showToast("Memory Match completed! +20 ✿");
}


// LUCKY SPIN

function spinLuckyWheel() {
    const today = arcadeToday();

    if (game.arcade.spinDate === today) {
        showToast("You've already used today's spin ♡");
        return;
    }

    const button = document.getElementById("spinButton");
    const wheel = document.getElementById("spinWheel");
    const message = document.getElementById("spinMessage");

    button.disabled = true;
    button.textContent = "Spinning...";

    const rewards = [5, 10, 15, 20, 30];
    const reward = rewards[Math.floor(Math.random() * rewards.length)];

    const rotation = 1800 + Math.floor(Math.random() * 360);
    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        game.coins += reward;
        game.arcade.spinDate = today;

        saveGame();

        message.textContent = `The wheel chose ${reward} coins for you! ✨`;
        button.textContent = "Come back tomorrow ♡";

        showToast(`You won ${reward} little coins!`);
    }, 2600);
}


// DAILY LITTLE QUIZ

const arcadeQuestions = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "How many sides does a hexagon have?",
        options: ["Five", "Six", "Seven", "Eight"],
        answer: "Six"
    },
    {
        question: "Which animal is known for its black and white stripes?",
        options: ["Tiger", "Panda", "Zebra", "Leopard"],
        answer: "Zebra"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: "Pacific"
    },
    {
        question: "Which flower usually follows the sun?",
        options: ["Rose", "Sunflower", "Tulip", "Daisy"],
        answer: "Sunflower"
    },
    {
        question: "What is the capital city of Japan?",
        options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        answer: "Tokyo"
    },
    {
        question: "Which gas do plants absorb from the air?",
        options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"],
        answer: "Carbon dioxide"
    }
];

function renderDailyQuiz() {
    const dayNumber = Math.floor(
        (new Date(arcadeToday()).getTime() - new Date(new Date().getFullYear(), 0, 0).getTime())
        / 86400000
    );

    const question = arcadeQuestions[
        dayNumber % arcadeQuestions.length
    ];

    document.getElementById("quizQuestion").textContent =
        question.question;

    const optionsBox = document.getElementById("quizOptions");
    const message = document.getElementById("quizMessage");

    optionsBox.innerHTML = "";

    if (game.arcade.quizDate === arcadeToday()) {
        message.textContent = "You've completed today's quiz. Come back tomorrow ♡";
        return;
    }

    message.textContent = "Choose your answer ♡";

    question.options.forEach(option => {
        const button = document.createElement("button");

        button.className = "quiz-option";
        button.textContent = option;

        button.addEventListener("click", () => {
            checkDailyAnswer(button, option, question.answer);
        });

        optionsBox.appendChild(button);
    });
}

function checkDailyAnswer(selectedButton, selectedAnswer, correctAnswer) {
    if (game.arcade.quizDate === arcadeToday()) return;

    const allOptions = document.querySelectorAll(".quiz-option");

    allOptions.forEach(button => {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selectedAnswer === correctAnswer) {
        game.coins += 10;
        document.getElementById("quizMessage").textContent =
            "That's right! You earned 10 coins ✿";

        showToast("Correct answer! +10 ✿");
    } else {
        selectedButton.classList.add("wrong");

        document.getElementById("quizMessage").textContent =
            `Not quite! The answer was ${correctAnswer}. ♡`;
    }

    // One attempt per day, whether correct or incorrect
    game.arcade.quizDate = arcadeToday();

    saveGame();
}


// INITIALIZE ARCADE

function renderArcade() {
    renderDailyQuiz();

    const today = arcadeToday();

    const spinButton = document.getElementById("spinButton");

    if (game.arcade.spinDate === today) {
        spinButton.disabled = true;
        spinButton.textContent = "Come back tomorrow ♡";
        document.getElementById("spinMessage").textContent =
            "Your daily spin has been used ♡";
    } else {
        spinButton.disabled = false;
        spinButton.textContent = "Spin the wheel ♡";
    }

    if (game.arcade.memoryDate === today) {
        document.getElementById("memoryMessage").textContent =
            "Today's memory reward has already been collected ♡";
    }
}

renderArcade();