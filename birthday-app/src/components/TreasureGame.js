import React, { useState, useRef, useEffect } from "react";
import "./TreasureGame.css";

const TreasureGame = ({ onTreasureFound, setConfetti }) => {
  const cards = Array(9).fill(null);
  const [treasureIndex] = useState(() => Math.floor(Math.random() * 9));

  const [flippedCards, setFlippedCards] = useState([]);
  const [found, setFound] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, setMessage] = useState("");

  // Web Audio API refs
  const audioContextRef = useRef(null);
  const flipBufferRef = useRef(null);
  const treasureBufferRef = useRef(null);

  useEffect(() => {
    audioContextRef.current =
      new (window.AudioContext || window.webkitAudioContext)();

    const loadSound = async (url, bufferRef) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      bufferRef.current = await audioContextRef.current.decodeAudioData(
        arrayBuffer
      );
    };

    loadSound("/card-flip.mp3", flipBufferRef);
    loadSound("/treasure.mp3", treasureBufferRef);
  }, []);

  const playSound = (bufferRef) => {
    if (!bufferRef.current) return;
    const source = audioContextRef.current.createBufferSource();
    source.buffer = bufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.start(0);
  };

  const handleCardClick = (i) => {
    if (flippedCards.includes(i) || found) return;

    playSound(flipBufferRef);

    const newFlipped = [...flippedCards, i];
    setFlippedCards(newFlipped);
    setAttempts(prev => prev + 1);

    if (i === treasureIndex) {
      setFound(true);
      playSound(treasureBufferRef);

      // Celebrant-focused messages based on attempts
      let msg = "";
      if (attempts === 0)
        msg = "🎉 Wow! The ultimate treasure has been uncovered on the very first try… here you are—the priceless treasure of the day! 💖✨";
      else if (attempts <= 3)
        msg = `💎 After ${attempts + 1} tries, the sparkling treasure is revealed… it’s you—the priceless treasure of the day! 🌟`;
      else if (attempts <= 6)
        msg = `✨ It took ${attempts + 1} tries, but finally… here you are—the priceless treasure of the day! 😍💖`;
      else if (attempts <= 8)
        msg = `😎 ${attempts + 1} tries later… behold the priceless treasure of the day! 💕💎`;
      else
        msg = `😅 ${attempts + 1} tries, yet every single one was worth it… because the priceless treasure of the day has been found—you! 💖✨`;

      setMessage(msg);
      setConfetti(true);

      setTimeout(() => setShowSuccessModal(true), 3000);
    }
  };

  const handleProceed = () => {
    setShowSuccessModal(false);
    setConfetti(false);
    onTreasureFound();
  };

  return (
    <div className="treasure-game">
      <h2>
        {!found
          ? "Just a moment… can you uncover the hidden treasure? 🎁"
          : "🏆 The Priceless Treasure of the Day!"}
      </h2>

      <div className="cards-grid">
        {cards.map((_, i) => {
          const isFlipped = flippedCards.includes(i);
          const isTreasure = i === treasureIndex;

          return (
            <div
              key={i}
              className={`card ${isFlipped ? "flipped" : ""} ${
                found && isTreasure ? "treasure sparkle" : ""
              }`}
              onClick={() => handleCardClick(i)}
            >
              <div className="card-inner">
                <div className="card-front">❓</div>
                <div className="card-back">
                  {isTreasure ? (
                    <img
                      src="https://clipartmax.com/png/middle/170-1708409_headshot-placeholder-silhouette-gender-neutral.png"
                      alt="Treasure"
                      className="treasure-photo"
                    />
                  ) : (
                    "❌"
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showSuccessModal && (
        <div className="treasure-modal">
          <div className="treasure-modal-content">
            <h3>You’ve Uncovered the Greatest Treasure!</h3>
            <p>{message}</p>
            <button className="proceed-btn beating" onClick={handleProceed}>
              There's more ... ✨
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreasureGame;
