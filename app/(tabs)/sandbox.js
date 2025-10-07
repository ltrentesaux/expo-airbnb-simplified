import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function SandboxRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('(sandbox)');
  }, []);

  return <View />;
}
