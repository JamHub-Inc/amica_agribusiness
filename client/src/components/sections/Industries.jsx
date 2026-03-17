import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Egg, 
  Heart, 
  Sprout, 
  Users, 
  Building, 
  ArrowRight,
  TrendingUp,
  Shield,
  BarChart3
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Industries = () => {
    const navigate = useNavigate()

    const industries = [
        {
            icon: Egg,
            title: 'Poultry Farming',
            description: 'Complete solutions for layer, broiler, and hatchery operations with real-time flock management.',
            color: 'from-accent to-success',
            bgColor: 'bg-accent/10',
            features: [
                'Flock lifecycle tracking',
                'Feed conversion ratio (FCR)',
                'Egg production analytics',
                'Vaccination schedules',
                'Mortality rate monitoring'
            ],
            stats: [
                { value: '40%', label: 'Productivity Increase' },
                { value: '25%', label: 'Better FCR' },
                { value: '15%', label: 'Reduced Mortality' }
            ],
            cta: 'Explore Poultry Solutions'
        },
        {
            icon: Heart,
            title: 'Livestock & Dairy',
            description: 'Comprehensive management for cattle, dairy, and mixed livestock farming operations.',
            color: 'from-secondary to-accent',
            bgColor: 'bg-secondary/10',
            features: [
                'Herd health monitoring',
                'Milk production tracking',
                'Breeding & calving records',
                'Feed ration management',
                'Weight gain analytics'
            ],
            stats: [
                { value: '35%', label: 'Milk Yield Increase' },
                { value: '20%', label: 'Feed Cost Reduction' },
                { value: '99%', label: 'Health Compliance' }
            ],
            cta: 'View Livestock Tools'
        },
        {
            icon: Sprout,
            title: 'Crop Farming',
            description: 'End-to-end crop management from planting to harvest with precision agriculture tools.',
            color: 'from-primary to-success',
            bgColor: 'bg-primary/10',
            features: [
                'Crop planning & rotation',
                'Input usage tracking',
                'Yield forecasting',
                'Soil health monitoring',
                'Harvest scheduling'
            ],
            stats: [
                { value: '30%', label: 'Yield Improvement' },
                { value: '25%', label: 'Input Optimization' },
                { value: '40%', label: 'Time Saved' }
            ],
            cta: 'Discover Crop Features'
        },
        {
            icon: Users,
            title: 'Agricultural Cooperatives',
            description: 'Powerful tools for farmer groups, cooperatives, and producer organizations.',
            color: 'from-success to-primary',
            bgColor: 'bg-success/10',
            features: [
                'Multi-farm coordination',
                'Collective sales management',
                'Member performance tracking',
                'Bulk input purchasing',
                'Shared resource allocation'
            ],
            stats: [
                { value: '60%', label: 'Revenue Growth' },
                { value: '30%', label: 'Cost Savings' },
                { value: '100%', label: 'Transparency' }
            ],
            cta: 'See Cooperative Solutions'
        },
        {
            icon: Building,
            title: 'Agribusiness Enterprises',
            description: 'Enterprise-grade solutions for large-scale farming and agricultural corporations.',
            color: 'from-primary to-secondary',
            bgColor: 'bg-primary/10',
            features: [
                'Supply chain management',
                'Multi-location operations',
                'Advanced analytics & BI',
                'Custom reporting',
                'Enterprise security'
            ],
            stats: [
                { value: '3x', label: 'Faster Scaling' },
                { value: '45%', label: 'Revenue Growth' },
                { value: '99%', label: 'Operational Uptime' }
            ],
            cta: 'Explore Enterprise Tools'
        }
    ]

    const successStories = [
        {
            name: 'Green Valley Poultry',
            industry: 'Commercial Layer Farm',
            result: 'Increased egg production by 35% and reduced feed costs by 20%',
            metrics: '10,000+ birds managed'
        },
        {
            name: 'Mukhtar Farmers Cooperative',
            industry: 'Agricultural Cooperative',
            result: 'Streamlined operations across 25 member farms, increasing collective revenue by 60%',
            metrics: '5 branches coordinated'
        },
        {
            name: 'Chirchir Enterprises',
            industry: 'Dairy Farming',
            result: 'Improved milk yield by 30% and enhanced herd health monitoring',
            metrics: '50+ cattle managed'
        }
    ]

    return (
        <section id="industries" className="py-6 lg:py-16 bg-gradient-to-b from-background to-primary/5">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center max-w-4xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <TrendingUp className="w-4 h-4" />
                        Industry Solutions
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                        Built for Every Agricultural Sector
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Shamba Track provides specialized solutions tailored to the unique needs 
                        of different agricultural operations across Kenya and beyond.
                    </p>
                </motion.div>

                {/* Industries Grid */}
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
                    {industries.map((industry, index) => (
                        <motion.div
                            key={industry.title}
                            className="group bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden hover:bg-card hover:shadow-2xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-2"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Header */}
                            <div className={`p-6 bg-gradient-to-r ${industry.color} text-white`}>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <industry.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold">{industry.title}</h3>
                                </div>
                                <p className="text-white/90 text-sm leading-relaxed">
                                    {industry.description}
                                </p>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Features */}
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
                                    {industry.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-success rounded-full flex-shrink-0"></div>
                                            <span className="text-sm text-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {industry.stats.map((stat, statIndex) => (
                                        <div key={statIndex} className="text-center">
                                            <div className="text-lg font-bold text-primary">{stat.value}</div>
                                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <Button
                                    size="sm"
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 group"
                                    onClick={() => navigate('/solutions')}
                                >
                                    {industry.cta}
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Success Stories */}
                <motion.div
                    className="max-w-6xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                            Success Stories from Our Farmers
                        </h3>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            See how agricultural businesses are transforming their operations with Shamba Track.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {successStories.map((story, index) => (
                            <motion.div
                                key={story.name}
                                className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground">{story.name}</h4>
                                        <p className="text-sm text-muted-foreground">{story.industry}</p>
                                    </div>
                                </div>
                                <p className="text-foreground mb-4 leading-relaxed">
                                    {story.result}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                                    <BarChart3 className="w-4 h-4" />
                                    {story.metrics}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Industries