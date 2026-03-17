import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText, UserPlus, DollarSign, ShieldCheck, Leaf, ArrowRight, User, Package, HandHelping } from 'lucide-react';
import { adminService } from '../../../services/adminService';

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const resp = await adminService.getActivities();
        setActivities(resp.data);
      } catch (err) {
        console.error('Failed to load recent activities:', err);
      } finally {
        setLoading(false);
      }
    };
    loadActivities();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'USER_REGISTRATION': return { icon: UserPlus, color: 'bg-emerald-100 text-emerald-600' };
      case 'LOAN_REQUEST': return { icon: HandHelping, color: 'bg-violet-100 text-violet-600' };
      case 'PRODUCE_ADDED': return { icon: Leaf, color: 'bg-amber-100 text-amber-600' };
      default: return { icon: Activity, color: 'bg-blue-100 text-blue-600' };
    }
  };

  return (
    <Card className="border-none shadow-md rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center text-lg font-serif">
          <span className="flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-primary" />
            System Feed
          </span>
          <button className="text-[10px] font-black uppercase text-primary hover:underline flex items-center gap-1 group tracking-widest">
            Audit Log <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {loading ? (
          [1, 2, 3, 4, 5].map(i => <div key={i} className="h-12 w-full bg-muted animate-pulse rounded-xl mb-1"></div>)
        ) : activities.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground text-sm font-medium">No system activity logged.</div>
        ) : (
          activities.map((activity) => {
            const { icon: ActivityIcon, color } = getIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/40 transition-colors group cursor-pointer">
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                  <ActivityIcon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{activity.description}</p>
                  <p className="text-[10px] text-muted-foreground truncate font-black uppercase tracking-widest">{activity.type.replace(/_/g, ' ')}</p>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap">{new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
