import React, { useState } from "react";
import "./TreasureGame.css";

const TreasureGame = ({ onTreasureFound, setConfetti }) => {
  const cards = Array(9).fill(null);
  const [treasureIndex] = useState(() => Math.floor(Math.random() * 9));

  const [flippedCards, setFlippedCards] = useState([]);
  const [found, setFound] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleCardClick = (i) => {
    if (flippedCards.includes(i) || found) return;

    setFlippedCards([...flippedCards, i]);
    setAttempts(attempts + 1);

    if (i === treasureIndex) {
      setFound(true);

      // Fun success messages based on attempts
      let msg = "";
      if (attempts === 0)
        msg = "🎉 Wow! You uncovered the ultimate treasure on your first try! 🌟";
      else if (attempts <= 3)
        msg = `💖 Treasure found! Only ${attempts + 1} tries! 😎`;
      else if (attempts <= 6)
        msg = `✨ Finally! It took ${attempts + 1} tries, but the treasure is yours! 😉`;
      else
        msg = `😂 Took ${attempts + 1} tries, but the real treasure was worth it! 💕`;

      setMessage(msg);

      const flipDuration = 1500; // card flip duration in ms
      const modalDelay = 2500;   // confetti duration before modal

      // Step 1: Wait for flip animation
      setTimeout(() => {
        // Step 2: Start confetti + sparkle
        setConfetti(true);

        // Step 3: Wait before showing modal
        setTimeout(() => {
          setShowSuccessModal(true);
        }, modalDelay);
      }, flipDuration);
    }
  };

const handleProceed = () => {
  setShowSuccessModal(false); // hide modal
  onTreasureFound();          // triggers App.js to show ReasonsCards
  setConfetti(false);         // stop confetti
};





  return (
    <div className="treasure-game">
      <h2>
        {!found
          ? "Just a moment… can you uncover the hidden treasure? 🎁"
          : "🏆 Treasure Found!"}
      </h2>

      <div className="cards-grid">
        {cards.map((_, i) => (
          <div
            key={i}
            className={`card ${flippedCards.includes(i) ? "flipped" : ""} ${
              found && i === treasureIndex ? "treasure sparkle" : ""
            }`}
            style={{
              transition: i === treasureIndex ? "transform 1.5s" : "transform 0.6s",
            }}
            onClick={() => handleCardClick(i)}
          >
            {flippedCards.includes(i) &&
              (i === treasureIndex ? (
                <img
                  src="https://clipartmax.com/png/middle/170-1708409_headshot-placeholder-silhouette-gender-neutral.png"
                  alt="Treasure"
                  className="treasure-photo"
                />
              ) : (
                "❌"
              ))}
          </div>
        ))}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="treasure-modal">
          <div className="treasure-modal-content">
            <h3>🎉 You Found the Treasure! 🎉</h3>
            <p>{message}</p>
            <button className="proceed-btn" onClick={handleProceed}>
              There’s more… ✨
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreasureGame;
