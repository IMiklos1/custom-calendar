import { AuthService } from "@/services/auth.service";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function SignUpScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp() {
    try {
      await AuthService.register(email.trim(), password, username.trim());
      router.replace("/(tabs)/calendar");
    } catch (error: any) {
      Alert.alert("Sign Up Error", error.message || "Something went wrong");
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Sign Up</Text>

      <TextInput
        placeholder="Username"
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
        value={username}
        onChangeText={setUsername}
      />

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

      <Button title="Create Account" onPress={handleSignUp} />
      <Button title="Already have an account? Sign In" onPress={() => router.push("/(auth)/sign-in")} />
    </View>
  );
}
