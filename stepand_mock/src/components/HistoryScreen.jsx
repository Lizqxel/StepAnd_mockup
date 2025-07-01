import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  padding: 20px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-top: 20px;
`

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #2d3748;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-right: 15px;
`

const Title = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
  font-weight: 600;
`

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const HistoryItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const HistoryTitle = styled.h3`
  font-size: 1.2rem;
  color: #2d3748;
  font-weight: 600;
`

const HistoryDate = styled.span`
  font-size: 0.9rem;
  color: #718096;
`

const HistoryStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`

const StatItem = styled.div`
  text-align: center;
`

const StatValue = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #667eea;
`

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #718096;
  margin-top: 2px;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #718096;
`

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.5;
`

const EmptyText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
`

function HistoryScreen() {
  const navigate = useNavigate()

  // サンプルデータ（実際のアプリでは localStorage や API から取得）
  const historyData = [
    {
      id: 1,
      title: '消えた猫の謎',
      genre: 'ミステリー',
      date: '2024-01-15',
      distance: 1.2,
      missions: 3,
      achievement: 85
    },
    {
      id: 2,
      title: '魔法の森への扉',
      genre: 'ファンタジー',
      date: '2024-01-12',
      distance: 0.8,
      missions: 2,
      achievement: 92
    },
    {
      id: 3,
      title: '時を超える恋人',
      genre: 'ロマンス',
      date: '2024-01-10',
      distance: 1.5,
      missions: 4,
      achievement: 78
    }
  ]

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          ←
        </BackButton>
        <Title>散歩の履歴</Title>
      </Header>

      {historyData.length > 0 ? (
        <HistoryList>
          {historyData.map((item, index) => (
            <HistoryItem
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <HistoryHeader>
                <HistoryTitle>{item.title}</HistoryTitle>
                <HistoryDate>{item.date}</HistoryDate>
              </HistoryHeader>
              
              <div style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '10px' }}>
                {item.genre}
              </div>

              <HistoryStats>
                <StatItem>
                  <StatValue>{item.distance}km</StatValue>
                  <StatLabel>歩行距離</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{item.missions}個</StatValue>
                  <StatLabel>ミッション</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{item.achievement}%</StatValue>
                  <StatLabel>達成度</StatLabel>
                </StatItem>
              </HistoryStats>
            </HistoryItem>
          ))}
        </HistoryList>
      ) : (
        <EmptyState>
          <EmptyIcon>📱</EmptyIcon>
          <EmptyText>
            まだ散歩の記録がありません。<br />
            最初の物語を始めてみましょう！
          </EmptyText>
        </EmptyState>
      )}
    </Container>
  )
}

export default HistoryScreen