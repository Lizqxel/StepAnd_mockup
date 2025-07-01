import { Tabs } from 'expo-router';
import { Chrome as Home, History, Settings } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          height: 80,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['rgba(139, 69, 255, 0.95)', 'rgba(255, 105, 180, 0.95)']}
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        tabBarLabelStyle: {
          fontFamily: 'MPlusRounded1c-Bold',
          fontSize: 12,
          marginBottom: 8,
        },
        tabBarIconStyle: {
          marginTop: 8,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'ホーム',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: '履歴',
          tabBarIcon: ({ size, color }) => (
            <History size={size} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '設定',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} strokeWidth={2.5} />
          ),
        }}
      />
    </Tabs>
  );
}