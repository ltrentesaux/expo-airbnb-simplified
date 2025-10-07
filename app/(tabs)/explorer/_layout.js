import { Stack } from 'expo-router';

export default function ExplorerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
