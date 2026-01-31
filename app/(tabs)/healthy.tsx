import { useLanguage } from "@/context/LanguageContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Healthy() {
      const { language, setLanguage, t } = useLanguage();
    
  const router = useRouter();
  const lineWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(lineWidth, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(lineWidth, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [lineWidth]);

  return (
    <View style={styles.container}>
      {/* Top Box - Healthy Examination */}
      <TouchableOpacity
        style={styles.topBox}
        onPress={() => router.push("/examination")}
      >
        <MaterialCommunityIcons name="heart-pulse" size={60} color="#A3C9A8" />
        <Text style={styles.boxTitle}>{t.medicalExams}</Text>
      </TouchableOpacity>

      {/* Animated Separator Line */}
      <Animated.View
        style={[
          styles.separatorLine,
          {
            width: lineWidth.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      />

      {/* Bottom Box - Sport Activities */}
      <TouchableOpacity
        style={styles.bottomBox}
        onPress={() => router.push("/sports")}
      >
        <MaterialCommunityIcons name="dumbbell" size={60} color="#A3C9A8" />
        <Text style={styles.boxTitle}>{t.sportsExercises}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D1DEBE",
  },
  topBox: {
    flex: 0.4,
    margin: 70,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
  },
  bottomBox: {
    flex: 0.4,
    margin: 70,
    marginBottom: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
  },
  separatorLine: {
    height: 3,
    backgroundColor: "#A3C9A8",
    alignSelf: "center",
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    textAlign: "center",
  },
});

