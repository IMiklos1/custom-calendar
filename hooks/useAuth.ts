import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import { auth } from "../firebase"; // your firebase.ts

export function useAuth() {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        // Cleanup on unmount
        return unsubscribe;
    }, []);

    // Helper: sign in with email + password
    const signIn = async (email: string, password: string) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    // Helper: sign up new account
    const signUp = async (email: string, password: string, displayName?: string) => {
        const credential = await auth.createUserWithEmailAndPassword(email, password);

        if (displayName && credential.user) {
            await credential.user.updateProfile({ displayName });
        }

        return credential;
    };

    // Helper: sign out
    const signOut = async () => {
        return auth.signOut();
    };

    return { user, loading, signIn, signUp, signOut };
}
