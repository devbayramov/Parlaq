import { useLanguage } from "@/context/LanguageContext";
import { auth, db } from "@/services/firebaseConfig";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface QuickTest {
  id: string;
  title: string;
  icon: string;
  color: string;
  route: string;
}

interface QuickExam {
  id: string;
  title: string;
  icon: string;
  route: string;
}

interface SportActivity {
  id: string;
  title: string;
  icon: string;
  route: string;
}

export default function Home() {
  const router = useRouter();
      const { language, setLanguage, t } = useLanguage();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    weight: "",
    height: "",
    photoURL: "",
    bmiLastUpdated: null as number | null,
  });

  // BMI Modal states
  const [showBmiModal, setShowBmiModal] = useState(false);
  const [tempWeight, setTempWeight] = useState("");
  const [tempHeight, setTempHeight] = useState("");
  const [showBmiAlert, setShowBmiAlert] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            weight: data.weight || "",
            height: data.height || "",
            photoURL: data.photoURL || "",
            bmiLastUpdated: data.bmiLastUpdated || null,
          });

          // Check if we need to show BMI modal
          checkBmiModalNeed(data);
        }
      }
    };
    fetchUserData();
  }, []);

  const checkBmiModalNeed = (data: any) => {
    const now = Date.now();
    const fifteenDaysInMs = 15 * 24 * 60 * 60 * 1000;

    // Case 1: First time user (no weight/height or no bmiLastUpdated)
    if (!data.weight || !data.height || !data.bmiLastUpdated) {
      setShowBmiModal(true);
      return;
    }

    // Case 2: 15 days have passed since last update
    const lastUpdated = data.bmiLastUpdated;
    if (now - lastUpdated >= fifteenDaysInMs) {
      setShowBmiModal(true);
      return;
    }
  };

  const handleBmiSubmit = async () => {
    if (!tempWeight || !tempHeight) return;

    const user = auth.currentUser;
    if (user) {
      const now = Date.now();

      await updateDoc(doc(db, "users", user.uid), {
        weight: tempWeight,
        height: tempHeight,
        bmiLastUpdated: now,
      });

      setUserData(prev => ({
        ...prev,
        weight: tempWeight,
        height: tempHeight,
        bmiLastUpdated: now,
      }));

      setShowBmiModal(false);
      setShowBmiAlert(false);
    }
  };

  const handleBmiModalDismiss = () => {
    setShowBmiModal(false);

    // Show alert if user doesn't have BMI data or it's outdated
    const now = Date.now();
    const fifteenDaysInMs = 15 * 24 * 60 * 60 * 1000;

    if (!userData.weight || !userData.height ||
        !userData.bmiLastUpdated ||
        (now - userData.bmiLastUpdated >= fifteenDaysInMs)) {
      setShowBmiAlert(true);
    }
  };

  const calculateBMI = () => {
    if (userData.weight && userData.height) {
      const weightNum = parseFloat(userData.weight);
      const heightNum = parseFloat(userData.height) / 100;
      if (weightNum > 0 && heightNum > 0) {
        return (weightNum / (heightNum * heightNum)).toFixed(1);
      }
    }
    return null;
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { text: "Arıq", color: "#3498db" };
    if (bmi < 25) return { text: "Normal", color: "#27ae60" };
    if (bmi < 30) return { text: "Artıq çəki", color: "#f39c12" };
    return { text: "Piylənmə", color: "#e74c3c" };
  };

  const getDaysUntilNextUpdate = () => {
    if (!userData.bmiLastUpdated) return 0;
    const now = Date.now();
    const fifteenDaysInMs = 15 * 24 * 60 * 60 * 1000;
    const diff = fifteenDaysInMs - (now - userData.bmiLastUpdated);
    return Math.max(0, Math.ceil(diff / (24 * 60 * 60 * 1000)));
  };

  const quickTests: QuickTest[] = [
    { id: "1", title: "Məntiq", icon: "brain", color: "#6C5CE7", route: "/tests/intelligence" },
    { id: "3", title: "Şəxsiyyət", icon: "account-heart", color: "#E17055", route: "/tests/personality" },
    { id: "4", title: "Emosional", icon: "heart", color: "#D63031", route: "/tests/emotional" },
  ];

  const quickExams: QuickExam[] = [
    { id: "1", title: "Göz", icon: "eye", route: "/examination-detail/eye" },
    { id: "2", title: "Skolyoz", icon: "spine", route: "/examination-detail/scoliosis" },
    { id: "3", title: "Ayaq", icon: "foot-print", route: "/examination-detail/foot" },
    { id: "4", title: "Sinir", icon: "brain", route: "/examination-detail/nerve" },
  ];

  const sportActivities: SportActivity[] = [
    { id: "1", title: "Üst Bədən", icon: "arm-flex", route: "/sports-detail/upper-body" },
    { id: "2", title: "Alt Bədən", icon: "run", route: "/sports-detail/lower-body" },
    { id: "3", title: "Qarın", icon: "dumbbell", route: "/sports-detail/core" },
    { id: "4", title: "Kardio", icon: "heart-pulse", route: "/sports-detail/cardio" },
  ];

  const bmi = calculateBMI();
  const bmiStatus = bmi ? getBMIStatus(parseFloat(bmi)) : null;
  const daysUntilUpdate = getDaysUntilNextUpdate();

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Welcome Header */}
        
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>{t.greeting}</Text>
              <Text style={styles.userName}>
                {userData.firstName || "İstifadəçi"} 👋
              </Text>

            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => router.push("/(tabs)/profile")}
            >
              {userData.photoURL ? (
                <Image source={{ uri: userData.photoURL }} style={styles.profileImage} />
              ) : (
                <View style={styles.profilePlaceholder}>
                  <MaterialCommunityIcons name="account" size={30} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          </View>

        {/* BMI Alert Banner */}
        {showBmiAlert && (
          <TouchableOpacity
            style={styles.alertBanner}
            onPress={() => setShowBmiModal(true)}
          >
            <View style={styles.alertIconContainer}>
              <MaterialCommunityIcons name="alert" size={20} color="#F9A825" />
            </View>
            <View style={styles.alertTextContainer}>
              <Text style={styles.alertTitle}>{t.updateWeightData}</Text>
              <Text style={styles.alertSubtitle}>{t.healthTrackingNeeded}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#F9A825" />
          </TouchableOpacity>
        )}

        {/* BMI Card - Only show if user has data */}
        {userData.weight && userData.height && (
          <View style={styles.bmiSection}>
            <TouchableOpacity
              style={styles.bmiCard}
              onPress={() => {
                setTempWeight(userData.weight);
                setTempHeight(userData.height);
                setShowBmiModal(true);
              }}
            >
              <LinearGradient
                colors={["#073D3D", "#0A5F5F"]}
                style={styles.bmiGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.bmiContent}>
                  <View style={styles.bmiLeft}>
                    <MaterialCommunityIcons name="scale-bathroom" size={40} color="#A3C9A8" />
                    <View>
                      <Text style={styles.bmiLabel}>{t.bmiTitle}</Text>
                      {daysUntilUpdate > 0 && (
                        <Text style={styles.bmiUpdateText}>
                          {daysUntilUpdate} {t.daysUntilUpdate}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.bmiRight}>
                    {bmi ? (
                      <>
                        <Text style={styles.bmiValue}>{bmi}</Text>
                        <View style={[styles.bmiStatusBadge, { backgroundColor: bmiStatus?.color }]}>
                          <Text style={styles.bmiStatusText}>{bmiStatus?.text}</Text>
                        </View>
                      </>
                    ) : (
                      <Text style={styles.bmiPlaceholder}>Məlumat daxil edin</Text>
                    )}
                  </View>
                </View>
                <View style={styles.bmiDetails}>
                  <View style={styles.bmiDetailItem}>
                    <Text style={styles.bmiDetailLabel}>{t.weight}</Text>
                    <Text style={styles.bmiDetailValue}>{userData.weight || "--"} kq</Text>
                  </View>
                  <View style={styles.bmiDetailDivider} />
                  <View style={styles.bmiDetailItem}>
                    <Text style={styles.bmiDetailLabel}>{t.height}</Text>
                    <Text style={styles.bmiDetailValue}>{userData.height || "--"} sm</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Tests Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🧠 {t.tests}</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/tests")}>
              <Text style={styles.seeAllText}>{t.seeAll} →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            {quickTests.map((test) => (
              <TouchableOpacity
                key={test.id}
                style={styles.testCard}
                onPress={() => router.push(test.route as any)}
              >
                <View style={[styles.testIconContainer, { backgroundColor: test.color + "20" }]}>
                  <MaterialCommunityIcons name={test.icon as any} size={32} color={test.color} />
                </View>
                <Text style={styles.testTitle}>{test.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Medical Examinations Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🏥 {t.medicalExams}</Text>
            <TouchableOpacity onPress={() => router.push("/examination")}>
              <Text style={styles.seeAllText}>{t.seeAll} →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {quickExams.map((exam) => (
              <TouchableOpacity
                key={exam.id}
                style={styles.examCard}
                onPress={() => router.push(exam.route as any)}
              >
                <View style={styles.examIconContainer}>
                  <MaterialCommunityIcons name={exam.icon as any} size={28} color="#073D3D" />
                </View>
                <Text style={styles.examTitle}>{exam.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Sport Activities Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>💪 {t.sportActivities}</Text>
            <TouchableOpacity onPress={() => router.push("/sports")}>
              <Text style={styles.seeAllText}>{t.seeAll} →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sportsGrid}>
            {sportActivities.map((sport) => (
              <TouchableOpacity
                key={sport.id}
                style={styles.sportCard}
                onPress={() => router.push(sport.route as any)}
              >
                <LinearGradient
                  colors={["#ffffff", "#f8f9fa"]}
                  style={styles.sportGradient}
                >
                  <MaterialCommunityIcons name={sport.icon as any} size={36} color="#A3C9A8" />
                  <Text style={styles.sportTitle}>{sport.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Daily Tip Card */}
        <View style={styles.section}>
          <View style={styles.tipCard}>
            <View style={styles.tipIcon}>
              <MaterialCommunityIcons name="lightbulb-on" size={24} color="#F9A825" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{t.dailyTip}</Text>
              <Text style={styles.tipText}>
                {t.dailyTipText}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* BMI Modal */}
      <Modal
        visible={showBmiModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleBmiModalDismiss}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={["#073D3D", "#0A5F5F"]}
              style={styles.modalGradient}
            >
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <View style={styles.modalIconContainer}>
                  <MaterialCommunityIcons name="scale-bathroom" size={40} color="#A3C9A8" />
                </View>
                <Text style={styles.modalTitle}>Çəki Məlumatları</Text>
                <Text style={styles.modalSubtitle}>
                  Sağlamlığınızı izləmək üçün çəki və boyunuzu daxil edin
                </Text>
              </View>

              {/* Input Fields */}
              <View style={styles.modalInputContainer}>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="weight-kilogram" size={24} color="#A3C9A8" />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Çəki (kq)"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    keyboardType="numeric"
                    value={tempWeight}
                    onChangeText={setTempWeight}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="human-male-height" size={24} color="#A3C9A8" />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Boy (sm)"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    keyboardType="numeric"
                    value={tempHeight}
                    onChangeText={setTempHeight}
                  />
                </View>
              </View>

              {/* BMI Preview */}
              {tempWeight && tempHeight && (
                <View style={styles.bmiPreview}>
                  <Text style={styles.bmiPreviewLabel}>Hesablanmış BKİ:</Text>
                  <Text style={styles.bmiPreviewValue}>
                    {(parseFloat(tempWeight) / Math.pow(parseFloat(tempHeight) / 100, 2)).toFixed(1)}
                  </Text>
                </View>
              )}

              {/* Buttons */}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButtonSecondary}
                  onPress={handleBmiModalDismiss}
                >
                  <Text style={styles.modalButtonSecondaryText}>Sonra</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modalButtonPrimary,
                    (!tempWeight || !tempHeight) && styles.modalButtonDisabled
                  ]}
                  onPress={handleBmiSubmit}
                  disabled={!tempWeight || !tempHeight}
                >
                  <Text style={styles.modalButtonPrimaryText}>Yadda saxla</Text>
                </TouchableOpacity>
              </View>

              {/* Info Text */}
              <View style={styles.modalInfo}>
                <MaterialCommunityIcons name="information-outline" size={16} color="rgba(255,255,255,0.6)" />
                <Text style={styles.modalInfoText}>
                  Məlumatlar 15 gündən bir yenilənməlidir
                </Text>
              </View>
            </LinearGradient>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D1DEBE",
  },

  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
        paddingTop: 10,
    paddingBottom: 0,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: "#073D3D",
    opacity: 0.8,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#073D3D",
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#073D3D",
    opacity: 0.7,
    marginTop: 4,
  },
  profileButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profilePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#073D3D",
    justifyContent: "center",
    alignItems: "center",
  },
  // Alert Banner
  alertBanner: {
    marginHorizontal: 20,
    marginTop: 15,
    backgroundColor: "#FFF8E1",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#F9A825",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alertIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF3E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#E65100",
  },
  alertSubtitle: {
    fontSize: 12,
    color: "#F57C00",
    marginTop: 2,
  },
  // BMI Section
  bmiSection: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  bmiCard: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  bmiGradient: {
    padding: 20,
  },
  bmiContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bmiLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bmiLabel: {
    fontSize: 14,
    color: "#A3C9A8",
    fontWeight: "600",
  },
  bmiUpdateText: {
    fontSize: 11,
    color: "rgba(163, 201, 168, 0.7)",
    marginTop: 2,
  },
  bmiRight: {
    alignItems: "flex-end",
  },
  bmiValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  bmiStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  bmiStatusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  bmiPlaceholder: {
    fontSize: 14,
    color: "#A3C9A8",
  },
  bmiDetails: {
    flexDirection: "row",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(163, 201, 168, 0.3)",
  },
  bmiDetailItem: {
    flex: 1,
    alignItems: "center",
  },
  bmiDetailDivider: {
    width: 1,
    backgroundColor: "rgba(163, 201, 168, 0.3)",
  },
  bmiDetailLabel: {
    fontSize: 12,
    color: "#A3C9A8",
    marginBottom: 4,
  },
  bmiDetailValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#073D3D",
  },
  seeAllText: {
    fontSize: 14,
    color: "#073D3D",
    fontWeight: "600",
  },
  horizontalScroll: {
    paddingRight: 20,
  },
  testCard: {
    width: 100,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  testIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  testTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  examCard: {
    width: 90,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginRight: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  examIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  examTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  sportsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sportCard: {
    width: (width - 52) / 2,
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  sportGradient: {
    padding: 20,
    alignItems: "center",
  },
  sportTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
  },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  quickActionCard: {
    width: (width - 56) / 3,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionGradient: {
    padding: 16,
    alignItems: "center",
  },
  quickActionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  quickActionSubtitle: {
    fontSize: 10,
    color: "#666",
    marginTop: 2,
  },
  tipCard: {
    backgroundColor: "#FFF8E1",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#F9A825",
  },
  tipIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  bottomSpacing: {
    height: 100,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  modalGradient: {
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(163, 201, 168, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    lineHeight: 20,
  },
  modalInputContainer: {
    gap: 16,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(163, 201, 168, 0.3)",
  },
  modalInput: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    paddingVertical: 14,
    marginLeft: 12,
  },
  bmiPreview: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 24,
    padding: 16,
    backgroundColor: "rgba(163, 201, 168, 0.2)",
    borderRadius: 12,
  },
  bmiPreviewLabel: {
    fontSize: 14,
    color: "#A3C9A8",
  },
  bmiPreviewValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButtonSecondary: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  modalButtonSecondaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
  },
  modalButtonPrimary: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#A3C9A8",
    alignItems: "center",
  },
  modalButtonDisabled: {
    opacity: 0.5,
  },
  modalButtonPrimaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#073D3D",
  },
  modalInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 20,
  },
  modalInfoText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
});
