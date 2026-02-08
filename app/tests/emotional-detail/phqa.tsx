import LikertScaleTestComponent, {
  LikertScaleTest,
} from "@/components/LikertScaleTestComponent";

const phqaTest: LikertScaleTest = {
  title: "Depressiya testi (PHQ-A)",
  icon: "emoticon-sad",
  instruction:
    "Son 2 həftə ərzində aşağıdakı problemlərdən hər hansı biri sizi nə qədər tez-tez narahat edib?",
  steps: [
    {
      id: "1",
      question:
        "Son 2 həftədə nə qədər tez-tez marağımı itirdim / əyləncəyə maraq duymadım?",
    },
    {
      id: "2",
      question:
        "Son 2 həftədə nə qədər tez-tez kədərli, ümidsiz və ya özünü pis hiss etdim?",
    },
    {
      id: "3",
      question:
        "Son 2 həftədə nə qədər tez-tez yuxu problemləri yaşadım?",
    },
    {
      id: "4",
      question:
        "Son 2 həftədə nə qədər tez-tez yorğun və enerji itirmiş hiss etdim?",
    },
    {
      id: "5",
      question:
        "Son 2 həftədə nə qədər tez-tez özünü dəyərsiz və ya günahkar hiss etdim?",
    },
    {
      id: "6",
      question:
        "Son 2 həftədə nə qədər tez-tez diqqəti saxlamaq çətin oldu?",
    },
    {
      id: "7",
      question:
        "Son 2 həftədə nə qədər tez-tez yavaş hərəkət etdim və ya çox aktiv oldum?",
    },
    {
      id: "8",
      question:
        "Son 2 həftədə nə qədər tez-tez özümü yaralama və ya ölümlə bağlı düşüncələrim oldu?",
    },
    {
      id: "9",
      question:
        "Son 2 həftədə nə qədər tez-tez aşırı narahat və ya əsəbi oldum?",
    },
    {
      id: "10",
      question:
        "Həyat fəaliyyətlərim (məktəb, dostlar, ev) nə dərəcədə çətinləşdi?",
    },
  ],
  answers: [
    { text: "Heç vaxt", value: 0 },
    { text: "Bir neçə gün", value: 1 },
    { text: "Həftənin yarısı", value: 2 },
    { text: "Demək olar hər gün", value: 3 },
  ],
  maxRawScore: 27,
  multiplier: 1,
  reverseScoring: true,
  hideScore: true,
  thresholds: {
    value: 10,
    warningMessage:
      "Depressiya əlamətləri aşkarlandı. Bir mütəxəssislə məsləhətləşməyiniz tövsiyə olunur.",
    successMessage:
      "Depressiya göstəriciləriniz normal səviyyədədir.",
  },
};

export default function PHQATest() {
  return <LikertScaleTestComponent test={phqaTest} />;
}
