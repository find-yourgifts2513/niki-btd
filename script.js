/* ==========================================================================
   HAPPY 19TH BIRTHDAY NIKITHA - INTERACTIVE LOGIC & MUSIC ENGINE
   Canvas Heart Particles, Audio Autoplay Unlocker, Candle Blowout, Lightbox
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. AUDIO & ENTRANCE CONTROLLER
    // ----------------------------------------------------------------------
    const bgMusic = document.getElementById('bg-music');
    const entranceModal = document.getElementById('entrance-modal');
    const btnStart = document.getElementById('btn-start-experience');
    const btnToggleMusic = document.getElementById('btn-toggle-music');
    const musicIcon = document.getElementById('music-icon');
    const musicStatus = document.getElementById('music-status');
    const vinyl = document.getElementById('vinyl');

    let isPlaying = false;

    // Start experience on click
    btnStart.addEventListener('click', () => {
        entranceModal.style.opacity = '0';
        setTimeout(() => {
            entranceModal.style.display = 'none';
        }, 800);

        playAudio();
        triggerConfettiBurst();
    });

    function playAudio() {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicIcon.textContent = '⏸️';
            if (musicStatus) musicStatus.textContent = 'Playing • Birthday Melodies';
            vinyl.classList.add('spinning');
        }).catch(err => {
            console.log('Audio autoplay prevented or error:', err);
        });
    }

    function pauseAudio() {
        bgMusic.pause();
        isPlaying = false;
        musicIcon.textContent = '▶️';
        if (musicStatus) musicStatus.textContent = 'Paused';
        vinyl.classList.remove('spinning');
    }

    btnToggleMusic.addEventListener('click', () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });

    // ----------------------------------------------------------------------
    // 2. CANVAS FLOATING HEART PARTICLES
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 35;

    class HeartParticle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.size = Math.random() * 14 + 10;
            this.speedY = Math.random() * 1.5 + 0.8;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.opacity = Math.random() * 0.6 + 0.3;
            this.color = ['#ff85a1', '#fbb1bd', '#e8a598', '#ffccd5', '#f4c430'][Math.floor(Math.random() * 5)];
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            if (this.y < -30) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            const topCurveHeight = this.size * 0.3;
            ctx.moveTo(this.x, this.y + topCurveHeight);
            // Draw heart curve
            ctx.bezierCurveTo(this.x, this.y, this.x - this.size / 2, this.y, this.x - this.size / 2, this.y + topCurveHeight);
            ctx.bezierCurveTo(this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x, this.y + this.size, this.x, this.y + this.size);
            ctx.bezierCurveTo(this.x, this.y + (this.size + topCurveHeight) / 2, this.x + this.size / 2, this.y + topCurveHeight, this.x + this.size / 2, this.y + topCurveHeight);
            ctx.bezierCurveTo(this.x + this.size / 2, this.y, this.x, this.y, this.x, this.y + topCurveHeight);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new HeartParticle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ----------------------------------------------------------------------
    // 3. GENERATE 19 CANDLES & BLOW OUT LOGIC
    // ----------------------------------------------------------------------
    const candlesContainer = document.getElementById('candles-container');
    const btnBlow = document.getElementById('btn-blow-candles');
    const secretLetter = document.getElementById('secret-letter');

    // Create 19 Candles
    for (let i = 0; i < 19; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle-item';
        const flame = document.createElement('div');
        flame.className = 'candle-flame';
        candle.appendChild(flame);

        // Tap flame to extinguish individually
        candle.addEventListener('click', () => {
            flame.classList.add('out');
            checkAllCandlesOut();
        });

        candlesContainer.appendChild(candle);
    }

    btnBlow.addEventListener('click', () => {
        const flames = document.querySelectorAll('.candle-flame');
        flames.forEach(f => f.classList.add('out'));
        triggerConfettiBurst();
        showSecretMessage();
    });

    function checkAllCandlesOut() {
        const flames = document.querySelectorAll('.candle-flame:not(.out)');
        if (flames.length === 0) {
            triggerConfettiBurst();
            showSecretMessage();
        }
    }

    function showSecretMessage() {
        secretLetter.style.display = 'block';
        secretLetter.scrollIntoView({ behavior: 'smooth' });
    }

    // Simple Canvas Confetti Burst
    function triggerConfettiBurst() {
        for (let i = 0; i < 50; i++) {
            const confetti = new HeartParticle();
            confetti.y = height / 2;
            confetti.speedY = (Math.random() - 0.5) * 8;
            confetti.speedX = (Math.random() - 0.5) * 8;
            particles.push(confetti);
        }
    }

    // ----------------------------------------------------------------------
    // 4. 19 REASONS WHY NIKITHA IS AMAZING
    // ----------------------------------------------------------------------
    const reasonsGrid = document.getElementById('reasons-grid');
    const reasonsList = [
        "17 years of unconditional loyalty and friendship.",
        "Your contagious laugh that can instantly brighten any dull day.",
        "From nursery crayons to engineering labs, you're always there.",
        "Always caring and making sure everyone around you is safe.",
        "The best sleepover and late-night chat partner in existence.",
        "Standing side-by-side as real-life NCC Buddy Pairs.",
        "Your determination and brilliance in your engineering studies.",
        "You make every simple moment an unforgettable hilarious story.",
        "Your pure, kind heart that always puts others first.",
        "Inspiring presentation skills during college seminars.",
        "Knowing how to cheer me up without even asking.",
        "10-day camp survivor and partner-in-crime!",
        "Always keeping a positive, joyful vibe wherever you go.",
        "The sweetest smile that radiates happiness.",
        "Being the one person I can trust completely with anything.",
        "Working hard towards all your goals and ambitions.",
        "Making engineering college life so much fun every single day.",
        "The infinite inside jokes we'll share forever.",
        "Being Nikitha — the absolute best friend anyone could wish for!"
    ];

    reasonsList.forEach((reason, idx) => {
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.innerHTML = `
            <div class="reason-num">#${idx + 1}</div>
            <div class="reason-text">"${reason}"</div>
        `;
        reasonsGrid.appendChild(card);
    });

    // ----------------------------------------------------------------------
    // 5. LIGHTBOX MODAL HANDLER
    // ----------------------------------------------------------------------
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxQuote = document.getElementById('lightbox-quote');
    const lightboxText = document.getElementById('lightbox-text');
    const btnCloseLightbox = document.getElementById('btn-close-lightbox');

    window.openLightbox = function(src, title, quote, text) {
        lightboxVideo.style.display = 'none';
        lightboxVideo.pause();
        lightboxImg.style.display = 'block';
        lightboxImg.src = src;
        lightboxTitle.textContent = title;
        lightboxQuote.textContent = quote;
        lightboxText.textContent = text;
        lightboxModal.style.display = 'flex';
    };

    window.openVideoLightbox = function(src, title, quote, text) {
        lightboxImg.style.display = 'none';
        lightboxVideo.style.display = 'block';
        lightboxVideo.src = src;
        lightboxVideo.play();
        lightboxTitle.textContent = title;
        lightboxQuote.textContent = quote;
        lightboxText.textContent = text;
        lightboxModal.style.display = 'flex';
    };

    btnCloseLightbox.addEventListener('click', () => {
        lightboxModal.style.display = 'none';
        lightboxVideo.pause();
    });

    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.style.display = 'none';
            lightboxVideo.pause();
        }
    });
});
