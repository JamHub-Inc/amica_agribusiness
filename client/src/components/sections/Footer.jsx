import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const Footer = () => {
    const getCurrentYear = () => new Date().getFullYear()

    return (
        <footer className="bg-foreground text-primary-foreground border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand & About */}
                    <div className="lg:pr-8">
                        <Link to="/" className="flex items-center space-x-3 mb-8">
                            <img 
                                src="https://res.cloudinary.com/dvkt0lsqb/image/upload/v1772099480/AmicaLogo-removebg-preview_y4gzdc.png" 
                                alt="AgriSync Logo" 
                                className="h-12 w-auto object-contain"
                            />
                            <span className="text-2xl font-bold tracking-tight">AgriSync</span>
                        </Link>
                        <h4 className="font-bold mb-4 text-white">Integrated Food Supply & Price Management System</h4>
                        <p className="text-primary-foreground/60 mb-8 leading-relaxed">
                            A SACCO-integrated digital platform designed to enhance transparency, 
                            coordination, and fair pricing in agricultural value chains.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-8">Quick Links</h3>
                        <ul className="space-y-4">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Market Prices', path: '/market-prices' },
                                { name: 'Loan Management', path: '/loans' },
                                { name: 'Produce Tracking', path: '/tracking' },
                                { name: 'Reports', path: '/reports' },
                                { name: 'Login', path: '/auth/login' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-primary-foreground/60 hover:text-accent transition-colors flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-accent/40 rounded-full" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* User Access */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-8">User Access</h3>
                        <ul className="space-y-4">
                            {[
                                { name: 'Farmer Registration', path: '/auth/signup?role=farmer' },
                                { name: 'Supervisor Login', path: '/auth/login?role=supervisor' },
                                { name: 'Admin Portal', path: '/auth/login?role=admin' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-primary-foreground/60 hover:text-accent transition-colors flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-success/40 rounded-full" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-8">Contact</h3>
                        <div className="space-y-6">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                <h4 className="font-bold text-accent mb-2">AMICA SACCO</h4>
                                <p className="text-xs text-primary-foreground/40 uppercase tracking-widest font-medium">
                                    Agricultural Support & Digital Systems Unit
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-accent" />
                                    </div>
                                    <span className="text-primary-foreground/70">support@agrisync.co.ke</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-accent" />
                                    </div>
                                    <span className="text-primary-foreground/70">+254 XXX XXX XXX</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 mt-20 pt-10 text-center md:text-left">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-primary-foreground/40 text-sm">
                            © {getCurrentYear()} Integrated Food Supply & Price Management System <br />
                            <span className="text-accent/60">Designed for Agricultural Empowerment</span>
                        </div>
                        <div className="flex space-x-8 text-sm font-medium">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
