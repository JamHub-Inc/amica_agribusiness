import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CloudRain, MapPin, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '98726c97c1bc43708c5111231261003';

export default function WeatherForecast() {
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState('idle'); // idle | requesting | granted | denied
  const [error, setError] = useState(null);

  const fetchWeatherByCoords = async (lat, lon) => {
    setWeatherLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&aqi=no`
      );
      if (!response.ok) throw new Error(`Weather API error: ${response.statusText}`);
      const data = await response.json();
      setWeather({
        temp: data.current.temp_c,
        feelsLike: data.current.feelslike_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        location: data.location.name,
        region: data.location.region,
        country: data.location.country,
        humidity: data.current.humidity,
        windKph: data.current.wind_kph,
        lastUpdated: data.current.last_updated,
      });
    } catch (err) {
      setError('Failed to fetch weather. Please try again.');
      console.error('WeatherAPI error:', err);
    } finally {
      setWeatherLoading(false);
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('denied');
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setLocationStatus('requesting');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus('granted');
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setLocationStatus('denied');
        console.warn('Geolocation denied:', err.message);
        setError('Location access denied. Using regional default.');
        // fallback to Nairobi coords
        fetchWeatherByCoords(-1.2921, 36.8219);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Auto-request on mount
  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <Card className="border-none shadow-md rounded-2xl bg-primary border-l-4 border-secondary overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2 text-white">
            <CloudRain className="text-accent h-4 w-4" />
            Weather Forecast
          </CardTitle>
          <div className="flex items-center gap-2">
            {locationStatus === 'granted' && (
              <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                <MapPin className="h-3 w-3 text-accent" />
                <span className="text-[10px] text-white font-medium">GPS</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
              onClick={requestLocation}
              title="Refresh current location weather"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${weatherLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        {/* Permission request state */}
        {locationStatus === 'idle' && !weatherLoading && !weather && (
          <div className="flex flex-col items-center justify-center py-6 gap-3">
            <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
            <p className="text-xs text-white/80 text-center max-w-[180px]">
              Allow location access to get real-time weather for your exact farm location.
            </p>
            <Button onClick={requestLocation} size="sm" className="bg-accent text-accent-foreground hover:bg-accent/80 font-medium rounded-full px-6 text-xs">
              Allow Location
            </Button>
          </div>
        )}

        {/* Requesting / loading state */}
        {(locationStatus === 'requesting' || weatherLoading) && (
          <div className="animate-pulse flex justify-between py-2">
            <div>
              <div className="h-9 w-16 bg-white/20 rounded mb-2"></div>
              <div className="h-3 w-24 bg-white/20 rounded mb-1"></div>
              <div className="h-3 w-16 bg-white/20 rounded"></div>
            </div>
            <div className="text-right flex flex-col items-end gap-2 mt-1">
              <div className="h-3 w-28 bg-white/20 rounded"></div>
              <div className="h-3 w-20 bg-white/20 rounded"></div>
              <div className="h-3 w-16 bg-white/20 rounded"></div>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && !weatherLoading && (
          <div className="flex flex-col gap-2 py-3">
            <p className="text-xs text-white/70 text-center">{error}</p>
            <Button onClick={requestLocation} size="sm" variant="ghost" className="text-accent hover:bg-white/10 text-xs font-medium mx-auto rounded-full">
              Try Again
            </Button>
          </div>
        )}

        {/* Live weather data */}
        {weather && !weatherLoading && (
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl text-accent font-serif tracking-tight">{weather.temp}°C</h3>
                  {weather.icon && (
                    <img src={`https:${weather.icon}`} alt={weather.condition} className="h-8 w-8 -mt-1" />
                  )}
                </div>
                <p className="text-xs text-white/90 font-normal mt-0.5">{weather.condition}</p>
                <p className="text-[10px] text-white/60 mt-0.5">Feels like {weather.feelsLike}°C</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white font-medium flex items-center justify-end gap-1">
                  <MapPin className="h-3 w-3 text-accent" />
                  {weather.location}
                </p>
                {weather.region && <p className="text-[10px] text-white/60">{weather.region}</p>}
                <p className="text-[10px] text-white/60">{weather.country}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
              <div className="bg-white/10 rounded-xl px-3 py-2">
                <p className="text-[10px] text-white/60 uppercase tracking-wider font-normal">Humidity</p>
                <p className="text-sm text-accent font-serif mt-0.5">{weather.humidity}%</p>
              </div>
              <div className="bg-white/10 rounded-xl px-3 py-2">
                <p className="text-[10px] text-white/60 uppercase tracking-wider font-normal">Wind</p>
                <p className="text-sm text-accent font-serif mt-0.5">{weather.windKph} km/h</p>
              </div>
            </div>

            {weather.lastUpdated && (
              <p className="text-[9px] text-white/30 text-right">Updated: {weather.lastUpdated}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
