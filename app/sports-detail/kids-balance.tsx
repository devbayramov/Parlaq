import SportsDetailComponent, {
    SportsTest,
} from "@/components/SportsDetailComponent";

const kidsBalanceWorkout: SportsTest = {
  title: "Tarazlıq Məşqləri",
  icon: "yoga",
  steps: [
    {
      id: "1",
      name: "Bir Ayaq Üzərində Dayanma",
      description: "Bir ayaq üzərində dayanaraq tarazlığı saxla",
      duration: 15,
      reps: "15 saniyə hər ayaq",
      icon: "human",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
    },
    {
      id: "2",
      name: "Ağac Pozası",
      description: "Bir ayağı digər ayağın dizinə qoy və tarazlığı saxla",
      duration: 20,
      reps: "20 saniyə hər tərəf",
      icon: "yoga",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    },
    {
      id: "3",
      name: "İp Üzərində Yerimə",
      description: "Bir xətt üzərində dik yerimə (xəyali ip)",
      duration: 25,
      reps: "10 addım irəli-geri",
      icon: "walk",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    },
    {
      id: "4",
      name: "Flamingo Duruşu",
      description: "Bir ayaq üzərində əyilərək tarazlıq saxla",
      duration: 20,
      reps: "15 saniyə hər ayaq",
      icon: "bird",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400",
    },
  ],
};

export default function KidsBalanceExercise() {
  return <SportsDetailComponent workout={kidsBalanceWorkout} />;
}
