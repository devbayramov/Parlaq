import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

type Props = TextInputProps & {
  errorText?: string;
};

const PasswordInputField: React.FC<Props> = ({ errorText, style, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ width: "100%", position: "relative" }}>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#8BA18F"
        secureTextEntry={!showPassword}
        {...rest}
      />
      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={() => setShowPassword(!showPassword)}
        activeOpacity={0.7}
      >
        <Feather
          name={showPassword ? "eye" : "eye-off"}
          size={20}
          color="#8BA18F"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  input: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#8BA18F",
    paddingHorizontal: 14,
    paddingRight: 40,
    paddingVertical: 10,
    fontSize: 14,
    color: "#073D3D",
    backgroundColor: "rgba(255,255,255,0.3)",
  } as any,
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
  } as any,
};

export default PasswordInputField;
