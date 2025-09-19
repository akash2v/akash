(function () {
  const style = document.createElement("style");
  style.innerHTML = `
        .dev-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(45deg, rgba(0,0,0,0.95), rgba(20,0,0,0.95));
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.5s ease;
            z-index: 9998;
            font-family: 'Courier New', monospace;
            backdrop-filter: blur(5px);
        }

        .dev-overlay.active {
            opacity: 1;
            visibility: visible;
            animation: screenFlicker 0.1s infinite;
        }

        @keyframes screenFlicker {
            0%, 98% { filter: brightness(1); }
            99% { filter: brightness(1.1) hue-rotate(90deg); }
        }

        .dev-popup {
            background: linear-gradient(135deg, #001100, #000000);
            border: 3px solid #00ff00;
            border-radius: 15px;
            padding: 40px;
            max-width: 600px;
            width: 90%;
            text-align: center;
            position: relative;
            animation: borderPulse 2s infinite, popupGlow 3s infinite;
            box-shadow: inset 0 0 50px rgba(0,255,0,0.1);
        }

        @keyframes borderPulse {
            0%, 100% { 
                border-color: #00ff00; 
                box-shadow: 0 0 30px #00ff00, inset 0 0 30px rgba(0,255,0,0.1);
            }
            50% { 
                border-color: #ff0000; 
                box-shadow: 0 0 30px #ff0000, inset 0 0 30px rgba(255,0,0,0.1);
            }
        }

        @keyframes popupGlow {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }

        .dev-popup.warning {
            animation: warningBorder 0.3s infinite, glitchEffect 0.1s infinite;
        }

        @keyframes warningBorder {
            0%, 100% { border-color: #ff0000; background: linear-gradient(135deg, #110000, #000000); }
            50% { border-color: #00ff00; background: linear-gradient(135deg, #001100, #000000); }
        }

        @keyframes glitchEffect {
            0%, 90%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
        }

        .dev-image {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            border: 3px solid #00ff00;
            margin: 0 auto 25px;
            display: block;
            animation: imageRotate 10s linear infinite;
            box-shadow: 0 0 20px rgba(0,255,0,0.5);
        }

        @keyframes imageRotate {
            0% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(90deg) scale(1.05); }
            50% { transform: rotate(180deg) scale(1); }
            75% { transform: rotate(270deg) scale(1.05); }
            100% { transform: rotate(360deg) scale(1); }
        }

        .dev-popup h2 {
            color: #00ff00;
            font-size: 20px;
            margin: 0 0 20px;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 0 0 10px #00ff00;
            animation: textGlow 2s infinite;
        }

        @keyframes textGlow {
            0%, 100% { text-shadow: 0 0 10px #00ff00; }
            50% { text-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00; }
        }

        .dev-timer {
            color: #ff0000;
            font-size: 32px;
            font-weight: bold;
            margin: 20px 0;
            text-shadow: 0 0 15px #ff0000;
            animation: timerPulse 1s infinite;
            font-family: 'Courier New', monospace;
        }

        @keyframes timerPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        .dev-status {
            color: #00ff00;
            font-size: 16px;
            margin: 15px 0;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-shadow: 0 0 5px #00ff00;
        }

        .dev-typing {
            color: #ffff00;
            font-size: 14px;
            margin: 10px 0;
            min-height: 20px;
            text-align: left;
            font-family: 'Courier New', monospace;
        }

        .dev-progress {
            width: 100%;
            height: 8px;
            background: #333;
            border-radius: 4px;
            margin: 15px 0;
            overflow: hidden;
        }

        .dev-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #00ff00, #ffff00, #ff0000);
            border-radius: 4px;
            transition: width 1s ease;
            animation: progressGlow 2s infinite;
        }

        @keyframes progressGlow {
            0%, 100% { box-shadow: 0 0 10px rgba(0,255,0,0.5); }
            50% { box-shadow: 0 0 20px rgba(255,255,0,0.8); }
        }

        .dev-warning-blinker {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 25px;
            height: 25px;
            background: #ff0000;
            border-radius: 50%;
            z-index: 10001;
            animation: blink 0.3s infinite;
            box-shadow: 0 0 15px #ff0000;
        }

        @keyframes blink {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(1.2); }
        }

        .dev-blocked {
            pointer-events: none !important;
            user-select: none !important;
        }

        .dev-overlay.active {
            pointer-events: all !important;
        }

        .dev-buttons {
            display: flex;
            gap: 15px;
            margin: 20px 0;
            justify-content: center;
        }

        .dev-btn {
            background: linear-gradient(45deg, #00ff00, #008800);
            border: 2px solid #00ff00;
            color: #000;
            padding: 10px 20px;
            border-radius: 8px;
            text-decoration: none;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            font-size: 14px;
            text-transform: uppercase;
            transition: all 0.3s ease;
            animation: btnGlow 2s infinite;
        }

        .dev-btn:hover {
            background: linear-gradient(45deg, #ffff00, #ff8800);
            border-color: #ffff00;
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(255,255,0,0.8);
        }

        @keyframes btnGlow {
            0%, 100% { box-shadow: 0 0 10px rgba(0,255,0,0.5); }
            50% { box-shadow: 0 0 20px rgba(0,255,0,0.8); }
        }

        @keyframes timerShake {
            0%, 100% { transform: scale(1) translateX(0); }
            25% { transform: scale(1.1) translateX(-2px); }
            75% { transform: scale(1.1) translateX(2px); }
        }

        .dev-timer.shake {
            animation: timerShake 0.5s ease-in-out;
        }
    `;
  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.className = "dev-overlay";

  const popup = document.createElement("div");
  popup.className = "dev-popup";

  const image = document.createElement("img");
  image.className = "dev-image";
  image.src = "https://akash.skytup.com/developer.webp";
  image.alt = "Developer";
  popup.appendChild(image);

  const title = document.createElement("h2");
  title.textContent = "SYSTEM BREACH DETECTED";
  popup.appendChild(title);

  const status = document.createElement("div");
  status.className = "dev-status";
  status.textContent = "AKASH VISHWAKARMA - ROOT ACCESS GRANTED";
  popup.appendChild(status);

  const typing = document.createElement("div");
  typing.className = "dev-typing";
  popup.appendChild(typing);

  const progress = document.createElement("div");
  progress.className = "dev-progress";
  const progressBar = document.createElement("div");
  progressBar.className = "dev-progress-bar";
  progress.appendChild(progressBar);
  popup.appendChild(progress);

  const TIMER_DURATION = 3600;

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  const timer = document.createElement("div");
  timer.className = "dev-timer";
  timer.textContent = formatTime(TIMER_DURATION);
  popup.appendChild(timer);

  const buttons = document.createElement("div");
  buttons.className = "dev-buttons";

  const portfolioBtn = document.createElement("a");
  portfolioBtn.className = "dev-btn";
  portfolioBtn.href = "https://akash.skytup.com";
  portfolioBtn.target = "_blank";
  portfolioBtn.textContent = "See Developer";
  buttons.appendChild(portfolioBtn);

  const githubBtn = document.createElement("a");
  githubBtn.className = "dev-btn";
  githubBtn.href = "https://github.com/akash2v";
  githubBtn.target = "_blank";
  githubBtn.textContent = "GitHub";
  buttons.appendChild(githubBtn);

  popup.appendChild(buttons);

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  const warningBlinker = document.createElement("div");
  warningBlinker.className = "dev-warning-blinker";
  warningBlinker.style.display = "none";
  document.body.appendChild(warningBlinker);

  let isActive = false;
  let timerInterval;
  let timeLeft = TIMER_DURATION;
  let typingInterval;
  let startTime;

  function saveState() {
    if (isActive) {
      localStorage.setItem("devPopupActive", "true");
      localStorage.setItem("devPopupStartTime", startTime);
    } else {
      localStorage.removeItem("devPopupActive");
      localStorage.removeItem("devPopupStartTime");
    }
  }

  function loadState() {
    const savedActive = localStorage.getItem("devPopupActive");
    const savedStartTime = localStorage.getItem("devPopupStartTime");

    if (
      savedActive === "true" &&
      savedStartTime &&
      savedStartTime !== "undefined"
    ) {
      const elapsed = Math.floor(
        (Date.now() - parseInt(savedStartTime)) / 1000
      );
      if (elapsed < TIMER_DURATION) {
        timeLeft = TIMER_DURATION - elapsed;
        startTime = parseInt(savedStartTime);
        showDeveloperPopup(true);
      } else {
        localStorage.removeItem("devPopupActive");
        localStorage.removeItem("devPopupStartTime");
      }
    }
  }

  const messages = [
    "Initializing backdoor access...",
    "Bypassing security protocols...",
    "Accessing admin privileges...",
    "Downloading system files...",
    "Establishing remote connection...",
    "Monitoring user activity...",
    "Extracting sensitive data...",
    "Maintaining stealth mode...",
  ];

  function typeMessage(message, callback) {
    let i = 0;
    typing.textContent = "";
    typingInterval = setInterval(() => {
      typing.textContent += message[i];
      i++;
      if (i >= message.length) {
        clearInterval(typingInterval);
        setTimeout(callback, 1000);
      }
    }, 50);
  }

  function cycleMessages() {
    let messageIndex = 0;
    function showNext() {
      if (isActive) {
        typeMessage(messages[messageIndex], () => {
          messageIndex = (messageIndex + 1) % messages.length;
          setTimeout(showNext, 500);
        });
      }
    }
    showNext();
  }

  let blockedHandlers = [];

  function blockAllInteractions() {
    document.body.style.overflow = "hidden";
    document.body.classList.add("dev-blocked");

    const blockEvent = (e) => {
      if (!overlay.contains(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const blockRightClick = (e) => {
      if (e.button === 2 || e.which === 3) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const blockContextMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const blockDevTools = (e) => {
      // ✅ Allow our custom keys (A for open, H for close)
      if (
        e.ctrlKey &&
        e.shiftKey &&
        e.altKey &&
        (e.key.toLowerCase() === "a" || e.key.toLowerCase() === "h")
      ) {
        return; 
      }

      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "C") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.key === "u") ||
        (e.ctrlKey && e.shiftKey && e.key === "K")
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      if (
        !(e.ctrlKey && e.shiftKey && e.altKey && e.key.toLowerCase() === "a")
      ) {
        if (e.ctrlKey || e.shiftKey || e.altKey) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
    };

    blockedHandlers = [
      blockEvent,
      blockDevTools,
      blockRightClick,
      blockContextMenu,
    ];

    ["scroll", "wheel", "touchmove", "click", "mousemove"].forEach((event) => {
      document.addEventListener(event, blockEvent, {
        capture: true,
        passive: false,
      });
    });

    ["mousedown", "mouseup"].forEach((event) => {
      document.addEventListener(event, blockRightClick, {
        capture: true,
        passive: false,
      });
    });

    document.addEventListener("contextmenu", blockContextMenu, {
      capture: true,
      passive: false,
    });
    document.addEventListener("keydown", blockDevTools, {
      capture: true,
      passive: false,
    });
    document.addEventListener("keyup", blockDevTools, {
      capture: true,
      passive: false,
    });

    warningBlinker.style.display = "block";
  }

  function restoreAllInteractions() {
    document.body.style.overflow = "";
    document.body.classList.remove("dev-blocked");
    warningBlinker.style.display = "none";

    if (blockedHandlers.length > 0) {
      ["scroll", "wheel", "touchmove", "click", "mousemove"].forEach(
        (event) => {
          document.removeEventListener(event, blockedHandlers[0], {
            capture: true,
          });
        }
      );

      ["mousedown", "mouseup"].forEach((event) => {
        document.removeEventListener(event, blockedHandlers[2], {
          capture: true,
        });
      });

      document.removeEventListener("contextmenu", blockedHandlers[3], {
        capture: true,
      });
      document.removeEventListener("keydown", blockedHandlers[1], {
        capture: true,
      });
      document.removeEventListener("keyup", blockedHandlers[1], {
        capture: true,
      });

      blockedHandlers = [];
    }
  }

  function startTimer(fromSaved = false) {
    if (!fromSaved) {
      timeLeft = TIMER_DURATION;
    }

    timer.textContent = formatTime(timeLeft);
    popup.classList.remove("warning");
    progressBar.style.width = (timeLeft / TIMER_DURATION) * 100 + "%";

    if (timeLeft <= 300) {
      popup.classList.add("warning");
    }

    timerInterval = setInterval(() => {
      timeLeft--;
      timer.textContent = formatTime(timeLeft);
      progressBar.style.width = (timeLeft / TIMER_DURATION) * 100 + "%";

      if (timeLeft <= 300) {
        popup.classList.add("warning");
      }

      if (timeLeft <= 60 && timeLeft % 10 === 0) {
        timer.classList.add("shake");
        setTimeout(() => timer.classList.remove("shake"), 500);
      }

      if (timeLeft <= 0) {
        hideDeveloperPopup();
      }

      saveState();
    }, 1000);
  }

  function showDeveloperPopup(fromSaved = false) {
    if (isActive) return;
    isActive = true;
    if (!fromSaved) {
      startTime = Date.now();
    }
    blockAllInteractions();
    overlay.classList.add("active");
    startTimer(fromSaved);
    cycleMessages();
    saveState();
  }

  function hideDeveloperPopup() {
    if (!isActive) return;
    isActive = false;
    clearInterval(timerInterval);
    clearInterval(typingInterval);
    overlay.classList.remove("active");
    popup.classList.remove("warning");
    typing.textContent = "";
    restoreAllInteractions();
    saveState();
  }

  function togglePopup() {
    if (isActive) {
      hideDeveloperPopup();
    } else {
      showDeveloperPopup();
    }
  }

  document.addEventListener("keydown", (e) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey && e.shiftKey && e.altKey) {
      // Prevent default behavior for our shortcuts
      if (e.key.toLowerCase() === "a" || e.key.toLowerCase() === "h") {
        e.preventDefault();
      }

      // Open with Ctrl+Shift+Alt+A (when not active)
      if (e.key.toLowerCase() === "a" && !isActive) {
        showDeveloperPopup();
      }

      // Close with Ctrl+Shift+Alt+H (when active)
      if (e.key.toLowerCase() === "h" && isActive) {
        hideDeveloperPopup();
      }
    }
  });

  // Load saved state on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadState);
  } else {
    loadState();
  }

  // Save state before page unload
  window.addEventListener("beforeunload", saveState);

  window.showDeveloperPopup = showDeveloperPopup;
})();
