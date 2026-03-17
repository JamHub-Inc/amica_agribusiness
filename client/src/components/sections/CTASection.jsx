import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sprout, Users, TrendingUp, HandCoins } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const CTASection = () => {
    const navigate = useNavigate()

    const registrations = [
        { label: 'Register as Farmer', action: () => navigate('/auth/signup?role=farmer'), icon: Sprout },
        { label: 'Login as Supervisor', action: () => navigate('/auth/login?role=supervisor'), icon: Users },
        { label: 'View Market Prices', action: () => navigate('/market-prices'), icon: TrendingUp },
    ]

    return (
        <section id="cta" className="py-24 lg:py-32 relative overflow-hidden bg-primary text-primary-foreground">
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
                <div 
                    className="absolute inset-0" 
                    style={{ 
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
                    }}
                />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight">
                            Ready to Transform Agricultural <br />
                            <span className="text-accent">Supply & Pricing?</span>
                        </h2>

                        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Join a smarter way of managing food production, pricing, and financial support. 
                            Our platform connects you directly to growth opportunities.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6 mb-20">
                            {registrations.map((reg, index) => (
                                <motion.div
                                    key={reg.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Button
                                        size="lg"
                                        className={`${index === 0 ? 'bg-accent text-accent-foreground hover:bg-accent/90' : 'bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20'} transition-all duration-300 font-bold px-8 py-7 rounded-2xl group shadow-xl`}
                                        onClick={reg.action}
                                    >
                                        <reg.icon className="mr-3 h-5 w-5" />
                                        {reg.label}
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-8 rounded-3xl transition-transform hover:-translate-y-1">
                                <HandCoins className="w-12 h-12 text-accent mx-auto mb-4" />
                                <h4 className="text-xl font-bold mb-2">Fair Loans</h4>
                                <p className="text-primary-foreground/70 text-sm">Financial support aligned with your production cycle</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-8 rounded-3xl transition-transform hover:-translate-y-1">
                                <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4" />
                                <h4 className="text-xl font-bold mb-2">Live Prices</h4>
                                <p className="text-primary-foreground/70 text-sm">Real-time transparency across regional markets</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-8 rounded-3xl transition-transform hover:-translate-y-1">
                                <Users className="w-12 h-12 text-accent mx-auto mb-4" />
                                <h4 className="text-xl font-bold mb-2">Expert Guide</h4>
                                <p className="text-primary-foreground/70 text-sm">Direct connection with SACCO supervisors</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default CTASection

