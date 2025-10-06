import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, DrawerLayoutAndroid, Platform, Alert, Modal } from 'react-native';
import CardLayout from './layouts/CardLayout';
import Settings from './Settings';
import userProfile from '../data/userProfile.json';

export default function Profile() {
  const [profile, setProfile] = useState(userProfile);
  const [editing, setEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const drawerRef = useRef(null);

  const handleSave = () => {
    setEditing(false);
  };

  const renderDrawer = () => <Settings />;

  const handleSettingsPress = () => {
    if (Platform.OS === 'android') {
      if (drawerRef.current) {
        drawerRef.current.openDrawer();
      } else {
        console.warn('drawerRef.current is null');
      }
    } else {
      setShowSettings(true);
    }
  };

  const content = (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={handleSettingsPress}
      >
        <Text style={styles.settingsIcon}>Settings</Text>
      </TouchableOpacity>
      <View style={styles.wrapper}>
        <CardLayout>
          <Image
            source={{ uri: profile.avatar }}
            style={styles.avatar}
          />
          {editing ? (
            <>
              <TextInput
                style={styles.input}
                value={profile.name}
                onChangeText={name => setProfile({ ...profile, name })}
                placeholder="Nom"
              />
              <TextInput
                style={styles.input}
                value={profile.info}
                onChangeText={info => setProfile({ ...profile, info })}
                placeholder="Info"
              />
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Enregistrer</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.info}>{profile.info}</Text>
              <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}>
                <Text style={styles.buttonText}>Modifier</Text>
              </TouchableOpacity>
            </>
          )}
        </CardLayout>
      </View>
    </View>
  );

  if (Platform.OS === 'android') {
    return (
      <DrawerLayoutAndroid
        ref={drawerRef}
        drawerWidth={250}
        drawerPosition="right"
        renderNavigationView={renderDrawer}
      >
        {content}
      </DrawerLayoutAndroid>
    );
  } else {
    return (
      <>
        {content}
        <Modal
          visible={showSettings}
          onRequestClose={() => setShowSettings(false)}
          animationType="slide"
        >
          <Settings onClose={() => setShowSettings(false)} />
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  settingsIcon: {
    fontSize: 24,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  input: {
    width: '90%',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#ff385c',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  drawer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drawerItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  drawerText: {
    fontSize: 18,
  },
});
