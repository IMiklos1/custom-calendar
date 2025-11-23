import { Event } from "@/models/event";
import { EventService } from "@/services/event.service";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function useUserEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        setUserId(user.uid);
        const userEvents = await EventService.getEventsForUser(user.uid);
        setEvents(userEvents);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    events,
    loading,
  };
}
