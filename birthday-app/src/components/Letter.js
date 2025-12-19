import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import "./Letter.css";

const ENVELOPE_URL = "/envelope.gif";

const Letter = ({ onBack, onLetterShown }) => {
  const paragraphs = [
    "Dear X,",
    "I just want to say how amazing you are. Every day, your smile brightens the world around you, and your kindness touches everyone you meet. You have a heart full of love and a spirit that inspires those lucky enough to know you.",
    "May your year ahead be filled with dreams coming true, happiness overflowing, and endless love surrounding you. Always remember how special and treasured you are!",
    "With Love,\nYour Baby 💖",
  ];

  const [showEnvelope, setShowEnvelope] = useState(true);
  const [showLetter, setShowLetter] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [envelopeLoaded, setEnvelopeLoaded] = useState(false);

  // Preload envelope image
  useEffect(() => {
    const img = new Image();
    img.src = ENVELOPE_URL;
    img.onload = () => setEnvelopeLoaded(true);
    img.onerror = () => {
      console.error("Envelope failed to load");
      setEnvelopeLoaded(true);
    };
  }, []);

  // Show letter only after envelope is fully loaded
  useEffect(() => {
    if (!envelopeLoaded) return;

    const timer = setTimeout(() => {
      setShowEnvelope(false);
      setShowLetter(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, [envelopeLoaded]);

  return (
    <div className="letter-container">
      {showEnvelope && (
        <div className="envelope">
          <img src={ENVELOPE_URL} alt="Envelope" className="envelope-img" />
        </div>
      )}

      {showLetter && (
        <>
          <div className="letter-header">
            <i className="fa-solid fa-circle-left app-back-btn" onClick={onBack}></i>
          </div>

          <div className="letter-scroll">
            <div className={`letter-text ${typingDone ? "typing-done" : ""}`}>
              <Typewriter
                options={{
                  autoStart: true,
                  loop: false,
                  delay: 40,
                  html: true,
                  cursor: "",
                }}
                onInit={(typewriter) => {
                  paragraphs.forEach((p) => {
                    typewriter.typeString(`<p>${p.replace(/\n/g, "<br/>")}</p>`);
                  });
                  typewriter.callFunction(() => setTypingDone(true));
                  typewriter.start();

                  onLetterShown?.();
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Letter;
