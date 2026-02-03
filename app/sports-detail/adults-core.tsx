import SportsDetailComponent, {
    SportsTest,
} from "@/components/SportsDetailComponent";

const adultsCoreWorkout: SportsTest = {
  title: "Qarın Əzələsi Məşqləri",
  icon: "dumbbell",
  steps: [
    {
      id: "1",
      name: "Plank (Taxta)",
      description: "Düz vəziyyətdə saxlama - bütün core əzələləri üçün",
      duration: 45,
      reps: "45 saniyə",
      icon: "dumbbell",
      image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400",
    },
    {
      id: "2",
      name: "Crunches",
      description: "Klassik qarın hərəkəti - üst qarın əzələsi üçün",
      duration: 40,
      reps: "20-25 döngü",
      icon: "dumbbell",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
    },
    {
      id: "3",
      name: "Russian Twists",
      description: "Oturaraq gövdəni sağa-sola fırlatma - yan qarın üçün",
      duration: 35,
      reps: "30 fırlanma",
      icon: "dumbbell",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=400",
    },
    {
      id: "4",
      name: "Leg Raises",
      description: "Uzanaraq ayaqları qaldırma - alt qarın üçün",
      duration: 35,
      reps: "15-20 döngü",
      icon: "dumbbell",
      image: "https://images.unsplash.com/photo-1598971639058-c51bbca72b7c?w=400",
    },
    {
      id: "5",
      name: "Mountain Climbers",
      description: "Plank vəziyyətində qaçış hərəkəti",
      duration: 40,
      reps: "40 saniyə",
      icon: "run",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400",
    },
    {
      id: "6",
      name: "Side Plank",
      description: "Yan plank - yan qarın əzələləri üçün",
      duration: 30,
      reps: "25 saniyə hər tərəf",
      icon: "dumbbell",
      image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400",
    },
  ],
};

export default function AdultsCoreExercise() {
  return <SportsDetailComponent workout={adultsCoreWorkout} />;
}
