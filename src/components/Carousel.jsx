import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useEffect, useState } from "react"

export default function Carousel({ imagens = [] }) {
  const [isPaused, setIsPaused] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1.3, 
      spacing: 10,  
      origin: "center",
    },
  })

  useEffect(() => {
    if (!instanceRef.current || isPaused) return

    const interval = setInterval(() => {
      instanceRef.current?.next()
    }, 3000)

    return () => clearInterval(interval)
  }, [instanceRef, isPaused])

  return (
    <div
      ref={sliderRef}
      className="relative keen-slider w-full h-[500px] mt-10 mb-10 overflow-visible "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {imagens?.map((img, index) => (
        <div
          key={index}
          className="keen-slider__slide flex justify-center items-center overflow-visible"
        >
          <div className="w-[95%] h-full rounded-xl overflow-hidden shadow-2xl shadow-black/90 transition-transform hover:scale-[1.02] duration-300">
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}

     
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black/70 transition"
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
        className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black/70 transition"
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
  )
}
