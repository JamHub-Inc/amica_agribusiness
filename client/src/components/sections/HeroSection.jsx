import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronLeft, ChevronRight, Sprout, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import slide1 from "./HeroImages/Shamba-Track Poultry.jpg";
import slide2 from "./HeroImages/Cattle.jpg";
import slide3 from "./HeroImages/crop.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      background: slide1,
      title: "Empower Your Farm with",
      highlight: "Smart Management",
      description: "From planting to harvest, track crop activities, monitor input usage, and analyze yields with precision farming tools.",
      stats: { farms: "50+", counties: "20+", satisfaction: "98%" },
      cta: "Start Free Trial"
    },
    {
      background: slide2,
      title: "Optimize Your",
      highlight: "Livestock Operations",
      description: "Manage poultry and cattle farming efficiently with real-time monitoring, health tracking, and productivity analysis.",
      stats: { farms: "100+", animals: "1k+", efficiency: "80%" },
      cta: "Explore Features"
    },
    {
      background: slide3,
      title: "Grow Your",
      highlight: "Agribusiness",
      description: "Coordinate multiple farms, manage cooperatives, and scale your agricultural enterprise with enterprise-grade tools.",
      stats: { cooperatives: "10+", revenue: "85%", growth: "3x" },
      cta: "View Solutions"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-primary">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <div className="relative w-full h-full">
              <img
                src={slide.background}
                alt={`AgriSync - ${slide.title}`}
                className="w-full h-full object-cover brightness-[0.4]"
              />
              {/* Removed overlay to show full image clarity */}
            </div>
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-3 bg-white/20 px-6 py-2.5 rounded-full border border-white/30 shadow-xl">
              <Sprout className="w-5 h-5 text-accent" />
              <span className="text-sm font-bold text-white tracking-wide uppercase">Trusted by {slides[currentSlide].stats.farms} Farms</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight tracking-tight">
              <span className="block mb-2">{slides[currentSlide].title}</span>
              <span className="block text-accent">
                {slides[currentSlide].highlight}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Button
              className="btn-hero min-w-[200px] border-none shadow-glow hover:shadow-glow-accent group"
              onClick={() => navigate('/signup')}
            >
              <span className="flex items-center">
                {slides[currentSlide].cta}
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Button>
            <Button
              className="btn-outline-hero min-w-[200px] border-2 border-white/40 group"
              onClick={() => navigate('/auth/login')}
            >
              <span className="flex items-center">
                <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </span>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-8 md:gap-12 max-w-3xl mx-auto mb-16">
            {Object.entries(slides[currentSlide].stats).map(([key, value]) => (
              <div
                key={key}
                className="text-center group"
              >
                <div className="text-3xl md:text-5xl font-extrabold text-accent mb-2 drop-shadow-md">{value}</div>
                <div className="text-xs md:text-sm font-bold text-white/80 uppercase tracking-widest leading-none">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-8">
        <button
          onClick={prevSlide}
          className="p-3 rounded-xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all duration-300 group shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex gap-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-accent scale-150 shadow-glow shadow-accent/50"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 rounded-xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all duration-300 group shadow-lg"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
