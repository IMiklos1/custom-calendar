import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CalendarEvent } from '../../models/event'; // Adjust the import path as necessary

interface Props {
    event: CalendarEvent;
    onPress?: () => void;
}

const EventListItem: React.FC<Props> = ({ event, onPress }) => {
    const {
        title,
        date,
        createdBy,
        isCompleted,
        isFavorite,
        isPinned,
        isCancelled,
    } = event;

    console.log(date);
    
    return (
        <TouchableOpacity onPress={onPress} disabled={!onPress} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {isFavorite && <Ionicons name="heart" size={18} color="red" />}
                {isPinned && <Ionicons name="pin" size={18} color="orange" />}
                {isCancelled && <Ionicons name="close-circle" size={18} color="gray" />}
            </View>

            {/* <Text style={styles.date}>{format(date, "MMMM do, yyyy H:mma")}</Text> */}
            <Text style={styles.creator}>Created by: {createdBy?.name ?? 'Unknown'}</Text>

            <Text style={styles.status}>
                Status: {isCancelled ? 'Cancelled' : isCompleted ? 'Completed' : 'Upcoming'}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginBottom: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    date: {
        color: '#555',
        marginBottom: 4,
    },
    creator: {
        fontStyle: 'italic',
        color: '#444',
        marginBottom: 4,
    },
    status: {
        fontWeight: '500',
    },
});

export default EventListItem;
