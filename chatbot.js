// Legal Knowledge Database
const legalDatabase = {

    'en': {
        'greeting': [
            "Hello! I'm your LegalEase assistant. 🤖",
            "I can explain your rights regarding:",
            "• Education • Aadhaar • Ration",
            "• Domestic Violence • Consumer Rights",
            "• Worker Rights • RTI • Healthcare",
            "What would you like to know?"
        ].join('\n'),
        // New General Responses
        'hi': "👋 Hi there! How can I help you today?",
        'hello': "Hello! 😊 How can I assist you with your legal queries?",
        'about': "ℹ LegalEase is a chatbot designed to help you understand your basic rights and important laws in simple language.",
        'program': "💻 This program provides legal awareness and quick references to rights under Indian laws. It's built for educational purposes.",
        'phone': "📞 You can contact our helpline at: 1800-123-456 or email us at: support@legalease.org",

        'right to education': [
            "📚 Right to Education (RTE Act 2009):",
            "- Free education for children aged 6-14",
            "- No admission fees/capitation charges",
            "- 25% seats reserved in private schools for disadvantaged groups",
            "- Complaint to: District Education Officer",
            "- Helpline: 1800-123-123"
        ].join('\n'),
        'domestic violence': [
            "🚨 Domestic Violence (Protection of Women Act 2005):",
            "- Covers physical, emotional, sexual, economic abuse",
            "- Can file complaint at nearest police station",
            "- Protection orders available from Magistrate",
            "- Emergency Helpline: 181 (Women) / 1091 (Police)",
            "- Free legal aid available"
        ].join('\n'),
        'default': [
            "I can explain these rights:",
            "1. Right to Education (type 'education')",
            "2. Domestic Violence Protection ('domestic violence')",
            "3. Worker Rights ('worker rights')",
            "4. Right to Information ('RTI')",
            "5. Healthcare Rights ('healthcare')",
            "Please type your specific query."
        ].join('\n')
    },
    'hi': {
        'greeting': [
            "नमस्ते! मैं LegalEase सहायक हूँ। 🤖",
            "मैं इन विषयों पर जानकारी दे सकता हूँ:",
            "• शिक्षा का अधिकार • आधार • राशन",
            "• घरेलू हिंसा • उपभोक्ता अधिकार",
            "• श्रमिक अधिकार • आरटीआई • स्वास्थ्य",
            "आप क्या जानना चाहेंगे?"
        ].join('\n'),
        // New General Responses
        'hi': "👋 नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?",
        'hello': "नमस्ते! 😊 मैं आपके कानूनी सवालों का जवाब देने के लिए तैयार हूँ।",
        'about': "ℹ LegalEase एक चैटबॉट है जो आपको आपके बुनियादी अधिकार और कानून आसान भाषा में समझाता है।",
        'program': "💻 यह प्रोग्राम कानूनी जागरूकता और भारतीय कानूनों के तहत आपके अधिकारों की जानकारी देने के लिए बनाया गया है।",
        'phone': "📞 हमारी हेल्पलाइन: 1800-123-456, ईमेल: support@legalease.org",


        'right to education': [
            "📚 शिक्षा का अधिकार (आरटीई अधिनियम 2009):",
            "- 6-14 वर्ष के बच्चों को मुफ्त शिक्षा",
            "- कोई प्रवेश शुल्क नहीं",
            "- निजी स्कूलों में 25% सीटें आरक्षित",
            "- शिकायत हेतु: जिला शिक्षा अधिकारी",
            "- हेल्पलाइन: 1800-123-123"
        ].join('\n'),
        'default': "कृपया अपना प्रश्न हिंदी में लिखें। मैं शिक्षा, आधार, राशन, घरेलू हिंसा और श्रमिक अधिकारों के बारे में जानकारी दे सकता हूँ।"
    }
};

// DOM Elements
const chatToggle = document.getElementById('chatbotToggle');
const chatWindow = document.getElementById('chatbotWindow');
const closeBtn = document.getElementById('closeChatbot');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendMessage');
const languageSelect = document.getElementById('languageSelect');
const quickButtons = document.querySelectorAll('.quick-btn');

// Initialize Chat
let currentLanguage = 'en';

function initChat() {
    addBotMessage(legalDatabase[currentLanguage]['greeting']);
}

// Message Handling
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}-message`;
    messageDiv.innerHTML = text.replace(/\n/g, '<br>');
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollTop + 500;
}

function addBotMessage(text) {
    addMessage(text, false);
}

function processUserInput() {
    const query = userInput.value.trim().toLowerCase();
    if (!query) return;

    addMessage(query, true);
    userInput.value = '';

    setTimeout(() => {
        const response = legalDatabase[currentLanguage][query] ||
            legalDatabase[currentLanguage]['default'];
        addBotMessage(response);
    }, 800);
}

// Event Listeners
chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('visible');
    document.getElementById('notificationBadge').textContent = '';
});

closeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('visible');
});

sendBtn.addEventListener('click', processUserInput);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processUserInput();
});

languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    chatMessages.innerHTML = '';
    initChat();
});

quickButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        addMessage(query, true);
        setTimeout(() => {
            addBotMessage(legalDatabase[currentLanguage][query] ||
                legalDatabase[currentLanguage]['default']);
        }, 500);
    });
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initChat);