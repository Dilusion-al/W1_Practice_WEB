// DOMS ELEMENTS  ---------------------------------------------------------
const dom_addButton = document.querySelector("#addQuestion");
const dom_questionsList = document.querySelector("#questionsList");
const dom_dialog = document.querySelector("#questionDialog");
const dom_dialogTitle = document.querySelector("#dialogTitle");
const dom_questionForm = document.querySelector("#questionForm");
const dom_cancelButton = document.querySelector("#cancelButton");

// Form fields
const dom_questionTitle = document.querySelector("#questionTitle");
const dom_choiceA = document.querySelector("#choiceA");
const dom_choiceB = document.querySelector("#choiceB");
const dom_choiceC = document.querySelector("#choiceC");
const dom_choiceD = document.querySelector("#choiceD");
const dom_correctAnswer = document.querySelector("#correctAnswer");

// DATA  ---------------------------------------------------------
const DEFAULT_QUESTIONS = [
  {
    title: "What does HTML stand for?",
    choiceA: "Hi Thierry More Laught",
    choiceB: "How To move Left",
    choiceC: "Ho Theary Missed the Laundry !",
    choiceD: "Hypertext Markup Language",
    correct: "D",
  },
  {
    title: "What does CSS stand for?",
    choiceA: "Cisco and Super Start",
    choiceB: "Ci So Sa",
    choiceC: "Cascading Style Sheets ",
    choiceD: "I don't know !",
    correct: "C",
  },
  {
    title: "What does JS stand for?",
    choiceA: "Junior stars",
    choiceB: "Justing Star",
    choiceC: "Javascript",
    choiceD: "RonanScript",
    correct: "C",
  },
];

// Load questions from localStorage or use default
let questions = JSON.parse(localStorage.getItem('quizQuestions')) || DEFAULT_QUESTIONS;

let editingIndex = -1; // -1 means adding new, otherwise editing existing

// FUNCTIONS ---------------------------------------------------------

// Display all questions in the list
function renderQuestions() {
  dom_questionsList.innerHTML = '';
  
  questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-item';
    
    questionDiv.innerHTML = `
      <h3>${question.title}</h3>
      <p><strong>A:</strong> ${question.choiceA}</p>
      <p><strong>B:</strong> ${question.choiceB}</p>
      <p><strong>C:</strong> ${question.choiceC}</p>
      <p><strong>D:</strong> ${question.choiceD}</p>
      <p><strong>Correct:</strong> ${question.correct}</p>
      <div class="question-buttons">
        <button onclick="editQuestion(${index})" class="edit-btn">Edit</button>
        <button onclick="deleteQuestion(${index})" class="delete-btn">Delete</button>
      </div>
    `;
    
    dom_questionsList.appendChild(questionDiv);
  });
}

// Open dialog for adding new question
function addQuestion() {
  editingIndex = -1;
  dom_dialogTitle.textContent = 'Add Question';
  dom_questionForm.reset();
  dom_dialog.showModal();
}

// Open dialog for editing existing question
function editQuestion(index) {
  editingIndex = index;
  dom_dialogTitle.textContent = 'Edit Question';
  
  const question = questions[index];
  dom_questionTitle.value = question.title;
  dom_choiceA.value = question.choiceA;
  dom_choiceB.value = question.choiceB;
  dom_choiceC.value = question.choiceC;
  dom_choiceD.value = question.choiceD;
  dom_correctAnswer.value = question.correct;
  
  dom_dialog.showModal();
}

// Delete a question
function deleteQuestion(index) {
  if (confirm('Are you sure you want to delete this question?')) {
    questions.splice(index, 1);
    localStorage.setItem('quizQuestions', JSON.stringify(questions));
    renderQuestions();
  }
}

// Save question (add or edit)
function saveQuestion(event) {
  event.preventDefault();
  
  const questionData = {
    title: dom_questionTitle.value,
    choiceA: dom_choiceA.value,
    choiceB: dom_choiceB.value,
    choiceC: dom_choiceC.value,
    choiceD: dom_choiceD.value,
    correct: dom_correctAnswer.value,
  };
  
  if (editingIndex === -1) {
    // Adding new question
    questions.push(questionData);
  } else {
    // Editing existing question
    questions[editingIndex] = questionData;
  }
  
  // Save to localStorage
  localStorage.setItem('quizQuestions', JSON.stringify(questions));
  
  dom_dialog.close();
  renderQuestions();
}

// Cancel dialog
function cancelDialog() {
  dom_dialog.close();
}

// EVENT LISTENERS ---------------------------------------------------------
dom_addButton.addEventListener("click", addQuestion);
dom_questionForm.addEventListener("submit", saveQuestion);
dom_cancelButton.addEventListener("click", cancelDialog);

// INIT ---------------------------------------------------------
renderQuestions();
