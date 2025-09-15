import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'flex' } }}>
      <Tabs.Screen name="calendar" options={{ title: "Calendar" }} />
      <Tabs.Screen name="groups" options={{ title: "Groups" }} />
      <Tabs.Screen name="events" options={{ title: "Events" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      {/* <Tabs.Screen name="home" options={{ title: "Home", tabBarButton: () => null }} /> */}
    </Tabs>
  );
  // const { user, loading } = useAuth();
  // if (loading) {
  //   return null; // or <LoadingScreen />
  // }
  // // if (!user) return <Redirect href="/(auth)/sign-in" />;

  // if(!user) {console.log("No user, redirecting to sign-in");}
  // if(user) {console.log("User found:", user.email);}

  // return <Stack screenOptions={{ headerShown: false }} />;

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});