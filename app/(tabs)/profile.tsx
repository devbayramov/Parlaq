import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextInputField from "../../components/ui/TextInputField"; // Assuming this is the correct path

const translations = {
  az: {
    personalInfo: "Şəxsi Məlumat",
    fullName: "Ad Soyad",
    age: "Yaş",
    healthInfo: "Sağlamlıq Məlumatı",
    weight: "Çəki (kq)",
    height: "Boy (sm)",
    settings: "Ayarlar",
    language: "Dil seçimi",
    notification: "Bildiriş tənzimləmələri",
    selectLanguage: "Dil Seçin",
    azerbaijani: "Azərbaycanca",
    english: "English",
    russian: "Русский",
  },
  en: {
    personalInfo: "Personal Information",
    fullName: "Full Name",
    age: "Age",
    healthInfo: "Health Information",
    weight: "Weight (kg)",
    height: "Height (cm)",
    settings: "Settings",
    language: "Language",
    notification: "Notification",
    selectLanguage: "Select Language",
    azerbaijani: "Azerbaijani",
    english: "English",
    russian: "Russian",
  },
  ru: {
    personalInfo: "Личная информация",
    fullName: "Полное имя",
    age: "Возраст",
    healthInfo: "Информация о здоровье",
    weight: "Вес (кг)",
    height: "Рост (см)",
    settings: "Настройки",
    language: "Язык",
    notification: "Уведомления",
    selectLanguage: "Выберите язык",
    azerbaijani: "Azerbaijani",
    english: "English",
    russian: "Русский",
  },
};

export default function Profile() {
  const [language, setLanguage] = useState<"az" | "en" | "ru">("az");
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const t = translations[language];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Photo */}
      <View style={styles.profilePhotoContainer}>
        <View style={styles.profilePhotoWrapper}>
          <Text style={styles.initials}>PP</Text>
          <TouchableOpacity 
            style={styles.cameraIconButton}
          >
            <MaterialCommunityIcons name="camera" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.personalInfo}</Text>
        <TextInputField placeholder={t.fullName} />
        <TextInputField placeholder={t.age} keyboardType="numeric" />
      </View>

      {/* Health Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.healthInfo}</Text>
        <TextInputField placeholder={t.weight} keyboardType="numeric" />
        <TextInputField placeholder={t.height} keyboardType="numeric" />
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.settings}</Text>
        <View style={styles.settingsRow}>
          <TouchableOpacity 
            style={styles.buttonWrapper}
            onPress={() => setShowLanguageModal(true)}
          >
            <Text style={styles.settingButtonText}>{t.language}</Text>
          </TouchableOpacity>
          <View style={styles.buttonWrapper}>
            <Text style={styles.settingButtonText}>{t.notification}</Text>
          </View>
          <TouchableOpacity style={styles.logoutIconContainer}>
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
              style={styles.languageOption}
              onPress={() => {
                setLanguage("az");
                setShowLanguageModal(false);
              }}
            >
              <Text style={styles.languageOptionText}>{t.azerbaijani}</Text>
              {language === "az" && <MaterialCommunityIcons name="check" size={24} color="#073D3D" />}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.languageOption}
              onPress={() => {
                setLanguage("en");
                setShowLanguageModal(false);
              }}
            >
              <Text style={styles.languageOptionText}>{t.english}</Text>
              {language === "en" && <MaterialCommunityIcons name="check" size={24} color="#073D3D" />}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.languageOption}
              onPress={() => {
                setLanguage("ru");
                setShowLanguageModal(false);
              }}
            >
              <Text style={styles.languageOptionText}>{t.russian}</Text>
              {language === "ru" && <MaterialCommunityIcons name="check" size={24} color="#073D3D" />}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowLanguageModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    left: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
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
});