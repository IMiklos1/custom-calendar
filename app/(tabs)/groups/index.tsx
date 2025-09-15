import { Group } from "@/models/group";
import { GroupService } from "@/services/group.service";
import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GroupsScreen() {
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    GroupService.onSnapshot(setGroups);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/groups/${item.id}` as RelativePathString)}>
            <Text style={styles.group}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Create Group" onPress={() => router.push("/groups/create" as RelativePathString)} />
      <Button title="Join Group" onPress={() => router.push("/groups/join" as RelativePathString)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  group: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
});