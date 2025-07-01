import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Camera, CheckCircle, RotateCcw } from 'lucide-react'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

const InstructionText = styled(motion.div)`
  color: white;
  font-size: 1.1rem;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  max-width: 300px;
`

const CameraFrame = styled.div`
  width: 100%;
  max-width: 350px;
  height: 300px;
  background: linear-gradient(45deg, #1a1a2e, #16213e);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 3px solid rgba(255, 255, 255, 0.1);
`

const ScanningOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #00f2fe, transparent);
`

const ARDetection = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border: 3px solid #00f2fe;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 242, 254, 0.1);
  backdrop-filter: blur(5px);
`

const DetectionIcon = styled.div`
  font-size: 3rem;
  color: #00f2fe;
  text-shadow: 0 0 20px rgba(0, 242, 254, 0.8);
`

const SuccessAnimation = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`

const SuccessIcon = styled(motion.div)`
  font-size: 4rem;
  color: white;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
  margin-bottom: 10px;
`

const SuccessText = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

const MissionCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  width: 100%;
  max-width: 350px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`

const MissionTitle = styled.h2`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const MissionDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1rem;
`

const RewardBadge = styled(motion.div)`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 15px auto;
  display: inline-block;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`

const Button = styled(motion.button)`
  padding: 15px 25px;
  border: none;
  border-radius: 15px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Noto Sans JP', sans-serif;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
`

const ContinueButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex: 1;
`

const RetryButton = styled(Button)`
  background: rgba(255, 255, 255, 0.9);
  color: #4a5568;
`

const ScanningIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 0.9rem;
  margin-bottom: 20px;
`

const ScanningDots = styled.div`
  display: flex;
  gap: 4px;
`

const ScanningDot = styled(motion.div)`
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
`

function MissionScreen() {
  const navigate = useNavigate()
  const [isScanning, setIsScanning] = useState(true)
  const [missionComplete, setMissionComplete] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

  useEffect(() => {
    if (isScanning) {
      const progressTimer = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false)
            setMissionComplete(true)
            
            // 成功音の代わりにバイブレーション（対応デバイスのみ）
            if (navigator.vibrate) {
              navigator.vibrate([200, 100, 200])
            }
            return 100
          }
          return prev + 2
        })
      }, 100)

      return () => clearInterval(progressTimer)
    }
  }, [isScanning])

  const handleContinue = () => {
    navigate('/ar-navigation')
  }

  const handleRetry = () => {
    setIsScanning(true)
    setMissionComplete(false)
    setScanProgress(0)
  }

  return (
    <Container>
      {isScanning && (
        <>
          <InstructionText
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            カメラを周囲に向けて、ミッションオブジェクトを探してください
          </InstructionText>
          
          <ScanningIndicator>
            <Camera size={16} />
            スキャン中
            <ScanningDots>
              {[0, 1, 2].map((index) => (
                <ScanningDot
                  key={index}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
              ))}
            </ScanningDots>
          </ScanningIndicator>
        </>
      )}

      <CameraFrame>
        {isScanning && (
          <ScanningOverlay
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}

        {isScanning ? (
          <ARDetection
            animate={{
              scale: [1, 1.1, 1],
              borderColor: ['#00f2fe', '#4facfe', '#00f2fe']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <DetectionIcon>🚏</DetectionIcon>
          </ARDetection>
        ) : (
          <SuccessAnimation
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SuccessIcon
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 1,
                ease: "easeInOut"
              }}
            >
              ✨
            </SuccessIcon>
            <SuccessText>発見成功！</SuccessText>
          </SuccessAnimation>
        )}
      </CameraFrame>

      {missionComplete && (
        <MissionCard
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MissionTitle>
            <CheckCircle size={24} />
            ミッション成功！
          </MissionTitle>
          <MissionDescription>
            バス停を発見しました！ここは物語の重要な場所です。
            昔、この場所で不思議な出来事が起こったという噂があります...
          </MissionDescription>
          
          <RewardBadge
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            +50 XP 獲得！
          </RewardBadge>
          
          <ButtonContainer>
            <RetryButton
              onClick={handleRetry}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw size={16} />
              再挑戦
            </RetryButton>
            <ContinueButton
              onClick={handleContinue}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              物語を続ける
            </ContinueButton>
          </ButtonContainer>
        </MissionCard>
      )}
    </Container>
  )
}

export default MissionScreen