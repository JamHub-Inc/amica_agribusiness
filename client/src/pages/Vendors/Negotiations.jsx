import React from 'react';
import VendorDashboardLayout from './components/VendorDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Search, Filter, ArrowUpRight, Clock, MapPin, Package, User, MoreVertical, Send, Paperclip, MoreHorizontal, Smile, HandHelping, ShoppingBag } from 'lucide-react';

const conversations = [
  { id: 1, name: 'John Odhiambo', crop: 'Maize', lastMessage: "I can provide 1.5 tons now, let's agree on KES 3,100 per bag.", status: 'Negotiating', time: '12m ago', avatar: 'JO' },
  { id: 2, name: 'Agnes Wasai', crop: 'Beans', lastMessage: 'The quality of the current harvest is Grade A.', status: 'Active', time: '2h ago', avatar: 'AW' },
  { id: 3, name: 'Peterson Kamau', crop: 'Tomatoes', lastMessage: 'Waiting for your offer on the 40 crates.', status: 'Waiting', time: '5h ago', avatar: 'PK' },
];

export default function Negotiations() {
  return (
    <VendorDashboardLayout title="Negotiation Hub">
      <div className="h-[calc(100vh-140px)] flex gap-8">
        {/* Conversations Sidebar */}
        <div className="w-1/3 space-y-8 flex flex-col">
          <div>
            <h1 className="text-4xl font-normal tracking-tight text-foreground border-l-4 border-primary pl-4 font-serif">Negotiations</h1>
            <p className="text-sm font-bold text-muted-foreground mt-1">Manage price and quantity discussions with your farmers</p>
          </div>
          
          <div className="flex-1 bg-card rounded-[2.5rem] shadow-card overflow-hidden flex flex-col">
            <div className="p-8 border-b border-border/40 bg-muted/20 backdrop-blur-sm">
               <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <input className="w-full h-12 pl-12 pr-4 rounded-2xl bg-background border border-border/60 font-medium text-sm text-foreground outline-none focus:border-primary transition-colors shadow-sm placeholder:text-muted-foreground" placeholder="Search chats..." />
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar">
               {conversations.map((chat) => (
                 <div key={chat.id} className="p-8 border-b border-border/10 hover:bg-muted/30 transition-colors cursor-pointer group relative">
                    <div className="flex items-start gap-4">
                       <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-sm shadow-md group-hover:scale-110 transition-transform">
                          {chat.avatar}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                             <h4 className="text-base font-bold tracking-tight text-foreground">{chat.name}</h4>
                             <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{chat.time}</span>
                          </div>
                          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">{chat.crop} Order discussion</p>
                          <p className="text-sm font-medium text-muted-foreground line-clamp-2 leading-relaxed">{chat.lastMessage}</p>
                       </div>
                    </div>
                    {chat.status === 'Negotiating' && (
                       <div className="absolute top-8 right-4 h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                    )}
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-card rounded-[2.5rem] shadow-card overflow-hidden flex flex-col relative">
           {/* Chat Header */}
           <div className="p-8 border-b border-border/40 flex justify-between items-center bg-card/80 backdrop-blur-md relative z-10 shadow-sm">
              <div className="flex items-center gap-4">
                 <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-lg shadow-xl shrink-0">
                    JO
                 </div>
                 <div>
                    <h3 className="text-xl font-normal tracking-tight text-foreground font-serif">John Odhiambo</h3>
                    <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground mt-0.5 tracking-[0.2em] uppercase">
                       <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span> Online • Maize Bulk Inquiry
                    </div>
                 </div>
              </div>
              <div className="flex gap-2">
                 <Button variant="ghost" className="h-12 w-12 p-0 rounded-xl bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <HandHelping className="h-5 w-5" />
                 </Button>
                 <Button variant="ghost" className="h-12 w-12 p-0 rounded-xl bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <ShoppingBag className="h-5 w-5" />
                 </Button>
                 <Button variant="ghost" className="h-12 w-12 p-0 rounded-xl bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <MoreHorizontal className="h-5 w-5" />
                 </Button>
              </div>
           </div>

           {/* Messages Area placeholder */}
           <div className="flex-1 p-10 overflow-y-auto no-scrollbar space-y-8 bg-muted/10">
              <div className="flex justify-center">
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground bg-card px-6 py-2 rounded-full shadow-sm border border-border/30 current-date">Yesterday, Oct 24</span>
              </div>
              
              <div className="flex items-start gap-4">
                 <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground font-black text-xs shrink-0">JO</div>
                 <div className="space-y-2 max-w-[70%]">
                    <div className="p-6 rounded-[2rem] rounded-tl-lg bg-card shadow-md border border-border/40">
                       <p className="text-base font-medium text-foreground leading-relaxed">Hello! I saw your demand listing for 2 tons of maize. I currently have 1.5 tons ready for transport from the Kisumu region.</p>
                    </div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2">09:42 AM</p>
                 </div>
              </div>

              <div className="flex items-start gap-4 flex-row-reverse">
                 <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shrink-0 shadow-md">ME</div>
                 <div className="space-y-2 max-w-[70%] text-right">
                    <div className="p-6 rounded-[2rem] rounded-tr-lg bg-primary shadow-xl text-primary-foreground">
                       <p className="text-base font-bold leading-relaxed">Great to hear, John. I'm interested. What's your best price per bag for a bulk buy?</p>
                    </div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pr-2">09:45 AM</p>
                 </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground font-black text-xs shrink-0">JO</div>
                 <div className="space-y-2 max-w-[70%]">
                    <div className="p-6 rounded-[2rem] rounded-tl-lg bg-card shadow-md border border-border/40">
                       <p className="text-base font-medium text-foreground leading-relaxed">The current market says KES 3,200 but since we've traded before, I can do KES 3,100 per bag if you take the whole lot.</p>
                    </div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2">10:12 AM</p>
                 </div>
              </div>
           </div>

           {/* Message Input Area */}
           <div className="p-10 border-t border-border/40 bg-card shadow-[0_-20px_50px_rgba(0,0,0,0.02)] relative z-20">
              <div className="relative flex items-center gap-4">
                 <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary shadow-sm transition-all transform active:scale-95">
                       <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary shadow-sm transition-all transform active:scale-95">
                       <Smile className="h-5 w-5" />
                    </Button>
                 </div>
                 <div className="relative flex-1">
                    <input 
                      className="w-full h-14 pl-6 pr-12 rounded-3xl bg-muted border-none font-medium text-sm text-foreground outline-none focus:bg-muted/80 transition-all shadow-inner placeholder:text-muted-foreground px-4" 
                      placeholder="Type your message or offer here..." 
                    />
                    <Button className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 px-0 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all transform hover:rotate-12 active:scale-90 border-none">
                       <Send className="h-4 w-4" />
                    </Button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </VendorDashboardLayout>
  );
}
