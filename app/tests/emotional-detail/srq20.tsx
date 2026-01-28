import LikertScaleTestComponent, {
  LikertScaleTest,
} from "@/components/LikertScaleTestComponent";

const srq20Test: LikertScaleTest = {
  title: "Psixi Sorğu",
  icon: "head-question",
  instruction: "Son 30 gün üçün hər suala BƏLİ və ya XEYR seçin.",
  steps: [
    {
      id: "1",
      question: "Tez-tez baş ağrınız olurmu?",
    },
    {
      id: "2",
      question: "İştahanız zəifdir?",
    },
    {
      id: "3",
      question: "Pis yatırsınız?",
    },
    {
      id: "4",
      question: "Asanlıqla qorxursunuz?",
    },
    {
      id: "5",
      question: "Əlləriniz əsir?",
    },
    {
      id: "6",
      question: "Özünüzü gərgin hiss edirsiniz?",
    },
    {
      id: "7",
      question: "Həzm probleminiz var?",
    },
    {
      id: "8",
      question: "Aydın düşünməkdə çətinlik çəkirsiniz?",
    },
    {
      id: "9",
      question: "Özünüzü bədbəxt hiss edirsiniz?",
    },
    {
      id: "10",
      question: "Tez-tez ağlamaq istəyirsiniz?",
    },
    {
      id: "11",
      question: "Gündəlik işlər sizi yorur?",
    },
    {
      id: "12",
      question: "Qərar verməkdə çətinlik çəkirsiniz?",
    },
    {
      id: "13",
      question: "Gündəlik işlərdən zövq almırsınız?",
    },
    {
      id: "14",
      question: "Özünüzü dəyərsiz hiss edirsiniz?",
    },
    {
      id: "15",
      question: "Həyat mənasız gəlir?",
    },
    {
      id: "16",
      question: "İşlərdə maraq azalıb?",
    },
    {
      id: "17",
      question: "Özünüzü yararsız hiss edirsiniz?",
    },
    {
      id: "18",
      question: "Ölüm fikirləri olub?",
    },
    {
      id: "19",
      question: "Həmişə yorğunluq var?",
    },
    {
      id: "20",
      question: "Asanlıqla yorulursunuz?",
    },
  ],
  answers: [
    { text: "Xeyr", value: 0 },
    { text: "Bəli", value: 1 },
  ],
  maxRawScore: 20,
  multiplier: 1,
  reverseScoring: true,
  thresholds: {
    value: 7,
    warningMessage: "Psixi pozuntu ehtimalı aşkarlandı. Bir mütəxəssislə məsləhətləşmək tövsiyə olunur.",
    successMessage: "Psixi sağlamlıq göstəriciləriniz normal səviyyədədir.",
  },
};

export default function SRQ20Test() {
  return <LikertScaleTestComponent test={srq20Test} />;
}
