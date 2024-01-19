import React, { useState, useEffect } from "react";

export default function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [displayQuestion, setDisplayQuestion] = useState(true);
  const [addCard, SetAddCard] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [cards, setCards] = useState(function () {
    const storedFlashcards = localStorage.getItem("flashcard");

    return storedFlashcards ? JSON.parse(storedFlashcards) : [];
  });

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
    setQuestion("");
    setAnswer("");
  }
  function handleNewCards(e) {
    SetAddCard(!addCard);
    displayForm();
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
  function handleDelete() {
    setCards((card) =>
      card.filter((index) => index.id !== cards[currentCardIndex].id)
    );
  }
  useEffect(() => {
    localStorage.setItem("flashcard", JSON.stringify(cards));
  }, [cards]);
  function displayForm() {
    return (
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
    );
  }

  function handleDisplay() {
    if (cards.length === 0 && addCard) {
      return (
        <div className="flashcard">
          <p>No flashcards available. Add new cards!</p>
          <button onClick={handleNewCards}>new</button>
        </div>
      );
    }

    const currentSlide = cards[currentCardIndex];
    return (
      <div className="flashcard">
        <div className="slider">
          <div className="slide__text">
            <span>
              {addCard
                ? displayQuestion
                  ? currentSlide.question
                  : currentSlide.answer
                : ""}
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
          <button onClick={handleDelete}>delete</button>
        </div>
        {displayForm()}
        <div className={`overlay ${addCard ? "hidden" : ""}`}></div>
      </div>
    );
  }

  return handleDisplay();
}
