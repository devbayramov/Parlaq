import { useLanguage } from "@/context/LanguageContext";
import { auth, db } from "@/services/firebaseConfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextInputField from "../../components/ui/TextInputField";

export default function Profile() {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    weight: "",
    height: "",
    phone: "",
    photoURL: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [notificationSetting, setNotificationSetting] = useState<"none" | "periodic" | "all">("none");
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationOption, setNotificationOption] = useState("all");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as typeof userData);
          setNotificationSetting(userDoc.data().notificationSetting || "none");
        }
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (field: keyof typeof userData, value: string) => {
    // Filter to numbers only for weight and height fields
    if (field === "weight" || field === "height") {
      value = value.replace(/[^0-9.]/g, "");
    }
    setUserData((prev) => ({ ...prev, [field]: value }));
    setIsEditing(true);
  };

  const storage = getStorage();
  const [isUploading, setIsUploading] = useState(false);

  const uriToBlob = (uri: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new Error("Failed to convert URI to blob"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  const handlePhotoChange = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("İcazə lazımdır", "Şəkil seçmək üçün foto kitabxanasına giriş icazəsi verin.");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled || !result.assets[0]) return;

      setIsUploading(true);
      const newPhotoUri = result.assets[0].uri;

      // Delete old photo from Firebase Storage if exists
      if (userData.photoURL && userData.photoURL.includes("firebase")) {
        try {
          const oldPhotoRef = ref(storage, `profile_photos/${user.uid}`);
          await deleteObject(oldPhotoRef);
        } catch (error) {
          console.log("No old photo to delete or delete failed");
        }
      }

      // Convert URI to blob - works on both iOS and Android
      const blob = await uriToBlob(newPhotoUri);

      // Upload new photo to Firebase Storage
      const fileName = `profile_photos/${user.uid}_${Date.now()}.jpg`;
      const photoRef = ref(storage, fileName);

      await uploadBytesResumable(photoRef, blob, {
        contentType: "image/jpeg",
      });

      // Get the download URL and update Firestore
      const downloadURL = await getDownloadURL(photoRef);

      await updateDoc(doc(db, "users", user.uid), { photoURL: downloadURL });
      setUserData((prev) => ({ ...prev, photoURL: downloadURL }));

    } catch (error) {
      console.error("Photo upload error:", error);
      Alert.alert("Xəta", "Şəkil yüklənərkən xəta baş verdi. Yenidən cəhd edin.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (user) {
      await updateDoc(doc(db, "users", user.uid), { ...userData, notificationSetting });
      setIsEditing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLanguageChange = (lang: "az" | "en" | "ru") => {
    setLanguage(lang);
    setShowLanguageModal(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Photo */}
      <View style={styles.profilePhotoContainer}>
        <View style={styles.profilePhotoWrapper}>
          {userData.photoURL ? (
            <Image source={{ uri: userData.photoURL }} style={styles.profilePhoto} />
          ) : (
            <Text style={styles.initials}>PP</Text>
          )}
          <TouchableOpacity
            style={styles.cameraIconButton}
            onPress={handlePhotoChange}
            disabled={isUploading}
          >
            {isUploading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <MaterialCommunityIcons name="camera" size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.personalInfo}</Text>
        <TextInputField
          placeholder={t.firstName}
          value={userData.firstName}
          onChangeText={(value) => handleInputChange("firstName", value)}
        />
         <TextInputField
          placeholder={t.lastName}
          value={userData.lastName}
          onChangeText={(value) => handleInputChange("lastName", value)}
        />
        <TextInputField
          placeholder={t.age}
          keyboardType="numeric"
          value={userData.age}
          onChangeText={(value) => handleInputChange("age", value)}
        />
        <TextInputField
          placeholder="Phone"
          keyboardType="phone-pad"
          value={userData.phone}
          onChangeText={(value) => handleInputChange("phone", value)}
        />
      </View>

      {/* Health Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.healthInfo}</Text>
        <TextInputField
          placeholder={t.weightKg}
          keyboardType="numeric"
          maxLength={3}
          value={userData.weight}
          onChangeText={(value) => handleInputChange("weight", value)}
        />
        <TextInputField
          placeholder={t.heightCm}
          keyboardType="numeric"
          maxLength={3}
          value={userData.height}
          onChangeText={(value) => handleInputChange("height", value)}
        />
      </View>

      {isEditing && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>{t.save}</Text>
        </TouchableOpacity>
      )}

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.settings}</Text>
        <View style={styles.settingsRow}>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => setShowLanguageModal(true)}
          >
            <Text style={styles.settingButtonText}>{t.selectLanguage}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => setShowNotificationModal(true)}
          >
            <Text style={styles.settingButtonText}>{t.notification}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutIconContainer} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Language Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t.selectLanguage}</Text>

            <TouchableOpacity
              style={[styles.languageOption, language === "az" && styles.activeLanguage]}
              onPress={() => handleLanguageChange("az")}
            >
              <Text style={styles.languageOptionText}>{t.azerbaijani}</Text>
              {language === "az" && <MaterialCommunityIcons name="check" size={24} color="#073D3D" />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.languageOption, language === "en" && styles.activeLanguage]}
              onPress={() => handleLanguageChange("en")}
            >
              <Text style={styles.languageOptionText}>{t.english}</Text>
              {language === "en" && <MaterialCommunityIcons name="check" size={24} color="#073D3D" />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.languageOption, language === "ru" && styles.activeLanguage]}
              onPress={() => handleLanguageChange("ru")}
            >
              <Text style={styles.languageOptionText}>{t.russian}</Text>
              {language === "ru" && <MaterialCommunityIcons name="check" size={24} color="#073D3D" />}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowLanguageModal(false)}
            >
              <Text style={styles.closeButtonText}>{t.close}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Notification Settings Modal */}
      <Modal
        visible={showNotificationModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowNotificationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t.notification}</Text>
            <TouchableOpacity
              style={[styles.notificationOption, notificationOption === "all" && styles.activeButton]}
              onPress={() => setNotificationOption("all")}
            >
              <Text style={[styles.notificationOptionText, notificationOption === "all" && styles.activeButtonText]}>{t.allNotifications}</Text>
              {notificationOption === "all" && <MaterialCommunityIcons name="check" size={24} color="#073D3D" />}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.notificationOption, notificationOption === "periodic" && styles.activeButton]}
              onPress={() => setNotificationOption("periodic")}
            >
              <Text style={[styles.notificationOptionText, notificationOption === "periodic" && styles.activeButtonText]}>{t.periodicCheckups}</Text>
              {notificationOption === "periodic" && <MaterialCommunityIcons name="check" size={24} color="#073D3D" />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.notificationOption, notificationOption === "tests" && styles.activeButton]}
              onPress={() => setNotificationOption("tests")}
            >
              <Text style={[styles.notificationOptionText, notificationOption === "tests" && styles.activeButtonText]}>{t.newTestsCampaigns}</Text>
              {notificationOption === "tests" && <MaterialCommunityIcons name="check" size={24} color="#073D3D" />}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowNotificationModal(false)}
            >
              <Text style={styles.closeButtonText}>{t.close}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingBottom: 100,
    backgroundColor: "#D1DEBE",
    width: "100%",
    height: "100%",
  },
  profilePhotoContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  profilePhotoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#073D3D",
    backgroundColor: "#073D3D",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cameraIconButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#073D3D",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 2,
  },
  initials: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  section: {
    marginBottom: 20,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonWrapper: {
    backgroundColor: "#073D3D",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
  },
  settingButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  logoutIconContainer: {
    padding: 7,
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
    width: "80%",
    minHeight: 250,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#073D3D",
  },
  languageOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  activeLanguage: {
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#A3C9A8",
  },
  languageOptionText: {
    fontSize: 16,
    color: "#073D3D",
    fontWeight: "500",
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#073D3D",
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  profilePhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  submitButton: {
    backgroundColor: "#073D3D",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  activeButton: {
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#A3C9A8",
  },
  activeButtonText: {
    color: "#073D3D",
  },
  notificationOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  notificationOptionText: {
    fontSize: 16,
    color: "#073D3D",
    fontWeight: "500",
    flex: 1,
  },
});
