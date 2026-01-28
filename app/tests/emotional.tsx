import { auth, db } from "@/services/firebaseConfig";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TestOption {
  id: string;
  title: string;
  icon: string;
  route: string;
  minAge?: number;
}

export default function EmotionalTests() {
  const router = useRouter();
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

  const allTests: TestOption[] = [
    {
      id: "1",
            title: "Rifah Testi",
      icon: "emoticon-happy",
      route: "/tests/emotional-detail/wellbeing",

    },
    {
      id: "2",
      title: "Emosiya İdarəetməsi",
      icon: "emoticon-outline",
      route: "/tests/emotional-detail/management",
    },
    {
      id: "3",
      title: "Stress İdarəetməsi",
      icon: "head-flash",
      route: "/tests/emotional-detail/stress",
    },
    {
      id: "4",
      title: "Motivasiya",
      icon: "fire",
      route: "/tests/emotional-detail/motivation",
    },
    {
      id: "5",
      title: "Empatiya",
      icon: "heart-multiple",
      route: "/tests/emotional-detail/empathy",
    },
    {
      id: "6",
      title: "Psixi Sorğu",
      icon: "head-question",
      route: "/tests/emotional-detail/srq20",
    },
    {
      id: "7",
      title: "Alkoqol Testi",
      icon: "glass-wine",
      route: "/tests/emotional-detail/audit",
      minAge: 18,
    },
  ];

  const tests = allTests.filter((test) => !test.minAge || userAge >= test.minAge);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emosional Zəka Testləri</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Test Boxes */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {tests.map((test) => (
          <TouchableOpacity
            key={test.id}
            style={styles.testBox}
            onPress={() => router.push(test.route as any)}
          >
            <MaterialCommunityIcons
              name={test.icon as any}
              size={50}
              color="#A3C9A8"
            />
            <View style={styles.divider} />
            <Text style={styles.testTitle}>{test.title}</Text>
          </TouchableOpacity>
        ))}
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
    paddingVertical: 15,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  testBox: {
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
  testTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});
