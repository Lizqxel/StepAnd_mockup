import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

const Logo = styled(motion.div)`
  font-size: 4rem;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 3px;
`

const LoadingDots = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 30px;
`

const Dot = styled(motion.div)`
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  opacity: 0.7;
`

const Tagline = styled(motion.p)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  text-align: center;
  margin-top: 20px;
  font-weight: 300;
`

function LoadingScreen() {
  return (
    <Container>
      <Logo
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Step&
      </Logo>
      
      <Tagline
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        あなたの散歩を、物語に
      </Tagline>

      <LoadingDots>
        {[0, 1, 2].map((index) => (
          <Dot
            key={index}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
        ))}
      </LoadingDots>
    </Container>
  )
}

export default LoadingScreen