// ✅ descriptive variable names and different data types
let destination = "Bali"; // string
let travelBudget = 1500; // integer

// ✅ mathematical operation
let dailyBudget = travelBudget / 7; 

// ✅ if-else statement
if (dailyBudget > 200) {
    console.log("You're living luxuriously!");
} else {
    console.log("Time to find budget-friendly deals!");
}

// ✅ logical operator
let isSunny = true;
let hasTickets = false;

if (isSunny && hasTickets) {
    console.log("Perfect day to explore " + destination);
} else {
    console.log("Might need to reschedule the trip.");
}

// ✅ dom manipulation (output to browser)
document.addEventListener("DOMContentLoaded", function() {
    // Ensure everything is loaded before manipulating the DOM
    let section = document.getElementById("coolSection");
    if (section) {
        let newParagraph = document.createElement("p");
        newParagraph.textContent = `Your daily budget for ${destination} is $${dailyBudget.toFixed(2)}.`;
        section.appendChild(newParagraph);
    }
});


// ✅ console log output
console.log("landons my biggest SUPPORTER <3");
