import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, UserPlus, Settings, LineChart } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: "Sign Up & Setup",
    description: "Create your digital profile, connect your farm with a local SACCO, and onboard your team in minutes.",
    icon: UserPlus,
    imageUrl: "https://res.cloudinary.com/dvkt0lsqb/image/upload/v1772103646/20260226_0225_Image_Generation_remix_01kjcqktbtfw6ataybc6pj4tt4_1_gozwvh.png",
  },
  {
    number: 2,
    title: "Log & Monitor",
    description: "Input harvest data, monitor real-time market prices, and coordinate supply availability with verified buyers.",
    icon: Settings,
    imageUrl: "https://res.cloudinary.com/dvkt0lsqb/image/upload/v1772101323/20260226_0214_Image_Generation_remix_01kjcq0vtafjcrff43798b9g7w_k7bcl3.png",
  },
  {
    number: 3,
    title: "Trade & Grow",
    description: "Access financial support, fulfill orders at competitive rates, and grow your agribusiness with data-driven insights.",
    icon: LineChart,
    imageUrl: "https://res.cloudinary.com/dvkt0lsqb/image/upload/v1772101367/20260226_0217_Image_Generation_remix_01kjcq6gapfnws137xqgghm9q3_zzyusj.png",
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-background">
      {/* Background soft shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20 text-balance">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
             <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              The Process
            </span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl text-foreground font-bold mb-4 tracking-tight mt-6">
            Simple Process To Get
            <span className="text-primary block mt-1">
              Started with AgriSync
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            We've made it easy to start—no tech team required. 
            Streamline your farm coordination and trading in three powerful steps.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Wavy Path (visible on desktop) */}
          <div className="hidden lg:block absolute top-[15%] left-0 w-full h-24 pointer-events-none">
            <svg viewBox="0 0 1000 100" className="w-full h-full fill-none stroke-secondary/20 stroke-[3] stroke-dasharray-[10,10]">
              <path d="M150,50 Q300,0 450,50 T750,50" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Illustration Render */}
                  <div className="relative mb-8 h-48 md:h-56 flex items-center justify-center">
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="relative z-10 w-full h-full flex items-center justify-center"
                    >
                      {step.imageUrl ? (
                        <img 
                          src={step.imageUrl} 
                          alt={step.title} 
                          className="max-w-[200px] md:max-w-[240px] w-full h-auto drop-shadow-2xl"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-[2rem] bg-secondary/10 flex items-center justify-center text-secondary shadow-lg">
                          <Icon size={64} strokeWidth={1.5} />
                        </div>
                      )}
                      
                      {/* Floating particles (Anime-inspired) */}
                      <motion.div 
                        animate={{ y: [-10, 10, -10], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -top-4 -right-4 w-16 h-16 bg-primary/5 rounded-full blur-2xl" 
                      />
                    </motion.div>
                    
                    {/* Connection line dot */}
                    <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-3 h-3 rounded-full bg-secondary" />
                  </div>

                  {/* Step Label */}
                  <div className="mb-6 relative z-10">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-all duration-500">
                      <span className="text-xl font-bold text-primary-foreground">
                        {String(step.number).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="px-4">
                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Global CTA Button */}
        <div className="mt-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="/auth/signup"
              className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg shadow-glow hover:shadow-lg transition-all group relative overflow-hidden"
            >
              <span className="relative z-10">Get Started Now</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

