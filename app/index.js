import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

import MainLayout from '../components/layouts/MainLayout';
import Table from '../components/Table';
import Profile from '../components/Profile';
import HouseDetails from '../components/HouseDetails';

import housesData from '../data/housesData.json';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedHouse, setSelectedHouse] = useState(null);

  const handleSelectHouse = useCallback((house) => {
    setSelectedHouse(house);
  }, []);

  const handleBackToHome = useCallback(() => {
    setSelectedHouse(null);
  }, []);

  const renderContent = () => {
    if (activeTab === 'home') {
      if (selectedHouse) {
        return (
          <View style={styles.detailsCardWrapper}>
            <HouseDetails house={selectedHouse} onBack={handleBackToHome} />
          </View>
        );
      }
      return (
        <View style={styles.tableContainer}>
          <View style={styles.tableInnerContainer}>
            <Table data={housesData} onSelect={handleSelectHouse} />
          </View>
        </View>
      );
    }
    return <Profile />;
  };

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  detailsCardWrapper: {
    width: '95%',
    position: 'absolute',
    top: '45%',
    left: '2.5%',
    transform: [{ translateY: -180 }],
    zIndex: 10,
    alignSelf: 'center',
    elevation: 10,
  },
  tableContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 80,
  },
  tableInnerContainer: {
    width: '90%',
    flex: 1,
  },
});
