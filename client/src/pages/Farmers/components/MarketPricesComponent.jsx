import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation as NavIcon } from 'lucide-react';
import { marketService } from '../../../services/marketService';

export default function MarketPricesComponent() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const response = await marketService.getPrices();
        setPrices(response.data || []);
      } catch (err) {
        console.error('Failed to load market prices:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPrices();
  }, []);

  return (
    <Card className="border-none shadow-md rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 font-serif">
          <NavIcon className="text-primary h-4 w-4" />
          Live Market Prices
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-8 bg-muted animate-pulse rounded-lg"></div>)
        ) : prices.length === 0 ? (
          <p className="text-xs text-muted-foreground">No price data available.</p>
        ) : (
          prices.map((row, i) => (
            <div key={i} className="flex justify-between items-center border-b border-border/50 pb-2 last:border-0 last:pb-0">
              <span className="text-xs font-semibold">{row.commodity}</span>
              <div className="text-right">
                <p className="text-xs font-black">KES {(row.price || 0).toLocaleString()}</p>
                <p className={`text-[10px] font-bold ${row.trend === 'UP' ? 'text-success' : row.trend === 'DOWN' ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {row.trend || 'STABLE'} {row.region && `| ${row.region}`}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
