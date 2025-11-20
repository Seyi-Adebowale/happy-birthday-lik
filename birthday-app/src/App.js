import React, { useState, useEffect, useRef } from "react";
import Landing from "./components/Landing";
import Modal from "./components/Modal";
import Envelope from "./components/Envelope";
import Letter from "./components/Letter";
import Confetti from "./components/Confetti";
import "./styles.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showViewInbox, setShowViewInbox] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);

  const audioRef = useRef(new Audio("/birthday.mp3"));

  const messages = [
    "Hey birthday girl, you have a mail 💌<br>Would you like to open it?",
    "Come on, it's your birthday!<br>Don’t be shy 😏",
    "It’s something special prepared just for you 🎁",
    "I promise you’ll love it 💖",
    "Seriously, just click YES already 😅",
    "Well… you have no other choice now 😉",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const stopAudio = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
  };

  const handleYes = () => {
    setShowModal(false);

    const audio = audioRef.current;
    audio.loop = true;
    audio.play().catch(() => console.log("Autoplay blocked"));

    // Preload envelope GIF
    const envelopeImage = new Image();
    envelopeImage.src = "/envelope.gif"; 

    envelopeImage.onload = () => {
      // Once loaded, show envelope
      setShowEnvelope(true);

      // After a delay, move to Letter
      setTimeout(() => {
        setShowEnvelope(false);
        setShowLetter(true);
        setNoClickCount(0);
      }, 2500);
    };
  };

  const handleNo = () => {
    if (messageIndex < messages.length - 1) {
      setMessageIndex((prev) => prev + 1);
      setNoClickCount((prev) => prev + 1);
    }
  };

  // Go back to landing from Letter
  const handleBackToLanding = () => {
    setShowLetter(false);
    setShowEnvelope(false);

    setShowLanding(true);
    setShowViewInbox(true); // Keep inbox counter active

    stopAudio();
  };

  const handleViewInbox = () => {
    stopAudio();
    setShowLanding(false);
    setShowModal(true);
    setMessageIndex(0);
  };

  const noBtnScale = Math.max(1 - 0.2 * noClickCount, 0.3);

  return (
    <div className="App">
      <Confetti />

      {/* Modern floating back button */}
      {showLetter && (
        <i
          className="fa-solid fa-circle-left app-back-btn"
          onClick={handleBackToLanding}
        ></i>
      )}

      {showLanding && !showLetter && !showEnvelope && (
        <div className="landing-wrapper">
          <Landing />
          {showViewInbox && (
            <button
              className="view-inbox-btn beating"
              onClick={handleViewInbox}
            >
              📬 View Inbox <span className="counter">1</span>
            </button>
          )}
        </div>
      )}

      {showModal && (
        <Modal
          message={messages[messageIndex]}
          onYes={handleYes}
          onNo={handleNo}
          hideNo={messageIndex === messages.length - 1}
          noBtnScale={noBtnScale}
        />
      )}

      {showEnvelope && <Envelope />}
      {showLetter && <Letter />}
    </div>
  );
}

export default App;
