import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Table from '../../../components/Table';
import housesData from '../../../data/housesData.json';

export default function ExplorerScreen() {
  const router = useRouter();

  const handleSelectHouse = (house) => {
    router.push(`./${house.id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <View style={styles.tableInnerContainer}>
          <Table data={housesData} onSelect={handleSelectHouse} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  tableContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  tableInnerContainer: {
    width: '90%',
    flex: 1,
  },
});
