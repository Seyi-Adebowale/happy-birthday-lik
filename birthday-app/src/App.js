import React, { useState, useEffect, useRef } from "react";
import Landing from "./components/Landing";
import Modal from "./components/Modal";
import TreasureGame from "./components/TreasureGame";
import ReasonsCards from "./components/ReasonsCards";
import Letter from "./components/Letter";
import Confetti from "./components/Confetti";
import "./styles.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const [showTreasureGame, setShowTreasureGame] = useState(false);
  const [treasureFound, setTreasureFound] = useState(false);

  const [showReasons, setShowReasons] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const [showLanding, setShowLanding] = useState(true);
  const [noClickCount, setNoClickCount] = useState(0);

  const [showConfetti, setShowConfetti] = useState(false);

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

  const handleYes = () => {
    setShowModal(false);
    setShowLanding(false);
    // Start treasure game without music
    setShowTreasureGame(true);
  };

  const handleNo = () => {
    if (messageIndex < messages.length - 1) {
      setMessageIndex((prev) => prev + 1);
      setNoClickCount((prev) => prev + 1);
    }
  };

  const noBtnScale = Math.max(1 - 0.2 * noClickCount, 0.3);

const handleTreasureFound = () => {
  // This is called when user clicks "There's more..." in TreasureGame
  setShowConfetti(false);  // stop confetti
  setShowTreasureGame(false);
  setShowReasons(true);    // show reasons screen
};



  const handleReasonsComplete = () => {
    setShowReasons(false);
    setShowLetter(true);

    // Start music now that letter is displayed
    const audio = audioRef.current;
    audio.loop = true;
    audio.play().catch(() => console.log("Autoplay blocked"));
  };

  const handleBackToLanding = () => {
    setShowLetter(false);
    setShowLanding(true);
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <div className="App">
      {showConfetti && <Confetti />}

      {/* LANDING */}
      {showLanding && (
        <div className="landing-wrapper">
          <Landing />
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
      {showLetter && <Letter onBack={handleBackToLanding} />}
    </div>
  );
}

export default App;
