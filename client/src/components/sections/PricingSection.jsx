import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Check,
    X,
    Zap,
    Crown,
    Building,
    ArrowRight,
    Star,
    Calendar,
    Users,
    BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const pricingData = {
    quarterly: { basic: 7500, standard: 13500, premium: 19500 },
    biannual: { basic: 13500, standard: 24300, premium: 35100 },
    yearly: { basic: 27000, standard: 48600, premium: 70200 },
}

const planFeatures = {
    basic: ['1 Admin & 2 Users', 'Basic Inventory Management', 'Customer Management', 'Basic Reports', 'Email Support', 'Cloud Backup'],
    standard: ['2 Admins & 5 Users', 'Advanced Inventory Control', 'Real-time Synchronization', 'Financial Management', 'Advanced Reports & Analytics', 'Priority Support', 'Automated Backups', 'Mobile App Access', 'Basic API Access'],
    premium: ['Unlimited Admins & Users', 'Complete ERP Suite', 'Advanced Production Management', 'Custom Integrations', 'Dedicated Account Manager', '24/7 Phone Support', 'Custom Reports', 'Unlimited Branches', 'On-premise Option', 'Full API Access', 'Training & Onboarding', 'Compliance Tools'],
}

const planLimitations = {
    basic: ['Multi-branch Sync', 'Advanced Analytics', 'API Access', 'Custom Integrations'],
    standard: ['Custom Integrations', 'Dedicated Account Manager'],
    premium: [],
}

const planIcons = { basic: Zap, standard: Crown, premium: Building }

const PricingSection = () => {
    const navigate = useNavigate()
    const [selectedPeriod, setSelectedPeriod] = useState('quarterly')
    const [hoveredPlan, setHoveredPlan] = useState(null)

    const handleSignupNavigation = () => navigate('/auth/signup')

    const billingOptions = [
        { value: 'quarterly', label: 'Quarterly', discount: '' },
        { value: 'biannual', label: 'Bi-Annual', discount: '10% off' },
        { value: 'yearly', label: 'Yearly', discount: '10% off' },
    ]

    const formatPrice = (price) => `KSh ${price.toLocaleString('en-KE')}`
    const getPlanPrice = (plan) => formatPrice(pricingData[selectedPeriod][plan])
    const getPlanPeriod = () => {
        switch (selectedPeriod) {
            case 'quarterly': return '/3 months'
            case 'biannual': return '/6 months'
            case 'yearly': return '/year'
            default: return ''
        }
    }

    const plans = [
        { name: 'Basic', description: 'Perfect for single outlet chemists and small pharmacies', popular: false, buttonText: 'Start your 7 day free trial', buttonVariant: 'outline', type: 'basic' },
        { name: 'Standard', description: 'Ideal for growing pharmacy chains and multi-branch operations', popular: true, buttonText: 'Start your 7 day free trial', buttonVariant: 'default', type: 'standard' },
        { name: 'Premium', description: 'For large distributors, wholesalers, and pharmaceutical companies', popular: false, buttonText: 'Start your 7 day free trial', buttonVariant: 'default', type: 'premium' },
    ]

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }
    const cardVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } } }

    return (
        <section id="pricing" className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Transparent Pricing for
                        <span className="text-primary block">Every Pharmacy</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                        Choose the perfect plan for your pharmacy needs in Kenya. Flexible billing options available.
                    </p>

                    {/* Billing Toggle */}
                    <motion.div className="flex justify-center mb-12" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}>
                        <div className="bg-muted rounded-2xl p-1 flex">
                            {billingOptions.map((option) => (
                                <motion.button
                                    key={option.value}
                                    onClick={() => setSelectedPeriod(option.value)}
                                    className={`px-6 py-2 rounded-xl transition-all capitalize relative ${
                                        selectedPeriod === option.value
                                            ? 'bg-gradient-to-r from-primary to-success text-primary-foreground shadow-lg'
                                            : 'text-muted-foreground hover:text-primary'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {option.label}
                                    {option.discount && (
                                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-gradient-to-r from-accent to-warning text-accent-foreground text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center">
                                            {option.discount}
                                        </motion.span>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {plans.map((plan, index) => {
                        const IconComponent = planIcons[plan.type]
                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                className={`relative rounded-2xl p-8 flex flex-col h-full border-2 ${
                                    plan.popular
                                        ? 'border-accent shadow-2xl transform scale-105 z-10 bg-gradient-to-b from-card to-accent/5'
                                        : 'border-border shadow-lg bg-card'
                                } transition-all duration-300 hover:shadow-xl`}
                                onMouseEnter={() => setHoveredPlan(plan.type)}
                                onMouseLeave={() => setHoveredPlan(null)}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-1 rounded-full text-sm font-semibold flex items-center">
                                        <Star className="w-4 h-4 mr-1 fill-current" />
                                        Most Popular
                                    </div>
                                )}

                                {(selectedPeriod === 'biannual' || selectedPeriod === 'yearly') && (
                                    <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} className="absolute -top-3 -right-3 bg-gradient-to-r from-accent to-warning text-accent-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
                                        10% OFF
                                    </motion.div>
                                )}

                                <div className="text-center mb-8">
                                    <motion.div
                                        animate={{ scale: hoveredPlan === plan.type ? 1.1 : 1, rotate: hoveredPlan === plan.type ? 5 : 0 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                                            plan.popular ? 'bg-primary/10' : plan.type === 'premium' ? 'bg-secondary/10' : 'bg-muted'
                                        }`}
                                    >
                                        <IconComponent className={`w-8 h-8 ${plan.popular ? 'text-primary' : plan.type === 'premium' ? 'text-secondary' : 'text-muted-foreground'}`} />
                                    </motion.div>
                                    <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-primary' : plan.type === 'premium' ? 'text-secondary' : 'text-foreground'}`}>
                                        {plan.name}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-4xl font-bold text-foreground">{getPlanPrice(plan.type)}</span>
                                        <span className="text-lg text-muted-foreground">{getPlanPeriod()}</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8 flex-grow">
                                    {planFeatures[plan.type].map((feature, featureIndex) => (
                                        <motion.div key={featureIndex} className="flex items-center space-x-3" whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                                            <Check className="w-5 h-5 flex-shrink-0 text-success" />
                                            <span className="text-foreground">{feature}</span>
                                        </motion.div>
                                    ))}
                                    {planLimitations[plan.type].map((limitation, limitIndex) => (
                                        <div key={limitIndex} className="flex items-center space-x-3 opacity-50">
                                            <X className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                                            <span className="text-muted-foreground line-through">{limitation}</span>
                                        </div>
                                    ))}
                                </div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <a href="/auth/signup" className="no-underline hover:no-underline">
                                        <Button onClick={handleSignupNavigation} className="w-full py-3 font-semibold rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground" variant={plan.popular ? 'default' : plan.buttonVariant}>
                                            {plan.buttonText}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </a>
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Stats Section */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-primary/5 rounded-2xl p-6 text-center">
                        <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">500+</h3>
                        <p className="text-muted-foreground">Pharmacies Using Our System</p>
                    </div>
                    <div className="bg-secondary/5 rounded-2xl p-6 text-center">
                        <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BarChart3 className="w-6 h-6 text-secondary" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">98%</h3>
                        <p className="text-muted-foreground">Customer Satisfaction Rate</p>
                    </div>
                    <div className="bg-success/5 rounded-2xl p-6 text-center">
                        <div className="bg-success/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-6 h-6 text-success" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">24/7</h3>
                        <p className="text-muted-foreground">Support Availability</p>
                    </div>
                </motion.div>

                {/* Feature Comparison */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} className="bg-muted rounded-2xl p-8 border border-border">
                    <h3 className="text-2xl font-bold text-center text-foreground mb-8">Plan Comparison</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-4 px-4 font-semibold text-foreground">Feature</th>
                                    <th className="text-center py-4 px-4 font-semibold text-foreground">Basic</th>
                                    <th className="text-center py-4 px-4 font-semibold text-primary">Standard</th>
                                    <th className="text-center py-4 px-4 font-semibold text-secondary">Premium</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {[
                                    ['POS System', true, true, true],
                                    ['Inventory Management', true, true, true],
                                    ['Multi-branch Sync', false, true, true],
                                    ['Advanced Analytics', false, true, true],
                                    ['API Access', false, 'Basic', 'Full'],
                                    ['Admins Included', '1', '2', 'Unlimited'],
                                    ['Users Included', '2', '5', 'Unlimited'],
                                    ['Branches Included', '1', '3', 'Unlimited'],
                                    ['Support', 'Email', 'Priority', '24/7 Phone'],
                                    ['Custom Integrations', false, false, true],
                                ].map(([feature, basic, standard, premium], index) => (
                                    <motion.tr key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="hover:bg-card">
                                        <td className="py-4 px-4 font-medium text-foreground">{feature}</td>
                                        <td className="py-4 px-4 text-center">
                                            {typeof basic === 'boolean' ? (basic ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />) : <span className="font-medium text-foreground">{basic}</span>}
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            {typeof standard === 'boolean' ? (standard ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />) : <span className="font-medium text-foreground">{standard}</span>}
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            {typeof premium === 'boolean' ? (premium ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />) : <span className="font-medium text-foreground">{premium}</span>}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Additional CTA */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-center mt-16">
                    <p className="text-muted-foreground mb-6">Not sure which plan is right for your pharmacy?</p>
                    <Button size="lg" className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 text-primary-foreground" onClick={handleSignupNavigation}>
                        Talk to our experts
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

export default PricingSection
