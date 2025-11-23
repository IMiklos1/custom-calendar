import { useAuth } from "@/hooks/useUserAuth";
import { Group } from "@/models/group";
import { GroupServiceExtended } from "@/services/group.service";
import { UserServiceExtended } from "@/services/user.service";
import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GroupsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  // const groups: Group[] = [];
  const GroupService = new GroupServiceExtended();
  const UserService = new UserServiceExtended();

  useEffect(() => {
    if (!user) return;

    // console.log("Loading groups for user:", user?.uid);

    UserService.getGroups(user?.uid || "").then((userGroups) => {
      (userGroups.forEach(groupId => {
        const grupsz: Group[] = [];
        GroupService.getById(groupId).then(group => {

          if (group) grupsz.push(group);
          // console.log("Fetched group:", groups);
          // setGroups([...groups]);
          ;
        }).catch(console.error).finally(() => {
          setGroups([...grupsz]); //TODO: continue here, not working yet
          console.log("Groups after fetch:", groups);
          console.log("Groups after fetch (grupsz):", grupsz);
          console.log("User groups:", userGroups); //after add a new line to a code and save it, it works (???)
        });
      }))
    }).catch(console.error);
    console.log("Groups loaded");
    console.log(groups);
  }, [groups.length]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 16, marginTop: 30 }}>Groups</Text>
      {groups.length === 0 && <Text>No groups available. Create or join a group!</Text>}
      {groups.length > 0 &&
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.touchable} onPress={() => router.push(`/groups/${item.id}` as RelativePathString)}>
              <Text style={styles.group}>{item.id} - {item.name}</Text>
            </TouchableOpacity>
          )}
        />}
      <Button title="Create Group" onPress={() => router.push("/groups/create" as RelativePathString)} />
      <Button title="Join Group" onPress={() => router.push("/groups/join" as RelativePathString)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  touchable: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  group: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: 'darkgrey' },
});