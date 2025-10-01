// Mock i18n implementation - ready for real i18n library integration

interface TranslationKeys {
  // Common
  'common.loading': string;
  'common.error': string;
  'common.success': string;
  'common.cancel': string;
  'common.submit': string;
  'common.save': string;
  'common.delete': string;
  'common.edit': string;
  'common.view': string;
  'common.back': string;
  'common.next': string;
  'common.previous': string;
  
  // Auth
  'auth.login': string;
  'auth.logout': string;
  'auth.selectRole': string;
  'auth.welcome': string;
  
  // Navigation
  'nav.dashboard': string;
  'nav.checklist': string;
  'nav.videos': string;
  'nav.reports': string;
  'nav.profile': string;
  
  // Dashboard
  'dashboard.welcome': string;
  'dashboard.todaysChecklist': string;
  'dashboard.videoOfTheDay': string;
  'dashboard.quickActions': string;
  
  // Checklist
  'checklist.title': string;
  'checklist.completed': string;
  'checklist.pending': string;
  'checklist.submit': string;
  
  // Hazard Reporting
  'hazard.reportTitle': string;
  'hazard.description': string;
  'hazard.location': string;
  'hazard.severity': string;
  
  // Videos
  'video.watchNow': string;
  'video.duration': string;
  'video.category': string;
}

type Language = 'en' | 'hi' | 'te' | 'ta';

const translations: Record<Language, TranslationKeys> = {
  en: {
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    
    // Auth
    'auth.login': 'Login',
    'auth.logout': 'Logout',
    'auth.selectRole': 'Select Your Role',
    'auth.welcome': 'Welcome to MineLy',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.checklist': 'Checklist',
    'nav.videos': 'Videos',
    'nav.reports': 'Reports',
    'nav.profile': 'Profile',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.todaysChecklist': "Today's Checklist",
    'dashboard.videoOfTheDay': 'Video of the Day',
    'dashboard.quickActions': 'Quick Actions',
    
    // Checklist
    'checklist.title': 'Safety Checklist',
    'checklist.completed': 'Completed',
    'checklist.pending': 'Pending',
    'checklist.submit': 'Submit Checklist',
    
    // Hazard Reporting
    'hazard.reportTitle': 'Report Hazard',
    'hazard.description': 'Description',
    'hazard.location': 'Location',
    'hazard.severity': 'Severity',
    
    // Videos
    'video.watchNow': 'Watch Now',
    'video.duration': 'Duration',
    'video.category': 'Category',
  },
  
  hi: {
    // Common (Hindi)
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.cancel': 'रद्द करें',
    'common.submit': 'जमा करें',
    'common.save': 'सेव करें',
    'common.delete': 'हटाएं',
    'common.edit': 'संपादित करें',
    'common.view': 'देखें',
    'common.back': 'वापस',
    'common.next': 'अगला',
    'common.previous': 'पिछला',
    
    // Auth
    'auth.login': 'लॉगिन',
    'auth.logout': 'लॉगआउट',
    'auth.selectRole': 'अपनी भूमिका चुनें',
    'auth.welcome': 'MineLy में आपका स्वागत है',
    
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.checklist': 'चेकलिस्ट',
    'nav.videos': 'वीडियो',
    'nav.reports': 'रिपोर्ट',
    'nav.profile': 'प्रोफाइल',
    
    // Dashboard
    'dashboard.welcome': 'वापसी पर स्वागत',
    'dashboard.todaysChecklist': 'आज की चेकलिस्ट',
    'dashboard.videoOfTheDay': 'आज का वीडियो',
    'dashboard.quickActions': 'त्वरित कार्य',
    
    // Checklist
    'checklist.title': 'सुरक्षा चेकलिस्ट',
    'checklist.completed': 'पूर्ण',
    'checklist.pending': 'लंबित',
    'checklist.submit': 'चेकलिस्ट जमा करें',
    
    // Hazard Reporting
    'hazard.reportTitle': 'खतरे की रिपोर्ट करें',
    'hazard.description': 'विवरण',
    'hazard.location': 'स्थान',
    'hazard.severity': 'गंभीरता',
    
    // Videos
    'video.watchNow': 'अभी देखें',
    'video.duration': 'अवधि',
    'video.category': 'श्रेणी',
  },
  
  te: {
    // Common (Telugu)
    'common.loading': 'లోడ్ అవుతోంది...',
    'common.error': 'లోపం',
    'common.success': 'విజయం',
    'common.cancel': 'రద్దు చేయండి',
    'common.submit': 'సమర్పించండి',
    'common.save': 'సేవ్ చేయండి',
    'common.delete': 'తొలగించండి',
    'common.edit': 'సవరించండి',
    'common.view': 'చూడండి',
    'common.back': 'వెనుకకు',
    'common.next': 'తదుపరి',
    'common.previous': 'మునుపటి',
    
    // Auth
    'auth.login': 'లాగిన్',
    'auth.logout': 'లాగౌట్',
    'auth.selectRole': 'మీ పాత్రను ఎంచుకోండి',
    'auth.welcome': 'MineLy కు స్వాగతం',
    
    // Navigation
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.checklist': 'చెక్‌లిస్ట్',
    'nav.videos': 'వీడియోలు',
    'nav.reports': 'నివేదికలు',
    'nav.profile': 'ప్రొఫైల్',
    
    // Dashboard
    'dashboard.welcome': 'తిరిగి స్వాగతం',
    'dashboard.todaysChecklist': 'నేటి చెక్‌లిస్ట్',
    'dashboard.videoOfTheDay': 'రోజు వీడియో',
    'dashboard.quickActions': 'త్వరిత చర్యలు',
    
    // Checklist
    'checklist.title': 'భద్రతా చెక్‌లిస్ట్',
    'checklist.completed': 'పూర్తయింది',
    'checklist.pending': 'పెండింగ్',
    'checklist.submit': 'చెక్‌లిస్ట్ సమర్పించండి',
    
    // Hazard Reporting
    'hazard.reportTitle': 'ప్రమాదం నివేదించండి',
    'hazard.description': 'వివరణ',
    'hazard.location': 'స్థానం',
    'hazard.severity': 'తీవ్రత',
    
    // Videos
    'video.watchNow': 'ఇప్పుడు చూడండి',
    'video.duration': 'వ్యవధి',
    'video.category': 'వర్గం',
  },
  
  ta: {
    // Common (Tamil)
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை',
    'common.success': 'வெற்றி',
    'common.cancel': 'ரத்து செய்',
    'common.submit': 'சமர்ப்பிக்கவும்',
    'common.save': 'சேமிக்கவும்',
    'common.delete': 'நீக்கவும்',
    'common.edit': 'திருத்தவும்',
    'common.view': 'பார்க்கவும்',
    'common.back': 'பின்',
    'common.next': 'அடுத்து',
    'common.previous': 'முந்தைய',
    
    // Auth
    'auth.login': 'உள்நுழைய',
    'auth.logout': 'வெளியேறு',
    'auth.selectRole': 'உங்கள் பாத்திரத்தை தேர்ந்தெடுக்கவும்',
    'auth.welcome': 'MineLy க்கு வரவேற்கிறோம்',
    
    // Navigation
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.checklist': 'சரிபார்ப்பு பட்டியல்',
    'nav.videos': 'வீடியோக்கள்',
    'nav.reports': 'அறிக்கைகள்',
    'nav.profile': 'சுயவிவரம்',
    
    // Dashboard
    'dashboard.welcome': 'மீண்டும் வரவேற்கிறோம்',
    'dashboard.todaysChecklist': 'இன்றைய சரிபார்ப்பு பட்டியல்',
    'dashboard.videoOfTheDay': 'இன்றைய வீடியோ',
    'dashboard.quickActions': 'விரைவு செயல்கள்',
    
    // Checklist
    'checklist.title': 'பாதுகாப்பு சரிபார்ப்பு பட்டியல்',
    'checklist.completed': 'முடிந்தது',
    'checklist.pending': 'நிலுவையில்',
    'checklist.submit': 'சரிபார்ப்பு பட்டியலை சமர்ப்பிக்கவும்',
    
    // Hazard Reporting
    'hazard.reportTitle': 'ஆபத்தை புகாரளிக்கவும்',
    'hazard.description': 'விளக்கம்',
    'hazard.location': 'இடம்',
    'hazard.severity': 'தீவிரம்',
    
    // Videos
    'video.watchNow': 'இப்போது பார்க்கவும்',
    'video.duration': 'கால அளவு',
    'video.category': 'வகை',
  },
};

class I18nService {
  private currentLanguage: Language = 'en';
  
  setLanguage(language: Language) {
    this.currentLanguage = language;
  }
  
  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }
  
  t(key: keyof TranslationKeys): string {
    return translations[this.currentLanguage][key] || key;
  }
  
  getAvailableLanguages(): Array<{ code: Language; name: string; nativeName: string }> {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
      { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
      { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    ];
  }
}

export const i18n = new I18nService();
export const t = (key: keyof TranslationKeys) => i18n.t(key);
export type { Language, TranslationKeys };
