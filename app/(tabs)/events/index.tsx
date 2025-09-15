import { CalendarEvent } from "@/models/event";
import { EventService } from "@/services/event.service";
import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EventsScreen() {
    const router = useRouter();
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const eventService = new EventService();

    useEffect(() => {
        const groupId = "defaultGroupId"; // you can loop all groups later
        eventService.onEventsSnapshot(groupId, setEvents);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={events}
                keyExtractor={(item) => item.id!}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { 
                        router.push(`/calendar/${item.id}` as RelativePathString);
                        }}>
                        <Text style={styles.event}>{item.title}</Text>
                        <Text>{item.startTime.toDate().toLocaleString()}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    event: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
});