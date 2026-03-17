import React, { useState } from 'react';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, FileText, Video, Upload, MoreHorizontal, Eye, Edit3, Trash2, Calendar, Tag } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const mockContent = [
  { id: 1, title: 'Complete Guide to Maize Farming', type: 'Guide', category: 'Crop Management', status: 'Published', date: '2025-02-15', views: 1240 },
  { id: 2, title: 'Soil Testing Best Practices', type: 'Article', category: 'Soil Health', status: 'Published', date: '2025-01-28', views: 890 },
  { id: 3, title: 'Drip Irrigation Setup Tutorial', type: 'Video', category: 'Irrigation', status: 'Draft', date: '2025-03-05', views: 0 },
  { id: 4, title: 'Seasonal Planting Calendar 2025', type: 'Guide', category: 'Planning', status: 'Published', date: '2025-01-01', views: 2100 },
  { id: 5, title: 'Pest Control: Organic Methods', type: 'Article', category: 'Pest Management', status: 'Published', date: '2024-12-20', views: 1560 },
  { id: 6, title: 'Government Subsidy Programs', type: 'Announcement', category: 'Policy', status: 'Published', date: '2025-03-01', views: 3400 },
];

const typeIcons = {
  Guide: BookOpen,
  Article: FileText,
  Video: Video,
  Announcement: Tag,
};

const statusStyles = {
  Published: 'bg-success/10 text-success',
  Draft: 'bg-muted text-muted-foreground',
};

export default function ContentManagement() {
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? mockContent : mockContent.filter(c => c.type === tab);

  return (
    <AdminDashboardLayout title="Content Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-serif flex items-center gap-2"><BookOpen className="h-6 w-6 text-primary" /> Content Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage educational resources, guides, and announcements.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl font-medium gap-2 h-11 border-primary/20 text-primary">
              <Upload className="h-4 w-4" /> Upload File
            </Button>
            <Button className="bg-primary text-white rounded-xl font-medium gap-2 shadow-md h-11">
              <Plus className="h-4 w-4" /> New Content
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Content', value: '48' },
            { label: 'Published', value: '42' },
            { label: 'Drafts', value: '6' },
            { label: 'Total Views', value: '24.5K' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm rounded-2xl">
              <CardContent className="p-4">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <p className="text-xl font-serif mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {['All', 'Guide', 'Article', 'Video', 'Announcement'].map(t => (
            <Button key={t} variant={tab === t ? 'default' : 'outline'} size="sm" className={`rounded-xl text-xs ${tab === t ? 'bg-primary text-white' : ''}`} onClick={() => setTab(t)}>
              {t}{t === 'All' ? '' : 's'}
            </Button>
          ))}
        </div>

        {/* Content List */}
        <div className="space-y-3">
          {filtered.map(item => {
            const TypeIcon = typeIcons[item.type] || FileText;
            return (
              <Card key={item.id} className="border-none shadow-sm rounded-2xl hover:shadow-md transition-all group">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <TypeIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold truncate">{item.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Tag className="h-3 w-3" />{item.category}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      {item.views > 0 && <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{item.views.toLocaleString()} views</span>}
                    </div>
                  </div>
                  <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${statusStyles[item.status]}`}>{item.status}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg">
                      <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer"><Eye className="h-4 w-4" /> Preview</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer"><Edit3 className="h-4 w-4" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer text-destructive"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
