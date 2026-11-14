
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
if (pageName === "trivia") {
    // Trivia page will be initialized here.
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
        "mrrp! happy happy!"
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
// =====================================
// QUIZ PARTY 🎉
// =====================================

game.arcade ||= {};
game.arcade.partyDate ||= "";
game.arcade.soundOn ??= true;

const partyQuestions = {
    general: [
        { q: "Which is the largest continent?", o: ["Africa", "Asia", "Europe", "Australia"], a: "Asia" },
        { q: "How many days are in a leap year?", o: ["364", "365", "366", "367"], a: "366" },
        { q: "Which language is primarily spoken in Brazil?", o: ["Spanish", "Portuguese", "French", "Italian"], a: "Portuguese" },
        { q: "What is the currency of Japan?", o: ["Won", "Yuan", "Yen", "Baht"], a: "Yen" },
        { q: "Which is the smallest prime number?", o: ["0", "1", "2", "3"], a: "2" }
    ],

    animals: [
        { q: "What is a baby cat called?", o: ["Puppy", "Kitten", "Cub", "Calf"], a: "Kitten" },
        { q: "Which animal is famous for changing its colour?", o: ["Chameleon", "Rabbit", "Elephant", "Horse"], a: "Chameleon" },
        { q: "What do pandas mostly eat?", o: ["Bamboo", "Fish", "Grasshoppers", "Berries"], a: "Bamboo" },
        { q: "Which mammal can truly fly?", o: ["Flying squirrel", "Bat", "Sugar glider", "Lemur"], a: "Bat" },
        { q: "What is a group of lions called?", o: ["Pack", "Herd", "Pride", "Flock"], a: "Pride" }
    ],

    food: [
        { q: "Which fruit is known for having its seeds on the outside?", o: ["Apple", "Strawberry", "Mango", "Peach"], a: "Strawberry" },
        { q: "Which country is sushi traditionally associated with?", o: ["China", "Japan", "Thailand", "India"], a: "Japan" },
        { q: "What is the main ingredient in guacamole?", o: ["Avocado", "Cucumber", "Spinach", "Peas"], a: "Avocado" },
        { q: "Which spice gives turmeric its yellow colour?", o: ["Paprika", "Turmeric", "Cinnamon", "Clove"], a: "Turmeric" },
        { q: "What is tofu mainly made from?", o: ["Rice", "Soybeans", "Potatoes", "Corn"], a: "Soybeans" }
    ],

    space: [
        { q: "Which planet has the most prominent ring system?", o: ["Mars", "Saturn", "Venus", "Mercury"], a: "Saturn" },
        { q: "What is at the centre of our solar system?", o: ["Earth", "The Moon", "The Sun", "Jupiter"], a: "The Sun" },
        { q: "Which planet is closest to the Sun?", o: ["Venus", "Earth", "Mercury", "Mars"], a: "Mercury" },
        { q: "What is Earth's natural satellite?", o: ["The Sun", "The Moon", "Mars", "Venus"], a: "The Moon" },
        { q: "What do astronauts wear in space to stay safe?", o: ["Raincoat", "Spacesuit", "Lab coat", "Wetsuit"], a: "Spacesuit" }
    ]
};

let partyRound = [];
let partyIndex = 0;
let partyPoints = 0;
let partyAnswered = false;
let partyPractice = false;


// SOUND EFFECTS ♡

let gameAudioContext = null;

function playGameSound(type = "pop") {
    if (!game.arcade.soundOn) return;

    try {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) return;

        gameAudioContext ||= new AudioContextClass();

        if (gameAudioContext.state === "suspended") {
            gameAudioContext.resume();
        }

        const sounds = {
            pop: [440, 0.08],
            correct: [660, 0.16],
            win: [880, 0.3],
            wrong: [220, 0.15],
            sparkle: [1040, 0.12]
        };

        const [frequency, duration] = sounds[type] || sounds.pop;

        const oscillator = gameAudioContext.createOscillator();
        const gain = gameAudioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(
            frequency,
            gameAudioContext.currentTime
        );

        gain.gain.setValueAtTime(
            0.0001,
            gameAudioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.12,
            gameAudioContext.currentTime + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            gameAudioContext.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(gameAudioContext.destination);

        oscillator.start();
        oscillator.stop(gameAudioContext.currentTime + duration);

    } catch (error) {
        console.log("Game sound unavailable:", error);
    }
}

function toggleGameSound() {
    game.arcade.soundOn = !game.arcade.soundOn;

    const button = document.getElementById("soundToggle");

    button.textContent = game.arcade.soundOn
        ? "🔊 Sounds on"
        : "🔇 Sounds off";

    saveGame();

    if (game.arcade.soundOn) {
        playGameSound("sparkle");
    }
}


// START A QUIZ ROUND

function startQuizParty() {
    const category = document.getElementById("partyCategory").value;

    partyRound = [...partyQuestions[category]]
        .sort(() => Math.random() - 0.5);

    partyIndex = 0;
    partyPoints = 0;
    partyAnswered = false;

    partyPractice = game.arcade.partyDate === arcadeToday();

    document.getElementById("partyStart").style.display = "none";
    document.getElementById("partyResult").style.display = "none";
    document.getElementById("partyGame").style.display = "block";

    document.getElementById("partyScore").textContent = "0";

    renderPartyQuestion();

    playGameSound("pop");
}


// SHOW A QUESTION

function renderPartyQuestion() {
    const current = partyRound[partyIndex];

    partyAnswered = false;

    document.getElementById("partyQuestionNumber").textContent =
        `QUESTION ${partyIndex + 1}/5`;

    document.getElementById("partyProgressBar").style.width =
        `${(partyIndex / 5) * 100}%`;

    document.getElementById("partyQuestion").textContent = current.q;

    document.getElementById("partyFeedback").textContent =
        "Choose your answer ♡";

    const optionsBox = document.getElementById("partyOptions");
    optionsBox.innerHTML = "";

    current.o.forEach(option => {
        const button = document.createElement("button");

        button.className = "quiz-option party-option";
        button.textContent = option;

        button.addEventListener("click", () => {
            answerPartyQuestion(button, option);
        });

        optionsBox.appendChild(button);
    });
}


// CHECK AN ANSWER

function answerPartyQuestion(button, answer) {
    if (partyAnswered) return;

    partyAnswered = true;

    const current = partyRound[partyIndex];
    const buttons = document.querySelectorAll(".party-option");

    buttons.forEach(option => {
        option.disabled = true;

        if (option.textContent === current.a) {
            option.classList.add("correct");
        }
    });

    if (answer === current.a) {
        partyPoints++;
        button.classList.add("correct");

        document.getElementById("partyFeedback").textContent =
            "Yayyy! You got it right! ✨";

        playGameSound("correct");

    } else {
        button.classList.add("wrong");

        document.getElementById("partyFeedback").textContent =
            `Almost! The answer was ${current.a} ♡`;

        playGameSound("wrong");
    }

    document.getElementById("partyScore").textContent = partyPoints;

    setTimeout(() => {
        partyIndex++;

        if (partyIndex < partyRound.length) {
            renderPartyQuestion();
        } else {
            finishQuizParty();
        }
    }, 1100);
}


// FINAL SCORE

function finishQuizParty() {
    document.getElementById("partyGame").style.display = "none";
    document.getElementById("partyResult").style.display = "block";

    document.getElementById("partyProgressBar").style.width = "100%";

    const emoji = partyPoints === 5
        ? "🏆"
        : partyPoints >= 3
            ? "🌷"
            : "🧸";

    const title = partyPoints === 5
        ? "PERFECT SCORE!"
        : partyPoints >= 3
            ? "You did amazing!"
            : "Good try, little star!";

    document.getElementById("partyResultEmoji").textContent = emoji;
    document.getElementById("partyResultTitle").textContent = title;

    if (!partyPractice) {
        const reward = partyPoints * 2;

        game.coins += reward;
        game.arcade.partyDate = arcadeToday();

        saveGame();

        document.getElementById("partyResultText").textContent =
            `You got ${partyPoints}/5 and earned ${reward} little coins! ♡`;

        showToast(`Quiz Party complete! +${reward} coins ✿`);

    } else {
        document.getElementById("partyResultText").textContent =
            `You got ${partyPoints}/5! Today's reward was already collected, but you can still practise ♡`;
    }

    playGameSound("win");
}


// PLAY AGAIN

function resetQuizParty() {
    document.getElementById("partyResult").style.display = "none";
    document.getElementById("partyStart").style.display = "block";

    playGameSound("pop");
}


// INITIAL SOUND BUTTON STATE

document.getElementById("soundToggle").textContent =
    game.arcade.soundOn ? "🔊 Sounds on" : "🔇 Sounds off";

// 🐾 MOCHI POP GAME

let mochiPopScore = 0;
let mochiPopTime = 20;
let mochiPopActive = false;
let mochiCurrentHole = -1;
let mochiPopTimer = null;
let mochiPopInterval = null;

function startMochiPop() {
    if (mochiPopActive) return;

    mochiPopScore = 0;
    mochiPopTime = 20;
    mochiPopActive = true;

    document.getElementById("mochiScore").textContent = 0;
    document.getElementById("mochiTime").textContent = 20;
    document.getElementById("mochiPopMessage").textContent =
        "Catch him! Catch him! 🐾";

    document.getElementById("mochiStartButton").textContent =
        "Playing...";

    showMochiPop();

    mochiPopInterval = setInterval(() => {
        mochiPopTime--;

        document.getElementById("mochiTime").textContent =
            mochiPopTime;

        if (mochiPopTime <= 0) {
            finishMochiPop();
        }
    }, 1000);
}

function showMochiPop() {
    const holes = document.querySelectorAll(".pop-hole");

    holes.forEach(hole => {
        hole.classList.remove("active", "caught");
        hole.textContent = "♡";
        hole.onclick = null;
    });

    const randomIndex = Math.floor(Math.random() * holes.length);
    mochiCurrentHole = randomIndex;

    const target = holes[randomIndex];

    target.textContent = "🐱";
    target.classList.add("active");

    target.onclick = () => {
        if (!mochiPopActive || mochiCurrentHole !== randomIndex) return;

        mochiPopScore++;
        document.getElementById("mochiScore").textContent =
            mochiPopScore;

        target.textContent = "💗";
        target.classList.add("caught");

        mochiCurrentHole = -1;

        if (typeof playGameSound === "function") {
            playGameSound("match");
        }

        clearTimeout(mochiPopTimer);
        mochiPopTimer = setTimeout(showMochiPop, 250);
    };

    clearTimeout(mochiPopTimer);
    mochiPopTimer = setTimeout(() => {
        if (mochiPopActive && mochiCurrentHole === randomIndex) {
            showMochiPop();
        }
    }, 850);
}

function finishMochiPop() {
    mochiPopActive = false;

    clearInterval(mochiPopInterval);
    clearTimeout(mochiPopTimer);

    document.querySelectorAll(".pop-hole").forEach(hole => {
        hole.classList.remove("active", "caught");
        hole.textContent = "♡";
        hole.onclick = null;
    });

    mochiCurrentHole = -1;

    let rewardMessage = "";

    if (game.arcade.mochiPopRewardDate !== arcadeToday()) {
        const reward = Math.min(mochiPopScore, 15);

        game.coins += reward;
        game.arcade.mochiPopRewardDate = arcadeToday();

        rewardMessage = ` You earned ${reward} coins! 🪙`;

        saveGame();
    } else {
        rewardMessage = " Daily coins already collected!";
    }

    document.getElementById("mochiPopMessage").textContent =
        `Time's up! You caught Mochi ${mochiPopScore} times!${rewardMessage}`;

    document.getElementById("mochiStartButton").textContent =
        "Play again ♡";

    if (typeof playGameSound === "function") {
        playGameSound("win");
    }
}
