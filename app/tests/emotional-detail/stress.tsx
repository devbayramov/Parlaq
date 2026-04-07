import LikertScaleTestComponent, {
  LikertScaleTest,
} from "@/components/LikertScaleTestComponent";

const stressTest: LikertScaleTest = {
  title: "Stress İdarəetməsi",
  icon: "head-flash",
  instruction: "Son 1 ay ərzində aşağıdakı halları nə qədər tez-tez yaşadınız?",
  steps: [
    {
      id: "1",
      question: "Gözlənilmədən baş verən hadisələr səbəbiylə özünüzü gərgin hiss etdiniz?",
    },
    {
      id: "2",
      question: "Həyatınızdakı vacib məsələləri idarə edə bilmədiyinizi hiss etdiniz?",
    },
    {
      id: "3",
      question: "Sinirli və ya stress altında olduğunuzu hiss etdiniz?",
    },
    {
      id: "4",
      question: "Gərginlik səbəbindən yuxu problemi yaşadınız?",
    },
    {
      id: "5",
      question: "Çox sayda problem üst-üstə yığıldığı üçün başa çıxa bilmədiyinizi hiss etdiniz?",
    },
  ],
  answers: [
    { text: "Heç vaxt", value: 0 },
    { text: "Nadir hallarda", value: 1 },
    { text: "Bəzən", value: 2 },
    { text: "Tez-tez", value: 3 },
    { text: "Həmişə", value: 4 },
  ],
  maxRawScore: 20,
  multiplier: 1,
  reverseScoring: true,
  hideScore: false,
  thresholds: {
    value: 12,
    warningMessage:
      "Stres səviyyəniz yüksəkdir. Bir mütəxəssislə məsləhətləşməyiniz tövsiyə olunur.",
    successMessage:
      "Stres səviyyəniz nəzarət altındadır. Sağlıqlı həyat tərzinizi davam etdirin.",
  },
};

export default function StressTest() {
  return <LikertScaleTestComponent test={stressTest} />;
}
