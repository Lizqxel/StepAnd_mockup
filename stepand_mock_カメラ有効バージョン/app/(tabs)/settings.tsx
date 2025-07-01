import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Volume2, MapPin, Smartphone, Shield, CircleHelp as HelpCircle, Star, ChevronRight } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [location, setLocation] = useState(true);
  const [haptics, setHaptics] = useState(true);

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    hasSwitch = false, 
    switchValue, 
    onSwitchChange, 
    onPress,
    delay = 0
  }: any) => (
    <Animated.View
      entering={FadeInUp.delay(delay).springify()}
      style={styles.settingItemContainer}
    >
      <Pressable 
        style={({ pressed }) => [
          styles.settingItem,
          pressed && styles.itemPressed
        ]}
        onPress={onPress}
      >
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
          style={styles.settingItemGradient}
        >
          <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
              <Icon size={24} color="#FFFFFF" strokeWidth={2} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.settingTitle}>{title}</Text>
              {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
            </View>
          </View>
          <View style={styles.settingRight}>
            {hasSwitch ? (
              <Switch
                value={switchValue}
                onValueChange={onSwitchChange}
                trackColor={{ false: 'rgba(255, 255, 255, 0.2)', true: '#ff6b9d' }}
                thumbColor="#FFFFFF"
              />
            ) : (
              <ChevronRight size={20} color="rgba(255, 255, 255, 0.6)" strokeWidth={2} />
            )}
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );

  return (
    <LinearGradient
      colors={['#134e4a', '#047857', '#10b981']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>設定</Text>
        <Text style={styles.subtitle}>アプリをカスタマイズ</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 通知設定 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>通知・音声</Text>
          
          <SettingItem
            icon={Bell}
            title="プッシュ通知"
            subtitle="新しいストーリーやミッションの通知"
            hasSwitch={true}
            switchValue={notifications}
            onSwitchChange={setNotifications}
            delay={200}
          />
          
          <SettingItem
            icon={Volume2}
            title="音声ガイド"
            subtitle="散歩中の音声による案内"
            hasSwitch={true}
            switchValue={sound}
            onSwitchChange={setSound}
            delay={300}
          />
        </View>

        {/* プライバシー設定 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>プライバシー</Text>
          
          <SettingItem
            icon={MapPin}
            title="位置情報"
            subtitle="散歩ルートとARナビゲーション"
            hasSwitch={true}
            switchValue={location}
            onSwitchChange={setLocation}
            delay={400}
          />
          
          <SettingItem
            icon={Smartphone}
            title="触覚フィードバック"
            subtitle="ミッション完了時の振動"
            hasSwitch={true}
            switchValue={haptics}
            onSwitchChange={setHaptics}
            delay={500}
          />
        </View>

        {/* サポート */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>サポート</Text>
          
          <SettingItem
            icon={HelpCircle}
            title="ヘルプ・使い方"
            subtitle="アプリの使用方法を確認"
            delay={600}
          />
          
          <SettingItem
            icon={Star}
            title="アプリを評価"
            subtitle="App Storeでレビューを書く"
            delay={700}
          />
          
          <SettingItem
            icon={Shield}
            title="プライバシーポリシー"
            subtitle="データの取り扱いについて"
            delay={800}
          />
        </View>

        {/* アプリ情報 */}
        <Animated.View
          entering={FadeInUp.delay(900).springify()}
          style={styles.appInfo}
        >
          <Text style={styles.appName}>Step& - ARストーリー散歩</Text>
          <Text style={styles.appVersion}>バージョン 1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 Step& Team</Text>
        </Animated.View>

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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
    marginLeft: 4,
  },
  settingItemContainer: {
    marginBottom: 12,
  },
  settingItem: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'MPlusRounded1c-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  settingRight: {
    marginLeft: 16,
  },
  itemPressed: {
    transform: [{ scale: 0.98 }],
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
    marginTop: 16,
  },
  appName: {
    fontSize: 16,
    fontFamily: 'MPlusRounded1c-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: 'MPlusRounded1c-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  appCopyright: {
    fontSize: 12,
    fontFamily: 'MPlusRounded1c-Regular',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  bottomSpacer: {
    height: 100,
  },
});