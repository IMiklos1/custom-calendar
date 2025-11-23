import { useUserAuth } from "@/hooks/useUserAuth";
import { Redirect, Stack } from "expo-router";
import React from "react";
// import LoadingScreen from "./loading";

export default function RootLayout() {
  const { user, loading } = useUserAuth();

  if (loading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Always declare both route groups */}
      {/* NOTE: Uncomment the following line to enable the auth route group */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Add redirect logic here */}
      {!user && <Redirect href="/(auth)/sign-in" />}
    </Stack>
  );

}
