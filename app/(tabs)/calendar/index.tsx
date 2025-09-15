import { useAuth } from "@/hooks/useAuth";
import { CalendarEvent } from "@/models/event";
import { EventService } from "@/services/event.service";
import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CalendarScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const eventService = new EventService();

  useEffect(() => {
    if (!user) return;
    // Example: load events for a default group, replace with selected group later
    const groupId = "defaultGroupId";
    eventService.onEventsSnapshot(groupId, setEvents);
  }, [user]);

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/(tabs)/calendar/${item.id}` as RelativePathString)}>
            <Text style={styles.event}>{item.title}</Text>
            <Text>{item.startTime.toDate().toLocaleString()}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Add Event" onPress={() => router.push("/(tabs)/calendar/create" as RelativePathString)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  event: { fontSize: 16, fontWeight: "600" },
});
