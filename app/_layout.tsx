import { LanguageProvider } from "@/context/LanguageContext";
import { auth } from "@/services/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter, useSegments } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ONBOARDING_COMPLETE_KEY = "onboarding_complete";

function AuthCheck({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
      setOnboardingComplete(value === "true");
    };
    checkOnboarding();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading || onboardingComplete === null) return;

    const inAuthGroup = segments[0] === "auth";
    const inOnboarding = segments[0] === "onboarding";

    if (user && (inAuthGroup || inOnboarding)) {
      router.replace("/(tabs)");
    } else if (!user && !inAuthGroup && !inOnboarding) {
      if (onboardingComplete) {
        router.replace("/auth/login");
      } else {
        router.replace("/onboarding");
      }
    }
  }, [user, loading, segments, onboardingComplete]);

  if (loading || onboardingComplete === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#D1DEBE" }}>
        <ActivityIndicator size="large" color="#073D3D" />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#D1DEBE" }} edges={["top"]}>
        <AuthCheck>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="onboarding/index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="auth/login" />
            <Stack.Screen name="auth/register" />
          </Stack>
        </AuthCheck>
      </SafeAreaView>
    </LanguageProvider>
  );
}
