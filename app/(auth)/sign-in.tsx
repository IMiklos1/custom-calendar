import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignInScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      const resp = await signIn(email, password);
      router.push("/(tabs)/calendar");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Text>Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign In" onPress={handleSignIn} />
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      <Text style={styles.signUpText} onPress={() => router.push("/(auth)/sign-up")}>Don't have an account?</Text>
      {/* <Button title="Go to Sign Up" onPress={() => router.push("/(auth)/sign-up")} /> */}
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  signUpText: {
    marginTop: 16,
    textDecorationLine: "underline"
  },
  signUpButton: {
    marginTop: 8,
    backgroundColor: "transparent", 
    borderWidth: 0,
    padding: 0,
    color: "blue",
    textDecorationLine: "underline"
  }
});  
