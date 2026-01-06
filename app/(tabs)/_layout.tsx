import CustomNavBar from "@/components/CustomNavBar";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#D1DEBE" }}>
      <Tabs tabBar={(props) => <CustomNavBar {...props} />}>
        <Tabs.Screen name="healthy" options={{ title: "Sağlamlıq" }} />
        <Tabs.Screen name="index" options={{ title: "Əsas" }} />
        <Tabs.Screen name="profile" options={{ title: "Profil" }} />
      </Tabs>
    </View>
  );
}

