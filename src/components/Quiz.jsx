
import React, { useState } from "react";

const questions = [
  {
    question: "Which language is used to structure webpages?",
    options: ["CSS", "HTML", "JavaScript", "Python"],
    answer: "HTML",
  },
  {
    question: "Which CSS property changes text color?",
    options: ["background", "font-size", "color", "border"],
    answer: "color",
  },
  {
    question: "Which method converts JSON into a JavaScript object?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.object()",
    ],
    answer: "JSON.parse()",
  },
  {
    question: "Which React hook is used to manage state?",
    options: ["useEffect", "useRef", "useMemo", "useState"],
    answer: "useState",
  },
  {
    question: "Which method is commonly used to render lists in React?",
    options: ["filter()", "map()", "reduce()", "find()"],
    answer: "map()",
  },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = questions[currentQuestion];

  const handleNext = () => {
    if (!selectedAnswer) return;

    const updatedScore =
      selectedAnswer === question.answer ? score + 1 : score;

    setScore(updatedScore);

    if (currentQuestion === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      <h1>React Quiz App</h1>

      {!showResult ? (
        <>
          <div className="progress">
            Question {currentQuestion + 1} of {questions.length}
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>

          <h2>{question.question}</h2>

          <div className="options">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option ${
                  selectedAnswer === option ? "selected" : ""
                }`}
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            className="next-btn"
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
            {currentQuestion === questions.length - 1
              ? "Submit Quiz"
              : "Next Question"}
          </button>
        </>
      ) : (
        <div className="result">
          <h2>Quiz Completed! 🎉</h2>
          <h1>{score} / {questions.length}</h1>
          <p>You scored {(score / questions.length) * 100}%</p>

          <h3>
            {score >= 4
              ? "Excellent Work!"
              : score >= 3
              ? "Good Job!"
              : "Keep Practicing!"}
          </h3>

          <button className="next-btn" onClick={restartQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
