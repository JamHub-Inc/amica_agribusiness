import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check, Star, Zap, Crown, Sprout } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Pricing = () => {
    const navigate = useNavigate()
    const [billingPeriod, setBillingPeriod] = useState('monthly')

    const plans = [
        {
            name: 'Starter',
            description: 'Perfect for small-scale farmers and individual operations',
            monthlyPrice: 2500,
            annualPrice: 25000,
            savings: 17,
            icon: Sprout,
            color: 'from-success to-primary',
            popular: false,
            features: [
                'Single branch management',
                'Basic flock tracking (up to 500 birds)',
                'Mobile app access',
                'Email support',
                'Basic analytics & reports',
                'M-Pesa payment integration',
                '1 user account'
            ],
            cta: 'Start Free Trial',
            highlighted: false
        },
        {
            name: 'Professional',
            description: 'Ideal for growing farms and small cooperatives',
            monthlyPrice: 7500,
            annualPrice: 75000,
            savings: 17,
            icon: Zap,
            color: 'from-accent to-success',
            popular: true,
            features: [
                'Up to 3 branches',
                'Advanced flock management',
                'Real-time inventory sync',
                'Online store with M-Pesa',
                'Priority email & chat support',
                'Advanced analytics & KPIs',
                'Multi-user access (up to 5 users)',
                'Health & vaccination tracking',
                'Basic cooperative features'
            ],
            cta: 'Get Started',
            highlighted: true
        },
        {
            name: 'Enterprise',
            description: 'For large agribusiness and agricultural cooperatives',
            monthlyPrice: 25000,
            annualPrice: 250000,
            savings: 17,
            icon: Crown,
            color: 'from-primary to-secondary',
            popular: false,
            features: [
                'Unlimited branches',
                'Full cooperative management',
                'Advanced supply chain tracking',
                'Custom reporting & analytics',
                'Dedicated account manager',
                'API access & integrations',
                'Unlimited users',
                'White-label options',
                'Onboarding & training',
                'SLA guarantee'
            ],
            cta: 'Contact Sales',
            highlighted: false
        }
    ]

    return (
        <section id="pricing" className="py-6 lg:py-16 bg-gradient-to-b from-background to-primary/5">
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
                        <Star className="w-4 h-4" />
                        Transparent Pricing
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                        Simple, Flexible Pricing Plans
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Choose the plan that works best for your agricultural operation. 
                        All plans include our core features with no hidden fees.
                    </p>
                </motion.div>

                {/* Billing Toggle */}
                <motion.div
                    className="flex justify-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-2 flex items-center gap-2">
                        <button
                            onClick={() => setBillingPeriod('monthly')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                billingPeriod === 'monthly'
                                    ? 'bg-primary text-primary-foreground shadow-lg'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingPeriod('annually')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                billingPeriod === 'annually'
                                    ? 'bg-primary text-primary-foreground shadow-lg'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Annually
                            <span className="ml-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold">
                                Save 17%
                            </span>
                        </button>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            className={`relative rounded-3xl border-2 transition-all duration-300 ${
                                plan.highlighted
                                    ? 'border-accent bg-card shadow-2xl scale-105'
                                    : 'border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl'
                            }`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: plan.highlighted ? 1.03 : 1.02 }}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-gradient-to-r from-accent to-success text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <div className="p-8">
                                {/* Plan Header */}
                                <div className="text-center mb-8">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                                        <plan.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                                    <p className="text-muted-foreground">{plan.description}</p>
                                </div>

                                {/* Price */}
                                <div className="text-center mb-8">
                                    <div className="flex items-baseline justify-center gap-2 mb-2">
                                        <span className="text-4xl lg:text-5xl font-bold text-foreground">
                                            KSh {billingPeriod === 'monthly' ? plan.monthlyPrice.toLocaleString() : plan.annualPrice.toLocaleString()}
                                        </span>
                                        <span className="text-muted-foreground">
                                            /{billingPeriod === 'monthly' ? 'month' : 'year'}
                                        </span>
                                    </div>
                                    {billingPeriod === 'annually' && (
                                        <p className="text-sm text-success font-medium">
                                            Save KSh {(plan.monthlyPrice * 12 - plan.annualPrice).toLocaleString()} annually
                                        </p>
                                    )}
                                </div>

                                {/* Features */}
                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-center gap-3">
                                            <Check className="w-5 h-5 text-success flex-shrink-0" />
                                            <span className="text-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <Button
                                    size="lg"
                                    className={`w-full font-bold py-6 rounded-xl transition-all duration-300 ${
                                        plan.highlighted
                                            ? 'bg-gradient-to-r from-accent to-success hover:from-accent/90 hover:to-success/90 text-accent-foreground hover:shadow-2xl hover:scale-105'
                                            : 'bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-xl'
                                    }`}
                                    onClick={() => navigate(plan.name === 'Enterprise' ? '/contact' : '/auth/signup')}
                                >
                                    {plan.cta}
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Pricing