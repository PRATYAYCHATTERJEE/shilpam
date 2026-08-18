const API_URL = "http://localhost:5000/api/ai/chat";

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");
const voiceButton = document.getElementById("voiceButton");
const voiceStatus = document.getElementById("voiceStatus");

const COURSE = "Bamboo Flower Vase";
const STEP = "Outer weaving";


// =====================================================
// VOICE RECOGNITION
// =====================================================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition = null;
let isListening = false;


// Check browser support

if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.lang = "bn-IN";

    recognition.continuous = false;

    recognition.interimResults = true;

    recognition.maxAlternatives = 1;


    // ---------------------------------------------
    // Microphone started
    // ---------------------------------------------

    recognition.onstart = () => {

        isListening = true;

        voiceButton.classList.add("listening");

        voiceButton.textContent = "🔴";

        voiceStatus.textContent =
            "শুনছি... আপনার প্রশ্ন বলুন";

    };


    // ---------------------------------------------
    // Speech detected
    // ---------------------------------------------

    recognition.onresult = (event) => {

        let transcript = "";

        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            transcript +=
                event.results[i][0].transcript;

        }


        messageInput.value = transcript;


        voiceStatus.textContent =
            `আপনি বলেছেন: ${transcript}`;


        // If final result is received

        const lastResult =
            event.results[event.results.length - 1];


        if (lastResult.isFinal) {

            setTimeout(() => {

                sendMessage();

            }, 500);

        }

    };


    // ---------------------------------------------
    // Recognition ended
    // ---------------------------------------------

    recognition.onend = () => {

        isListening = false;

        voiceButton.classList.remove("listening");

        voiceButton.textContent = "🎙️";

        if (!messageInput.value.trim()) {

            voiceStatus.textContent =
                "মাইক্রোফোন বন্ধ হয়েছে";

        }

    };


    // ---------------------------------------------
    // Recognition error
    // ---------------------------------------------

    recognition.onerror = (event) => {

        console.error(
            "Speech recognition error:",
            event.error
        );

        isListening = false;

        voiceButton.classList.remove("listening");

        voiceButton.textContent = "🎙️";


        if (event.error === "not-allowed") {

            voiceStatus.textContent =
                "মাইক্রোফোন ব্যবহারের অনুমতি দিন";

        }

        else if (event.error === "no-speech") {

            voiceStatus.textContent =
                "কোনো কথা শোনা যায়নি। আবার চেষ্টা করুন";

        }

        else {

            voiceStatus.textContent =
                "ভয়েস ইনপুটে সমস্যা হয়েছে";

        }

    };

}


// =====================================================
// VOICE BUTTON
// =====================================================

voiceButton.addEventListener("click", () => {

    if (!recognition) {

        voiceStatus.textContent =
            "আপনার browser voice recognition support করে না";

        return;

    }


    if (isListening) {

        recognition.stop();

        return;

    }


    messageInput.value = "";

    voiceStatus.textContent =
        "মাইক্রোফোন চালু হচ্ছে...";


    try {

        recognition.start();

    }

    catch (error) {

        console.error(error);

    }

});


// =====================================================
// SEND MESSAGE
// =====================================================

async function sendMessage() {

    const message = messageInput.value.trim();

    if (!message) {
        return;
    }


    addUserMessage(message);

    messageInput.value = "";

    sendButton.disabled = true;

    voiceButton.disabled = true;

    addLoadingMessage();


    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                message: message,

                course: COURSE,

                step: STEP,

                language: "bn"

            })

        });


        const data = await response.json();


        removeLoadingMessage();


        if (!response.ok || !data.success) {

            throw new Error(
                data.error ||
                data.message ||
                "AI request failed"
            );

        }


        // -----------------------------------------
        // Show AI response
        // -----------------------------------------

        addAssistantMessage(data.reply);


        // -----------------------------------------
        // Speak AI response
        // -----------------------------------------

        speakBengali(data.reply);

    }

    catch (error) {

        removeLoadingMessage();

        console.error(
            "Silpam AI Error:",
            error
        );


        const errorMessage =
            "দুঃখিত, এই মুহূর্তে উত্তর দিতে পারছি না। একটু পরে আবার চেষ্টা করুন।";


        addAssistantMessage(errorMessage);

        speakBengali(errorMessage);

    }

    finally {

        sendButton.disabled = false;

        voiceButton.disabled = false;

        messageInput.focus();

    }

}


// =====================================================
// SEND BUTTON
// =====================================================

sendButton.addEventListener(
    "click",
    sendMessage
);


// =====================================================
// ENTER KEY
// =====================================================

messageInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();

        }

    }
);


// =====================================================
// ADD USER MESSAGE
// =====================================================

function addUserMessage(message) {

    const row =
        document.createElement("div");

    row.className = "user-row";


    row.innerHTML = `

        <div class="message user-message">

            ${escapeHTML(message)}

        </div>

    `;


    chatMessages.appendChild(row);

    scrollToBottom();

}


// =====================================================
// ADD AI MESSAGE
// =====================================================

function addAssistantMessage(message) {

    const row =
        document.createElement("div");

    row.className = "assistant-row";


    row.innerHTML = `

        <span class="message-avatar">
            S
        </span>

        <div class="message assistant-message">

            ${formatResponse(message)}

        </div>

    `;


    chatMessages.appendChild(row);

    scrollToBottom();

}


// =====================================================
// LOADING MESSAGE
// =====================================================

function addLoadingMessage() {

    const row =
        document.createElement("div");

    row.id = "aiLoading";

    row.className = "assistant-row";


    row.innerHTML = `

        <span class="message-avatar">
            S
        </span>

        <div class="message assistant-message">

            Silpam Guru ভাবছে...

        </div>

    `;


    chatMessages.appendChild(row);

    scrollToBottom();

}


// =====================================================
// REMOVE LOADING
// =====================================================

function removeLoadingMessage() {

    const loading =
        document.getElementById("aiLoading");

    if (loading) {

        loading.remove();

    }

}


// =====================================================
// BENGALI TEXT TO SPEECH
// =====================================================

function speakBengali(text) {

    if (!("speechSynthesis" in window)) {

        console.warn(
            "Speech synthesis not supported"
        );

        return;

    }


    // Stop previous speech

    window.speechSynthesis.cancel();


    const cleanText =
        text
            .replace(/[*#_`]/g, "")
            .replace(/\n+/g, " ")
            .trim();


    const speech =
        new SpeechSynthesisUtterance(cleanText);


    speech.lang = "bn-IN";

    speech.rate = 0.9;

    speech.pitch = 1;

    speech.volume = 1;


    // Try to find Bengali voice

    const voices =
        window.speechSynthesis.getVoices();


    const bengaliVoice =
        voices.find(
            voice =>
                voice.lang.toLowerCase() === "bn-in"
        ) ||
        voices.find(
            voice =>
                voice.lang.toLowerCase().startsWith("bn")
        );


    if (bengaliVoice) {

        speech.voice = bengaliVoice;

    }


    speech.onstart = () => {

        voiceStatus.textContent =
            "Silpam Guru উত্তর দিচ্ছে... 🔊";

    };


    speech.onend = () => {

        voiceStatus.textContent =
            "";

    };


    speech.onerror = (event) => {

        console.error(
            "Speech synthesis error:",
            event
        );

        voiceStatus.textContent =
            "";

    };


    window.speechSynthesis.speak(speech);

}


// =====================================================
// FORMAT RESPONSE
// =====================================================

function formatResponse(text) {

    return escapeHTML(text)
        .replace(/\n/g, "<br>");

}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// =====================================================
// SCROLL CHAT
// =====================================================

function scrollToBottom() {

    const chat =
        document.querySelector(
            ".chat-container"
        );

    chat.scrollTop =
        chat.scrollHeight;

}