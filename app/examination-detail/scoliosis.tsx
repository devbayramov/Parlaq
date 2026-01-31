import ExaminationDetailComponent, {
    ExaminationTest,
} from "@/components/ExaminationDetailComponent";

const scioliosisTest: ExaminationTest = {
  title: "Skolyoz",
  icon: "human-male-height",
  steps: [
    {
      id: "1",
      question: "Arxa həddə əyriliyi hiss etdiniz mi?",
      content: "Əyriliyi yoxlayın",
      answers: [
        { text: "Bəli", correct: true },
        { text: "Xeyr", correct: false },
      ],
    },
    {
      id: "2",
      question: "Omuz səviyyəsi bərabərdir?",
      content: "Omuzları yoxlayın",
      answers: [
        { text: "Bəli, bərabərdir", correct: true },
        { text: "Xeyr, fərqli", correct: false },
      ],
    },
    {
      id: "3",
      question: "Bel fırlanması hiss etdiniz mi?",
      content: "Beli yoxlayın",
      answers: [
        { text: "Bəli", correct: true },
        { text: "Xeyr", correct: false },
      ],
    },
  ],
};

export default function ScioliosisExamination() {
  return <ExaminationDetailComponent test={scioliosisTest} />;
}
