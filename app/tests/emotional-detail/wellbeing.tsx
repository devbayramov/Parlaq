import LikertScaleTestComponent, {
  LikertScaleTest,
} from "@/components/LikertScaleTestComponent";

const wellbeingTest: LikertScaleTest = {
  title: "Rifah testi",
  icon: "emoticon-happy",
  instruction: "Son 2 həftə ərzində aşağıdakı ifadələrə nə dərəcədə uyğun olduğunuzu seçin.",
  steps: [
    {
      id: "1",
      question: "Özümü şən və əhvalım yaxşı hiss etdim",
    },
    {
      id: "2",
      question: "Özümü sakit və rahat hiss etdim",
    },
    {
      id: "3",
      question: "Özümü aktiv və enerjili hiss etdim",
    },
    {
      id: "4",
      question: "Səhər oyandıqda özümü dincəlmiş hiss etdim",
    },
    {
      id: "5",
      question: "Gündəlik həyatım maraqlı oldu",
    },
  ],
  answers: [
    { text: "Heç vaxt", value: 0 },
    { text: "Bəzən", value: 1 },
    { text: "Az hallarda", value: 2 },
    { text: "Çox vaxt", value: 3 },
    { text: "Həmişə", value: 4 },
  ],
  maxRawScore: 25,
  multiplier: 4,
  thresholds: {
    value: 50,
    warningMessage: "Rifaha azalma aşkarlandı. Depressiya riski mövcud ola bilər. Bir mütəxəssislə məsləhətləşmək tövsiyə olunur.",
    successMessage: "Rifah səviyyəniz yaxşıdır. Pozitiv psixoloji vəziyyətinizi qorumağa davam edin.",
  },
};

export default function WellbeingTest() {
  return <LikertScaleTestComponent test={wellbeingTest} />;
}
