import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TextInputField from "../../components/ui/TextInputField";
import React, { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { auth, db } from "@/services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";


export default function Tests() {
  const { t } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userAge, setUserAge] = useState<number>(0);

  useEffect(() => {
    const fetchUserAge = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const age = parseInt(userDoc.data().age) || 0;
          setUserAge(age);
        }
      }
    };
    fetchUserAge();
  }, []);

  const allTests: Array<{ id: number; icon: string; title: string; route: string; minAge?: number }> = [
    { id: 1, icon: "head-question", title: t.mentalHealthTest, route: "/tests/emotional-detail/srq20" },
    { id: 2, icon: "glass-wine", title: t.alcoholTest, route: "/tests/emotional-detail/audit", minAge: 18 },
    { id: 3, icon: "emoticon-happy", title: t.wellbeingTest, route: "/tests/emotional-detail/wellbeing" },
    { id: 4, icon: "emoticon-sad", title: t.depressionTest, route: "/tests/emotional-detail/phqa" },
  ];

  const tests = allTests.filter((test) => !test.minAge || userAge >= test.minAge);

  const filteredTests = tests.filter((test) =>
    test.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
   <View style={styles.container}>

  <View style={styles.header}>
        <TextInputField placeholder={t.searchTest} style={styles.headerInput} value={searchQuery}
 onChangeText={(text) => setSearchQuery(text)} />
  </View>

<ScrollView contentContainerStyle={styles.scrollContent}>
  <Text style={styles.sectionTitle}>{t.testTab}</Text>

  <View style={styles.grid}>
    {filteredTests.map((test) => (
      <TouchableOpacity
        key={test.id}
        style={styles.examinationBox}
        onPress={() => router.push(test.route as any)}
      >
        <MaterialCommunityIcons
          name={test.icon as any}
          size={50}
          color="#A3C9A8"
        />
        <View style={styles.divider} />
        <Text style={styles.examinationTitle}>{test.title}</Text>
      </TouchableOpacity>
    ))}
  </View>
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
    paddingBottom: 100,
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
