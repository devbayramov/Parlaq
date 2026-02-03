import SportsDetailComponent, {
  SportsTest,
} from "@/components/SportsDetailComponent";

const kidsScoliosisWorkout: SportsTest = {
  title: "Skolyoz Məşqləri (Uşaqlar)",
  icon: "spine",
  steps: [
    {
      id: "1",
      name: "Pişik-İnək Hərəkəti",
      description:
        "Dörd ayaq üstə dur. Nəfəs alaraq belini aşağı sal (inək), nəfəs verərək belini yuxarı qaldır (pişik)",
      duration: 30,
      reps: "10 dəfə",
      icon: "cat",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    },
    {
      id: "2",
      name: "Uşaq Pozası",
      description:
        "Dizlər üstə otur, əlləri irəli uzat və alnı yerə qoy. Rahat nəfəs al",
      duration: 40,
      reps: "20-30 saniyə saxla",
      icon: "yoga",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    },
    {
      id: "3",
      name: "Yan Uzanma",
      description:
        "Ayaq üstə dur, bir əli yuxarı qaldır və əks tərəfə yavaşca əyil",
      duration: 25,
      reps: "5 dəfə hər tərəfə",
      icon: "human-handsup",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
    },
    {
      id: "4",
      name: "Kəpənək Qanadları",
      description:
        "Üzü aşağı uzan, əlləri çiyinlərə qoy. Dirsəkləri yavaşca yuxarı qaldır",
      duration: 25,
      reps: "8 dəfə",
      icon: "butterfly",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    },
    {
      id: "5",
      name: "Divar Mələyi",
      description:
        "Arxanı divara söykə, əlləri yuxarı-aşağı hərəkət etdir (qar mələyi kimi)",
      duration: 30,
      reps: "10 dəfə",
      icon: "wall",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400",
    },
    {
      id: "6",
      name: "Onurğa Fırlatma",
      description:
        "Arxası üstə uzan, dizləri bük. Dizləri yavaşca sağa-sola endir, çiyinlər yerdə qalsın",
      duration: 35,
      reps: "6 dəfə hər tərəfə",
      icon: "rotate-right",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    },
  ],
};

export default function KidsScoliosisExercise() {
  return <SportsDetailComponent workout={kidsScoliosisWorkout} />;
}
