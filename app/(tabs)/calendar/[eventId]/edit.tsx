// app/(tabs)/calendar/[eventId]/edit.tsx
import { EventService } from "@/services/event.service";
import { Event } from "@/types/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { z } from "zod";

const formSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().refine((d) => d instanceof Date, { message: "Invalid date" }),
    location: z.string().optional(),

    createdAt: z.date(),
    updatedAt: z.date(),
});

export default function EditEventScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const [event, setEvent] = useState<Event | null>(null);

    const [showPicker, setShowPicker] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            location: "",
            date: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        async function fetchEvent() {
            if (!params.eventId) return;
            const fetchedEvent = await EventService.getById(params.eventId as string);
            setEvent(fetchedEvent);
            if (!fetchedEvent) return;
            reset({
                title: fetchedEvent.title,
                description: fetchedEvent.description || "",
                location: fetchedEvent.location || "",
                date: new Date(fetchedEvent.date),
                createdAt: fetchedEvent.createdAt,
                updatedAt: new Date(),
            });
        }

        fetchEvent();
    }, [params.eventId, reset]);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        if (!event) return;
        const updatedEvent: Event = {
            ...event,
            title: data.title,
            description: data.description,
            location: data.location,
            date: data.date,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
        await EventService.update(event.id, updatedEvent);
        router.back();
    };

    return (
        <View style={styles.container}>
            <Text>Edit Event: {event?.title}</Text>

            <Text>Title</Text>
            <Controller
                control={control}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{ borderWidth: 1, padding: 8, borderRadius: 6 }}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Enter the event title"
                    />
                )}
            />
            {errors.title && <Text style={{ color: "red" }}>{errors.title.message}</Text>}

            <Text>Description</Text>
            <Controller
                control={control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{ borderWidth: 1, padding: 8, borderRadius: 6 }}
                        multiline
                        numberOfLines={3}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Enter the event description"
                    />
                )}
            />

            <Text>Location</Text>
            <Controller
                control={control}
                name="location"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{ borderWidth: 1, padding: 8, borderRadius: 6 }}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Enter the event location"
                    />
                )}
            />

            <Text>Date and time</Text>
            <Controller
                control={control}
                name="date"
                render={({ field: { onChange, value } }) => (
                    <>
                        <Button title={value.toLocaleString()} onPress={() => setShowPicker(true)} />
                        {showPicker && (
                            <DateTimePicker
                                value={value}
                                mode="datetime"
                                display="default"
                                onChange={(e, d) => {
                                    setShowPicker(false);
                                    if (d) onChange(d);
                                }}
                            />
                        )}
                    </>
                )}
            />
            <Button
                title="Save Changes"
                onPress={handleSubmit(onSubmit)}
            />
            <Button title="Cancel" onPress={() => router.back()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 8 },
});
