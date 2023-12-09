import { View } from "react-native";
import React from "react";
import SignupForm from "../forms/RegisterForm";

export default function RegisterScreen(props) {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <SignupForm {...props} />
    </View>
  );
}
