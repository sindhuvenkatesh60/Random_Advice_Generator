// Get Advice from API
async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    const adviceText = data.slip.advice;
    
    document.getElementById("advice-text").textContent = adviceText;
    document.getElementById("advice-text").style.opacity = 1;

    // Update share links
    updateShareLinks(adviceText);
}

// Update Share Links
function updateShareLinks(advice) {
    const encodedAdvice = encodeURIComponent(advice);

    document.getElementById("whatsapp-share").href = `https://api.whatsapp.com/send?text=${encodedAdvice}`;
    document.getElementById("twitter-share").href = `https://twitter.com/intent/tweet?text=${encodedAdvice}`;
    document.getElementById("facebook-share").href = `https://www.facebook.com/sharer/sharer.php?u=${encodedAdvice}`;
}

// Speak Advice
document.getElementById("speak-btn").addEventListener("click", function() {
    let advice = document.getElementById("advice-text").textContent;
    let speech = new SpeechSynthesisUtterance(advice);
    speechSynthesis.speak(speech);
});

// Save Advice to Favorites
document.getElementById("save-btn").addEventListener("click", function() {
    let advice = document.getElementById("advice-text").textContent;
    if (!advice) return;

    let savedAdviceList = document.getElementById("saved-advice");
    let li = document.createElement("li");
    li.textContent = advice;

    // Add Double-Tap to Remove Feature
    li.addEventListener("dblclick", function() {
        this.remove();
    });

    savedAdviceList.appendChild(li);
});

document.getElementById("advice-btn").addEventListener("click", getAdvice);
