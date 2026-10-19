
// Get HTML elements
const dice = document.getElementById("dice");
const result = document.getElementById("result");
const rollButton = document.getElementById("rollButton");

// Dice positions in a 3x3 grid
const patterns = {
    1: [5],
    2: [1, 9],
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9]
};

// Create the nine possible dot positions
const dots = [];

for (let i = 1; i <= 9; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.classList.add("hidden");
    dot.style.gridArea = `${Math.ceil(i / 3)} / ${((i - 1) % 3) + 1}`;
    dice.appendChild(dot);
    dots.push(dot);
}

// Display the selected dice number
function showDice(number) {
    dots.forEach((dot, index) => {
        const position = index + 1;

        if (patterns[number].includes(position)) {
            dot.classList.remove("hidden");
        } else {
            dot.classList.add("hidden");
        }
    });

    dice.setAttribute("aria-label", `Dice showing ${number}`);
}

// Roll the dice
function rollDice() {
    const number = Math.floor(Math.random() * 6) + 1;

    rollButton.disabled = true;
    dice.classList.remove("rolling");

    // Restart the animation
    void dice.offsetWidth;
    dice.classList.add("rolling");

    result.textContent = "Rolling...";

    // Show the result after the animation
    setTimeout(() => {
        showDice(number);
        result.textContent = `You rolled a ${number}!`;
        dice.classList.remove("rolling");
        rollButton.disabled = false;
    }, 500);
}

// Listen for button clicks
rollButton.addEventListener("click", rollDice);

// Show one dot when the page first loads
showDice(1);