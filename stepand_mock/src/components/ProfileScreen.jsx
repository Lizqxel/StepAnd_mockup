import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ArrowLeft, Edit3, Award, MapPin, Calendar, Settings } from 'lucide-react'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  padding-top: 20px;
`

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const SettingsButton = styled(BackButton)`
  
`

const ProfileCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 30px;
  text-align: center;
  margin-bottom: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  margin: 0 auto 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`

const UserName = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 10px;
  font-weight: 600;
`

const UserLevel = styled.div`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 20px;
`

const LevelProgress = styled.div`
  background: #e2e8f0;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 15px;
`

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  width: 65%;
  border-radius: 4px;
  transition: width 0.3s ease;
`

const StatsSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`

const StatCard = styled.div`
  text-align: center;
  padding: 15px;
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%);
  border-radius: 15px;
`

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 5px;
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
`

const BadgesSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`

const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`

const Badge = styled.div`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 12px 8px;
  border-radius: 15px;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`

const RecentActivity = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const ActivityContent = styled.div`
  flex: 1;
`

const ActivityTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 2px;
`

const ActivityTime = styled.div`
  font-size: 0.8rem;
  color: #718096;
`

function ProfileScreen({ userProfile, setUserProfile }) {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  const recentActivities = [
    { icon: <MapPin size={16} />, title: '消えた猫の謎をクリア', time: '2時間前' },
    { icon: <Award size={16} />, title: '新しいバッジを獲得', time: '1日前' },
    { icon: <Calendar size={16} />, title: '7日連続散歩達成', time: '2日前' }
  ]

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </BackButton>
        <SettingsButton onClick={() => setIsEditing(!isEditing)}>
          <Edit3 size={20} />
        </SettingsButton>
      </Header>

      <ProfileCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Avatar>👤</Avatar>
        <UserName>{userProfile.name}</UserName>
        <UserLevel>レベル {userProfile.level}</UserLevel>
        <div style={{ fontSize: '0.9rem', color: '#718096' }}>
          次のレベルまで 350XP
        </div>
        <LevelProgress>
          <ProgressBar />
        </LevelProgress>
      </ProfileCard>

      <StatsSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <SectionTitle>
          <Award size={20} />
          統計情報
        </SectionTitle>
        <StatsGrid>
          <StatCard>
            <StatValue>{userProfile.totalDistance}</StatValue>
            <StatLabel>総歩行距離 (km)</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{userProfile.totalMissions}</StatValue>
            <StatLabel>達成ミッション</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>156</StatValue>
            <StatLabel>消費カロリー</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>12</StatValue>
            <StatLabel>散歩日数</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <BadgesSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SectionTitle>
          <Award size={20} />
          獲得バッジ
        </SectionTitle>
        <BadgeGrid>
          {userProfile.badges.map((badge, index) => (
            <Badge key={index}>{badge}</Badge>
          ))}
        </BadgeGrid>
      </BadgesSection>

      <RecentActivity
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <SectionTitle>
          <Calendar size={20} />
          最近のアクティビティ
        </SectionTitle>
        {recentActivities.map((activity, index) => (
          <ActivityItem key={index}>
            <ActivityIcon>{activity.icon}</ActivityIcon>
            <ActivityContent>
              <ActivityTitle>{activity.title}</ActivityTitle>
              <ActivityTime>{activity.time}</ActivityTime>
            </ActivityContent>
          </ActivityItem>
        ))}
      </RecentActivity>
    </Container>
  )
}

export default ProfileScreen