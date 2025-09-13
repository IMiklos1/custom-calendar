import HomeButton from '@/components/buttons/HomeButton';
import { Event } from '@/models/event';
import { User } from '@/models/user'; // Adjust path if needed
import eventService from '@/services/event.service';
import userService from '@/services/user.service';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import uuid from 'react-native-uuid';

const EditEventPage: React.FC = () => {

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
    const eventId = useLocalSearchParams().eventId;
    const [event, setEvent] = useState<Event>();

    useEffect(() => {
        const fetchEvent = async () => {
            if (eventId && typeof eventId === 'string') {
                const auth = getAuth();
                const user = auth.currentUser;
                if (!user) {
                    Alert.alert('Authentication Error', 'You must be logged in to edit events.');
                    return;
                }
                try {
                    const fetchedEvent = await eventService.getEvent(user.uid, eventId);
                    if (fetchedEvent) {
                        setEvent(fetchedEvent);
                        setTitle(fetchedEvent.title);
                        setDate(fetchedEvent.date.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
                        setDescription(fetchedEvent.description);
                        setIsCompleted(fetchedEvent.isCompleted);
                        setIsPublic(fetchedEvent.isPublic);
                        setIsShared(fetchedEvent.isShared);
                        setIsCancelled(fetchedEvent.isCancelled);
                        setIsFavorite(fetchedEvent.isFavorite);
                        setIsPinned(fetchedEvent.isPinned);
                        setIsHidden(fetchedEvent.isHidden);
                        setIsBlocked(fetchedEvent.isBlocked);
                        setIsReported(fetchedEvent.isReported);
                        setIsFlagged(fetchedEvent.isFlagged);
                    } else {
                        Alert.alert('Error', 'Event not found.');
                    }
                } catch (error) {
                    console.error('Error fetching event:', error);
                    Alert.alert('Error', 'Could not fetch event details.');
                }
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleSubmit = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            Alert.alert('Authentication Error', 'You must be logged in to edit events.');
            return;
        }

        try {
            const editedBy: User | null = await userService.getUser(user.uid); // Assuming you have a method to get user details
            if (!editedBy) {
                Alert.alert('Error', 'User details could not be retrieved.');
                return;
            }

            setEvent((prevEvent) => {
                if (!prevEvent) {
                    Alert.alert('Error', 'Event not loaded yet.');
                    return prevEvent;
                }
                return {
                    ...prevEvent,
                    title: title,
                    date: new Date(date),
                    description: description,
                    isCompleted: isCompleted,
                    isPublic: isPublic,
                    isShared: isShared,
                    isCancelled: isCancelled,
                    isFavorite: isFavorite,
                    isPinned: isPinned,
                    isHidden: isHidden,
                    isBlocked: isBlocked,
                    isReported: isReported,
                    isFlagged: isFlagged,
                };
                
            }
                // event = {
                    //     // id: uuid.v4() as string, // Ensure you have uuid imported
                    //     title: title,
                    //     description: description,
                    //     isCompleted: isCompleted,
                    //     isPublic: isPublic,
                    //     participants: participants: [], // Extend in future if needed
                    //     isShared: isShared,
                    //     isCancelled: isCancelled,
                    //     isFavorite: isFavorite,
                    //     isPinned: isPinned,
                    //     isHidden: isHidden,
                    //     isBlocked: isBlocked,
                    //     isReported: isReported,
                    //     isFlagged: isFlagged,
            // };

            // event.modifications.push({
                //     id: uuid.v4() as string,
                //     eventId: event.id,
                //     title: title,
                //     date: new Date(),
                //     description: description
                // });
                
                console.log('Edited Event:', event);
                
                await eventService.updateEvent(user.uid, event.id, event);
                
                Alert.alert('Success', 'Event edited successfully!');
                
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
            console.error('Error editing event:', error);
            Alert.alert('Error', 'Could not edited event.');
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

export default EditEventPage;
