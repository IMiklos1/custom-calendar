import { useUserAuth } from "@/hooks/useUserAuth";
import { EventService } from "@/services/event.service";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native";
import { z } from "zod";

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.date().refine((d) => d instanceof Date, { message: "Invalid date" }),
  location: z.string().optional(),
});

export default function CreateEvent() {
  const { user } = useUserAuth();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      date: new Date(),
    },
    resolver: zodResolver(formSchema),
  });

  const date = watch("date");
  const [showPicker, setShowPicker] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!user) return;

    console.log("Creating event with data:", data);

    await EventService.create({
      id: "",                        // will be replaced inside service
      title: data.title,
      description: data.description,
      location: data.location,
      date: data.date,

      creatorId: user.uid,
      // groupId: undefined,
      isGroupEvent: false,

      participants: [],
      invitedUserIds: [],
      notifications: [],

      createdAt: new Date(),
      updatedAt: new Date(),
    });

    router.push("/(tabs)/calendar");
  };

  return (
    <View style={{ padding: 20, gap: 14 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Create Event</Text>

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

      <Button title="Create Event" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
