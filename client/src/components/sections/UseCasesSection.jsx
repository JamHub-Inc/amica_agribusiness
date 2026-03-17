import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Building,
    Home,
    Truck,
    Factory,
    Stethoscope,
    ChevronDown,
    ChevronUp,
    CheckCircle,
    Users,
    BarChart3,
    Smartphone,
} from 'lucide-react'

const useCases = [
    {
        icon: Home,
        title: 'Single Outlet Chemists',
        description:
            'Perfect for independent pharmacies across Kenya looking to modernize their operations with comprehensive POS and inventory management.',
        features: [
            'Basic POS System',
            'Inventory Tracking',
            'Customer Management',
            'Financial Reports',
        ],
        color: 'blue',
    },
    {
        icon: Building,
        title: 'Multi-branch Pharmacies',
        description:
            'Scale your Kenyan pharmacy chain with centralized management, real-time synchronization, and unified reporting across all locations.',
        features: [
            'Multi-branch Sync',
            'Centralized Inventory',
            'Consolidated Reporting',
            'Role-based Access',
        ],
        color: 'purple',
    },
    {
        icon: Truck,
        title: 'Wholesale Pharmaceutical Distributors',
        description:
            'Manage large-scale distribution operations in Kenya with advanced inventory control, bulk operations, and supplier management.',
        features: ['Bulk Operations', 'Supplier Management', 'Advanced Analytics', 'B2B Portal'],
        color: 'green',
    },
    {
        icon: Factory,
        title: 'Production & Compounding Labs',
        description:
            'Specialized tools for pharmaceutical production in Kenya, compounding workflows, batch tracking, and quality control processes.',
        features: ['Production Planning', 'Batch Tracking', 'Quality Control', 'Compliance Tools'],
        color: 'orange',
    },
    {
        icon: Stethoscope,
        title: 'Clinic Management',
        description:
            'Comprehensive clinic management solution for small to medium healthcare facilities in Kenya, integrating patient records with pharmacy operations.',
        features: [
            'Patient Records',
            'Appointment Scheduling',
            'Treatment History',
            'Integrated Billing',
        ],
        color: 'red',
    },
]

const colorMap = {
    blue: {
        light: 'bg-blue-50',
        medium: 'bg-blue-100',
        dark: 'bg-blue-500',
        text: 'text-blue-700',
        border: 'border-blue-200',
    },
    purple: {
        light: 'bg-purple-50',
        medium: 'bg-purple-100',
        dark: 'bg-purple-500',
        text: 'text-purple-700',
        border: 'border-purple-200',
    },
    green: {
        light: 'bg-green-50',
        medium: 'bg-green-100',
        dark: 'bg-green-500',
        text: 'text-green-700',
        border: 'border-green-200',
    },
    orange: {
        light: 'bg-orange-50',
        medium: 'bg-orange-100',
        dark: 'bg-orange-500',
        text: 'text-orange-700',
        border: 'border-orange-200',
    },
    red: {
        light: 'bg-red-50',
        medium: 'bg-red-100',
        dark: 'bg-red-500',
        text: 'text-red-700',
        border: 'border-red-200',
    },
}

const stats = [
    { icon: Users, value: '500+', label: 'Businesses Using Our System' },
    { icon: BarChart3, value: 'KES 30M+', label: 'Revenue Managed Monthly' },
    { icon: Smartphone, value: '98%', label: 'Customer Satisfaction' },
]

const UseCaseCard = ({ useCase, index }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const colors = colorMap[useCase.color]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`rounded-xl overflow-hidden shadow-lg ${colors.border} border-2 transition-all duration-300 hover:shadow-xl`}
            whileHover={{ y: -5 }}
        >
            <div
                className={`p-6 ${colors.light} cursor-pointer`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${colors.medium} inline-flex`}>
                        <useCase.icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                        {isExpanded ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </div>

                <h3 className="text-xl font-bold mt-4 text-gray-800">{useCase.title}</h3>
                <p className="text-gray-600 mt-2">{useCase.description}</p>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4"
                        >
                            <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                            <ul className="space-y-2">
                                {useCase.features.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start"
                                    >
                                        <CheckCircle
                                            className={`h-5 w-5 mt-0.5 mr-2 ${colors.text} flex-shrink-0`}
                                        />
                                        <span className="text-gray-700">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

const UseCasesSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                        Designed for Every
                        <span className="block bg-clip-text text-transparent bg-primary">
                            Pharmaceutical Business in Kenya
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        From small chemist shops in Nairobi to large distributors across East
                        Africa, our platform adapts to your unique business needs.
                    </p>
                </motion.div>

                {/* Use Cases Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {useCases.map((useCase, index) => (
                        <UseCaseCard key={index} useCase={useCase} index={index} />
                    ))}
                </div>

                {/* Stats Section */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    className="bg-primary rounded-2xl p-8 md:p-12 text-white overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                    Join Kenya's Leading Pharmaceutical Businesses
                                </h3>
                                <p className="text-blue-100 mb-6">
                                    From small chemist shops in Nairobi to large pharmaceutical
                                    chains across East Africa, businesses trust our platform to
                                    streamline their operations and boost profitability.
                                </p>
                                <a
                                    href="/auth/signup"
                                    className="no-underline hover:no-underline hover:text-white"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-md"
                                    >
                                        Start Your Free Trial Today
                                    </motion.button>
                                </a>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <div className="text-2xl font-bold">30+</div>
                                    <div className="text-sm">Cities Served</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <div className="text-2xl font-bold">24/7</div>
                                    <div className="text-sm">Support</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <div className="text-2xl font-bold">99.9%</div>
                                    <div className="text-sm">Uptime</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <div className="text-2xl font-bold">100%</div>
                                    <div className="text-sm">Compliance</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 right-0 h-32 bg-white"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-white"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default UseCasesSection
