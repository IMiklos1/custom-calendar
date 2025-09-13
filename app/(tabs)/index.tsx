import AddRoundButton from '@/components/buttons/AddRoundButton';
import EventListItem from '@/components/event/EventListItem';
import { auth } from '@/firebaseConfig';
import { Event } from '@/models/event'; // Adjust the import path as necessary
import eventService from '@/services/event.service';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars'; // Ensure this is the correct library

export default function HomeScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState('');
  const username = auth.currentUser?.email || 'Guest';
  const [text, setText] = useState(''); // Initialize text state
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEvents, setShowEvents] = useState('Today'); // 'Today', 'This Week', 'This Month', or ''

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

  const markedDates: Record<string, any> = {};
  events.forEach(event => {
    console.log('Event date:', event.date);
    if (event.date) {
      const dateObj = new Date(event.date);
      const index = dateObj.toISOString().split("T")[0];
      markedDates[index] = {
        marked: true,
        dotColor: "blue",
      };
    }
  });
  if (selected) {
    markedDates[selected] = {
      ...(markedDates[selected] || {}),
      selected: true,
      selectedColor: 'blue',
      disableTouchEvent: true,
    };
  }

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
          markedDates={markedDates}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
          {['Today', 'This Week', 'This Month'].map((tab, idx) => (
            <Text
              key={tab}
              style={{
                marginHorizontal: 12,
                paddingVertical: 6,
                paddingHorizontal: 14,
                borderRadius: 16,
                backgroundColor: showEvents === tab ? '#2196F3' : '#eee',
                color: showEvents === tab ? '#fff' : '#333',
                fontWeight: showEvents === tab ? 'bold' : 'normal',
                overflow: 'hidden',
              }}
              onPress={() => setShowEvents(tab)}
            >
              {tab}
            </Text>
          ))}
        </View>
        {(() => {
          // Helper functions
          const today = new Date();
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

          // Remove duplicates by event id
          const uniqueEvents = (arr: Event[]) => {
            const seen = new Set();
            return arr.filter(e => {
              if (seen.has(e.id)) return false;
              seen.add(e.id);
              return true;
            });
          };

          // Filtered events
          let filtered: Event[] = [];
          if (showEvents === 'Today') {
            filtered = events.filter(e => {
              if (!e.date) return false;
              const d = new Date(e.date);
              return (
                d.getFullYear() === today.getFullYear() &&
                d.getMonth() === today.getMonth() &&
                d.getDate() === today.getDate()
              );
            });
          } else if (showEvents === 'This Week') {
            filtered = events.filter(e => {
              if (!e.date) return false;
              const d = new Date(e.date);
              return d >= startOfWeek && d <= endOfWeek;
            });
          } else if (showEvents === 'This Month') {
            filtered = events.filter(e => {
              if (!e.date) return false;
              const d = new Date(e.date);
              return d >= startOfMonth && d <= endOfMonth;
            });
          }

          filtered = uniqueEvents(filtered).sort((a, b) => {
            if (!a.date || !b.date) return 0;
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          });

          return (
            <View>
              {filtered.length === 0 && showEvents && (
                <Text style={{ textAlign: 'center', color: '#888', marginVertical: 8 }}>
                  No events found.
                </Text>
              )}
              {filtered.map(event => (
                <EventListItem
                  key={event.id}
                  event={event}
                  onPress={() => {
                    router.push({ pathname: '/others/edit', params: { eventId: event.id } });
                  }}
                />
              ))}
            </View>
          );
        })()}
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

