// src/hooks/useUserAuth.ts
import { auth } from "@/firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

export function useUserAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsub;
  }, []);

  return { user, loading };
}
