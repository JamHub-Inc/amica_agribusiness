import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Features', path: '#features' },
        { name: 'Process', path: '#how-it-works' },
        { name: 'Impact', path: '#impact' },
    ];

    const containerVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    }

    const linkVariants = {
        idle: { scale: 1 },
        hover: { scale: 1.05, transition: { duration: 0.2 } },
    }

    const mobileMenuVariants = {
        hidden: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                ease: 'easeInOut',
            },
        },
        visible: {
            opacity: 1,
            height: 'auto',
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
    }

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm py-4 transition-all duration-300"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <motion.div 
                            className="flex items-center gap-3"
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                        >
                            <img 
                                src="https://res.cloudinary.com/dvkt0lsqb/image/upload/v1772099480/AmicaLogo-removebg-preview_y4gzdc.png" 
                                alt="AgriSync Logo" 
                                className="h-10 w-auto object-contain"
                            />
                            <span className="text-2xl font-bold text-primary tracking-tight">
                                AgriSync
                            </span>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navItems.map((item) => (
                            <motion.div
                                key={item.name}
                                variants={linkVariants}
                                initial="idle"
                                whileHover="hover"
                            >
                                <a
                                    href={item.path}
                                    className={`relative text-base font-bold transition-colors duration-300 ${
                                        location.hash === item.path || location.pathname === item.path
                                            ? 'text-primary' 
                                            : 'text-muted-foreground hover:text-primary'
                                    }`}
                                >
                                    {item.name}
                                    {(location.hash === item.path || location.pathname === item.path) && (
                                        <motion.div
                                            className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full"
                                            layoutId="activeTab"
                                            initial={{ opacity: 0, scaleX: 0 }}
                                            animate={{ opacity: 1, scaleX: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </a>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/login" className="no-underline">
                            <Button
                                variant="ghost"
                                className="text-foreground font-bold hover:bg-primary/5 hover:text-primary rounded-xl"
                            >
                                Sign In
                            </Button>
                        </Link>
                        <Link to="/register" className="no-underline">
                            <Button
                                className="bg-primary text-primary-foreground font-bold hover:bg-primary/90 px-8 rounded-xl shadow-lg shadow-primary/10 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden p-2 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="h-6 w-6 text-primary" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="h-6 w-6 text-primary" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="md:hidden mt-4"
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl">
                                <div className="space-y-4">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <a
                                                href={item.path}
                                                className={`block py-3 px-4 rounded-xl font-bold transition-all duration-200 ${
                                                    location.pathname === item.path
                                                        ? 'text-primary bg-primary/10'
                                                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                                                }`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.name}
                                            </a>
                                        </motion.div>
                                    ))}
                                    <motion.div
                                        className="pt-6 border-t border-border space-y-4 flex flex-col"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <Link to="/login">
                                            <Button
                                                variant="outline"
                                                className="w-full border-border font-bold rounded-xl"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Sign In
                                            </Button>
                                        </Link>
                                        <Link to="/register">
                                            <Button
                                                className="w-full bg-primary text-primary-foreground font-bold rounded-xl"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Get Started
                                            </Button>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}

export default Navigation
