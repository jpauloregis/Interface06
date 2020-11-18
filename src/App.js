import React, { useState } from 'react';
import './App.css';

const App = (props) => {

  const [playerScore, setPlayerScore] = useState(0);
  const [questions, setQuestions] = useState([
    {
      question: "Quem é o melhor boi de Parintins?",
      possibleAnswers: ["Caprichoso", "Garantido"],
      rightAnswer: "Caprichoso",
      playerChoice: null
    },
    {
      question: "Qual a melhor escola de samba?",
      possibleAnswers: ["Beija-Flor", "Outra"],
      rightAnswer: "Beija-Flor",
      playerChoice: null
    },
  ]);

  const answerQuestion = (index, choice) => {
    const answeredQuestion = questions[index];
    answeredQuestion.playerChoice = choice;
    const allQuestions = questions;
    allQuestions[index] = answeredQuestion;
    setQuestions(allQuestions);
    updatePlayerScore();
  }

  const updatePlayerScore = () => {
    const playerScore = questions.filter(q => q.rightAnswer === q.playerChoice).length;
    setPlayerScore(playerScore);
    console.log("New player score:", playerScore);
  }

  const displayResult = (index) => {
    const question = questions[index];
    if (!question.playerChoice) { return; }
    if (question.playerChoice === question.rightAnswer) {
      return (
        <p className="result-correct">
          Resposta certa!
        </p>
      );
    } else {
      return (
        <p className="result-incorrect">
          Resposta errada!
        </p>
      );
    }
  }

  const displayQuestion = (index) => {
    if (playerScore < index) { return; }
    const question = questions[index];
    return (
      <div className="question-display" key={`q-${index}`}>
        <p className="question">
          {question.question}
        </p>
        <br />
        {question.possibleAnswers.map((answer, answerIndex) => (
          <button key={`q-${index}-a-${answerIndex}`} className="question-choice" onClick={() =>
            answerQuestion(index, answer)}> {answer}
          </button>
        ))}
        <br />
        {displayResult(index)}
      </div>
    );
  }

  const renderQuestions = () => questions.map((question, index) => displayQuestion(index));

  return (
    <div className="App">
      <h1>Quiz Show!</h1>
      <hr />
      {renderQuestions()}
    </div>
  );
}

export default App;