import React, { useState, useEffect } from 'react';
import FarmerDashboardLayout from './components/FarmerDashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { advisorService } from '../../services/advisorService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, Calendar, MapPin, Sprout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIFarmingAdvisor() {
  const { user } = useAuth();
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdvice = async () => {
    setLoading(true);
    setError(null);
    try {
      const location = user?.location || 'Nairobi';
      const response = await advisorService.getAdvice(location);
      if (response.success) {
        setAdvice(response.data);
      } else {
        setError(response.message || 'Failed to fetch advice');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, [user?.location]);

  return (
    <FarmerDashboardLayout title="AI Farming Advisor">
      <div className="space-y-6">
        <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="text-accent h-8 w-8" /> 
              Strategic Agricultural Overviews
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mt-2">
              Based on real-time weather analytics and regional contextual data, this AI-driven strategy offers short-term actions and long-term sustainable agricultural planning.
            </p>
          </div>
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-accent rounded-full opacity-20 blur-3xl"></div>
        </div>

        <Card className="border-none shadow-md rounded-2xl overflow-hidden min-h-[400px]">
          <CardHeader className="border-b border-border/50 pb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">Detailed Farm Analysis</CardTitle>
                <CardDescription>Location: {user?.location || 'Nairobi'}</CardDescription>
              </div>
              <Button 
                variant="outline" 
                onClick={fetchAdvice} 
                disabled={loading}
                className="rounded-full"
              >
                {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Sparkles size={16} className="mr-2 text-primary" />}
                Refresh Strategy
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-20 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <Loader2 className="h-12 w-12 text-primary animate-spin" />
                  <p className="text-sm font-medium text-muted-foreground animate-pulse">
                    Synthesizing environmental data and generating strategic overview...
                  </p>
                </motion.div>
              )}

              {error && !loading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center"
                >
                  <p className="text-sm text-destructive font-bold mb-4">{error}</p>
                  <Button onClick={fetchAdvice} className="rounded-full">Try Again</Button>
                </motion.div>
              )}

              {advice && !loading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 text-base leading-relaxed text-foreground/90 shadow-sm">
                    "{advice.summaryStatement}"
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Now */}
                    <Card className="bg-background shadow-sm border-t-4 border-t-success hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                          Action Now
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-foreground/80">{advice.now}</p>
                      </CardContent>
                    </Card>

                    {/* Monthly */}
                    <Card className="bg-background shadow-sm border-t-4 border-t-secondary hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2 text-secondary">
                          <Calendar className="h-4 w-4" />
                          Next Months
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-foreground/80">{advice.nextMonths}</p>
                      </CardContent>
                    </Card>

                    {/* Yearly */}
                    <Card className="bg-background shadow-sm border-t-4 border-t-accent hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2 text-accent">
                          <Sprout className="h-4 w-4" />
                          Strategic Vision
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-foreground/80">{advice.nextYear}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recommended Crops */}
                    <div className="bg-secondary/5 p-6 rounded-2xl border border-secondary/10">
                      <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
                        <Sprout className="h-5 w-5" /> Optimal Crops for your Region
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {advice.crops?.map((crop, i) => (
                          <span 
                            key={i} 
                            className="px-4 py-2 bg-background rounded-full text-sm font-bold border border-secondary/20 text-secondary shadow-sm"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Weather Insight */}
                    <div className="bg-muted/30 p-6 rounded-2xl flex flex-col justify-center border border-muted">
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Climate Insight</h3>
                      <p className="text-sm text-foreground/80">
                        {advice.weatherSummary}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </FarmerDashboardLayout>
  );
}
