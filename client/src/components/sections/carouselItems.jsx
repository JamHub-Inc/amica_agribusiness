import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import pharama1 from './HeroImages/pharama5.avif'
import pharama2 from './HeroImages/pharama6.avif'
import pharama3 from './HeroImages/pharamapos.jpg'

const carouselItems = [
    {
        id: 1,
        image: pharama1,
        title: 'Modern Pharmacy Management',
        description: 'Streamline your pharmacy operations with our comprehensive management system',
    },
    {
        id: 2,
        image: pharama2,
        title: 'Automated Inventory Control',
        description: 'Track and manage pharmaceutical inventory with precision and efficiency',
    },
    {
        id: 3,
        image: pharama3,
        title: 'Advanced Point of Sale',
        description: 'Process transactions seamlessly with our integrated POS system',
    },
]

export const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
    }

    return (
        <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-elegant">
            {/* Carousel Images */}
            {carouselItems.map((item, index) => (
                <div
                    key={item.id}
                    className={cn(
                        'absolute inset-0 transition-all duration-700 ease-in-out',
                        index === currentSlide
                            ? 'opacity-100 transform scale-100'
                            : 'opacity-0 transform scale-105'
                    )}
                >
                    <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${item.image})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Slide Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white px-6 animate-fade-in">
                            <h3 className="text-2xl lg:text-4xl font-bold mb-4 drop-shadow-lg">
                                {item.title}
                            </h3>
                            <p className="text-lg lg:text-xl drop-shadow-md max-w-2xl">
                                {item.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={prevSlide}
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={nextSlide}
            >
                <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                {carouselItems.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            'w-3 h-3 rounded-full transition-all duration-300',
                            index === currentSlide
                                ? 'bg-white scale-125'
                                : 'bg-white/50 hover:bg-white/70'
                        )}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    )
}
