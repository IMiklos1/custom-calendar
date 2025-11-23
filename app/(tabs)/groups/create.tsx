// app/(tabs)/calendar/create.tsx
import { useAuth } from "@/hooks/useUserAuth";
import { Group } from "@/models/group";
import { GroupServiceExtended } from "@/services/group.service";
import { UserServiceExtended } from "@/services/user.service";
import { useRouter } from "expo-router";
import firebase from "firebase/compat/app";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function JoinGroup() {
    const user = useAuth().user;
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const groupService: GroupServiceExtended = new GroupServiceExtended();
    const userService: UserServiceExtended = new UserServiceExtended();

    React.useEffect(() => {
    }, []);

    const handleCreate = async () => {
                    const newGroup: Group = {
                        id: "", // or generate id
                        name: name,
                        description,
                        createdBy: user?.uid || "unknown",
                        members: [{ userId: user?.uid || "unknown", role: "admin" }],
                        createdAt: firebase.firestore.FieldValue.serverTimestamp() as any,
                    };
                    const groupId = await groupService.create(newGroup);

                    await userService.updateGroups(user?.uid || "unknown", groupId);
                    router.back();
                

        router.back();
    };

    return (
        <View style={styles.container}>
            <Text>Create Group</Text>
            <TextInput
                style={styles.input}
                placeholder="Group Title"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <Button
                title="Create Group"
                onPress={handleCreate}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 8 },
});
