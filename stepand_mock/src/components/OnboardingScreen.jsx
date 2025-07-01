import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
`

const SlideContainer = styled(motion.div)`
  text-align: center;
  max-width: 320px;
  width: 100%;
`

const IllustrationContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 20px;
  font-weight: 600;
  line-height: 1.3;
`

const Description = styled.p`
  color: #4a5568;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 40px;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 40px;
`

const Button = styled(motion.button)`
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  font-family: 'Noto Sans JP', sans-serif;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
`

const NextButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`

const SkipButton = styled(Button)`
  background: rgba(255, 255, 255, 0.8);
  color: #4a5568;
`

const ProgressIndicator = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 30px;
`

const ProgressDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? '#667eea' : 'rgba(255, 255, 255, 0.5)'};
  transition: all 0.3s ease;
`

const slides = [
  {
    icon: '🚶‍♀️',
    title: 'Step&へようこそ',
    description: '現実の街を歩きながら、ARで物語を体験する新しい散歩アプリです。'
  },
  {
    icon: '📱',
    title: 'ARで物語を体験',
    description: 'スマホのカメラを通して、現実世界に物語の世界が重なります。'
  },
  {
    icon: '🎯',
    title: 'ミッションをクリア',
    description: '街中に隠されたミッションを見つけて、物語を進めていきましょう。'
  },
  {
    icon: '🏆',
    title: '成長を実感',
    description: '歩いた距離や達成したミッションが記録され、レベルアップできます。'
  }
]

function OnboardingScreen({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const skipOnboarding = () => {
    onComplete()
  }

  return (
    <Container>
      <ProgressIndicator>
        {slides.map((_, index) => (
          <ProgressDot key={index} active={index === currentSlide} />
        ))}
      </ProgressIndicator>

      <AnimatePresence mode="wait">
        <SlideContainer
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <IllustrationContainer>
            {slides[currentSlide].icon}
          </IllustrationContainer>
          
          <Title>{slides[currentSlide].title}</Title>
          <Description>{slides[currentSlide].description}</Description>
        </SlideContainer>
      </AnimatePresence>

      <ButtonContainer>
        <SkipButton
          onClick={skipOnboarding}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          スキップ
        </SkipButton>
        
        <NextButton
          onClick={nextSlide}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentSlide === slides.length - 1 ? 'はじめる' : '次へ'}
        </NextButton>
      </ButtonContainer>
    </Container>
  )
}

export default OnboardingScreen