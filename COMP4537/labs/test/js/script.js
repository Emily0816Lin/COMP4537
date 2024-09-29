// Disclosure: I used ChatGPT to assist with the content of this assignment.


import messages from '../lang/messages/en/user.js';  // Import the messages

const storageKey = 'notes';  // Define the key used for localStorage, allowing the app to persist data between sessions.

// Class for handling Notes
class Note {
    constructor(content = "") {
        this.content = content;
    }
}

// Class to manage the Writer functionality
class Writer {
    constructor() {
        document.querySelector('h1').innerText = messages.writerPageTitle;
        document.querySelector('.top-right-time').innerHTML = `${messages.lastSaved} <span id="lastSaved">--:--:--</span>`;
        document.querySelector('a').innerText = messages.backToHome;

        this.notes = this.loadNotes(); // Load notes from localStorage
        this.notesContainer = document.getElementById("notesContainer");
        this.lastSaved = document.getElementById("lastSaved");

        const addNoteButton = document.getElementById('addNote');
        addNoteButton.innerText = messages.addNote;
        addNoteButton.addEventListener('click', () => this.addNote());

        this.displayNotes(); //Display all existing notes
        setInterval(() => this.saveNotes(), 2000); //Auto-save notes every 2 seconds
    }

    loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem(storageKey)) || [];  // Retrieve notes from localStorage, and then parses the retrieved json string into a javascript array of objects
        return savedNotes.map(noteData => new Note(noteData.content));  // Each object(note) is then mapped to a new Note object
    }

    addNote() {
        const newNote = new Note();
        this.notes.push(newNote);
        this.displayNotes();
    }

    displayNotes() {
        this.notesContainer.innerHTML = ""; // clears the container
        this.notes.forEach((note, index) => {
            const noteElement = document.createElement("div");
            const textArea = document.createElement("textarea");
            textArea.value = note.content;
            textArea.placeholder = messages.notePlaceholder;
            textArea.oninput = (e) => this.updateNoteContent(index, e.target.value);

            const removeButton = document.createElement("button");
            removeButton.innerText = messages.removeNote;
            removeButton.onclick = () => this.removeNote(index);

            noteElement.appendChild(textArea);
            noteElement.appendChild(removeButton);
            this.notesContainer.appendChild(noteElement);
        });
    }

    updateNoteContent(index, content) {
        this.notes[index].content = content;
    }

    removeNote(index) {
        this.notes.splice(index, 1);    //splice() method removes the note at the specified index from the this.notes array
        this.displayNotes(); //refresh the display
    }

    saveNotes() {
        localStorage.setItem(storageKey, JSON.stringify(this.notes)); //serialize the this.notes array into a JSON string and store it in localStorage
        this.lastSaved.innerText = new Date().toLocaleTimeString();
    }
}

// Class to manage the Reader functionality
class Reader {
    constructor() {
        document.querySelector('h1').innerText = messages.readerPageTitle;
        document.querySelector('.top-right-time').innerHTML = `${messages.lastUpdated} <span id="lastUpdated">--:--:--</span>`;
        document.querySelector('a').innerText = messages.backToHome;

        this.notesDisplay = document.getElementById("notesDisplay");
        this.lastUpdated = document.getElementById("lastUpdated");

        this.loadNotes();   // Load notes from localStorage and display them
        setInterval(() => this.loadNotes(), 2000);  // Reload notes every 2 seconds
    }

    loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem(storageKey)) || [];
        this.notesDisplay.innerHTML = "";
        savedNotes.forEach(noteData => {
            const noteElement = document.createElement("div");
            const textArea = document.createElement("textarea");
            textArea.value = noteData.content;
            textArea.readOnly = true;

            noteElement.appendChild(textArea);
            this.notesDisplay.appendChild(noteElement);
        });
        this.lastUpdated.innerText = new Date().toLocaleTimeString();
    }
}

// Class to handle navigation in index.html
class Navigation {
    constructor() {
        document.getElementById('labTitle').innerText = messages.labTitle;
        document.getElementById('studentName').innerText = messages.studentName;

        const goToWriterButton = document.getElementById('goToWriter');
        goToWriterButton.innerText = messages.goToWriter;
        goToWriterButton.onclick = () => window.location.href = 'writer.html';

        const goToReaderButton = document.getElementById('goToReader');
        goToReaderButton.innerText = messages.goToReader;
        goToReaderButton.onclick = () => window.location.href = 'reader.html';
    }
}

// Initialize the appropriate class based on the current page
window.onload = () => {

    if (window.location.pathname.includes("writer.html")) {
        new Writer();
    } else if (window.location.pathname.includes("reader.html")) {
        new Reader();
    } else {
        new Navigation();
    }
};
