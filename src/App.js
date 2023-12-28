import React, { useState, useEffect } from "react";

// const initialFlash = [
//   {
//     id: 1,
//     question: "which operating system is the best",
//     answer: "only",
//   },
//   {
//     id: 2,
//     question: "  is the best",
//     answer: "ows",
//   },
//   {
//     id: 3,
//     question: "which ohe best",
//     answer: "dows",
//   },
//   {
//     id: 4,
//     question: "is the ",
//     answer: "win",
//   },
// ];
const getStoredFlashcards = () => {
  const storedFlashcards = localStorage.getItem("flashcards");
  return storedFlashcards ? JSON.parse(storedFlashcards) : [];
};

export default function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [displayQuestion, setDisplayQuestion] = useState(true);
  const [cards, setCards] = useState(getStoredFlashcards());
  const [addCard, SetAddCard] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(cards));
  }, [cards]);

  function handleFlip() {
    setDisplayQuestion(!displayQuestion);
  }

  function handlePrev() {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
    setDisplayQuestion(true);
  }

  function handleNext() {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
    setDisplayQuestion(true);
  }

  function handleNewCard(e) {
    e.preventDefault();
    SetAddCard(!addCard);
  }
  function handleSubmit(e) {
    e.preventDefault();

    const newCard = {
      id: cards.length + 1,
      question: question,
      answer: answer,
    };
    setCards([...cards, newCard]);
    setQuestion("");
    setAnswer("");
    SetAddCard(!addCard);
    // handleDisplay();
    // setDisplayQuestion(true);
  }

  function handleDisplay() {
    const currentSlide = cards[currentCardIndex];

    return (
      <div className="flashcard">
        <div className="slider">
          <div className="slide__text">
            <span>
              {displayQuestion ? currentSlide.question : currentSlide.answer}
            </span>
          </div>
        </div>

        <button className="slider__btn slider__btn--left" onClick={handlePrev}>
          &larr;
        </button>
        <button className="slider__btn slider__btn--right" onClick={handleNext}>
          &rarr;
        </button>
        <div className="btn">
          <button onClick={handleFlip}>
            {displayQuestion ? `Answer` : `Question`}
          </button>
          <button onClick={handleNewCard}>new</button>
        </div>
        <form
          className={`modal ${addCard ? "hidden" : ""}`}
          onSubmit={handleSubmit}
        >
          <button class="close-modal" onClick={handleNewCard}>
            &times;
          </button>
          <div>
            <label>Question</label>{" "}
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <br></br>
          <div>
            <label>Answer</label>{" "}
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <input type="submit" value="Add" />
        </form>
        <div className={`overlay ${addCard ? "hidden" : ""}`}></div>
      </div>
    );
  }
  return handleDisplay();
}
