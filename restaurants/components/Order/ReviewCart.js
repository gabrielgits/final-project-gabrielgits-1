import React from 'react';
import { View, Text, Image } from 'react-native'
import { useRoute } from '@react-navigation/native';
import styles from '../../styles/appStyles';

export default function ReviewCart() {
    // const route = useRoute();
    // const { food } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.infoHeader}>
                <View style={styles.info}>
                    <Text style={styles.faculty}>Review Cart:</Text>
                </View>
            </View>
        </View>
    );
}