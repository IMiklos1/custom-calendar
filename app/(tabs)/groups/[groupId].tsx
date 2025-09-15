import { Group } from "@/models/group";
import { GroupService } from "@/services/group.service";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function GroupDetails() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const router = useRouter();
  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    GroupService.getById(groupId).then(setGroup);
  }, [groupId]);

  if (!group) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group.name}</Text>
      <Text>{group.description}</Text>
      <Text style={{ marginTop: 12, fontWeight: "600" }}>Members:</Text>
      <FlatList
        data={group.members}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => <Text>{item.userId} ({item.role})</Text>}
      />
      <Text>Invite code: {group.inviteCode ?? "N/A"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
});
