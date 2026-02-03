import SportsDetailComponent, {
    SportsTest,
} from "@/components/SportsDetailComponent";

const adultsCardioWorkout: SportsTest = {
  title: "Kardio Məşqləri",
  icon: "heart-pulse",
  steps: [
    {
      id: "1",
      name: "Jumping Jacks",
      description: "Klassik sıçrayış hərəkəti - ürək sağlamlığı üçün",
      duration: 45,
      reps: "45 saniyə",
      icon: "heart-pulse",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400",
    },
    {
      id: "2",
      name: "Burpees",
      description: "Tam bədən kardio hərəkəti - çox intensiv",
      duration: 40,
      reps: "10-12 döngü",
      icon: "heart-pulse",
      image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=400",
    },
    {
      id: "3",
      name: "High Knees",
      description: "Yerində qaçış - dizləri yuxarı qaldıraraq",
      duration: 40,
      reps: "40 saniyə",
      icon: "run",
      image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400",
    },
    {
      id: "4",
      name: "Butt Kicks",
      description: "Yerində qaçış - topuqları kalçaya toxunduraraq",
      duration: 35,
      reps: "35 saniyə",
      icon: "run",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400",
    },
    {
      id: "5",
      name: "Box Jumps (xəyali)",
      description: "Yerə çöməlib güclü sıçrayış",
      duration: 35,
      reps: "15 sıçrayış",
      icon: "heart-pulse",
      image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=400",
    },
    {
      id: "6",
      name: "Speed Skaters",
      description: "Yan sıçrayışlar - bir ayaqdan digərinə",
      duration: 40,
      reps: "20 sıçrayış hər tərəf",
      icon: "heart-pulse",
      image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400",
    },
  ],
};

export default function AdultsCardioExercise() {
  return <SportsDetailComponent workout={adultsCardioWorkout} />;
}
