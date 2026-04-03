// ==========================================
// 🌊 Ocean Birthday Voyage - Arya's Journey 🌊
// ==========================================

let currentPhase = 'quest';
let areCandlesLit = true;
let isCakeCut = false;
let isCakeAnimationComplete = false;
let cutProgress = 0; 
let cakeImage; 
let cakeCanvas, cakeCtx;
let scratchCanvas, scratchCtx;

function showSection(sectionId) {
    document.querySelectorAll('#main-container > div').forEach(div => {
        div.classList.add('hidden');
        div.classList.remove('active');
    });
    document.getElementById(sectionId).classList.remove('hidden');
    document.getElementById(sectionId).classList.add('active');
    currentPhase = sectionId;
}

// --- Phase 1: Treasure Hunt ---
function checkAnswer1() {
    const ans = document.getElementById('answer1').value.toLowerCase().trim();
    
    // Background audio play karnyachi command
    let bgAudio = document.getElementById('bg-audio');
    if(bgAudio) {
        bgAudio.play().catch(e => console.log("Audio play blocked"));
        bgAudio.volume = 0.5;
    }

    // Ithe tuzi answer set kar
    if(ans.includes('10th') || ans.includes('class')) { 
        document.getElementById('q1').classList.add('hidden');
        document.getElementById('q2').classList.remove('hidden');
    } else {
        alert("Opps! He nahi. Parat try kar! 🤔");
    }
}

function checkAnswer2() {
    const ans = document.getElementById('answer2').value.toLowerCase().trim();
    if(ans.includes('bracelet') || ans.includes('card')) { 
        document.getElementById('q2').classList.add('hidden');
        document.getElementById('q3').classList.remove('hidden');
    } else {
        alert("Nahi, parat aathav! 😉");
    }
}

function checkAnswer3() {
    const ans = document.getElementById('answer3').value.toLowerCase().trim();
    // Ithe tiche aavadte gaane tak (e.g., 'kesariya')
    if(ans.includes('pops exorcist') || ans.length > 3) { 
        document.getElementById('q3').classList.add('hidden');
        document.getElementById('q4').classList.remove('hidden');
    } else {
        alert("No? Think again! 🎵");
    }
}

function checkAnswer4() {
    const ans = document.getElementById('answer4').value.toLowerCase().trim();
    if(ans.includes('At your home') || ans.includes('At my home') || ans.length > 2) { 
        alert(" yay right! 👏 Lets go... 🌊🚀");
        showSection('scratch-section');
        initScratchCard();
    } else {
        alert("Shevatcha prashna ahe, chukvu nako! 🙏");
    }
}

// --- Phase 2: Scratch Card ---
function initScratchCard() {
    scratchCanvas = document.getElementById('scratchCanvas');
    scratchCtx = scratchCanvas.getContext('2d');
    scratchCanvas.width = 800;
    scratchCanvas.height = 400;
    
    scratchCtx.fillStyle = '#2c298f'; 
    scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
    
    let isDrawing = false;
    scratchCanvas.addEventListener('mousedown', () => isDrawing = true);
    scratchCanvas.addEventListener('mouseup', () => isDrawing = false);
    scratchCanvas.addEventListener('mouseleave', () => isDrawing = false);
    scratchCanvas.addEventListener('mousemove', scratch);
    scratchCanvas.addEventListener('touchstart', (e) => { e.preventDefault(); isDrawing = true; });
    scratchCanvas.addEventListener('touchend', () => isDrawing = false);
    scratchCanvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = scratchCanvas.getBoundingClientRect();
        scratch(null, touch.clientX - rect.left, touch.clientY - rect.top);
    });

    function scratch(e, touchX, touchY) {
        if(!isDrawing) return;
        let x = e ? e.offsetX : touchX;
        let y = e ? e.offsetY : touchY;
        scratchCtx.globalCompositeOperation = 'destination-out';
        scratchCtx.beginPath();
        scratchCtx.arc(x, y, 20, 0, Math.PI * 2);
        scratchCtx.fill();
    }

    setTimeout(() => { 
        document.getElementById('nextToTimeline').classList.remove('hidden'); 
    }, 5000);
}

// --- Phase 3: Timeline (Animated sequence) ---
function showTimeline() {
    showSection('timeline-section');
    
    const polaroids = document.querySelectorAll('.polaroid');
    
    // Ek-ek photo 1 second chya gap ne screen var yeil
    polaroids.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('show-anim');
        }, index * 1000); // 1000ms = 1 second delay per photo
    });

    // Sagle photos aalyanantar 2 seconds ni 'Let's Celebrate' button disel
    let totalTime = (polaroids.length * 1000) + 2000;
    setTimeout(() => { 
        document.getElementById('nextToCake').classList.remove('hidden'); 
    }, totalTime);
}

// --- Phase 4: Cake Animation ---
function initCakeCanvas() {
    cakeCanvas = document.getElementById('cakeCanvas');
    cakeCtx = cakeCanvas.getContext('2d');
    cakeCanvas.width = 400; 
    cakeCanvas.height = 400;

    cakeImage = new Image();
    cakeImage.src = 'image/cake.png'; // Make sure this image is in the folder
    
    cakeImage.onload = function() {
        startAnimationLoop();
    };
    cakeImage.onerror = function() {
        // Backup image jar local image dili nasel
        cakeImage.src = 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=350'; 
        cakeImage.onload = function() { startAnimationLoop(); };
    };
}

function startAnimationLoop() {
    function animate() {
        if (currentPhase !== 'cake-section') return;
        
        if (!isCakeCut) {
            drawCakeScene(); 
        } else if (isCakeCut && !isCakeAnimationComplete) {
            drawCutAnimation(); 
        } else {
            drawCakeScene();
            drawCutLines(1); 
        }
        
        requestAnimationFrame(animate); 
    }
    requestAnimationFrame(animate);
}

function drawCakeScene() {
    cakeCtx.clearRect(0, 0, cakeCanvas.width, cakeCanvas.height);
    cakeCtx.drawImage(cakeImage, 25, 100, 350, 250);

    cakeCtx.fillStyle = '#FF7F50'; 
    cakeCtx.fillRect(100, 320, 30, 30);
    cakeCtx.fillStyle = '#40E0D0'; 
    cakeCtx.fillRect(270, 310, 20, 40);

    const candlePositions = [120, 160, 200, 240, 280]; 
    candlePositions.forEach(pos => {
        cakeCtx.fillStyle = '#006994'; 
        cakeCtx.fillRect(pos, 50, 10, 50); 
        
        if(areCandlesLit) {
            drawFlickeringFlame(pos + 5, 45); 
        }
    });
}

function drawFlickeringFlame(x, y) {
    cakeCtx.fillStyle = '#FFA500'; 
    cakeCtx.beginPath();
    let flickerHeight = Math.random() * 10;
    cakeCtx.ellipse(x, y - flickerHeight, 8, 12, 0, 0, Math.PI * 2);
    cakeCtx.fill();
    
    cakeCtx.fillStyle = '#FFFFE0';
    cakeCtx.beginPath();
    cakeCtx.ellipse(x, y - flickerHeight + 2, 4, 8, 0, 0, Math.PI * 2);
    cakeCtx.fill();
}

function drawCutAnimation() {
    cutProgress += 0.02; // Speed up the cutting animation
    
    if(cutProgress >= 1) {
        cutProgress = 1;
        isCakeAnimationComplete = true; 
        document.getElementById('nextToVideo').classList.remove('hidden'); 
    }
    
    drawCakeScene(); 
    drawCutLines(cutProgress); 
}

function drawCutLines(progress = 1) {
    cakeCtx.lineWidth = 4;
    cakeCtx.strokeStyle = '#FFFFFF'; 

    const centerX = cakeCanvas.width / 2;
    const centerY = 100 + 250 / 2; 
    const initialRadius = 100;
    
    cakeCtx.beginPath();
    cakeCtx.moveTo(centerX, centerY - initialRadius);
    cakeCtx.lineTo(centerX, centerY + initialRadius * progress);
    
    if (progress > 0.5) {
        let horizontalProgress = (progress - 0.5) * 2;
        cakeCtx.moveTo(centerX - initialRadius * horizontalProgress, centerY);
        cakeCtx.lineTo(centerX + initialRadius * horizontalProgress, centerY);
    }
    cakeCtx.stroke();
}

function initMic() {
    if(!areCandlesLit) return; 

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);

        scriptProcessor.onaudioprocess = function() {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            let values = 0;
            for (let i = 0; i < array.length; i++) {
                values += array[i];
            }
            const average = values / array.length;
            
            if(average > 40) { 
                analyser.disconnect(); 
                microphone.disconnect(); 
                scriptProcessor.disconnect(); 

                areCandlesLit = false; 
                document.getElementById('mic-status').innerText = 'Yay! candles lit up! 🎂🕯️';

                setTimeout(() => { 
                    isCakeCut = true; 
                    document.getElementById('mic-status').innerText = 'Now the cake is cut... 🌊✂️';
                }, 1500); 
            }
        }
    }).catch(err => {
        document.getElementById('mic-status').innerText = 'Error: Mic access denied. Re-load kar aani allow kar!';
    });
}

function showCake() {
    showSection('cake-section');
    initCakeCanvas(); 
    document.getElementById('mic-status').innerText = 'Blow hard into your mic!';
    initMic(); 
}

// --- Phase 5: Video ---
function showFinalVideo() {
    showSection('video-section');
    let finalVideo = document.getElementById('bff-video');
    if(finalVideo) {
        finalVideo.play().catch(e => console.log("User interaction needed to play video."));
    }
}