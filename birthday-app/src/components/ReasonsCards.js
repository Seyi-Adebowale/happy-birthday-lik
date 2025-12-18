import React, { useState } from "react";
import "./ReasonsCards.css";

const ReasonsCards = ({ onComplete }) => {
  const reasons = [
    "You make me smile every day 😊",
    "Your kindness inspires me ❤️",
    "You’re my rock in tough times 💪",
    "I love your laugh 😄",
    "You make life magical ✨",
  ];

  const [flipped, setFlipped] = useState([]);
  const [allFlipped, setAllFlipped] = useState(false); // track if all cards are flipped

  const handleClick = (i) => {
    if (flipped.includes(i)) return;

    const newFlipped = [...flipped, i];
    setFlipped(newFlipped);

    if (newFlipped.length === reasons.length) {
      setAllFlipped(true); // all cards flipped, show button
    }
  };

  const handleOpenLetter = () => {
    onComplete(); // now proceed to the letter
  };

  return (
    <div className="reasons-wrapper">
      <h2>Flip the cards… and uncover why you’re a true treasure! ✨</h2>
      <div className="reasons-cards">
        {reasons.map((reason, i) => (
          <div
            key={i}
            className={`reason-card ${flipped.includes(i) ? "flipped" : ""}`}
            onClick={() => handleClick(i)}
          >
            <div className="card-front">
              <span className="emoji">💌</span>
            </div>

            <div className="card-back">{reason}</div>
          </div>
        ))}
      </div>

      {allFlipped && (
        <button className="open-letter-btn" onClick={handleOpenLetter}>
          Open Letter ✨
        </button>
      )}
    </div>
  );
};

export default ReasonsCards;
