import { db } from "@/firebaseConfig";
import { User } from "@/models/user";
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

class UserService {
    private usersCollection = collection(db, 'users');

    // Register a new user
    async registerUser(userId: string, userData: Record<string, any>): Promise<void> {
        try {
            const userDocRef = doc(this.usersCollection, userId); // Set doc ID to userId
            await setDoc(userDocRef, userData); // Create or overwrite document with this ID
            console.log('User registered successfully with custom ID');
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }

    // Modify user data
    async updateUser(userId: string, updatedData: Record<string, any>): Promise<void> {
        try {
            const userDocRef = doc(this.usersCollection, userId);
            await updateDoc(userDocRef, updatedData);
            console.log('User data updated successfully');
        } catch (error) {
            console.error('Error updating user data:', error);
            throw error;
        }
    }

    // Get user data
    async getUser(userId: string): Promise<User | null> {
        try {
            const userDocRef = doc(this.usersCollection, userId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                return userDoc.data() as User;
            } else {
                console.log('User not found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }
}

export default new UserService();