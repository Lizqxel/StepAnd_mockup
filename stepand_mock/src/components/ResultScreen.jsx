import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Share2, RotateCcw, Home, Trophy, MapPin, Clock, Zap, Award } from 'lucide-react'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ResultCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 30px;
  width: 100%;
  max-width: 350px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`

const CompletionIcon = styled(motion.div)`
  font-size: 4rem;
  margin-bottom: 20px;
`

const Title = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 10px;
  font-weight: 600;
`

const Subtitle = styled.p`
  color: #718096;
  font-size: 1rem;
  margin-bottom: 25px;
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 25px;
`

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 15px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
`

const StatIcon = styled.div`
  font-size: 1.5rem;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`

const StatLabel = styled.div`
  font-size: 0.8rem;
  opacity: 0.9;
  text-align: center;
`

const AchievementSection = styled(motion.div)`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 25px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`

const AchievementTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

const AchievementText = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 15px;
`

const NewBadge = styled(motion.div)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
`

const LevelUpCard = styled(motion.div)`
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 25px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`

const LevelUpText = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 10px;
`

const XPGained = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 350px;
`

const Button = styled(motion.button)`
  padding: 15px 25px;
  border: none;
  border-radius: 15px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Noto Sans JP', sans-serif;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

const ShareButton = styled(Button)`
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
`

const PlayAgainButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`

const HomeButton = styled(Button)`
  background: rgba(255, 255, 255, 0.8);
  color: #2d3748;
  border: 2px solid #e2e8f0;
`

const ShareModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`

const ShareContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 300px;
  width: 100%;
  text-align: center;
`

const ShareTitle = styled.h3`
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 15px;
  font-weight: 600;
`

const ShareText = styled.p`
  color: #4a5568;
  line-height: 1.5;
  margin-bottom: 20px;
  font-size: 0.9rem;
`

const ShareOptions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`

const ShareOption = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const CloseButton = styled.button`
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  font-family: 'Noto Sans JP', sans-serif;
`

function ResultScreen({ walkingData, userProfile, setUserProfile }) {
  const navigate = useNavigate()
  const [showShareModal, setShowShareModal] = useState(false)
  const [leveledUp, setLeveledUp] = useState(true) // シミュレーション用

  const handleShare = () => {
    setShowShareModal(true)
  }

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Step& - 散歩の記録',
        text: `今日は${walkingData.distance}km歩いて、${walkingData.missions}個のミッションをクリアしました！達成度${walkingData.achievement}%`,
        url: window.location.origin
      })
    } else {
      // フォールバック: クリップボードにコピー
      const text = `Step&で散歩完了！${walkingData.distance}km歩いて、${walkingData.missions}個のミッションをクリア。達成度${walkingData.achievement}%でした！`
      navigator.clipboard.writeText(text)
      alert('結果をクリップボードにコピーしました！')
    }
    setShowShareModal(false)
  }

  const getAchievementLevel = (percentage) => {
    if (percentage >= 90) return { emoji: '🏆', text: 'パーフェクト！', description: '完璧な散歩でした' }
    if (percentage >= 70) return { emoji: '⭐', text: 'すばらしい！', description: '素晴らしい冒険でした' }
    if (percentage >= 50) return { emoji: '👍', text: 'よくできました！', description: '良い散歩でした' }
    return { emoji: '💪', text: 'がんばりました！', description: '次回も頑張りましょう' }
  }

  const achievement = getAchievementLevel(walkingData.achievement)

  const stats = [
    { icon: <MapPin size={20} />, value: `${walkingData.distance}km`, label: '歩行距離' },
    { icon: <Trophy size={20} />, value: walkingData.missions, label: 'ミッション' },
    { icon: <Zap size={20} />, value: `${walkingData.calories}kcal`, label: '消費カロリー' },
    { icon: <Clock size={20} />, value: `${walkingData.time}分`, label: '所要時間' }
  ]

  return (
    <Container>
      <ResultCard
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <CompletionIcon
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut"
          }}
        >
          {achievement.emoji}
        </CompletionIcon>

        <Title>物語完了！</Title>
        <Subtitle>{achievement.description}</Subtitle>

        <StatsContainer>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <StatIcon>{stat.icon}</StatIcon>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>
      </ResultCard>

      {leveledUp && (
        <LevelUpCard
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <LevelUpText>🎉 レベルアップ！</LevelUpText>
          <XPGained>レベル {userProfile.level} → {userProfile.level + 1}</XPGained>
        </LevelUpCard>
      )}

      <AchievementSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <AchievementTitle>
          <Award size={20} />
          {achievement.text}
        </AchievementTitle>
        <AchievementText>
          達成度 {walkingData.achievement}% で物語をクリアしました
        </AchievementText>
        <NewBadge
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          新しいバッジを獲得！
        </NewBadge>
      </AchievementSection>

      <ButtonContainer>
        <ShareButton
          onClick={handleShare}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Share2 size={16} />
          結果をシェア
        </ShareButton>

        <PlayAgainButton
          onClick={() => navigate('/library')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RotateCcw size={16} />
          新しい物語を選ぶ
        </PlayAgainButton>

        <HomeButton
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Home size={16} />
          ホームに戻る
        </HomeButton>
      </ButtonContainer>

      {showShareModal && (
        <ShareModal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowShareModal(false)}
        >
          <ShareContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ShareTitle>結果をシェア</ShareTitle>
            <ShareText>
              今日の散歩の成果をみんなにシェアしましょう！
            </ShareText>
            <ShareOptions>
              <ShareOption
                style={{ background: '#1DA1F2', color: 'white' }}
                onClick={handleNativeShare}
              >
                📱
              </ShareOption>
              <ShareOption
                style={{ background: '#25D366', color: 'white' }}
                onClick={handleNativeShare}
              >
                💬
              </ShareOption>
              <ShareOption
                style={{ background: '#FF6B6B', color: 'white' }}
                onClick={handleNativeShare}
              >
                📧
              </ShareOption>
            </ShareOptions>
            <CloseButton onClick={() => setShowShareModal(false)}>
              閉じる
            </CloseButton>
          </ShareContent>
        </ShareModal>
      )}
    </Container>
  )
}

export default ResultScreen