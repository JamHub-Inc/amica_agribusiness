import React from 'react'
import { motion } from 'framer-motion'
import { 
  Sprout,
  Map,
  HandCoins,
  Wifi,
  Users,
  Leaf,
  Wheat,
  BadgeCheck,
  Clock,
  Zap,
  ArrowRight,
  Shield
} from 'lucide-react'

const FeaturesPreview = () => {
    const features = [
        {
            icon: Map,
            title: 'Know Your Market',
            description: 'See real-time prices from 50+ local markets. Plan when and where to sell for the best returns.',
            stats: (
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Updated daily</span>
                </div>
            ),
            highlight: 'Maximize profits by 30%',
            badge: 'Most popular'
        },
        {
            icon: HandCoins,
            title: 'Grow Now, Pay Later',
            description: 'Access instant input loans through your SACCO. Repay when you harvest—no collateral stress.',
            stats: (
                <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span>Approval in 24hrs</span>
                </div>
            ),
            highlight: '0% interest for first loan'
        },
        {
            icon: Leaf,
            title: 'Digital Field Assistant',
            description: 'Get AI-powered advice on planting, pest control, and harvest timing based on your specific location.',
            stats: (
                <div className="flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" />
                    <span>95% accuracy rate</span>
                </div>
            ),
            highlight: 'Personalized crop calendar'
        },
        {
            icon: Users,
            title: 'Farmer-Supervisor Connect',
            description: 'Chat directly with your assigned extension officer. Share photos of crops and get instant feedback.',
            stats: (
                <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span>Response in {'<'} 2hrs</span>
                </div>
            ),
            highlight: 'Direct expert access'
        },
        {
            icon: Wheat,
            title: 'Harvest to Market',
            description: 'Log your harvest once and connect instantly with verified buyers. No middlemen, better prices.',
            stats: (
                <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>200+ active buyers</span>
                </div>
            ),
            highlight: 'Sell 2x faster'
        },
        {
            icon: Wifi,
            title: 'Works Offline First',
            description: 'Use all features without internet. Data syncs automatically when you\'re back online—perfect for rural areas.',
            stats: (
                <div className="flex items-center gap-1">
                    <Wifi className="w-3 h-3" />
                    <span>Works on 2G networks</span>
                </div>
            ),
            highlight: 'Zero data charges'
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
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
        <section id="features" className="relative py-24 lg:py-32 bg-background overflow-hidden border-t border-border">
            {/* Clean Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div 
                    className="absolute inset-0" 
                    style={{ 
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23224b2d' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
                    }}
                />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <motion.div
                    className="text-center max-w-4xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-bold mb-8 border border-primary/20">
                        <Sprout className="w-4 h-4" />
                        From Field to Market
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
                        Everything you need to <span className="text-primary">grow smarter</span>
                    </h2>
                    
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        No more guessing games. Get real-time market data, instant loans, and expert advice—all in one place, even without internet.
                    </p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={itemVariants}
                            className="group relative bg-card border border-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            {/* Header with Icon */}
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                                    <feature.icon className="h-7 w-7 text-primary-foreground" />
                                </div>
                                
                                {/* Stat Badge */}
                                <div className="px-3 py-1 bg-muted rounded-full flex items-center gap-2">
                                    <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                                        {feature.stats}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-foreground mb-4">
                                {feature.title}
                            </h3>
                            
                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Highlight */}
                            <div className="flex items-center gap-2 mb-8">
                                <BadgeCheck className="w-5 h-5 text-primary" />
                                <span className="text-sm font-bold text-primary">
                                    {feature.highlight}
                                </span>
                            </div>

                            {/* Interactive Link */}
                            <a href="#how-it-works" className="flex items-center gap-2 text-sm font-bold text-primary cursor-pointer mt-auto no-underline">
                                <span>Learn how it works</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div 
                    className="text-center mt-24"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <a href="#how-it-works" className="btn-primary py-5 px-12 rounded-2xl text-lg font-bold group inline-flex items-center gap-3 no-underline">
                        <span>See how it works</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    <div className="mt-8 flex items-center justify-center gap-4 text-muted-foreground font-medium">
                        <div className="flex items-center gap-1.5">
                            <Shield className="w-4 h-4 text-primary" />
                            <span>No credit card</span>
                        </div>
                        <div className="w-1 h-1 bg-border rounded-full" />
                        <span>Free for farmers</span>
                        <div className="w-1 h-1 bg-border rounded-full" />
                        <span>Works offline</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default FeaturesPreview

