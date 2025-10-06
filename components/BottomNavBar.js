import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const tabs = [
  { key: 'home', icon: require('../assets/images/home.png') },
  { key: 'user', icon: require('../assets/images/user.png') },
];

export default function BottomNavBar({ activeTab, setActiveTab }) {
  return (
    <View style={styles.navBar}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          onPress={() => setActiveTab(tab.key)}
          style={styles.tab}
          activeOpacity={0.7}
        >
          <Image
            source={tab.icon}
            style={[
              styles.icon,
              activeTab === tab.key && styles.activeIcon,
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: '#0022ff',
    opacity: 0.5,
  },
  activeIcon: {
    opacity: 1,
    tintColor: '#ff385c',
  },
});