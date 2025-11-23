// app/(tabs)/calendar/create.tsx
import { useAuth } from "@/hooks/useUserAuth";
import { Group } from "@/models/group";
import { GroupServiceExtended } from "@/services/group.service";
import { UserServiceExtended } from "@/services/user.service";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function JoinGroup() {
    const user = useAuth().user;
    const router = useRouter();
    const [title, setTitle] = useState("");
    const groupService: GroupServiceExtended = new GroupServiceExtended();
    const userService: UserServiceExtended = new UserServiceExtended();
    const [groups, setGroups] = useState<Group[]>([]);

    React.useEffect(() => {
        groupService.getAll().then(setGroups).catch(console.error);
    }, []);

    const handleJoin = async (groupId: string) => {
        groupService.addMember(groupId, user?.uid || "unknown", "member");
        userService.updateGroups(user?.uid || "unknown", "groupId-should set it later");

        router.back();
    };

    return (
        <View style={styles.container}>
            <Text>Join Group</Text>
            <Text>Select a group to join:</Text>
            <TextInput
                style={styles.input}
                placeholder="Search groups..."
                value={title}
                onChangeText={setTitle}
            />
            {groups
                .filter(group => group.name.toLowerCase().includes(title.toLowerCase()))
                .map(group => (
                    <View key={group.id} style={{ paddingVertical: 8 }}>
                        <Text>{group.name}</Text>
                        <Button
                            title="Join"
                            onPress={() => handleJoin(group.id)}
                        />
                    </View>
                ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 8 },
});
