import React, { useState, useRef } from "react";
import Landing from "./components/Landing";
import Modal from "./components/Modal";
import TreasureGame from "./components/TreasureGame";
import ReasonsCards from "./components/ReasonsCards";
import Letter from "./components/Letter";
import Confetti from "./components/Confetti";
import "./styles.css";

function App() {
  // Landing & modal
  const [showLanding, setShowLanding] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [noClickCount, setNoClickCount] = useState(0);

  // Treasure game
  const [showTreasureGame, setShowTreasureGame] = useState(false);

  // Reasons & letter
  const [showReasons, setShowReasons] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  // Confetti
  const [showConfetti, setShowConfetti] = useState(false);

  // Inbox button
  const [inboxAvailable, setInboxAvailable] = useState(false);

  // Audio
  const audioRef = useRef(new Audio("/birthday.mp3"));

  const messages = [
    "Hey baby, you have a mail 💌<br>Would you like to open it?",
    "Come on, it's your birthday!<br>Don’t be shy 😏",
    "It’s something special prepared just for you 🎁",
    "I promise you’ll love it 💖",
    "Seriously, just click YES already 😅",
    "Well… you have no other choice now 😉",
  ];

  // Show modal after 4 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Modal buttons
  const handleYes = () => {
    setShowModal(false);
    setShowLanding(false);
    setShowTreasureGame(true);
  };

  const handleNo = () => {
    if (messageIndex < messages.length - 1) {
      setMessageIndex(prev => prev + 1);
      setNoClickCount(prev => prev + 1);
    }
  };

  const noBtnScale = Math.max(1 - 0.2 * noClickCount, 0.3);

  // Treasure game finished
  const handleTreasureFound = () => {
    setShowTreasureGame(false);
    setShowReasons(true);
    setShowConfetti(false); // stop treasure confetti
  };

  // Reasons finished
  const handleReasonsComplete = () => {
    setShowReasons(false);
    setShowLetter(true);
    setShowConfetti(true); // show letter confetti

    const audio = audioRef.current;
    audio.loop = true;
    audio.play().catch(() => console.log("Autoplay blocked"));
  };

  // Back from letter to landing
  const handleBackToLanding = () => {
    setShowLetter(false);
    setShowLanding(true);
    setShowConfetti(false); // stop letter confetti
    setInboxAvailable(true);

    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
  };

  // Restart flow from inbox
  const handleViewInbox = () => {
    setShowLanding(false);
    setShowTreasureGame(true);
    setInboxAvailable(false);
  };

  return (
    <div className="App">
      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* LANDING */}
      {showLanding && (
        <div className="landing-wrapper">
          <Landing />
          {inboxAvailable && (
            <button className="view-inbox-btn" onClick={handleViewInbox}>
              View Inbox
            </button>
          )}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <Modal
          message={messages[messageIndex]}
          onYes={handleYes}
          onNo={handleNo}
          hideNo={messageIndex === messages.length - 1}
          noBtnScale={noBtnScale}
        />
      )}

      {/* TREASURE MINI-GAME */}
      {showTreasureGame && (
        <TreasureGame
          onTreasureFound={handleTreasureFound}
          setConfetti={setShowConfetti}
        />
      )}

      {/* REASONS */}
      {showReasons && <ReasonsCards onComplete={handleReasonsComplete} />}

      {/* LETTER */}
      {showLetter && (
        <div className="letter-wrapper">
          <Letter
            onBack={handleBackToLanding}
            showConfetti={showConfetti}
            setShowConfetti={setShowConfetti}
          />
        </div>
      )}
    </div>
  );
}

export default App;
