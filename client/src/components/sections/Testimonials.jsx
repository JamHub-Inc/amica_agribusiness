import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'CEO, RetailMax',
        company: 'Retail Chain',
        content:
            "DukaTrack's POS system transformed our retail operations. The inventory management and analytics features have helped us increase efficiency by 40% and reduce stock-outs significantly.",
        rating: 5,
    },
    {
        name: 'Michael Chen',
        role: 'Operations Director',
        company: 'LogiFlow Solutions',
        content:
            'PACE Delivery revolutionized our logistics operations. The route optimization and real-time tracking features have improved our delivery efficiency and customer satisfaction tremendously.',
        rating: 5,
    },
    {
        name: 'Emily Rodriguez',
        role: 'Property Manager',
        company: 'Urban Properties',
        content:
            'The rental management system streamlined all our property operations. From tenant screening to rent collection, everything is now automated and efficient. Highly recommended!',
        rating: 5,
    },
    {
        name: 'David Thompson',
        role: 'Finance Director',
        company: 'Capital Lending',
        content:
            'Their loan management system has been a game-changer for our lending operations. The automated workflows and risk assessment tools have significantly improved our processing time.',
        rating: 5,
    },
]

export default function Testimonials() {
    return (
        <section className="py-20 bg-gradient-to-br from-muted to-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        What Our Clients Say
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Don't just take our word for it — hear from businesses that have transformed
                        their operations with our solutions
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className="border border-border shadow-md hover:shadow-xl transition-shadow duration-300 relative overflow-hidden bg-card"
                        >
                            <CardContent className="p-8">
                                <div className="absolute top-4 right-4 text-primary/20">
                                    <Quote className="h-8 w-8" />
                                </div>

                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-5 w-5 text-accent fill-current"
                                        />
                                    ))}
                                </div>

                                <p className="text-foreground/80 leading-relaxed mb-6">
                                    "{testimonial.content}"
                                </p>

                                <div className="flex items-center space-x-4">
                                    <div>
                                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <div className="inline-flex items-center space-x-8 bg-card rounded-full px-8 py-4 shadow-lg border border-border">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-foreground">500+ Happy Clients</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-accent fill-current" />
                            ))}
                            <span className="text-sm font-medium text-foreground ml-2">4.9/5 Rating</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
