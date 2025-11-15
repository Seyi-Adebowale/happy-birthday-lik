import React, { useRef, useEffect } from "react";

const Letter = ({ onClose }) => {
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.classList.add("open");
  }, []);

  return (
    <div id="scroll-container" className="closed" ref={containerRef}>
      <div className="scroll-top-bar"></div>
      <div className="scroll-body">
        <div className="letter-content">
          <h3>Happy Birthday, X!</h3>
          <p>Wishing you endless smiles, laughter, and love...</p>
          <p>Every moment with you has been magical...</p>
          <p>On your birthday, may all your dreams come true.</p>
          <p>With all my love,</p>
          <p><strong>— Your Baby 💖</strong></p>
          <button className="close-scroll-btn" onClick={onClose}>
            ✨ Make a Wish
          </button>
        </div>
      </div>
      <div className="scroll-bottom-bar"></div>
    </div>
  );
};

export default Letter;
