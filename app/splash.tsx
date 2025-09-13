import { auth } from '@/firebaseConfig';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

function useSession() {
  return {
    session: auth.currentUser,
    isLoading: auth.currentUser === null,
  };
}

export default function Splash() {
  const { session, isLoading } = useSession();
    const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (session) {
        // Redirect to the main app if authenticated
        // <Redirect href="/(tabs)/index" />;
        router.replace('/(tabs)');

      } else {
        // Redirect to login if not authenticated
        // <Redirect href="/(auth)/index" />;
        router.replace('/(auth)');
      }
    }
  }, [isLoading, session]);

  return null; // Optionally, render a loading indicator
}
