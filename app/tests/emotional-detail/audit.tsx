import LikertScaleTestComponent, {
  LikertScaleTest,
} from "@/components/LikertScaleTestComponent";

const auditTest: LikertScaleTest = {
  title: "Alkoqol Testi",
  icon: "glass-wine",
  instruction: "Hər suala ən uyğun cavabı seçin.",
  steps: [
    {
      id: "1",
      question: "Alkoqollu içkiləri nə qədər tez-tez qəbul edirsiniz?",
    },
    {
      id: "2",
      question: "İçdiyiniz günlərdə neçə porsiya qəbul edirsiniz?",
    },
    {
      id: "3",
      question: "Bir dəfədə 6 və ya daha çox porsiya nə qədər tez-tez olur?",
    },
    {
      id: "4",
      question: "İçkini dayandıra bilmədiyiniz hallar olubmu?",
    },
    {
      id: "5",
      question: "İçki səbəbilə vəzifələrinizi yerinə yetirə bilməmisinizmi?",
    },
    {
      id: "6",
      question: "Səhər özünüzü toparlamaq üçün içmisinizmi?",
    },
    {
      id: "7",
      question: "İçkidən sonra peşmanlıq hissi yaşamısınızmı?",
    },
    {
      id: "8",
      question: "İçki səbəbilə baş verənləri xatırlamama halı olubmu?",
    },
    {
      id: "9",
      question: "Siz və ya başqaları içkinizdən zərər görübmü?",
    },
    {
      id: "10",
      question: "Həkim və ya yaxınlarınız içkini azaltmağı tövsiyə edibmi?",
    },
  ],
  answers: [
    { text: "Heç vaxt", value: 0 },
    { text: "Ayda 1 dəfədən az", value: 1 },
    { text: "Ayda 1–3 dəfə", value: 2 },
    { text: "Həftədə 1 dəfə", value: 3 },
    { text: "Demək olar hər gün", value: 4 },
  ],
  maxRawScore: 40,
  multiplier: 1,
  reverseScoring: true,
  thresholds: {
    value: 8,
    warningMessage: "Alkoqol istifadəsi ilə bağlı risk aşkarlandı. Bir mütəxəssislə məsləhətləşmək tövsiyə olunur.",
    successMessage: "Alkoqol istifadəsi aşağı risk səviyyəsindədir.",
  },
};

export default function AuditTest() {
  return <LikertScaleTestComponent test={auditTest} />;
}
