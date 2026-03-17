import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { advisorService } from '@/services/advisorService';
import { Sparkles, Loader2, Calendar, MapPin, Sprout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIAdvisor({ location }) {
  const navigate = useNavigate();
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdvice = async () => {
    setLoading(true);
    setError(null);
    try {
      const getPosition = () => new Promise((resolve, reject) => {
        if (!navigator.geolocation) reject('Geolocation not supported by this browser.');
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      let query = location || 'Nairobi';
      try {
        const position = await getPosition();
        query = `${position.coords.latitude},${position.coords.longitude}`;
      } catch (geoErr) {
        console.warn('Geolocation failed or denied, relying on default location.');
      }

      const apiKey = import.meta.env.VITE_WEATHER_API_KEY || '98726c97c1bc43708c5111231261003';
      const weatherRes = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=3&aqi=no&alerts=no`);
      
      if (!weatherRes.ok) {
        throw new Error('Could not fetch real-time weather from Weather API');
      }
      
      const weatherData = await weatherRes.json();
      const locName = weatherData.location.name;
      const forecastText = weatherData.forecast.forecastday.map(d => `${d.date}: ${d.day.condition.text}, Max: ${d.day.maxtemp_c}°C`).join('; ');

      const response = await advisorService.getAdviceFromRealTime({
        location: locName,
        condition: weatherData.current.condition.text,
        temp: weatherData.current.temp_c,
        humidity: weatherData.current.humidity,
        forecastText
      });

      if (response.success) {
        setAdvice(response.data);
      } else {
        setError(response.message || 'Failed to fetch AI analysis');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col border-none shadow-xl rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 border-l-4 border-primary">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Sparkles className="text-primary h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Farming Advisor</CardTitle>
              <CardDescription className="text-xs">Smart recommendations based on real-time weather</CardDescription>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={fetchAdvice} 
            disabled={loading}
            className="text-primary hover:bg-primary/10 rounded-full text-xs font-bold"
          >
            {loading ? <Loader2 size={14} className="animate-spin mr-2" /> : <Sparkles size={14} className="mr-2" />}
            {advice ? 'Refresh' : 'Get Advice'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {!advice && !loading && !error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center">
                <MapPin className="text-primary/40 h-8 w-8" />
              </div>
              <p className="text-sm text-muted-foreground max-w-[240px]">
                Click generate to get AI-powered recommendations for your farm in <strong>{location || 'Nairobi'}</strong>
              </p>
              <Button onClick={fetchAdvice} className="rounded-full px-8 bg-primary hover:bg-primary/90 font-bold">
                Generate Analysis
              </Button>
            </motion.div>
          )}

          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="relative">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-accent animate-pulse" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-foreground animate-pulse">
                  Detecting your GPS location...
                </p>
                <p className="text-xs text-muted-foreground">
                  Fetching live weather → generating insights
                </p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 text-center"
            >
              <p className="text-sm text-destructive font-medium mb-4">{error}</p>
              <Button variant="outline" size="sm" onClick={fetchAdvice} className="rounded-full">
                Try Again
              </Button>
            </motion.div>
          )}

          {advice && !loading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-2"
            >
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 text-sm leading-relaxed text-foreground/90">
                "{advice.summaryStatement}"
              </div>

              <div className="flex justify-center mt-4">
                <Button 
                  onClick={() => navigate('/ai-farming-advisor')} 
                  className="rounded-full px-8 bg-primary hover:bg-primary/90 font-bold"
                >
                  View Full Strategic Overview
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
