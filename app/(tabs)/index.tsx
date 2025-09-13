import AddRoundButton from '@/components/buttons/AddRoundButton';
import EventListItem from '@/components/event/EventListItem';
import { auth } from '@/firebaseConfig';
import { Event } from '@/models/event'; // Adjust the import path as necessary
import eventService from '@/services/event.service';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Calendar } from 'react-native-calendars'; // Ensure this is the correct library

export default function HomeScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState('');
  const username = auth.currentUser?.email || 'Guest';
  const [text, setText] = useState(''); // Initialize text state
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;
        const fetchedEvents = await eventService.getAllEvents(userId);
        setEvents(fetchedEvents as Event[]);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: { selected: true, disableTouchEvent: true, selectedColor: 'orange' }
          }}
        />
        <Text style={styles.titleContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{username}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{text}</Text>
          <TextInput
            placeholder="Email"
            value={text}
            autoCapitalize="none"
            style={styles.input}
          />
        </Text>

        {events.map(event => (
        <EventListItem
          key={event.id}
          event={event}
          onPress={function():void{
            router.push({pathname: '/others/edit', params: { eventId: event.id }
            });
          }}
        />
      ))}

      </ScrollView>
      <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
        <AddRoundButton
          onPress={function (): void {
            router.push('/others/add');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerImage: {
    height: 150, // Adjust the height as needed
    width: 150,  // Adjust the width as needed
    resizeMode: 'contain', // Optional: Adjust based on your image requirements
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

