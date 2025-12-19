import React, { useState, useRef, useEffect } from "react";
import "./ReasonsCards.css";

const ReasonsCards = ({ onComplete }) => {
  const reasons = [
    "You make me smile every day 😊",
    "Your generosity is truly priceless ❤️",
    "You’re my rock in tough times 💪",
    "Your laugh lights up the room 😄",
    "You bring magic to the little moments ✨",
  ];

  const [flipped, setFlipped] = useState([]);
  const [allFlipped, setAllFlipped] = useState(false);

  // Web Audio API refs
  const audioContextRef = useRef(null);
  const flipBufferRef = useRef(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();

    const loadSound = async (url, bufferRef) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      bufferRef.current = await audioContextRef.current.decodeAudioData(
        arrayBuffer
      );
    };

    // Preload sound
    loadSound("/card-flip.mp3", flipBufferRef);
  }, []);

  const playFlip = () => {
    if (!flipBufferRef.current) return;
    const source = audioContextRef.current.createBufferSource();
    source.buffer = flipBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.start(0);
  };

  const handleClick = (i) => {
    if (flipped.includes(i)) return;

    playFlip();

    const newFlipped = [...flipped, i];
    setFlipped(newFlipped);

    if (newFlipped.length === reasons.length) {
      setAllFlipped(true);
    }
  };

  const handleOpenLetter = () => {
    onComplete();
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
            <div className="reason-card-front">
              <span className="emoji">💌</span>
            </div>

            <div className="reason-card-back">{reason}</div>
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
