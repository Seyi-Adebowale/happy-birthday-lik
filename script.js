document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    const yesBtn = document.getElementById("yes-btn");
    const noBtn = document.getElementById("no-btn");

    const landing = document.querySelector(".landing");
    const envelopeGif = document.getElementById("envelope-gif");
    const letter = document.getElementById("letter");

    const audio = new Audio("birthday.mp3");

    const messages = [
        "Hey birthday girl, you have a mail 💌<br>Would you like to open it?",
        "Come on, it's your birthday!<br>Don’t be shy 😏",
        "It’s something special prepared just for you 🎁",
        "I promise you’ll love it 💖",
        "Seriously, just click YES already 😅",
        "Well… you have no other choice now 😉"
    ];

    let messageIndex = 0;

    setTimeout(() => {
        modal.classList.remove("hidden");
        modalMessage.innerHTML = messages[messageIndex];
        updateButtons();
    }, 4000);

    yesBtn.addEventListener("click", startEnvelopeStage);
    noBtn.addEventListener("click", () => {
        if (messageIndex < messages.length - 1) {
            messageIndex++;
            modalMessage.innerHTML = messages[messageIndex];
            updateButtons();
        }
    });

    function updateButtons() {
        noBtn.style.display = messageIndex === messages.length - 1 ? "none" : "";
    }

    function startEnvelopeStage() {
    modal.classList.add("hidden");
    landing.classList.add("hidden");
    document.body.style.overflow = "hidden";

    // Play birthday music and loop it
    audio.loop = true;
    audio.play();

    // Show envelope GIF
    envelopeGif.style.display = "flex";

    // After 2 seconds, hide GIF and show letter
    setTimeout(() => {
        envelopeGif.style.display = "none";
        letter.classList.remove("hidden"); // remove initial hidden class
        letter.classList.add("show");      // triggers unroll animation
    }, 2000); // GIF shows for 2 seconds
}


    // ----- Confetti -----
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener("resize", resize); resize();

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
});
