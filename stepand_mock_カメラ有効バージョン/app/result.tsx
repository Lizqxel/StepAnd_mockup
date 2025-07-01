import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  Share, 
  Dimensions,
  ScrollView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Chrome as Home, RotateCcw, Share2, Trophy, MapPin, Clock, Target, Star, Sparkles } from 'lucide-react-native';
import Animated, { 
  FadeInUp, 
  FadeInDown, 
  FadeInLeft, 
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  useAnimatedProps
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const { genre, time, distance, missions, completion } = params;

  const getRank = (completion: number) => {
    if (completion >= 95) return { rank: 'S', color: '#ffd700', icon: '👑' };
    if (completion >= 85) return { rank: 'A', color: '#ff6b9d', icon: '🏆' };
    if (completion >= 75) return { rank: 'B', color: '#00d4ff', icon: '🥈' };
    if (completion >= 65) return { rank: 'C', color: '#00ff88', icon: '🥉' };
    return { rank: 'D', color: '#999', icon: '📝' };
  };

  const rankInfo = getRank(Number(completion));

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Step&で${genre}の散歩を完了しました！\n距離: ${distance}km\n時間: ${Math.floor(Number(time) / 60)}分${Number(time) % 60}秒\n達成度: ${completion}%\nランク: ${rankInfo.rank}\n\n#StepAnd #AR散歩 #${genre}`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const handleRestart = () => {
    router.push('/setup');
  };

  const handleHome = () => {
    router.push('/(tabs)');
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}分${seconds}秒`;
  };

  return (
    <LinearGradient
      colors={['#0f0c29', '#24243e', '#302b63']}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View 
          entering={FadeInUp.delay(200).springify()}
          style={styles.header}
        >
          <View style={styles.sparkleContainer}>
            <Sparkles size={32} color="#ffd700" strokeWidth={2} />
          </View>
          <Text style={styles.title}>散歩完了！</Text>
          <Text style={styles.subtitle}>お疲れさまでした</Text>
        </Animated.View>

        {/* Rank Display */}
        <Animated.View 
          entering={FadeInDown.delay(400).springify()}
          style={styles.rankContainer}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
            style={styles.rankCard}
          >
            <Text style={styles.rankIcon}>{rankInfo.icon}</Text>
            <Text style={[styles.rankText, { color: rankInfo.color }]}>
              ランク {rankInfo.rank}
            </Text>
            <Text style={styles.completionText}>{completion}% 達成</Text>
          </LinearGradient>
        </Animated.View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <Animated.View 
            entering={FadeInLeft.delay(600).springify()}
            style={styles.statCard}
          >
            <LinearGradient
              colors={['rgba(255, 107, 157, 0.2)', 'rgba(255, 107, 157, 0.1)']}
              style={styles.statCardGradient}
            >
              <Clock size={32} color="#ff6b9d" strokeWidth={2} />
              <Text style={styles.statValue}>{formatTime(Number(time))}</Text>
              <Text style={styles.statLabel}>歩行時間</Text>
            </LinearGradient>
          </Animated.View>

          <Animated.View 
            entering={FadeInRight.delay(700).springify()}
            style={styles.statCard}
          >
            <LinearGradient
              colors={['rgba(0, 212, 255, 0.2)', 'rgba(0, 212, 255, 0.1)']}
              style={styles.statCardGradient}
            >
              <MapPin size={32} color="#00d4ff" strokeWidth={2} />
              <Text style={styles.statValue}>{distance}km</Text>
              <Text style={styles.statLabel}>歩行距離</Text>
            </LinearGradient>
          </Animated.View>

          <Animated.View 
            entering={FadeInLeft.delay(800).springify()}
            style={styles.statCard}
          >
            <LinearGradient
              colors={['rgba(0, 255, 136, 0.2)', 'rgba(0, 255, 136, 0.1)']}
              style={styles.statCardGradient}
            >
              <Target size={32} color="#00ff88" strokeWidth={2} />
              <Text style={styles.statValue}>{missions}</Text>
              <Text style={styles.statLabel}>ミッション</Text>
            </LinearGradient>
          </Animated.View>

          <Animated.View 
            entering={FadeInRight.delay(900).springify()}
            style={styles.statCard}
          >
            <LinearGradient
              colors={['rgba(255, 215, 0, 0.2)', 'rgba(255, 215, 0, 0.1)']}
              style={styles.statCardGradient}
            >
              <Trophy size={32} color="#ffd700" strokeWidth={2} />
              <Text style={styles.statValue}>{genre}</Text>
              <Text style={styles.statLabel}>ジャンル</Text>
            </LinearGradient>
          </Animated.View>
        </View>

        {/* Achievement Message */}
        <Animated.View 
          entering={FadeInUp.delay(1000).springify()}
          style={styles.achievementContainer}
        >
          <LinearGradient
            colors={['rgba(139, 69, 255, 0.2)', 'rgba(139, 69, 255, 0.1)']}
            style={styles.achievementCard}
          >
            <Star size={24} color="#8b45ff" strokeWidth={2} />
            <Text style={styles.achievementTitle}>素晴らしい冒険でした！</Text>
            <Text style={styles.achievementText}>
              あなたは{genre}の世界を歩き、数々のミッションを達成しました。
              この体験があなたの日常に新しい発見をもたらしたことでしょう。
            </Text>
          </LinearGradient>
        </Animated.View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Animated.View 
            entering={FadeInLeft.delay(1200).springify()}
            style={styles.buttonRow}
          >
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                styles.shareButton,
                pressed && styles.buttonPressed
              ]}
              onPress={handleShare}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.buttonGradient}
              >
                <Share2 size={24} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.buttonText}>シェア</Text>
              </LinearGradient>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                styles.restartButton,
                pressed && styles.buttonPressed
              ]}
              onPress={handleRestart}
            >
              <LinearGradient
                colors={['#ff6b9d', '#ffa726']}
                style={styles.buttonGradient}
              >
                <RotateCcw size={24} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.buttonText}>もう一度</Text>
              </LinearGradient>
            </Pressable>
          </Animated.View>

          <Animated.View 
            entering={FadeInUp.delay(1400).springify()}
            style={styles.homeButtonContainer}
          >
            <Pressable
              style={({ pressed }) => [
                styles.homeButton,
                pressed && styles.buttonPressed
              ]}
              onPress={handleHome}
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                style={styles.homeButtonGradient}
              >
                <Home size={24} color="#333" strokeWidth={2} />
                <Text style={styles.homeButtonText}>ホームに戻る</Text>
              </LinearGradient>
            </Pressable>
          </Animated.View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    marginBottom: 40,
  },
  sparkleContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: 'MPlusRounded1c-ExtraBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'MPlusRounded1c-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  rankContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  rankCard: {
    paddingVertical: 32,
    paddingHorizontal: 48,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  rankIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  rankText: {
    fontSize: 32,
    fontFamily: 'MPlusRounded1c-ExtraBold',
    marginBottom: 8,
  },
  completionText: {
    fontSize: 18,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    width: (width - 64) / 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statCardGradient: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'MPlusRounded1c-ExtraBold',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'MPlusRounded1c-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  achievementContainer: {
    marginBottom: 40,
  },
  achievementCard: {
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  achievementTitle: {
    fontSize: 20,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  achievementText: {
    fontSize: 16,
    fontFamily: 'MPlusRounded1c-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
    textAlign: 'center',
  },
  actionButtons: {
    gap: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  shareButton: {},
  restartButton: {},
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
  },
  homeButtonContainer: {
    alignItems: 'center',
  },
  homeButton: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  homeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  homeButtonText: {
    fontSize: 16,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#333',
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
  },
  bottomSpacer: {
    height: 40,
  },
});