import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

function EventosCarousel({ eventos, estado, nomesEstados, navigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    if (window.innerWidth < 1280) return 4;
    return 5;
  };

  const itemsPerView = getItemsPerView();
  const maxIndex = Math.max(0, eventos.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-900 text-2xl font-bold">
          Eventos {nomesEstados[estado] || estado}
        </h2>
        
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={`p-2 rounded-lg transition-all duration-200 ${
              canGoPrev
                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`p-2 rounded-lg transition-all duration-200 ${
              canGoNext
                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView + 1.5)}%)`,
          }}
        >
          {eventos.map((evento) => (
            <div
              key={evento.id}
              onClick={() => navigate(`/evento/${evento.id}`)}
              className="flex-shrink-0 bg-white shadow-xl shadow-black/10 rounded-lg cursor-pointer hover:scale-[103%] duration-150 overflow-hidden flex flex-col"
              style={{
                width: `calc(${100 / itemsPerView}% - ${(24 * (itemsPerView - 1)) / itemsPerView}px)`,
              }}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={evento.imagemCapa}
                  className="w-full h-[160px] object-cover"
                  alt={evento.titulo}
                />
                <span className="absolute top-2 left-2 bg-white/90 text-black font-bold text-xs px-2 py-1 rounded">
                  {evento.categoria}
                </span>
              </div>

              <div className="flex flex-col gap-1 p-3 flex-1">
                <p className="text-zinc-600 text-sm">{evento.dataInicio}</p>
                <h3 className="font-bold truncate text-gray-900" title={evento.titulo}>
                  {evento.titulo}
                </h3>
                <p className="text-sm text-gray-600 truncate">
                  {evento.local.nome}, {evento.local.cidade}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-orange-500'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}