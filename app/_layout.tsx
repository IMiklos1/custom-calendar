import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";
import React from "react";
// import LoadingScreen from "./loading";

export default function RootLayout() {
 const { user, loading } = useAuth();

  if (loading) {
    return null; // or <LoadingScreen />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Always declare both route groups */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Add redirect logic here */}
      {!user && <Redirect href="/(auth)/sign-in" />}
    </Stack>
  );

}
