import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export interface ExerciseStep {
  id: string;
  name: string;
  description: string;
  duration: number; // in seconds
  reps?: string;
  icon: string;
  image?: string; // URL for exercise demonstration image
}

export interface SportsTest {
  title: string;
  icon: string;
  steps: ExerciseStep[];
}

interface SportsDetailComponentProps {
  workout: SportsTest;
}

export default function SportsDetailComponent({
  workout,
}: SportsDetailComponentProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(workout.steps[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(workout.steps.length).fill(false)
  );
  const [showResult, setShowResult] = useState(false);

  const step = workout.steps[currentStep];

  // Timer Effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Time finished
      markStepComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const markStepComplete = () => {
    const newCompleted = [...completedSteps];
    newCompleted[currentStep] = true;
    setCompletedSteps(newCompleted);

    if (currentStep < workout.steps.length - 1) {
      // Move to next step
      setCurrentStep(currentStep + 1);
      setTimeLeft(workout.steps[currentStep + 1].duration);
      setIsRunning(false);
    } else {
      // Workout finished
      setIsRunning(false);
      setShowResult(true);
    }
  };

  const skipStep = () => {
    markStepComplete();
  };

  const resetWorkout = () => {
    setCurrentStep(0);
    setTimeLeft(workout.steps[0].duration);
    setIsRunning(false);
    setCompletedSteps(new Array(workout.steps.length).fill(false));
    setShowResult(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (showResult) {
    const completedCount = completedSteps.filter((c) => c).length;

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{workout.title}</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Result Box */}
        <View style={styles.resultContainer}>
          <MaterialCommunityIcons
            name="trophy"
            size={80}
            color="#A3C9A8"
          />
          <Text style={styles.resultTitle}>Məşq Tamamlandı</Text>
          <View style={styles.scoreBox}>
            <Text style={styles.scorePercentage}>
              {completedCount}/{workout.steps.length}
            </Text>
            <Text style={styles.scoreText}>
              Məşq tamamlandı
            </Text>
          </View>

          <Text style={styles.successMessage}>
            Əla! Məşqi tamamladınız.
          </Text>

          <View style={styles.resultButtonContainer}>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={resetWorkout}
            >
              <MaterialCommunityIcons
                name="refresh"
                size={24}
                color="#FFF"
              />
              <Text style={styles.buttonText}>Yenidən başla</Text>
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{workout.title}</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${((currentStep + 1) / workout.steps.length) * 100}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          Məşq {currentStep + 1} / {workout.steps.length}
        </Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Exercise Box */}
        <View style={styles.contentBox}>
          <View style={styles.iconContainer}>
            {step.image ? (
              <Image
                source={{ uri: step.image }}
                style={styles.exerciseImage}
                resizeMode="contain"
              />
            ) : (
              <MaterialCommunityIcons
                name={step.icon as any}
                size={50}
                color="#A3C9A8"
              />
            )}
          </View>

          <View style={styles.divider} />

          {/* Exercise Name */}
          <Text style={styles.exerciseName}>{step.name}</Text>

          {/* Exercise Description */}
          <Text style={styles.description}>{step.description}</Text>

          {/* Timer Display */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            <Text style={styles.repsText}>{step.reps || "Məşq edin"}</Text>
          </View>

          {/* Control Buttons */}
          <View style={styles.buttonContainer}>
            {!isRunning ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setIsRunning(true)}
              >
                <MaterialCommunityIcons
                  name="play-circle"
                  size={24}
                  color="#FFF"
                />
                <Text style={styles.buttonText}>Başla</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.pauseButton]}
                onPress={() => setIsRunning(false)}
              >
                <MaterialCommunityIcons
                  name="pause-circle"
                  size={24}
                  color="#FFF"
                />
                <Text style={styles.buttonText}>Dur</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.skipButton]}
              onPress={skipStep}
            >
              <MaterialCommunityIcons
                name="skip-next-circle"
                size={24}
                color="#FFF"
              />
              <Text style={styles.buttonText}>Keç</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Exercises Preview */}
        {currentStep < workout.steps.length - 1 && (
          <View style={styles.upcomingContainer}>
            <Text style={styles.upcomingTitle}>Sonra:</Text>
            {workout.steps.slice(currentStep + 1, currentStep + 3).map((upcoming, index) => (
              <View key={upcoming.id} style={styles.upcomingItem}>
                <Text style={styles.upcomingName}>{upcoming.name}</Text>
                <Text style={styles.upcomingTime}>
                  {formatTime(upcoming.duration)}
                </Text>
              </View>
            ))}
          </View>
        )}
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
  exerciseImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  divider: {
    height: 2,
    backgroundColor: "#A3C9A8",
    width: "80%",
    alignSelf: "center",
    marginVertical: 12,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
  timerContainer: {
    backgroundColor: "rgba(163, 201, 168, 0.15)",
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginVertical: 20,
    alignItems: "center",
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#A3C9A8",
    marginBottom: 10,
  },
  repsText: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#A3C9A8",
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  pauseButton: {
    backgroundColor: "#F4A766",
  },
  skipButton: {
    backgroundColor: "#8ECBA8",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
  upcomingContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  upcomingTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  upcomingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(163, 201, 168, 0.2)",
  },
  upcomingName: {
    fontSize: 13,
    color: "#666",
  },
  upcomingTime: {
    fontSize: 12,
    color: "#A3C9A8",
    fontWeight: "600",
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
  scoreText: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  successMessage: {
    fontSize: 16,
    color: "#A3C9A8",
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
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
});
