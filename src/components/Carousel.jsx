import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

export default function Carousel({ eventos = [] }) {
  const navigate = useNavigate()
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
      className="relative keen-slider w-full h-[550px] mt-20 mb-10 overflow-visible"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {eventos?.map((evento, index) => (
        <div key={index} className="keen-slider__slide flex justify-center items-center overflow-visible">
          <div onClick={() => navigate(`/evento/${evento.id}`)} className="relative w-[95%] h-[90%] rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300 cursor-pointer">
            <img
              src={evento.imagemCapa}
              alt={evento.titulo}
              className="w-full h-full object-cover"
            />

            {/* Overlay com informações do evento */}
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/90 to-transparent px-4 py-6 text-white flex flex-col justify-end">
              <h2 className="text-4xl font-bold">{evento.titulo}</h2>
              <p className="text-base">{evento.dataInicio} às {evento.horaInicio}</p>
              <p className="text-base">{evento.local?.cidade}, {evento.local?.estado}</p>
            </div>

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