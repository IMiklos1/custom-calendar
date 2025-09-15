import { useAuth } from "@/hooks/useAuth";
import { User } from "@/models/user";
import { UserService } from "@/services/user.service";
import { router } from "expo-router";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignUpScreen() {
    const { signUp } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async () => {
        try {
            const credential = await signUp(email, password, displayName);
            const user = credential.user;

            if (user) {
                // Create Firestore user doc
                const userDoc: User = {
                    id: user.uid,
                    name: displayName,
                    email: user.email ?? "",
                    photoUrl: user.photoURL ?? "",
                    groups: [],
                    createdAt: Timestamp.now(),
                };
                const resp = await UserService.create(userDoc);
                console.log("User document created:", resp);
                router.push("/(auth)/sign-in");  
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
                style={styles.input}
                value={displayName}
                onChangeText={setDisplayName}
                autoCapitalize="words"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Sign Up" onPress={handleSignUp} />

            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 12,
        borderRadius: 8,
    },
    label: {
        marginBottom: 4,
        fontWeight: "600",
    },
    error: {
        color: "red",
        marginTop: 12,
    },
});
