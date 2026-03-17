import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { produceService } from '../../../services/produceService';

export default function YieldAnalytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadYieldData = async () => {
      try {
        const response = await produceService.getProduce();
        const crops = response.data || [];
        
        // Aggregate by name
        const aggregated = crops.reduce((acc, crop) => {
          const existing = acc.find(a => a.name === crop.name);
          if (existing) {
            existing.yield += crop.quantity;
          } else {
            acc.push({ name: crop.name, yield: crop.quantity });
          }
          return acc;
        }, []);

        setData(aggregated);
      } catch (err) {
        console.error('Failed to load yield analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    loadYieldData();
  }, []);

  return (
    <Card className="border-none shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-xl font-serif">
          <span>Yield Analytics</span>
          <select className="bg-muted text-xs font-medium rounded-lg px-2 py-1 outline-none">
            <option>All Assets</option>
            <option>Last 30 Days</option>
          </select>
        </CardTitle>
        <CardDescription>Track your crop production performance (in units).</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] w-full pt-4 pb-2 px-2">
        {loading ? (
          <div className="h-full w-full bg-muted animate-pulse rounded-xl"></div>
        ) : data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm font-medium">
            No produce data available yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6b7280' }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <Tooltip 
                cursor={{ fill: '#f3f4f6' }} 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                labelStyle={{ fontWeight: 500, color: '#374151', marginBottom: '4px' }}
              />
              <Bar 
                dataKey="yield" 
                fill="hsl(var(--primary))" 
                radius={[6, 6, 0, 0]} 
                barSize={45} 
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
