// Disclosure: I used ChatGPT to assist with the content of this assignment.

import messages from '../lang/messages/en/user.js';

document.addEventListener('DOMContentLoaded', () => {
    // Set the label text using the message from user.js
    document.getElementById('labelText').textContent = messages.howManyButtons;

    // Add event listener for the button
    document.getElementById('createButtonsBtn').addEventListener('click', () => {
        game.createButtons();
    });
});

// Utility Class to handle color generation
class ColorGenerator {
    static getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

// Button Class to create and handle individual button elements
class MemoryButton {
    constructor(color, width, height, order) {
        this.order = order;
        this.color = color;
        this.width = width;
        this.height = height;
        this.buttonElement = this.createButtonElement();
    }

    createButtonElement() {
        const button = document.createElement('button');
        button.className = 'generated-button';
        button.dataset.order = this.order;
        button.style.backgroundColor = this.color;
        button.style.width = this.width;
        button.style.height = this.height;
        button.textContent = this.order; // Initially, show the order number
        document.getElementById('buttonContainer').appendChild(button);
        return button;
    }

    setPositionAbsolute() {
        this.buttonElement.style.position = 'absolute';
    }

    setLocation(top, left) {
        this.buttonElement.style.top = top + 'px';
        this.buttonElement.style.left = left + 'px';
    }

    revealOrder() {
        this.buttonElement.textContent = this.order;
    }

    hideOrder() {
        this.buttonElement.textContent = '';
    }

    attachClickHandler(handler) {
        this.buttonElement.onclick = () => handler(this.order);
    }

    getWidth() {
        return parseInt(this.buttonElement.offsetWidth);
    }

    getHeight() {
        return parseInt(this.buttonElement.offsetHeight);
    }
}

// Memory Game Class to handle the game logic
class MemoryGame {
    constructor() {
        this.correctOrder = [];
        this.userOrder = [];
        this.currentIndex = 0;
        this.buttons = [];
        this.scrambleTimeoutId = null; // Store the timeout ID
    }

    createButtons() {
        // Clear any existing timeout to reset the game state
        if (this.scrambleTimeoutId) {
            clearTimeout(this.scrambleTimeoutId);
            this.scrambleTimeoutId = null; // Reset the timeout ID
        }


        const count = parseInt(document.getElementById('buttonCount').value);
        if (count < 3 || count > 7) {
            alert(messages.numberRangeError); // Displaying message from user.js
            return;
        }

        document.getElementById('buttonContainer').innerHTML = ''; // Clear existing buttons
        document.getElementById('message').textContent = ''; // Clear any messages

        this.correctOrder = [];
        this.userOrder = [];
        this.currentIndex = 0;
        this.buttons = [];

        for (let i = 1; i <= count; i++) {
            const color = ColorGenerator.getRandomColor();
            const button = new MemoryButton(color, '10em', '5em', i);
            this.buttons.push(button);
            this.correctOrder.push(i);
        }

        // After buttons are displayed, switch their position to absolute for movements
        // setTimeout(() => this.setPositionAbsoluteAndScramble(count), count * 1000);
        this.scrambleTimeoutId = setTimeout(() => this.setPositionAbsoluteAndScramble(count), count * 1000);

    }

    setPositionAbsoluteAndScramble(count) {
        this.buttons.forEach(button => {
            button.setPositionAbsolute(); // Set position to absolute
            const top = Math.floor(Math.random() * (window.innerHeight - button.getHeight()));
            const left = Math.floor(Math.random() * (window.innerWidth - button.getWidth()));
            button.setLocation(top, left); // Position them initially
        });
        this.scrambleButtons(count);
    }

    scrambleButtons(count) {
        this.scrambleTimes(count, 0, count);
    }

    scrambleTimes(times, currentTime, totalTimes) {
        if (currentTime >= totalTimes) {
            // After all scrambles are done, hide the numbers
            this.buttons.forEach(button => button.hideOrder());
            this.makeButtonsClickable(); // Then make the buttons clickable
            return;
        }

        this.buttons.forEach(button => {
            // Get current window size minus button dimensions
            const maxTop = window.innerHeight - button.getHeight();
            const maxLeft = window.innerWidth - button.getWidth();

            const top = Math.floor(Math.random() * maxTop);
            const left = Math.floor(Math.random() * maxLeft);
            button.setLocation(top, left);
        });

        // setTimeout(() => this.scrambleTimes(times, currentTime + 1, totalTimes), 2000);
        // Keep track of scramble timeouts and ensure they can be cleared
        this.scrambleTimeoutId = setTimeout(() => this.scrambleTimes(times, currentTime + 1, totalTimes), 2000);
    }

    makeButtonsClickable() {
        this.buttons.forEach(button => {
            button.attachClickHandler(this.checkOrder.bind(this));
        });
    }

    checkOrder(order) {
        if (order === this.correctOrder[this.currentIndex]) {
            this.buttons[order - 1].revealOrder();
            this.currentIndex++;
            if (this.currentIndex === this.correctOrder.length) {
                document.getElementById('message').textContent = messages.excellentMemory; // Displaying message from user.js
            }
        } else {
            document.getElementById('message').textContent = messages.wrongOrder; // Displaying message from user.js
            this.revealCorrectOrder();
        }
    }

    revealCorrectOrder() {
        this.buttons.forEach(button => button.revealOrder());
    }
}

// Initialize the game instance
const game = new MemoryGame();
