import { AuthService } from "@/services/auth.service";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      const user = await AuthService.login(email.trim(), password);
      console.log("Signed in user:", user);
      router.replace("/(tabs)/calendar"); // Home
    } catch (error: any) {
      Alert.alert("Sign In Error", error.message || "Something went wrong");
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Sign In</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Don't have an account? Sign Up" onPress={() => router.push("/(auth)/sign-up")} />
    </View>
  );
}
