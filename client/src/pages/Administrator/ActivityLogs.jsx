import React, { useState } from 'react';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollText, Search, LogIn, Database, DollarSign, ShoppingCart, UserPlus, Shield, Filter } from 'lucide-react';

const mockLogs = [
  { id: 1, action: 'User Login', user: 'admin@Amica.co.ke', details: 'Successful login from 41.89.xxx.xxx', type: 'Auth', time: '2025-03-10 20:15:00' },
  { id: 2, action: 'Price Updated', user: 'admin@Amica.co.ke', details: 'Maize price updated: KES 4,200 → KES 4,500', type: 'Data Change', time: '2025-03-10 19:45:00' },
  { id: 3, action: 'Loan Approved', user: 'grace@Amica.co.ke', details: 'Loan #4521 approved for Jane Muthoni (KES 50,000)', type: 'Financial', time: '2025-03-10 18:30:00' },
  { id: 4, action: 'New Registration', user: 'system', details: 'New farmer registered: Peter Kamau (Nakuru)', type: 'Auth', time: '2025-03-10 17:22:00' },
  { id: 5, action: 'Record Deleted', user: 'admin@Amica.co.ke', details: 'Invalid produce entry #8912 removed', type: 'Data Change', time: '2025-03-10 16:10:00' },
  { id: 6, action: 'Role Changed', user: 'admin@Amica.co.ke', details: 'Grace Wanjiku → SUPERVISOR role assigned', type: 'Permission', time: '2025-03-10 15:45:00' },
  { id: 7, action: 'Loan Rejected', user: 'grace@Amica.co.ke', details: 'Loan #4519 rejected — insufficient collateral', type: 'Financial', time: '2025-03-10 14:20:00' },
  { id: 8, action: 'System Backup', user: 'system', details: 'Automated backup completed successfully (2.4 GB)', type: 'System', time: '2025-03-10 03:00:00' },
  { id: 9, action: 'Failed Login', user: 'unknown@gmail.com', details: 'Failed login attempt from 197.232.xxx.xxx', type: 'Auth', time: '2025-03-09 23:15:00' },
  { id: 10, action: 'Bulk Import', user: 'admin@Amica.co.ke', details: '245 produce records imported from Kinangop SACCO', type: 'Data Change', time: '2025-03-09 11:30:00' },
];

const typeIcons = {
  Auth: LogIn,
  'Data Change': Database,
  Financial: DollarSign,
  Permission: Shield,
  System: ScrollText,
};

const typeColors = {
  Auth: 'bg-blue-100 text-blue-600',
  'Data Change': 'bg-amber-100 text-amber-600',
  Financial: 'bg-emerald-100 text-emerald-600',
  Permission: 'bg-violet-100 text-violet-600',
  System: 'bg-rose-100 text-rose-600',
};

export default function ActivityLogs() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const filtered = mockLogs.filter(l => {
    const matchSearch = l.action.toLowerCase().includes(search.toLowerCase()) || l.user.toLowerCase().includes(search.toLowerCase()) || l.details.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || l.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <AdminDashboardLayout title="Activity Logs">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif flex items-center gap-2"><ScrollText className="h-6 w-6 text-primary" /> Activity Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">Security audit trail — track all system actions and changes.</p>
        </div>

        <Card className="border-none shadow-md rounded-2xl">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search logs..." className="pl-10 h-10 rounded-xl bg-muted/30 border-none" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {['All', 'Auth', 'Data Change', 'Financial', 'Permission', 'System'].map(t => (
                  <Button key={t} variant={filter === t ? 'default' : 'outline'} size="sm" className={`rounded-xl text-xs whitespace-nowrap ${filter === t ? 'bg-primary text-white' : ''}`} onClick={() => setFilter(t)}>
                    {t}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {filtered.map(log => {
                const LogIcon = typeIcons[log.type] || ScrollText;
                return (
                  <div key={log.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors group">
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${typeColors[log.type]}`}>
                      <LogIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium">{log.action}</span>
                        <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${typeColors[log.type]}`}>{log.type}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">{log.details}</p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                        <span className="font-medium">{log.user}</span>
                        <span>•</span>
                        <span>{new Date(log.time).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                <ScrollText className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No logs found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
