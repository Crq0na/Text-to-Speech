const textInput = document.getElementById("text-input");
const speakBtn = document.getElementById("speak-btn");
const stopBtn = document.getElementById("stop-btn");
const statusBox = document.getElementById("status-box");
const synth = window.speechSynthesis;

function setStatus(message, type) {
statusBox.textContent = message;
statusBox.className="status";
if (type) statusBox.classList.add(type);
}

function setButtons(speaking) {
speakBtn.disabled = speaking;
stopBtn.disabled = !speaking;
}

speakBtn.addEventListener("click", function() {

  const text = textInput.value.trim();

  if (text === "") {
    setStatus("Please type something first.", "error");
    return;
  }

  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
utterance.onstart = function() {
    setStatus("Speaking...", "speaking");
    setButtons(true);
  };
  utterance.onend = function () {
    setStatus("Ready");
    setButtons(false);
  }

  utterance.onerror = function (event) {
    if (event.error === "interrupted") return;
    setStatus("Error: " + event.error, "error");
    setButtons(false);
  }


  synth.speak(utterance)
});



