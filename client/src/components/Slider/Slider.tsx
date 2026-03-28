import './Slider.scss'
import EastOutlinedIcon from '@mui/icons-material/EastOutlined'
import WestOutlinedIcon from '@mui/icons-material/WestOutlined'
import { useState } from 'react'

function Slider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  const data: string[] = [
    '/images/slider1.webp',
    '/images/slider2.webp',
    '/images/slider3.webp',
    '/images/slider4.webp',
    '/images/slider5.webp',
    '/images/slider6.webp',
    '/images/slider7.webp',
    '/images/slider8.webp',
    '/images/slider9.webp',
    '/images/slider10.webp',
  ]

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1))
  }

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="slider">
      <div className="container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {data.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slider-${index}`}
            width={1311}
            height={874}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding="async"
          />
        ))}
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <WestOutlinedIcon className="mui-icons" />
        </div>
        <div className="icon" onClick={nextSlide}>
          <EastOutlinedIcon className="mui-icons" />
        </div>
      </div>
    </div>
  )
}

export default Slider
