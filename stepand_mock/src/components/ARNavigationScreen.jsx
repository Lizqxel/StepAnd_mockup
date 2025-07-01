import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Pause, Play, MapPin, Target } from 'lucide-react'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  display: flex;
  flex-direction: column;
`

const StatusBar = styled.div`
  background: rgba(0, 0, 0, 0.3);
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
`

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const CameraView = styled.div`
  flex: 1;
  background: linear-gradient(45deg, #1a1a2e, #16213e);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const ARArrow = styled(motion.div)`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
  box-shadow: 0 0 30px rgba(79, 172, 254, 0.6);
  filter: drop-shadow(0 0 10px rgba(79, 172, 254, 0.8));
`

const AROverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
`

const ARText = styled.div`
  font-size: 1.2rem;
  margin-top: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  font-weight: 500;
`

const DistanceIndicator = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
`

const CompassRing = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`

const CompassNeedle = styled(motion.div)`
  width: 30px;
  height: 3px;
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  border-radius: 2px;
  transform-origin: center;
`

const StoryPanel = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px;
  margin: 20px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`

const StoryTitle = styled.h3`
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 10px;
  font-weight: 600;
`

const StoryText = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 15px;
`

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const AudioButton = styled.button`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-right: 15px;
`

const ProgressContainer = styled.div`
  flex: 1;
  margin: 0 15px;
`

const ProgressBar = styled.div`
  background: rgba(255, 255, 255, 0.3);
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 5px;
`

const Progress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  border-radius: 4px;
`

const ProgressText = styled.div`
  font-size: 0.8rem;
  color: #718096;
  text-align: center;
`

const MissionButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  font-family: 'Noto Sans JP', sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
`

const HintBubble = styled(motion.div)`
  position: absolute;
  bottom: 200px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 12px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #2d3748;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  max-width: 280px;
  text-align: center;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid rgba(255, 255, 255, 0.9);
  }
`

function ARNavigationScreen({ story, setWalkingData }) {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [distance, setDistance] = useState(0)
  const [targetDistance, setTargetDistance] = useState(150)
  const [showHint, setShowHint] = useState(true)

  const storySteps = [
    "物語が始まります。あなたは主人公として、この街に隠された謎を解き明かす冒険に出発します。",
    "最初の手がかりを探すため、前方に見える建物に向かって歩いてください。ARの矢印が道案内をします。",
    "素晴らしい！次のミッションポイントが見つかりました。周囲を注意深く観察してください。"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setWalkingData({
            distance: 1.2,
            missions: 3,
            achievement: 85,
            calories: 68,
            time: 15
          })
          navigate('/result')
          return prev
        }
        return prev + 1.5
      })
      
      setDistance(prev => prev + Math.random() * 2)
    }, 1000)

    // ヒントを5秒後に非表示
    const hintTimer = setTimeout(() => {
      setShowHint(false)
    }, 5000)

    return () => {
      clearInterval(timer)
      clearTimeout(hintTimer)
    }
  }, [navigate, setWalkingData])

  const handleMissionFound = () => {
    navigate('/mission')
  }

  return (
    <Container>
      <StatusBar>
        <StatusItem>
          <MapPin size={16} />
          {story?.title || '物語のタイトル'}
        </StatusItem>
        <StatusItem>
          {Math.floor(progress)}% 完了
        </StatusItem>
      </StatusBar>

      <CameraView>
        <DistanceIndicator
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          目標まで {Math.max(0, targetDistance - Math.floor(distance))}m
        </DistanceIndicator>

        <CompassRing>
          <CompassNeedle
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </CompassRing>

        <AROverlay>
          <ARArrow
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <ARText>この方向に進んでください</ARText>
        </AROverlay>

        {showHint && (
          <HintBubble
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            スマホを持って歩き、ARの矢印に従ってください
          </HintBubble>
        )}
      </CameraView>

      <StoryPanel
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <StoryTitle>{story?.title || '物語のタイトル'}</StoryTitle>
        <StoryText>
          {storySteps[currentStep]}
        </StoryText>
        
        <ControlsContainer>
          <AudioButton
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              background: isPlaying 
                ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
                : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
            }}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </AudioButton>
          
          <ProgressContainer>
            <ProgressBar>
              <Progress
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </ProgressBar>
            <ProgressText>物語の進行度</ProgressText>
          </ProgressContainer>
          
          <MissionButton
            onClick={handleMissionFound}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Target size={16} />
            ミッション発見
          </MissionButton>
        </ControlsContainer>
      </StoryPanel>
    </Container>
  )
}

export default ARNavigationScreen