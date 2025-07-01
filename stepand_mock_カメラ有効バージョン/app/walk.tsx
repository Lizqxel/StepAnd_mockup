import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  Dimensions, 
  Alert,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { ArrowLeft, Navigation, Target, CircleCheck as CheckCircle, Volume2, Pause, Play, MapPin, Compass } from 'lucide-react-native';
import Animated, { 
  FadeInUp, 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  interpolate
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface Mission {
  id: number;
  type: string;
  target: string;
  description: string;
  completed: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  radius: number; // meters
}

interface UserLocation {
  latitude: number;
  longitude: number;
  heading?: number;
}

// Sample missions with real coordinates (Tokyo area)
const generateMissions = (startLocation: UserLocation): Mission[] => [
  {
    id: 1,
    type: 'landmark',
    target: '赤い屋根の建物',
    description: '謎めいた赤い屋根の建物を見つけて写真を撮ろう',
    completed: false,
    location: {
      latitude: startLocation.latitude + 0.001,
      longitude: startLocation.longitude + 0.001
    },
    radius: 20
  },
  {
    id: 2,
    type: 'sign',
    target: '青い看板',
    description: '物語の手がかりが隠された青い看板を発見せよ',
    completed: false,
    location: {
      latitude: startLocation.latitude + 0.002,
      longitude: startLocation.longitude - 0.001
    },
    radius: 25
  },
  {
    id: 3,
    type: 'nature',
    target: '古い木',
    description: '魔法が宿ると言われる古い木に近づこう',
    completed: false,
    location: {
      latitude: startLocation.latitude - 0.001,
      longitude: startLocation.longitude + 0.002
    },
    radius: 15
  },
  {
    id: 4,
    type: 'path',
    target: '石畳の道',
    description: '冒険者たちが歩いた石畳の道を進もう',
    completed: false,
    location: {
      latitude: startLocation.latitude + 0.0015,
      longitude: startLocation.longitude - 0.0015
    },
    radius: 30
  },
];

const storyTexts = [
  "あなたは謎に満ちた街にやってきました。古い地図を手に、失われた宝物を探す冒険が始まります...",
  "風がささやいています。「真実は隠された場所にある」と。次の手がかりを探しましょう。",
  "突然、不思議な光があなたの前に現れました。それは正しい道を示しているようです。",
  "物語はクライマックスへ。最後の謎を解く時が来ました。"
];

export default function WalkScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [permission, requestPermission] = useCameraPermissions();
  const [locationPermission, setLocationPermission] = useState(false);
  
  // Location and navigation state
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [currentMission, setCurrentMission] = useState(0);
  const [isNearTarget, setIsNearTarget] = useState(false);
  const [distanceToTarget, setDistanceToTarget] = useState<number>(0);
  const [bearingToTarget, setBearingToTarget] = useState<number>(0);
  
  // Walk state
  const [isWalking, setIsWalking] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);
  const [walkTime, setWalkTime] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [isStoryPlaying, setIsStoryPlaying] = useState(false);
  
  // Animation values
  const arrowRotation = useSharedValue(0);
  const arrowScale = useSharedValue(1);
  const progressWidth = useSharedValue(0);
  const pulseOpacity = useSharedValue(1);
  const targetPulse = useSharedValue(1);
  
  // Location tracking
  const locationSubscription = useRef<Location.LocationSubscription | null>(null);
  const previousLocation = useRef<UserLocation | null>(null);

  useEffect(() => {
    requestLocationPermission();
    if (permission?.granted && locationPermission) {
      initializeWalk();
    }
  }, [permission, locationPermission]);

  useEffect(() => {
    if (userLocation && missions.length > 0 && currentMission < missions.length) {
      updateNavigationData();
    }
  }, [userLocation, currentMission, missions]);

  useEffect(() => {
    // Animate progress bar
    progressWidth.value = withTiming((storyProgress / storyTexts.length) * 100, {
      duration: 500,
    });
  }, [storyProgress]);

  useEffect(() => {
    // Pulse animation for AR elements
    const pulse = () => {
      pulseOpacity.value = withSequence(
        withTiming(0.6, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      );
    };
    
    const interval = setInterval(pulse, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Target proximity pulse
    if (isNearTarget) {
      targetPulse.value = withRepeat(
        withSequence(
          withTiming(1.3, { duration: 300 }),
          withTiming(1, { duration: 300 })
        ),
        -1,
        false
      );
    } else {
      targetPulse.value = withTiming(1, { duration: 300 });
    }
  }, [isNearTarget]);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationPermission(status === 'granted');
  };

  const initializeWalk = async () => {
    try {
      // Get initial location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      const initialLocation: UserLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        heading: location.coords.heading || 0,
      };
      
      setUserLocation(initialLocation);
      previousLocation.current = initialLocation;
      
      // Generate missions based on current location
      const generatedMissions = generateMissions(initialLocation);
      setMissions(generatedMissions);
      
      // Start location tracking
      startLocationTracking();
      setIsWalking(true);
      startWalkTimer();
      
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('位置情報エラー', '現在地を取得できませんでした。');
    }
  };

  const startLocationTracking = async () => {
    try {
      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          const newLocation: UserLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            heading: location.coords.heading || 0,
          };
          
          // Calculate distance traveled
          if (previousLocation.current) {
            const distance = calculateDistance(
              previousLocation.current,
              newLocation
            );
            setTotalDistance(prev => prev + distance);
          }
          
          setUserLocation(newLocation);
          previousLocation.current = newLocation;
        }
      );
    } catch (error) {
      console.error('Error starting location tracking:', error);
    }
  };

  const updateNavigationData = () => {
    if (!userLocation || !missions[currentMission]) return;
    
    const target = missions[currentMission].location;
    const distance = calculateDistance(userLocation, target);
    const bearing = calculateBearing(userLocation, target);
    
    setDistanceToTarget(distance);
    setBearingToTarget(bearing);
    
    // Update arrow rotation
    const adjustedBearing = bearing - (userLocation.heading || 0);
    arrowRotation.value = withSpring(adjustedBearing);
    
    // Check if near target
    const isNear = distance <= missions[currentMission].radius;
    setIsNearTarget(isNear);
    
    if (isNear && !missions[currentMission].completed) {
      // Auto-complete mission when near
      setTimeout(() => {
        handleMissionComplete();
      }, 2000);
    }
  };

  const calculateDistance = (point1: UserLocation, point2: { latitude: number; longitude: number }): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = point1.latitude * Math.PI / 180;
    const φ2 = point2.latitude * Math.PI / 180;
    const Δφ = (point2.latitude - point1.latitude) * Math.PI / 180;
    const Δλ = (point2.longitude - point1.longitude) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  const calculateBearing = (point1: UserLocation, point2: { latitude: number; longitude: number }): number => {
    const φ1 = point1.latitude * Math.PI / 180;
    const φ2 = point2.latitude * Math.PI / 180;
    const Δλ = (point2.longitude - point1.longitude) * Math.PI / 180;

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

    const θ = Math.atan2(y, x);
    return (θ * 180 / Math.PI + 360) % 360;
  };

  const startWalkTimer = () => {
    const timer = setInterval(() => {
      setWalkTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  };

  const handleBack = () => {
    Alert.alert(
      '散歩を終了しますか？',
      '現在の進行状況は保存されません。',
      [
        { text: 'キャンセル', style: 'cancel' },
        { 
          text: '終了', 
          onPress: () => {
            if (locationSubscription.current) {
              locationSubscription.current.remove();
            }
            router.back();
          }
        }
      ]
    );
  };

  const handleMissionComplete = () => {
    // Animate mission completion
    arrowScale.value = withSequence(
      withSpring(1.3),
      withSpring(1)
    );
    
    const updatedMissions = [...missions];
    updatedMissions[currentMission].completed = true;
    setMissions(updatedMissions);
    
    // Progress story
    if (currentMission < missions.length - 1) {
      setCurrentMission(prev => prev + 1);
      setStoryProgress(prev => prev + 1);
      setIsNearTarget(false);
    } else {
      // All missions completed, go to result
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
      
      router.push({
        pathname: '/result',
        params: {
          genre: params.genre,
          time: walkTime,
          distance: (totalDistance / 1000).toFixed(2),
          missions: missions.length,
          completion: 100
        }
      });
    }
  };

  const toggleStoryAudio = () => {
    setIsStoryPlaying(!isStoryPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };

  // Animated styles
  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${arrowRotation.value}deg` },
      { scale: arrowScale.value }
    ],
  }));

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  const targetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: targetPulse.value }],
  }));

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <LinearGradient colors={['#1e3a8a', '#3730a3']} style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>カメラの許可が必要です</Text>
          <Pressable style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>許可する</Text>
          </Pressable>
        </View>
      </LinearGradient>
    );
  }

  if (!locationPermission) {
    return (
      <LinearGradient colors={['#1e3a8a', '#3730a3']} style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>位置情報の許可が必要です</Text>
          <Pressable style={styles.permissionButton} onPress={requestLocationPermission}>
            <Text style={styles.permissionButtonText}>許可する</Text>
          </Pressable>
        </View>
      </LinearGradient>
    );
  }

  if (!userLocation || missions.length === 0) {
    return (
      <LinearGradient colors={['#1e3a8a', '#3730a3']} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>位置情報を取得中...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera View */}
      <CameraView style={styles.camera} facing="back">
        {/* AR Navigation Overlay */}
        <View style={styles.arOverlay}>
          {/* 3D Arrow Navigation */}
          <Animated.View 
            style={[styles.arArrow, arrowAnimatedStyle, pulseAnimatedStyle]}
            entering={FadeInDown.delay(500).springify()}
          >
            <LinearGradient
              colors={isNearTarget ? ['#00ff88', '#00d4ff'] : ['#ff6b9d', '#ffa726']}
              style={styles.arArrowGradient}
            >
              <Navigation size={32} color="#FFFFFF" strokeWidth={3} />
            </LinearGradient>
            
            {/* Distance indicator */}
            <View style={styles.distanceIndicator}>
              <Text style={styles.distanceText}>
                {formatDistance(distanceToTarget)}
              </Text>
            </View>
          </Animated.View>

          {/* Mission Target Indicator */}
          <Animated.View 
            style={[styles.missionIndicator, targetAnimatedStyle]}
            entering={FadeInUp.delay(300).springify()}
          >
            <LinearGradient
              colors={
                isNearTarget 
                  ? ['rgba(0, 255, 136, 0.9)', 'rgba(0, 212, 255, 0.9)']
                  : ['rgba(255, 107, 157, 0.9)', 'rgba(255, 167, 38, 0.9)']
              }
              style={styles.missionIndicatorGradient}
            >
              <Target size={24} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={styles.missionText}>
                {missions[currentMission]?.target}
              </Text>
              {isNearTarget && (
                <CheckCircle size={20} color="#FFFFFF" strokeWidth={2} />
              )}
            </LinearGradient>
          </Animated.View>

          {/* Compass */}
          <View style={styles.compass}>
            <Compass size={24} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.compassText}>
              {userLocation.heading ? `${Math.round(userLocation.heading)}°` : 'N/A'}
            </Text>
          </View>
        </View>

        {/* Top UI */}
        <View style={styles.topUI}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2.5} />
          </Pressable>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatTime(walkTime)}</Text>
              <Text style={styles.statLabel}>時間</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatDistance(totalDistance)}</Text>
              <Text style={styles.statLabel}>距離</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{currentMission + 1}/{missions.length}</Text>
              <Text style={styles.statLabel}>ミッション</Text>
            </View>
          </View>
        </View>

        {/* Story Progress */}
        <Animated.View 
          style={styles.progressContainer}
          entering={FadeInUp.delay(200).springify()}
        >
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progressFill, progressAnimatedStyle]} />
          </View>
          <Text style={styles.progressText}>
            物語進行度: {Math.round((storyProgress / storyTexts.length) * 100)}%
          </Text>
        </Animated.View>

        {/* Story Text */}
        <Animated.View 
          style={styles.storyContainer}
          entering={FadeInDown.delay(400).springify()}
        >
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.6)']}
            style={styles.storyGradient}
          >
            <Text style={styles.storyText}>
              {storyTexts[Math.min(storyProgress, storyTexts.length - 1)]}
            </Text>
            <View style={styles.storyControls}>
              <Pressable 
                style={styles.audioButton}
                onPress={toggleStoryAudio}
              >
                {isStoryPlaying ? (
                  <Pause size={20} color="#FFFFFF" strokeWidth={2} />
                ) : (
                  <Volume2 size={20} color="#FFFFFF" strokeWidth={2} />
                )}
              </Pressable>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Mission Action Button */}
        {isNearTarget && (
          <Animated.View 
            style={styles.actionContainer}
            entering={FadeInUp.delay(600).springify()}
          >
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                pressed && styles.actionButtonPressed
              ]}
              onPress={handleMissionComplete}
            >
              <LinearGradient
                colors={['#00ff88', '#00d4ff']}
                style={styles.actionButtonGradient}
              >
                <CheckCircle size={28} color="#FFFFFF" strokeWidth={2.5} />
                <Text style={styles.actionButtonText}>ミッション完了</Text>
              </LinearGradient>
            </Pressable>
          </Animated.View>
        )}

        {/* Mission Description */}
        <Animated.View 
          style={styles.missionDescription}
          entering={FadeInDown.delay(800).springify()}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
            style={styles.missionDescriptionGradient}
          >
            <MapPin size={20} color="#333" strokeWidth={2} />
            <Text style={styles.missionDescriptionText}>
              {missions[currentMission]?.description}
            </Text>
            <Text style={styles.missionDistanceText}>
              目標まで {formatDistance(distanceToTarget)}
            </Text>
          </LinearGradient>
        </Animated.View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  permissionText: {
    fontSize: 18,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#ff6b9d',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
  },
  permissionButtonText: {
    fontSize: 16,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  arOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arArrow: {
    position: 'absolute',
    top: height * 0.25,
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
  },
  arArrowGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  distanceIndicator: {
    marginTop: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  distanceText: {
    fontSize: 14,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
  },
  missionIndicator: {
    position: 'absolute',
    top: height * 0.4,
    borderRadius: 20,
    overflow: 'hidden',
  },
  missionIndicatorGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  missionText: {
    fontSize: 16,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
  },
  compass: {
    position: 'absolute',
    top: 140,
    right: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  compassText: {
    fontSize: 12,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
    marginTop: 2,
  },
  topUI: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 60,
  },
  statValue: {
    fontSize: 14,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'MPlusRounded1c-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  progressContainer: {
    position: 'absolute',
    top: 120,
    left: 24,
    right: 24,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ff88',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  storyContainer: {
    position: 'absolute',
    bottom: 200,
    left: 24,
    right: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  storyGradient: {
    padding: 20,
  },
  storyText: {
    fontSize: 16,
    fontFamily: 'MPlusRounded1c-Regular',
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 12,
  },
  storyControls: {
    alignItems: 'flex-end',
  },
  audioButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContainer: {
    position: 'absolute',
    bottom: 120,
    left: 24,
    right: 24,
  },
  actionButton: {
    borderRadius: 28,
    overflow: 'hidden',
  },
  actionButtonPressed: {
    transform: [{ scale: 0.95 }],
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 12,
  },
  actionButtonText: {
    fontSize: 18,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
  },
  missionDescription: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  missionDescriptionGradient: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  missionDescriptionText: {
    fontSize: 14,
    fontFamily: 'MPlusRounded1c-Regular',
    color: '#333',
    marginBottom: 4,
  },
  missionDistanceText: {
    fontSize: 12,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#666',
  },
});