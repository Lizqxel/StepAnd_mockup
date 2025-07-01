import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Play, Clock, Star } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/setup');
  };

  const handleHistory = () => {
    router.push('/history');
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      style={styles.container}
    >
      {/* Background Elements */}
      <View style={styles.backgroundShapes}>
        <View style={[styles.shape, styles.shape1]} />
        <View style={[styles.shape, styles.shape2]} />
        <View style={[styles.shape, styles.shape3]} />
      </View>

      {/* Header */}
      <Animated.View 
        entering={FadeInUp.delay(200).springify()}
        style={styles.header}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Step&</Text>
          <View style={styles.logoAccent} />
        </View>
        <Text style={styles.slogan}>あなたの散歩を、物語に</Text>
      </Animated.View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Start Button */}
        <Animated.View 
          entering={FadeInUp.delay(400).springify()}
          style={styles.buttonContainer}
        >
          <Pressable 
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.buttonPressed
            ]}
            onPress={handleStart}
          >
            <LinearGradient
              colors={['#ff6b9d', '#ffa726']}
              style={styles.startButtonGradient}
            >
              <Play size={28} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={styles.startButtonText}>はじめる</Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>

        {/* Secondary Buttons */}
        <Animated.View 
          entering={FadeInUp.delay(600).springify()}
          style={styles.secondaryButtons}
        >
          <Pressable 
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed
            ]}
            onPress={handleHistory}
          >
            <Clock size={24} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.secondaryButtonText}>履歴を見る</Text>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed
            ]}
            onPress={handleSettings}
          >
            <Star size={24} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.secondaryButtonText}>設定</Text>
          </Pressable>
        </Animated.View>
      </View>

      {/* Bottom Decoration */}
      <Animated.View 
        entering={FadeInDown.delay(800).springify()}
        style={styles.bottomDecoration}
      >
        <Text style={styles.decorationText}>新しい冒険があなたを待っています</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  shape: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.1,
  },
  shape1: {
    width: 200,
    height: 200,
    backgroundColor: '#FFFFFF',
    top: 50,
    right: -50,
  },
  shape2: {
    width: 150,
    height: 150,
    backgroundColor: '#FFFFFF',
    bottom: 200,
    left: -30,
  },
  shape3: {
    width: 100,
    height: 100,
    backgroundColor: '#FFFFFF',
    top: 200,
    left: 50,
  },
  header: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 52,
    fontFamily: 'MPlusRounded1c-ExtraBold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  logoAccent: {
    width: 80,
    height: 4,
    backgroundColor: '#ff6b9d',
    borderRadius: 2,
    marginTop: 8,
  },
  slogan: {
    fontSize: 18,
    fontFamily: 'MPlusRounded1c-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 120,
  },
  buttonContainer: {
    marginBottom: 32,
  },
  startButton: {
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 32,
    gap: 12,
  },
  startButtonText: {
    fontSize: 24,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
  },
  secondaryButtons: {
    gap: 16,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
  },
  bottomDecoration: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  decorationText: {
    fontSize: 14,
    fontFamily: 'MPlusRounded1c-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
});