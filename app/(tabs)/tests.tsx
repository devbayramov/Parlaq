import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, Text, View,StyleSheet,TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TextInputField from "../../components/ui/TextInputField";
import React, { useEffect, useState } from "react";



export default function Tests() {
    const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const testSections: Array<{
    title: string;
    boxes: Array<{ id: number; icon: string; title: string; route?:string; }>;
  }> = [

    {
      title: "IQ Testləri",
      boxes: [
        { id: 1, icon: "brain", title: "Məntiq", route: "/tests/intelligence" },
        { id: 2, icon: "calculator", title: "Riyaziyyat", route: "/tests/mathematics" },
      ],
    },
    {
      title: "Psixologiya Testləri",
      boxes: [
        { id: 3, icon: "thought-bubble", title: "Şəxsiyyət", route: "/tests/personality" },
        { id: 4, icon: "heart", title: "Emosional", route: "/tests/emotional" },
      ],
    },
    {
      title: "Maraqlı Testlər",
      boxes: [
        { id: 5, icon: "gamepad", title: "Oyun", route: "/tests/game" },
        { id: 6, icon: "palette", title: "Sənət", route: "/tests/art" },
      ],
    },
  ];

  return (
   <View style={styles.container}>

  <View style={styles.header}>
        <TextInputField placeholder="Test axtar..." style={styles.headerInput}   value={searchQuery}
 onChangeText={(text) => setSearchQuery(text)} /> 
  </View>

<ScrollView contentContainerStyle={styles.scrollContent}>
 {testSections.map((section) => {
  const filteredBoxes = section.boxes.filter((box) =>
    box.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredBoxes.length === 0) return null;

  return (
    <View key={section.title}>
      <Text style={styles.sectionTitle}>{section.title}</Text>

      <View style={styles.grid}>
        {filteredBoxes.map((box) => (
          <TouchableOpacity
            key={box.id}
            style={styles.examinationBox}
            onPress={() => box.route && router.push(box.route as any)}
          >
            <MaterialCommunityIcons
              name={box.icon as any}
              size={50}
              color="#A3C9A8"
            />
            <View style={styles.divider} />
            <Text style={styles.examinationTitle}>{box.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
})}

</ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D1DEBE",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  headerInput: {
    marginTop: 15,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    fontSize: 16,
  },

  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
    marginTop: 20,
  },
  grid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
},
  examinationBox: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  divider: {
    height: 2,
    backgroundColor: "#A3C9A8",
    width: "80%",
    marginVertical: 12,
  },
  examinationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});
