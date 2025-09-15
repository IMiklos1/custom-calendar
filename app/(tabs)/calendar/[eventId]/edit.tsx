// app/(tabs)/calendar/[eventId]/edit.tsx
import { EventService } from "@/services/event.service";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function EditEventScreen() {
    const { eventId } = useLocalSearchParams<{ eventId: string }>();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const eventService: EventService = new EventService();

    useEffect(() => {
        eventService.getEvent("groupId", eventId!).then((event) => setTitle(event!.title));
    }, [eventId]);

    const handleUpdate = async () => {
        await eventService.updateEvent("groupId", eventId!, { title });
        router.back();
    };

    return (
        <View style={styles.container}>
            <Text>Edit Event</Text>
            <TextInput value={title} onChangeText={setTitle} style={styles.input} />
            <Button title="Update" onPress={handleUpdate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 8 },
});
