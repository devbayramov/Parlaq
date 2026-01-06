import PasswordInputField from "@/components/ui/PasswordInputField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import TextInputField from "@/components/ui/TextInputField";
import { auth } from "@/services/firebaseConfig";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Xəta", "E-mail və parol məcburidir.");
      return;
    }

    // Basic email validation
    if (!email.includes("@")) {
      Alert.alert("Xəta", "Düzgün email adresi daxil edin.");
      return;
    }

    setLoading(true);
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)")
      
    
    } catch (error: any) {
      let errorMessage = "Daxil olmaq zamanı xəta baş verdi.";
      
      if (error.code === "auth/user-not-found") {
        errorMessage = "Bu email adresi ilə qeydiyyatdan keçən istifadəçi yoxdur.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Parol düzgün deyil.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Email adresi düzgün deyil.";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "Bu hesab deaktivdir.";
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
        <Text style={styles.title}>Daxil Olun</Text>

        <View style={styles.form}>
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

        <View style={styles.buttonWrapper}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#073D3D" />
            </View>
          ) : (
            <PrimaryButton title="Daxil olun" onPress={handleLogin} />
          )}
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>Hesabınız yoxdur? </Text>
          <TouchableOpacity onPress={() => router.push("/auth/register")}>
            <Text style={[styles.bottomText, styles.bottomLink]}>Qeydiyyatdan keç</Text>
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
    gap: 16,
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


