
import { EventService } from "@/services/event.service";
import { Event } from "@/types/zodSchemas";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function EventDetails() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);

  async function fetchEvent() {
    if (!params.eventId) return;
    const fetchedEvent = await EventService.getById(params.eventId as string);
    setEvent(fetchedEvent);
  }

  useEffect(() => {
    fetchEvent();
  }, []);

  if (!event) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Button title="Edit Event" onPress={() => router.push(`/calendar/${event.id}/edit`)} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.date}>{event.date.toDateString()}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
});