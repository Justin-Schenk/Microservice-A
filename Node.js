const express = require('express');
const app = express();

// Sample data: a list of flashcards (in a real application, you'd use a database)
let flashcards = [
  { id: 1, question: "What is 2 + 2?", answer: "4" },
  { id: 2, question: "What is the capital of France?", answer: "Paris" },
  { id: 3, question: "What is the largest planet?", answer: "Jupiter" }
];

// Middleware to parse JSON bodies for POST/DELETE requests
app.use(express.json());

// DELETE endpoint to remove a flashcard by ID
app.delete('/flashcards/:id', (req, res) => {
  const id = parseInt(req.params.id); // Get ID from URL
  const index = flashcards.findIndex(card => card.id === id);

  if (index !== -1) {
    flashcards.splice(index, 1); // Remove the item from the array
    res.status(200).json({ message: `Flashcard with ID ${id} deleted successfully` });
  } else {
    res.status(404).json({ message: `Flashcard with ID ${id} not found` });
  }
});

// Example route to view all flashcards
app.get('/flashcards', (req, res) => {
  res.status(200).json(flashcards);
});

// Set the port and start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
