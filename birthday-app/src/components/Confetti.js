import React, { useEffect, useRef } from "react";

const Confetti = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    const colors = ["#ff0a54","#ff477e","#ff7096","#ff85a1","#fbb1bd","#ffd166","#06d6a0","#118ab2","#8338ec"];
    const COUNT = 180;
    const pieces = Array.from({ length: COUNT }, () => makePiece());

    function makePiece() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        w: Math.random() * 8 + 4,
        h: Math.random() * 14 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.4,
        angle: Math.random() * Math.PI * 2,
        rot: (Math.random() - 0.5) * 0.2,
        speedY: Math.random() * 1.5 + 0.8,
        sway: (Math.random() - 0.5) * 1.2
      };
    }

    function animateConfetti() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(const p of pieces){
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x,p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
        ctx.restore();
        p.y += p.speedY;
        p.x += p.sway;
        p.angle += p.rot;
        if(p.y > canvas.height + 20){ p.y = -20; p.x = Math.random()*canvas.width; }
      }
      requestAnimationFrame(animateConfetti);
    }
    animateConfetti();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas id="confetti-canvas" ref={canvasRef}></canvas>;
};

export default Confetti;
