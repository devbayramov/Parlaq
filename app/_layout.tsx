import { Stack } from "expo-router";

export default function RootLayout() {

  
  return (
    <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding/index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/register" />
    </Stack>
  );
}
