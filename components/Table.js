import React from 'react';
import { FlatList, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Table({ data, onSelect }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onSelect(item)}>
          <View style={styles.card}>
            <View style={styles.row}>
              <Image
                source={{ uri: item.image || `https://picsum.photos/seed/${item.house}/48/48` }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.textContainer}>
                <Text>
                  <Text style={styles.house}>{item.house}</Text>
                  {" - "}
                  <Text style={styles.location}>{item.location}</Text>
                </Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    width: '100%',
    marginBottom: 12,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  textContainer: {
    flex: 1,
  },
  house: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 15,
    color: '#666',
    marginTop: 6,
  },
  location: {
    fontSize: 14,
    color: '#888',
  },
});
