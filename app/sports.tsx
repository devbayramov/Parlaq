import { useLanguage } from "@/context/LanguageContext";
import { auth, db } from "@/services/firebaseConfig";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SportsOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  route: string;
}

export default function Sports() {
  const { t } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userAge, setUserAge] = useState<number | null>(null);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [ageInput, setAgeInput] = useState("");
  const [savingAge, setSavingAge] = useState(false);

  // Exercise categories for kids (under 15)
  const kidsSportGroups: SportsOption[] = [
    {
      id: "1",
      title: "Isınma Məşqləri",
      description: "Bədəni hazırlamaq üçün sadə hərəkətlər",
      icon: "human-handsup",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
      route: "/sports-detail/kids-warmup",
    },
    {
      id: "2",
      title: "Əyləncəli Hərəkətlər",
      description: "Oyun kimi əyləncəli məşqlər",
      icon: "emoticon-happy",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400",
      route: "/sports-detail/kids-fun",
    },
    {
      id: "3",
      title: "Tarazlıq Məşqləri",
      description: "Tarazlığı yaxşılaşdıran hərəkətlər",
      icon: "yoga",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
      route: "/sports-detail/kids-balance",
    },
    {
      id: "4",
      title: "Uzanma Məşqləri",
      description: "Elastikliyi artıran sadə uzanmalar",
      icon: "human",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      route: "/sports-detail/kids-stretch",
    },
    {
      id: "5",
      title: "Skolyoz Məşqləri",
      description: "Onurğa sağlamlığı üçün yüngül məşqlər",
      icon: "spine",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
      route: "/sports-detail/kids-scoliosis",
    },
  ];

  // Exercise categories for adults (15+)
  const adultsSportGroups: SportsOption[] = [
    {
      id: "1",
      title: "Üst Bədən Məşqləri",
      description: "Qol, çiyin və döş əzələləri üçün",
      icon: "arm-flex",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=400",
      route: "/sports-detail/adults-upper",
    },
    {
      id: "2",
      title: "Alt Bədən Məşqləri",
      description: "Ayaq və bud əzələləri üçün",
      icon: "run",
      image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400",
      route: "/sports-detail/adults-lower",
    },
    {
      id: "3",
      title: "Qarın Əzələsi",
      description: "Core və qarın əzələləri üçün",
      icon: "dumbbell",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
      route: "/sports-detail/adults-core",
    },
    {
      id: "4",
      title: "Kardio Məşqləri",
      description: "Ürək-damar sistemi üçün",
      icon: "heart-pulse",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400",
      route: "/sports-detail/adults-cardio",
    },
    {
      id: "5",
      title: "Skolyoz Məşqləri",
      description: "Onurğa sağlamlığı üçün yüngül məşqlər",
      icon: "spine",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
      route: "/sports-detail/adults-scoliosis",
    },
  ];

  useEffect(() => {
    fetchUserAge();
  }, []);

  const fetchUserAge = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.age && userData.age !== "") {
            setUserAge(parseInt(userData.age));
          } else {
            setShowAgeModal(true);
          }
        } else {
          setShowAgeModal(true);
        }
      }
    } catch (error) {
      console.error("Error fetching user age:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAge = async () => {
    const age = parseInt(ageInput);
    if (isNaN(age) || age < 1 || age > 120) {
      return;
    }

    setSavingAge(true);
    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, "users", user.uid), { age: ageInput });
        setUserAge(age);
        setShowAgeModal(false);
      }
    } catch (error) {
      console.error("Error saving age:", error);
    } finally {
      setSavingAge(false);
    }
  };

  const isKid = userAge !== null && userAge < 15;
  const sportGroups = isKid ? kidsSportGroups : adultsSportGroups;
  const headerSubtitle = isKid
    ? "15 yaşdan kiçiklər üçün sadə və təhlükəsiz məşqlər"
    : "15 yaşdan yuxarı üçün daha intensiv məşqlər";

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A3C9A8" />
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
        <Text style={styles.headerTitle}>{t.sportsExercises}</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Info Banner */}
      {userAge !== null && (
        <View style={styles.infoBanner}>
          <MaterialCommunityIcons
            name={isKid ? "information" : "fire"}
            size={20}
            color={isKid ? "#A3C9A8" : "#F4A766"}
          />
          <Text style={styles.infoText}>{headerSubtitle}</Text>
          <TouchableOpacity onPress={() => setShowAgeModal(true)}>
            <MaterialCommunityIcons name="pencil" size={18} color="#666" />
          </TouchableOpacity>
        </View>
      )}

      {/* Sport Groups */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {sportGroups.map((sport) => (
          <TouchableOpacity
            key={sport.id}
            style={styles.sportBox}
            onPress={() => router.push(sport.route as any)}
          >
            <Image
              source={{ uri: sport.image }}
              style={styles.sportImage}
              resizeMode="cover"
            />
            <View style={styles.sportContent}>
              <MaterialCommunityIcons
                name={sport.icon as any}
                size={35}
                color="#A3C9A8"
              />
              <View style={styles.textContent}>
                <Text style={styles.sportTitle}>{sport.title}</Text>
                <Text style={styles.sportDescription}>{sport.description}</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#A3C9A8"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Age Input Modal */}
      <Modal
        visible={showAgeModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          if (userAge !== null) setShowAgeModal(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <MaterialCommunityIcons
              name="account-question"
              size={50}
              color="#A3C9A8"
              style={styles.modalIcon}
            />
            <Text style={styles.modalTitle}>Yaşınızı daxil edin</Text>
            <Text style={styles.modalDescription}>
              Sizə uyğun məşqləri göstərmək üçün yaşınızı bilməliyik
            </Text>

            <TextInput
              style={styles.ageInput}
              placeholder="Yaşınız"
              keyboardType="numeric"
              maxLength={3}
              value={ageInput}
              onChangeText={(text) => setAgeInput(text.replace(/[^0-9]/g, ""))}
            />

            <TouchableOpacity
              style={[
                styles.saveButton,
                (!ageInput || savingAge) && styles.saveButtonDisabled,
              ]}
              onPress={handleSaveAge}
              disabled={!ageInput || savingAge}
            >
              {savingAge ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>Yadda saxla</Text>
              )}
            </TouchableOpacity>

            {userAge !== null && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAgeModal(false)}
              >
                <Text style={styles.cancelButtonText}>Ləğv et</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D1DEBE",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#D1DEBE",
    justifyContent: "center",
    alignItems: "center",
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
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(163, 201, 168, 0.2)",
    marginHorizontal: 15,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    gap: 10,
  },
  infoText: {
    fontSize: 12,
    color: "#333",
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  sportBox: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sportImage: {
    width: "100%",
    height: 120,
  },
  sportContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 12,
  },
  textContent: {
    flex: 1,
  },
  sportTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  sportDescription: {
    fontSize: 12,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    alignItems: "center",
  },
  modalIcon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#073D3D",
    marginBottom: 10,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  ageInput: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  saveButton: {
    width: "100%",
    backgroundColor: "#073D3D",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#999",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 14,
  },
});
