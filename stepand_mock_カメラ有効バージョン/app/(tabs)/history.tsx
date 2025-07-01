import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Clock, Trophy, Calendar, ArrowRight } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const historyData = [
  {
    id: 1,
    title: '謎の商店街',
    genre: 'ミステリー',
    date: '2024-01-15',
    duration: '25分',
    distance: '1.2km',
    missions: 8,
    completion: 100,
    rating: 5,
  },
  {
    id: 2,
    title: '魔法の森の散策',
    genre: 'ファンタジー',
    date: '2024-01-12',
    duration: '18分',
    distance: '0.9km',
    missions: 6,
    completion: 85,
    rating: 4,
  },
  {
    id: 3,
    title: '未来都市の探検',
    genre: 'SF',
    date: '2024-01-10',
    duration: '32分',
    distance: '1.8km',
    missions: 10,
    completion: 90,
    rating: 5,
  },
];

export default function HistoryScreen() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Trophy 
        key={i} 
        size={16} 
        color={i < rating ? '#ffd700' : 'rgba(255, 255, 255, 0.3)'} 
        strokeWidth={2}
      />
    ));
  };

  return (
    <LinearGradient
      colors={['#4c1d95', '#7c3aed', '#a855f7']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>散歩履歴</Text>
        <Text style={styles.subtitle}>あなたの冒険の記録</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {historyData.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeInUp.delay(200 + index * 100).springify()}
          >
            <Pressable 
              style={({ pressed }) => [
                styles.historyCard,
                pressed && styles.cardPressed
              ]}
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
                style={styles.cardGradient}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardGenre}>{item.genre}</Text>
                  </View>
                  <View style={styles.starsContainer}>
                    {renderStars(item.rating)}
                  </View>
                </View>

                <View style={styles.cardStats}>
                  <View style={styles.statItem}>
                    <Calendar size={16} color="#FFFFFF" strokeWidth={2} />
                    <Text style={styles.statText}>{item.date}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Clock size={16} color="#FFFFFF" strokeWidth={2} />
                    <Text style={styles.statText}>{item.duration}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <MapPin size={16} color="#FFFFFF" strokeWidth={2} />
                    <Text style={styles.statText}>{item.distance}</Text>
                  </View>
                </View>

                <View style={styles.cardBottom}>
                  <View style={styles.missionInfo}>
                    <Text style={styles.missionText}>
                      ミッション: {item.missions}個完了
                    </Text>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { width: `${item.completion}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.completionText}>{item.completion}%</Text>
                  </View>
                  <ArrowRight size={20} color="rgba(255, 255, 255, 0.6)" strokeWidth={2} />
                </View>
              </LinearGradient>
            </Pressable>
          </Animated.View>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'MPlusRounded1c-ExtraBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'MPlusRounded1c-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  historyCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardGenre: {
    fontSize: 14,
    fontFamily: 'MPlusRounded1c-Regular',
    color: '#ff6b9d',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    fontFamily: 'MPlusRounded1c-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  missionInfo: {
    flex: 1,
  },
  missionText: {
    fontSize: 14,
    fontFamily: 'MPlusRounded1c-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ff88',
    borderRadius: 3,
  },
  completionText: {
    fontSize: 12,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#00ff88',
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  bottomSpacer: {
    height: 100,
  },
});