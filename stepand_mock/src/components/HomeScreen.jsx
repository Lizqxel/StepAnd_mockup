import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { User, BookOpen, Settings, TrendingUp } from 'lucide-react'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  position: relative;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-top: 20px;
`

const ProfileButton = styled.button`
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #2d3748;
`

const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: white;
  font-weight: 600;
`

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`

const Logo = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 2px;
`

const Greeting = styled.p`
  font-size: 1.1rem;
  color: #4a5568;
  margin-bottom: 10px;
  font-weight: 500;
`

const Slogan = styled(motion.p)`
  font-size: 1rem;
  color: #718096;
  font-weight: 300;
  letter-spacing: 1px;
`

const StatsCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  text-align: center;
`

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 5px;
`

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #718096;
  font-weight: 500;
`

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 30px;
`

const ActionCard = styled(motion.button)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 20px;
  padding: 20px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Sans JP', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const ActionIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`

const ActionTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
`

const ActionSubtitle = styled.div`
  font-size: 0.8rem;
  color: #718096;
`

const MainButton = styled(motion.button)`
  width: 100%;
  padding: 20px;
  border: none;
  border-radius: 25px;
  font-size: 1.3rem;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  font-family: 'Noto Sans JP', sans-serif;
  letter-spacing: 1px;
  margin-top: auto;
`

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
`

function HomeScreen({ userProfile }) {
  const navigate = useNavigate()

  return (
    <Container>
      <FloatingElement
        style={{ top: '10%', left: '10%' }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <FloatingElement
        style={{ top: '20%', right: '15%' }}
        animate={{
          y: [0, 15, 0],
          x: [0, 10, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Header>
        <div>
          <Greeting>こんにちは、{userProfile.name}さん</Greeting>
          <div style={{ fontSize: '0.9rem', color: '#718096' }}>
            レベル {userProfile.level} • 今日も素敵な散歩を
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <ProfileButton onClick={() => navigate('/profile')}>
            <User size={20} />
          </ProfileButton>
          <NotificationBadge>3</NotificationBadge>
        </div>
      </Header>

      <WelcomeSection>
        <Logo
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Step&
        </Logo>
        
        <Slogan
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          あなたの散歩を、物語に
        </Slogan>
      </WelcomeSection>

      <StatsCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <StatsGrid>
          <StatItem>
            <StatValue>{userProfile.totalDistance}km</StatValue>
            <StatLabel>総歩行距離</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{userProfile.totalMissions}</StatValue>
            <StatLabel>ミッション数</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{userProfile.badges.length}</StatValue>
            <StatLabel>バッジ</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsCard>

      <QuickActions>
        <ActionCard
          onClick={() => navigate('/library')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ActionIcon style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <BookOpen size={20} />
          </ActionIcon>
          <ActionTitle>物語ライブラリ</ActionTitle>
          <ActionSubtitle>新しい冒険を探す</ActionSubtitle>
        </ActionCard>

        <ActionCard
          onClick={() => navigate('/history')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <ActionIcon style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <TrendingUp size={20} />
          </ActionIcon>
          <ActionTitle>散歩履歴</ActionTitle>
          <ActionSubtitle>過去の冒険を振り返る</ActionSubtitle>
        </ActionCard>
      </QuickActions>

      <MainButton
        onClick={() => navigate('/settings')}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        新しい物語をはじめる
      </MainButton>
    </Container>
  )
}

export default HomeScreen