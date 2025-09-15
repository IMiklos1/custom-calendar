import { Stack } from "expo-router";
import React from "react";

export default function GroupsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "Groups" }} />
        </Stack>
    );
}