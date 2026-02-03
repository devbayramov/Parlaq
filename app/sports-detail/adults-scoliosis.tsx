import SportsDetailComponent, {
  SportsTest,
} from "@/components/SportsDetailComponent";

const adultsScoliosisWorkout: SportsTest = {
  title: "Skolyoz Məşqləri (Yetkinlər)",
  icon: "spine",
  steps: [
    {
      id: "1",
      name: "Pişik-İnək Hərəkəti",
      description:
        "Dörd ayaq üstə dur. Nəfəs alaraq belini aşağı sal, nəfəs verərək belini yuxarı qaldır. Hərəkəti yavaş və nəzarətli et",
      duration: 45,
      reps: "15 dəfə",
      icon: "cat",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    },
    {
      id: "2",
      name: "Uşaq Pozası (Uzadılmış)",
      description:
        "Dizlər üstə otur, əlləri irəli uzat və alnı yerə qoy. Dərin nəfəs alaraq uzanmanı hiss et",
      duration: 60,
      reps: "30-45 saniyə saxla",
      icon: "yoga",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    },
    {
      id: "3",
      name: "Körpü Hərəkəti",
      description:
        "Arxası üstə uzan, dizləri bük. Belini yuxarı qaldır və 3-5 saniyə saxla",
      duration: 45,
      reps: "12 dəfə",
      icon: "bridge",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    },
    {
      id: "4",
      name: "Quş-İt Hərəkəti",
      description:
        "Dörd ayaq üstə dur. Sağ əli irəli, sol ayağı arxaya uzat. Sonra əks tərəfi et",
      duration: 50,
      reps: "10 dəfə hər tərəfə",
      icon: "bird",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
    },
    {
      id: "5",
      name: "Yan Plank",
      description:
        "Yan üstə uzan, dirsəklə dayaq al. Beli düz saxlayaraq qaldır",
      duration: 40,
      reps: "20-30 saniyə hər tərəfə",
      icon: "human",
      image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400",
    },
    {
      id: "6",
      name: "Onurğa Fırlatma",
      description:
        "Arxası üstə uzan, dizləri bük. Dizləri yavaşca sağa-sola endir, çiyinlər yerdə qalsın",
      duration: 45,
      reps: "10 dəfə hər tərəfə",
      icon: "rotate-right",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    },
    {
      id: "7",
      name: "Latissimus Uzanması",
      description:
        "Ayaq üstə dur, əlləri başın üstündə birləşdir. Yavaşca sağa-sola əyil, yan əzələləri uzat",
      duration: 40,
      reps: "8 dəfə hər tərəfə",
      icon: "human-handsup",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
    },
    {
      id: "8",
      name: "Kobra Hərəkəti",
      description:
        "Üzü aşağı uzan. Əllərlə dayaq alaraq yuxarı bədəni qaldır, beli həddən artıq əymə",
      duration: 35,
      reps: "10 dəfə (3 san saxla)",
      icon: "snake",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    },
  ],
};

export default function AdultsScoliosisExercise() {
  return <SportsDetailComponent workout={adultsScoliosisWorkout} />;
}
