import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CardLayout from '../../../components/layouts/CardLayout';
import housesData from '../../../data/housesData.json';

export default function HouseDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const house = housesData.find(h => h.id.toString() === id);

  if (!house) {
    return (
      <View style={styles.container}>
        <Text>House not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CardLayout style={styles.wrapper}>
        <Image source={{ uri: house.image }} style={styles.image} />
        <Text style={styles.title}>{house.house}</Text>
        <Text style={styles.price}>{house.price}</Text>
        <Text style={styles.location}>{house.location}</Text>
        <Text style={styles.owner}>Propriétaire : {house.owner}</Text>
        <Text style={styles.description}>{house.description}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>
      </CardLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#fff',
    borderRadius: 24,
    margin: 10,
    padding: 10,
  },
  image: {
    width: '95%',
    height: 180,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: '#ff385c',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  owner: {
    fontSize: 15,
    color: '#888',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  backText: {
    fontSize: 16,
    color: '#007bff',
  },
});
