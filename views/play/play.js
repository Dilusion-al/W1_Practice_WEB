// DOMS ELEMENTS  ---------------------------------------------------------
const dom_quiz = document.querySelector("#quiz");
const dom_question = document.querySelector("#question");
const dom_choiceA = document.querySelector("#A");
const dom_choiceB = document.querySelector("#B");
const dom_choiceC = document.querySelector("#C");
const dom_choiceD = document.querySelector("#D");
const dom_score = document.querySelector("#scoreContainer");
const dom_start = document.querySelector("#start");

dom_start.addEventListener("click", onStart);

// DATA  ---------------------------------------------------------
let questions = [
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
let runningQuestionIndex = 0;
let score = 0;

// FUNCTIONS ---------------------------------------------------------

// Hide a given element
function hide(element) {
  // TODO
  element.style.display = "none";
}

function show(element) {
  // TODO
  element.style.display = "block";
}

function onStart() {
  // Render the current question
  // Display the quiz view,
  // Hide the start view
  hide(dom_start);
  show(dom_quiz);
  renderQuestion();

}

function renderQuestion() {
  // Render the current question on the quiz view
  dom_question.textContent = questions[runningQuestionIndex].title;
  dom_choiceA.textContent = questions[runningQuestionIndex].choiceA;
  dom_choiceB.textContent = questions[runningQuestionIndex].choiceB;
  dom_choiceC.textContent = questions[runningQuestionIndex].choiceC;
  dom_choiceD.textContent = questions[runningQuestionIndex].choiceD;


}

function onPlayerSubmit(answer) {
  // Update the score, display the next question or the score view
  if (answer === questions[runningQuestionIndex].correct) {
    score++;
  }

  runningQuestionIndex++;

  if (runningQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    hide(dom_quiz);
    show(dom_score);
    renderScore();
  }
}

function renderScore() {
  // calculate the amount of question percent answered by the user
  // choose the image based on the scorePerCent
  const scorePercent = Math.round((100 * score) / questions.length);
  if (scorePercent < 20) {
    dom_score.innerHTML = '<img src="/img/20.png" />' + "<p>Score: " + scorePercent + "%</p>";
  } else if (scorePercent >=20 && scorePercent <= 40) {
    dom_score.innerHTML = '<img src="/img/40.png" />' + "<p>Score: " + scorePercent + "%</p>";
  } else if (scorePercent >=40 && scorePercent <= 60) {
    dom_score.innerHTML = '<img src="/img/60.png" />' + "<p>Score: " + scorePercent + "%</p>";
  } else if (scorePercent >=60 && scorePercent < 80) {
    dom_score.innerHTML = '<img src="/img/80.png" />' + "<p>Score: " + scorePercent + "%</p>";
  }
  else {
    dom_score.innerHTML = '<img src="/img/100.png" />' + "<p>Score:" + scorePercent + "%</p>";
  }

}



// FUNCTIONS ---------------------------------------------------------
show(dom_start);
hide(dom_quiz);
hide(dom_score);
