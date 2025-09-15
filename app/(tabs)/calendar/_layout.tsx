import { Stack } from "expo-router";
import React from "react";

export default function CalendarLayout() {

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "Calendar" }} />
            <Stack.Screen name="create" options={{ title: "Create Event" }} />
            <Stack.Screen name="[eventId]" options={{ title: "Event Details" }} />
        </Stack>
    );
}