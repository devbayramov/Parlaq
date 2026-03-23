import { useLanguage } from "@/context/LanguageContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ExaminationOption {
  id: string;
  title: string;
  icon: string;
  route: string;
}

export default function Examination() {
      const { language, setLanguage, t } = useLanguage();
  
  const router = useRouter();

  const examinations: ExaminationOption[] = [
    {
      id: "1",
      title: t.eyeExam,
      icon: "eye",
      route: "/examination-detail/eye",
    },
    {
      id: "2",
      title: t.scoliosis,
      icon: "human-male-height",
      route: "/examination-detail/scoliosis",
    },
    {
      id: "3",
      title: t.footExam,
      icon: "foot-print",
      route: "/examination-detail/foot",
    },
    {
      id: "4",
      title: t.nerveExam,
      icon: "brain",
      route: "/examination-detail/nerve",
    },
    {
      id: "5",
      title: t.dentalExam,
      icon: "tooth",
      route: "/examination-detail/dental",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.medicalExaminations}</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Examination Boxes */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {examinations.map((exam) => (
          <TouchableOpacity
            key={exam.id}
            style={styles.examinationBox}
            onPress={() => router.push(exam.route as any)}
          >
            <MaterialCommunityIcons
              name={exam.icon as any}
              size={50}
              color="#A3C9A8"
            />
            <View style={styles.divider} />
            <Text style={styles.examinationTitle}>{exam.title}</Text>
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
  examinationBox: {
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
