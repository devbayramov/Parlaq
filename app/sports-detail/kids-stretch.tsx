import SportsDetailComponent, {
    SportsTest,
} from "@/components/SportsDetailComponent";

const kidsStretchWorkout: SportsTest = {
  title: "Uzanma Məşqləri",
  icon: "human",
  steps: [
    {
      id: "1",
      name: "Barmaqları Barmağa Toxunma",
      description: "Oturaraq ayaq barmaqlarına toxunmağa çalış",
      duration: 20,
      reps: "5 dəfə",
      icon: "human",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    },
    {
      id: "2",
      name: "Kəpənək Uzanması",
      description: "Otur, ayaq altlarını bir-birinə yapışdır, dizləri yavaşca aşağı bas",
      duration: 25,
      reps: "20 saniyə",
      icon: "yoga",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
    },
    {
      id: "3",
      name: "Pişik-İnək Uzanması",
      description: "Dördayaq üzərində belini yuxarı-aşağı əy",
      duration: 25,
      reps: "8 dəfə",
      icon: "cat",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    },
    {
      id: "4",
      name: "Qol Uzanması",
      description: "Bir qolu sinə üzərindən uzadıb digər əllə tutaraq uzat",
      duration: 20,
      reps: "15 saniyə hər qol",
      icon: "arm-flex",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400",
    },
  ],
};

export default function KidsStretchExercise() {
  return <SportsDetailComponent workout={kidsStretchWorkout} />;
}
