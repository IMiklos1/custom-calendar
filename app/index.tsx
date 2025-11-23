// app/index.tsx
import { useUserAuth } from "@/hooks/useUserAuth";
import { Redirect } from "expo-router";
import React from "react";

export default function Index() {
  const { user, loading } = useUserAuth();

  if (!user) { // NOTE: Uncomment to enable auth redirection
    return <Redirect href="/(auth)/sign-in" />;
  }
  return <Redirect href="/(tabs)/calendar" />;
}
