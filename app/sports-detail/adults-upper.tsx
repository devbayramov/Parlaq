import SportsDetailComponent, {
    SportsTest,
} from "@/components/SportsDetailComponent";

const adultsUpperWorkout: SportsTest = {
  title: "Üst Bədən Məşqləri",
  icon: "arm-flex",
  steps: [
    {
      id: "1",
      name: "Push-up (Şınav)",
      description: "Klassik təkan hərəkəti - döş və qol əzələləri üçün",
      duration: 45,
      reps: "15-20 döngü",
      icon: "arm-flex",
      image: "https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=400",
    },
    {
      id: "2",
      name: "Diamond Push-up",
      description: "Əlləri bir-birinə yaxınlaşdıraraq təkan - triseps üçün",
      duration: 40,
      reps: "10-12 döngü",
      icon: "arm-flex",
      image: "https://images.unsplash.com/photo-1598971457999-ca4ef48a9a71?w=400",
    },
    {
      id: "3",
      name: "Plank Shoulder Tap",
      description: "Plank vəziyyətində əl ilə qarşı çiynə toxun",
      duration: 35,
      reps: "20 toxunma",
      icon: "dumbbell",
      image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400",
    },
    {
      id: "4",
      name: "Tricep Dips",
      description: "Stul və ya pilləkən ilə triseps işləmə",
      duration: 40,
      reps: "12-15 döngü",
      icon: "arm-flex",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
    },
    {
      id: "5",
      name: "Pike Push-up",
      description: "V formada təkan - çiyin əzələləri üçün",
      duration: 35,
      reps: "10-12 döngü",
      icon: "arm-flex",
      image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400",
    },
  ],
};

export default function AdultsUpperExercise() {
  return <SportsDetailComponent workout={adultsUpperWorkout} />;
}
