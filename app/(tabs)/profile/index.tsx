import { useAuth } from "@/hooks/useUserAuth";
import { User } from "@/models/user";
import { UserServiceExtended } from "@/services/user.service";
import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const UserService = new UserServiceExtended();

  React.useEffect(() => {
    if (user) {
      UserService.getById(user.uid)
        .then(data => {
          // handle loaded user data here
          setUserData(data);
          console.log("User data loaded:", data);
        })
        .catch(error => {
          console.error("Failed to load user data:", error);
        });
    }
  }, [user]);

  if (!user) return <Text>Loading...</Text>;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flexDirection: 'column' }}>
        <View style={[styles.container, { flex: 2, flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#bbb' }]} >
          <Text style={styles.name}>Profile</Text>
          <Button title="Sign Out" onPress={signOut} />
        </View>
        <View style={styles.container}>
          <Text style={styles.name}>{user.displayName || "No Name"}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Member of groups: </Text>
          {userData?.groups?.length ? (
            userData.groups.map((groupId) => (
              <Text key={groupId}>- {groupId}</Text>
            ))
          ) : (
            <Text>No groups</Text>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 0, justifyContent: "center", alignItems: "center" },
  name: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
});
