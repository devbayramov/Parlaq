import SportsDetailComponent, {
    SportsTest,
} from "@/components/SportsDetailComponent";

const kidsFunWorkout: SportsTest = {
  title: "Əyləncəli Hərəkətlər",
  icon: "emoticon-happy",
  steps: [
    {
      id: "1",
      name: "Qurbağa Sıçrayışı",
      description: "Qurbağa kimi çöməl və irəli sıçra",
      duration: 25,
      reps: "8 sıçrayış",
      icon: "frog",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400",
    },
    {
      id: "2",
      name: "Ayı Yerişi",
      description: "Əl və ayaqlarla yeriyərək irəli hərəkət et",
      duration: 30,
      reps: "5 metr",
      icon: "paw",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    },
    {
      id: "3",
      name: "Ulduz Sıçrayışı",
      description: "Sıçra və əl-ayaqlarını ulduz kimi aç",
      duration: 20,
      reps: "10 sıçrayış",
      icon: "star",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
    },
    {
      id: "4",
      name: "Robot Yerişi",
      description: "Robot kimi düz və hamar hərəkətlərlə yeri",
      duration: 25,
      reps: "30 saniyə",
      icon: "robot",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
    },
  ],
};

export default function KidsFunExercise() {
  return <SportsDetailComponent workout={kidsFunWorkout} />;
}
