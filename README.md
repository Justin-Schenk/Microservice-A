A. REQUESTING DATA

API Endpoints
GET /flashcards
This endpoint returns all flashcards stored.

Instructions:
MUST HAVE EXPRESS INSTALLED
i. Open Postman 
ii. Select GET as the HTTP method
iii. Enter the URL: http://localhost:3000/flashcards
iv. Click the Send button

Expected Response with Sample Data:
[
  {
    "id": 1,
    "question": "What is 2 + 2?",
    "answer": "4"
  },
  {
    "id": 2,
    "question": "What is the capital of France?",
    "answer": "Paris"
  },
  {
    "id": 3,
    "question": "What is the largest planet?",
    "answer": "Jupiter"
  }
]

B. RECIEVING DATA
The DELETE request will remove a flashcard by its id.
/flashcards/:id

Instructions:
MUST HAVE EXPRESS INSTALLED
i. Open Postman
ii. Select DELETE as the HTTP method
iii. Eneter the URL with the ID (ie. ID 1): http://localhost:3000/flashcards/1
iv. Click on the Send Button

Expected Response:
If the flashcard is deleted successfully:
{
  "message": "Flashcard with ID 1 deleted successfully"
}

If the flashcard with specified ID DNE:
{
  "message": "Flashcard with ID 1 not found"
}

C.
![UML](C:\Users\raven\Downloads\microservice\UML-Diagram.png](https://github.com/JadeZelaya/Microservice-A/blob/main/UML-Diagram.png))
