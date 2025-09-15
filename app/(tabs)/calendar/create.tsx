// app/(tabs)/calendar/create.tsx
import { useAuth } from "@/hooks/useAuth";
import { CalendarEvent } from "@/models/event";
import { EventService } from "@/services/event.service";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function CreateEventScreen() {
  const user = useAuth().user;
  const router = useRouter();
  const [title, setTitle] = useState("");
    const eventService: EventService = new EventService();

  const handleCreate = async () => {
    const newEvent: CalendarEvent = {
      title,
      startTime: new Date() as any, // replace with Date -> Firestore Timestamp conversion
      endTime: new Date() as any,
      createdBy: user?.uid || "unknown",
      participants: [],
      createdAt: new Date() as any,
    };
    //TODO: replace "asd" with actual groupId
    const resp = await eventService.createEvent("groupId-should set it later", newEvent);
    console.log("Created event with ID:", resp);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text>Create Event</Text>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <Button title="Create" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 8 },
});
