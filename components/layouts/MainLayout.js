import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNavBar from '../BottomNavBar';

export default function MainLayout({ children, activeTab, setActiveTab }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Airbnb_Logo_Bélo.svg.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Le contenu principal (Table, HouseDetails, Profile) */}
      <View style={styles.content}>{children}</View>

      <View style={[styles.bottomNavWrapper, { paddingBottom: insets.bottom }]}>
        <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: '100%',
    height: 100,
    marginTop: 20,
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
