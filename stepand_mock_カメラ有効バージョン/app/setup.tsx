import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Play, Clock, Wand as Wand2 } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

const genres = [
  { id: 'mystery', name: 'ミステリー', color: '#8b5cf6', icon: '🔍' },
  { id: 'fantasy', name: 'ファンタジー', color: '#06d6a0', icon: '🧙‍♂️' },
  { id: 'sf', name: 'SF', color: '#118ab2', icon: '🚀' },
  { id: 'romance', name: 'ロマンス', color: '#f72585', icon: '💝' },
  { id: 'adventure', name: 'アドベンチャー', color: '#ffd60a', icon: '🗺️' },
  { id: 'horror', name: 'ホラー', color: '#ef476f', icon: '👻' },
];

export default function SetupScreen() {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState('mystery');
  const [walkTime, setWalkTime] = useState(20);

  const handleBack = () => {
    router.back();
  };

  const handleStart = () => {
    router.push({
      pathname: '/walk',
      params: { genre: selectedGenre, time: walkTime }
    });
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}分`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}時間${mins}分` : `${hours}時間`;
  };

  return (
    <LinearGradient
      colors={['#1e3a8a', '#3730a3', '#581c87']}
      style={styles.container}
    >
      {/* Header */}
      <Animated.View 
        entering={FadeInUp.delay(200).springify()}
        style={styles.header}
      >
        <Pressable onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2.5} />
        </Pressable>
        <Text style={styles.title}>散歩の設定</Text>
        <View style={styles.headerSpacer} />
      </Animated.View>

      {/* Content */}
      <View style={styles.content}>
        {/* Genre Selection */}
        <Animated.View 
          entering={FadeInLeft.delay(400).springify()}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Wand2 size={24} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.sectionTitle}>ジャンルを選ぶ</Text>
          </View>
          <Text style={styles.sectionSubtitle}>どんな物語を体験したいですか？</Text>
          
          <View style={styles.genreGrid}>
            {genres.map((genre, index) => (
              <Animated.View
                key={genre.id}
                entering={FadeInUp.delay(600 + index * 100).springify()}
              >
                <Pressable
                  style={({ pressed }) => [
                    styles.genreCard,
                    selectedGenre === genre.id && styles.genreCardSelected,
                    pressed && styles.genreCardPressed,
                    { backgroundColor: genre.color + '20' }
                  ]}
                  onPress={() => setSelectedGenre(genre.id)}
                >
                  <LinearGradient
                    colors={
                      selectedGenre === genre.id 
                        ? [genre.color + 'AA', genre.color + '66']
                        : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']
                    }
                    style={styles.genreCardGradient}
                  >
                    <Text style={styles.genreIcon}>{genre.icon}</Text>
                    <Text style={[
                      styles.genreName,
                      selectedGenre === genre.id && styles.genreNameSelected
                    ]}>
                      {genre.name}
                    </Text>
                  </LinearGradient>
                </Pressable>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Time Selection */}
        <Animated.View 
          entering={FadeInRight.delay(800).springify()}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Clock size={24} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.sectionTitle}>歩きたい時間</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            お時間に合わせて物語の長さが調整されます
          </Text>
          
          <View style={styles.timeContainer}>
            <Text style={styles.timeValue}>{formatTime(walkTime)}</Text>
            <Slider
              style={styles.slider}
              value={walkTime}
              onValueChange={setWalkTime}
              minimumValue={5}
              maximumValue={120}
              step={5}
              minimumTrackTintColor="#ff6b9d"
              maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
              thumbStyle={styles.sliderThumb}
            />
            <View style={styles.timeLabels}>
              <Text style={styles.timeLabel}>5分</Text>
              <Text style={styles.timeLabel}>2時間</Text>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Start Button */}
      <Animated.View 
        entering={FadeInUp.delay(1000).springify()}
        style={styles.startContainer}
      >
        <Pressable
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.startButtonPressed
          ]}
          onPress={handleStart}
        >
          <LinearGradient
            colors={['#ff6b9d', '#ffa726']}
            style={styles.startButtonGradient}
          >
            <Play size={28} color="#FFFFFF" strokeWidth={2.5} />
            <Text style={styles.startButtonText}>散歩をはじめる</Text>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'MPlusRounded1c-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 20,
    lineHeight: 20,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  genreCard: {
    width: (width - 72) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  genreCardSelected: {
    borderColor: '#ff6b9d',
  },
  genreCardPressed: {
    transform: [{ scale: 0.95 }],
  },
  genreCardGradient: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  genreIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  genreName: {
    fontSize: 16,
    fontFamily: 'MPlusRounded1c-Bold',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  genreNameSelected: {
    color: '#FFFFFF',
  },
  timeContainer: {
    alignItems: 'center',
  },
  timeValue: {
    fontSize: 36,
    fontFamily: 'MPlusRounded1c-ExtraBold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#FFFFFF',
    width: 24,
    height: 24,
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  timeLabel: {
    fontSize: 14,
    fontFamily: 'MPlusRounded1c-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  startContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
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
  startButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 12,
  },
  startButtonText: {
    fontSize: 20,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
  },
});