import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useEffect, useState } from "react"

export default function Carousel({ imagens = [] }) {
  const [isPaused, setIsPaused] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
<<<<<<< HEAD
      perView: 1.3, 
      spacing: 10,  
=======
      perView: 3.5,
      spacing: 15,
>>>>>>> 51184c6 (add promoter)
      origin: "center",
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  useEffect(() => {
    if (!instanceRef.current || isPaused) return

    const interval = setInterval(() => {
      instanceRef.current?.next()
    }, 3000)

    return () => clearInterval(interval)
  }, [instanceRef, isPaused])

  const getSlideStyle = (index) => {
    const total = imagens.length
    let offset = index - currentSlide

    if (offset > total / 2) offset -= total
    if (offset < -total / 2) offset += total

    let scale = 0.8
    let zIndex = 10
    let opacity = 0.4
    let transform = `translateX(${offset * 160}px) scale(${scale})`

    if (offset === 0) {
      scale = 1
      zIndex = 30
      opacity = 1
      transform = "translateX(0px) scale(1)"
    } else if (Math.abs(offset) === 1) {
      scale = 0.9
      zIndex = 20
      opacity = 0.7
      transform = `translateX(${offset * 130}px) scale(${scale})`
    }

    return {
      transform,
      zIndex,
      opacity,
      transition: "all 0.4s ease",
    }
  }

  return (
    <>
      <style>
        {`
          .keen-slider__slides {
            overflow: visible !important;
          }
        `}
      </style>

      <div
        ref={sliderRef}
        className="relative keen-slider w-full h-[500px] mt-10 mb-10 overflow-visible"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {imagens?.map((img, index) => (
          <div
            key={index}
            className="keen-slider__slide flex justify-center items-center"
            style={{ overflow: "visible" }}
          >
            <div
              style={getSlideStyle(index)}
              className="w-[60%] h-full rounded-xl overflow-hidden shadow-2xl shadow-black/80 transition-transform duration-300 relative"
            >
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}

        {/* Botões */}
        <button
          onClick={() => instanceRef.current?.prev()}
          className="absolute top-1/2 left-2 z-50 transform -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => instanceRef.current?.next()}
          className="absolute top-1/2 right-2 z-50 transform -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  )
}
