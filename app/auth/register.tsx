import PasswordInputField from "@/components/ui/PasswordInputField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import TextInputField from "@/components/ui/TextInputField";
import { auth } from "@/services/firebaseConfig";
import { router } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !phone || !email || !password) {
      Alert.alert("Xəta", "Bütün sahələr məcburidir.");
      return;
    }

    if (!termsAccepted) {
      Alert.alert("Xəta", "Şərtləri qəbul etməlisiniz.");
      return;
    }

    // Basic email validation
    if (!email.includes("@")) {
      Alert.alert("Xəta", "Düzgün email adresi daxil edin.");
      return;
    }

    // Password length check
    if (password.length < 6) {
      Alert.alert("Xəta", "Parol ən azı 6 simvol olmalıdır.");
      return;
    }

    setLoading(true);
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with first and last name
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });

      Alert.alert("Uğurlu", "Qeydiyyat tamamlandı!", [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)"),
        },
      ]);
    } catch (error: any) {
      let errorMessage = "Qeydiyyat zamanı xəta baş verdi.";
      
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Bu email adresi artıq istifadə olunur.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Parol çox sadədir. Daha güclü parol seçin.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Email adresi düzgün deyil.";
      }
      
      Alert.alert("Xəta", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Qeydiyyat</Text>

        <View style={styles.form}>
          <TextInputField
            placeholder="Ad"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInputField
            placeholder="Soyad"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInputField
            placeholder="+994 __ ___ __ __"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInputField
            placeholder="E-Mail"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <PasswordInputField
            placeholder="Parol"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setTermsAccepted(!termsAccepted)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
            {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxText}>
            Mənim {" "}
            <Text style={styles.linkText}>şəxsi məlumatlarımın</Text>{" "}
            emalına razıyam
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonWrapper}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#073D3D" />
            </View>
          ) : (
            <PrimaryButton title="Qeydiyyatdan keç" onPress={handleRegister} />
          )}
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>Artıq hesabınız var? </Text>
          <TouchableOpacity onPress={() => router.push("/auth/login")}>
            <Text style={[styles.bottomText, styles.bottomLink]}>Daxil olun</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#D1DEBE",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#073D3D",
    textAlign: "center",
    marginBottom: 40,
  },
  form: {
    width: "100%",
    display:"flex",
    gap:"20"
    
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 16,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#073D3D",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#073D3D",
    borderColor: "#073D3D",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  checkboxText: {
    fontSize: 12,
    color: "#073D3D",
  },
  linkText: {
    textDecorationLine: "underline",
  },
  buttonWrapper: {
    marginTop: 40,
  },
  loadingContainer: {
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    fontSize: 12,
    color: "#073D3D",
  },
  bottomLink: {
    textDecorationLine: "underline",
  },
});


