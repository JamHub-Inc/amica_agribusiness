import React from 'react'
import { motion } from 'framer-motion'
import { 
  UserCircle, 
  Users, 
  Settings,
  CheckCircle2
} from 'lucide-react'

const WhoWeServe = () => {
    const segments = [
        {
            icon: UserCircle,
            title: 'Farmers',
            description: 'The heartbeat of the system. We provide tools for those at the primary production level.',
            benefits: [
                'Access fair pricing',
                'Track produce digitally',
                'Reduce exploitation',
                'Receive structured SACCO support'
            ]
        },
        {
            icon: Users,
            title: 'SACCO Supervisors',
            description: 'Coordinating growth and financial accessibility for agricultural communities.',
            benefits: [
                'Monitor farmer production',
                'Approve and manage loans',
                'Analyze supply trends',
                'Improve coordination efficiency'
            ]
        },
        {
            icon: Settings,
            title: 'System Administrators',
            description: 'Ensuring system integrity, transparency, and high performance.',
            benefits: [
                'Manage users and permissions',
                'Monitor system performance',
                'Ensure transparency',
                'Data integrity maintenance'
            ]
        }
    ]

    return (
        <section id="who-we-serve" className="py-24 lg:py-32 bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                    className="text-center max-w-4xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Built for the <span className="text-primary">Agricultural Value Chain</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Our platform connects every stakeholder in the ecosystem, fostering a culture of transparency and shared success.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {segments.map((segment, index) => (
                        <motion.div
                            key={segment.title}
                            className="relative bg-card border border-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                    <segment.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">{segment.title}</h3>
                            </div>

                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                {segment.description}
                            </p>

                            <ul className="space-y-4">
                                {segment.benefits.map((benefit, bIndex) => (
                                    <li key={bIndex} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-foreground/80 font-medium">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhoWeServe

