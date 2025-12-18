import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import "./Letter.css";

const Letter = ({ onBack, showConfetti }) => {
  const paragraphs = [
    "Dear Birthday Girl,",
    "I just want to say how amazing you are. Every day, your smile brightens the world around you, and your kindness touches everyone you meet. You have a heart full of love and a spirit that inspires those lucky enough to know you.",
    "May your year ahead be filled with dreams coming true, happiness overflowing, and endless love surrounding you. Always remember how special and treasured you are!",
    "With Love, Your Baby 💖",
  ];

  const [showEnvelope, setShowEnvelope] = useState(true);
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEnvelope(false);
      setShowLetter(true);
    }, 2000); // envelope delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="letter-container">
      {/* Back button fixed */}
      {showLetter && (
        <div className="letter-header">
          <i className="fa-solid fa-circle-left app-back-btn" onClick={onBack}></i>
        </div>
      )}

      {/* Envelope */}
      {showEnvelope && (
        <div className="envelope">
          <img src="/envelope.gif" alt="Envelope" className="envelope-img" />
        </div>
      )}

      {/* Letter Scroll */}
      {showLetter && (
        <div className="letter-scroll">
          {showConfetti && <div className="confetti-placeholder" />}
          <div className="letter-text">
            <Typewriter
              options={{
                autoStart: true,
                loop: false,
                delay: 40,
              }}
              onInit={(typewriter) => {
                paragraphs.forEach((p, idx) => {
                  typewriter.typeString(p);
                  if (idx !== paragraphs.length - 1) {
                    typewriter.typeString("<br><br>");
                  }
                });
                typewriter.start();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Letter;
