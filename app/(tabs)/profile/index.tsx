import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  if (!user) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.displayName || "No Name"}</Text>
      <Text>Email: {user.email}</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  name: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
});
