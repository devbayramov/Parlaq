import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  // İlk girişdə həmişə onboarding-i göstər.
  useEffect(() => {
    router.replace("/(tabs)");
  }, []);

  return null;
}
