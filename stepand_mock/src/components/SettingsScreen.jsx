import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ArrowLeft, Volume2, VolumeX, Vibrate, Smartphone } from 'lucide-react'

const Container = styled.div`
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
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
  color: #2d3748;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
  font-weight: 600;
`

const Subtitle = styled.p`
  color: #4a5568;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 30px;
`

const SettingSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
`

const Select = styled.select`
  width: 100%;
  padding: 15px;
  border: 2px solid #e2e8f0;
  border-radius: 15px;
  font-size: 1rem;
  background: white;
  color: #2d3748;
  font-family: 'Noto Sans JP', sans-serif;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`

const SliderContainer = styled.div`
  margin-top: 10px;
`

const Slider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: #e2e8f0;
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`

const SliderValue = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 1.1rem;
  color: #4a5568;
  font-weight: 500;
`

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`

const ToggleLabel = styled.div`
  font-size: 1rem;
  color: #2d3748;
  font-weight: 500;
`

const Toggle = styled.button`
  width: 60px;
  height: 32px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  
  ${props => props.active ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  ` : `
    background: #e2e8f0;
  `}
  
  &::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    top: 4px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    
    ${props => props.active ? `
      left: 32px;
    ` : `
      left: 4px;
    `}
  }
`

const DifficultySelector = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 15px;
`

const DifficultyOption = styled.button`
  padding: 12px;
  border: 2px solid ${props => props.selected ? '#667eea' : '#e2e8f0'};
  border-radius: 12px;
  background: ${props => props.selected ? 'rgba(102, 126, 234, 0.1)' : 'white'};
  color: ${props => props.selected ? '#667eea' : '#4a5568'};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Noto Sans JP', sans-serif;
  
  &:hover {
    border-color: #667eea;
  }
`

const StartButton = styled(motion.button)`
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  margin-top: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Sans JP', sans-serif;
  letter-spacing: 1px;
`

const PreviewCard = styled(motion.div)`
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%);
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
  border: 2px solid rgba(102, 126, 234, 0.2);
`

const PreviewTitle = styled.h4`
  color: #667eea;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
`

const PreviewText = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.5;
`

function SettingsScreen({ setCurrentStory }) {
  const navigate = useNavigate()
  const [genre, setGenre] = useState('mystery')
  const [duration, setDuration] = useState(15)
  const [difficulty, setDifficulty] = useState('beginner')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)
  const [arEnabled, setArEnabled] = useState(true)

  const genreOptions = {
    mystery: { title: '消えた猫の謎', description: '近所で行方不明になった猫を探す推理ストーリー' },
    fantasy: { title: '魔法の森への扉', description: '隠された魔法の世界への入り口を見つける冒険' },
    adventure: { title: '宇宙からの使者', description: 'SF要素満載の冒険ストーリー' },
    romance: { title: '時を超える恋人', description: '過去と現在を行き来する恋愛物語' }
  }

  const handleStart = () => {
    const story = {
      genre,
      duration,
      difficulty,
      title: genreOptions[genre].title,
      description: genreOptions[genre].description,
      settings: {
        sound: soundEnabled,
        vibration: vibrationEnabled,
        ar: arEnabled
      }
    }
    setCurrentStory(story)
    navigate('/ar-navigation')
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </BackButton>
        <Title>散歩の設定</Title>
      </Header>

      <Subtitle>あなたの冒険をカスタマイズしましょう</Subtitle>

      <SettingSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle>📚 ジャンルを選ぶ</SectionTitle>
        <Select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="mystery">ミステリー</option>
          <option value="fantasy">ファンタジー</option>
          <option value="adventure">アドベンチャー</option>
          <option value="romance">ロマンス</option>
        </Select>
        
        <PreviewCard
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <PreviewTitle>{genreOptions[genre].title}</PreviewTitle>
          <PreviewText>{genreOptions[genre].description}</PreviewText>
        </PreviewCard>
      </SettingSection>

      <SettingSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <SectionTitle>⏰ 歩きたい時間</SectionTitle>
        <SliderContainer>
          <Slider
            type="range"
            min="5"
            max="60"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <SliderValue>{duration}分</SliderValue>
        </SliderContainer>
      </SettingSection>

      <SettingSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SectionTitle>🎯 難易度</SectionTitle>
        <DifficultySelector>
          <DifficultyOption
            selected={difficulty === 'beginner'}
            onClick={() => setDifficulty('beginner')}
          >
            初級
          </DifficultyOption>
          <DifficultyOption
            selected={difficulty === 'intermediate'}
            onClick={() => setDifficulty('intermediate')}
          >
            中級
          </DifficultyOption>
          <DifficultyOption
            selected={difficulty === 'advanced'}
            onClick={() => setDifficulty('advanced')}
          >
            上級
          </DifficultyOption>
        </DifficultySelector>
      </SettingSection>

      <SettingSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <SectionTitle>⚙️ 体験設定</SectionTitle>
        
        <ToggleContainer>
          <ToggleLabel>
            <Volume2 size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            音声ガイド
          </ToggleLabel>
          <Toggle
            active={soundEnabled}
            onClick={() => setSoundEnabled(!soundEnabled)}
          />
        </ToggleContainer>

        <ToggleContainer>
          <ToggleLabel>
            <Vibrate size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            バイブレーション
          </ToggleLabel>
          <Toggle
            active={vibrationEnabled}
            onClick={() => setVibrationEnabled(!vibrationEnabled)}
          />
        </ToggleContainer>

        <ToggleContainer>
          <ToggleLabel>
            <Smartphone size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            AR表示
          </ToggleLabel>
          <Toggle
            active={arEnabled}
            onClick={() => setArEnabled(!arEnabled)}
          />
        </ToggleContainer>
      </SettingSection>

      <StartButton
        onClick={handleStart}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        冒険をスタート
      </StartButton>
    </Container>
  )
}

export default SettingsScreen