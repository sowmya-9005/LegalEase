
    // API Base URL - replace with your actual backend endpoint
    const API_BASE_URL = 'https://your-backend-api.com/legalease';
    
    // Current state
    let currentUser = null;
    let currentLanguage = 'en';
    let speechSynthesis = window.speechSynthesis;
    let recognition = null;
    let isSpeaking = false;
    let currentUtterance = null;

    // Language translations (in a real app, these would come from your backend)
    const translations = {
        en: {
            heroTitle: "Know Your Rights, Protect Yourself",
            heroDescription: "LegalEase provides simple, accessible information about your legal rights in multiple languages. Empower yourself with knowledge.",
            searchPlaceholder: "Search for a right (e.g. Right to Education, Domestic Violence)",
            feature1Title: "Simplified Legal Info",
            feature1Desc: "Easy-to-understand explanations of your rights without complex legal jargon.",
            feature2Title: "Multiple Languages",
            feature2Desc: "Available in regional languages to ensure everyone can access the information.",
            feature3Title: "Legal Chatbot",
            feature3Desc: "Get answers to your legal questions instantly with our AI assistant.",
            categoriesTitle: "Browse Rights by Category",
            category1Title: "Women's Rights",
            category2Title: "Worker Rights",
            category3Title: "Consumer Rights",
            category4Title: "Right to Education",
            category5Title: "Right to Information",
            category6Title: "Human Rights",
            emergencyTitle: "Emergency Legal Help",
            emergency1Title: "National Legal Services Authority",
            emergency1Desc: "Free legal aid for eligible citizens",
            emergency2Title: "Women Helpline",
            emergency2Desc: "24/7 support for women in distress",
            emergency3Title: "Child Helpline",
            emergency3Desc: "Help for children in need of care and protection",
            footerAboutTitle: "LegalEase",
            footerAboutDesc: "Empowering citizens with knowledge of their legal rights through simple, accessible information.",
            footerLinksTitle: "Quick Links",
            footerLink1: "Home",
            footerLink2: "Know Your Rights",
            footerLink3: "Emergency Help",
            footerLink4: "About Us",
            footerLink5: "Contact",
            footerResourcesTitle: "Legal Resources",
            footerResource1: "Indian Constitution",
            footerResource2: "Supreme Court Judgments",
            footerResource3: "Legal Aid Clinics",
            footerResource4: "NGO Partners",
            footerContactTitle: "Contact Us",
            copyrightText: "© 2023 LegalEase. All rights reserved.",
            chatbotHeader: "LegalEase Assistant",
            chatbotWelcomeMessage: "Hello! I'm your legal assistant. How can I help you today? You can ask me about your rights, legal procedures, or find relevant contacts.",
            chatbotPlaceholder: "Type your legal question...",
            loginModalTitle: "Login",
            loginEmailLabel: "Email",
            loginPasswordLabel: "Password",
            loginCancelText: "Cancel",
            loginSubmitText: "Login",
            noAccountText: "Don't have an account?",
            signupLinkText: "Sign up",
            signupModalTitle: "Sign Up",
            signupNameLabel: "Full Name",
            signupEmailLabel: "Email",
            signupPasswordLabel: "Password",
            signupPhoneLabel: "Phone Number",
            signupQualificationsLabel: "Qualifications",
            signupSpecializationLabel: "Area of Specialization (if any)",
            signupCancelText: "Cancel",
            signupSubmitText: "Submit Application",
            haveAccountText: "Already have an account?",
            loginLinkText: "Login",
            readAloudText: "Read Aloud",
            stopReadingText: "Stop",
            printContentText: "Print"
        },
        hi: {
            heroTitle: "अपने अधिकार जानें, अपनी सुरक्षा करें",
            heroDescription: "LegalEase कई भाषाओं में आपके कानूनी अधिकारों के बारे में सरल, सुलभ जानकारी प्रदान करता है। ज्ञान से स्वयं को सशक्त बनाएं।",
            searchPlaceholder: "किसी अधिकार के लिए खोजें (जैसे शिक्षा का अधिकार, घरेलू हिंसा)",
            feature1Title: "सरलीकृत कानूनी जानकारी",
            feature1Desc: "जटिल कानूनी शब्दजाल के बिना आपके अधिकारों की समझने में आसान व्याख्या।",
            feature2Title: "कई भाषाएं",
            feature2Desc: "यह सुनिश्चित करने के लिए क्षेत्रीय भाषाओं में उपलब्ध है कि हर कोई जानकारी तक पहुंच सके।",
            feature3Title: "कानूनी चैटबॉट",
            feature3Desc: "हमारे AI सहायक के साथ तुरंत अपने कानूनी प्रश्नों के उत्तर प्राप्त करें।",
            categoriesTitle: "श्रेणी के अनुसार अधिकार ब्राउज़ करें",
            category1Title: "महिलाओं के अधिकार",
            category2Title: "श्रमिक अधिकार",
            category3Title: "उपभोक्ता अधिकार",
            category4Title: "शिक्षा का अधिकार",
            category5Title: "सूचना का अधिकार",
            category6Title: "मानव अधिकार",
            emergencyTitle: "आपातकालीन कानूनी सहायता",
            emergency1Title: "राष्ट्रीय विधिक सेवा प्राधिकरण",
            emergency1Desc: "पात्र नागरिकों के लिए निःशुल्क कानूनी सहायता",
            emergency2Title: "महिला हेल्पलाइन",
            emergency2Desc: "संकट में महिलाओं के लिए 24/7 सहायता",
            emergency3Title: "चाइल्ड हेल्पलाइन",
            emergency3Desc: "देखभाल और सुरक्षा की आवश्यकता वाले बच्चों के लिए सहायता",
            footerAboutTitle: "LegalEase",
            footerAboutDesc: "सरल, सुलभ जानकारी के माध्यम से नागरिकों को उनके कानूनी अधिकारों का ज्ञान प्रदान करना।",
            footerLinksTitle: "त्वरित लिंक",
            footerLink1: "होम",
            footerLink2: "अपने अधिकार जानें",
            footerLink3: "आपातकालीन सहायता",
            footerLink4: "हमारे बारे में",
            footerLink5: "संपर्क करें",
            footerResourcesTitle: "कानूनी संसाधन",
            footerResource1: "भारतीय संविधान",
            footerResource2: "सुप्रीम कोर्ट के निर्णय",
            footerResource3: "कानूनी सहायता क्लिनिक",
            footerResource4: "एनजीओ पार्टनर्स",
            footerContactTitle: "हमसे संपर्क करें",
            copyrightText: "© 2023 LegalEase. सर्वाधिकार सुरक्षित।",
            chatbotHeader: "LegalEase सहायक",
            chatbotWelcomeMessage: "नमस्ते! मैं आपका कानूनी सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ? आप मुझसे अपने अधिकारों, कानूनी प्रक्रियाओं या प्रासंगिक संपर्कों के बारे में पूछ सकते हैं।",
            chatbotPlaceholder: "अपना कानूनी प्रश्न टाइप करें...",
            loginModalTitle: "लॉग इन",
            loginEmailLabel: "ईमेल",
            loginPasswordLabel: "पासवर्ड",
            loginCancelText: "रद्द करें",
            loginSubmitText: "लॉग इन",
            noAccountText: "खाता नहीं है?",
            signupLinkText: "साइन अप करें",
            signupModalTitle: "साइन अप",
            signupNameLabel: "पूरा नाम",
            signupEmailLabel: "ईमेल",
            signupPasswordLabel: "पासवर्ड",
            signupPhoneLabel: "फोन नंबर",
            signupQualificationsLabel: "योग्यताएं",
            signupSpecializationLabel: "विशेषज्ञता का क्षेत्र (यदि कोई हो)",
            signupCancelText: "रद्द करें",
            signupSubmitText: "आवेदन जमा करें",
            haveAccountText: "पहले से ही एक खाता है?",
            loginLinkText: "लॉग इन",
            readAloudText: "जोर से पढ़ें",
            stopReadingText: "रोकें",
            printContentText: "प्रिंट करें"
        },
        bn: {
            heroTitle: "আপনার অধিকার জানুন, নিজেকে রক্ষা করুন",
            heroDescription: "LegalEase একাধিক ভাষায় আপনার আইনি অধিকার সম্পর্কে সহজ, অ্যাক্সেসযোগ্য তথ্য প্রদান করে। জ্ঞানের মাধ্যমে নিজেকে ক্ষমতায়িত করুন।",
            searchPlaceholder: "একটি অধিকারের জন্য অনুসন্ধান করুন (যেমন শিক্ষার অধিকার, গার্হস্থ্য সহিংসতা)",
            feature1Title: "সরলীকৃত আইনি তথ্য",
            feature1Desc: "জটিল আইনি শব্দজাল ছাড়াই আপনার অধিকারগুলির বোধগম্য ব্যাখ্যা।",
            feature2Title: "একাধিক ভাষা",
            feature2Desc: "আঞ্চলিক ভাষায় উপলব্ধ নিশ্চিত করতে যে সবাই তথ্য অ্যাক্সেস করতে পারে।",
            feature3Title: "আইনি চ্যাটবট",
            feature3Desc: "আমাদের AI সহকারীর সাথে তাত্ক্ষণিকভাবে আপনার আইনি প্রশ্নের উত্তর পান।",
            categoriesTitle: "বিভাগ অনুযায়ী অধিকার ব্রাউজ করুন",
            category1Title: "নারী অধিকার",
            category2Title: "শ্রমিক অধিকার",
            category3Title: "ভোক্তা অধিকার",
            category4Title: "শিক্ষার অধিকার",
            category5Title: "তথ্যের অধিকার",
            category6Title: "মানবাধিকার",
            emergencyTitle: "জরুরী আইনি সহায়তা",
            emergency1Title: "জাতীয় আইনি পরিষেবা কর্তৃপক্ষ",
            emergency1Desc: "যোগ্য নাগরিকদের জন্য বিনামূল্যে আইনি সহায়তা",
            emergency2Title: "মহিলা হেল্পলাইন",
            emergency2Desc: "সংকটাপন্ন মহিলাদের জন্য 24/7 সহায়তা",
            emergency3Title: "শিশু হেল্পলাইন",
            emergency3Desc: "যত্ন ও সুরক্ষার প্রয়োজনীয় শিশুদের জন্য সহায়তা",
            footerAboutTitle: "LegalEase",
            footerAboutDesc: "সহজ, অ্যাক্সেসযোগ্য তথ্যের মাধ্যমে নাগরিকদের তাদের আইনি অধিকার সম্পর্কে জ্ঞান দিয়ে ক্ষমতায়িত করা।",
            footerLinksTitle: "দ্রুত লিঙ্ক",
            footerLink1: "হোম",
            footerLink2: "আপনার অধিকার জানুন",
            footerLink3: "জরুরী সহায়তা",
            footerLink4: "আমাদের সম্পর্কে",
            footerLink5: "যোগাযোগ",
            footerResourcesTitle: "আইনি সম্পদ",
            footerResource1: "ভারতীয় সংবিধান",
            footerResource2: "সুপ্রিম কোর্টের রায়",
            footerResource3: "আইনি সহায়তা ক্লিনিক",
            footerResource4: "এনজিও অংশীদার",
            footerContactTitle: "যোগাযোগ করুন",
            copyrightText: "© 2023 LegalEase. সর্বস্বত্ব সংরক্ষিত।",
            chatbotHeader: "LegalEase সহকারী",
            chatbotWelcomeMessage: "হ্যালো! আমি আপনার আইনি সহকারী। আজ আমি আপনাকে কিভাবে সাহায্য করতে পারি? আপনি আমাকে আপনার অধিকার, আইনি পদ্ধতি বা প্রাসঙ্গিক পরিচিতি সম্পর্কে জিজ্ঞাসা করতে পারেন।",
            chatbotPlaceholder: "আপনার আইনি প্রশ্ন টাইপ করুন...",
            loginModalTitle: "লগইন",
            loginEmailLabel: "ইমেইল",
            loginPasswordLabel: "পাসওয়ার্ড",
            loginCancelText: "বাতিল",
            loginSubmitText: "লগইন",
            noAccountText: "একটি অ্যাকাউন্ট নেই?",
            signupLinkText: "সাইন আপ",
            signupModalTitle: "সাইন আপ",
            signupNameLabel: "পূর্ণ নাম",
            signupEmailLabel: "ইমেইল",
            signupPasswordLabel: "পাসওয়ার্ড",
            signupPhoneLabel: "ফোন নম্বর",
            signupQualificationsLabel: "যোগ্যতা",
            signupSpecializationLabel: "বিশেষীকরণের ক্ষেত্র (যদি থাকে)",
            signupCancelText: "বাতিল",
            signupSubmitText: "আবেদন জমা দিন",
            haveAccountText: "ইতিমধ্যে একটি অ্যাকাউন্ট আছে?",
            loginLinkText: "লগইন",
            readAloudText: "জোরে পড়ুন",
            stopReadingText: "বন্ধ করুন",
            printContentText: "প্রিন্ট করুন"
        },
        ta: {
            heroTitle: "உங்கள் உரிமைகளை அறிந்து கொள்ளுங்கள், உங்களைப் பாதுகாத்துக் கொள்ளுங்கள்",
            heroDescription: "LegalEase பல மொழிகளில் உங்கள் சட்ட உரிமைகள் பற்றிய எளிய, அணுகக்கூடிய தகவல்களை வழங்குகிறது. அறிவின் மூலம் உங்களை சக்திவாய்ந்தவராக மாற்றுங்கள்.",
            searchPlaceholder: "ஒரு உரிமைக்காக தேடவும் (எ.கா கல்வி உரிமை, குடும்ப வன்முறை)",
            feature1Title: "எளிமைப்படுத்தப்பட்ட சட்ட தகவல்",
            feature1Desc: "சிக்கலான சட்ட வார்த்தைகள் இல்லாமல் உங்கள் உரிமைகளை புரிந்துகொள்வதற்கான எளிய விளக்கங்கள்.",
            feature2Title: "பல மொழிகள்",
            feature2Desc: "பிராந்திய மொழிகளில் கிடைக்கிறது, அனைவரும் தகவல்களை அணுக முடியும் என்பதை உறுதி செய்கிறது.",
            feature3Title: "சட்ட சாட்பாட்",
            feature3Desc: "எங்கள் AI உதவியாளருடன் உங்கள் சட்ட கேள்விகளுக்கு உடனடியாக பதில்களைப் பெறுங்கள்.",
            categoriesTitle: "வகை வாரியாக உரிமைகளை உலாவுக",
            category1Title: "பெண்களின் உரிமைகள்",
            category2Title: "தொழிலாளர் உரிமைகள்",
            category3Title: "நுகர்வோர் உரிமைகள்",
            category4Title: "கல்வி உரிமை",
            category5Title: "தகவல் உரிமை",
            category6Title: "மனித உரிமைகள்",
            emergencyTitle: "அவசர சட்ட உதவி",
            emergency1Title: "தேசிய சட்ட சேவைகள் ஆணையம்",
            emergency1Desc: "தகுதியுள்ள குடிமக்களுக்கு இலவச சட்ட உதவி",
            emergency2Title: "பெண்கள் உதவி எண்",
            emergency2Desc: "பாதிக்கப்பட்ட பெண்களுக்கு 24/7 ஆதரவு",
            emergency3Title: "குழந்தைகள் உதவி எண்",
            emergency3Desc: "பராமரிப்பு மற்றும் பாதுகாப்பு தேவைப்படும் குழந்தைகளுக்கு உதவி",
            footerAboutTitle: "LegalEase",
            footerAboutDesc: "எளிய, அணுகக்கூடிய தகவல்கள் மூலம் குடிமக்களுக்கு அவர்களின் சட்ட உரிமைகள் பற்றிய அறிவை வழங்குதல்.",
            footerLinksTitle: "விரைவு இணைப்புகள்",
            footerLink1: "முகப்பு",
            footerLink2: "உங்கள் உரிமைகளை அறிந்து கொள்ளுங்கள்",
            footerLink3: "அவசர உதவி",
            footerLink4: "எங்களைப் பற்றி",
            footerLink5: "தொடர்பு கொள்ளவும்",
            footerResourcesTitle: "சட்ட வளங்கள்",
            footerResource1: "இந்திய அரசியலமைப்பு",
            footerResource2: "உயர் நீதிமன்ற தீர்ப்புகள்",
            footerResource3: "சட்ட உதவி மையங்கள்",
            footerResource4: "தன்னார்வ அமைப்புகள்",
            footerContactTitle: "எங்களைத் தொடர்பு கொள்ளவும்",
            copyrightText: "© 2023 LegalEase. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
            chatbotHeader: "LegalEase உதவியாளர்",
            chatbotWelcomeMessage: "வணக்கம்! நான் உங்கள் சட்ட உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்? உங்கள் உரிமைகள், சட்ட நடைமுறைகள் அல்லது தொடர்புடைய தொடர்புகளைப் பற்றி என்னிடம் கேட்கலாம்.",
            chatbotPlaceholder: "உங்கள் சட்ட கேள்வியை தட்டச்சு செய்க...",
            loginModalTitle: "உள்நுழைய",
            loginEmailLabel: "மின்னஞ்சல்",
            loginPasswordLabel: "கடவுச்சொல்",
            loginCancelText: "ரத்து செய்",
            loginSubmitText: "உள்நுழைய",
            noAccountText: "கணக்கு இல்லையா?",
            signupLinkText: "பதிவு செய்க",
            signupModalTitle: "பதிவு செய்க",
            signupNameLabel: "முழு பெயர்",
            signupEmailLabel: "மின்னஞ்சல்",
            signupPasswordLabel: "கடவுச்சொல்",
            signupPhoneLabel: "தொலைபேசி எண்",
            signupQualificationsLabel: "தகுதிகள்",
            signupSpecializationLabel: "சிறப்புப் பகுதி (ஏதேனும் இருந்தால்)",
            signupCancelText: "ரத்து செய்",
            signupSubmitText: "விண்ணப்பத்தை சமர்ப்பிக்கவும்",
            haveAccountText: "ஏற்கனவே கணக்கு உள்ளதா?",
            loginLinkText: "உள்நுழைய",
            readAloudText: "உரத்து வாசிக்க",
            stopReadingText: "நிறுத்து",
            printContentText: "அச்சிடு"
        },
        te: {
            heroTitle: "మీ హక్కులను తెలుసుకోండి, మిమ్మల్ని మీరు రక్షించుకోండి",
            heroDescription: "LegalEase బహుళ భాషల్లో మీ చట్టపరమైన హక్కుల గురించి సరళమైన, ప్రాప్యత కలిగిన సమాచారాన్ని అందిస్తుంది. జ్ఞానంతో మిమ్మల్ని శక్తివంతం చేసుకోండి.",
            searchPlaceholder: "ఒక హక్కు కోసం శోధించండి (ఉదా. విద్య హక్కు, ఇంటి దారుణాలు)",
            feature1Title: "సరళీకృత చట్టపరమైన సమాచారం",
            feature1Desc: "సంక్లిష్టమైన చట్టపరమైన పదజాలం లేకుండా మీ హక్కులను అర్థం చేసుకోవడానికి సులభమైన వివరణలు.",
            feature2Title: "బహుళ భాషలు",
            feature2Desc: "ప్రాంతీయ భాషల్లో అందుబాటులో ఉంటుంది, ప్రతి ఒక్కరూ సమాచారాన్ని యాక్సెస్ చేయగలరని నిర్ధారిస్తుంది.",
            feature3Title: "చట్టపరమైన చాట్‌బాట్",
            feature3Desc: "మా AI సహాయకుడితో మీ చట్టపరమైన ప్రశ్నలకు తక్షణమే సమాధానాలు పొందండి.",
            categoriesTitle: "వర్గం ప్రకారం హక్కులను బ్రౌజ్ చేయండి",
            category1Title: "మహిళల హక్కులు",
            category2Title: "కార్మికుల హక్కులు",
            category3Title: "గ్రాహకుల హక్కులు",
            category4Title: "విద్య హక్కు",
            category5Title: "సమాచార హక్కు",
            category6Title: "మానవ హక్కులు",
            emergencyTitle: "అత్యవసర చట్టపరమైన సహాయం",
            emergency1Title: "జాతీయ లీగల్ సర్వీసెస్ అథారిటీ",
            emergency1Desc: "అర్హులైన పౌరులకు ఉచిత చట్టపరమైన సహాయం",
            emergency2Title: "మహిళల హెల్ప్‌లైన్",
            emergency2Desc: "కష్టంలో ఉన్న మహిళలకు 24/7 మద్దతు",
            emergency3Title: "చైల్డ్ హెల్ప్‌లైన్",
            emergency3Desc: "సంరక్షణ మరియు రక్షణ అవసరమైన పిల్లలకు సహాయం",
            footerAboutTitle: "LegalEase",
            footerAboutDesc: "సరళమైన, ప్రాప్యత కలిగిన సమాచారం ద్వారా పౌరులకు వారి చట్టపరమైన హక్కుల గురించి జ్ఞానాన్ని అందించడం.",
            footerLinksTitle: "త్వరిత లింకులు",
            footerLink1: "హోమ్",
            footerLink2: "మీ హక్కులను తెలుసుకోండి",
            footerLink3: "అత్యవసర సహాయం",
            footerLink4: "మా గురించి",
            footerLink5: "సంప్రదించండి",
            footerResourcesTitle: "చట్టపరమైన వనరులు",
            footerResource1: "భారత రాజ్యాంగం",
            footerResource2: "సుప్రీం కోర్టు తీర్పులు",
            footerResource3: "లీగల్ ఎయిడ్ క్లినిక్‌లు",
            footerResource4: "NGO భాగస్వాములు",
            footerContactTitle: "మమ్మల్ని సంప్రదించండి",
            copyrightText: "© 2023 LegalEase. అన్ని హక్కులు ప్రత్యేకించబడినవి.",
            chatbotHeader: "LegalEase సహాయకుడు",
            chatbotWelcomeMessage: "హలో! నేను మీ చట్టపరమైన సహాయకుడిని. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను? మీరు మీ హక్కులు, చట్టపరమైన విధానాలు లేదా సంబంధిత సంప్రదింపుల గురించి నన్ను అడగవచ్చు.",
            chatbotPlaceholder: "మీ చట్టపరమైన ప్రశ్నను టైప్ చేయండి...",
            loginModalTitle: "లాగిన్",
            loginEmailLabel: "ఇమెయిల్",
            loginPasswordLabel: "పాస్‌వర్డ్",
            loginCancelText: "రద్దు చేయి",
            loginSubmitText: "లాగిన్",
            noAccountText: "ఖాతా లేదు?",
            signupLinkText: "సైన్ అప్",
            signupModalTitle: "సైన్ అప్",
            signupNameLabel: "పూర్తి పేరు",
            signupEmailLabel: "ఇమెయిల్",
            signupPasswordLabel: "పాస్‌వర్డ్",
            signupPhoneLabel: "ఫోన్ నంబర్",
            signupQualificationsLabel: "అర్హతలు",
            signupSpecializationLabel: "స్పెషలైజేషన్ ప్రాంతం (ఏదైనా ఉంటే)",
            signupCancelText: "రద్దు చేయి",
            signupSubmitText: "అప్లికేషన్ సమర్పించండి",
            haveAccountText: "ఇప్పటికే ఖాతా ఉందా?",
            loginLinkText: "లాగిన్",
            readAloudText: "బిగ్గరగా చదవండి",
            stopReadingText: "ఆపు",
            printContentText: "ప్రింట్ చేయండి"
        }
    };

    // Sample content data (in a real app, this would come from your backend)
    const contentData = {
        "womens-rights": {
            en: {
                title: "Women's Rights in India",
                content: `
                    <p>Women in India are protected by various laws that ensure their safety, equality, and dignity. These rights are fundamental to creating a just society.</p>
                    <h3>Key Rights:</h3>
                    <ul>
                        <li>Right to equality and non-discrimination</li>
                        <li>Protection from domestic violence</li>
                        <li>Right to equal pay for equal work</li>
                        <li>Protection from sexual harassment at workplace</li>
                        <li>Right to property and inheritance</li>
                    </ul>
                `,
                scenarios: [
                    {
                        title: "Domestic Violence Case",
                        scenario_description: "A woman is being physically abused by her husband.",
                        legal_action: "She can file a complaint under the Protection of Women from Domestic Violence Act, 2005."
                    },
                    {
                        title: "Workplace Harassment",
                        scenario_description: "A female employee is facing inappropriate comments from her boss.",
                        legal_action: "She can report to the Internal Complaints Committee under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013."
                    }
                ],
                laws: [
                    { name: "Protection of Women from Domestic Violence Act", year: "2005" },
                    { name: "Sexual Harassment of Women at Workplace Act", year: "2013" },
                    { name: "Dowry Prohibition Act", year: "1961" }
                ],
                contacts: [
                    { organization_name: "National Commission for Women", primary_number: "7827170170" },
                    { organization_name: "Women Helpline", primary_number: "181" }
                ]
            },
            hi: {
                title: "भारत में महिलाओं के अधिकार",
                content: `
                    <p>भारत में महिलाएं विभिन्न कानूनों द्वारा संरक्षित हैं जो उनकी सुरक्षा, समानता और गरिमा सुनिश्चित करते हैं। ये अधिकार एक न्यायपूर्ण समाज बनाने के लिए मौलिक हैं।</p>
                    <h3>मुख्य अधिकार:</h3>
                    <ul>
                        <li>समानता और गैर-भेदभाव का अधिकार</li>
                        <li>घरेलू हिंसा से सुरक्षा</li>
                        <li>समान कार्य के लिए समान वेतन का अधिकार</li>
                        <li>कार्यस्थल पर यौन उत्पीड़न से सुरक्षा</li>
                        <li>संपत्ति और विरासत का अधिकार</li>
                    </ul>
                `,
                scenarios: [
                    {
                        title: "घरेलू हिंसा का मामला",
                        scenario_description: "एक महिला को उसके पति द्वारा शारीरिक रूप से प्रताड़ित किया जा रहा है।",
                        legal_action: "वह घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम, 2005 के तहत शिकायत दर्ज करा सकती है।"
                    },
                    {
                        title: "कार्यस्थल पर उत्पीड़न",
                        scenario_description: "एक महिला कर्मचारी को अपने बॉस से अनुचित टिप्पणियों का सामना करना पड़ रहा है।",
                        legal_action: "वह कार्यस्थल पर महिलाओं का यौन उत्पीड़न (निवारण, निषेध और निवारण) अधिनियम, 2013 के तहत आंतरिक शिकायत समिति को रिपोर्ट कर सकती है।"
                    }
                ],
                laws: [
                    { name: "घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम", year: "2005" },
                    { name: "कार्यस्थल पर महिलाओं का यौन उत्पीड़न अधिनियम", year: "2013" },
                    { name: "दहेज निषेध अधिनियम", year: "1961" }
                ],
                contacts: [
                    { organization_name: "राष्ट्रीय महिला आयोग", primary_number: "7827170170" },
                    { organization_name: "महिला हेल्पलाइन", primary_number: "181" }
                ]
            },
            bn: {
                title: "ভারতে মহিলাদের অধিকার",
                content: `
                    <p>ভারতে মহিলারা বিভিন্ন আইন দ্বারা সুরক্ষিত যারা তাদের নিরাপত্তা, সমতা এবং মর্যাদা নিশ্চিত করে। এই অধিকারগুলি একটি ন্যায়সঙ্গত সমাজ গঠনের জন্য মৌলিক।</p>
                    <h3>প্রধান অধিকার:</h3>
                    <ul>
                        <li>সমতা এবং বৈষম্যহীনতার অধিকার</li>
                        <li>গার্হস্থ্য সহিংসতা থেকে সুরক্ষা</li>
                        <li>সমান কাজের জন্য সমান বেতনের অধিকার</li>
                        <li>কর্মক্ষেত্রে যৌন হয়রানি থেকে সুরক্ষা</li>
                        <li>সম্পত্তি এবং উত্তরাধিকারের অধিকার</li>
                    </ul>
                `,
                scenarios: [
                    {
                        title: "গার্হস্থ্য সহিংসতা মামলা",
                        scenario_description: "একজন মহিলা তার স্বামীর দ্বারা শারীরিকভাবে নির্যাতিত হচ্ছেন।",
                        legal_action: "তিনি গার্হস্থ্য সহিংসতা থেকে মহিলাদের সুরক্ষা আইন, 2005 এর অধীনে একটি অভিযোগ দায়ের করতে পারেন।"
                    },
                    {
                        title: "কর্মক্ষেত্রে হয়রানি",
                        scenario_description: "একজন মহিলা কর্মী তার বসের কাছ থেকে অনুপযুক্ত মন্তব্যের সম্মুখীন হচ্ছেন।",
                        legal_action: "তিনি কর্মক্ষেত্রে মহিলাদের যৌন হয়রানি (প্রতিরোধ, নিষেধাজ্ঞা এবং প্রতিকার) আইন, 2013 এর অধীনে অভ্যন্তরীণ অভিযোগ কমিটিতে রিপোর্ট করতে পারেন।"
                    }
                ],
                laws: [
                    { name: "গার্হস্থ্য সহিংসতা থেকে মহিলাদের সুরক্ষা আইন", year: "2005" },
                    { name: "কর্মক্ষেত্রে মহিলাদের যৌন হয়রানি আইন", year: "2013" },
                    { name: "দहेজ নিষিদ্ধকরণ আইন", year: "1961" }
                ],
                contacts: [
                    { organization_name: "জাতীয় মহিলা কমিশন", primary_number: "7827170170" },
                    { organization_name: "মহিলা হেল্পলাইন", primary_number: "181" }
                ]
            },
            ta: {
                title: "இந்தியாவில் பெண்களின் உரிமைகள்",
                content: `
                    <p>இந்தியாவில் பெண்கள் பல்வேறு சட்டங்களால் பாதுகாக்கப்படுகிறார்கள், அவை அவர்களின் பாதுகாப்பு, சமத்துவம் மற்றும் கண்ணியத்தை உறுதி செய்கின்றன. இந்த உரிமைகள் ஒரு நியாயமான சமூகத்தை உருவாக்குவதற்கு அடிப்படையானவை.</p>
                    <h3>முக்கிய உரிமைகள்:</h3>
                    <ul>
                        <li>சமத்துவம் மற்றும் பாகுபாடு இல்லாத உரிமை</li>
                        <li>வீட்டு வன்முறையிலிருந்து பாதுகாப்பு</li>
                        <li>சமமான வேலைக்கு சமமான ஊதியம் பெறும் உரிமை</li>
                        <li>பணியிடத்தில் பாலியல் துன்புறுத்தலிலிருந்து பாதுகாப்பு</li>
                        <li>சொத்து மற்றும் பரம்பரை உரிமை</li>
                    </ul>
                `,
                scenarios: [
                    {
                        title: "வீட்டு வன்முறை வழக்கு",
                        scenario_description: "ஒரு பெண் அவரது கணவனால் உடல் ரீதியாக துன்புறுத்தப்படுகிறார்.",
                        legal_action: "அவர் 2005 ஆம் ஆண்டின் வீட்டு வன்முறையிலிருந்து பெண்களின் பாதுகாப்பு சட்டத்தின் கீழ் புகார் செய்யலாம்."
                    },
                    {
                        title: "பணியிட துன்புறுத்தல்",
                        scenario_description: "ஒரு பெண் பணியாளர் அவரது மேலாளரிடமிருந்து பொருத்தமற்ற கருத்துகளை எதிர்கொள்கிறார்.",
                        legal_action: "பணியிடத்தில் பெண்களின் பாலியல் துன்புறுத்தல் (தடுப்பு, தடை மற்றும் தீர்வு) சட்டம், 2013 இன் கீழ் உள் புகார் குழுவிடம் புகார் செய்யலாம்."
                    }
                ],
                laws: [
                    { name: "வீட்டு வன்முறையிலிருந்து பெண்களின் பாதுகாப்பு சட்டம்", year: "2005" },
                    { name: "பணியிடத்தில் பெண்களின் பாலியல் துன்புறுத்தல் சட்டம்", year: "2013" },
                    { name: "வரதட்சணை தடைச் சட்டம்", year: "1961" }
                ],
                contacts: [
                    { organization_name: "தேசிய பெண்கள் ஆணையம்", primary_number: "7827170170" },
                    { organization_name: "பெண்கள் உதவி எண்", primary_number: "181" }
                ]
            },
            te: {
                title: "భారతదేశంలో మహిళల హక్కులు",
                content: `
                    <p>భారతదేశంలో మహిళలు వివిధ చట్టాల ద్వారా రక్షించబడతారు, అవి వారి భద్రత, సమానత్వం మరియు గౌరవాన్ని నిర్ధారిస్తాయి. ఈ హక్కులు న్యాయమైన సమాజాన్ని సృష్టించడానికి మూలభూతమైనవి.</p>
                    <h3>ప్రధాన హక్కులు:</h3>
                    <ul>
                        <li>సమానత్వం మరియు వివక్ష లేకుండా హక్కు</li>
                        <li>గృహహింస నుండి రక్షణ</li>
                        <li>సమాన పనికి సమాన వేతనం హక్కు</li>
                        <li>పనిస్థలంలో లైంగిక వేధింపుల నుండి రక్షణ</li>
                        <li>ఆస్తి మరియు వారసత్వ హక్కు</li>
                    </ul>
                `,
                scenarios: [
                    {
                        title: "గృహహింస కేసు",
                        scenario_description: "ఒక మహిళ తన భర్త చేత శారీరకంగా హింసించబడుతుంది.",
                        legal_action: "ఆమె 2005లో గృహహింస నుండి మహిళల రక్షణ చట్టం కింద ఫిర్యాదు చేయవచ్చు."
                    },
                    {
                        title: "పనిస్థల వేధింపులు",
                        scenario_description: "ఒక మహిళా ఉద్యోగి తన బాస్ నుండి తగని వ్యాఖ్యలను ఎదుర్కొంటోంది.",
                        legal_action: "ఆమె పనిస్థలంలో మహిళలపై లైంగిక వేధింపులు (నివారణ, నిషేధం మరియు పరిష్కారం) చట్టం, 2013 కింద అంతర్గత ఫిర్యాదు కమిటీకి నివేదించవచ్చు."
                    }
                ],
                laws: [
                    { name: "గృహహింస నుండి మహిళల రక్షణ చట్టం", year: "2005" },
                    { name: "పనిస్థలంలో మహిళలపై లైంగిక వేధింపులు చట్టం", year: "2013" },
                    { name: "వరకట్న నిషేధ చట్టం", year: "1961" }
                ],
                contacts: [
                    { organization_name: "జాతీయ మహిళా కమిషన్", primary_number: "7827170170" },
                    { organization_name: "మహిళల హెల్ప్‌లైన్", primary_number: "181" }
                ]
            }
        },
        // Similar content for other categories would go here
    };

    document.addEventListener('DOMContentLoaded', function() {
        // Check for authentication token
        const token = localStorage.getItem('legalease_token');
        if (token) {
            verifyToken(token);
        }
        
        // Initialize language selector
        const languageSelector = document.getElementById('languageSelector');
        languageSelector.value = currentLanguage;
        languageSelector.addEventListener('change', function() {
            currentLanguage = this.value;
            loadContentForLanguage();
        });
        
        // Initialize all functionality
        initChatbot();
        initModals();
        initCategoryCards();
        initSearch();
        initNavigation();
        initVoiceControls();
        initContentControls();
        
        // Load initial content
        loadContentForLanguage();
    });

    // ======================
    // Language and Voice Functions
    // ======================
    
    function loadContentForLanguage() {
        // Update all translatable elements
        const langData = translations[currentLanguage] || translations.en;
        
        // Update UI elements
        document.getElementById('heroTitle').textContent = langData.heroTitle;
        document.getElementById('heroDescription').textContent = langData.heroDescription;
        document.getElementById('searchInput').placeholder = langData.searchPlaceholder;
        
        // Features
        document.getElementById('feature1Title').textContent = langData.feature1Title;
        document.getElementById('feature1Desc').textContent = langData.feature1Desc;
        document.getElementById('feature2Title').textContent = langData.feature2Title;
        document.getElementById('feature2Desc').textContent = langData.feature2Desc;
        document.getElementById('feature3Title').textContent = langData.feature3Title;
        document.getElementById('feature3Desc').textContent = langData.feature3Desc;
        
        // Categories
        document.getElementById('categoriesTitle').textContent = langData.categoriesTitle;
        document.getElementById('category1Title').textContent = langData.category1Title;
        document.getElementById('category2Title').textContent = langData.category2Title;
        document.getElementById('category3Title').textContent = langData.category3Title;
        document.getElementById('category4Title').textContent = langData.category4Title;
        document.getElementById('category5Title').textContent = langData.category5Title;
        document.getElementById('category6Title').textContent = langData.category6Title;
        
        // Emergency section
        document.getElementById('emergencyTitle').textContent = langData.emergencyTitle;
        document.getElementById('emergency1Title').textContent = langData.emergency1Title;
        document.getElementById('emergency1Desc').textContent = langData.emergency1Desc;
        document.getElementById('emergency2Title').textContent = langData.emergency2Title;
        document.getElementById('emergency2Desc').textContent = langData.emergency2Desc;
        document.getElementById('emergency3Title').textContent = langData.emergency3Title;
        document.getElementById('emergency3Desc').textContent = langData.emergency3Desc;
        
        // Footer
        document.getElementById('footerAboutTitle').textContent = langData.footerAboutTitle;
        document.getElementById('footerAboutDesc').textContent = langData.footerAboutDesc;
        document.getElementById('footerLinksTitle').textContent = langData.footerLinksTitle;
        document.getElementById('footerLink1').textContent = langData.footerLink1;
        document.getElementById('footerLink2').textContent = langData.footerLink2;
        document.getElementById('footerLink3').textContent = langData.footerLink3;
        document.getElementById('footerLink4').textContent = langData.footerLink4;
        document.getElementById('footerLink5').textContent = langData.footerLink5;
        document.getElementById('footerResourcesTitle').textContent = langData.footerResourcesTitle;
        document.getElementById('footerResource1').textContent = langData.footerResource1;
        document.getElementById('footerResource2').textContent = langData.footerResource2;
        document.getElementById('footerResource3').textContent = langData.footerResource3;
        document.getElementById('footerResource4').textContent = langData.footerResource4;
        document.getElementById('footerContactTitle').textContent = langData.footerContactTitle;
        document.getElementById('copyrightText').textContent = langData.copyrightText;
        
        // Chatbot
        document.getElementById('chatbotHeader').textContent = langData.chatbotHeader;
        document.getElementById('chatbotWelcomeMessage').textContent = langData.chatbotWelcomeMessage;
        document.getElementById('chatbotInput').placeholder = langData.chatbotPlaceholder;
        
        // Modals
        document.getElementById('loginModalTitle').textContent = langData.loginModalTitle;
        document.getElementById('loginEmailLabel').textContent = langData.loginEmailLabel;
        document.getElementById('loginPasswordLabel').textContent = langData.loginPasswordLabel;
        document.getElementById('loginCancelText').textContent = langData.loginCancelText;
        document.getElementById('loginSubmitText').textContent = langData.loginSubmitText;
        document.getElementById('noAccountText').textContent = langData.noAccountText;
        document.getElementById('signupLinkText').textContent = langData.signupLinkText;
        
        document.getElementById('signupModalTitle').textContent = langData.signupModalTitle;
        document.getElementById('signupNameLabel').textContent = langData.signupNameLabel;
        document.getElementById('signupEmailLabel').textContent = langData.signupEmailLabel;
        document.getElementById('signupPasswordLabel').textContent = langData.signupPasswordLabel;
        document.getElementById('signupPhoneLabel').textContent = langData.signupPhoneLabel;
        document.getElementById('signupQualificationsLabel').textContent = langData.signupQualificationsLabel;
        document.getElementById('signupSpecializationLabel').textContent = langData.signupSpecializationLabel;
        document.getElementById('signupCancelText').textContent = langData.signupCancelText;
        document.getElementById('signupSubmitText').textContent = langData.signupSubmitText;
        document.getElementById('haveAccountText').textContent = langData.haveAccountText;
        document.getElementById('loginLinkText').textContent = langData.loginLinkText;
        
        // Content controls
        document.getElementById('readAloudBtn').innerHTML = `<i class="fas fa-volume-up"></i> ${langData.readAloudText}`;
        document.getElementById('stopReadingBtn').innerHTML = `<i class="fas fa-stop"></i> ${langData.stopReadingText}`;
        document.getElementById('printContentBtn').innerHTML = `<i class="fas fa-print"></i> ${langData.printContentText}`;
    }

    function initVoiceControls() {
        const listenBtn = document.getElementById('listenBtn');
        const stopListenBtn = document.getElementById('stopListenBtn');
        
        // Check if browser supports speech recognition
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            listenBtn.style.display = 'none';
            return;
        }
        
        // Initialize speech recognition
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;
        recognition.interimResults = false;
        
        // Set language based on current selection
        recognition.lang = getSpeechRecognitionLang();
        
        listenBtn.addEventListener('click', startListening);
        stopListenBtn.addEventListener('click', stopListening);
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('searchInput').value = transcript;
            performSearch();
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error', event.error);
            stopListening();
        };
        
        recognition.onend = function() {
            stopListening();
        };
        
        function startListening() {
            recognition.lang = getSpeechRecognitionLang();
            recognition.start();
            listenBtn.style.display = 'none';
            stopListenBtn.style.display = 'flex';
        }
        
        function stopListening() {
            recognition.stop();
            listenBtn.style.display = 'flex';
            stopListenBtn.style.display = 'none';
        }
        
        function getSpeechRecognitionLang() {
            // Map our language codes to speech recognition language codes
            const langMap = {
                'en': 'en-IN',
                'hi': 'hi-IN',
                'bn': 'bn-IN',
                'ta': 'ta-IN',
                'te': 'te-IN'
            };
            return langMap[currentLanguage] || 'en-IN';
        }
    }
    
    function initContentControls() {
        const readAloudBtn = document.getElementById('readAloudBtn');
        const stopReadingBtn = document.getElementById('stopReadingBtn');
        const printContentBtn = document.getElementById('printContentBtn');
        
        readAloudBtn.addEventListener('click', readContentAloud);
        stopReadingBtn.addEventListener('click', stopReadingAloud);
        printContentBtn.addEventListener('click', printContent);
        
        function readContentAloud() {
            if (isSpeaking) return;
            
            const contentSection = document.getElementById('rightContentSection');
            if (contentSection.style.display !== 'block') {
                alert('No content to read. Please select a legal right first.');
                return;
            }
            
            const content = contentSection.innerText;
            if (!content) return;
            
            // Cancel any ongoing speech
            speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(content);
            utterance.lang = getSpeechSynthesisLang();
            utterance.rate = 0.9;
            
            utterance.onstart = function() {
                isSpeaking = true;
                readAloudBtn.style.display = 'none';
                stopReadingBtn.style.display = 'inline-block';
            };
            
            utterance.onend = function() {
                isSpeaking = false;
                readAloudBtn.style.display = 'inline-block';
                stopReadingBtn.style.display = 'none';
            };
            
            utterance.onerror = function(event) {
                console.error('Speech synthesis error', event);
                isSpeaking = false;
                readAloudBtn.style.display = 'inline-block';
                stopReadingBtn.style.display = 'none';
            };
            
            currentUtterance = utterance;
            speechSynthesis.speak(utterance);
        }
        
        function stopReadingAloud() {
            if (isSpeaking) {
                speechSynthesis.cancel();
                isSpeaking = false;
                readAloudBtn.style.display = 'inline-block';
                stopReadingBtn.style.display = 'none';
            }
        }
        
        function printContent() {
            const contentSection = document.getElementById('rightContentSection');
            if (contentSection.style.display !== 'block') {
                alert('No content to print. Please select a legal right first.');
                return;
            }
            
            const printWindow = window.open('', '', 'width=800,height=600');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>LegalEase - ${document.getElementById('rightTitle').textContent}</title>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
                            h1 { color: #166088; }
                            h2 { color: #4a6fa5; margin-top: 20px; }
                            ul, ol { margin-left: 20px; }
                            .example-card { background: #f5f5f5; padding: 10px; margin: 10px 0; border-left: 3px solid #4fc3f7; }
                        </style>
                    </head>
                    <body>
                        <h1>${document.getElementById('rightTitle').textContent}</h1>
                        ${contentSection.innerHTML}
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            
            // Wait for content to load before printing
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        }
        
        function getSpeechSynthesisLang() {
            // Map our language codes to speech synthesis language codes
            const langMap = {
                'en': 'en-IN',
                'hi': 'hi-IN',
                'bn': 'bn-IN',
                'ta': 'ta-IN',
                'te': 'te-IN'
            };
            return langMap[currentLanguage] || 'en-IN';
        }
    }

    // ======================
    // API Communication
    // ======================
    
    async function fetchData(endpoint, method = 'GET', body = null) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept-Language': currentLanguage
        };
        
        const token = localStorage.getItem('legalease_token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const options = {
            method,
            headers
        };
        
        if (body) {
            options.body = JSON.stringify(body);
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return null;
        }
    }
    
    async function verifyToken(token) {
        const data = await fetchData('/verify-token');
        if (data && data.valid) {
            currentUser = data.user;
            updateAuthUI();
        } else {
            localStorage.removeItem('legalease_token');
        }
    }
    
    async function loadCategories() {
        const data = await fetchData('/categories');
        if (data) {
            renderCategories(data);
        }
    }
    
    async function loadTopicsByCategory(categoryId) {
        const data = await fetchData(`/topics?category=${categoryId}&lang=${currentLanguage}`);
        if (data) {
            renderTopics(data);
        } else {
            // Fallback to local content if API fails
            renderLocalContent(categoryId);
        }
    }
    
    async function loadTopicDetails(topicId) {
        const data = await fetchData(`/topics/${topicId}?lang=${currentLanguage}`);
        if (data) {
            renderTopicDetails(data);
        }
    }
    
    async function searchTopics(query) {
        const data = await fetchData(`/search?q=${encodeURIComponent(query)}&lang=${currentLanguage}`);
        if (data) {
            renderSearchResults(data);
        } else {
            // Fallback to local search if API fails
            searchLocalContent(query);
        }
    }
    
    async function loadEmergencyContacts() {
        const data = await fetchData('/emergency-contacts');
        if (data) {
            renderEmergencyContacts(data);
        }
    }

    // ======================
    // UI Rendering
    // ======================
    
    function updateAuthUI() {
        const authButtons = document.querySelector('.auth-buttons');
        if (currentUser) {
            authButtons.innerHTML = `
                <span>Hi, ${currentUser.name}</span>
                <button class="logout-btn" id="logoutBtn">Logout</button>
            `;
            document.getElementById('logoutBtn').addEventListener('click', logout);
        } else {
            authButtons.innerHTML = `
                <select class="language-selector" id="languageSelector">
                    <option value="en">English</option>
                    <option value="hi">हिन्दी</option>
                    <option value="bn">বাংলা</option>
                    <option value="ta">தமிழ்</option>
                    <option value="te">తెలుగు</option>
                </select>
                <button class="login-btn" id="loginBtn">Login</button>
                <button class="signup-btn" id="signupBtn">Sign Up</button>
            `;
            // Reinitialize event listeners
            document.getElementById('languageSelector').addEventListener('change', function() {
                currentLanguage = this.value;
                loadContentForLanguage();
            });
            initModals();
        }
    }
    
    function renderCategories(categories) {
        const container = document.querySelector('.category-grid');
        container.innerHTML = categories.map(cat => `
            <div class="category-card" data-category="${cat.category_id}">
                <i class="fas ${cat.icon || 'fa-gavel'}"></i>
                <h3>${cat.name}</h3>
            </div>
        `).join('');
        
        initCategoryCards();
    }
    
    function renderTopics(topics) {
        // This would show a list of topics in the selected category
        // You can implement this based on your UI needs
    }
    
    function renderTopicDetails(topic) {
        // Show the detailed view of a specific topic
        document.getElementById('rightTitle').textContent = topic.title;
        document.getElementById('rightContent').innerHTML = topic.detailed_content || topic.simplified_content;
        
        // Render scenarios
        const examplesContainer = document.getElementById('rightExamples');
        examplesContainer.innerHTML = topic.scenarios.map(scenario => `
            <div class="example-card">
                <h4>${scenario.title || 'Example Scenario'}</h4>
                <p><strong>Scenario:</strong> ${scenario.scenario_description}</p>
                <p><strong>Action:</strong> ${scenario.legal_action}</p>
            </div>
        `).join('');
        
        // Render related laws
        const lawsContainer = document.getElementById('rightLaws');
        lawsContainer.innerHTML = '<ul>' + topic.laws.map(law => `
            <li>${law.name} (${law.year})</li>
        `).join('') + '</ul>';
        
        // Show emergency contacts
        const contactsContainer = document.getElementById('rightContacts');
        contactsContainer.innerHTML = '<ul>' + topic.contacts.map(contact => `
            <li><strong>${contact.organization_name}:</strong> <span class="phone">${contact.primary_number}</span></li>
        `).join('') + '</ul>';
        
        // Show the content section
        document.getElementById('rightContentSection').style.display = 'block';
        document.getElementById('rightContentSection').scrollIntoView({ behavior: 'smooth' });
    }
    
    function renderLocalContent(categoryId) {
        const categoryData = contentData[categoryId];
        if (!categoryData) return;
        
        const langData = categoryData[currentLanguage] || categoryData.en;
        
        document.getElementById('rightTitle').textContent = langData.title;
        document.getElementById('rightContent').innerHTML = langData.content;
        
        // Render scenarios
        const examplesContainer = document.getElementById('rightExamples');
        examplesContainer.innerHTML = langData.scenarios.map(scenario => `
            <div class="example-card">
                <h4>${scenario.title || 'Example Scenario'}</h4>
                <p><strong>Scenario:</strong> ${scenario.scenario_description}</p>
                <p><strong>Action:</strong> ${scenario.legal_action}</p>
            </div>
        `).join('');
        
        // Render related laws
        const lawsContainer = document.getElementById('rightLaws');
        lawsContainer.innerHTML = '<ul>' + langData.laws.map(law => `
            <li>${law.name} (${law.year})</li>
        `).join('') + '</ul>';
        
        // Show emergency contacts
        const contactsContainer = document.getElementById('rightContacts');
        contactsContainer.innerHTML = '<ul>' + langData.contacts.map(contact => `
            <li><strong>${contact.organization_name}:</strong> <span class="phone">${contact.primary_number}</span></li>
        `).join('') + '</ul>';
        
        // Show the content section
        document.getElementById('rightContentSection').style.display = 'block';
        document.getElementById('rightContentSection').scrollIntoView({ behavior: 'smooth' });
    }
    
    function renderEmergencyContacts(contacts) {
        const container = document.querySelector('.emergency-contacts');
        container.innerHTML = contacts.map(contact => `
            <div class="emergency-card">
                <h3>${contact.organization_name}</h3>
                <p>${contact.description || '24/7 support available'}</p>
                <p class="phone"><i class="fas fa-phone"></i> ${contact.primary_number}</p>
                ${contact.secondary_number ? `<p class="phone"><i class="fas fa-phone"></i> ${contact.secondary_number}</p>` : ''}
            </div>
        `).join('');
    }
    
    function renderSearchResults(results) {
        // Create a modal or section to display search results
        // For simplicity, we'll just show the first result if available
        if (results.length > 0) {
            const firstResult = results[0];
            if (firstResult.type === 'category') {
                loadTopicsByCategory(firstResult.id);
            } else if (firstResult.type === 'topic') {
                loadTopicDetails(firstResult.id);
            }
        } else {
            alert('No results found for your search.');
        }
    }
    
    function searchLocalContent(query) {
        // Simple local search - in a real app, this would be more sophisticated
        query = query.toLowerCase();
        
        // Check category names
        for (const categoryId in contentData) {
            const category = contentData[categoryId];
            const langData = category[currentLanguage] || category.en;
            
            if (langData.title.toLowerCase().includes(query)) {
                renderLocalContent(categoryId);
                return;
            }
            
            // Check content
            if (langData.content.toLowerCase().includes(query)) {
                renderLocalContent(categoryId);
                return;
            }
        }
        
        alert('No results found for your search.');
    }

    // ======================
    // Feature Initialization
    // ======================
    
    function initChatbot() {
        const chatbotButton = document.getElementById('chatbotButton');
        const chatbotWindow = document.getElementById('chatbotWindow');
        const chatbotClose = document.getElementById('chatbotClose');
        const chatbotMessages = document.getElementById('chatbotMessages');
        const chatbotInput = document.getElementById('chatbotInput');
        const chatbotSend = document.getElementById('chatbotSend');

        chatbotButton.addEventListener('click', function() {
            chatbotWindow.style.display = 'flex';
        });

        chatbotClose.addEventListener('click', function() {
            chatbotWindow.style.display = 'none';
        });

        function addBotMessage(text) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot-message';
            messageDiv.textContent = text;
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        function addUserMessage(text) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message user-message';
            messageDiv.textContent = text;
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        chatbotSend.addEventListener('click', sendChatMessage);
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendChatMessage();
        });

        async function sendChatMessage() {
            const message = chatbotInput.value.trim();
            if (message) {
                addUserMessage(message);
                chatbotInput.value = '';
                
                // Show typing indicator
                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'message bot-message';
                typingIndicator.innerHTML = '<i>LegalEase is typing...</i>';
                chatbotMessages.appendChild(typingIndicator);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                
                try {
                    // Get response from API
                    const response = await fetchData(`/chatbot?q=${encodeURIComponent(message)}&lang=${currentLanguage}`);
                    
                    // Remove typing indicator
                    chatbotMessages.removeChild(typingIndicator);
                    
                    if (response && response.answer) {
                        addBotMessage(response.answer);
                        
                        // If the response includes relevant topics
                        if (response.topics && response.topics.length > 0) {
                            const topicsList = response.topics.map(t => `• ${t.title}`).join('\n');
                            addBotMessage(`You might want to read about:\n${topicsList}`);
                        }
                    } else {
                        addBotMessage("I couldn't find information about that. Please try rephrasing your question.");
                    }
                } catch (error) {
                    chatbotMessages.removeChild(typingIndicator);
                    addBotMessage("Sorry, I'm having trouble connecting to the legal database. Please try again later.");
                }
            }
        }
    }
    
    function initModals() {
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const loginModal = document.getElementById('loginModal');
        const signupModal = document.getElementById('signupModal');
        const loginModalClose = document.getElementById('loginModalClose');
        const signupModalClose = document.getElementById('signupModalClose');
        const loginCancel = document.getElementById('loginCancel');
        const signupCancel = document.getElementById('signupCancel');
        const showSignup = document.getElementById('showSignup');
        const showLogin = document.getElementById('showLogin');

        if (loginBtn) loginBtn.addEventListener('click', () => loginModal.style.display = 'flex');
        if (signupBtn) signupBtn.addEventListener('click', () => signupModal.style.display = 'flex');
        
        loginModalClose.addEventListener('click', () => loginModal.style.display = 'none');
        signupModalClose.addEventListener('click', () => signupModal.style.display = 'none');
        loginCancel.addEventListener('click', () => loginModal.style.display = 'none');
        signupCancel.addEventListener('click', () => signupModal.style.display = 'none');
        
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'none';
            signupModal.style.display = 'flex';
        });

        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupModal.style.display = 'none';
            loginModal.style.display = 'flex';
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) loginModal.style.display = 'none';
            if (e.target === signupModal) signupModal.style.display = 'none';
        });

        // Form submissions
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const response = await fetchData('/login', 'POST', { email, password });
            
            if (response && response.token) {
                localStorage.setItem('legalease_token', response.token);
                currentUser = response.user;
                updateAuthUI();
                loginModal.style.display = 'none';
            } else {
                alert('Login failed. Please check your credentials.');
            }
        });

        document.getElementById('signupForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                name: document.getElementById('signupName').value,
                email: document.getElementById('signupEmail').value,
                phone: document.getElementById('signupPhone').value,
                password: document.getElementById('signupPassword').value,
                qualifications: document.getElementById('signupQualifications').value,
                specialization: document.getElementById('signupSpecialization').value
            };
            
            const response = await fetchData('/signup', 'POST', formData);
            
            if (response && response.success) {
                alert('Thank you for your application. We will review your qualifications and get back to you soon.');
                signupModal.style.display = 'none';
            } else {
                alert('Registration failed. Please try again.');
            }
        });
    }
    
    function initCategoryCards() {
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const categoryId = this.getAttribute('data-category');
                loadTopicsByCategory(categoryId);
            });
        });
    }
    
    function initSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');

        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearch();
        });

        async function performSearch() {
            const query = searchInput.value.trim();
            if (query) {
                await searchTopics(query);
            }
        }
    }
    
function initNavigation() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Get the href attribute
            const href = this.getAttribute('href');
            
            // Check if it's an anchor link (starts with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // For links to other pages (like about.html, rights.html), let them work normally
            // No need to do anything else - the default behavior will handle the navigation
        });
    });
}
    
    function logout() {
        localStorage.removeItem('legalease_token');
        currentUser = null;
        updateAuthUI();
    }
    
    // Initial data loading
    loadCategories();
    loadEmergencyContacts();

    
    function performSearch() {
    let query = document.getElementById("searchInput").value.trim();
    
    if (query === "") {
        document.getElementById("result").innerText = "Please enter something in English లేదా తెలుగు.";
        return;
    }

    // Display what was searched
    document.getElementById("result").innerText = `You searched for: ${query}`;
}

