import React, { useEffect, useState } from "react";

const Cake = ({ onFinish, onBlown }) => {
  const [blown, setBlown] = useState(false);

  useEffect(() => {
    let audioContext;
    let analyser;
    let microphone;
    let dataArray;

    async function startMic() {
      try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        microphone = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;

        microphone.connect(analyser);
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        function detectBlow() {
          analyser.getByteFrequencyData(dataArray);
          const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;

          if (avg > 60 && !blown) {
            setBlown(true);
            onBlown?.(); // Trigger confetti immediately after blow
          }

          requestAnimationFrame(detectBlow);
        }

        detectBlow();
      } catch (error) {
        console.log("Microphone error:", error);
      }
    }

    startMic();

    return () => {
      if (audioContext) audioContext.close();
    };
  }, [blown, onBlown]);

  return (
    <div className="cake-wrapper">
      <div className="cake-container">

        {/* Cake Base */}
        <div className="cake-body">
          <div className="cake-drip drip1"></div>
          <div className="cake-drip drip2"></div>
          <div className="cake-drip drip3"></div>
        </div>

        <div className="cake-frosting"></div>

        {/* Candles */}
        <div className="candles">
          {[1, 2, 3].map((i) => (
            <div key={i} className="candle">
              <div className="candle-stripe"></div>
              {!blown ? <div className="flame glow"></div> : <div className="flame-out"></div>}
            </div>
          ))}
        </div>
      </div>

      {!blown && <p className="instruction">Make a wish… and blow out the candles! 🎂</p>}

      {blown && (
        <>
          <p className="wish-message">✨ Candles blown, wishes activated! 💖</p>
          <button className="close-scroll-btn" onClick={onFinish}>
            Close & Celebrate 🎊
          </button>
        </>
      )}
    </div>
  );
};

export default Cake;
