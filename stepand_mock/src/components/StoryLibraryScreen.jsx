import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Filter, Star, Clock, MapPin } from 'lucide-react'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  padding: 20px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
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
  flex: 1;
`

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 50px 15px 20px;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  font-size: 1rem;
  color: #2d3748;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  
  &::placeholder {
    color: #a0aec0;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`

const SearchIcon = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
`

const FilterTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  overflow-x: auto;
  padding-bottom: 5px;
`

const FilterTab = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  font-family: 'Noto Sans JP', sans-serif;
  transition: all 0.3s ease;
  
  ${props => props.active ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  ` : `
    background: rgba(255, 255, 255, 0.8);
    color: #4a5568;
    backdrop-filter: blur(10px);
  `}
`

const StoryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const StoryCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
`

const StoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`

const StoryInfo = styled.div`
  flex: 1;
`

const StoryTitle = styled.h3`
  font-size: 1.3rem;
  color: #2d3748;
  font-weight: 600;
  margin-bottom: 8px;
`

const StoryGenre = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`

const StoryRating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #f6ad55;
  font-size: 0.9rem;
  font-weight: 600;
`

const StoryDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 15px;
  font-size: 0.95rem;
`

const StoryMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #718096;
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const PlayButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 12px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Noto Sans JP', sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`

const NewBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 600;
`

function StoryLibraryScreen({ setCurrentStory }) {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filters = [
    { id: 'all', label: 'すべて' },
    { id: 'mystery', label: 'ミステリー' },
    { id: 'fantasy', label: 'ファンタジー' },
    { id: 'adventure', label: 'アドベンチャー' },
    { id: 'romance', label: 'ロマンス' }
  ]

  const stories = [
    {
      id: 1,
      title: '消えた猫の謎',
      genre: 'ミステリー',
      description: '近所で行方不明になった猫を探す推理ストーリー。街の人々との会話から手がかりを集めて真実に迫ります。',
      rating: 4.8,
      duration: 15,
      distance: 1.2,
      isNew: false,
      difficulty: '初級'
    },
    {
      id: 2,
      title: '魔法の森への扉',
      genre: 'ファンタジー',
      description: '都市の中に隠された魔法の世界への入り口を見つける冒険。現実と幻想が交錯する不思議な体験。',
      rating: 4.9,
      duration: 25,
      distance: 2.1,
      isNew: true,
      difficulty: '中級'
    },
    {
      id: 3,
      title: '時を超える恋人',
      genre: 'ロマンス',
      description: '過去と現在を行き来する恋愛物語。歴史ある街並みを歩きながら、時代を超えた愛の物語を体験。',
      rating: 4.6,
      duration: 20,
      distance: 1.8,
      isNew: false,
      difficulty: '初級'
    },
    {
      id: 4,
      title: '宇宙からの使者',
      genre: 'アドベンチャー',
      description: 'SF要素満載の冒険ストーリー。街に現れた謎の現象を調査し、宇宙の秘密に迫ります。',
      rating: 4.7,
      duration: 30,
      distance: 2.5,
      isNew: true,
      difficulty: '上級'
    }
  ]

  const filteredStories = stories.filter(story => {
    const matchesFilter = activeFilter === 'all' || story.genre.toLowerCase().includes(activeFilter)
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleStorySelect = (story) => {
    setCurrentStory(story)
    navigate('/settings')
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </BackButton>
        <Title>物語ライブラリ</Title>
      </Header>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="物語を検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon>
          <Search size={20} />
        </SearchIcon>
      </SearchContainer>

      <FilterTabs>
        {filters.map(filter => (
          <FilterTab
            key={filter.id}
            active={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </FilterTab>
        ))}
      </FilterTabs>

      <StoryGrid>
        {filteredStories.map((story, index) => (
          <StoryCard
            key={story.id}
            onClick={() => handleStorySelect(story)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {story.isNew && <NewBadge>NEW</NewBadge>}
            
            <StoryHeader>
              <StoryInfo>
                <StoryTitle>{story.title}</StoryTitle>
                <StoryGenre>{story.genre}</StoryGenre>
              </StoryInfo>
              <StoryRating>
                <Star size={16} fill="currentColor" />
                {story.rating}
              </StoryRating>
            </StoryHeader>

            <StoryDescription>{story.description}</StoryDescription>

            <StoryMeta>
              <div style={{ display: 'flex', gap: '15px' }}>
                <MetaItem>
                  <Clock size={14} />
                  {story.duration}分
                </MetaItem>
                <MetaItem>
                  <MapPin size={14} />
                  {story.distance}km
                </MetaItem>
              </div>
              <PlayButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                プレイ
              </PlayButton>
            </StoryMeta>
          </StoryCard>
        ))}
      </StoryGrid>
    </Container>
  )
}

export default StoryLibraryScreen