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
  mentalHealthTest: string;
  alcoholTest: string;
  wellbeingTest: string;
  depressionTest: string;

  // Examinations
  medicalExaminations: string;
  eyeExam: string;
  scoliosis: string;
  footExam: string;
  nerveExam: string;
  dentalExam: string;

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
      "Orqanizmin normal fəaliyyəti üçün gün ərzində kifayət qədər su qəbul etmək vacibdir.",
      "Gündəlik fiziki aktivlik ürək-damar sisteminin sağlamlığını dəstəkləyir.",
      "Uzun müddət oturaq qalmaq metabolik problemlərə səbəb ola bilər.",
      "Müntəzəm yuxu rejimi hormon balansını qorumağa kömək edir.",
      "Sağlam qidalanma immun sisteminin güclü qalmasını təmin edir.",
      "Tərəvəz və meyvələrin gündəlik qəbulu vitamin və minerallarla təmin edir.",
      "Tam taxıl məhsulları enerji səviyyəsinin stabil qalmasına kömək edir.",
      "Fiziki aktivlik qan dövranını yaxşılaşdırır.",
      "Günəş işığı D vitamininin sintezi üçün vacibdir.",
      "Duz qəbulunun azaldılması arterial təzyiqin idarə olunmasına kömək edir.",
      "Şəkərli qidaların həddindən artıq qəbulu metabolik xəstəliklər riskini artırır.",
      "Müntəzəm gəzinti ürək və ağciyər funksiyasını yaxşılaşdırır.",
      "Bədən çəkisinin normal saxlanılması diabet riskini azalda bilər.",
      "Peyvəndlər yoluxucu xəstəliklərin qarşısını almağın effektiv üsullarındandır.",
      "Qısa hərəkət fasilələri qan dövranını aktiv saxlayır.",
      "Sağlam səhər yeməyi gün ərzində enerji səviyyəsini artırır.",
      "Balıq məhsulları omega‑3 yağ turşularının əsas mənbələrindəndir.",
      "Qoz-fındıq ürək sağlamlığı üçün faydalı yağlar ehtiva edir.",
      "Liflə zəngin qidalar bağırsaq fəaliyyətini dəstəkləyir.",
      "Gün ərzində aktif olmaq metabolizmi sürətləndirə bilər.",
      "Dişlərin gündə iki dəfə fırçalanması kariyes riskini azaldır.",
      "Diş ipindən istifadə dişlərin arasındakı bakteriyaların azalmasına kömək edir.",
      "Diş fırçasını hər 3–4 ayda bir dəyişmək tövsiyə olunur.",
      "Stomatoloji müayinədən müntəzəm keçmək ağız sağlamlığını qorumağa kömək edir.",
      "Şirin qidalardan sonra ağzı su ilə yaxalamaq faydalı vərdişdir.",
      "Fluor tərkibli diş pastası diş minasını gücləndirə bilər.",
      "Ağız boşluğunun gigiyenası ümumi sağlamlıqla sıx əlaqəlidir.",
      "Diş əti qanaması periodontal problemlərin göstəricisi ola bilər.",
      "Gecə dişlərin sıxılması (bruksizm) diş minasına zərər verə bilər.",
      "Şəkərli içkilərin tez-tez qəbulu kariyes riskini artırır.",
      "Ağız quruluğu bakteriyaların çoxalmasına səbəb ola bilər.",
      "Dil səthinin təmizlənməsi ağız qoxusunun azalmasına kömək edir.",
      "Müntəzəm professional diş təmizliyi diş daşlarının qarşısını alır.",
      "Kalsiumla zəngin qidalar diş və sümüklər üçün faydalıdır.",
      "Dişlərin düzgün fırçalanma texnikası diş əti sağlamlığını qoruyur.",
      "Ağız gigiyenasına diqqət infeksiya riskini azaldır.",
      "Stomatoloqa vaxtında müraciət erkən diaqnoza imkan verir.",
      "Dişlərdə həssaslıq mina eroziyasının göstəricisi ola bilər.",
      "Saqqız çeynəmək tüpürcək ifrazını artıraraq ağız mühitini qoruyur.",
      "Ağız boşluğunun sağlamlığı həzm prosesinə də təsir göstərə bilər.",
      "Dərin nəfəs alma məşqləri stressi azaltmağa kömək edə bilər.",
      "Müntəzəm istirahət fasilələri zehni yorğunluğu azaldır.",
      "Kitab oxumaq beynin aktiv qalmasına kömək edir.",
      "Yeni bacarıqlar öyrənmək zehni inkişafı stimullaşdırır.",
      "Sosial münasibətlər psixoloji sağlamlıq üçün vacibdir.",
      "Gülmək stress hormonlarının azalmasına kömək edə bilər.",
      "Musiqi dinləmək emosional rahatlıq yarada bilər.",
      "Fiziki aktivlik əhval-ruhiyyəni yaxşılaşdıran hormonların ifrazını artırır.",
      "Yaxşı yuxu psixoloji balans üçün vacibdir.",
      "Meditasiya diqqətin və konsentrasiyanın yaxşılaşmasına kömək edə bilər.",
      "Vaxtın düzgün planlaşdırılması stress səviyyəsini azalda bilər.",
      "Hobbilər zehni rahatlama üçün faydalıdır.",
      "Pozitiv düşüncə psixoloji rifahı dəstəkləyir.",
      "Gün ərzində qısa fasilələr məhsuldarlığı artırır.",
      "Yaxın insanlarla ünsiyyət emosional dəstək yaradır.",
      "Təbiətdə vaxt keçirmək psixoloji rahatlıq gətirə bilər.",
      "Ekran qarşısında uzun müddət qalmaq zehni yorğunluğu artırır.",
      "Diqqət və yaddaş məşqləri beynin fəaliyyətini gücləndirə bilər.",
      "Məqsəd qoymaq motivasiyanı artırır.",
      "Stressin idarə olunması ümumi sağlamlıq üçün vacibdir.",
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
    mentalHealthTest: "Psixi Sorğu",
    alcoholTest: "Alkoqol Testi",
    wellbeingTest: "Rifah Testi",
    depressionTest: "Depressiya testi",

    // Examinations
    medicalExaminations: "Tibbi Yoxlanışlar",
    eyeExam: "Göz yoxlanışı",
    scoliosis: "Skolyoz",
    footExam: "Ayaq düzlüyü",
    nerveExam: "Sinir yoxlanışı",
    dentalExam: "Diş yoxlanışı",

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
      "Drinking enough water throughout the day is essential for the body's normal functioning.",
      "Daily physical activity supports the health of the cardiovascular system.",
      "Sitting for long periods can lead to metabolic problems.",
      "A regular sleep schedule helps maintain hormonal balance.",
      "Healthy nutrition ensures the immune system stays strong.",
      "Daily consumption of vegetables and fruits provides vitamins and minerals.",
      "Whole grain products help keep energy levels stable.",
      "Physical activity improves blood circulation.",
      "Sunlight is essential for the synthesis of vitamin D.",
      "Reducing salt intake helps manage arterial blood pressure.",
      "Excessive consumption of sugary foods increases the risk of metabolic diseases.",
      "Regular walking improves heart and lung function.",
      "Maintaining a healthy body weight can reduce the risk of diabetes.",
      "Vaccines are an effective way to prevent infectious diseases.",
      "Short movement breaks keep blood circulation active.",
      "A healthy breakfast increases energy levels throughout the day.",
      "Fish products are among the main sources of omega-3 fatty acids.",
      "Nuts contain healthy fats that are beneficial for heart health.",
      "Fiber-rich foods support intestinal function.",
      "Staying active throughout the day can speed up metabolism.",
      "Brushing teeth twice a day reduces the risk of cavities.",
      "Using dental floss helps reduce bacteria between teeth.",
      "It is recommended to change your toothbrush every 3–4 months.",
      "Regular dental check-ups help maintain oral health.",
      "Rinsing your mouth with water after eating sweets is a beneficial habit.",
      "Fluoride toothpaste can strengthen tooth enamel.",
      "Oral hygiene is closely linked to overall health.",
      "Bleeding gums can be an indicator of periodontal problems.",
      "Nighttime teeth grinding (bruxism) can damage tooth enamel.",
      "Frequent consumption of sugary drinks increases the risk of cavities.",
      "Dry mouth can lead to bacterial growth.",
      "Cleaning the tongue surface helps reduce bad breath.",
      "Regular professional dental cleaning prevents tartar buildup.",
      "Calcium-rich foods are beneficial for teeth and bones.",
      "Proper tooth brushing technique protects gum health.",
      "Attention to oral hygiene reduces the risk of infection.",
      "Timely visits to the dentist allow for early diagnosis.",
      "Tooth sensitivity can be an indicator of enamel erosion.",
      "Chewing gum increases saliva flow and protects the oral environment.",
      "Oral health can also affect the digestive process.",
      "Deep breathing exercises can help reduce stress.",
      "Regular rest breaks reduce mental fatigue.",
      "Reading books helps keep the brain active.",
      "Learning new skills stimulates mental development.",
      "Social relationships are important for psychological health.",
      "Laughing can help reduce stress hormones.",
      "Listening to music can create emotional relaxation.",
      "Physical activity increases the release of hormones that improve mood.",
      "Good sleep is essential for psychological balance.",
      "Meditation can help improve attention and concentration.",
      "Proper time management can reduce stress levels.",
      "Hobbies are beneficial for mental relaxation.",
      "Positive thinking supports psychological well-being.",
      "Short breaks throughout the day increase productivity.",
      "Communication with loved ones creates emotional support.",
      "Spending time in nature can bring psychological peace.",
      "Spending long periods in front of screens increases mental fatigue.",
      "Attention and memory exercises can strengthen brain function.",
      "Setting goals increases motivation.",
      "Managing stress is important for overall health.",
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
    mentalHealthTest: "Mental Health Test",
    alcoholTest: "Alcohol Test",
    wellbeingTest: "Wellbeing Test",
    depressionTest: "Depression Screening",

    // Examinations
    medicalExaminations: "Medical Examinations",
    eyeExam: "Eye Examination",
    scoliosis: "Scoliosis",
    footExam: "Foot Alignment",
    nerveExam: "Nerve Examination",
    dentalExam: "Dental Examination",

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
      "Употребление достаточного количества воды в течение дня необходимо для нормальной работы организма.",
      "Ежедневная физическая активность поддерживает здоровье сердечно-сосудистой системы.",
      "Длительное сидение может привести к метаболическим проблемам.",
      "Регулярный режим сна помогает поддерживать гормональный баланс.",
      "Здоровое питание обеспечивает сохранение иммунной системы в сильном состоянии.",
      "Ежедневное употребление овощей и фруктов обеспечивает витаминами и минералами.",
      "Продукты из цельного зерна помогают поддерживать стабильный уровень энергии.",
      "Физическая активность улучшает кровообращение.",
      "Солнечный свет необходим для синтеза витамина D.",
      "Снижение потребления соли помогает контролировать артериальное давление.",
      "Чрезмерное употребление сладкой пищи повышает риск метаболических заболеваний.",
      "Регулярные прогулки улучшают функцию сердца и лёгких.",
      "Поддержание нормальной массы тела может снизить риск диабета.",
      "Вакцины являются эффективным способом профилактики инфекционных заболеваний.",
      "Короткие двигательные паузы поддерживают активное кровообращение.",
      "Здоровый завтрак повышает уровень энергии в течение дня.",
      "Рыбные продукты являются одним из основных источников омега-3 жирных кислот.",
      "Орехи содержат полезные жиры, благотворные для здоровья сердца.",
      "Продукты, богатые клетчаткой, поддерживают работу кишечника.",
      "Активность в течение дня может ускорить обмен веществ.",
      "Чистка зубов дважды в день снижает риск кариеса.",
      "Использование зубной нити помогает уменьшить количество бактерий между зубами.",
      "Рекомендуется менять зубную щётку каждые 3–4 месяца.",
      "Регулярные визиты к стоматологу помогают поддерживать здоровье полости рта.",
      "Полоскание рта водой после употребления сладкого — полезная привычка.",
      "Фторсодержащая зубная паста может укрепить зубную эмаль.",
      "Гигиена полости рта тесно связана с общим состоянием здоровья.",
      "Кровоточивость дёсен может быть признаком пародонтальных проблем.",
      "Ночное скрежетание зубами (бруксизм) может повредить зубную эмаль.",
      "Частое употребление сладких напитков повышает риск кариеса.",
      "Сухость во рту может стать причиной размножения бактерий.",
      "Очищение поверхности языка помогает уменьшить неприятный запах изо рта.",
      "Регулярная профессиональная чистка зубов предотвращает образование зубного камня.",
      "Продукты, богатые кальцием, полезны для зубов и костей.",
      "Правильная техника чистки зубов защищает здоровье дёсен.",
      "Внимание к гигиене полости рта снижает риск инфекций.",
      "Своевременное обращение к стоматологу позволяет поставить ранний диагноз.",
      "Чувствительность зубов может быть признаком эрозии эмали.",
      "Жевание жвачки увеличивает выработку слюны и защищает среду полости рта.",
      "Здоровье полости рта также может влиять на процесс пищеварения.",
      "Упражнения на глубокое дыхание могут помочь снизить стресс.",
      "Регулярные перерывы на отдых снижают умственную усталость.",
      "Чтение книг помогает поддерживать активность мозга.",
      "Изучение новых навыков стимулирует умственное развитие.",
      "Социальные отношения важны для психологического здоровья.",
      "Смех может помочь снизить уровень гормонов стресса.",
      "Прослушивание музыки может создать эмоциональное расслабление.",
      "Физическая активность усиливает выработку гормонов, улучшающих настроение.",
      "Хороший сон необходим для психологического равновесия.",
      "Медитация может помочь улучшить внимание и концентрацию.",
      "Правильное планирование времени может снизить уровень стресса.",
      "Хобби полезны для умственного расслабления.",
      "Позитивное мышление поддерживает психологическое благополучие.",
      "Короткие перерывы в течение дня повышают продуктивность.",
      "Общение с близкими людьми создаёт эмоциональную поддержку.",
      "Время, проведённое на природе, может принести психологический покой.",
      "Длительное нахождение перед экраном увеличивает умственную усталость.",
      "Упражнения на внимание и память могут укрепить функции мозга.",
      "Постановка целей повышает мотивацию.",
      "Управление стрессом важно для общего здоровья.",
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
    mentalHealthTest: "Психическое здоровье",
    alcoholTest: "Тест на алкоголь",
    wellbeingTest: "Тест благополучия",
    depressionTest: "Скрининг депрессии",

    // Examinations
    medicalExaminations: "Медицинские осмотры",
    eyeExam: "Проверка зрения",
    scoliosis: "Сколиоз",
    footExam: "Плоскостопие",
    nerveExam: "Неврологический осмотр",
    dentalExam: "Стоматологический осмотр",

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
