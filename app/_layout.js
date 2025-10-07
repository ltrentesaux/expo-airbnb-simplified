import { Slot } from 'expo-router';
import { View, Image, StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Airbnb_Logo_Bélo.svg.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Slot />
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
});
