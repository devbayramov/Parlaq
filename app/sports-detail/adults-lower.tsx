import SportsDetailComponent, {
    SportsTest,
} from "@/components/SportsDetailComponent";

const adultsLowerWorkout: SportsTest = {
  title: "Alt Bədən Məşqləri",
  icon: "run",
  steps: [
    {
      id: "1",
      name: "Squat (Çökmə)",
      description: "Klassik çökmə hərəkəti - bud və diz əzələləri üçün",
      duration: 45,
      reps: "15-20 döngü",
      icon: "run",
      image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400",
    },
    {
      id: "2",
      name: "Lunges (Uzun Addım)",
      description: "İrəli addım ataraq çökmə - bud əzələləri üçün",
      duration: 40,
      reps: "12 döngü hər ayaq",
      icon: "walk",
      image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=400",
    },
    {
      id: "3",
      name: "Jump Squat",
      description: "Çökmədən sıçrayış - güc və eksplosivlik üçün",
      duration: 35,
      reps: "15 sıçrayış",
      icon: "run",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400",
    },
    {
      id: "4",
      name: "Calf Raises",
      description: "Barmaq ucunda qalxma - baldır əzələsi üçün",
      duration: 30,
      reps: "25 döngü",
      icon: "walk",
      image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400",
    },
    {
      id: "5",
      name: "Glute Bridge",
      description: "Uzanaraq kalçaları qaldırma - kalça əzələləri üçün",
      duration: 40,
      reps: "15-20 döngü",
      icon: "human",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
    },
  ],
};

export default function AdultsLowerExercise() {
  return <SportsDetailComponent workout={adultsLowerWorkout} />;
}
