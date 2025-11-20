import React, { useRef, useEffect } from "react";

const Letter = () => {
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.classList.add("open");
  }, []);

  return (
    <div id="scroll-container" className="closed" ref={containerRef}>
     

      <div className="scroll-top-bar"></div>
      
      <div className="scroll-body">
        <div className="letter-content">
          <h3>Happy Birthday, X! 🎉</h3>

          <p>Today is all about YOU — the wonderful, amazing, and irreplaceable YOU!</p>

          <p>Wishing you endless smiles, laughter, and love. May your heart be filled with joy, your days with sunshine, and your life with beautiful surprises.</p>

          <p>Every moment with you has been magical, and I hope this year brings even more unforgettable memories, adventures, and happiness your way.</p>

          <p>May your dreams take flight, your wishes come true, and may you always feel loved and celebrated — not just today, but every single day.</p>

          <p>Remember, you are extraordinary, and you make the world brighter just by being in it.</p>

          <p>I love you so much</p>

          <p><strong>— Your Baby 💖</strong></p>
        </div>
      </div>

      <div className="scroll-bottom-bar"></div>
    </div>
  );
};

export default Letter;
