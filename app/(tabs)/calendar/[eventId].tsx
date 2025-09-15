import { CalendarEvent } from "@/models/event";
import { EventService } from "@/services/event.service";
import { RelativePathString, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function EventDetails() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const router = useRouter();
  const [event, setEvent] = useState<CalendarEvent | null>(null);
  const eventService: EventService = new EventService();

  useEffect(() => {
    const groupId = "defaultGroupId"; // replace with actual selected group
    eventService.getEvent(groupId, eventId).then(setEvent);
  }, [eventId]);

  if (!event) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text>{event.description}</Text>
      <Text>Location: {event.location}</Text>
      <Text>
        {event.startTime.toDate().toLocaleString()} - {event.endTime.toDate().toLocaleString()}
      </Text>
      <Text>Participants: {event.participants.join(", ")}</Text>
      <Button title="Edit" onPress={() => router.push(`/calendar/${event.id}/edit` as RelativePathString)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
});
