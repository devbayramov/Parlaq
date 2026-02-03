import SportsDetailComponent, {
    SportsTest,
} from "@/components/SportsDetailComponent";

const kidsWarmupWorkout: SportsTest = {
  title: "Isınma Məşqləri",
  icon: "human-handsup",
  steps: [
    {
      id: "1",
      name: "Qolları Fırlatma",
      description: "Qolları irəli-geri dairəvi hərəkətlə fırlat",
      duration: 20,
      reps: "10 dəfə hər istiqamətə",
      icon: "human-handsup",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    },
    {
      id: "2",
      name: "Yerində Yüngül Qaçış",
      description: "Yerində yavaş-yavaş qaç",
      duration: 30,
      reps: "30 saniyə",
      icon: "run",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    },
    {
      id: "3",
      name: "Boyun Fırlatma",
      description: "Başını yavaşca sağa-sola və dairəvi fırlat",
      duration: 20,
      reps: "5 dəfə hər istiqamətə",
      icon: "head",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
    },
    {
      id: "4",
      name: "Bel Fırlatma",
      description: "Əlləri belə qoy və gövdəni sağa-sola fırlat",
      duration: 25,
      reps: "8 dəfə hər tərəfə",
      icon: "human",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400",
    },
  ],
};

export default function KidsWarmupExercise() {
  return <SportsDetailComponent workout={kidsWarmupWorkout} />;
}
