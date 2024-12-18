const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();

// Path to the CSV file
const FLASHCARDS_FILE = 'flashcards.csv';

app.use(express.json());

// Helper function to read flashcards from the CSV file
function readFlashcards(callback) {
    const flashcards = [];
    fs.createReadStream(FLASHCARDS_FILE)
        .pipe(csv())
        .on('data', (row) => {
            flashcards.push(row);
        })
        .on('end', () => {
            callback(flashcards);
        });
}

// Helper function to write flashcards to the CSV file
function writeFlashcards(flashcards, callback) {
    const header = 'question,answer\n';
    const rows = flashcards.map(card => `${card.question},${card.answer}`).join('\n');
    fs.writeFile(FLASHCARDS_FILE, header + rows, 'utf8', callback);
}

// DELETE endpoint to remove a flashcard by question
app.delete('/flashcards', (req, res) => {
    const questionToDelete = req.body.question.trim().toLowerCase();

    readFlashcards((flashcards) => {
        const index = flashcards.findIndex(card => card.question.trim().toLowerCase() === questionToDelete);

        if (index !== -1) {
            flashcards.splice(index, 1); // Remove the flashcard

            writeFlashcards(flashcards, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error saving updated flashcards' });
                }
                res.status(200).json({ message: `Flashcard with question "${req.body.question}" deleted successfully` });
            });
        } else {
            res.status(404).json({ message: `Flashcard with question "${req.body.question}" not found` });
        }
    });
});

// Example route to view all flashcards
app.get('/flashcards', (req, res) => {
    readFlashcards((flashcards) => {
        res.status(200).json(flashcards);
    });
});

// Set the port and start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

