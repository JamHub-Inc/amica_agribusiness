import React from 'react';
import FarmerDashboardLayout from './components/FarmerDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp, TrendingDown, Target, Zap, Waves, Sprout, ShoppingBag, Badge, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AIPriceInsights() {
  return (
    <FarmerDashboardLayout title="AI Price Insights">
      <div className="space-y-6">
        {/* Animated AI Header */}
        <div className="bg-gradient-to-r from-primary via-primary/90 to-accent p-1 rounded-3xl shadow-2xl overflow-hidden relative group">
          <div className="bg-background/95 rounded-[22px] p-8 relative z-10 overflow-hidden">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                   <div className="flex items-center gap-2">
                      <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Advanced Forecasting</span>
                   </div>
                   <h2 className="text-4xl font-black text-foreground tracking-tight leading-none">Price Predictive Analytics</h2>
                   <p className="text-sm font-medium text-muted-foreground/80 max-w-lg">
                     Our AI models analyze historical trends, weather patterns, and global market fluctuations to predict future crop values.
                   </p>
                </div>
                <Button className="rounded-full h-14 px-8 bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl hover:shadow-primary/20 transition-all gap-4 group/btn">
                   Analyze My Produce <Target className="h-5 w-5 group-hover/btn:rotate-45 transition-transform" />
                </Button>
             </div>
             
             {/* Background Decorations */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -ml-16 -mb-16"></div>
          </div>
        </div>

        {/* Prediction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[
             { crop: 'Maize', prediction: 'Bullish', color: 'success', change: '+12%', confidence: 'High', reason: 'Anticipated shortfall in regional maize stocks by Q3.' },
             { crop: 'Beans', prediction: 'Stable', color: 'info', change: '+2%', confidence: 'Medium', reason: 'Strong seasonal harvest balancing current high demand.' },
             { crop: 'Tomatoes', prediction: 'Bearish', color: 'destructive', change: '-15%', confidence: 'High', reason: 'Oversupply expected from central regions next month.' }
           ].map((item, i) => (
             <Card key={i} className="border-none shadow-xl rounded-3xl overflow-hidden group hover:-translate-y-1 transition-all duration-300">
               <CardHeader className={`bg-${item.color}/5 border-b border-${item.color}/10 pb-4`}>
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                       <ShoppingBag className={`h-5 w-5 text-${item.color}`} />
                       <span className="font-black text-lg">{item.crop}</span>
                    </div>
                    <Badge variant="outline" className={`rounded-full border-${item.color}/30 text-${item.color} font-black text-[10px] uppercase tracking-widest bg-white`}>
                       {item.prediction}
                    </Badge>
                 </div>
               </CardHeader>
               <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Expected Change</p>
                        <h4 className={`text-4xl font-black tracking-tighter text-${item.color}`}>{item.change}</h4>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Confidence Level</p>
                        <p className="text-sm font-bold text-foreground">{item.confidence}</p>
                     </div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-2xl border border-muted">
                     <p className="text-[11px] font-bold text-muted-foreground leading-relaxed">{item.reason}</p>
                  </div>
                  <Button variant="ghost" className={`w-full justify-center gap-2 font-bold text-${item.color} hover:bg-${item.color}/10 rounded-xl h-12 transition-colors`}>
                    View Depth Analysis <Zap className="h-4 w-4" />
                  </Button>
               </CardContent>
             </Card>
           ))}
        </div>

        {/* AI Insight Paragraph */}
        <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-primary/5 border-l-8 border-primary">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shrink-0">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight text-primary">Strategic Harvest Insight</h3>
                <p className="text-lg font-medium leading-relaxed text-foreground/80">
                  "The AI models suggest a shift in market dynamics for the next 45 days. High humidity levels in the western corridor will likely delay maize drying cycles across the region, potentially driving a localized price spike in ready-to-mill grain. Farmers with solar dryers should aim to release stock by mid-next month for maximum profitability."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FarmerDashboardLayout>
  );
}
