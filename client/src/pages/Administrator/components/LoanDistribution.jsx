import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { adminService } from '../../../services/adminService';
import { Loader2 } from 'lucide-react';

const statusColors = {
  APPROVED: 'hsl(142, 76%, 36%)',
  PENDING: 'hsl(36, 100%, 50%)',
  REJECTED: 'hsl(4, 90%, 58%)',
  DISBURSED: 'hsl(215, 100%, 50%)',
  REPAID: 'hsl(200, 75%, 70%)',
};

export default function LoanDistribution() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resp = await adminService.getCharts();
        setData(resp.data?.loanDistribution || []);
      } catch (err) {
        console.error('Failed to load loan distribution:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (loading) {
    return (
      <Card className="border-none shadow-md rounded-[2.5rem] bg-card flex items-center justify-center h-[320px]">
         <Loader2 className="h-8 w-8 animate-spin text-primary opacity-20" />
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-card rounded-[2.5rem] bg-card overflow-hidden">
      <CardHeader className="p-8 pb-0">
        <CardTitle className="text-xl font-serif">Credit Portfolio</CardTitle>
        <CardDescription className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Status Distribution Analysis</CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="h-[200px] w-[200px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={2000}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={statusColors[entry.name] || '#cbd5e1'} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', padding: '1rem', fontWeight: 800 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 w-full space-y-4">
            {data.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: statusColors[item.name] || '#cbd5e1' }}></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{item.value}</span>
                  <span className="text-[10px] font-black text-muted-foreground ml-2 opacity-60">({Math.round((item.value / total) * 100)}%)</span>
                </div>
              </div>
            ))}
            <div className="pt-4 mt-4 border-t border-border/10">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <span>Aggregated Users</span>
                <span className="text-sm text-foreground">{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
