import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  TrendingDown, 
  Landmark, 
  Scale, 
  HandCoins,
  ArrowUpRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react'

const PriceAwareness = () => {
    const points = [
        { 
            icon: TrendingDown, 
            text: 'Reduces dependency on middlemen',
            stat: 'Up to 40% more profit'
        },
        { 
            icon: Scale, 
            text: 'Encourages competitive pricing',
            stat: 'Fair market rates'
        },
        { 
            icon: Landmark, 
            text: 'Promotes income predictability',
            stat: 'Stable earnings'
        },
        { 
            icon: Landmark, 
            text: 'Strengthens SACCO Records',
            stat: 'Better decision making'
        },
        { 
            icon: HandCoins, 
            text: 'Enhances economic empowerment',
            stat: 'Financial independence'
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    }

    return (
        <section id="impact" className="relative py-24 lg:py-32 bg-background overflow-hidden border-t border-border">
            {/* Clean Pattern Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div 
                    className="absolute inset-0" 
                    style={{ 
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23224b2d' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
                    }}
                />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-8 border border-primary/20">
                            <Sparkles className="w-4 h-4" />
                            Direct Impact
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight text-foreground">
                            Empowering Farmers Through{' '}
                            <span className="text-primary block">Price Awareness</span>
                        </h2>
                        
                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                                Market price ignorance often results in unfair trade practices. 
                                By providing verified pricing information and supply visibility, 
                                this system creates a level playing field for all farmers.
                            </p>
                            
                            {/* Stats Card - Solid Theme Primary */}
                            <motion.div 
                                className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-lg shadow-primary/10"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white/80 text-sm font-medium uppercase tracking-wider mb-2">Verified Impact</p>
                                        <p className="text-xl font-bold mb-4 leading-relaxed">
                                            "Data-driven decisions are the blueprint for sustainable agricultural growth."
                                        </p>
                                        <div className="flex items-center gap-2 text-white/90 text-sm font-semibold">
                                            <CheckCircle2 className="w-5 h-5 text-accent" />
                                            <span>Trusted by 15,000+ farmers across 45+ SACCOs</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3 mt-10">
                            {['Real-time data', 'Market insights', 'Fair pricing', 'SACCO integration'].map((tag, i) => (
                                <span key={i} className="px-5 py-2.5 bg-muted border border-border rounded-xl text-sm font-bold text-muted-foreground">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Impact Points */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Main Impact Card - Solid bg-card */}
                        <div className="bg-card rounded-[2.5rem] shadow-xl p-8 lg:p-10 border border-border">
                            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                                <div className="w-1.5 h-8 bg-primary rounded-full" />
                                Key System Benefits
                            </h3>
                            
                            <div className="space-y-4">
                                {points.map((point, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="group"
                                    >
                                        <div className="bg-muted/50 rounded-2xl p-5 border border-transparent hover:border-primary/20 hover:bg-background transition-all duration-300">
                                            <div className="flex items-center gap-5">
                                                {/* Icon Container - Solid Primary */}
                                                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
                                                    <point.icon className="w-6 h-6 text-primary-foreground" />
                                                </div>
                                                
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <span className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                                                            {point.text}
                                                        </span>
                                                        <ArrowUpRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-all" />
                                                    </div>
                                                    
                                                    {/* Stat Badge - Solid primary/10 */}
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest leading-none">
                                                            {point.stat}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Bottom CTA Button - Using btn-primary class */}
                            <motion.button 
                                className="w-full mt-10 btn-primary py-5 rounded-2xl font-bold flex items-center justify-center gap-3"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-lg">See Impact in Action</span>
                                <ArrowUpRight className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default PriceAwareness

