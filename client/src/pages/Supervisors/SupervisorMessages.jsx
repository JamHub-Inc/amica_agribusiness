import React from 'react';
import SupervisorDashboardLayout from './components/SupervisorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Search, Send, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SupervisorMessages() {
  return (
    <SupervisorDashboardLayout title="Member Messages">
      <div className="flex flex-col h-[calc(100vh-160px)] gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-serif flex items-center gap-2"><MessageSquare className="h-6 w-6 text-primary" /> Member Communication</h1>
            <p className="text-sm text-muted-foreground mt-1 text-balance">Directly message farmers in your SACCO branch regarding loans or produce logs.</p>
          </div>
        </div>

        <div className="flex-1 flex gap-6 min-h-0 overflow-hidden">
            {/* Contacts Sidebar */}
            <Card className="w-80 h-full border-none shadow-md rounded-2xl flex flex-col overflow-hidden hidden md:flex shrink-0">
                <CardHeader className="p-4 border-b border-border/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search farmers..." className="pl-10 h-10 border-none bg-muted/40 rounded-xl text-sm" />
                    </div>
                </CardHeader>
                <CardContent className="p-0 flex-1 overflow-y-auto no-scrollbar">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`p-4 flex items-center gap-3 cursor-pointer transition-colors border-b border-border/20 ${i === 1 ? 'bg-primary/5' : 'hover:bg-muted/30'}`}>
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                <User className="h-5 w-5 text-primary" />
                            </div>
                            <div className="min-w-0 pr-2">
                                <p className="text-sm font-bold truncate">Farmer {i}</p>
                                <p className="text-[10px] text-muted-foreground truncate uppercase font-bold tracking-tighter">Your Branch</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="flex-1 h-full border-none shadow-md rounded-2xl flex flex-col overflow-hidden relative">
                <CardHeader className="p-4 border-b border-border/50 flex flex-row items-center gap-3 shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shrink-0">F1</div>
                    <div>
                        <h2 className="text-sm font-black">Farmer 1</h2>
                        <span className="text-[10px] uppercase font-bold text-success animate-pulse tracking-widest">Online</span>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 p-6 overflow-y-auto no-scrollbar flex flex-col gap-4">
                    <div className="bg-muted p-4 rounded-3xl rounded-tl-none max-w-[70%] mr-auto">
                        <p className="text-sm font-medium">Hello Supervisor, I've just submitted my fertilizer loan request. Could you please take a look?</p>
                        <span className="text-[9px] text-muted-foreground mt-2 block font-bold">10:42 AM</span>
                    </div>
                    <div className="bg-primary p-4 rounded-3xl rounded-tr-none max-w-[70%] ml-auto text-white">
                        <p className="text-sm font-medium">No problem. I'll review your produce logs from last week first as collateral documentation.</p>
                        <span className="text-[9px] text-white/70 mt-2 block font-bold">10:45 AM</span>
                    </div>
                </CardContent>
                <div className="p-4 border-t border-border/50 bg-card/50 flex gap-3 shrink-0">
                    <Input placeholder="Type a message to Farmer 1..." className="flex-1 h-12 border-none bg-muted/40 rounded-xl px-4" />
                    <Button className="h-12 w-12 p-0 rounded-xl bg-primary text-white shadow-lg shadow-primary/20"><Send className="h-5 w-5" /></Button>
                </div>
            </Card>
        </div>
      </div>
    </SupervisorDashboardLayout>
  );
}
