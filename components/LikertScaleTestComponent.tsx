import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export interface LikertAnswer {
  text: string;
  value: number;
}

export interface LikertStep {
  id: string;
  question: string;
}

export interface LikertScaleTest {
  title: string;
  icon: string;
  instruction: string;
  steps: LikertStep[];
  answers: LikertAnswer[];
  maxRawScore: number;
  multiplier: number;
  reverseScoring?: boolean;
  thresholds: {
    value: number;
    warningMessage: string;
    successMessage: string;
  };
}

interface LikertScaleTestComponentProps {
  test: LikertScaleTest;
}

export default function LikertScaleTestComponent({
  test,
}: LikertScaleTestComponentProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [showResult, setShowResult] = useState(false);

  const step = test.steps[currentStep];
  const totalSteps = test.steps.length;

  const rawScore = Object.values(scores).reduce((sum, val) => sum + val, 0);
  const finalScore = rawScore * test.multiplier;

  const handleAnswer = (value: number, stepId: string) => {
    setScores((prev) => ({
      ...prev,
      [stepId]: value,
    }));

    if (currentStep < totalSteps - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 500);
    }
  };

  const resetTest = () => {
    setCurrentStep(0);
    setScores({});
    setShowResult(false);
  };

  if (showResult) {
    const isWarning = test.reverseScoring
      ? finalScore >= test.thresholds.value
      : finalScore <= test.thresholds.value;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{test.title}</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.resultContainer}>
          <MaterialCommunityIcons
            name={isWarning ? "alert-circle" : "check-circle"}
            size={80}
            color={isWarning ? "#E8956E" : "#A3C9A8"}
          />
          <Text style={styles.resultTitle}>Test Tamamlandı</Text>
          <View style={styles.scoreBox}>
            <Text style={isWarning ? styles.warningMessage : styles.successMessage}>
              {isWarning ? test.thresholds.warningMessage : test.thresholds.successMessage}
            </Text>
            <Text style={styles.scoreSmall}>
              Nəticə: {finalScore} / {test.maxRawScore * test.multiplier}
            </Text>
          </View>

          <View style={styles.resultButtonContainer}>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={resetTest}
            >
              <MaterialCommunityIcons
                name="refresh"
                size={24}
                color="#FFF"
              />
              <Text style={styles.buttonText}>Yenidən cəhd et</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.retakeButton, styles.backButton]}
              onPress={() => router.back()}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#FFF"
              />
              <Text style={styles.buttonText}>Geri qayıt</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{test.title}</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${((currentStep + 1) / totalSteps) * 100}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          Sual {currentStep + 1} / {totalSteps}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.instructionBox}>
          <Text style={styles.instructionText}>{test.instruction}</Text>
        </View>

        <View style={styles.contentBox}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={test.icon as any}
              size={50}
              color="#A3C9A8"
            />
          </View>

          <View style={styles.divider} />

          <Text style={styles.question}>{step.question}</Text>

          <View style={styles.answersContainer}>
            {test.answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.answerButton,
                  scores[step.id] === answer.value && styles.selectedAnswer,
                ]}
                onPress={() => handleAnswer(answer.value, step.id)}
              >
                <View style={styles.answerContent}>
                  <View style={styles.valueCircle}>
                    <Text style={styles.valueText}>{answer.value}</Text>
                  </View>
                  <Text style={styles.answerText}>{answer.text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    paddingVertical: 15,
    paddingTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  progressContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#A3C9A8",
  },
  progressText: {
    fontSize: 12,
    color: "#333",
    marginTop: 8,
    textAlign: "center",
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  instructionBox: {
    backgroundColor: "rgba(163, 201, 168, 0.3)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  instructionText: {
    fontSize: 13,
    color: "#333",
    textAlign: "center",
    fontStyle: "italic",
  },
  contentBox: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  divider: {
    height: 2,
    backgroundColor: "#A3C9A8",
    width: "80%",
    alignSelf: "center",
    marginVertical: 12,
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginVertical: 20,
    textAlign: "center",
  },
  answersContainer: {
    gap: 10,
  },
  answerButton: {
    backgroundColor: "rgba(163, 201, 168, 0.1)",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedAnswer: {
    borderColor: "#A3C9A8",
    backgroundColor: "rgba(163, 201, 168, 0.3)",
  },
  answerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  valueCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#A3C9A8",
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
  answerText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  scoreBox: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 30,
    marginVertical: 30,
    alignItems: "center",
    width: "100%",
  },
  scorePercentage: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#A3C9A8",
  },
  scoreLabel: {
    fontSize: 24,
    color: "#666",
    marginTop: -5,
  },
  rawScoreText: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  successMessage: {
    fontSize: 16,
    color: "#A3C9A8",
    fontWeight: "600",
    textAlign: "center",
  },
  warningMessage: {
    fontSize: 16,
    color: "#E8956E",
    fontWeight: "600",
    textAlign: "center",
  },
  scoreSmall: {
    fontSize: 14,
    color: "#666",
    marginTop: 15,
  },
  resultButtonContainer: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  retakeButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#A3C9A8",
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  backButton: {
    backgroundColor: "#6BA582",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
