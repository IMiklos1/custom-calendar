import { useUserAuth } from "@/hooks/useUserAuth";
import { EventService } from "@/services/event.service";
import { Event } from "@/types/zodSchemas";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarHome() {
  const { user } = useUserAuth();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadEvents() {
      setLoading(true);
      const userEvents = await EventService.getAllForUser(user!.uid);
      setEvents(userEvents);
      setLoading(false);
    }

    loadEvents();
  }, [user]);

  if (loading) return <Text style={{ padding: 20 }}>Loading events...</Text>;
  if (!user) return <Text style={{ padding: 20 }}>Please log in</Text>;

  // --- Prepare marked dates ---
  const markedDates = events.reduce((acc, ev) => {
    const dateKey = ev.date.toISOString().split("T")[0]; // YYYY-MM-DD
    acc[dateKey] = { marked: true };
    return acc;
  }, {} as Record<string, any>);

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...(markedDates[selectedDate] || {}),
      selected: true,
      selectedColor: "#3478f6",
    };
  }

  const selectedDayEvents = events.filter(ev => {
    if (!selectedDate) return false;
    return ev.date.toISOString().startsWith(selectedDate);
  });

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Calendar
        markedDates={markedDates}
        onDayPress={day => setSelectedDate(day.dateString)}
      />

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {selectedDate ? `Events on ${selectedDate}` : "Select a date"}
        </Text>

        <FlatList
          data={selectedDayEvents}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/calendar/${item.id}`)}
              style={{
                padding: 15,
                marginVertical: 5,
                backgroundColor: "#eee",
                borderRadius: 8,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
              {item.location && <Text>{item.location}</Text>}
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        onPress={() => router.push("/calendar/create")}
        style={{
          backgroundColor: "#3478f6",
          padding: 14,
          borderRadius: 10,
          position: "absolute",
          bottom: 30,
          right: 20,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>+ Add Event</Text>
      </TouchableOpacity>
    </View>
  );
}
