import React, { useState, useRef } from 'react';
import styles from './Quiz.module.css';

const QuizApp = () => {
  const questions = [
    {
      question: 'How many tests did Sourav Ganguly play in his career before retirement?',
      options: ['113', '311', '131', '313'],
      answer: '113'
    },
   
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const radioGroupRef = useRef(null);

  const handleAnswerOptionClick = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartClick = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    radioGroupRef.current.reset();
  };

  return (
    <div className={styles.container}>
      {showScore ? (
        <div>
          <p className={styles.score}>You scored {score} out of {questions.length}.</p>
          <button className={styles['restart-button']} onClick={handleRestartClick}>Restart Quiz</button>
        </div>
      ) : (
        <div>
          <h2 className={styles.question}>{questions[currentQuestion].question}</h2>
          <form ref={radioGroupRef} onSubmit={handleSubmit}>
            <ul className={styles.options}>
              {questions[currentQuestion].options.map((option) => (
                <li className={styles.option} key={option}>
                  <label>
                    <input type="radio" name="option" value={option} onClick={handleAnswerOptionClick} />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
            <button className={styles.button} type="submit">Next</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
