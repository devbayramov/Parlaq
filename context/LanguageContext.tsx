import { auth, db } from "@/services/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "az" | "en" | "ru";

interface Translations {
  // Common
  save: string;
  cancel: string;
  next: string;
  back: string;
  skip: string;
  start: string;
  close: string;
  submit: string;
  loading: string;
  error: string;
  success: string;

  // Tabs
  homeTab: string;
  healthy: string;
  profile: string;
  testTab: string;

  // Home
  greeting: string;
  howAreYou: string;
  tests: string;
  seeAll: string;
  medicalExams: string;
  sportActivities: string;
  quickLinks: string;
  dailyTip: string;
  dailyTips: string[];

  // BMI
  bmiTitle: string;
  bmiData: string;
  bmiDataSubtitle: string;
  weight: string;
  height: string;
  weightKg: string;
  heightCm: string;
  calculatedBmi: string;
  saveBmi: string;
  later: string;
  bmiUpdateInfo: string;
  daysUntilUpdate: string;
  updateWeightData: string;
  healthTrackingNeeded: string;
  underweight: string;
  normal: string;
  overweight: string;
  obese: string;

  // Profile
  personalInfo: string;
  firstName: string;
  lastName: string;
  age: string;
  healthInfo: string;
  settings: string;
  language: string;
  notification: string;
  selectLanguage: string;
  azerbaijani: string;
  english: string;
  russian: string;
  logout: string;

  // Tests
  searchTest: string;
  iqTests: string;
  psychologyTests: string;
  funTests: string;
  logic: string;
  mathematics: string;
  personality: string;
  emotional: string;
  game: string;
  art: string;

  // Examinations
  medicalExaminations: string;
  eyeExam: string;
  scoliosis: string;
  footExam: string;
  nerveExam: string;

  // Sports
  sportsExercises: string;
  upperBody: string;
  lowerBody: string;
  core: string;
  cardio: string;

  // Test Results
  testCompleted: string;
  correctAnswers: string;
  passed: string;
  tryHarder: string;
  retryTest: string;
  goBack: string;
  question: string;

  // Notifications
  allNotifications: string;
  periodicCheckups: string;
  newTestsCampaigns: string;

  // Auth
  login: string;
  register: string;
  email: string;
  password: string;
  confirmPassword: string;
  noAccount: string;
  haveAccount: string;
  registerNow: string;
  loginNow: string;
}

const translations: Record<Language, Translations> = {
  az: {
    // Common
    save: "Yadda saxla",
    cancel: "Ləğv et",
    next: "Sonrakı",
    back: "Geri",
    skip: "Keç",
    start: "Başla",
    close: "Bağla",
    submit: "Təsdiq et",
    loading: "Yüklənir...",
    error: "Xəta",
    success: "Uğurlu",



    // Tabs
    homeTab: "Əsas",
    healthy: "Sağlamlıq",
    profile: "Profil",
    testTab: "Testlər",

    // Home
    greeting: "Salam,",
    howAreYou: "Bugün necəsən?",
    tests: "Testlər",
    seeAll: "Hamısı",
    medicalExams: "Tibbi Yoxlanışlar",
    sportActivities: "İdman Hərəkətləri",
    quickLinks: "Sürətli Keçidlər",
    dailyTip: "Günün Məsləhəti",
    dailyTips: [
      "Gündə ən azı 30 dəqiqə fiziki aktivlik sağlamlığınız üçün faydalıdır!",
      "Gündə 8 stəkan su içmək bədəninizi hidratlaşdırır və enerjinizi artırır.",
      "Yaxşı yuxu sağlamlığın əsasıdır - gecə 7-9 saat yatmağa çalışın.",
      "Meyvə və tərəvəz yeməyi unutmayın - onlar vitaminlərlə zəngindir!",
      "Düzgün oturuş vəziyyəti onurğa sağlamlığınız üçün çox vacibdir.",
      "Gözlərinizi qoruyun - ekrana baxarkən hər 20 dəqiqədə fasilə verin.",
      "Səhər yeməyi günün ən vacib yeməyidir - onu qaçırmayın!",
      "Stressdən uzaq durmaq üçün dərin nəfəs almağı unutmayın.",
      "Ailənizlə vaxt keçirmək emosional sağlamlığınız üçün faydalıdır.",
      "Kitab oxumaq beyninizi gücləndirir və yaddaşınızı yaxşılaşdırır.",
    ],

    // BMI
    bmiTitle: "Bədən Kütlə İndeksi",
    bmiData: "Çəki Məlumatları",
    bmiDataSubtitle: "Sağlamlığınızı izləmək üçün çəki və boyunuzu daxil edin",
    weight: "Çəki",
    height: "Boy",
    weightKg: "Çəki (kq)",
    heightCm: "Boy (sm)",
    calculatedBmi: "Hesablanmış BKİ:",
    saveBmi: "Yadda saxla",
    later: "Sonra",
    bmiUpdateInfo: "Məlumatlar 15 gündən bir yenilənməlidir",
    daysUntilUpdate: "gün sonra yenilənəcək",
    updateWeightData: "Çəki məlumatlarınızı yeniləyin",
    healthTrackingNeeded: "Sağlamlığınızı izləmək üçün məlumat lazımdır",
    underweight: "Arıq",
    normal: "Normal",
    overweight: "Artıq çəki",
    obese: "Piylənmə",

    // Profile
    personalInfo: "Şəxsi Məlumat",
    firstName: "Ad",
    lastName: "Soyad",
    age: "Yaş",
    healthInfo: "Sağlamlıq Məlumatı",
    settings: "Ayarlar",
    language: "Dil",
    notification: "Bildirişləri tənzimlə",
    selectLanguage: "Dil Seçin",
    azerbaijani: "Azərbaycanca",
    english: "English",
    russian: "Русский",
    logout: "Çıxış",

    // Tests
    searchTest: "Test axtar...",
    iqTests: "IQ Testləri",
    psychologyTests: "Psixologiya Testləri",
    funTests: "Maraqlı Testlər",
    logic: "Məntiq",
    mathematics: "Riyaziyyat",
    personality: "Şəxsiyyət",
    emotional: "Emosional",
    game: "Oyun",
    art: "Sənət",

    // Examinations
    medicalExaminations: "Tibbi Yoxlanışlar",
    eyeExam: "Göz yoxlanışı",
    scoliosis: "Skolyoz",
    footExam: "Ayaq düzlüyü",
    nerveExam: "Sinir yoxlanışı",

    // Sports
    sportsExercises: "İdman Hərəkətləri",
    upperBody: "Üst Bədən",
    lowerBody: "Alt Bədən",
    core: "Qarın",
    cardio: "Kardio",

    // Test Results
    testCompleted: "Test Tamamlandı",
    correctAnswers: "doğru cavab",
    passed: "Uğurlu! Siz testdən keçdiniz.",
    tryHarder: "Daha çox çalış!",
    retryTest: "Yenidən cəhd et",
    goBack: "Geri qayıt",
    question: "Sual",

    // Notifications
    allNotifications: "Bütün bildirişlər",
    periodicCheckups: "Mütəmadi yoxlanış bildirişləri",
    newTestsCampaigns: "Yeni testlər və kampaniyalar",

    // Auth
    login: "Daxil Olun",
    register: "Qeydiyyat",
    email: "E-Mail",
    password: "Parol",
    confirmPassword: "Parolu təsdiqlə",
    noAccount: "Hesabınız yoxdur?",
    haveAccount: "Hesabınız var?",
    registerNow: "Qeydiyyatdan keç",
    loginNow: "Daxil olun",
  },
  en: {
    // Common
    save: "Save",
    cancel: "Cancel",
    next: "Next",
    back: "Back",
    skip: "Skip",
    start: "Start",
    close: "Close",
    submit: "Submit",
    loading: "Loading...",
    error: "Error",
    success: "Success",

    // Tabs
    homeTab: "Home",
    healthy: "Healthy",
    profile: "Profile",
    testTab: "Tests",

    // Home
    greeting: "Hello,",
    howAreYou: "How are you today?",
    tests: "Tests",
    seeAll: "See All ",
    medicalExams: "Medical Examinations",
    sportActivities: "Sport Activities",
    quickLinks: "Quick Links",
    dailyTip: "Daily Tip",
    dailyTips: [
      "At least 30 minutes of physical activity per day is beneficial for your health!",
      "Drinking 8 glasses of water daily keeps your body hydrated and boosts energy.",
      "Good sleep is the foundation of health - try to sleep 7-9 hours at night.",
      "Don't forget to eat fruits and vegetables - they are rich in vitamins!",
      "Proper sitting posture is very important for your spine health.",
      "Protect your eyes - take a break every 20 minutes when looking at the screen.",
      "Breakfast is the most important meal of the day - don't skip it!",
      "Remember to take deep breaths to stay away from stress.",
      "Spending time with family is good for your emotional health.",
      "Reading books strengthens your brain and improves your memory.",
    ],

    // BMI
    bmiTitle: "Body Mass Index",
    bmiData: "Weight Data",
    bmiDataSubtitle: "Enter your weight and height to track your health",
    weight: "Weight",
    height: "Height",
    weightKg: "Weight (kg)",
    heightCm: "Height (cm)",
    calculatedBmi: "Calculated BMI:",
    saveBmi: "Save",
    later: "Later",
    bmiUpdateInfo: "Data should be updated every 15 days",
    daysUntilUpdate: "days until update",
    updateWeightData: "Update your weight data",
    healthTrackingNeeded: "Data needed for health tracking",
    underweight: "Underweight",
    normal: "Normal",
    overweight: "Overweight",
    obese: "Obese",

    // Profile
    personalInfo: "Personal Information",
    firstName: "First Name",
    lastName: "Last Name",
    age: "Age",
    healthInfo: "Health Information",
    settings: "Settings",
    language: "Language",
    notification: "Notification",
    selectLanguage: "Select Language",
    azerbaijani: "Azerbaijani",
    english: "English",
    russian: "Russian",
    logout: "Logout",

    // Tests
    searchTest: "Search test...",
    iqTests: "IQ Tests",
    psychologyTests: "Psychology Tests",
    funTests: "Fun Tests",
    logic: "Logic",
    mathematics: "Mathematics",
    personality: "Personality",
    emotional: "Emotional",
    game: "Game",
    art: "Art",

    // Examinations
    medicalExaminations: "Medical Examinations",
    eyeExam: "Eye Examination",
    scoliosis: "Scoliosis",
    footExam: "Foot Alignment",
    nerveExam: "Nerve Examination",

    // Sports
    sportsExercises: "Sport Exercises",
    upperBody: "Upper Body",
    lowerBody: "Lower Body",
    core: "Core",
    cardio: "Cardio",

    // Test Results
    testCompleted: "Test Completed",
    correctAnswers: "correct answers",
    passed: "Success! You passed the test.",
    tryHarder: "Try harder!",
    retryTest: "Try again",
    goBack: "Go back",
    question: "Question",

    // Notifications
    allNotifications: "All notifications",
    periodicCheckups: "Periodic checkup notifications",
    newTestsCampaigns: "New tests and campaigns",

    // Auth
    login: "Login",
    register: "Register",
    email: "E-Mail",
    password: "Password",
    confirmPassword: "Confirm Password",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    registerNow: "Register now",
    loginNow: "Login now",
  },
  ru: {
    // Common
    save: "Сохранить",
    cancel: "Отмена",
    next: "Далее",
    back: "Назад",
    skip: "Пропустить",
    start: "Начать",
    close: "Закрыть",
    submit: "Подтвердить",
    loading: "Загрузка...",
    error: "Ошибка",
    success: "Успешно",

    // Tabs
    homeTab: "Главная",
    healthy: "Здоровье",
    profile: "Профиль",
    testTab: "Тесты",

    // Home
    greeting: "Привет,",
    howAreYou: "Как ты сегодня?",
    tests: "Тесты",
    seeAll: "Все ",
    medicalExams: "Медицинские осмотры",
    sportActivities: "Спортивные упражнения",
    quickLinks: "Быстрые ссылки",
    dailyTip: "Совет дня",
    dailyTips: [
      "Минимум 30 минут физической активности в день полезны для вашего здоровья!",
      "8 стаканов воды в день поддерживают гидратацию и повышают энергию.",
      "Хороший сон - основа здоровья. Старайтесь спать 7-9 часов ночью.",
      "Не забывайте есть фрукты и овощи - они богаты витаминами!",
      "Правильная осанка очень важна для здоровья позвоночника.",
      "Берегите глаза - делайте перерыв каждые 20 минут при работе с экраном.",
      "Завтрак - самый важный прием пищи. Не пропускайте его!",
      "Не забывайте глубоко дышать, чтобы избежать стресса.",
      "Время с семьей полезно для вашего эмоционального здоровья.",
      "Чтение книг укрепляет мозг и улучшает память.",
    ],

    // BMI
    bmiTitle: "Индекс массы тела",
    bmiData: "Данные о весе",
    bmiDataSubtitle: "Введите свой вес и рост для отслеживания здоровья",
    weight: "Вес",
    height: "Рост",
    weightKg: "Вес (кг)",
    heightCm: "Рост (см)",
    calculatedBmi: "Рассчитанный ИМТ:",
    saveBmi: "Сохранить",
    later: "Позже",
    bmiUpdateInfo: "Данные должны обновляться каждые 15 дней",
    daysUntilUpdate: "дней до обновления",
    updateWeightData: "Обновите данные о весе",
    healthTrackingNeeded: "Данные необходимы для отслеживания здоровья",
    underweight: "Недостаточный вес",
    normal: "Нормальный",
    overweight: "Избыточный вес",
    obese: "Ожирение",

    // Profile
    personalInfo: "Личная информация",
    firstName: "Имя",
    lastName: "Фамилия",
    age: "Возраст",
    healthInfo: "Информация о здоровье",
    settings: "Настройки",
    language: "Язык",
    notification: "Уведомления",
    selectLanguage: "Выберите язык",
    azerbaijani: "Азербайджанский",
    english: "Английский",
    russian: "Русский",
    logout: "Выйти",

    // Tests
    searchTest: "Поиск теста...",
    iqTests: "IQ Тесты",
    psychologyTests: "Психологические тесты",
    funTests: "Интересные тесты",
    logic: "Логика",
    mathematics: "Математика",
    personality: "Личность",
    emotional: "Эмоциональный",
    game: "Игра",
    art: "Искусство",

    // Examinations
    medicalExaminations: "Медицинские осмотры",
    eyeExam: "Проверка зрения",
    scoliosis: "Сколиоз",
    footExam: "Плоскостопие",
    nerveExam: "Неврологический осмотр",

    // Sports
    sportsExercises: "Спортивные упражнения",
    upperBody: "Верхняя часть тела",
    lowerBody: "Нижняя часть тела",
    core: "Пресс",
    cardio: "Кардио",

    // Test Results
    testCompleted: "Тест завершен",
    correctAnswers: "правильных ответов",
    passed: "Успех! Вы прошли тест.",
    tryHarder: "Старайтесь больше!",
    retryTest: "Попробовать снова",
    goBack: "Вернуться",
    question: "Вопрос",

    // Notifications
    allNotifications: "Все уведомления",
    periodicCheckups: "Периодические уведомления о проверках",
    newTestsCampaigns: "Новые тесты и акции",

    // Auth
    login: "Войти",
    register: "Регистрация",
    email: "E-Mail",
    password: "Пароль",
    confirmPassword: "Подтвердите пароль",
    noAccount: "Нет аккаунта?",
    haveAccount: "Уже есть аккаунт?",
    registerNow: "Зарегистрироваться",
    loginNow: "Войти",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("az");

  useEffect(() => {
    // Load language from Firebase when user is authenticated
    const loadLanguage = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const savedLang = userDoc.data().language as Language;
            if (savedLang && ["az", "en", "ru"].includes(savedLang)) {
              setLanguageState(savedLang);
            }
          }
        } catch (error) {
          console.error("Error loading language:", error);
        }
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);

    // Save to Firebase
    const user = auth.currentUser;
    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          language: lang,
        });
      } catch (error) {
        console.error("Error saving language:", error);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export { translations };
