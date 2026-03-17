import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

const testimonials = [
    {
        name: 'Dr. Sarah Kimani',

        location: 'Nairobi, Kenya',
        content:
            'Pharma Track has revolutionized our operations across all our branches in Nairobi and Mombasa. The real-time NHIF integration and inventory management have reduced our stockouts by 80% and improved customer satisfaction tremendously.',
        rating: 5,
    },
    {
        name: 'James Mwangi',

        location: 'Kiambu, Kenya',
        content:
            "As a pharmacy chain with 5 outlets in Central Kenya, Pharma Track's multi-branch feature has been a game-changer. We can now track KEMSA orders and manage expiry dates across all locations from one dashboard. Hakuna matata!",
        rating: 5,
    },
    {
        name: 'Wanjiru Njoroge',

        location: 'Uasin Gishu, Kenya',
        content:
            "From manual records to full digitization in days! The system's compliance with PPB regulations and ability to generate instant reports has made my work so much easier. Even my mama mboga customers notice the difference!",
        rating: 5,
    },
    {
        name: 'Dr. Omar Hassan',

        location: 'Mombasa, Kenya',
        content:
            'The system works perfectly with our coastal region operations. The mobile app allows my team to serve patients quickly during rush hours. Our turnaround time for prescriptions has improved by 60% - pole pole is now haraka haraka!',
        rating: 5,
    },
    {
        name: 'Grace Atieno',

        location: 'Kisumu, Kenya',
        content:
            "Managing our three branches in Nyanza region has never been easier. The system's alerts for nearly expired drugs have saved us thousands of shillings. Even our county government inspectors are impressed with our records!",
        rating: 5,
    },
    {
        name: 'Peter Kamau',

        location: 'Nakuru, Kenya',
        content:
            'The system works perfectly even with our intermittent internet in Nakuru. The offline mode and automatic sync when connection returns is a lifesaver. Support team is always available - they even answer at 2am during emergencies!',
        rating: 5,
    },
]

export const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const visibleTestimonials = [
        testimonials[currentIndex],
        testimonials[(currentIndex + 1) % testimonials.length],
        testimonials[(currentIndex + 2) % testimonials.length],
    ]

    return (
        <section className="py-20 bg-muted/20">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-16 animate-fade-in">
                    <h2 className="text-3xl lg:text-5xl font-bold">
                        Trusted by{' '}
                        <span className="bg-gradient-primary bg-clip-text text-transparent">
                            Kenyan Pharmacies
                        </span>{' '}
                        And Beyond
                    </h2>
                    <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                        See what pharmacy professionals are saying about Pharma Track
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {visibleTestimonials.map((testimonial, index) => (
                        <Card
                            key={`${testimonial.name}-${currentIndex}-${index}`}
                            className="relative bg-card/50 backdrop-blur-sm border-border/50 shadow-card hover:shadow-elegant transition-all duration-500 animate-fade-in"
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <CardContent className="p-6 space-y-4">
                                <Quote className="h-8 w-8 text-primary/30" />

                                <p className="text-muted-foreground leading-relaxed">
                                    "{testimonial.content}"
                                </p>

                                <div className="flex items-center gap-1 mb-4">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                </div>

                                <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-xl font-bold text-primary">
                                            {testimonial.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{testimonial.name}</h4>

                                        <p className="text-xs text-muted-foreground">
                                            {testimonial.location}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Testimonial Navigation Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex ? 'bg-primary w-8' : 'bg-border'
                            }`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
