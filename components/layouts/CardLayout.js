import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function CardLayout({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: '95%',
    alignSelf: 'center',
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
