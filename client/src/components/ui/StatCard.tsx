// client/src/components/ui/StatCard.tsx

import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  // The stat card component
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'blue' | 'green' | 'red' | 'yellow' ;
}

function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
    const colors = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        yellow: 'bg-yellow-100 text-yellow-600',
        red: 'bg-red-100 text-red-600'
    }
    
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-800">{value}</p>
                    
                    {trend && (
                        <p className={`text-sm mt-2 ${
                            trend.isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                            <span className="text-gray-500 ml-1">vs last month</span>
                        </p>
                    )}
                </div>
                
                <div className={`p-4 rounded-lg ${colors[color]}`}>
                    <Icon size={28} />
                </div>
            </div>
        </div>
    )
}

export default StatCard;