/*
  Site copy in every language the switcher offers.

  Adding a language: add its code to `locales`, its names to `localeNames` and
  `localeShort`, and one more block below with the same keys as `en`.
  TypeScript flags any key you miss.

  English is the source. When English copy changes, the other three are stale
  until updated.

  Proper nouns stay in Latin script everywhere: The Adda Labs, Learn With Ron,
  YouTube, Instagram, LinkedIn, GitHub, X.

  Long-form content (notes, episodes) is NOT here. It lives in markdown under
  content/ and stays English.

  Copy derived from ../../FOUNDATION.md. Read it before rewording anything.
*/

export const locales = ['en', 'hi', 'mr', 'es'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

/* Shown in the switcher, each in its own script */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी',
  es: 'Español',
}

/* Collapsed label for the nav */
export const localeShort: Record<Locale, string> = {
  en: 'EN',
  hi: 'हि',
  mr: 'मरा',
  es: 'ES',
}

const en = {
  /* Chrome */
  navWork: 'Work',
  navLearn: 'Learn',
  navNotes: 'Notes',
  navAbout: 'About',
  navTalk: "Let's Talk",
  navMenu: 'Menu',
  navClose: 'Close',
  langLabel: 'Language',
  audioPlay: 'Play how I think',
  audioPlaying: 'Playing my story',

  /* Home — hero */
  heroBadge: 'Currently building: The Adda Labs · Learn With Ron',
  heroLines: ['I build things', 'and figure it out', 'in public.'],
  heroSub: "I don't know where this goes yet. That's the part worth documenting.",
  heroCta1: 'See the work',
  heroCta2: 'About me',
  heroHint: 'start here',
  heroScroll: 'Scroll',

  /* Home — hub tiles */
  hubLabel: "Everything I'm building",
  hubExplore: 'Explore',
  hub1Label: 'Company',
  hub1Desc: 'Where I test ideas before they become real products.',
  hub2Label: 'YouTube',
  hub2Desc: 'I use AI live on camera. Watch what actually happens.',
  hub3Label: 'Life',
  hub3Title: 'Life',
  hub3Desc: 'The stuff that happens outside the work.',

  /* Home — now strip */
  nowBuilding: 'Currently building',
  nowEpisode: 'This week on Learn With Ron',
  nowNote: 'Latest note',
  nowLive: 'Live now',
  nowNext: 'Up next',
  nowRightNow: 'Right now',
  nowUpdated: 'updated',

  /* Home — experiments */
  expEyebrow: 'Selected work',
  expTitle: 'The Library',
  expArchives: 'Active archives',
  expProjects: 'Projects',
  expSeeAll: 'See all projects',
  statusActive: 'Active',
  statusInProgress: 'In progress',
  statusLive: 'Live',

  /* Home — thinking */
  thinkEyebrow: 'Recent',
  thinkTitle: 'Some thoughts',
  thinkReadAll: 'Read all',

  /* Work page */
  workLabel: 'Work and experiments',
  workTitle: "Things I've built",
  workSub:
    'Not just what I built, but why I built it, what actually happened, and what I took away.',
  exploringLabel: 'Currently building:',
  exploringText: 'The Adda Labs, a system for testing ideas before committing to them',

  /* Learn page */
  learnLabel: 'Learn With Ron',
  learnTitle: 'I test it live',
  learnSub:
    'Every episode starts with a real question, gets tested on a live stream, and ends with an honest verdict. What you see is what actually happened, mistakes included.',
  learnCta: 'Watch live on YouTube',
  epOpened: 'Which opened the question',
  epUpNext: 'UP NEXT',
  epCatchLive: 'Catch it live on YouTube',

  /* Notes page */
  notesLabel: 'Notes and ideas',
  notesTitle: 'How I think',
  notesSub:
    'How I build, what I get wrong, and what I figure out along the way. Not advice. Just notes.',

  /* About page */
  aboutLabel: 'About',
  aboutTitle: "Hi, I'm Rohan",
  aboutSub:
    'Co-founder of The Adda Labs in Mumbai. I use AI on real client work, and I share what I learn while I am still working it out.',
  storyLabel1: 'How I got here',
  story1a:
    'I did not start as a developer. I kept having ideas and could not find anyone to build them, so I learned to build them myself.',
  story1b:
    'That became The Adda Labs, a Mumbai studio where I test AI products and workflows with real clients.',
  story1c:
    'AI did not change what I do. It changed how fast I do it. The ideas still have to be good, and the judgment is still mine.',
  storyLabel2: 'How I think',
  story2a:
    'I would rather try something once than plan it for a month. I write things down, change my mind fast, and start early.',
  story2b:
    'The best way to understand AI is to use it on real problems. I run it live, in front of clients and in front of a camera.',
  story2c:
    'Design and building are the same conversation. If it looks broken, it probably is. If it feels right, it usually works.',
  storyLabel3: 'What drives me',
  story3a: 'I want to build things that feel like they should have existed already.',
  story3b:
    'I care most about Indian founders and small businesses. They have real problems, real urgency, and AI can help them today.',
  story3c:
    'Learn With Ron is where I show the work: live sessions, the parts that break, and what I would do differently.',
  beliefLabel: 'What I believe',
  belief1: 'Share the learning, not just the wins.',
  belief2: 'Only teach what I have actually run.',
  belief3: 'Clear is better than clever.',
  belief4: 'The problem comes before the tool.',
  belief5: 'Build for the few people it is really for.',

  /* Links page */
  linksBio: 'Founder, builder, cat dad, Mumbai. I build things and figure it out in public.',
  linkNoteYoutube: 'Live AI experiments, real builds',
  linkNoteX: 'Quick thoughts, threads, hot takes',
  linkNoteInstagram: 'Life, chaos, the fun stuff',
  linkNoteLinkedin: 'Founder notes, longer writing',
  linkNoteStudio: 'Consulting: strategy, automation, storytelling',
  linkNoteEmail: 'For longer conversations',
  linkHandleStudio: 'My studio',
  linkHandlePay: 'UPI',
  linkNotePay: 'Send money straight to my UPI',
  linkLabelContact: 'Save Contact',
  linkNoteContact: 'Add me to your phone',

  /* Pay */
  payTitle: 'Pay me',
  payLead: 'UPI, straight to my personal account. Type the amount yourself.',
  payOpenApp: 'Open Google Pay',
  payPickApp: 'or use another app',
  payAnyUpi: 'Any UPI app',
  payOrCopy: 'or copy the ID',
  payCopy: 'Copy',
  payCopied: 'Copied',
  payScan: 'Or scan this with any UPI app.',
  payFootnote: 'Personal account. Work invoiced by The Adda Labs is billed separately.',

  /* Contact page */
  contactLabel: 'Say hi',
  contactSub:
    'Whether you have an idea, want to work together, or just want to think out loud. I read everything and reply to most things.',
  contactNoteEmail: 'Best for longer conversations',
  contactNoteGithub: 'See what I build',
  contactNoteX: 'For quick thoughts and threads',
  contactNoteLinkedin: 'If you prefer it formal',

  /* Project case studies. Keyed by the id in lib/data.ts, which keeps the
     structural fields (image, year, href, status). Titles are proper nouns. */
  projects: {
    '01': {
      tags: ['venture lab', 'strategy'],
      teaser: 'Where I test ideas before they become real products.',
      why: 'I had too many ideas and not enough follow-through. I needed a way to get them out of my head and into the world.',
      what: 'I built a system to define goals, test my assumptions, and run small experiments to build some momentum.',
      learned:
        "Things finally started moving. Some ideas worked, some didn't, but they all became the baseline for everything I build now.",
    },
    '02': {
      tags: ['revenue', 'execution'],
      teaser: 'How Adda Labs pays for itself.',
      why: 'Adda Labs was great for refining ideas, but I wanted to make sure the best ones could actually sustain themselves.',
      what: 'I built a layer focused entirely on execution, value creation, and making sure validated ideas turned into real outcomes.',
      learned:
        "It's how I check if an idea actually has legs. It's still early, but it's evolving every day.",
    },
    '03': {
      tags: ['advisory', 'branding'],
      teaser: "Helping a friend's production company find its voice.",
      why: 'A friend started a production company and needed a hand figuring out how to present themselves to the world.',
      what: 'I helped shape their positioning, guided the website, and found ways to use tech to make the business run smoother.',
      learned:
        'It brought a lot of clarity to how they present themselves and how they work day-to-day.',
    },
    '04': {
      tags: ['web design', 'client work'],
      teaser: 'A clean, professional home for a pharma export business.',
      why: 'The client needed a site that looked professional enough to talk to international buyers without the fluff.',
      what: 'I designed and built the site with focus on clarity and getting straight to the point.',
      learned: "It's live, working, and doing exactly what it was meant to do.",
    },
  } as Record<string, { tags: string[]; teaser: string; why: string; what: string; learned: string }>,

  projWhy: 'Why I built it',
  projWhat: 'What I did',
  projHappened: 'What happened',
  projView: 'View project',

  /* The one door in. See FOUNDATION.md: the list is the asset. */
  doorTitle: 'Follow the figuring out',
  doorSub: 'I write when something actually changes. No schedule, no filler, and you can leave any time.',
  doorPlaceholder: 'your@email.com',
  doorButton: 'Join the list',
  doorSending: 'Adding you',
  doorConsent: 'I agree to receive these emails and to my address being stored for that purpose.',
  doorPrivacy: 'How I handle your data',
  doorSuccess: "You're in. I'll only write when there's something real to say.",
  doorErrorConsent: 'Please tick the box so I have your consent.',
  doorErrorEmail: 'That address does not look right.',
  doorErrorGeneric: 'That did not go through. Try again in a moment.',

  /* Footer */
  footerCta: "Let's talk",
  footerSub: 'Whether you have an idea or just want to think out loud, my inbox is open.',
  footerBuilt: 'Built in public.',

  /* 404 */
  nfTitle: 'Nothing here',
  nfSub: "This page doesn't exist. Unlike my cat's opinion of me, which is very real and mostly unfavourable.",
  nfHome: 'Back home',
  nfLearn: 'Or watch me test things live',
}

export type Dict = typeof en

const hi: Dict = {
  navWork: 'काम',
  navLearn: 'सीखें',
  navNotes: 'नोट्स',
  navAbout: 'परिचय',
  navTalk: 'बात करें',
  navMenu: 'मेन्यू',
  navClose: 'बंद करें',
  langLabel: 'भाषा',
  audioPlay: 'सुनिए मैं कैसे सोचता हूँ',
  audioPlaying: 'मेरी कहानी चल रही है',

  heroBadge: 'अभी बना रहा हूँ: The Adda Labs · Learn With Ron',
  heroLines: ['मैं बनाता हूँ', 'और सबके सामने', 'सीखता हूँ।'],
  heroSub: 'मुझे नहीं पता यह कहाँ जाएगा। यही हिस्सा दर्ज करने लायक है।',
  heroCta1: 'काम देखें',
  heroCta2: 'मेरे बारे में',
  heroHint: 'यहाँ से शुरू करें',
  heroScroll: 'स्क्रॉल',

  hubLabel: 'जो कुछ मैं बना रहा हूँ',
  hubExplore: 'देखें',
  hub1Label: 'कंपनी',
  hub1Desc: 'जहाँ मैं आइडिया टेस्ट करता हूँ, असली प्रोडक्ट बनने से पहले।',
  hub2Label: 'YouTube',
  hub2Desc: 'मैं कैमरे पर लाइव AI इस्तेमाल करता हूँ। देखिए असल में क्या होता है।',
  hub3Label: 'ज़िंदगी',
  hub3Title: 'ज़िंदगी',
  hub3Desc: 'काम के बाहर जो कुछ होता है।',

  nowBuilding: 'अभी बना रहा हूँ',
  nowEpisode: 'इस हफ़्ते Learn With Ron पर',
  nowNote: 'नया नोट',
  nowLive: 'अभी लाइव',
  nowNext: 'अगला',
  nowRightNow: 'इस समय',
  nowUpdated: 'अपडेट',

  expEyebrow: 'चुने हुए काम',
  expTitle: 'लाइब्रेरी',
  expArchives: 'सक्रिय संग्रह',
  expProjects: 'प्रोजेक्ट',
  expSeeAll: 'सभी प्रोजेक्ट देखें',
  statusActive: 'सक्रिय',
  statusInProgress: 'चल रहा है',
  statusLive: 'लाइव',

  thinkEyebrow: 'हाल के',
  thinkTitle: 'कुछ विचार',
  thinkReadAll: 'सब पढ़ें',

  workLabel: 'काम और प्रयोग',
  workTitle: 'जो मैंने बनाया',
  workSub:
    'सिर्फ़ यह नहीं कि मैंने क्या बनाया, बल्कि क्यों बनाया, असल में क्या हुआ, और मैंने उससे क्या सीखा।',
  exploringLabel: 'अभी बना रहा हूँ:',
  exploringText: 'The Adda Labs, आइडिया पर पूरी तरह लगने से पहले उन्हें परखने का एक सिस्टम',

  learnLabel: 'Learn With Ron',
  learnTitle: 'मैं इसे लाइव परखता हूँ',
  learnSub:
    'हर एपिसोड एक असली सवाल से शुरू होता है, लाइव स्ट्रीम पर टेस्ट होता है, और एक ईमानदार नतीजे पर खत्म होता है। जो आप देखते हैं वही असल में हुआ था, गलतियों समेत।',
  learnCta: 'YouTube पर लाइव देखें',
  epOpened: 'जिससे यह सवाल उठा',
  epUpNext: 'अगला',
  epCatchLive: 'YouTube पर लाइव देखिए',

  notesLabel: 'नोट्स और विचार',
  notesTitle: 'मैं कैसे सोचता हूँ',
  notesSub:
    'मैं कैसे बनाता हूँ, कहाँ गलत होता हूँ, और रास्ते में क्या समझ आता है। सलाह नहीं। बस नोट्स।',

  aboutLabel: 'परिचय',
  aboutTitle: 'नमस्ते, मैं रोहन हूँ',
  aboutSub:
    'The Adda Labs का सह-संस्थापक, मुंबई से। मैं असली क्लाइंट काम में AI इस्तेमाल करता हूँ, और जो सीखता हूँ वो तभी साझा करता हूँ जब मैं खुद उसे समझ ही रहा होता हूँ।',
  storyLabel1: 'मैं यहाँ कैसे पहुँचा',
  story1a:
    'मैंने डेवलपर के तौर पर शुरुआत नहीं की। मेरे पास हमेशा आइडिया रहते थे पर उन्हें बनाने वाला कोई नहीं मिला, इसलिए मैंने खुद बनाना सीखा।',
  story1b:
    'वहीं से The Adda Labs बना, मुंबई का एक स्टूडियो जहाँ मैं असली क्लाइंट्स के साथ AI प्रोडक्ट्स और वर्कफ़्लो टेस्ट करता हूँ।',
  story1c:
    'AI ने यह नहीं बदला कि मैं क्या करता हूँ। उसने बदला कि मैं कितनी तेज़ी से करता हूँ। आइडिया अब भी अच्छे होने चाहिए, और समझ अब भी मेरी अपनी है।',
  storyLabel2: 'मैं कैसे सोचता हूँ',
  story2a:
    'एक महीना योजना बनाने से बेहतर है एक बार कोशिश करना। मैं लिखता हूँ, जल्दी राय बदलता हूँ, और जल्दी शुरू करता हूँ।',
  story2b:
    'AI को समझने का सबसे अच्छा तरीका है उसे असली समस्याओं पर इस्तेमाल करना। मैं इसे लाइव चलाता हूँ, क्लाइंट्स के सामने और कैमरे के सामने।',
  story2c:
    'डिज़ाइन और बनाना एक ही बातचीत है। अगर टूटा हुआ दिखता है, तो शायद टूटा ही है। अगर सही लगता है, तो आमतौर पर सही होता है।',
  storyLabel3: 'मुझे क्या प्रेरित करता है',
  story3a: 'मैं ऐसी चीज़ें बनाना चाहता हूँ जो लगे कि पहले से होनी चाहिए थीं।',
  story3b:
    'मुझे भारतीय फ़ाउंडर्स और छोटे व्यवसायों की सबसे ज़्यादा परवाह है। उनके पास असली समस्याएँ हैं और AI आज उनकी मदद कर सकता है।',
  story3c:
    'Learn With Ron वो जगह है जहाँ मैं काम दिखाता हूँ: लाइव सेशन, जो हिस्से टूटते हैं, और जो मैं अलग तरीके से करता।',
  beliefLabel: 'मैं क्या मानता हूँ',
  belief1: 'सिर्फ़ जीत नहीं, सीख भी साझा करें।',
  belief2: 'वही सिखाऊँ जो मैंने खुद चलाया हो।',
  belief3: 'साफ़ होना, चतुर होने से बेहतर है।',
  belief4: 'समस्या पहले आती है, औज़ार बाद में।',
  belief5: 'उन थोड़े लोगों के लिए बनाएँ जिनके लिए यह सच में है।',

  linksBio: 'फ़ाउंडर, बिल्डर, कैट डैड, मुंबई। मैं बनाता हूँ और सबके सामने सीखता हूँ।',
  linkNoteYoutube: 'लाइव AI प्रयोग, असली बिल्ड',
  linkNoteX: 'छोटे विचार, थ्रेड्स, बेबाक राय',
  linkNoteInstagram: 'ज़िंदगी, अफ़रा-तफ़री, मज़ेदार हिस्से',
  linkNoteLinkedin: 'फ़ाउंडर नोट्स, लंबा लेखन',
  linkNoteStudio: 'कंसल्टिंग: रणनीति, ऑटोमेशन, कहानी',
  linkNoteEmail: 'लंबी बातचीत के लिए',
  linkHandleStudio: 'मेरा स्टूडियो',
  linkHandlePay: 'UPI',
  linkNotePay: 'सीधे मेरे UPI पर पैसे भेजें',
  linkLabelContact: 'संपर्क सेव करें',
  linkNoteContact: 'मुझे अपने फ़ोन में जोड़ें',

  /* Pay */
  payTitle: 'पैसे भेजें',
  payLead: 'UPI, सीधे मेरे निजी खाते में। रकम आप खुद डालें।',
  payOpenApp: 'Google Pay खोलें',
  payPickApp: 'या कोई और ऐप चुनें',
  payAnyUpi: 'कोई भी UPI ऐप',
  payOrCopy: 'या ID कॉपी करें',
  payCopy: 'कॉपी',
  payCopied: 'कॉपी हो गया',
  payScan: 'या किसी भी UPI ऐप से यह स्कैन करें।',
  payFootnote: 'निजी खाता। The Adda Labs का काम अलग से बिल होता है।',

  contactLabel: 'नमस्ते कहें',
  contactSub:
    'आपके पास कोई आइडिया हो, साथ काम करना हो, या बस सोचकर बात करनी हो। मैं सब पढ़ता हूँ और ज़्यादातर का जवाब देता हूँ।',
  contactNoteEmail: 'लंबी बातचीत के लिए सबसे अच्छा',
  contactNoteGithub: 'देखिए मैं क्या बनाता हूँ',
  contactNoteX: 'छोटे विचारों और थ्रेड्स के लिए',
  contactNoteLinkedin: 'अगर औपचारिक पसंद हो',

  projects: {
    '01': {
      tags: ['वेंचर लैब', 'रणनीति'],
      teaser: 'जहाँ मैं आइडिया टेस्ट करता हूँ, असली प्रोडक्ट बनने से पहले।',
      why: 'मेरे पास बहुत सारे आइडिया थे पर उन्हें पूरा करने का तरीका नहीं था। मुझे उन्हें दिमाग़ से निकालकर दुनिया में लाने का रास्ता चाहिए था।',
      what: 'मैंने एक सिस्टम बनाया जो लक्ष्य तय करता है, मेरी धारणाएँ परखता है, और छोटे प्रयोग चलाकर गति बनाता है।',
      learned:
        'आख़िरकार चीज़ें चलने लगीं। कुछ आइडिया चले, कुछ नहीं, पर सब मिलकर वो आधार बन गए जिस पर मैं अब सब बनाता हूँ।',
    },
    '02': {
      tags: ['राजस्व', 'क्रियान्वयन'],
      teaser: 'Adda Labs अपना खर्च खुद कैसे उठाता है।',
      why: 'Adda Labs आइडिया निखारने के लिए अच्छा था, पर मैं चाहता था कि सबसे अच्छे आइडिया खुद को टिका भी सकें।',
      what: 'मैंने एक परत बनाई जो पूरी तरह क्रियान्वयन, मूल्य निर्माण, और परखे हुए आइडिया को असली नतीजों में बदलने पर केंद्रित है।',
      learned:
        'इससे मैं जाँचता हूँ कि किसी आइडिया में दम है या नहीं। अभी शुरुआत है, पर हर दिन बेहतर हो रहा है।',
    },
    '03': {
      tags: ['सलाह', 'ब्रांडिंग'],
      teaser: 'एक दोस्त की प्रोडक्शन कंपनी को उसकी आवाज़ ढूँढने में मदद।',
      why: 'एक दोस्त ने प्रोडक्शन कंपनी शुरू की और उसे यह समझने में मदद चाहिए थी कि खुद को दुनिया के सामने कैसे रखे।',
      what: 'मैंने उनकी पोज़िशनिंग तय करने में मदद की, वेबसाइट में दिशा दी, और तकनीक से काम आसान करने के तरीके निकाले।',
      learned: 'इससे उन्हें काफ़ी स्पष्टता मिली कि वे खुद को कैसे पेश करते हैं और रोज़ कैसे काम करते हैं।',
    },
    '04': {
      tags: ['वेब डिज़ाइन', 'क्लाइंट काम'],
      teaser: 'एक फ़ार्मा एक्सपोर्ट बिज़नेस के लिए साफ़, पेशेवर ठिकाना।',
      why: 'क्लाइंट को ऐसी साइट चाहिए थी जो अंतरराष्ट्रीय ख़रीदारों से बात करने लायक पेशेवर लगे, बिना किसी दिखावे के।',
      what: 'मैंने साइट डिज़ाइन की और बनाई, स्पष्टता और सीधी बात पर ध्यान देते हुए।',
      learned: 'यह लाइव है, चल रही है, और ठीक वही कर रही है जिसके लिए बनी थी।',
    },
  },

  projWhy: 'मैंने यह क्यों बनाया',
  projWhat: 'मैंने क्या किया',
  projHappened: 'क्या हुआ',
  projView: 'प्रोजेक्ट देखें',

  doorTitle: 'इस सफ़र से जुड़िए',
  doorSub: 'जब वाकई कुछ बदलता है तभी लिखता हूँ। कोई शेड्यूल नहीं, कोई भराव नहीं, और आप कभी भी छोड़ सकते हैं।',
  doorPlaceholder: 'your@email.com',
  doorButton: 'लिस्ट में जुड़ें',
  doorSending: 'जोड़ रहा हूँ',
  doorConsent: 'मैं ये ईमेल पाने और इसी काम के लिए अपना पता सहेजे जाने से सहमत हूँ।',
  doorPrivacy: 'मैं आपका डेटा कैसे संभालता हूँ',
  doorSuccess: 'आप जुड़ गए। जब कुछ असली कहने लायक होगा, तभी लिखूँगा।',
  doorErrorConsent: 'कृपया बॉक्स पर निशान लगाएँ ताकि आपकी सहमति मिल सके।',
  doorErrorEmail: 'यह पता सही नहीं लग रहा।',
  doorErrorGeneric: 'यह भेजा नहीं जा सका। थोड़ी देर बाद कोशिश करें।',

  footerCta: 'बात करते हैं',
  footerSub: 'आपके पास कोई आइडिया हो या बस सोचना हो, मेरा इनबॉक्स खुला है।',
  footerBuilt: 'सार्वजनिक रूप से बनाया गया।',

  nfTitle: 'यहाँ कुछ नहीं है',
  nfSub: 'यह पेज मौजूद नहीं है। मेरी बिल्ली की मेरे बारे में राय के उलट, जो बिल्कुल असली है और ज़्यादातर खराब।',
  nfHome: 'वापस होम पर',
  nfLearn: 'या देखिए मैं चीज़ें लाइव परखता हूँ',
}

const mr: Dict = {
  navWork: 'काम',
  navLearn: 'शिका',
  navNotes: 'नोंदी',
  navAbout: 'माझ्याविषयी',
  navTalk: 'चला बोलूया',
  navMenu: 'मेनू',
  navClose: 'बंद करा',
  langLabel: 'भाषा',
  audioPlay: 'मी कसा विचार करतो ते ऐका',
  audioPlaying: 'माझी गोष्ट सुरू आहे',

  heroBadge: 'सध्या बनवत आहे: The Adda Labs · Learn With Ron',
  heroLines: ['मी गोष्टी बनवतो', 'आणि सर्वांसमोर', 'शिकतो.'],
  heroSub: 'हे कुठे जाईल मला माहीत नाही. तोच भाग नोंदवण्यासारखा आहे.',
  heroCta1: 'काम पाहा',
  heroCta2: 'माझ्याविषयी',
  heroHint: 'इथून सुरुवात करा',
  heroScroll: 'स्क्रोल',

  hubLabel: 'मी जे काही बनवत आहे',
  hubExplore: 'पाहा',
  hub1Label: 'कंपनी',
  hub1Desc: 'जिथे मी कल्पना तपासतो, त्या खरी उत्पादनं होण्याआधी.',
  hub2Label: 'YouTube',
  hub2Desc: 'मी कॅमेऱ्यासमोर लाइव्ह AI वापरतो. खरंच काय होतं ते पाहा.',
  hub3Label: 'आयुष्य',
  hub3Title: 'आयुष्य',
  hub3Desc: 'कामाच्या बाहेर जे घडतं ते.',

  nowBuilding: 'सध्या बनवत आहे',
  nowEpisode: 'या आठवड्यात Learn With Ron वर',
  nowNote: 'नवीन नोंद',
  nowLive: 'आत्ता लाइव्ह',
  nowNext: 'पुढे',
  nowRightNow: 'सध्या',
  nowUpdated: 'अपडेट',

  expEyebrow: 'निवडक काम',
  expTitle: 'लायब्ररी',
  expArchives: 'सक्रिय संग्रह',
  expProjects: 'प्रकल्प',
  expSeeAll: 'सर्व प्रकल्प पाहा',
  statusActive: 'सक्रिय',
  statusInProgress: 'सुरू आहे',
  statusLive: 'लाइव्ह',

  thinkEyebrow: 'अलीकडचे',
  thinkTitle: 'काही विचार',
  thinkReadAll: 'सर्व वाचा',

  workLabel: 'काम आणि प्रयोग',
  workTitle: 'मी जे बनवलं',
  workSub:
    'फक्त मी काय बनवलं एवढंच नाही, तर का बनवलं, खरंच काय घडलं, आणि मी त्यातून काय शिकलो.',
  exploringLabel: 'सध्या बनवत आहे:',
  exploringText: 'The Adda Labs, कल्पनांवर पूर्ण झोकून देण्याआधी त्या तपासण्याची एक पद्धत',

  learnLabel: 'Learn With Ron',
  learnTitle: 'मी ते लाइव्ह तपासतो',
  learnSub:
    'प्रत्येक भाग एका खऱ्या प्रश्नाने सुरू होतो, लाइव्ह स्ट्रीमवर तपासला जातो, आणि प्रामाणिक निष्कर्षाने संपतो. तुम्ही जे पाहता तेच खरंच घडलं होतं, चुकांसह.',
  learnCta: 'YouTube वर लाइव्ह पाहा',
  epOpened: 'ज्यातून हा प्रश्न उभा राहिला',
  epUpNext: 'पुढे',
  epCatchLive: 'YouTube वर लाइव्ह पाहा',

  notesLabel: 'नोंदी आणि कल्पना',
  notesTitle: 'मी कसा विचार करतो',
  notesSub:
    'मी कसा बनवतो, कुठे चुकतो, आणि वाटेत काय उमगतं. सल्ला नाही. फक्त नोंदी.',

  aboutLabel: 'माझ्याविषयी',
  aboutTitle: 'नमस्कार, मी रोहन',
  aboutSub:
    'The Adda Labs चा सह-संस्थापक, मुंबईतून. मी खऱ्या क्लायंट कामात AI वापरतो, आणि जे शिकतो ते मी अजून समजून घेत असतानाच शेअर करतो.',
  storyLabel1: 'मी इथवर कसा आलो',
  story1a:
    'मी डेव्हलपर म्हणून सुरुवात केली नाही. माझ्याकडे नेहमी कल्पना असायच्या पण त्या बनवणारं कोणी मिळालं नाही, म्हणून मी स्वतः बनवायला शिकलो.',
  story1b:
    'त्यातूनच The Adda Labs तयार झालं, मुंबईतील एक स्टुडिओ जिथे मी खऱ्या क्लायंटसोबत AI प्रॉडक्ट्स आणि वर्कफ्लो तपासतो.',
  story1c:
    'मी काय करतो हे AI ने बदललं नाही. मी ते किती वेगाने करतो हे बदललं. कल्पना अजूनही चांगल्या असाव्या लागतात, आणि निर्णय अजूनही माझाच असतो.',
  storyLabel2: 'मी कसा विचार करतो',
  story2a:
    'महिनाभर नियोजन करण्यापेक्षा एकदा प्रयत्न करणं मला आवडतं. मी लिहून ठेवतो, पटकन मत बदलतो आणि लवकर सुरुवात करतो.',
  story2b:
    'AI समजून घेण्याचा सर्वोत्तम मार्ग म्हणजे तो खऱ्या समस्यांवर वापरणं. मी तो लाइव्ह चालवतो, क्लायंटसमोर आणि कॅमेऱ्यासमोर.',
  story2c:
    'डिझाइन आणि बांधणी एकच संवाद आहे. तुटलेलं दिसत असेल तर बहुधा तुटलेलंच असतं. योग्य वाटत असेल तर सहसा योग्यच असतं.',
  storyLabel3: 'मला काय प्रेरणा देते',
  story3a: 'मला अशा गोष्टी बनवायच्या आहेत ज्या आधीच असायला हव्या होत्या असं वाटेल.',
  story3b:
    'मला भारतीय फाउंडर्स आणि लहान व्यवसायांची सर्वात जास्त काळजी आहे. त्यांच्याकडे खऱ्या समस्या आहेत आणि AI आज त्यांना मदत करू शकतो.',
  story3c:
    'Learn With Ron इथे मी काम दाखवतो: लाइव्ह सेशन्स, जे तुटतं ते, आणि मी वेगळं काय केलं असतं.',
  beliefLabel: 'माझा विश्वास',
  belief1: 'फक्त यश नाही, शिकवणही शेअर करा.',
  belief2: 'मी स्वतः चालवलेलंच शिकवतो.',
  belief3: 'हुशार असण्यापेक्षा स्पष्ट असणं चांगलं.',
  belief4: 'समस्या आधी येते, साधन नंतर.',
  belief5: 'ज्यांच्यासाठी हे खरंच आहे त्या मोजक्या लोकांसाठी बनवा.',

  linksBio: 'फाउंडर, बिल्डर, कॅट डॅड, मुंबई. मी गोष्टी बनवतो आणि सर्वांसमोर शिकतो.',
  linkNoteYoutube: 'लाइव्ह AI प्रयोग, खरी बांधणी',
  linkNoteX: 'छोटे विचार, थ्रेड्स, बेधडक मतं',
  linkNoteInstagram: 'आयुष्य, गोंधळ, मजेचा भाग',
  linkNoteLinkedin: 'फाउंडर नोंदी, सविस्तर लेखन',
  linkNoteStudio: 'सल्ला: रणनीती, ऑटोमेशन, कथा',
  linkNoteEmail: 'सविस्तर संवादासाठी',
  linkHandleStudio: 'माझा स्टुडिओ',
  linkHandlePay: 'UPI',
  linkNotePay: 'थेट माझ्या UPI वर पैसे पाठवा',
  linkLabelContact: 'संपर्क सेव्ह करा',
  linkNoteContact: 'मला तुमच्या फोनमध्ये जोडा',

  /* Pay */
  payTitle: 'पैसे पाठवा',
  payLead: 'UPI, थेट माझ्या वैयक्तिक खात्यात. रक्कम तुम्हीच टाका.',
  payOpenApp: 'Google Pay उघडा',
  payPickApp: 'किंवा दुसरं अ‍ॅप निवडा',
  payAnyUpi: 'कोणतंही UPI अ‍ॅप',
  payOrCopy: 'किंवा ID कॉपी करा',
  payCopy: 'कॉपी',
  payCopied: 'कॉपी झालं',
  payScan: 'किंवा कोणत्याही UPI अ‍ॅपने हे स्कॅन करा.',
  payFootnote: 'वैयक्तिक खातं. The Adda Labs चं काम वेगळं बिल होतं.',

  contactLabel: 'नमस्कार करा',
  contactSub:
    'तुमच्याकडे कल्पना असो, एकत्र काम करायचं असो, किंवा फक्त विचार मांडायचे असोत. मी सगळं वाचतो आणि बहुतेकांना उत्तर देतो.',
  contactNoteEmail: 'सविस्तर संवादासाठी सर्वोत्तम',
  contactNoteGithub: 'मी काय बनवतो ते पाहा',
  contactNoteX: 'छोट्या विचारांसाठी आणि थ्रेड्ससाठी',
  contactNoteLinkedin: 'औपचारिक आवडत असेल तर',

  projects: {
    '01': {
      tags: ['व्हेंचर लॅब', 'रणनीती'],
      teaser: 'जिथे मी कल्पना तपासतो, त्या खरी उत्पादनं होण्याआधी.',
      why: 'माझ्याकडे खूप कल्पना होत्या पण त्या पूर्ण करण्याची पद्धत नव्हती. त्या डोक्यातून बाहेर काढून जगात आणण्याचा मार्ग हवा होता.',
      what: 'मी एक पद्धत तयार केली जी ध्येयं ठरवते, माझे गृहीतक तपासते, आणि छोटे प्रयोग करून गती निर्माण करते.',
      learned:
        'शेवटी गोष्टी हलू लागल्या. काही कल्पना चालल्या, काही नाही, पण त्या सगळ्या मिळून आजचा पाया बनल्या.',
    },
    '02': {
      tags: ['महसूल', 'अंमलबजावणी'],
      teaser: 'Adda Labs स्वतःचा खर्च कसा भागवते.',
      why: 'Adda Labs कल्पना सुधारण्यासाठी उत्तम होतं, पण सर्वोत्तम कल्पना स्वतः टिकू शकाव्यात असं मला वाटत होतं.',
      what: 'मी पूर्णपणे अंमलबजावणी, मूल्यनिर्मिती, आणि तपासलेल्या कल्पनांचं खऱ्या निकालात रूपांतर यावर केंद्रित एक थर तयार केला.',
      learned: 'यातून मी तपासतो की कल्पनेत खरंच दम आहे का. अजून सुरुवात आहे, पण रोज पुढे जात आहे.',
    },
    '03': {
      tags: ['सल्ला', 'ब्रँडिंग'],
      teaser: 'एका मित्राच्या प्रॉडक्शन कंपनीला तिचा आवाज सापडण्यात मदत.',
      why: 'एका मित्राने प्रॉडक्शन कंपनी सुरू केली आणि स्वतःला जगासमोर कसं मांडायचं हे ठरवण्यात मदत हवी होती.',
      what: 'मी त्यांची मांडणी ठरवण्यात मदत केली, वेबसाइटला दिशा दिली, आणि तंत्रज्ञानाने काम सोपं करण्याचे मार्ग शोधले.',
      learned: 'त्यांना स्वतःला कसं सादर करायचं आणि रोज कसं काम करायचं याबद्दल खूप स्पष्टता मिळाली.',
    },
    '04': {
      tags: ['वेब डिझाइन', 'क्लायंट काम'],
      teaser: 'एका फार्मा निर्यात व्यवसायासाठी स्वच्छ, व्यावसायिक ठिकाण.',
      why: 'क्लायंटला अशी साइट हवी होती जी आंतरराष्ट्रीय खरेदीदारांशी बोलण्याइतकी व्यावसायिक दिसेल, कोणताही दिखावा न करता.',
      what: 'मी ती साइट डिझाइन केली आणि बांधली, स्पष्टता आणि थेट मुद्द्यावर लक्ष ठेवून.',
      learned: 'ती लाइव्ह आहे, काम करते आहे, आणि जे अपेक्षित होतं तेच नेमकं करते आहे.',
    },
  },

  projWhy: 'मी हे का बनवलं',
  projWhat: 'मी काय केलं',
  projHappened: 'काय घडलं',
  projView: 'प्रकल्प पाहा',

  doorTitle: 'हा प्रवास फॉलो करा',
  doorSub: 'खरंच काही बदललं तरच मी लिहितो. वेळापत्रक नाही, भरताड नाही, आणि तुम्ही कधीही थांबवू शकता.',
  doorPlaceholder: 'your@email.com',
  doorButton: 'यादीत सामील व्हा',
  doorSending: 'जोडत आहे',
  doorConsent: 'हे ईमेल मिळण्यास आणि त्यासाठी माझा पत्ता साठवण्यास माझी संमती आहे.',
  doorPrivacy: 'मी तुमचा डेटा कसा हाताळतो',
  doorSuccess: 'तुम्ही सामील झालात. खरंच सांगण्यासारखं काही असेल तेव्हाच लिहीन.',
  doorErrorConsent: 'कृपया चौकटीवर खूण करा म्हणजे तुमची संमती मिळेल.',
  doorErrorEmail: 'हा पत्ता बरोबर वाटत नाही.',
  doorErrorGeneric: 'हे पाठवता आलं नाही. थोड्या वेळाने पुन्हा प्रयत्न करा.',

  footerCta: 'चला बोलूया',
  footerSub: 'तुमच्याकडे कल्पना असो किंवा फक्त विचार मांडायचे असोत, माझा इनबॉक्स खुला आहे.',
  footerBuilt: 'सार्वजनिकरित्या बनवलेलं.',

  nfTitle: 'इथे काहीच नाही',
  nfSub: 'हे पान अस्तित्वात नाही. माझ्या मांजरीचं माझ्याबद्दलचं मत मात्र अगदी खरं आहे, आणि बहुतांशी वाईट.',
  nfHome: 'घरी परत',
  nfLearn: 'किंवा मी गोष्टी लाइव्ह तपासताना पाहा',
}

const es: Dict = {
  navWork: 'Proyectos',
  navLearn: 'Aprende',
  navNotes: 'Notas',
  navAbout: 'Sobre mí',
  navTalk: 'Hablemos',
  navMenu: 'Menú',
  navClose: 'Cerrar',
  langLabel: 'Idioma',
  audioPlay: 'Escucha cómo pienso',
  audioPlaying: 'Reproduciendo mi historia',

  heroBadge: 'Construyendo ahora: The Adda Labs · Learn With Ron',
  heroLines: ['Construyo cosas', 'y aprendo', 'en público.'],
  heroSub: 'Todavía no sé adónde lleva esto. Esa es la parte que vale la pena documentar.',
  heroCta1: 'Ver el trabajo',
  heroCta2: 'Sobre mí',
  heroHint: 'empieza aquí',
  heroScroll: 'Desplaza',

  hubLabel: 'Todo lo que estoy construyendo',
  hubExplore: 'Explorar',
  hub1Label: 'Empresa',
  hub1Desc: 'Donde pruebo ideas antes de que se conviertan en productos reales.',
  hub2Label: 'YouTube',
  hub2Desc: 'Uso IA en vivo frente a la cámara. Mira lo que pasa de verdad.',
  hub3Label: 'Vida',
  hub3Title: 'Vida',
  hub3Desc: 'Lo que ocurre fuera del trabajo.',

  nowBuilding: 'Construyendo ahora',
  nowEpisode: 'Esta semana en Learn With Ron',
  nowNote: 'Última nota',
  nowLive: 'En vivo',
  nowNext: 'Próximo',
  nowRightNow: 'Ahora mismo',
  nowUpdated: 'actualizado',

  expEyebrow: 'Trabajo seleccionado',
  expTitle: 'La Biblioteca',
  expArchives: 'Archivo activo',
  expProjects: 'Proyectos',
  expSeeAll: 'Ver todos los proyectos',
  statusActive: 'Activo',
  statusInProgress: 'En curso',
  statusLive: 'En vivo',

  thinkEyebrow: 'Reciente',
  thinkTitle: 'Algunas ideas',
  thinkReadAll: 'Leer todo',

  workLabel: 'Trabajo y experimentos',
  workTitle: 'Cosas que he construido',
  workSub:
    'No solo qué construí, sino por qué lo construí, qué pasó de verdad y qué aprendí.',
  exploringLabel: 'Construyendo ahora:',
  exploringText: 'The Adda Labs, un sistema para probar ideas antes de comprometerse con ellas',

  learnLabel: 'Learn With Ron',
  learnTitle: 'Lo pruebo en vivo',
  learnSub:
    'Cada episodio empieza con una pregunta real, se prueba en directo y termina con un veredicto honesto. Lo que ves es lo que pasó de verdad, errores incluidos.',
  learnCta: 'Ver en directo en YouTube',
  epOpened: 'Lo que abrió la pregunta',
  epUpNext: 'PRÓXIMO',
  epCatchLive: 'Míralo en directo en YouTube',

  notesLabel: 'Notas e ideas',
  notesTitle: 'Cómo pienso',
  notesSub:
    'Cómo construyo, en qué me equivoco y qué voy entendiendo por el camino. No son consejos. Solo notas.',

  aboutLabel: 'Sobre mí',
  aboutTitle: 'Hola, soy Rohan',
  aboutSub:
    'Cofundador de The Adda Labs, en Mumbai. Uso IA en trabajo real con clientes y comparto lo que aprendo mientras todavía lo estoy resolviendo.',
  storyLabel1: 'Cómo llegué aquí',
  story1a:
    'No empecé como desarrollador. Siempre tenía ideas y no encontraba a nadie que las construyera, así que aprendí a construirlas yo mismo.',
  story1b:
    'Así nació The Adda Labs, un estudio en Mumbai donde pruebo productos y flujos de trabajo con IA junto a clientes reales.',
  story1c:
    'La IA no cambió lo que hago. Cambió lo rápido que lo hago. Las ideas siguen teniendo que ser buenas, y el criterio sigue siendo mío.',
  storyLabel2: 'Cómo pienso',
  story2a:
    'Prefiero probar algo una vez antes que planearlo durante un mes. Escribo las cosas, cambio de opinión rápido y empiezo pronto.',
  story2b:
    'La mejor forma de entender la IA es usarla en problemas reales. La uso en vivo, frente a clientes y frente a una cámara.',
  story2c:
    'Diseñar y construir son la misma conversación. Si parece roto, probablemente lo está. Si se siente bien, normalmente funciona.',
  storyLabel3: 'Qué me mueve',
  story3a: 'Quiero construir cosas que parezcan que ya deberían existir.',
  story3b:
    'Me importan sobre todo los fundadores indios y las pequeñas empresas. Tienen problemas reales y la IA puede ayudarles hoy.',
  story3c:
    'Learn With Ron es donde muestro el trabajo: sesiones en vivo, las partes que se rompen y qué haría distinto.',
  beliefLabel: 'En qué creo',
  belief1: 'Comparte el aprendizaje, no solo los logros.',
  belief2: 'Enseñar solo lo que he hecho de verdad.',
  belief3: 'Claro es mejor que ingenioso.',
  belief4: 'El problema viene antes que la herramienta.',
  belief5: 'Construir para las pocas personas a las que de verdad va dirigido.',

  linksBio: 'Fundador, constructor, papá de un gato, Mumbai. Construyo cosas y las voy resolviendo en público.',
  linkNoteYoutube: 'Experimentos con IA en vivo, cosas reales',
  linkNoteX: 'Ideas rápidas, hilos, opiniones sin filtro',
  linkNoteInstagram: 'La vida, el caos, lo divertido',
  linkNoteLinkedin: 'Notas de fundador, textos más largos',
  linkNoteStudio: 'Consultoría: estrategia, automatización, narrativa',
  linkNoteEmail: 'Para conversaciones largas',
  linkHandleStudio: 'Mi estudio',
  linkHandlePay: 'UPI',
  linkNotePay: 'Envíame dinero por UPI',
  linkLabelContact: 'Guardar contacto',
  linkNoteContact: 'Agrégame a tu teléfono',

  /* Pay */
  payTitle: 'Págame',
  payLead: 'UPI, directo a mi cuenta personal. El importe lo pones tú.',
  payOpenApp: 'Abrir Google Pay',
  payPickApp: 'o usa otra app',
  payAnyUpi: 'Cualquier app UPI',
  payOrCopy: 'o copia el ID',
  payCopy: 'Copiar',
  payCopied: 'Copiado',
  payScan: 'O escanea esto con cualquier app UPI.',
  payFootnote: 'Cuenta personal. El trabajo de The Adda Labs se factura aparte.',

  contactLabel: 'Saluda',
  contactSub:
    'Ya sea que tengas una idea, quieras trabajar juntos o solo pensar en voz alta. Lo leo todo y respondo a casi todo.',
  contactNoteEmail: 'Mejor para conversaciones largas',
  contactNoteGithub: 'Mira lo que construyo',
  contactNoteX: 'Para ideas rápidas e hilos',
  contactNoteLinkedin: 'Si lo prefieres formal',

  projects: {
    '01': {
      tags: ['laboratorio de ideas', 'estrategia'],
      teaser: 'Donde pruebo ideas antes de que se conviertan en productos reales.',
      why: 'Tenía demasiadas ideas y poca constancia. Necesitaba una forma de sacarlas de mi cabeza y llevarlas al mundo.',
      what: 'Construí un sistema para definir objetivos, poner a prueba mis suposiciones y hacer experimentos pequeños que generaran impulso.',
      learned:
        'Por fin las cosas empezaron a moverse. Algunas ideas funcionaron y otras no, pero todas se volvieron la base de lo que construyo ahora.',
    },
    '02': {
      tags: ['ingresos', 'ejecución'],
      teaser: 'Cómo Adda Labs se paga a sí mismo.',
      why: 'Adda Labs era genial para pulir ideas, pero quería asegurarme de que las mejores pudieran sostenerse solas.',
      what: 'Construí una capa centrada por completo en la ejecución, la creación de valor y en convertir ideas validadas en resultados reales.',
      learned:
        'Así compruebo si una idea de verdad se sostiene. Todavía es pronto, pero evoluciona cada día.',
    },
    '03': {
      tags: ['asesoría', 'marca'],
      teaser: 'Ayudar a la productora de un amigo a encontrar su voz.',
      why: 'Un amigo montó una productora y necesitaba ayuda para descubrir cómo presentarse al mundo.',
      what: 'Le ayudé a definir su posicionamiento, guié la web y encontré formas de usar la tecnología para que el negocio fluyera mejor.',
      learned: 'Ganaron mucha claridad sobre cómo se presentan y cómo trabajan en el día a día.',
    },
    '04': {
      tags: ['diseño web', 'trabajo con clientes'],
      teaser: 'Una casa limpia y profesional para un negocio de exportación farmacéutica.',
      why: 'El cliente necesitaba una web con la seriedad suficiente para hablar con compradores internacionales, sin adornos.',
      what: 'Diseñé y construí el sitio centrándome en la claridad y en ir directo al grano.',
      learned: 'Está en línea, funcionando y haciendo exactamente lo que debía hacer.',
    },
  },

  projWhy: 'Por qué lo construí',
  projWhat: 'Qué hice',
  projHappened: 'Qué pasó',
  projView: 'Ver proyecto',

  doorTitle: 'Sigue el proceso',
  doorSub: 'Escribo cuando algo cambia de verdad. Sin calendario, sin relleno, y puedes salir cuando quieras.',
  doorPlaceholder: 'tu@email.com',
  doorButton: 'Unirme a la lista',
  doorSending: 'Añadiéndote',
  doorConsent: 'Acepto recibir estos correos y que se guarde mi dirección con ese fin.',
  doorPrivacy: 'Cómo trato tus datos',
  doorSuccess: 'Ya estás dentro. Solo escribiré cuando haya algo real que contar.',
  doorErrorConsent: 'Marca la casilla para dar tu consentimiento.',
  doorErrorEmail: 'Esa dirección no parece correcta.',
  doorErrorGeneric: 'No se ha podido enviar. Inténtalo en un momento.',

  footerCta: 'Hablemos',
  footerSub: 'Si tienes una idea o solo quieres pensar en voz alta, mi bandeja está abierta.',
  footerBuilt: 'Construido en público.',

  nfTitle: 'Aquí no hay nada',
  nfSub: 'Esta página no existe. A diferencia de la opinión que mi gato tiene de mí, que es muy real y bastante desfavorable.',
  nfHome: 'Volver al inicio',
  nfLearn: 'O mírame probando cosas en vivo',
}

export const dict: Record<Locale, Dict> = { en, hi, mr, es }

export function isLocale(value: string | null): value is Locale {
  return value !== null && (locales as readonly string[]).includes(value)
}
