import HomeButton from '@/components/buttons/HomeButton';
import { Event } from '@/models/event';
import { User } from '@/models/user'; // Adjust path if needed
import eventService from '@/services/event.service';
import userService from '@/services/user.service';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import uuid from 'react-native-uuid';

const AddEventPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);

    const router = useRouter();

  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Authentication Error', 'You must be logged in to add events.');
      return;
    }

    try {
      const createdBy: User | null = await userService.getUser(user.uid); // Assuming you have a method to get user details
      if (!createdBy) {
        Alert.alert('Error', 'User details could not be retrieved.');
        return;
      }

      const newEvent: Event = {
        id: uuid.v4() as string, // Ensure you have uuid imported
        title,
        date: new Date(date),
        description,
        createdBy,
        isCompleted,
        modifications: [], // You can extend this later
        isPublic,
        participants: [], // Extend in future if needed
        isShared,
        isCancelled,
        isFavorite,
        isPinned,
        isHidden,
        isBlocked,
        isReported,
        isFlagged,
      };

      console.log('New Event:', newEvent);

      await eventService.addEvent(user.uid, newEvent);

      Alert.alert('Success', 'Event added successfully!');

      router.replace('/(tabs)'); // Redirect to the main screen

      setTitle('');
      setDate('');
      setDescription('');
      setIsCompleted(false);
      setIsPublic(false);
      setIsShared(false);
      setIsCancelled(false);
      setIsFavorite(false);
      setIsPinned(false);
      setIsHidden(false);
      setIsBlocked(false);
      setIsReported(false);
      setIsFlagged(false);

    } catch (error) {
      console.error('Error adding event:', error);
      Alert.alert('Error', 'Could not add event.');
    }
  };

  const renderSwitch = (label: string, value: boolean, onChange: (val: boolean) => void) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
      <Text>{label}</Text>
      <Switch value={value} onValueChange={onChange} />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 20 }}>
        <HomeButton />
      </View>

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Add New Event</Text>

      <Text>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter event title"
      />

      <Text>Date (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="e.g. 2025-06-15"
      />

      <Text>Description:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      {renderSwitch('Completed', isCompleted, setIsCompleted)}
      {renderSwitch('Public', isPublic, setIsPublic)}
      {renderSwitch('Shared', isShared, setIsShared)}
      {renderSwitch('Cancelled', isCancelled, setIsCancelled)}
      {renderSwitch('Favorite', isFavorite, setIsFavorite)}
      {renderSwitch('Pinned', isPinned, setIsPinned)}
      {renderSwitch('Hidden', isHidden, setIsHidden)}
      {renderSwitch('Blocked', isBlocked, setIsBlocked)}
      {renderSwitch('Reported', isReported, setIsReported)}
      {renderSwitch('Flagged', isFlagged, setIsFlagged)}

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }} >Add Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center' as const,
    marginTop: 20,
  },
};

export default AddEventPage;
