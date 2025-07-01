import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import HomeScreen from './components/HomeScreen'
import SettingsScreen from './components/SettingsScreen'
import ARNavigationScreen from './components/ARNavigationScreen'
import MissionScreen from './components/MissionScreen'
import ResultScreen from './components/ResultScreen'
import HistoryScreen from './components/HistoryScreen'
import ProfileScreen from './components/ProfileScreen'
import StoryLibraryScreen from './components/StoryLibraryScreen'
import LoadingScreen from './components/LoadingScreen'
import OnboardingScreen from './components/OnboardingScreen'

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  position: relative;
  overflow: hidden;
`

const MobileContainer = styled.div`
  max-width: 414px;
  margin: 0 auto;
  min-height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  position: relative;
`

function App() {
  const [currentStory, setCurrentStory] = useState(null)
  const [walkingData, setWalkingData] = useState({
    distance: 0,
    missions: 0,
    achievement: 0,
    calories: 0,
    time: 0
  })
  const [userProfile, setUserProfile] = useState({
    name: 'ユーザー',
    level: 5,
    totalDistance: 12.4,
    totalMissions: 23,
    badges: ['初心者', '探検家', 'ミステリー愛好家']
  })
  const [isFirstTime, setIsFirstTime] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // アプリ初期化のシミュレーション
    const timer = setTimeout(() => {
      setIsLoading(false)
      // 初回起動チェック（実際のアプリではlocalStorageを使用）
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding')
      if (!hasSeenOnboarding) {
        setIsFirstTime(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const completeOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true')
    setIsFirstTime(false)
  }

  if (isLoading) {
    return (
      <AppContainer>
        <MobileContainer>
          <LoadingScreen />
        </MobileContainer>
      </AppContainer>
    )
  }

  if (isFirstTime) {
    return (
      <AppContainer>
        <MobileContainer>
          <OnboardingScreen onComplete={completeOnboarding} />
        </MobileContainer>
      </AppContainer>
    )
  }

  return (
    <AppContainer>
      <MobileContainer>
        <Router>
          <Routes>
            <Route path="/" element={<HomeScreen userProfile={userProfile} />} />
            <Route path="/settings" element={<SettingsScreen setCurrentStory={setCurrentStory} />} />
            <Route path="/ar-navigation" element={<ARNavigationScreen story={currentStory} setWalkingData={setWalkingData} />} />
            <Route path="/mission" element={<MissionScreen />} />
            <Route path="/result" element={<ResultScreen walkingData={walkingData} userProfile={userProfile} setUserProfile={setUserProfile} />} />
            <Route path="/history" element={<HistoryScreen />} />
            <Route path="/profile" element={<ProfileScreen userProfile={userProfile} setUserProfile={setUserProfile} />} />
            <Route path="/library" element={<StoryLibraryScreen setCurrentStory={setCurrentStory} />} />
          </Routes>
        </Router>
      </MobileContainer>
    </AppContainer>
  )
}

export default App